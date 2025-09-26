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
