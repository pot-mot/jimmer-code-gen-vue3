import {
    categorizeAbstractCategorizedProperties,
    categorizeEmbeddableTypeProperties, categorizeEntityProperties,
} from "@/type/context/utils/CategorizedProperties.ts";
import {
    type AllExtendsInfo,
    buildInheritorsMap,
    getAllExtends,
    getAllInheritors, getAllProperties
} from "@/type/context/utils/EntityExtends.ts";
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
import {generatePropertyFkJoinInfo, generatePropertyJoinInfo} from "@/modelEditor/property/PropertyJoinInfoGenerate.ts";

export const contextDataToContext = (
    readonlyContextData: DeepReadonly<ModelContextData>,
): DeepReadonly<ModelContext> => {
    const contextData = cloneDeepReadonlyRaw<ModelContextData>(readonlyContextData)
    const model = contextData.model

    const associationIdOnlyMap = new Map<string, AssociationIdOnly>()
    for (const [id, {association}] of contextData.associationMap) {
        associationIdOnlyMap.set(id, association)
    }

    const entityWithCategorizedPropertiesMap = new Map<string, EntityWithCategorizedProperties>()
    for (const [id, entity] of contextData.entityMap) {
        for (const property of entity.properties) {
            if ("joinInfo" in property && property.autoGenerateJoinInfo) {
                const edgedAssociation = contextData.associationMap.get(property.associationId)
                if (edgedAssociation === undefined) throw new Error(`[${id}] is not existed`)
                const association = edgedAssociation.association
                generatePropertyJoinInfo(property, association.foreignKeyType, entity, contextData.entityMap, contextData.mappedSuperClassMap, contextData.embeddableTypeMap, model.databaseNameStrategy)
            }
        }
        const categorizedProperties = categorizeEntityProperties(entity.properties, associationIdOnlyMap)
        const entityWithCategorizedProperties: EntityWithCategorizedProperties = {
            ...entity,
            ...categorizedProperties,
        }
        entityWithCategorizedPropertiesMap.set(id, entityWithCategorizedProperties)
    }

    const mappedSuperClassWithCategorizedPropertiesMap = new Map<string, MappedSuperClassWithCategorizedProperties>()
    for (const [id, mappedSuperClass] of contextData.mappedSuperClassMap) {
        for (const property of mappedSuperClass.properties) {
            if ("joinInfo" in property && property.autoGenerateJoinInfo) {
                const edgedAssociation = contextData.associationMap.get(property.associationId)
                if (edgedAssociation === undefined) throw new Error(`[${id}] is not existed`)
                const association = edgedAssociation.association
                generatePropertyFkJoinInfo(property, association.foreignKeyType, contextData.entityMap, contextData.mappedSuperClassMap, contextData.embeddableTypeMap, model.databaseNameStrategy)
            }
        }
        const categorizedProperties = categorizeAbstractCategorizedProperties(mappedSuperClass.properties, associationIdOnlyMap)
        const mappedSuperClassWithCategorizedProperties: MappedSuperClassWithCategorizedProperties = {
            ...mappedSuperClass,
            ...categorizedProperties,
        }
        mappedSuperClassWithCategorizedPropertiesMap.set(id, mappedSuperClassWithCategorizedProperties)
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

    // 解析实体继承关系
    const allExtendsCacheMap = new Map<string, AllExtendsInfo<MappedSuperClassWithCategorizedProperties>>()

    const mappedSuperClassWithInheritInfoMap = new Map<string, MappedSuperClassWithInheritInfo>()
    for (const [id, mappedSuperClass] of mappedSuperClassWithCategorizedPropertiesMap) {
        const {
            directExtendSet: directExtends,
            extendsSet: allExtends,
        } = getAllExtends(mappedSuperClass, mappedSuperClassWithCategorizedPropertiesMap, allExtendsCacheMap)
        const allProperties = getAllProperties(mappedSuperClass, mappedSuperClassWithCategorizedPropertiesMap, allExtends)
        mappedSuperClassWithInheritInfoMap.set(id, {
            ...mappedSuperClass,
            directExtends,
            allExtends,
            allProperties,
        })
    }

    const entityWithInheritInfoMap = new Map<string, EntityWithInheritInfo>()
    for (const [id, entity] of entityWithCategorizedPropertiesMap) {
        const {
            directExtendSet: directExtends,
            extendsSet: allExtends,
        } = getAllExtends(entity, mappedSuperClassWithCategorizedPropertiesMap, allExtendsCacheMap)
        const allProperties = getAllProperties(entity, mappedSuperClassWithCategorizedPropertiesMap, allExtends)
        entityWithInheritInfoMap.set(id, {
            ...entity,
            directExtends,
            allExtends,
            allProperties,
        })
    }

    // 将 MappedProperty 移动回实体中
    const inheritorsMap = buildInheritorsMap(entityWithInheritInfoMap, mappedSuperClassWithInheritInfoMap)

    for (const entity of entityWithInheritInfoMap.values()) {
        const mappedInfos = getMappedPropertyInfo(entity.properties, associationIdOnlyMap)
        for (const {association, mappedProperty} of mappedInfos) {
            const referencedEntity = entityWithInheritInfoMap.get(association.referencedEntityId)
            if (!referencedEntity) throw new Error(`[${mappedProperty.referencedEntityId}] not existed`)
            referencedEntity.properties.push(mappedProperty)
            referencedEntity.allProperties.push(mappedProperty)
            if (association.withMappedProperty) {
                if (mappedProperty.category === "OneToOne_Mapped" && association.type === "OneToOne") {
                    referencedEntity.oneToOneMappedPropertyMap.set(mappedProperty.id, {...mappedProperty, association})
                } else if (mappedProperty.category === "OneToMany" && association.type === "ManyToOne") {
                    referencedEntity.oneToManyPropertyMap.set(mappedProperty.id, {...mappedProperty, association})
                } else if (mappedProperty.category === "ManyToMany_Mapped" && association.type === "ManyToMany") {
                    referencedEntity.manyToManyMappedPropertyMap.set(mappedProperty.id, {...mappedProperty, association})
                }
            }
        }
    }

    for (const mappedSuperClass of mappedSuperClassWithInheritInfoMap.values()) {
        const inheritors = getAllInheritors(mappedSuperClass.id, inheritorsMap)
        const mappedProperties = getAbstractMappedPropertyInfo(mappedSuperClass.properties, associationIdOnlyMap)
        for (const {
            association: abstractAssociation,
            sourceProperty: abstractSourceProperty,
            mappedProperty: abstractMappedProperty,
        } of mappedProperties) {
            const referencedEntity = entityWithInheritInfoMap.get(abstractAssociation.referencedEntityId)
            if (!referencedEntity) throw new Error(`[${abstractAssociation.referencedEntityId}] not existed`)

            if (
                abstractAssociation.type === "OneToOne_Abstract" &&
                abstractSourceProperty.category === "OneToOne_Source" &&
                abstractMappedProperty.category === "OneToOne_Mapped_Abstract"
            ) {
                for (const inheritEntity of inheritors.entities) {
                    const {
                        association: realAssociation,
                        sourceProperty: realSourceProperty,
                        mappedProperty: realMappedProperty,
                    } = oneToOneAbstractToReal({
                        association: abstractAssociation,
                        sourceProperty: abstractSourceProperty,
                        mappedProperty: abstractMappedProperty,
                    }, inheritEntity)
                    associationIdOnlyMap.set(realAssociation.id, realAssociation)
                    for (let i = 0; i < inheritEntity.allProperties.length; i++) {
                        if (inheritEntity.allProperties[i]?.id === abstractSourceProperty.id) {
                            inheritEntity.allProperties[i] = realSourceProperty
                            break
                        }
                    }
                    if (realAssociation.withMappedProperty) {
                        referencedEntity.properties.push(realMappedProperty)
                        referencedEntity.allProperties.push(realMappedProperty)
                        referencedEntity.oneToOneMappedPropertyMap.set(realMappedProperty.id, {
                            ...realMappedProperty,
                            association: realAssociation
                        })
                    }
                }
            } else if (
                abstractAssociation.type === "ManyToOne_Abstract" &&
                abstractSourceProperty.category === "ManyToOne" &&
                abstractMappedProperty.category === "OneToMany_Abstract"
            ) {
                for (const inheritEntity of inheritors.entities) {
                    const {
                        association: realAssociation,
                        sourceProperty: realSourceProperty,
                        mappedProperty: realMappedProperty,
                    } = oneToManyAbstractToReal({
                        association: abstractAssociation,
                        sourceProperty: abstractSourceProperty,
                        mappedProperty: abstractMappedProperty,
                    }, inheritEntity)
                    associationIdOnlyMap.set(realAssociation.id, realAssociation)
                    for (let i = 0; i < inheritEntity.allProperties.length; i++) {
                        if (inheritEntity.allProperties[i]?.id === abstractSourceProperty.id) {
                            inheritEntity.allProperties[i] = realSourceProperty
                            break
                        }
                    }
                    if (realAssociation.withMappedProperty) {
                        referencedEntity.properties.push(realMappedProperty)
                        referencedEntity.allProperties.push(realMappedProperty)
                        referencedEntity.oneToManyPropertyMap.set(realMappedProperty.id, {
                            ...realMappedProperty,
                            association: realAssociation
                        })
                    }
                }
            }
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
    for (const [id, association] of associationIdOnlyMap) {
        const realAssociation = idOnlyToAssociation(association, entityWithInheritInfoMap, mappedSuperClassWithInheritInfoMap)
        associationMap.set(id, realAssociation)
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
        model,
        groupMap: groupWithInheritInfoMap,
        entityMap: entityWithInheritInfoMap,
        mappedSuperClassMap: mappedSuperClassWithInheritInfoMap,
        embeddableTypeMap,
        enumerationMap,
        associationMap,

        createId,
        nameTool,
        typeTool: buildTypeTool(model.jvmLanguage, [], [], [])
    }
}