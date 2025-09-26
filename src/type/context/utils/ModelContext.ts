import {
    categorizeAbstractCategorizedProperties,
    categorizeEmbeddableTypeProperties, categorizeEntityProperties,
} from "@/type/context/utils/CategorizedProperties.ts";
import {
    type AllExtendsResult, buildInheritorsMap,
    getEntityAllExtends,
    getEntityAllProperties, getMappedSuperClassAllInheritors
} from "@/type/context/utils/EntityExtends.ts";
import {getGroupSubMaps} from "@/type/context/utils/GroupSubDataMap.ts";
import {flatEmbeddableTypeProperties} from "@/type/context/utils/EmbeddableTypeFlat.ts";
import {getAssociationWithInheritInfo} from "@/type/context/utils/AssociationWithInheritInfo.ts";
import {
    getAbstractMappedProperties,
    getEntityMappedProperties, oneToManyAbstractPropertyToReal,
    oneToOneMappedAbstractPropertyToReal
} from "@/type/context/utils/MappedProperty.ts";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";

export const contextDataToContext = (
    readonlyContextData: DeepReadonly<ModelContextData>,
): ModelContext => {
    const contextData = cloneDeepReadonlyRaw<ModelContextData>(readonlyContextData)
    const model = contextData.model

    const inheritorsMap = buildInheritorsMap(contextData.entityMap, contextData.mappedSuperClassMap)
    for (const entity of contextData.entityMap.values()) {
        const mappedProperties = getEntityMappedProperties(entity.properties, contextData.associationMap)
        for (const {mappedProperty, referencedEntity} of mappedProperties) {
            referencedEntity.properties.push(mappedProperty)
        }
    }
    for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
        const inheritors = getMappedSuperClassAllInheritors(mappedSuperClass, inheritorsMap)
        const mappedProperties = getAbstractMappedProperties(mappedSuperClass.properties, contextData.associationMap)
        for (const {mappedProperty, referencedEntity} of mappedProperties) {
            if (mappedProperty.category === "OneToOne_Mapped_Abstract") {
                for (const inheritEntity of inheritors.entities) {
                    referencedEntity.properties.push(oneToOneMappedAbstractPropertyToReal(mappedProperty, inheritEntity))
                }
            } else if (mappedProperty.category === "OneToMany_Abstract") {
                for (const inheritEntity of inheritors.entities) {
                    referencedEntity.properties.push(oneToManyAbstractPropertyToReal(mappedProperty, inheritEntity))
                }
            }
        }
    }

    const entityBaseInfoMap = new Map<string, EntityWithCategorizedProperties>()
    for (const [id, entity] of contextData.entityMap) {
        const categorizedProperties = categorizeEntityProperties(entity.properties, contextData.associationMap)
        const entityWithCategorizedProperties: EntityWithCategorizedProperties = {
            ...entity,
            ...categorizedProperties,
        }
        entityBaseInfoMap.set(id, entityWithCategorizedProperties)
    }

    const mappedSuperClassBaseInfoMap = new Map<string, MappedSuperClassWithCategorizedProperties>()
    for (const [id, mappedSuperClass] of contextData.mappedSuperClassMap) {
        const categorizedProperties = categorizeAbstractCategorizedProperties(mappedSuperClass.properties, contextData.associationMap)
        const mappedSuperClassWithCategorizedProperties: MappedSuperClassWithCategorizedProperties = {
            ...mappedSuperClass,
            ...categorizedProperties,
        }
        mappedSuperClassBaseInfoMap.set(id, mappedSuperClassWithCategorizedProperties)
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
    const associationMap = new Map<string, AssociationWithInheritInfo>()
    for (const [id, association] of contextData.associationMap) {
        const associationWithInheritInfo: AssociationWithInheritInfo = getAssociationWithInheritInfo(association, entityBaseInfoMap, mappedSuperClassBaseInfoMap)
        associationMap.set(id, associationWithInheritInfo)
    }

    // 解析继承关系
    const superClassAllExtendsResultMap = new Map<string, AllExtendsResult<MappedSuperClassWithCategorizedProperties>>()

    const mappedSuperClassMap = new Map<string, MappedSuperClassWithInheritInfo>()
    for (const [id, mappedSuperClass] of mappedSuperClassBaseInfoMap) {
        const allExtends = getEntityAllExtends(mappedSuperClass, mappedSuperClassBaseInfoMap, superClassAllExtendsResultMap)
        const allProperties = getEntityAllProperties(mappedSuperClass, mappedSuperClassBaseInfoMap, allExtends)
        const allCategorizedProperties = categorizeAbstractCategorizedProperties(allProperties, contextData.associationMap)
        mappedSuperClassMap.set(id, {
            ...mappedSuperClass,
            allExtends,
            allProperties,
            allCategorizedProperties,
        })
    }

    const entityMap = new Map<string, EntityWithInheritInfo>()
    for (const [id, entity] of entityBaseInfoMap) {
        const allExtends = getEntityAllExtends(entity, mappedSuperClassBaseInfoMap, superClassAllExtendsResultMap)
        const allProperties = getEntityAllProperties(entity, mappedSuperClassBaseInfoMap, allExtends)
        const allCategorizedProperties = categorizeEntityProperties(allProperties, contextData.associationMap)
        entityMap.set(id, {
            ...entity,
            allExtends,
            allProperties,
            allCategorizedProperties,
        })
    }

    // 解析内嵌类展平属性
    const embeddableTypeMap = new Map<string, EmbeddableTypeWithFlatProperties>()
    for (const [id, embeddableType] of embeddableTypeBaseInfoMap) {
        embeddableTypeMap.set(id, flatEmbeddableTypeProperties(embeddableType, embeddableTypeBaseInfoMap))
    }

    const groupMap = new Map<string, GroupWithSubMaps>()

    for (const [id, group] of contextData.groupMap) {
        const subData: GroupWithSubMaps = {
            ...group,
            ...getGroupSubMaps(id, {entityMap, enumerationMap, mappedSuperClassMap, embeddableTypeMap}),
        }
        groupMap.set(id, subData)
    }

    return {
        model,
        groupMap,
        entityMap,
        mappedSuperClassMap,
        embeddableTypeMap,
        enumerationMap,
        associationMap,
    }
}