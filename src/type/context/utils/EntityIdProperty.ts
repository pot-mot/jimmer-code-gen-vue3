export const getEntityIdProperty = (
    entity: DeepReadonly<EntityWithProperties>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>
): DeepReadonly<IdCommonProperty | IdEmbeddableProperty> | undefined => {
    for (const property of entity.properties) {
        if (property.category === "ID_COMMON" || property.category === "ID_EMBEDDABLE") {
            return property
        }
    }
    const allExtendsIds: string[] = [...entity.extendsIds]
    for (const mappedSuperClassId of allExtendsIds) {
        const mappedSuperClass = mappedSuperClassMap.get(mappedSuperClassId)
        if (mappedSuperClass === undefined) continue
        for (const property of mappedSuperClass.properties) {
            if (property.category === "ID_COMMON" || property.category === "ID_EMBEDDABLE") {
                return property
            }
        }
        allExtendsIds.push(...mappedSuperClass.extendsIds)
    }
}
