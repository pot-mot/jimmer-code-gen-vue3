import {type CommandDefinition, useCommandHistory} from "@/history/commandHistory.ts";
import {type VueFlowStore, type XYPosition} from "@vue-flow/core";
import {readonly, type Ref, ref, type ShallowRef} from "vue";
import {v7 as uuid} from "uuid"
import {type EntityNode, NodeType_Entity} from "@/modelEditor/node/EntityNode.ts";
import type {MenuItem} from "@/modelEditor/useModelEditor.ts";
import {type MappedSuperClassNode, NodeType_MappedSuperClass} from "@/modelEditor/node/MappedSuperClassNode.ts";

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
    modelEditorState: {
        contextData: Ref<ModelContextData | undefined>
        vueFlow: ShallowRef<VueFlowStore>,
    }
) => {
    const {contextData, vueFlow} = modelEditorState

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
        const context = contextData.value
        if (!context) {
            throw new Error("Context is not available")
        }
        return context
    }

    const getVueFlow = () => {
        if (!vueFlow.value) {
            throw new Error("VueFlow is not available")
        }
        return vueFlow.value
    }

    const menuMap = ref(new Map<string, MenuItem>())

    // 分组
    const addGroup = ({group}: { group: Omit<Group, 'id'> }) => {
        const context = getContext()

        const id = createId("group")

        if (context.groupMap.has(id)) throw new Error(`Group [${id}] is already existed`)
        if (menuMap.value.has(id)) throw new Error(`Menu item [${id}] is already existed in menuMap`)

        const groupWithId = {...group, id}
        context.groupMap.set(id, groupWithId)
        menuMap.value.set(id, {
            group: groupWithId,
            entityMap: new Map(),
            mappedSuperClassMap: new Map(),
            embeddableTypeMap: new Map(),
            enumerationMap: new Map()
        })
        return {id}
    }
    const revertAddGroup = ({id}: { id: string }) => {
        const context = getContext()

        const group = context.groupMap.get(id)
        if (!group) throw new Error(`Group [${id}] is not existed`)
        const menuItem = menuMap.value.get(id)
        if (!menuItem) throw new Error(`Group [${id}] is not existed in menuMap`)

        if (menuItem.entityMap.size > 0) throw new Error(`Group [${id}] has entities, can't remove`)
        if (menuItem.mappedSuperClassMap.size > 0) throw new Error(`Group [${id}] has mapped super classes, can't remove`)
        if (menuItem.embeddableTypeMap.size > 0) throw new Error(`Group [${id}] has embeddable types, can't remove`)
        if (menuItem.enumerationMap.size > 0) throw new Error(`Group [${id}] has enumerations, can't remove`)

        context.groupMap.delete(id)
        menuMap.value.delete(id)
        return {group}
    }
    const updateGroup = ({group}: { group: Group }) => {
        const context = getContext()

        const existedGroup = context.groupMap.get(group.id)
        if (!existedGroup) throw new Error(`Group [${group.id}] is not existed`)
        const menuItem = menuMap.value.get(group.id)
        if (!menuItem) throw new Error(`Group [${group.id}] is not existed in menuMap`)

        context.groupMap.set(group.id, group)
        menuItem.group = group
        return {group: existedGroup}
    }
    history.registerCommand("group:add", {
        applyAction: addGroup,
        revertAction: revertAddGroup,
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
        const menuItem = menuMap.value.get(entity.groupId)
        if (!menuItem) throw new Error(`Group [${entity.groupId}] is not existed in menuMap`)
        if (menuItem.entityMap.has(id)) throw new Error(`Entity [${id}] is already existed in group [${entity.groupId}]`)

        const entityWithId: EntityWithProperties = {...entity, id, properties: []}
        const entityNode: EntityNode = {
            id,
            type: NodeType_Entity,
            position,
            data: {entity: entityWithId},
        }
        context.entityMap.set(id, entityWithId)
        menuItem.entityMap.set(id, entityWithId)
        vueFlow.addNodes(entityNode)
        return {id}
    }

    const revertAddEntity = ({id}: { id: string }) => {
        const context = getContext()
        const vueFlow = getVueFlow()

        const entity = context.entityMap.get(id)
        if (!entity) throw new Error(`Entity [${id}] is not existed`)
        const entityNode = vueFlow.findNode(id)
        if (!entityNode) throw new Error(`Entity [${id}] is not existed`)
        const menuItem = menuMap.value.get(entity.groupId)
        if (!menuItem) throw new Error(`Group [${entity.groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`Entity [${id}] is not existed in group [${entity.groupId}]`)

        context.entityMap.delete(id)
        menuItem.entityMap.delete(id)
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
        const menuItem = menuMap.value.get(entity.groupId)
        if (!menuItem) throw new Error(`Group [${entity.groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(entity.id)) throw new Error(`Entity [${entity.id}] is not existed in group [${entity.groupId}]`)

        context.entityMap.set(entity.id, entity)
        menuItem.entityMap.set(entity.id, entity)
        existingEntityNode.data.entity = entity
        return {entity: existedEntity}
    }

    history.registerCommand("entity:add", {
        applyAction: addEntity,
        revertAction: revertAddEntity,
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
        const menuItem = menuMap.value.get(mappedSuperClass.groupId)
        if (!menuItem) throw new Error(`Group [${mappedSuperClass.groupId}] is not existed in menuMap`)
        if (menuItem.entityMap.has(id)) throw new Error(`MappedSuperClass [${id}] is already existed in group [${mappedSuperClass.groupId}]`)

        const mappedSuperClassWithId: MappedSuperClassWithProperties = {...mappedSuperClass, id, properties: []}
        const mappedSuperClassNode: MappedSuperClassNode = {
            id,
            type: NodeType_MappedSuperClass,
            position,
            data: {mappedSuperClass: mappedSuperClassWithId},
        }
        context.mappedSuperClassMap.set(id, mappedSuperClassWithId)
        menuItem.mappedSuperClassMap.set(id, mappedSuperClassWithId)
        vueFlow.addNodes(mappedSuperClassNode)
        return {id}
    }

    const revertAddMappedSuperClass = ({id}: { id: string }) => {
        const context = getContext()
        const vueFlow = getVueFlow()

        const mappedSuperClass = context.mappedSuperClassMap.get(id)
        if (!mappedSuperClass) throw new Error(`MappedSuperClass [${id}] is not existed`)
        const mappedSuperClassNode = vueFlow.findNode(id)
        if (!mappedSuperClassNode) throw new Error(`MappedSuperClass [${id}] is not existed`)
        const menuItem = menuMap.value.get(mappedSuperClass.groupId)
        if (!menuItem) throw new Error(`Group [${mappedSuperClass.groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`MappedSuperClass [${id}] is not existed in group [${mappedSuperClass.groupId}]`)

        context.mappedSuperClassMap.delete(id)
        menuItem.mappedSuperClassMap.delete(id)
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
        const menuItem = menuMap.value.get(mappedSuperClass.groupId)
        if (!menuItem) throw new Error(`Group [${mappedSuperClass.groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(mappedSuperClass.id)) throw new Error(`MappedSuperClass [${mappedSuperClass.id}] is not existed in group [${mappedSuperClass.groupId}]`)

        context.mappedSuperClassMap.set(mappedSuperClass.id, mappedSuperClass)
        menuItem.mappedSuperClassMap.set(mappedSuperClass.id, mappedSuperClass)
        existingMappedSuperClassNode.data.mappedSuperClass = mappedSuperClass
        return {mappedSuperClass: existedMappedSuperClass}
    }

    history.registerCommand("mapped-super-class:add", {
        applyAction: addMappedSuperClass,
        revertAction: revertAddMappedSuperClass,
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
        const menuItem = menuMap.value.get(embeddableType.groupId)
        if (!menuItem) throw new Error(`Group [${embeddableType.groupId}] is not existed in menuMap`)
        if (menuItem.entityMap.has(id)) throw new Error(`EmbeddableType [${id}] is already existed in group [${embeddableType.groupId}]`)

        const embeddableTypeWithId: EmbeddableTypeWithProperties = {...embeddableType, id, properties: []}
        context.embeddableTypeMap.set(id, embeddableTypeWithId)
        return {id}
    }

    const revertAddEmbeddableType = ({id}: { id: string }) => {
        const context = getContext()

        const embeddableType = context.embeddableTypeMap.get(id)
        if (!embeddableType) throw new Error(`EmbeddableType [${id}] is not existed`)
        const menuItem = menuMap.value.get(embeddableType.groupId)
        if (!menuItem) throw new Error(`Group [${embeddableType.groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`EmbeddableType [${id}] is not existed in group [${embeddableType.groupId}]`)

        context.embeddableTypeMap.delete(id)
        menuItem.entityMap.delete(id)
        return {embeddableType}
    }

    const updateEmbeddableType = ({embeddableType}: { embeddableType: EmbeddableTypeWithProperties }) => {
        const context = getContext()

        const existedEmbeddableType = context.embeddableTypeMap.get(embeddableType.id)
        if (!existedEmbeddableType) throw new Error(`EmbeddableType [${embeddableType.id}] is not existed`)
        if (!context.groupMap.has(embeddableType.groupId)) throw new Error(`Group [${embeddableType.groupId}] is not existed`)
        const menuItem = menuMap.value.get(existedEmbeddableType.groupId)
        if (!menuItem) throw new Error(`Group [${existedEmbeddableType.groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(existedEmbeddableType.id)) throw new Error(`EmbeddableType [${existedEmbeddableType.id}] is not existed in group [${existedEmbeddableType.groupId}]`)

        context.embeddableTypeMap.set(embeddableType.id, embeddableType)
        menuItem.embeddableTypeMap.set(embeddableType.id, embeddableType)
        return {embeddableType: existedEmbeddableType}
    }

    history.registerCommand("embeddable-type:add", {
        applyAction: addEmbeddableType,
        revertAction: revertAddEmbeddableType,
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
        const menuItem = menuMap.value.get(enumeration.groupId)
        if (!menuItem) throw new Error(`Group [${enumeration.groupId}] is not existed in menuMap`)
        if (menuItem.entityMap.has(id)) throw new Error(`Enumeration [${id}] is already existed in group [${enumeration.groupId}]`)

        const enumerationWithId = {...enumeration, id}
        context.enumerationMap.set(id, enumerationWithId)
        menuItem.enumerationMap.set(id, enumerationWithId)
        return {id}
    }

    const revertAddEnumeration = ({id}: { id: string }) => {
        const context = getContext()

        const enumeration = context.enumerationMap.get(id)
        if (!enumeration) throw new Error(`Enumeration [${id}] is not existed`)
        const menuItem = menuMap.value.get(enumeration.groupId)
        if (!menuItem) throw new Error(`Group [${enumeration.groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`Enumeration [${id}] is not existed in group [${enumeration.groupId}]`)

        context.enumerationMap.delete(id)
        menuItem.enumerationMap.delete(id)
        return {enumeration}
    }

    const updateEnumeration = ({enumeration}: { enumeration: Enumeration }) => {
        const context = getContext()

        const existedEnumeration = context.enumerationMap.get(enumeration.id)
        if (!existedEnumeration) throw new Error(`Enumeration [${enumeration.id}] is not existed`)
        if (!context.groupMap.has(enumeration.groupId)) throw new Error(`Group [${enumeration.groupId}] is not existed`)
        const menuItem = menuMap.value.get(enumeration.groupId)
        if (!menuItem) throw new Error(`Group [${enumeration.groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(enumeration.id)) throw new Error(`Enumeration [${enumeration.id}] is not existed in group [${enumeration.groupId}]`)

        context.enumerationMap.set(enumeration.id, enumeration)
        menuItem.enumerationMap.set(enumeration.id, enumeration)
        return {enumeration: existedEnumeration}
    }

    history.registerCommand("enumeration:add", {
        applyAction: addEnumeration,
        revertAction: revertAddEnumeration,
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

    const revertAddAssociation = ({id}: { id: string }) => {
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
        revertAction: revertAddAssociation,
    })

    history.registerCommand("association:change", {
        applyAction: updateAssociation,
        revertAction: updateAssociation,
    })

    return {
        history,
        canUndo,
        canRedo,
        menuMap: readonly(menuMap)
    }
}

