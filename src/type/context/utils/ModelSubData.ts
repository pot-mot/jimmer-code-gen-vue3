export const defaultModelSubData: () => ModelSubData = () => ({
    groups: [],
    entities: [],
    mappedSuperClasses: [],
    embeddableTypes: [],
    enumerations: [],
    associations: [],
})

export const fillModelSubData = (data: Partial<ModelGraphSubData>): ModelGraphSubData => {
    return Object.assign(defaultModelSubData(), data)
}

export const contextDataGetSubData = (
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

export const contextDataGetSelectSubData = (
    contextData: ModelContextData,
    selectIds: DeepReadonly<ModelSubIdSets>,
): ModelSubData => {
    const result = defaultModelSubData()

    for (const group of contextData.groupMap.values()) {
        if (selectIds.groupIdSet.has(group.id)) {
            result.groups.push(group)
        }
    }
    for (const entity of contextData.entityMap.values()) {
        if (selectIds.entityIdSet.has(entity.id)) {
            result.entities.push(entity)
        }
    }
    for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
        if (selectIds.mappedSuperClassIdSet.has(mappedSuperClass.id)) {
            result.mappedSuperClasses.push(mappedSuperClass)
        }
    }
    for (const embeddableType of contextData.embeddableTypeMap.values()) {
        if (selectIds.embeddableTypeIdSet.has(embeddableType.id)) {
            result.embeddableTypes.push(embeddableType)
        }
    }
    for (const enumeration of contextData.enumerationMap.values()) {
        if (selectIds.enumerationIdSet.has(enumeration.id)) {
            result.enumerations.push(enumeration)
        }
    }
    for (const association of contextData.associationMap.values()) {
        if (selectIds.associationIdSet.has(association.id)) {
            result.associations.push(association)
        }
    }

    return result
}
