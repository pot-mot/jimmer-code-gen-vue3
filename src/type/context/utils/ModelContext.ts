import {
    categorizeAbstractCategorizedProperties,
    categorizeEmbeddableTypeProperties, categorizeEntityProperties,
} from "@/type/context/utils/CategorizedProperties.ts";
import {
    type AllExtendsResult,
    getEntityAllExtends,
    getEntityAllProperties
} from "@/type/context/utils/EntityExtends.ts";
import {getGroupSubMaps} from "@/type/context/utils/GroupSubDataMap.ts";
import {flatEmbeddableTypeProperties} from "@/type/context/utils/EmbeddableTypeFlat.ts";
import {getAssociationWithInheritInfo} from "@/type/context/utils/AssociationWithInheritInfo.ts";

export const contextDataToContext = (
    contextData: ModelContextData,
): ModelContext => {
    const model = contextData.model

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