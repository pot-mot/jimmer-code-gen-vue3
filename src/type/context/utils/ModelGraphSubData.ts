import type {VueFlowStore} from "@vue-flow/core";
import {associationToIdOnly, idOnlyToAssociation} from "@/type/context/utils/AssociationIdOnly.ts";

export const defaultModelGraphSubData: () => ModelGraphSubData = () => ({
    groups: [],
    entities: [],
    mappedSuperClasses: [],
    embeddableTypes: [],
    enumerations: [],
    associations: [],
})

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
        associations: graphData.associations.map(it => idOnlyToAssociation(it, entityMap, mappedSuperClassMap)),
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
    const mappedSuperClassWithPosition = []
    for (const mappedSuperClass of data.mappedSuperClasses) {
        const node = vueFlow.findNode(mappedSuperClass.id)
        if (!node) throw new Error(`MappedSuperClass ${mappedSuperClass.id} Node not found`)
        mappedSuperClassWithPosition.push({data: mappedSuperClass, position: node.position})
    }
    const embeddableTypeWithPosition = []
    for (const embeddableType of data.embeddableTypes) {
        const node = vueFlow.findNode(embeddableType.id)
        if (!node) throw new Error(`EmbeddableType ${embeddableType.id} Node not found`)
        embeddableTypeWithPosition.push({data: embeddableType, position: node.position})
    }
    const enumerationWithPosition = []
    for (const enumeration of data.enumerations) {
        const node = vueFlow.findNode(enumeration.id)
        if (!node) throw new Error(`Enumeration ${enumeration.id} Node not found`)
        enumerationWithPosition.push({data: enumeration, position: node.position})
    }
    return{
        groups: data.groups,
        entities: entityWithPosition,
        mappedSuperClasses: mappedSuperClassWithPosition,
        embeddableTypes: embeddableTypeWithPosition,
        enumerations: enumerationWithPosition,
        associations: data.associations.map(it => associationToIdOnly(it)),
    }
}