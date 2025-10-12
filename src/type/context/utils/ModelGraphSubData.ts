import type {VueFlowStore} from "@vue-flow/core";

export const defaultModelGraphSubData: () => ModelGraphSubData = () => ({
    groups: [],
    entities: [],
    mappedSuperClasses: [],
    embeddableTypes: [],
    enumerations: [],
    associations: [],
})

export const fillModelGraphSubData = (data: Partial<ModelGraphSubData>): ModelGraphSubData => {
    const result = defaultModelGraphSubData()
    for (const group of data.groups ?? []) result.groups.push(group)
    for (const entity of data.entities ?? []) result.entities.push(entity)
    for (const mappedSuperClass of data.mappedSuperClasses ?? []) result.mappedSuperClasses.push(mappedSuperClass)
    for (const embeddableType of data.embeddableTypes ?? []) result.embeddableTypes.push(embeddableType)
    for (const enumeration of data.enumerations ?? []) result.enumerations.push(enumeration)
    for (const association of data.associations ?? []) result.associations.push(association)
    return result
}


export const graphDataToModelData = (
    graphData: ModelGraphSubData,
    contextData: ModelContextData,
): ModelSubData => {
    const entityMap = new Map<string, EntityWithProperties>()
    for (const [id, entity] of contextData.entityMap) {
        if (entityMap.has(id)) throw new Error(`Entity ${id} already exists`)
        entityMap.set(id, entity)
    }
    for (const {data: entity} of graphData.entities) {
        if (entityMap.has(entity.id)) throw new Error(`Entity ${entity.id} already exists`)
        entityMap.set(entity.id, entity)
    }

    const mappedSuperClassMap = new Map<string, MappedSuperClassWithProperties>()
    for (const [id, mappedSuperClass] of contextData.mappedSuperClassMap) {
        if (mappedSuperClassMap.has(id)) throw new Error(`MappedSuperClass ${id} already exists`)
        mappedSuperClassMap.set(id, mappedSuperClass)
    }
    for (const {data: mappedSuperClass} of graphData.mappedSuperClasses) {
        if (entityMap.has(mappedSuperClass.id)) throw new Error(`MappedSuperClass ${mappedSuperClass.id} already exists`)
        mappedSuperClassMap.set(mappedSuperClass.id, mappedSuperClass)
    }

    return{
        groups: graphData.groups,
        entities: graphData.entities.map(it => it.data),
        mappedSuperClasses: graphData.mappedSuperClasses.map(it => it.data),
        embeddableTypes: graphData.embeddableTypes.map(it => it.data),
        enumerations: graphData.enumerations.map(it => it.data),
        associations: graphData.associations.map(it => ({association: it.data, labelPosition: it.labelPosition})),
    }
}

export const modelDataToGraphData = (
    data: ModelSubData,
    vueFlow: VueFlowStore,
): ModelGraphSubData => {
    const entityWithPosition = []
    for (const entity of data.entities) {
        const node = vueFlow.findNode(entity.id)
        if (!node) throw new Error(`Entity ${entity.id} Node not found`)
        entityWithPosition.push({data: entity, position: node.position})
    }
    const mappedSuperClassWithPositions = []
    for (const mappedSuperClass of data.mappedSuperClasses) {
        const node = vueFlow.findNode(mappedSuperClass.id)
        if (!node) throw new Error(`MappedSuperClass ${mappedSuperClass.id} Node not found`)
        mappedSuperClassWithPositions.push({data: mappedSuperClass, position: node.position})
    }
    const embeddableTypeWithPositions = []
    for (const embeddableType of data.embeddableTypes) {
        const node = vueFlow.findNode(embeddableType.id)
        if (!node) throw new Error(`EmbeddableType ${embeddableType.id} Node not found`)
        embeddableTypeWithPositions.push({data: embeddableType, position: node.position})
    }
    const enumerationWithPositions = []
    for (const enumeration of data.enumerations) {
        const node = vueFlow.findNode(enumeration.id)
        if (!node) throw new Error(`Enumeration ${enumeration.id} Node not found`)
        enumerationWithPositions.push({data: enumeration, position: node.position})
    }
    const edgedAssociations = []
    for (const {association, labelPosition} of data.associations) {
            edgedAssociations.push({data: association, labelPosition})
    }
    return{
        groups: data.groups,
        entities: entityWithPosition,
        mappedSuperClasses: mappedSuperClassWithPositions,
        embeddableTypes: embeddableTypeWithPositions,
        enumerations: enumerationWithPositions,
        associations: edgedAssociations,
    }
}