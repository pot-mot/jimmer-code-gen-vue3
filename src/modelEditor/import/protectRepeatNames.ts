export type NameSet = {
    countMap: Map<string, number>,
    has(this: NameSet, name: string): boolean,
    add(this: NameSet, name: string): void,
    next(this: NameSet, name: string): string,
}

const createNameSet = (): NameSet => ({
    countMap: new Map<string, number>(),
    has(this: NameSet, name: string) {
        return this.countMap.has(name)
    },
    add(this: NameSet, name: string) {
        const count = this.countMap.get(name) ?? 0
        this.countMap.set(name, count + 1)
    },
    next(this: NameSet, name: string): string {
        let count = this.countMap.get(name)
        if (count === undefined) {
            return name
        } else {
            let currentName = `${name}(${count})`
            while (this.has(currentName)) {
                count ++
                currentName = `${name}(${count})`
            }
            this.add(currentName)
            return currentName
        }
    }
})

export const buildNameSets = (
    nameOwners: DeepReadonly<Iterable<{name: string}>>
): NameSet => {
    const nameSet = createNameSet()
    for (const {name} of nameOwners) {
        nameSet.add(name)
    }
    return nameSet
}

export const protectRepeatNames = (
    graphData: ModelGraphSubData,
    contextData: DeepReadonly<ModelContextData>,
) => {
    const {
        groups,
        entities,
        mappedSuperClasses,
        embeddableTypes,
        enumerations,
        associations,
    } = graphData

    if (groups.length > 0) {
        const groupNameSet = buildNameSets(contextData.groupMap.values())
        for (const group of groups) group.name = groupNameSet.next(group.name)
    }
    if (entities.length > 0) {
        const entityNameSet = buildNameSets(contextData.entityMap.values())
        for (const {data} of entities) data.name = entityNameSet.next(data.name)
    }
    if (mappedSuperClasses.length > 0) {
        const mappedSuperClassNameSet = buildNameSets(contextData.mappedSuperClassMap.values())
        for (const {data} of mappedSuperClasses) data.name = mappedSuperClassNameSet.next(data.name)
    }
    if (embeddableTypes.length > 0) {
        const embeddableTypeNameSet = buildNameSets(contextData.embeddableTypeMap.values())
        for (const {data} of embeddableTypes) data.name = embeddableTypeNameSet.next(data.name)
    }
    if (enumerations.length > 0) {
        const enumerationNameSet = buildNameSets(contextData.enumerationMap.values())
        for (const {data} of enumerations) data.name = enumerationNameSet.next(data.name)
    }
    if (associations.length > 0) {
        const associationNameSet = buildNameSets(contextData.associationMap.values())
        for (const association of associations) association.name = associationNameSet.next(association.name)

    }
}
