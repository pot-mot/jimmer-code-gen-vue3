const getEntityExtendsProperty = <R> (
    entity: DeepReadonly<{properties: Property[], extendsIds: string[]}>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>,
    filter: (property: DeepReadonly<Property>) => DeepReadonly<R> | undefined
): DeepReadonly<R>[] => {
    const resultProperties: DeepReadonly<R>[] = []
    for (const property of entity.properties) {
        const filteredProperty = filter(property)
        if (filteredProperty !== undefined) {
            resultProperties.push(filteredProperty)
        }
    }
    const visitedSet: Set<string> = new Set()
    const allExtendsIds = Array.from(entity.extendsIds)
    for (const mappedSuperClassId of allExtendsIds) {
        if (visitedSet.has(mappedSuperClassId)) continue

        visitedSet.add(mappedSuperClassId)

        const mappedSuperClass = mappedSuperClassMap.get(mappedSuperClassId)
        if (mappedSuperClass === undefined) continue
        for (const property of mappedSuperClass.properties) {
            const filteredProperty = filter(property)
            if (filteredProperty !== undefined) {
                resultProperties.push(filteredProperty)
            }
        }
        allExtendsIds.push(...mappedSuperClass.extendsIds)
    }
    return resultProperties
}

export const getEntityIdProperties = (
    entity: DeepReadonly<{properties: Property[], extendsIds: string[]}>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>
): DeepReadonly<IdCommonProperty | IdEmbeddableProperty>[] => {
    return getEntityExtendsProperty<IdCommonProperty | IdEmbeddableProperty>(
        entity,
        mappedSuperClassMap,
        property => {
            if (property.category === "ID_COMMON" || property.category === "ID_EMBEDDABLE") {
                return property
            } else {
                return undefined
            }
        }
    )
}

export const getEntityLogicalDeleteProperties = (
    entity: DeepReadonly<{properties: Property[], extendsIds: string[]}>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>
): DeepReadonly<(ScalarCommonProperty | ScalarEnumProperty) & LogicalDeleteProperty>[] => {
    return getEntityExtendsProperty<(ScalarCommonProperty | ScalarEnumProperty) & LogicalDeleteProperty>(
        entity,
        mappedSuperClassMap,
        property => {
            if ("logicalDelete" in property && property.logicalDelete) {
                return property
            } else {
                return undefined
            }
        }
    )
}

export const getEntityVersionProperties = (
    entity: DeepReadonly<{properties: Property[], extendsIds: string[]}>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>
): DeepReadonly<VersionProperty>[] => {
    return getEntityExtendsProperty<VersionProperty>(
        entity,
        mappedSuperClassMap,
        property => {
            if (property.category === "VERSION") {
                return property
            } else {
                return undefined
            }
        }
    )
}
