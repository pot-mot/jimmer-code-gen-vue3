import {type CommandDefinition} from "@/history/commandHistory.ts";
import {type GraphEdge, type GraphNode, type XYPosition} from "@vue-flow/core";

export type ModelEditorHistoryCommands = {
    "group:add": CommandDefinition<{
        group: Group
    }, {
        id: string
    }>
    "group:change": CommandDefinition<{
        data: Group
    }>
    "group:toggle": CommandDefinition<string>
    "group:dragged": CommandDefinition<{
        oldIndex: number
        newIndex: number
    }>
    "group:swapped": CommandDefinition<{
        oldIndex: number
        newIndex: number
    }>

    "entity:add": CommandDefinition<{
        entity: Entity
        position: XYPosition
    }, {
        id: string
    }>
    "entity:change": CommandDefinition<{
        entity: Entity
    }>
    "entity:node:move": CommandDefinition<{
        id: string
        newPosition: XYPosition
        oldPosition: XYPosition
    }, {
        id: string
        oldPosition: XYPosition
    }>

    "mapped-super-class:add": CommandDefinition<{
        mappedSuperClass: MappedSuperClass
        position: XYPosition
    }, {
        id: string
    }>
    "mapped-super-class:change": CommandDefinition<{
        mappedSuperClass: MappedSuperClass
    }>
    "mapped-super-class:node:move": CommandDefinition<{
        id: string
        newPosition: XYPosition
        oldPosition: XYPosition
    }, {
        id: string
        oldPosition: XYPosition
    }>

    "embeddable-type:add": CommandDefinition<{
        embeddableType: EmbeddableType
    }, {
        id: string
    }>
    "embeddable-type:change": CommandDefinition<{
        embeddableType: EmbeddableType
    }>

    "enumeration:add": CommandDefinition<{
        enumeration: Enumeration
    }, {
        id: string
    }>
    "enumeration:change": CommandDefinition<{
        enumeration: Enumeration
    }>

    "association:add": CommandDefinition<{
        association: Association
    }, {
        edgeId: string
    }>
    "association:change": CommandDefinition<{
        association: Association
    }>

    "import": CommandDefinition<{
        groups: Group[]
        entities: Entity[]
        embeddableTypes: EmbeddableType[]
        mappedSuperClasses: MappedSuperClass[]
        enumerations: Enumeration[]
        associations: Association[]
    }, {
        groupIds: string[]
        entityIds: string[]
        associationIds: string[]
    }>
    "remove": CommandDefinition<{
        groupId: string
        nodes?: (GraphNode | string)[]
        edges?: (GraphEdge | string)[]
    }, {
        groupId: string
        nodes: GraphNode[]
        edges: GraphEdge[]
    }>
}

export const useMindMapHistory = () => {
    return {}
}
