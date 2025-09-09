const defaultGroupSubData: () => GroupSubData = () => ({
    entities: [],
    mappedSuperClasses: [],
    embeddableTypes: [],
    enumerations: [],
})

export const fillGroupSubData = (data: GroupSubData): GroupSubData => {
    return Object.assign(defaultGroupSubData(), data)
}

export const getGroupSubData = (
    groupId: string,
    contextData: ModelContextData,
): GroupSubData => {
    const result = defaultGroupSubData()

    for (const entity of contextData.entityMap.values()) {
        if (entity.groupId === groupId) result.entities.push(entity)
    }
    for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
        if (mappedSuperClass.groupId === groupId) result.mappedSuperClasses.push(mappedSuperClass)
    }
    for (const embeddableType of contextData.embeddableTypeMap.values()) {
        if (embeddableType.groupId === groupId) result.embeddableTypes.push(embeddableType)
    }
    for (const enumeration of contextData.enumerationMap.values()) {
        if (enumeration.groupId === groupId) result.enumerations.push(enumeration)
    }

    return result
}
