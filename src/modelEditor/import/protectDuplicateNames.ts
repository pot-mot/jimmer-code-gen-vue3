import {buildNameSet, buildReadonlyNameSet} from "@/utils/name/nameSet.ts";

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
        const names: string[] = []
        for (const it of contextData.groupMap.values()) names.push(it.name)
        const nameSet = buildNameSet(names)
        for (const group of groups) group.name = nameSet.next(group.name)
    }
    if (entities.length > 0) {
        const names: string[] = []
        for (const it of contextData.entityMap.values()) names.push(it.name)
        const nameSet = buildReadonlyNameSet(names)
        for (const {data} of entities) data.name = nameSet.next(data.name)
    }
    if (mappedSuperClasses.length > 0) {
        const names: string[] = []
        for (const it of contextData.mappedSuperClassMap.values()) names.push(it.name)
        const nameSet = buildNameSet(names)
        for (const {data} of mappedSuperClasses) data.name = nameSet.next(data.name)
    }
    if (embeddableTypes.length > 0) {
        const names: string[] = []
        for (const it of contextData.embeddableTypeMap.values()) names.push(it.name)
        const nameSet = buildNameSet(names)
        for (const {data} of embeddableTypes) data.name = nameSet.next(data.name)
    }
    if (enumerations.length > 0) {
        const names: string[] = []
        for (const it of contextData.enumerationMap.values()) names.push(it.name)
        const nameSet = buildNameSet(names)
        for (const {data} of enumerations) data.name = nameSet.next(data.name)
    }
    if (associations.length > 0) {
        const names: string[] = []
        for (const {data} of associations) {
            if ("name" in data && !data.useNameTemplate) names.push(data.name)
        }
        const nameSet = buildNameSet(names)
        for (const {data} of associations) {
            if ("name" in data && !data.useNameTemplate) data.name = nameSet.next(data.name)
        }
    }
}
