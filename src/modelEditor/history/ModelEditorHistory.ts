import {type CommandDefinition, useCommandHistory} from "@/history/commandHistory.ts";
import {type XYPosition} from "@vue-flow/core";
import {ref} from "vue";
import type {ModelEditorGlobal} from "@/modelEditor/useModelEditor.ts";
import {v7 as uuid} from "uuid"
import {NodeType_Entity} from "@/modelEditor/node/EntityNode.ts";

export type ModelEditorHistoryCommands = {
    "group:add": CommandDefinition<{
        group: Omit<Group, "id">
    }, {
        id: string
    }>
    "group:change": CommandDefinition<{
        group: Group
    }>

    "entity:add": CommandDefinition<{
        entity: Omit<Entity, "id">
        position: XYPosition
    }, {
        id: string
    }>
    "entity:change": CommandDefinition<{
        entity: EntityWithProperties
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
        mappedSuperClass: Omit<MappedSuperClass, "id">
        position: XYPosition
    }, {
        id: string
    }>
    "mapped-super-class:change": CommandDefinition<{
        mappedSuperClass: MappedSuperClassWithProperties
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
        embeddableType: Omit<EmbeddableType, "id">
    }, {
        id: string
    }>
    "embeddable-type:change": CommandDefinition<{
        embeddableType: EmbeddableTypeWithProperties
    }>

    "enumeration:add": CommandDefinition<{
        enumeration: Omit<Enumeration, "id">
    }, {
        id: string
    }>
    "enumeration:change": CommandDefinition<{
        enumeration: Enumeration
    }>

    "association:add": CommandDefinition<{
        association: Omit<Association, "id">
    }, {
        id: string
    }>
    "association:change": CommandDefinition<{
        association: Association
    }>

    "import": CommandDefinition<ModelSubData, ModelSubIds>
    "remove": CommandDefinition<ModelSubIds, ModelSubData>
}

const createId = (type: string) => {
    return `${type}_${uuid()}`
}

export const useModelEditorHistory = (
    global: ModelEditorGlobal
) => {
    const history = useCommandHistory<ModelEditorHistoryCommands>()

    const canUndo = ref(history.canUndo())
    const canRedo = ref(history.canRedo())
    history.eventBus.on("clean", () => {
        canUndo.value = history.canUndo()
        canRedo.value = history.canRedo()
    })
    history.eventBus.on("change", () => {
        canUndo.value = history.canUndo()
        canRedo.value = history.canRedo()
    })
    history.eventBus.on("batchStop", () => {
        canUndo.value = history.canUndo()
        canRedo.value = history.canRedo()
    })

    const getContext = () => {
        const context = global.contextData.value
        if (!context) {
            throw new Error("Context is not available")
        }
        return context
    }

    const getVueFlow = () => {
        const vueFlow = global.vueFlow.value
        if (!vueFlow) {
            throw new Error("VueFlow is not available")
        }
        return vueFlow
    }

    // 分组
    const addGroup = ({group}: { group: Omit<Group, 'id'> }) => {
        const context = getContext()
        const id = createId("group")
        if (context.groupMap.has(id)) throw new Error(`Group [${id}] is already existed`)
        const groupWithId = {...group, id}
        context.groupMap.set(id, groupWithId)
        return {id}
    }
    const removeGroup = ({id}: { id: string }) => {
        const context = getContext()
        const group = context.groupMap.get(id)
        if (!group) throw new Error(`Group [${id}] is not existed`)
        context.groupMap.delete(id)
        return {group}
    }
    const updateGroup = ({group}: { group: Group }) => {
        const context = getContext()
        const existedGroup = context.groupMap.get(group.id)
        if (!existedGroup) throw new Error(`Group [${group.id}] is not existed`)
        context.groupMap.set(group.id, group)
        return {group: existedGroup}
    }
    history.registerCommand("group:add", {
        applyAction: addGroup,
        revertAction: removeGroup,
    })
    history.registerCommand("group:change", {
        applyAction: updateGroup,
        revertAction: updateGroup,
    })

    // 实体
    const addEntity = ({entity, position}: { entity: Omit<Entity, 'id'>; position: XYPosition }) => {
        const context = getContext()
        const vueFlow = getVueFlow()
        const id = createId("entity")
        if (context.entityMap.has(id)) throw new Error(`Entity [${id}] is already existed`)
        if (!context.groupMap.has(entity.groupId)) throw new Error(`Group [${entity.groupId}] is not existed`)
        const entityWithId: EntityWithProperties = {...entity, id, properties: []}
        const entityNode = {
            id,
            type: NodeType_Entity,
            position,
            data: {entity: entityWithId},
        }
        context.entityMap.set(id, entityWithId)
        vueFlow.addNodes(entityNode)
        return {id}
    }

    const removeEntity = ({id}: { id: string }) => {
        const context = getContext()
        const vueFlow = getVueFlow()
        const entity = context.entityMap.get(id)
        if (!entity) throw new Error(`Entity [${id}] is not existed`)
        const entityNode = vueFlow.findNode(id)
        if (!entityNode) throw new Error(`Entity [${id}] is not existed`)
        context.entityMap.delete(id)
        vueFlow.removeNodes([entityNode])
        return {entity, position: entityNode.position}
    }

    const updateEntity = ({entity}: { entity: EntityWithProperties }) => {
        const context = getContext()
        const vueFlow = getVueFlow()
        const existedEntity = context.entityMap.get(entity.id)
        if (!existedEntity) throw new Error(`Entity [${entity.id}] is not existed`)
        const existingEntityNode = vueFlow.findNode(entity.id)
        if (!existingEntityNode) throw new Error(`Entity [${entity.id}] is not existed`)
        if (!context.groupMap.has(entity.groupId)) throw new Error(`Group [${entity.groupId}] is not existed`)
        context.entityMap.set(entity.id, entity)
        existingEntityNode.data.entity = entity
        return {entity: existedEntity}
    }

    history.registerCommand("entity:add", {
        applyAction: addEntity,
        revertAction: removeEntity,
    })

    history.registerCommand("entity:change", {
        applyAction: updateEntity,
        revertAction: updateEntity,
    })

    history.registerCommand("entity:node:move", {
        applyAction: ({id, newPosition, oldPosition}) => {
            const vueFlow = getVueFlow()
            vueFlow.updateNode(id, {position: newPosition})
            return {id, oldPosition}
        },
        revertAction: ({id, oldPosition}) => {
            const vueFlow = getVueFlow()
            vueFlow.updateNode(id, {position: oldPosition})
        }
    })

    // 映射抽象实体
    const addMappedSuperClass = ({mappedSuperClass, position}: {
        mappedSuperClass: Omit<MappedSuperClass, 'id'>;
        position: XYPosition
    }) => {
        const context = getContext()
        const vueFlow = getVueFlow()
        const id = createId("mapped-super-class")
        if (context.mappedSuperClassMap.has(id)) throw new Error(`MappedSuperClass [${id}] is already existed`)
        if (!context.groupMap.has(mappedSuperClass.groupId)) throw new Error(`Group [${mappedSuperClass.groupId}] is not existed`)
        const mappedSuperClassWithId: MappedSuperClassWithProperties = {...mappedSuperClass, id, properties: []}
        const mappedSuperClassNode = {
            id,
            type: 'mapped-super-class', // 需要定义 NodeType_MappedSuperClass 常量
            position,
            data: {mappedSuperClass: mappedSuperClassWithId},
        }
        context.mappedSuperClassMap.set(id, mappedSuperClassWithId)
        vueFlow.addNodes(mappedSuperClassNode)
        return {id}
    }

    const removeMappedSuperClass = ({id}: { id: string }) => {
        const context = getContext()
        const vueFlow = getVueFlow()
        const mappedSuperClass = context.mappedSuperClassMap.get(id)
        if (!mappedSuperClass) throw new Error(`MappedSuperClass [${id}] is not existed`)
        const mappedSuperClassNode = vueFlow.findNode(id)
        if (!mappedSuperClassNode) throw new Error(`MappedSuperClass [${id}] is not existed`)
        context.mappedSuperClassMap.delete(id)
        vueFlow.removeNodes([mappedSuperClassNode])
        return {mappedSuperClass, position: mappedSuperClassNode.position}
    }

    const updateMappedSuperClass = ({mappedSuperClass}: { mappedSuperClass: MappedSuperClassWithProperties }) => {
        const context = getContext()
        const vueFlow = getVueFlow()
        const existedMappedSuperClass = context.mappedSuperClassMap.get(mappedSuperClass.id)
        if (!existedMappedSuperClass) throw new Error(`MappedSuperClass [${mappedSuperClass.id}] is not existed`)
        const existingMappedSuperClassNode = vueFlow.findNode(mappedSuperClass.id)
        if (!existingMappedSuperClassNode) throw new Error(`MappedSuperClass [${mappedSuperClass.id}] is not existed`)
        if (!context.groupMap.has(mappedSuperClass.groupId)) throw new Error(`Group [${mappedSuperClass.groupId}] is not existed`)
        context.mappedSuperClassMap.set(mappedSuperClass.id, mappedSuperClass)
        existingMappedSuperClassNode.data.mappedSuperClass = mappedSuperClass
        return {mappedSuperClass: existedMappedSuperClass}
    }

    history.registerCommand("mapped-super-class:add", {
        applyAction: addMappedSuperClass,
        revertAction: removeMappedSuperClass,
    })

    history.registerCommand("mapped-super-class:change", {
        applyAction: updateMappedSuperClass,
        revertAction: updateMappedSuperClass,
    })

    history.registerCommand("mapped-super-class:node:move", {
        applyAction: ({id, newPosition, oldPosition}) => {
            const vueFlow = getVueFlow()
            vueFlow.updateNode(id, {position: newPosition})
            return {id, oldPosition}
        },
        revertAction: ({id, oldPosition}) => {
            const vueFlow = getVueFlow()
            vueFlow.updateNode(id, {position: oldPosition})
        }
    })

    // 内嵌类型
    const addEmbeddableType = ({embeddableType}: { embeddableType: Omit<EmbeddableType, 'id'> }) => {
        const context = getContext()
        const id = createId("embeddable-type")
        if (context.embeddableTypeMap.has(id)) throw new Error(`EmbeddableType [${id}] is already existed`)
        if (!context.groupMap.has(embeddableType.groupId)) throw new Error(`Group [${embeddableType.groupId}] is not existed`)
        const embeddableTypeWithId: EmbeddableTypeWithProperties = {...embeddableType, id, properties: []}
        context.embeddableTypeMap.set(id, embeddableTypeWithId)
        return {id}
    }

    const removeEmbeddableType = ({id}: { id: string }) => {
        const context = getContext()
        const embeddableType = context.embeddableTypeMap.get(id)
        if (!embeddableType) throw new Error(`EmbeddableType [${id}] is not existed`)
        context.embeddableTypeMap.delete(id)
        return {embeddableType}
    }

    const updateEmbeddableType = ({embeddableType}: { embeddableType: EmbeddableTypeWithProperties }) => {
        const context = getContext()
        const existedEmbeddableType = context.embeddableTypeMap.get(embeddableType.id)
        if (!existedEmbeddableType) throw new Error(`EmbeddableType [${embeddableType.id}] is not existed`)
        if (!context.groupMap.has(embeddableType.groupId)) throw new Error(`Group [${embeddableType.groupId}] is not existed`)
        context.embeddableTypeMap.set(embeddableType.id, embeddableType)
        return {embeddableType: existedEmbeddableType}
    }

    history.registerCommand("embeddable-type:add", {
        applyAction: addEmbeddableType,
        revertAction: removeEmbeddableType,
    })

    history.registerCommand("embeddable-type:change", {
        applyAction: updateEmbeddableType,
        revertAction: updateEmbeddableType,
    })

    // 枚举
    const addEnumeration = ({enumeration}: { enumeration: Omit<Enumeration, 'id'> }) => {
        const context = getContext()
        const id = createId("enumeration")
        if (context.enumerationMap.has(id)) throw new Error(`Enumeration [${id}] is already existed`)
        if (!context.groupMap.has(enumeration.groupId)) throw new Error(`Group [${enumeration.groupId}] is not existed`)
        const enumerationWithId = {...enumeration, id}
        context.enumerationMap.set(id, enumerationWithId)
        return {id}
    }

    const removeEnumeration = ({id}: { id: string }) => {
        const context = getContext()
        const enumeration = context.enumerationMap.get(id)
        if (!enumeration) throw new Error(`Enumeration [${id}] is not existed`)
        context.enumerationMap.delete(id)
        return {enumeration}
    }

    const updateEnumeration = ({enumeration}: { enumeration: Enumeration }) => {
        const context = getContext()
        const existedEnumeration = context.enumerationMap.get(enumeration.id)
        if (!existedEnumeration) throw new Error(`Enumeration [${enumeration.id}] is not existed`)
        if (!context.groupMap.has(enumeration.groupId)) throw new Error(`Group [${enumeration.groupId}] is not existed`)
        context.enumerationMap.set(enumeration.id, enumeration)
        return {enumeration: existedEnumeration}
    }

    history.registerCommand("enumeration:add", {
        applyAction: addEnumeration,
        revertAction: removeEnumeration,
    })

    history.registerCommand("enumeration:change", {
        applyAction: updateEnumeration,
        revertAction: updateEnumeration,
    })

    // 关联
    const addAssociation = ({association}: { association: Omit<Association, 'id'> }) => {
        const context = getContext()
        const id = createId("association")
        if (context.associationMap.has(id)) throw new Error(`Association [${id}] is already existed`)
        const associationWithId = {...association, id}
        context.associationMap.set(id, associationWithId)
        return {id}
    }

    const removeAssociation = ({id}: { id: string }) => {
        const context = getContext()
        const association = context.associationMap.get(id)
        if (!association) throw new Error(`Association [${id}] is not existed`)
        context.associationMap.delete(id)
        return {association}
    }

    const updateAssociation = ({association}: { association: Association }) => {
        const context = getContext()
        const existedAssociation = context.associationMap.get(association.id)
        if (!existedAssociation) throw new Error(`Association [${association.id}] is not existed`)
        context.associationMap.set(association.id, association)
        return {association: existedAssociation}
    }

    history.registerCommand("association:add", {
        applyAction: addAssociation,
        revertAction: removeAssociation,
    })

    history.registerCommand("association:change", {
        applyAction: updateAssociation,
        revertAction: updateAssociation,
    })

    return {
        history,
        canUndo,
        canRedo,
    }
}

