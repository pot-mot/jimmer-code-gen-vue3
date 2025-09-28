export type NameSet = {
    countMap: Map<string, number>,
    has(this: NameSet, name: string): boolean,
    add(this: NameSet, name: string): number,
    next(this: NameSet, name: string): string,
}

const clearName = (name: string): string => {
    const trimName = name.trim()
    if (trimName.endsWith(")")) {
        const index = trimName.lastIndexOf("(")
        return trimName.slice(0, index)
    }
    return trimName
}

const createNameSet = (): NameSet => ({
    countMap: new Map<string, number>(),
    has(this: NameSet, name: string) {
        const cleanName = clearName(name)
        return this.countMap.has(cleanName)
    },
    add(this: NameSet, name: string) {
        const cleanName = clearName(name)
        const count = this.countMap.get(cleanName) ?? 0
        this.countMap.set(cleanName, count + 1)
        return count
    },
    next(name: string): string {
        const cleanName = clearName(name)
        if (!this.has(cleanName)) {
            this.add(cleanName)
            return cleanName
        } else {
            return `${cleanName}(${this.add(cleanName)})`

        }
    }
})

export const buildNameSets = (
    nameOwners: DeepReadonly<Iterable<{name: string}>>
): NameSet => {
    const nameSet = createNameSet()
    for (const {name} of nameOwners) {
        nameSet.add(clearName(name))
    }
    return nameSet
}

export const protectRepeatNames = (
    graphData: ModelGraphSubData,
    contextData: DeepReadonly<ModelContextData>,
) => {
    const groupNameSet = buildNameSets(contextData.groupMap.values())
    const entityNameSet = buildNameSets(contextData.entityMap.values())
    const mappedSuperClassNameSet = buildNameSets(contextData.mappedSuperClassMap.values())
    const embeddableTypeNameSet = buildNameSets(contextData.embeddableTypeMap.values())
    const enumerationNameSet = buildNameSets(contextData.enumerationMap.values())
    const associationNameSet = buildNameSets(contextData.associationMap.values())

    const {
        groups,
        entities,
        mappedSuperClasses,
        embeddableTypes,
        enumerations,
        associations,
    } = graphData


    for (const group of groups) group.name = groupNameSet.next(group.name)
    for (const {data} of entities) data.name = entityNameSet.next(data.name)
    for (const {data} of mappedSuperClasses) data.name = mappedSuperClassNameSet.next(data.name)
    for (const {data} of embeddableTypes) data.name = embeddableTypeNameSet.next(data.name)
    for (const {data} of enumerations) data.name = enumerationNameSet.next(data.name)
    for (const association of associations) association.name = associationNameSet.next(association.name)
}

// TODO create next name in modelEditor