const defaultGroupSubMaps: () => GroupSubMaps = () => ({
    entityMap: new Map<string, EntityWithInheritInfo>(),
    mappedSuperClassMap: new Map<string, MappedSuperClassWithInheritInfo>(),
    embeddableTypeMap: new Map<string, EmbeddableTypeWithCategorizedProperties>(),
    enumerationMap: new Map<string, Enumeration>(),
})

export const getGroupSubMaps = (
    groupId: string,
    contextData: Pick<ModelContext, 'entityMap' | 'enumerationMap' | 'mappedSuperClassMap' | 'embeddableTypeMap'>,
): GroupSubMaps => {
    const result = defaultGroupSubMaps()

    for (const [id, entity] of contextData.entityMap) {
        if (entity.groupId === groupId) result.entityMap.set(id, entity)
    }
    for (const [id, mappedSuperClass] of contextData.mappedSuperClassMap) {
        if (mappedSuperClass.groupId === groupId) result.mappedSuperClassMap.set(id, mappedSuperClass)
    }
    for (const [id, embeddableType] of contextData.embeddableTypeMap) {
        if (embeddableType.groupId === groupId) result.embeddableTypeMap.set(id, embeddableType)
    }
    for (const [id, enumeration] of contextData.enumerationMap) {
        if (enumeration.groupId === groupId) result.enumerationMap.set(id, enumeration)
    }

    return result
}
