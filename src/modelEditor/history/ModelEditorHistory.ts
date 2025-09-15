import {type CommandDefinition, useCommandHistory} from "@/history/commandHistory.ts";
import {type VueFlowStore, type XYPosition} from "@vue-flow/core";
import {readonly, type Ref, ref, type ShallowRef} from "vue";
import {v7 as uuid} from "uuid"
import {type EntityNode, NodeType_Entity} from "@/modelEditor/node/EntityNode.ts";
import type {MenuItem} from "@/modelEditor/useModelEditor.ts";
import {type MappedSuperClassNode, NodeType_MappedSuperClass} from "@/modelEditor/node/MappedSuperClassNode.ts";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";

export type ModelEditorHistoryCommands = {
    "group:toggle": CommandDefinition<{
        id: string | undefined
    }>

    "group:add": CommandDefinition<DeepReadonly<{
        group: Group
    }>, DeepReadonly<{
        id: string
    }>>
    "group:change": CommandDefinition<DeepReadonly<{
        group: Group
    }>>

    "entity:add": CommandDefinition<DeepReadonly<{
        entity: Entity
        position: XYPosition
    }>, DeepReadonly<{
        id: string
    }>>
    "entity:change": CommandDefinition<DeepReadonly<{
        entity: EntityWithProperties
    }>>

    "mapped-super-class:add": CommandDefinition<DeepReadonly<{
        mappedSuperClass: MappedSuperClass
        position: XYPosition
    }>, DeepReadonly<{
        id: string
    }>>
    "mapped-super-class:change": CommandDefinition<DeepReadonly<{
        mappedSuperClass: MappedSuperClassWithProperties
    }>>

    "embeddable-type:add": CommandDefinition<DeepReadonly<{
        embeddableType: EmbeddableType
    }>, DeepReadonly<{
        id: string
    }>>
    "embeddable-type:change": CommandDefinition<DeepReadonly<{
        embeddableType: EmbeddableTypeWithProperties
    }>>

    "enumeration:add": CommandDefinition<DeepReadonly<{
        enumeration: Enumeration
    }>, DeepReadonly<{
        id: string
    }>>
    "enumeration:change": CommandDefinition<DeepReadonly<{
        enumeration: Enumeration
    }>>

    "association:add": CommandDefinition<DeepReadonly<{
        association: Association
    }>, DeepReadonly<{
        id: string
    }>>
    "association:change": CommandDefinition<DeepReadonly<{
        association: Association
    }>>

    // TODO register commands
    "import": CommandDefinition<DeepReadonly<ModelSubData>, DeepReadonly<ModelSubIds>>
    "remove": CommandDefinition<DeepReadonly<ModelSubIds>, DeepReadonly<ModelSubData>>

    "node:move": CommandDefinition<DeepReadonly<{
        id: string
        newPosition: XYPosition
        oldPosition: XYPosition
    }>, DeepReadonly<{
        id: string
        oldPosition: XYPosition
    }>>
}

export const useModelEditorHistory = (
    modelEditorState: {
        contextData: Ref<ModelContextData | undefined>
        vueFlow: ShallowRef<VueFlowStore>,
    }
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

    const getContextData = () => {
        const contextData = modelEditorState.contextData.value
        if (!contextData) {
            throw new Error("Context is not available")
        }
        return contextData
    }

    const getVueFlow = () => {
        const vueFlow = modelEditorState.vueFlow.value
        if (!vueFlow) {
            throw new Error("VueFlow is not available")
        }
        return vueFlow
    }

    const menuMap = ref(new Map<string, MenuItem>())
    const currentGroupId = ref<string>()

    const toggleCurrentGroup = ({id}: { id: string | undefined }) => {
        const contextData = getContextData()
        if (id !== undefined) {
            if (!contextData.groupMap.has(id)) throw new Error(`Group [${id}] is not existed`)
            if (!menuMap.value.has(id)) throw new Error(`Menu item [${id}] is not existed`)
        }
        const oldCurrentGroupId = currentGroupId.value
        currentGroupId.value = id
        return {id: oldCurrentGroupId}
    }

    history.registerCommand("group:toggle", {
        applyAction: toggleCurrentGroup,
        revertAction: toggleCurrentGroup,
    })

    // 分组
    const addGroup = (options: { group: Group }) => {
        const id = options.group.id
        const contextData = getContextData()

        if (contextData.groupMap.has(id)) throw new Error(`Group [${id}] is already existed`)
        if (menuMap.value.has(id)) throw new Error(`Menu item [${id}] is already existed in menuMap`)

        const group = cloneDeepReadonlyRaw(options.group)
        contextData.groupMap.set(id, group)
        menuMap.value.set(id, {
            group,
            entityMap: new Map(),
            mappedSuperClassMap: new Map(),
            embeddableTypeMap: new Map(),
            enumerationMap: new Map()
        })
        return {id}
    }
    const revertAddGroup = ({id}: DeepReadonly<{ id: string }>) => {
        const contextData = getContextData()

        const existedGroup = cloneDeepReadonlyRaw(contextData.groupMap.get(id))
        if (!existedGroup) throw new Error(`Group [${id}] is not existed`)
        const menuItem = menuMap.value.get(id)
        if (!menuItem) throw new Error(`Group [${id}] is not existed in menuMap`)

        if (menuItem.entityMap.size > 0) throw new Error(`Group [${id}] has entities, can't remove`)
        if (menuItem.mappedSuperClassMap.size > 0) throw new Error(`Group [${id}] has mapped super classes, can't remove`)
        if (menuItem.embeddableTypeMap.size > 0) throw new Error(`Group [${id}] has embeddable types, can't remove`)
        if (menuItem.enumerationMap.size > 0) throw new Error(`Group [${id}] has enumerations, can't remove`)

        contextData.groupMap.delete(id)
        menuMap.value.delete(id)
        return {group: existedGroup}
    }
    const updateGroup = (options: DeepReadonly<{ group: Group }>) => {
        const id = options.group.id
        const contextData = getContextData()

        const existedGroup = cloneDeepReadonlyRaw(contextData.groupMap.get(id))
        if (!existedGroup) throw new Error(`Group [${id}] is not existed`)
        const menuItem = menuMap.value.get(id)
        if (!menuItem) throw new Error(`Group [${id}] is not existed in menuMap`)

        const group = cloneDeepReadonlyRaw(options.group)

        contextData.groupMap.set(id, group)
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
    const addEntity = (options: DeepReadonly<{ entity: Entity; position: XYPosition }>) => {
        const groupId = options.entity.groupId
        const id = options.entity.id
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        if (contextData.entityMap.has(id)) throw new Error(`Entity [${id}] is already existed`)
        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (menuItem.entityMap.has(id)) throw new Error(`Entity [${id}] is already existed in group [${groupId}]`)

        const entity = cloneDeepReadonlyRaw<EntityWithProperties>({...options.entity, properties: []})
        const entityNode: EntityNode = {
            id,
            type: NodeType_Entity,
            position: options.position,
            data: {entity},
        }
        contextData.entityMap.set(id, entity)
        menuItem.entityMap.set(id, entity)
        vueFlow.addNodes(entityNode)
        return {id}
    }
    const revertAddEntity = ({id}: DeepReadonly<{ id: string }>) => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const entity = cloneDeepReadonlyRaw(contextData.entityMap.get(id))
        if (!entity) throw new Error(`Entity [${id}] is not existed`)
        const entityNode = vueFlow.findNode(id)
        if (!entityNode) throw new Error(`Entity [${id}] is not existed`)

        const groupId = entity.groupId
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`Entity [${id}] is not existed in group [${groupId}]`)

        contextData.entityMap.delete(id)
        menuItem.entityMap.delete(id)
        vueFlow.removeNodes([entityNode])
        return {entity, position: entityNode.position}
    }
    const updateEntity = (options: DeepReadonly<{ entity: EntityWithProperties }>) => {
        const id = options.entity.id
        const groupId = options.entity.groupId
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const existedEntity = cloneDeepReadonlyRaw(contextData.entityMap.get(id))
        if (!existedEntity) throw new Error(`Entity [${id}] is not existed`)
        const existingEntityNode = vueFlow.findNode(id)
        if (!existingEntityNode) throw new Error(`Entity [${id}] is not existed`)
        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`Entity [${id}] is not existed in group [${groupId}]`)

        const entity = cloneDeepReadonlyRaw<EntityWithProperties>(options.entity)

        contextData.entityMap.set(id, entity)
        menuItem.entityMap.set(id, entity)
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

    // 映射抽象实体
    const addMappedSuperClass = (options: DeepReadonly<{
        mappedSuperClass: MappedSuperClass;
        position: XYPosition
    }>) => {
        const id = options.mappedSuperClass.id
        const groupId = options.mappedSuperClass.groupId
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        if (contextData.mappedSuperClassMap.has(id)) throw new Error(`MappedSuperClass [${id}] is already existed`)
        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (menuItem.entityMap.has(id)) throw new Error(`MappedSuperClass [${id}] is already existed in group [${groupId}]`)

        const mappedSuperClass = cloneDeepReadonlyRaw<MappedSuperClassWithProperties>({
            ...options.mappedSuperClass,
            properties: []
        })
        const mappedSuperClassNode: MappedSuperClassNode = {
            id,
            type: NodeType_MappedSuperClass,
            position: options.position,
            data: {mappedSuperClass},
        }
        contextData.mappedSuperClassMap.set(id, mappedSuperClass)
        menuItem.mappedSuperClassMap.set(id, mappedSuperClass)
        vueFlow.addNodes(mappedSuperClassNode)
        return {id}
    }
    const revertAddMappedSuperClass = ({id}: DeepReadonly<{ id: string }>) => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const mappedSuperClass = cloneDeepReadonlyRaw(contextData.mappedSuperClassMap.get(id))
        if (!mappedSuperClass) throw new Error(`MappedSuperClass [${id}] is not existed`)
        const mappedSuperClassNode = vueFlow.findNode(id)
        if (!mappedSuperClassNode) throw new Error(`MappedSuperClass [${id}] is not existed`)

        const groupId = mappedSuperClass.groupId
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`MappedSuperClass [${id}] is not existed in group [${groupId}]`)

        contextData.mappedSuperClassMap.delete(id)
        menuItem.mappedSuperClassMap.delete(id)
        vueFlow.removeNodes([mappedSuperClassNode])
        return {mappedSuperClass, position: mappedSuperClassNode.position}
    }

    const updateMappedSuperClass = (options: DeepReadonly<{ mappedSuperClass: MappedSuperClassWithProperties }>) => {
        const id = options.mappedSuperClass.id
        const groupId = options.mappedSuperClass.groupId
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const existedMappedSuperClass = contextData.mappedSuperClassMap.get(id)
        if (!existedMappedSuperClass) throw new Error(`MappedSuperClass [${id}] is not existed`)
        const existingMappedSuperClassNode = vueFlow.findNode(id)
        if (!existingMappedSuperClassNode) throw new Error(`MappedSuperClass [${id}] is not existed`)
        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`MappedSuperClass [${id}] is not existed in group [${groupId}]`)

        const mappedSuperClass = cloneDeepReadonlyRaw<MappedSuperClassWithProperties>(options.mappedSuperClass)

        contextData.mappedSuperClassMap.set(id, mappedSuperClass)
        menuItem.mappedSuperClassMap.set(id, mappedSuperClass)
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

    // 内嵌类型
    const addEmbeddableType = (options: DeepReadonly<{ embeddableType: EmbeddableType }>) => {
        const id = options.embeddableType.id
        const groupId = options.embeddableType.groupId
        const contextData = getContextData()

        if (contextData.embeddableTypeMap.has(id)) throw new Error(`EmbeddableType [${id}] is already existed`)
        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (menuItem.entityMap.has(id)) throw new Error(`EmbeddableType [${id}] is already existed in group [${groupId}]`)

        const embeddableTypeWithId = cloneDeepReadonlyRaw<EmbeddableTypeWithProperties>({
            ...options.embeddableType,
            properties: []
        })
        contextData.embeddableTypeMap.set(id, embeddableTypeWithId)
        return {id}
    }

    const revertAddEmbeddableType = ({id}: DeepReadonly<{ id: string }>) => {
        const contextData = getContextData()

        const embeddableType = cloneDeepReadonlyRaw(contextData.embeddableTypeMap.get(id))
        if (!embeddableType) throw new Error(`EmbeddableType [${id}] is not existed`)

        const groupId = embeddableType.groupId
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`EmbeddableType [${id}] is not existed in group [${groupId}]`)

        contextData.embeddableTypeMap.delete(id)
        menuItem.entityMap.delete(id)
        return {embeddableType}
    }

    const updateEmbeddableType = (options: DeepReadonly<{ embeddableType: EmbeddableTypeWithProperties }>) => {
        const id = options.embeddableType.id
        const groupId = options.embeddableType.groupId
        const contextData = getContextData()

        const existedEmbeddableType = cloneDeepReadonlyRaw(contextData.embeddableTypeMap.get(id))
        if (!existedEmbeddableType) throw new Error(`EmbeddableType [${id}] is not existed`)
        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(existedEmbeddableType.groupId)
        if (!menuItem) throw new Error(`Group [${existedEmbeddableType.groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(existedEmbeddableType.id)) throw new Error(`EmbeddableType [${existedEmbeddableType.id}] is not existed in group [${existedEmbeddableType.groupId}]`)

        const embeddableType = cloneDeepReadonlyRaw<EmbeddableTypeWithProperties>(options.embeddableType)

        contextData.embeddableTypeMap.set(id, embeddableType)
        menuItem.embeddableTypeMap.set(id, embeddableType)
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
    const addEnumeration = (options: DeepReadonly<{ enumeration: Enumeration }>) => {
        const id = options.enumeration.id
        const groupId = options.enumeration.groupId
        const contextData = getContextData()

        if (contextData.enumerationMap.has(id)) throw new Error(`Enumeration [${id}] is already existed`)
        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (menuItem.entityMap.has(id)) throw new Error(`Enumeration [${id}] is already existed in group [${groupId}]`)

        const enumeration = cloneDeepReadonlyRaw<Enumeration>(options.enumeration)
        contextData.enumerationMap.set(id, enumeration)
        menuItem.enumerationMap.set(id, enumeration)
        return {id}
    }

    const revertAddEnumeration = ({id}: DeepReadonly<{ id: string }>) => {
        const contextData = getContextData()

        const enumeration = cloneDeepReadonlyRaw(contextData.enumerationMap.get(id))
        if (!enumeration) throw new Error(`Enumeration [${id}] is not existed`)

        const groupId = enumeration.groupId
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`Enumeration [${id}] is not existed in group [${groupId}]`)

        contextData.enumerationMap.delete(id)
        menuItem.enumerationMap.delete(id)
        return {enumeration}
    }

    const updateEnumeration = (options: DeepReadonly<{ enumeration: Enumeration }>) => {
        const id = options.enumeration.id
        const groupId = options.enumeration.groupId
        const contextData = getContextData()

        const existedEnumeration = cloneDeepReadonlyRaw(contextData.enumerationMap.get(id))
        if (!existedEnumeration) throw new Error(`Enumeration [${id}] is not existed`)
        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`Enumeration [${id}] is not existed in group [${groupId}]`)

        const enumeration = cloneDeepReadonlyRaw<Enumeration>(options.enumeration)

        contextData.enumerationMap.set(id, enumeration)
        menuItem.enumerationMap.set(id, enumeration)
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
    const addAssociation = (options: DeepReadonly<{ association: Association }>) => {
        const id = options.association.id
        const contextData = getContextData()

        if (contextData.associationMap.has(id)) throw new Error(`Association [${id}] is already existed`)

        const association = cloneDeepReadonlyRaw<Association>(options.association)
        contextData.associationMap.set(id, association)
        return {id}
    }

    const revertAddAssociation = ({id}: DeepReadonly<{ id: string }>) => {
        const contextData = getContextData()

        const association = cloneDeepReadonlyRaw(contextData.associationMap.get(id))
        if (!association) throw new Error(`Association [${id}] is not existed`)

        contextData.associationMap.delete(id)
        return {association}
    }

    const updateAssociation = (options: DeepReadonly<{ association: Association }>) => {
        const id = options.association.id
        const contextData = getContextData()

        const existedAssociation = cloneDeepReadonlyRaw(contextData.associationMap.get(id))
        if (!existedAssociation) throw new Error(`Association [${id}] is not existed`)

        const association = cloneDeepReadonlyRaw<Association>(options.association)

        contextData.associationMap.set(id, association)
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

    history.registerCommand("node:move", {
        applyAction: ({id, newPosition, oldPosition}) => {
            const vueFlow = getVueFlow()
            vueFlow.updateNode(id, {
                position: newPosition
            })
            return {
                id,
                oldPosition
            }
        },
        revertAction: ({id, oldPosition}) => {
            const vueFlow = getVueFlow()
            vueFlow.updateNode(id, {
                position: oldPosition
            })
        }
    })

    return {
        history,
        canUndo,
        canRedo,
        menuMap: readonly(menuMap),
        currentGroupId: readonly(currentGroupId),
        toggleCurrentGroup,
    }
}

