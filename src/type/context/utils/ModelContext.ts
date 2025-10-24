import {
    categorizeAbstractCategorizedProperties,
    categorizeEmbeddableTypeProperties,
    categorizeEntityProperties,
} from "@/type/context/utils/CategorizedProperties.ts";
import {getGroupSubMaps} from "@/type/context/utils/GroupSubDataMap.ts";
import {overrideEmbeddableTypePropertiesColumnNames} from "@/type/context/utils/EmbeddableTypeOverride.ts";
import {
    getAbstractMappedPropertyInfo,
    getMappedPropertyInfo
} from "@/type/context/utils/MappedPropertyInfo.ts";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";
import {idOnlyToAssociation} from "@/type/context/utils/AssociationIdOnlyToAssociation.ts";
import {nameTool} from "@/type/context/utils/NameTool.ts";
import {buildTypeTool} from "@/type/context/utils/TypeTool.ts";
import {createId} from "@/modelEditor/useModelEditor.ts";
import {
    oneToManyAbstractToReal,
    oneToOneAbstractToReal
} from "@/type/context/utils/AbstractAssociationToReal.ts";
import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import {
    syncAssociationAutoChange,
    syncEntityAutoChange,
    syncMappedSuperClassAutoChange
} from "@/modelEditor/history/SyncAutoChange.ts";

export const contextDataToContext = (
    readonlyContextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
): DeepReadonly<ModelContext> => {
    const contextData = cloneDeepReadonlyRaw<ModelContextData>(readonlyContextData)

    const associationIdOnlyMap = new Map<string, AssociationIdOnly>()
    for (const [id, {association}] of contextData.associationMap) {
        syncAssociationAutoChange(association, contextData)
        associationIdOnlyMap.set(id, association)
    }

    const embeddableTypeBaseInfoMap = new Map<string, EmbeddableTypeWithCategorizedProperties>()
    for (const [id, embeddableType] of contextData.embeddableTypeMap) {
        const categorizedProperties = categorizeEmbeddableTypeProperties(embeddableType.properties)
        const embeddableTypeWithCategorizedProperties: EmbeddableTypeWithCategorizedProperties = {
            ...embeddableType,
            ...categorizedProperties,
        }
        embeddableTypeBaseInfoMap.set(id, embeddableTypeWithCategorizedProperties)
    }

    const enumerationMap = new Map<string, Enumeration>()
    for (const [id, enumeration] of contextData.enumerationMap) {
        enumerationMap.set(id, enumeration)
    }

    type TempEntity = Entity & {
        properties: Property[],
        inheritSourceProperties: (ManyToOneProperty | OneToOneSourceProperty)[]
    }
    type TempMappedSuperClass = MappedSuperClass & {
        properties: Property[],
    }

    const tempEntityMap = new Map<string, TempEntity>()
    for (const entity of contextData.entityMap.values()) {
        syncEntityAutoChange(entity, contextData)
        tempEntityMap.set(entity.id, {
            ...entity,
            properties: Array.from(entity.properties),
            inheritSourceProperties: [],
        })
    }

    const tempMappedSuperClassMap = new Map<string, TempMappedSuperClass>()
    for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
        syncMappedSuperClassAutoChange(mappedSuperClass, contextData)
        tempMappedSuperClassMap.set(mappedSuperClass.id, {
            ...mappedSuperClass,
            properties: Array.from(mappedSuperClass.properties)
        })
    }

    // 将 MappedProperty 移动回实体中
    for (const entity of tempEntityMap.values()) {
        const mappedInfos = getMappedPropertyInfo(entity.properties, associationIdOnlyMap)
        for (const {association, mappedProperty} of mappedInfos) {
            const referencedEntity = tempEntityMap.get(association.referencedEntityId)
            if (!referencedEntity) throw new Error(`[${mappedProperty.referencedEntityId}] not existed`)
            referencedEntity.properties.push(mappedProperty)
        }
    }

    // 将抽象 MappedProperty 迁移至子类中
    for (const mappedSuperClass of tempMappedSuperClassMap.values()) {
        const inheritEntities: TempEntity[] = []
        const inheritItem = inheritInfo.abstractInheritInfoMap.get(mappedSuperClass.id)
        if (!inheritItem) throw new Error(`[${mappedSuperClass.name}] has no inheritInfo`)
        for (const childId of inheritItem.allConcreteChildIdSet) {
            const child = tempEntityMap.get(childId)
            if (child) {
                inheritEntities.push(child)
            }
        }

        const mappedProperties = getAbstractMappedPropertyInfo(mappedSuperClass.properties, associationIdOnlyMap)
        for (const {
            association: abstractAssociation,
            sourceProperty: abstractSourceProperty,
            mappedProperty: abstractMappedProperty,
        } of mappedProperties) {
            const referencedEntity = tempEntityMap.get(abstractAssociation.referencedEntityId)
            if (!referencedEntity) throw new Error(`[${abstractAssociation.referencedEntityId}] not existed`)

            if (
                abstractAssociation.type === "OneToOne_Abstract" &&
                abstractSourceProperty.category === "OneToOne_Source" &&
                abstractMappedProperty.category === "OneToOne_Mapped_Abstract"
            ) {
                for (const inheritEntity of inheritEntities) {
                    const {
                        association: realAssociation,
                        sourceProperty: realSourceProperty,
                        mappedProperty: realMappedProperty,
                    } = oneToOneAbstractToReal({
                        association: abstractAssociation,
                        sourceProperty: abstractSourceProperty,
                        mappedProperty: abstractMappedProperty,
                    }, inheritEntity, referencedEntity)

                    associationIdOnlyMap.set(realAssociation.id, realAssociation)
                    inheritEntity.inheritSourceProperties.push(realSourceProperty)
                    if (realAssociation.withMappedProperty) {
                        referencedEntity.properties.push(realMappedProperty)
                    }
                }
            } else if (
                abstractAssociation.type === "ManyToOne_Abstract" &&
                abstractSourceProperty.category === "ManyToOne" &&
                abstractMappedProperty.category === "OneToMany_Abstract"
            ) {
                for (const inheritEntity of inheritEntities) {
                    const {
                        association: realAssociation,
                        sourceProperty: realSourceProperty,
                        mappedProperty: realMappedProperty,
                    } = oneToManyAbstractToReal({
                        association: abstractAssociation,
                        sourceProperty: abstractSourceProperty,
                        mappedProperty: abstractMappedProperty,
                    }, inheritEntity, referencedEntity)

                    associationIdOnlyMap.set(realAssociation.id, realAssociation)
                    inheritEntity.inheritSourceProperties.push(realSourceProperty)
                    if (realAssociation.withMappedProperty) {
                        referencedEntity.properties.push(realMappedProperty)
                    }
                }
            }
        }
    }

    // 解析实体继承关系
    const mappedSuperClassWithInheritInfoMap = new Map<string, MappedSuperClassWithInheritInfo>()
    for (const [id, mappedSuperClass] of tempMappedSuperClassMap) {
        const inheritItem = inheritInfo.abstractInheritInfoMap.get(id)
        if (!inheritItem) throw new Error(`[${mappedSuperClass.name}] has no inheritInfo`)

        const allProperties = []
        for (const ancestorId of inheritItem.ancestorIdSet) {
            const ancestor = tempMappedSuperClassMap.get(ancestorId)
            if (ancestor) {
                allProperties.push(...ancestor.properties)
            }
        }
        allProperties.push(...mappedSuperClass.properties)

        mappedSuperClassWithInheritInfoMap.set(id, {
            ...mappedSuperClass,
            directExtends: new Set(),
            allExtends: new Set(),
            allProperties,
            ...categorizeAbstractCategorizedProperties(allProperties, associationIdOnlyMap)
        })
    }
    for (const [id, mappedSuperClass] of mappedSuperClassWithInheritInfoMap) {
        const inheritItem = inheritInfo.abstractInheritInfoMap.get(id)
        if (!inheritItem) throw new Error(`[${mappedSuperClass.name}] has no inheritInfo`)

        for (const parentId of inheritItem.parentIdSet) {
            const parent = mappedSuperClassWithInheritInfoMap.get(parentId)
            if (!parent) throw new Error(`[${parentId}] has no inheritInfo`)
            mappedSuperClass.directExtends.add(parent)
        }
        for (const ancestorId of inheritItem.ancestorIdSet) {
            const ancestor = mappedSuperClassWithInheritInfoMap.get(ancestorId)
            if (!ancestor) throw new Error(`[${ancestorId}] has no inheritInfo`)
            mappedSuperClass.allExtends.add(ancestor)
        }
    }

    const entityWithInheritInfoMap = new Map<string, EntityWithInheritInfo>()
    for (const [id, {inheritSourceProperties, ...entity}] of tempEntityMap) {
        const inheritItem = inheritInfo.concreteInheritInfoMap.get(id)
        if (!inheritItem) throw new Error(`[${entity.name}] has no inheritInfo`)

        const allProperties = []
        for (const ancestorId of inheritItem.ancestorIdSet) {
            const ancestor = tempMappedSuperClassMap.get(ancestorId)
            if (ancestor) {
                for (const property of ancestor.properties) {
                    if (property.category === "OneToOne_Source" || property.category === "ManyToOne") continue
                    allProperties.push(property)
                }
            }
        }
        allProperties.push(...entity.properties)
        allProperties.push(...inheritSourceProperties)

        entityWithInheritInfoMap.set(id, {
            ...entity,
            directExtends: new Set(),
            allExtends: new Set(),
            allProperties,
            ...categorizeEntityProperties(allProperties, associationIdOnlyMap)
        })
    }
    for (const [id, entity] of entityWithInheritInfoMap) {
        const inheritItem = inheritInfo.concreteInheritInfoMap.get(id)
        if (!inheritItem) throw new Error(`[${entity.name}] has no inheritInfo`)

        for (const parentId of inheritItem.parentIdSet) {
            const parent = mappedSuperClassWithInheritInfoMap.get(parentId)
            if (!parent) throw new Error(`[${parentId}] has no inheritInfo`)
            entity.directExtends.add(parent)
        }
        for (const ancestorId of inheritItem.ancestorIdSet) {
            const ancestor = mappedSuperClassWithInheritInfoMap.get(ancestorId)
            if (!ancestor) throw new Error(`[${ancestorId}] has no inheritInfo`)
            entity.allExtends.add(ancestor)
        }
    }

    // 解析内嵌类展平属性
    const embeddableTypeMap = new Map<string, EmbeddableTypeWithOverrideProperties>()
    for (const [id, embeddableType] of embeddableTypeBaseInfoMap) {
        const overrideColumnNameProperties = overrideEmbeddableTypePropertiesColumnNames(embeddableType, embeddableTypeBaseInfoMap)
        embeddableTypeMap.set(id, {
            ...embeddableType,
            overrideColumnNameProperties,
            categorizedOverrideColumnNameProperties: categorizeEmbeddableTypeProperties(overrideColumnNameProperties)
        })
    }

    // 填充关联对应实体的继承信息
    const associationMap = new Map<string, Association>()
    for (const [id, idOnly] of associationIdOnlyMap) {
        const association = idOnlyToAssociation(idOnly, entityWithInheritInfoMap, mappedSuperClassWithInheritInfoMap)
        associationMap.set(id, association)
    }

    // 设置属性的子节点信息
    const groupWithInheritInfoMap = new Map<string, GroupWithInheritInfoMap>()

    for (const [id, group] of contextData.groupMap) {
        groupWithInheritInfoMap.set(id, {
            ...group,
            ...getGroupSubMaps(id, {entityMap: entityWithInheritInfoMap, enumerationMap, mappedSuperClassMap: mappedSuperClassWithInheritInfoMap, embeddableTypeMap}),
        })
    }

    return {
        model: contextData.model,
        groupMap: groupWithInheritInfoMap,
        entityMap: entityWithInheritInfoMap,
        mappedSuperClassMap: mappedSuperClassWithInheritInfoMap,
        embeddableTypeMap,
        enumerationMap,
        associationMap,

        createId,
        nameTool,
        typeTool: buildTypeTool(contextData.model.jvmLanguage, [], [], []) // TODO
    }
}