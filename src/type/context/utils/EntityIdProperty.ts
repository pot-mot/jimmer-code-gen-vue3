export const getEntityIdProperties = (
    entity: DeepReadonly<{properties: Property[], extendsIds: string[]}>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>
): DeepReadonly<IdCommonProperty | IdEmbeddableProperty>[] => {
    const idProperties: DeepReadonly<IdCommonProperty | IdEmbeddableProperty>[] = []
    for (const property of entity.properties) {
        if (property.category === "ID_COMMON" || property.category === "ID_EMBEDDABLE") {
            idProperties.push(property)
        }
    }
    const allExtendsIds: string[] = [...entity.extendsIds]
    for (const mappedSuperClassId of allExtendsIds) {
        const mappedSuperClass = mappedSuperClassMap.get(mappedSuperClassId)
        if (mappedSuperClass === undefined) continue
        for (const property of mappedSuperClass.properties) {
            if (property.category === "ID_COMMON" || property.category === "ID_EMBEDDABLE") {
                idProperties.push(property)
            }
        }
        allExtendsIds.push(...mappedSuperClass.extendsIds)
    }

    return idProperties
}
