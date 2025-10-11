import {buildNameSet} from "@/utils/name/nameSet.ts";

export const protectDuplicateNames = (
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
        const nameSet = buildNameSet([...contextData.groupMap.values()].map(it => it.name))
        for (const group of groups) group.name = nameSet.next(group.name)
    }
    if (entities.length > 0) {
        const nameSet = buildNameSet([...contextData.entityMap.values()].map(it => it.name))
        for (const {data} of entities) data.name = nameSet.next(data.name)
    }
    if (mappedSuperClasses.length > 0) {
        const nameSet = buildNameSet([...contextData.mappedSuperClassMap.values()].map(it => it.name))
        for (const {data} of mappedSuperClasses) data.name = nameSet.next(data.name)
    }
    if (embeddableTypes.length > 0) {
        const nameSet = buildNameSet([...contextData.embeddableTypeMap.values()].map(it => it.name))
        for (const {data} of embeddableTypes) data.name = nameSet.next(data.name)
    }
    if (enumerations.length > 0) {
        const nameSet = buildNameSet([...contextData.enumerationMap.values()].map(it => it.name))
        for (const {data} of enumerations) data.name = nameSet.next(data.name)
    }
    if (associations.length > 0) {
        const associationNames: string[] = []
        for (const {data} of associations) {
            if ("name" in data && !data.useNameTemplate) {
                associationNames.push(data.name)
            }
        }
        const nameSet = buildNameSet(associationNames)
        for (const {data} of associations) {
            if ("name" in data && !data.useNameTemplate) {
                data.name = nameSet.next(data.name)
            }
        }
    }
}
