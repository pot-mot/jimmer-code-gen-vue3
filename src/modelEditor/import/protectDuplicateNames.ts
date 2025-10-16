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
        const nameSet = buildNameSet([])
        for (const it of contextData.groupMap.values()) nameSet.add(it.name)
        for (const group of groups) group.name = nameSet.nextThenAdd(group.name)
    }
    if (entities.length > 0) {
        const nameSet = buildNameSet([])
        for (const it of contextData.entityMap.values()) nameSet.add(it.name)
        for (const {data} of entities) data.name = nameSet.nextThenAdd(data.name)
    }
    if (mappedSuperClasses.length > 0) {
        const nameSet = buildNameSet([])
        for (const it of contextData.mappedSuperClassMap.values()) nameSet.add(it.name)
        for (const {data} of mappedSuperClasses) data.name = nameSet.nextThenAdd(data.name)
    }
    if (embeddableTypes.length > 0) {
        const nameSet = buildNameSet([])
        for (const it of contextData.embeddableTypeMap.values()) nameSet.add(it.name)
        for (const {data} of embeddableTypes) data.name = nameSet.nextThenAdd(data.name)
    }
    if (enumerations.length > 0) {
        const nameSet = buildNameSet([])
        for (const it of contextData.enumerationMap.values()) nameSet.add(it.name)
        for (const {data} of enumerations) data.name = nameSet.nextThenAdd(data.name)
    }
    if (associations.length > 0) {
        const nameSet = buildNameSet([])
        for (const {data} of associations) {
            if ("name" in data && !data.useNameTemplate) nameSet.add(data.name)
        }
        for (const {data} of associations) {
            if ("name" in data && !data.useNameTemplate) data.name = nameSet.nextThenAdd(data.name)
        }
    }
}
