import {type AllExtendsResult, getEntityAllExtends, getEntityAllProperties} from "@/type/context/utils/entityExtends.ts";
import {
    categorizeEmbeddableTypeProperties,
    categorizeProperties,
    validCategorizedPropertiesRequiredId
} from "@/type/context/utils/CategorizedProperties.ts";
import {getGroupSubData} from "@/type/context/utils/GroupSubData.ts";
import {getAssociationSubData} from "@/type/context/utils/AssociationSubData.ts";

const defaultModelSubData: () => ModelSubData = () => ({
    groups: [],
    entities: [],
    mappedSuperClasses: [],
    embeddableTypes: [],
    enumerations: [],
    associations: [],
})

export const fillModelSubData = (data: ModelSubData): ModelSubData => {
    return Object.assign(defaultModelSubData(), data)
}

export const getModelSubData = (
    contextData: ModelContextData,
): ModelSubData => {
    const result = defaultModelSubData()

    for (const group of contextData.groupMap.values()) {
        result.groups.push(group)
    }
    for (const entity of contextData.entityMap.values()) {
        result.entities.push(entity)
    }
    for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
        result.mappedSuperClasses.push(mappedSuperClass)
    }
    for (const embeddableType of contextData.embeddableTypeMap.values()) {
        result.embeddableTypes.push(embeddableType)
    }
    for (const enumeration of contextData.enumerationMap.values()) {
        result.enumerations.push(enumeration)
    }
    for (const association of contextData.associationMap.values()) {
        result.associations.push(association)
    }

    return result
}

export const contextDataToContext = (
    contextData: ModelContextData,
): ModelContext => {
    const model: ModelWithSubData = {
        ...contextData.model,
        ...getModelSubData(contextData),
    }

    // 解析基本拓展数据
    const groupMap = new Map<string, GroupWithSubData>()

    for (const [id, group] of contextData.groupMap) {
        const subData: GroupWithSubData = {
            ...group,
            ...getGroupSubData(id, contextData),
        }
        groupMap.set(id, subData)
    }

    const entityMap = new Map<string, EntityWithCategorizedProperties>()
    for (const [id, entity] of contextData.entityMap) {
        const categorizedProperties = categorizeProperties(entity.properties)
        if (!validCategorizedPropertiesRequiredId(categorizedProperties)) {
            throw new Error(`Entity ${entity.name}(${entity.id}) has no idProperty`)
        }
        const entityWithCategorizedProperties: EntityWithCategorizedProperties = {
            ...entity,
            ...categorizedProperties,
        }
        entityMap.set(id, entityWithCategorizedProperties)
    }

    const mappedSuperClassMap = new Map<string, MappedSuperClassWithCategorizedProperties>()
    for (const [id, mappedSuperClass] of contextData.mappedSuperClassMap) {
        const categorizedProperties = categorizeProperties(mappedSuperClass.properties)
        const mappedSuperClassWithCategorizedProperties: MappedSuperClassWithCategorizedProperties = {
            ...mappedSuperClass,
            ...categorizedProperties,
        }
        mappedSuperClassMap.set(id, mappedSuperClassWithCategorizedProperties)
    }

    const embeddableTypeMap = new Map<string, EmbeddableTypeWithCategorizedProperties>()
    for (const [id, embeddableType] of contextData.embeddableTypeMap) {
        const categorizedProperties = categorizeEmbeddableTypeProperties(embeddableType.properties)
        const embeddableTypeWithCategorizedProperties: EmbeddableTypeWithCategorizedProperties = {
            ...embeddableType,
            ...categorizedProperties,
        }
        embeddableTypeMap.set(id, embeddableTypeWithCategorizedProperties)
    }

    const enumerationMap = new Map<string, Enumeration>()
    for (const [id, enumeration] of contextData.enumerationMap) {
        enumerationMap.set(id, enumeration)
    }
    const associationMap = new Map<string, AssociationWithSubData>()
    for (const [id, association] of contextData.associationMap) {
        const associationWithSubData: AssociationWithSubData = {
            ...association,
            ...getAssociationSubData(association, entityMap, mappedSuperClassMap),
        }
        associationMap.set(id, associationWithSubData)
    }

    // 解析继承关系
    const superClassAllExtendsResultMap = new Map<string, AllExtendsResult>()

    const mappedSuperClassAllExtendsMap = new Map<string, Set<MappedSuperClass>>()
    const mappedSuperClassAllPropertiesMap = new Map<string, CategorizedProperties>()

    for (const [id, mappedSuperClass] of contextData.mappedSuperClassMap) {
        const allExtends = getEntityAllExtends(mappedSuperClass, contextData, superClassAllExtendsResultMap)
        const allProperties = getEntityAllProperties(mappedSuperClass, contextData, allExtends)
        const allCategorizedProperties = categorizeProperties(allProperties)
        mappedSuperClassAllExtendsMap.set(id, allExtends)
        mappedSuperClassAllPropertiesMap.set(id, allCategorizedProperties)
    }

    const entityAllExtendsMap = new Map<string, Set<MappedSuperClass>>()
    const entityAllPropertiesMap = new Map<string, CategorizedPropertiesRequiredId>()

    for (const [id, entity] of contextData.entityMap) {
        const allExtends = getEntityAllExtends(entity, contextData, superClassAllExtendsResultMap)
        const allProperties = getEntityAllProperties(entity, contextData, allExtends)
        const allCategorizedProperties = categorizeProperties(allProperties)
        if (!validCategorizedPropertiesRequiredId(allCategorizedProperties)) {
            throw new Error(`Entity ${entity.name}(${entity.id}) has no idProperty`)
        }
        entityAllExtendsMap.set(id, allExtends)
        entityAllPropertiesMap.set(id, allCategorizedProperties)
    }

    return {
        model,
        groupMap,
        entityMap,
        mappedSuperClassMap,
        embeddableTypeMap,
        enumerationMap,
        associationMap,
        mappedSuperClassAllExtendsMap,
        mappedSuperClassAllPropertiesMap,
        entityAllExtendsMap,
        entityAllPropertiesMap,
    }
}