import {type CommandDefinition, useCommandHistory} from "@/history/commandHistory.ts";
import {type GraphNode, type VueFlowStore, type XYPosition} from "@vue-flow/core";
import {computed, reactive, type Ref, ref, shallowReadonly, type ShallowRef, watch} from "vue";
import {deleteColorVar, type MenuItem, setColorVar} from "@/modelEditor/useModelEditor.ts";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";
import {debounce} from "lodash-es";
import {type EntityNode, NodeType_Entity} from "@/modelEditor/node/EntityNode.ts";
import {type MappedSuperClassNode, NodeType_MappedSuperClass} from "@/modelEditor/node/MappedSuperClassNode.ts";
import {type EmbeddableTypeNode, NodeType_EmbeddableType} from "@/modelEditor/node/EmbeddableTypeNode.ts";
import {type EnumerationNode, NodeType_Enumeration} from "@/modelEditor/node/EnumerationNode.ts";
import {type ConcreteAssociationEdge, EdgeType_ConcreteAssociation} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import {defaultModelSubIds, subIdsToSubIdSets} from "@/type/context/utils/ModelSubIds.ts";
import {defaultModelGraphSubData, graphDataToModelData} from "@/type/context/utils/ModelGraphSubData.ts";
import {protectRepeatIds} from "@/modelEditor/import/protectRepeatIds.ts";
import {layoutPosition} from "@/modelEditor/import/layoutPosition.ts";
import {protectRepeatNames} from "@/modelEditor/import/protectRepeatNames.ts";
import {
    type AbstractAssociationEdge,
    EdgeType_AbstractAssociation
} from "@/modelEditor/edge/AbstractAssociationEdge.ts";
import {sendMessage} from "@/components/message/messageApi.ts";

const SYNC_DEBOUNCE_TIMEOUT = 500

export type ModelEditorHistoryCommands = {
    "node:move": CommandDefinition<DeepReadonly<{
        id: string
        newPosition: XYPosition
        oldPosition: XYPosition
    }>, DeepReadonly<{
        id: string
        oldPosition: XYPosition
    }>>

    "group:add": CommandDefinition<DeepReadonly<{
        group: Group
    }>, DeepReadonly<{
        id: string
    }>>
    "group:change": CommandDefinition<DeepReadonly<{
        group: Group
    }>>

    "entity:add": CommandDefinition<DeepReadonly<{
        entity: EntityWithProperties
        position: XYPosition
    }>, DeepReadonly<{
        id: string
    }>>
    "entity:change": CommandDefinition<DeepReadonly<{
        entity: EntityWithProperties
    }>>

    "mapped-super-class:add": CommandDefinition<DeepReadonly<{
        mappedSuperClass: MappedSuperClassWithProperties
        position: XYPosition
    }>, DeepReadonly<{
        id: string
    }>>
    "mapped-super-class:change": CommandDefinition<DeepReadonly<{
        mappedSuperClass: MappedSuperClassWithProperties
    }>>

    "embeddable-type:add": CommandDefinition<DeepReadonly<{
        embeddableType: EmbeddableTypeWithProperties
        position: XYPosition
    }>, DeepReadonly<{
        id: string
    }>>
    "embeddable-type:change": CommandDefinition<DeepReadonly<{
        embeddableType: EmbeddableTypeWithProperties
    }>>

    "enumeration:add": CommandDefinition<DeepReadonly<{
        enumeration: Enumeration
        position: XYPosition
    }>, DeepReadonly<{
        id: string
    }>>
    "enumeration:change": CommandDefinition<DeepReadonly<{
        enumeration: Enumeration
    }>>

    "association:add": CommandDefinition<DeepReadonly<{
        association: AssociationIdOnly,
    }>, DeepReadonly<{
        id: string
    }>>
    "association:change": CommandDefinition<DeepReadonly<{
        association: AssociationIdOnly
    }>>

    "import": CommandDefinition<DeepReadonly<{data: ModelGraphSubData, startPosition: XYPosition}>, DeepReadonly<{ids: ModelSubIds, startPosition: XYPosition}>>
    "remove": CommandDefinition<DeepReadonly<ModelSubIds>, DeepReadonly<ModelGraphSubData>>
}

export const useModelEditorHistory = (
    modelEditorState: {
        contextData: Ref<ModelContextData | undefined>
        vueFlow: ShallowRef<VueFlowStore>,
    }
) => {
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
    history.eventBus.on("change", (options) => {
        console.log(options.type, options.command.key)
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

    const waitSyncIds = ref(new Set<string>())
    // 等待当前 waitSyncIds 清空
    const waitChangeSync = (): Promise<void> => {
        return new Promise((resolve) => {
            if (waitSyncIds.value.size === 0) {
                resolve()
            } else {
                const stopWatcher = watch(() => waitSyncIds.value.size, (size) => {
                    if (size === 0) {
                        stopWatcher()
                        resolve()
                    }
                })
            }
        })
    }

    const menuMap = ref(new Map<string, MenuItem>())

    // 分组
    const groupWatchStopMap = new Map<string, () => void>()
    const groupOldMap = new Map<string, Group | undefined>()
    const addGroupWatcher = (id: string) => {
        const contextData = getContextData()

        if (groupWatchStopMap.has(id)) throw new Error(`Group [${id}] is already watched`)

        groupOldMap.set(id, cloneDeepReadonlyRaw(contextData.groupMap.get(id)))
        const debounceSyncGroupUpdate = debounce((newGroup: Group | undefined) => {
            const oldGroup = groupOldMap.get(id)
            if (newGroup && oldGroup) {
                history.executeCommand("group:change", {
                    group: newGroup
                })
            }
            groupOldMap.set(id, cloneDeepReadonlyRaw(newGroup))
            waitSyncIds.value.delete(id)
        }, SYNC_DEBOUNCE_TIMEOUT)
        const stopWatch = watch(() => contextData.groupMap.get(id),
            (value) => {
                waitSyncIds.value.add(id)
                debounceSyncGroupUpdate(value)
                if (value) setColorVar(id, value.color)
            },
            {deep: true}
        )
        groupWatchStopMap.set(id, stopWatch)
    }
    const removeGroupWatcher = (id: string) => {
        const watchStop = groupWatchStopMap.get(id)
        if (!watchStop) throw new Error(`Group [${id}] is not watched`)

        watchStop()
        groupWatchStopMap.delete(id)
    }

    const addGroup = (options: { group: Group }) => {
        const id = options.group.id
        const contextData = getContextData()

        if (contextData.groupMap.has(id)) throw new Error(`Group [${id}] is already existed`)
        if (groupWatchStopMap.has(id)) throw new Error(`Group [${id}] is already watched`)
        if (menuMap.value.has(id)) throw new Error(`Menu item [${id}] is already existed in menuMap`)

        const group = cloneDeepReadonlyRaw(options.group)
        contextData.groupMap.set(id, group)
        addGroupWatcher(id)
        setColorVar(id, group.color)

        menuMap.value.set(id, reactive({
            group,
            entityMap: new Map(),
            orderedEntities: computed(() => {
                return Array.from(menuMap.value.get(id)?.entityMap.values() ?? []).sort((o1, o2) => {
                    return o1.name.localeCompare(o2.name)
                })
            }),
            mappedSuperClassMap: new Map(),
            orderedMappedSuperClasses: computed(() => {
                return Array.from(menuMap.value.get(id)?.mappedSuperClassMap.values() ?? []).sort((o1, o2) => {
                    return o1.name.localeCompare(o2.name)
                })
            }),
            embeddableTypeMap: new Map(),
            orderedEmbeddableTypes: computed(() => {
                return Array.from(menuMap.value.get(id)?.embeddableTypeMap.values() ?? []).sort((o1, o2) => {
                    return o1.name.localeCompare(o2.name)
                })
            }),
            enumerationMap: new Map(),
            orderedEnumerations: computed(() => {
                return Array.from(menuMap.value.get(id)?.enumerationMap.values() ?? []).sort((o1, o2) => {
                    return o1.name.localeCompare(o2.name)
                })
            }),
        }))
        return {id}
    }
    const revertAddGroup = ({id}: DeepReadonly<{ id: string }>) => {
        const contextData = getContextData()

        const oldGroup = cloneDeepReadonlyRaw(contextData.groupMap.get(id))
        if (!oldGroup) throw new Error(`Group [${id}] is not existed`)
        const menuItem = menuMap.value.get(id)
        if (!menuItem) throw new Error(`Group [${id}] is not existed in menuMap`)

        if (menuItem.entityMap.size > 0) throw new Error(`Group [${id}] has entities, can't remove`)
        if (menuItem.mappedSuperClassMap.size > 0) throw new Error(`Group [${id}] has mapped super classes, can't remove`)
        if (menuItem.embeddableTypeMap.size > 0) throw new Error(`Group [${id}] has embeddable types, can't remove`)
        if (menuItem.enumerationMap.size > 0) throw new Error(`Group [${id}] has enumerations, can't remove`)

        deleteColorVar(id)
        removeGroupWatcher(id)
        contextData.groupMap.delete(id)
        menuMap.value.delete(id)
        return {group: oldGroup}
    }
    const updateGroup = (options: DeepReadonly<{ group: Group }>) => {
        const id = options.group.id
        const contextData = getContextData()

        const oldGroup = groupOldMap.get(id)
        if (!oldGroup) throw new Error(`Group [${id}] is not existed`)
        const menuItem = menuMap.value.get(id)
        if (!menuItem) throw new Error(`Group [${id}] is not existed in menuMap`)
        const watchStop = groupWatchStopMap.get(id)
        if (!watchStop) throw new Error(`Group [${id}] is not watched`)

        const group = cloneDeepReadonlyRaw(options.group)

        removeGroupWatcher(id)
        contextData.groupMap.set(id, group)
        setColorVar(id, group.color)
        addGroupWatcher(id)
        menuItem.group = group
        return {group: oldGroup}
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
    const entityWatchStopMap = new Map<string, () => void>()
    const entityOldMap = new Map<string, EntityWithProperties | undefined>()
    const addEntityWatcher = (id: string) => {
        const contextData = getContextData()

        if (entityWatchStopMap.has(id)) throw new Error(`Entity [${id}] is already watched`)

        entityOldMap.set(id, cloneDeepReadonlyRaw(contextData.entityMap.get(id)))
        const debounceSyncEntityUpdate = debounce((newEntity: EntityWithProperties | undefined) => {
            const oldEntity = entityOldMap.get(id)
            if (newEntity && oldEntity) {
                history.executeCommand("entity:change", {
                    entity: newEntity
                })
            }
            entityOldMap.set(id, cloneDeepReadonlyRaw(newEntity))
            waitSyncIds.value.delete(id)
        }, SYNC_DEBOUNCE_TIMEOUT)
        const stopWatch = watch(() => contextData.entityMap.get(id),
            (value) => {
                waitSyncIds.value.add(id)
                debounceSyncEntityUpdate(value)
            },
            {deep: true}
        )
        entityWatchStopMap.set(id, stopWatch)
    }
    const removeEntityWatcher = (id: string) => {
        const watchStop = entityWatchStopMap.get(id)
        if (!watchStop) throw new Error(`Entity [${id}] is not watched`)

        watchStop()
        entityWatchStopMap.delete(id)
    }

    const addEntity = (options: DeepReadonly<{ entity: EntityWithProperties; position: XYPosition }>) => {
        const groupId = options.entity.groupId
        const id = options.entity.id
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        if (contextData.entityMap.has(id)) throw new Error(`Entity [${id}] is already existed`)
        if (entityWatchStopMap.has(id)) throw new Error(`Entity [${id}] is already watched`)

        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (menuItem.entityMap.has(id)) throw new Error(`Entity [${id}] is already existed in group [${groupId}]`)

        const entity = cloneDeepReadonlyRaw<EntityWithProperties>(options.entity)
        contextData.entityMap.set(id, entity)
        addEntityWatcher(id)
        menuItem.entityMap.set(id, entity)
        const newNode: EntityNode = {
            id,
            type: NodeType_Entity,
            position: options.position,
            data: {entity},
        }
        vueFlow.addNodes(newNode)
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

        removeEntityWatcher(id)
        contextData.entityMap.delete(id)
        menuItem.entityMap.delete(id)
        vueFlow.removeNodes([entityNode])
        return {entity, position: entityNode.position}
    }
    const updateEntity = (options: DeepReadonly<{ entity: EntityWithProperties }>) => {
        const id = options.entity.id
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const oldEntity = entityOldMap.get(id)
        if (!oldEntity) throw new Error(`Entity [${id}] is not existed`)

        const oldGroupId = oldEntity.groupId
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Entity [${id}] is not existed`)
        if (!contextData.groupMap.has(oldGroupId)) throw new Error(`Group [${oldGroupId}] is not existed`)
        const menuItem = menuMap.value.get(oldGroupId)
        if (!menuItem) throw new Error(`Group [${oldGroupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`Entity [${id}] is not existed in group [${oldGroupId}]`)

        const entity = cloneDeepReadonlyRaw<EntityWithProperties>(options.entity)

        removeEntityWatcher(id)
        contextData.entityMap.set(id, entity)
        const newGroupId = entity.groupId
        if (oldGroupId !== newGroupId) {
            const newMenuItem = menuMap.value.get(newGroupId)
            if (!newMenuItem) throw new Error(`Group [${newGroupId}] is not existed in menuMap`)
            if (newMenuItem.entityMap.has(id)) throw new Error(`Entity [${id}] is existed in group [${newGroupId}]`)
            menuItem.entityMap.delete(id)
            newMenuItem.entityMap.set(id, entity)
        } else {
            menuItem.entityMap.set(id, entity)
        }
        addEntityWatcher(id)
        node.data.entity = entity
        return {entity: oldEntity}
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
    const mappedSuperClassWatchStopMap = new Map<string, () => void>()
    const mappedSuperClassOldMap = new Map<string, MappedSuperClassWithProperties | undefined>()
    const addMappedSuperClassWatcher = (id: string) => {
        const contextData = getContextData()

        if (mappedSuperClassWatchStopMap.has(id)) throw new Error(`MappedSuperClass [${id}] is already watched`)

        mappedSuperClassOldMap.set(id, cloneDeepReadonlyRaw(contextData.mappedSuperClassMap.get(id)))
        const debounceSyncMappedSuperClassUpdate = debounce((newMappedSuperClass: MappedSuperClassWithProperties | undefined) => {
            const oldMappedSuperClass = mappedSuperClassOldMap.get(id)
            if (newMappedSuperClass && oldMappedSuperClass) {
                history.executeCommand("mapped-super-class:change", {
                    mappedSuperClass: newMappedSuperClass
                })
            }
            mappedSuperClassOldMap.set(id, cloneDeepReadonlyRaw(newMappedSuperClass))
            waitSyncIds.value.delete(id)
        }, SYNC_DEBOUNCE_TIMEOUT)
        const stopWatch = watch(() => contextData.mappedSuperClassMap.get(id),
            (value) => {
                waitSyncIds.value.add(id)
                debounceSyncMappedSuperClassUpdate(value)
            },
            {deep: true}
        )
        mappedSuperClassWatchStopMap.set(id, stopWatch)
    }
    const removeMappedSuperClassWatcher = (id: string) => {
        const watchStop = mappedSuperClassWatchStopMap.get(id)
        if (!watchStop) throw new Error(`MappedSuperClass [${id}] is not watched`)

        watchStop()
        mappedSuperClassWatchStopMap.delete(id)
    }

    const addMappedSuperClass = (options: DeepReadonly<{
        mappedSuperClass: MappedSuperClassWithProperties
        position: XYPosition
    }>) => {
        const id = options.mappedSuperClass.id
        const groupId = options.mappedSuperClass.groupId
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        if (contextData.mappedSuperClassMap.has(id)) throw new Error(`MappedSuperClass [${id}] is already existed`)
        if (mappedSuperClassWatchStopMap.has(id)) throw new Error(`MappedSuperClass [${id}] is already watched`)

        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (menuItem.mappedSuperClassMap.has(id)) throw new Error(`MappedSuperClass [${id}] is already existed in group [${groupId}]`)

        const mappedSuperClass = cloneDeepReadonlyRaw<MappedSuperClassWithProperties>(options.mappedSuperClass)
        contextData.mappedSuperClassMap.set(id, mappedSuperClass)
        addMappedSuperClassWatcher(id)
        menuItem.mappedSuperClassMap.set(id, mappedSuperClass)
        const newNode: MappedSuperClassNode = {
            id,
            type: NodeType_MappedSuperClass,
            position: options.position,
            data: {mappedSuperClass},
        }
        vueFlow.addNodes(newNode)
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
        if (!menuItem.mappedSuperClassMap.has(id)) throw new Error(`MappedSuperClass [${id}] is not existed in group [${groupId}]`)

        removeMappedSuperClassWatcher(id)
        contextData.mappedSuperClassMap.delete(id)
        menuItem.mappedSuperClassMap.delete(id)
        vueFlow.removeNodes([mappedSuperClassNode])
        return {mappedSuperClass, position: mappedSuperClassNode.position}
    }
    const updateMappedSuperClass = (options: DeepReadonly<{ mappedSuperClass: MappedSuperClassWithProperties }>) => {
        const id = options.mappedSuperClass.id
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const oldMappedSuperClass = mappedSuperClassOldMap.get(id)
        if (!oldMappedSuperClass) throw new Error(`MappedSuperClass [${id}] is not existed`)

        const oldGroupId = oldMappedSuperClass.groupId
        const existingMappedSuperClassNode = vueFlow.findNode(id)
        if (!existingMappedSuperClassNode) throw new Error(`MappedSuperClass [${id}] is not existed`)
        if (!contextData.groupMap.has(oldGroupId)) throw new Error(`Group [${oldGroupId}] is not existed`)
        const menuItem = menuMap.value.get(oldGroupId)
        if (!menuItem) throw new Error(`Group [${oldGroupId}] is not existed in menuMap`)
        if (!menuItem.mappedSuperClassMap.has(id)) throw new Error(`MappedSuperClass [${id}] is not existed in group [${oldGroupId}]`)

        const mappedSuperClass = cloneDeepReadonlyRaw<MappedSuperClassWithProperties>(options.mappedSuperClass)

        removeMappedSuperClassWatcher(id)
        contextData.mappedSuperClassMap.set(id, mappedSuperClass)
        const newGroupId = mappedSuperClass.groupId
        if (oldGroupId !== newGroupId) {
            const newMenuItem = menuMap.value.get(newGroupId)
            if (!newMenuItem) throw new Error(`Group [${newGroupId}] is not existed in menuMap`)
            if (newMenuItem.mappedSuperClassMap.has(id)) throw new Error(`MappedSuperClass [${id}] is existed in group [${newGroupId}]`)
            menuItem.mappedSuperClassMap.delete(id)
            newMenuItem.mappedSuperClassMap.set(id, mappedSuperClass)
        } else {
            menuItem.mappedSuperClassMap.set(id, mappedSuperClass)
        }
        addMappedSuperClassWatcher(id)
        existingMappedSuperClassNode.data.mappedSuperClass = mappedSuperClass
        return {mappedSuperClass: oldMappedSuperClass}
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
    const embeddableTypeWatchStopMap = new Map<string, () => void>()
    const embeddableTypeOldMap = new Map<string, EmbeddableTypeWithProperties | undefined>()
    const addEmbeddableTypeWatcher = (id: string) => {
        const contextData = getContextData()

        if (embeddableTypeWatchStopMap.has(id)) throw new Error(`EmbeddableType [${id}] is already watched`)

        embeddableTypeOldMap.set(id, cloneDeepReadonlyRaw(contextData.embeddableTypeMap.get(id)))
        const debounceSyncEmbeddableTypeUpdate = debounce((newEmbeddableType: EmbeddableTypeWithProperties | undefined) => {
            const oldEmbeddableType = embeddableTypeOldMap.get(id)
            if (newEmbeddableType && oldEmbeddableType) {
                history.executeCommand("embeddable-type:change", {
                    embeddableType: newEmbeddableType
                })
            }
            embeddableTypeOldMap.set(id, cloneDeepReadonlyRaw(newEmbeddableType))
            waitSyncIds.value.delete(id)
        }, SYNC_DEBOUNCE_TIMEOUT)
        const stopWatch = watch(
            () => contextData.embeddableTypeMap.get(id),
            (newEmbeddableType) => {
                waitSyncIds.value.add(id)
                debounceSyncEmbeddableTypeUpdate(newEmbeddableType)
            },
            {deep: true}
        )
        embeddableTypeWatchStopMap.set(id, stopWatch)
    }
    const removeEmbeddableTypeWatcher = (id: string) => {
        const stopWatch = embeddableTypeWatchStopMap.get(id)
        if (!stopWatch) throw new Error(`EmbeddableType [${id}] is not watched`)

        stopWatch()
        embeddableTypeWatchStopMap.delete(id)
    }

    const addEmbeddableType = (options: DeepReadonly<{
        embeddableType: EmbeddableTypeWithProperties;
        position: XYPosition
    }>) => {
        const id = options.embeddableType.id
        const groupId = options.embeddableType.groupId
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        if (contextData.embeddableTypeMap.has(id)) throw new Error(`EmbeddableType [${id}] is already existed`)
        if (embeddableTypeWatchStopMap.has(id)) throw new Error(`EmbeddableType [${id}] is already watched`)

        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (menuItem.embeddableTypeMap.has(id)) throw new Error(`EmbeddableType [${id}] is already existed in group [${groupId}]`)

        const embeddableTypeWithId = cloneDeepReadonlyRaw<EmbeddableTypeWithProperties>(options.embeddableType)
        contextData.embeddableTypeMap.set(id, embeddableTypeWithId)
        addEmbeddableTypeWatcher(id)
        menuItem.embeddableTypeMap.set(id, embeddableTypeWithId)
        const newNode: EmbeddableTypeNode = {
            id,
            type: NodeType_EmbeddableType,
            position: options.position,
            data: {embeddableType: embeddableTypeWithId},
        }
        vueFlow.addNodes(newNode)
        return {id}
    }
    const revertAddEmbeddableType = ({id}: DeepReadonly<{ id: string }>) => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const embeddableType = cloneDeepReadonlyRaw(contextData.embeddableTypeMap.get(id))
        if (!embeddableType) throw new Error(`EmbeddableType [${id}] is not existed`)
        const embeddableTypeNode = vueFlow.findNode(id)
        if (!embeddableTypeNode) throw new Error(`EmbeddableType [${id}] is not existed`)

        const groupId = embeddableType.groupId
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (!menuItem.embeddableTypeMap.has(id)) throw new Error(`EmbeddableType [${id}] is not existed in group [${groupId}]`)

        removeEmbeddableTypeWatcher(id)
        contextData.embeddableTypeMap.delete(id)
        menuItem.embeddableTypeMap.delete(id)
        vueFlow.removeNodes([embeddableTypeNode])
        return {embeddableType, position: embeddableTypeNode.position}
    }
    const updateEmbeddableType = (options: DeepReadonly<{ embeddableType: EmbeddableTypeWithProperties }>) => {
        const id = options.embeddableType.id
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const oldEmbeddableType = embeddableTypeOldMap.get(id)
        if (!oldEmbeddableType) throw new Error(`EmbeddableType [${id}] is not existed`)

        const oldGroupId = oldEmbeddableType.groupId
        const existingEmbeddableTypeNode = vueFlow.findNode(id)
        if (!existingEmbeddableTypeNode) throw new Error(`EmbeddableType [${id}] is not existed`)
        if (!contextData.groupMap.has(oldGroupId)) throw new Error(`Group [${oldGroupId}] is not existed`)
        const menuItem = menuMap.value.get(oldGroupId)
        if (!menuItem) throw new Error(`Group [${oldGroupId}] is not existed in menuMap`)
        if (!menuItem.embeddableTypeMap.has(id)) throw new Error(`EmbeddableType [${id}] is not existed in group [${oldGroupId}]`)

        const embeddableType = cloneDeepReadonlyRaw<EmbeddableTypeWithProperties>(options.embeddableType)

        removeEmbeddableTypeWatcher(id)
        contextData.embeddableTypeMap.set(id, embeddableType)
        const newGroupId = embeddableType.groupId
        if (oldGroupId !== newGroupId) {
            const newMenuItem = menuMap.value.get(newGroupId)
            if (!newMenuItem) throw new Error(`Group [${newGroupId}] is not existed in menuMap`)
            if (newMenuItem.embeddableTypeMap.has(id)) throw new Error(`EmbeddableType [${id}] is existed in group [${newGroupId}]`)
            menuItem.embeddableTypeMap.delete(id)
            newMenuItem.embeddableTypeMap.set(id, embeddableType)
        } else {
            menuItem.embeddableTypeMap.set(id, embeddableType)
        }
        addEmbeddableTypeWatcher(id)
        existingEmbeddableTypeNode.data.embeddableType = embeddableType
        return {embeddableType: oldEmbeddableType}
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
    const enumerationWatchStopMap = new Map<string, () => void>()
    const enumerationOldMap = new Map<string, Enumeration | undefined>()
    const addEnumerationWatcher = (id: string) => {
        const contextData = getContextData()

        if (enumerationWatchStopMap.has(id)) throw new Error(`Enumeration [${id}] is already watched`)

        enumerationOldMap.set(id, cloneDeepReadonlyRaw(contextData.enumerationMap.get(id)))
        const debounceSyncEnumerationUpdate = debounce((newEnumeration: Enumeration | undefined) => {
            const oldEnumeration = enumerationOldMap.get(id)
            if (newEnumeration && oldEnumeration) {
                history.executeCommand("enumeration:change", {
                    enumeration: newEnumeration
                })
            }
            enumerationOldMap.set(id, cloneDeepReadonlyRaw(newEnumeration))
            waitSyncIds.value.delete(id)
        }, SYNC_DEBOUNCE_TIMEOUT)
        const stopWatch = watch(() => contextData.enumerationMap.get(id),
            (value) => {
                waitSyncIds.value.add(id)
                debounceSyncEnumerationUpdate(value)
            },
            {deep: true}
        )
        enumerationWatchStopMap.set(id, stopWatch)
    }
    const removeEnumerationWatcher = (id: string) => {
        const watchStop = enumerationWatchStopMap.get(id)
        if (!watchStop) throw new Error(`Enumeration [${id}] is not watched`)

        watchStop()
        enumerationWatchStopMap.delete(id)
    }

    const addEnumeration = (options: DeepReadonly<{ enumeration: Enumeration; position: XYPosition }>) => {
        const id = options.enumeration.id
        const groupId = options.enumeration.groupId
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        if (contextData.enumerationMap.has(id)) throw new Error(`Enumeration [${id}] is already existed`)
        if (enumerationWatchStopMap.has(id)) throw new Error(`Enumeration [${id}] is already watched`)

        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (menuItem.enumerationMap.has(id)) throw new Error(`Enumeration [${id}] is already existed in group [${groupId}]`)

        const enumeration = cloneDeepReadonlyRaw<Enumeration>(options.enumeration)
        contextData.enumerationMap.set(id, enumeration)
        addEnumerationWatcher(id)
        menuItem.enumerationMap.set(id, enumeration)
        const newNode: EnumerationNode = {
            id,
            type: NodeType_Enumeration,
            position: options.position,
            data: {enumeration},
        }
        vueFlow.addNodes(newNode)
        return {id}
    }
    const revertAddEnumeration = ({id}: DeepReadonly<{ id: string }>) => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const enumeration = cloneDeepReadonlyRaw(contextData.enumerationMap.get(id))
        if (!enumeration) throw new Error(`Enumeration [${id}] is not existed`)
        const enumerationNode = vueFlow.findNode(id)
        if (!enumerationNode) throw new Error(`Enumeration [${id}] is not existed`)

        const groupId = enumeration.groupId
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (!menuItem.enumerationMap.has(id)) throw new Error(`Enumeration [${id}] is not existed in group [${groupId}]`)

        removeEnumerationWatcher(id)
        contextData.enumerationMap.delete(id)
        menuItem.enumerationMap.delete(id)
        vueFlow.removeNodes([enumerationNode])
        return {enumeration, position: enumerationNode.position}
    }
    const updateEnumeration = (options: DeepReadonly<{ enumeration: Enumeration }>) => {
        const id = options.enumeration.id
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const oldEnumeration = enumerationOldMap.get(id)
        if (!oldEnumeration) throw new Error(`Enumeration [${id}] is not existed`)

        const oldGroupId = oldEnumeration.groupId
        const existingEnumerationNode = vueFlow.findNode(id)
        if (!existingEnumerationNode) throw new Error(`Enumeration [${id}] is not existed`)
        if (!contextData.groupMap.has(oldGroupId)) throw new Error(`Group [${oldGroupId}] is not existed`)
        const menuItem = menuMap.value.get(oldGroupId)
        if (!menuItem) throw new Error(`Group [${oldGroupId}] is not existed in menuMap`)
        if (!menuItem.enumerationMap.has(id)) throw new Error(`Enumeration [${id}] is not existed in group [${oldGroupId}]`)

        const enumeration = cloneDeepReadonlyRaw<Enumeration>(options.enumeration)

        removeEnumerationWatcher(id)
        contextData.enumerationMap.set(id, enumeration)
        const newGroupId = enumeration.groupId
        if (oldGroupId !== newGroupId) {
            const newMenuItem = menuMap.value.get(newGroupId)
            if (!newMenuItem) throw new Error(`Group [${newGroupId}] is not existed in menuMap`)
            if (newMenuItem.enumerationMap.has(id)) throw new Error(`Enumeration [${id}] is existed in group [${newGroupId}]`)
            menuItem.enumerationMap.delete(id)
            newMenuItem.enumerationMap.set(id, enumeration)
        } else {
            menuItem.enumerationMap.set(id, enumeration)
        }
        addEnumerationWatcher(id)
        existingEnumerationNode.data.enumeration = enumeration
        return {enumeration: oldEnumeration}
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
    const associationWatchStopMap = new Map<string, () => void>()
    const associationOldMap = new Map<string, AssociationIdOnly | undefined>()
    const addAssociationWatcher = (id: string) => {
        const contextData = getContextData()

        if (associationWatchStopMap.has(id)) throw new Error(`Association [${id}] is already watched`)

        associationOldMap.set(id, cloneDeepReadonlyRaw(contextData.associationMap.get(id)))
        const debounceSyncAssociationUpdate = debounce((newAssociation: AssociationIdOnly | undefined) => {
            const oldAssociation = associationOldMap.get(id)
            if (newAssociation && oldAssociation) {
                history.executeCommand("association:change", {
                    association: newAssociation
                })
            }
            associationOldMap.set(id, cloneDeepReadonlyRaw(newAssociation))
            waitSyncIds.value.delete(id)
        }, SYNC_DEBOUNCE_TIMEOUT)
        const stopWatch = watch(() => contextData.associationMap.get(id),
            (value) => {
                waitSyncIds.value.add(id)
                debounceSyncAssociationUpdate(value)
            },
            {deep: true}
        )
        associationWatchStopMap.set(id, stopWatch)
    }
    const removeAssociationWatcher = (id: string) => {
        const watchStop = associationWatchStopMap.get(id)
        if (!watchStop) throw new Error(`Association [${id}] is not watched`)

        watchStop()
        associationWatchStopMap.delete(id)
    }

    const addAssociation = (options: DeepReadonly<{ association: AssociationIdOnly }>) => {
        const id = options.association.id
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        if (contextData.associationMap.has(id)) throw new Error(`Association [${id}] is already existed`)

        let sourceNode: GraphNode | undefined
        let sourceHandleId: string | undefined
        if ("sourceEntityId" in options.association) {
            sourceNode = vueFlow.findNode(options.association.sourceEntityId)
            if (!sourceNode) throw new Error(`Entity [${options.association.sourceEntityId}] is not existed`)
            sourceHandleId = options.association.sourcePropertyId
        } else {
            sourceNode = vueFlow.findNode(options.association.sourceAbstractEntityId)
            if (!sourceNode) throw new Error(`AbstractEntity [${options.association.sourceAbstractEntityId}] is not existed`)
            sourceHandleId = options.association.sourcePropertyId
        }

        const targetNode = vueFlow.findNode(options.association.referencedEntityId)
        if (!targetNode) throw new Error(`Entity [${options.association.referencedEntityId}] is not existed`)
        const targetHandleId = options.association.referencedEntityId

        const association = cloneDeepReadonlyRaw<AssociationIdOnly>(options.association)
        contextData.associationMap.set(id, association)
        addAssociationWatcher(id)
        if ("sourceEntityId" in association) {
            const newEdge: ConcreteAssociationEdge = {
                id,
                source: sourceNode.id,
                target: targetNode.id,
                sourceHandle: sourceHandleId,
                targetHandle: targetHandleId,
                type: EdgeType_ConcreteAssociation,
                data: {
                    association
                }
            }
            vueFlow.addEdges(newEdge)
        } else {
            const newEdge: AbstractAssociationEdge = {
                id,
                source: sourceNode.id,
                target: targetNode.id,
                sourceHandle: sourceHandleId,
                targetHandle: targetHandleId,
                type: EdgeType_AbstractAssociation,
                data: {
                    association
                }
            }
            vueFlow.addEdges(newEdge)
        }

        return {id}
    }
    const revertAddAssociation = ({id}: DeepReadonly<{ id: string }>) => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const association = cloneDeepReadonlyRaw(contextData.associationMap.get(id))
        if (!association) throw new Error(`Association [${id}] is not existed`)

        removeAssociationWatcher(id)
        contextData.associationMap.delete(id)
        vueFlow.removeEdges([id])
        return {association}
    }
    const updateAssociation = (options: DeepReadonly<{ association: AssociationIdOnly }>) => {
        const id = options.association.id
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const oldAssociation = associationOldMap.get(id)
        if (!oldAssociation) throw new Error(`Association [${id}] is not existed`)
        const existedAssociationEdge = vueFlow.findEdge(id)
        if (!existedAssociationEdge) throw new Error(`Edge [${id}] is not existed`)

        let sourceNode: GraphNode | undefined
        let sourceHandleId: string | undefined
        if ("sourceEntityId" in options.association) {
            sourceNode = vueFlow.findNode(options.association.sourceEntityId)
            if (!sourceNode) throw new Error(`Entity [${options.association.sourceEntityId}] is not existed`)
            sourceHandleId = options.association.sourcePropertyId
        } else {
            sourceNode = vueFlow.findNode(options.association.sourceAbstractEntityId)
            if (!sourceNode) throw new Error(`AbstractEntity [${options.association.sourceAbstractEntityId}] is not existed`)
            sourceHandleId = options.association.sourcePropertyId
        }

        const targetNode = vueFlow.findNode(options.association.referencedEntityId)
        if (!targetNode) throw new Error(`Entity [${options.association.referencedEntityId}] is not existed`)
        const targetHandleId = options.association.referencedEntityId

        const association = cloneDeepReadonlyRaw<AssociationIdOnly>(options.association)
        removeAssociationWatcher(id)
        contextData.associationMap.set(id, association)
        addAssociationWatcher(id)
        existedAssociationEdge.data.association = association
        vueFlow.updateEdge(existedAssociationEdge, {
            source: sourceNode.id,
            target: targetNode.id,
            sourceHandle: sourceHandleId,
            targetHandle: targetHandleId,
        })
        return {association: oldAssociation}
    }

    history.registerCommand("association:add", {
        applyAction: addAssociation,
        revertAction: revertAddAssociation,
    })

    history.registerCommand("association:change", {
        applyAction: updateAssociation,
        revertAction: updateAssociation,
    })

    const importIntoContext = (
        graphData: ModelGraphSubData,
        startPosition?: XYPosition,
    ): ModelSubIds => {
        const result = defaultModelSubIds()

        try {
            const contextData = getContextData()

            protectRepeatIds(graphData, contextData)
            protectRepeatNames(graphData, contextData)
            if (startPosition) {
                layoutPosition(startPosition, [
                    ...graphData.mappedSuperClasses,
                    ...graphData.entities,
                    ...graphData.embeddableTypes,
                    ...graphData.enumerations,
                ])
            }
            const newContextData = graphDataToModelData(graphData, contextData)

            for (const group of graphData.groups) {
                result.groupIds.push(addGroup({group}).id)
            }
            for (const {data: enumeration, position} of graphData.enumerations) {
                result.enumerationIds.push(addEnumeration({enumeration, position}).id)
            }
            for (const {data: embeddableType, position} of graphData.embeddableTypes) {
                result.embeddableTypeIds.push(addEmbeddableType({embeddableType, position}).id)
            }
            for (const {data: mappedSuperClass, position} of graphData.mappedSuperClasses) {
                result.mappedSuperClassIds.push(addMappedSuperClass({mappedSuperClass, position}).id)
            }
            for (const {data: entity, position} of graphData.entities) {
                result.entityIds.push(addEntity({entity, position}).id)
            }
            for (const association of newContextData.associations) {
                result.associationIds.push(addAssociation({association}).id)
            }
        } catch (e) {
            sendMessage(`Import Info Context Fail: ${e}`, {type: "error"})
            removeFromContext(result)
            throw e
        }

        return result
    }

    const removeFromContext = (
        modelSubIds: DeepReadonly<ModelSubIds>,
    ): ModelGraphSubData => {
        const result = defaultModelGraphSubData()

        try {
            const contextData = getContextData()
            const vueFlow = getVueFlow()
            const idSets = subIdsToSubIdSets(modelSubIds)

            // 收集额外的待删除的元素
            for (const groupId of idSets.groupIdSet) {
                for (const item of contextData.entityMap.values()) {
                    if (item.groupId === groupId) idSets.entityIdSet.add(item.id)
                }
                for (const item of contextData.mappedSuperClassMap.values()) {
                    if (item.groupId === groupId) idSets.mappedSuperClassIdSet.add(item.id)
                }
                for (const item of contextData.embeddableTypeMap.values()) {
                    if (item.groupId === groupId) idSets.embeddableTypeIdSet.add(item.id)
                }
                for (const item of contextData.enumerationMap.values()) {
                    if (item.groupId === groupId) idSets.enumerationIdSet.add(item.id)
                }
            }

            for (const entityId of idSets.entityIdSet) {
                for (const association of contextData.associationMap.values()) {
                    if ("sourceEntityId" in association && association.sourceEntityId === entityId) {
                        idSets.associationIdSet.add(association.id)
                    }
                    if ("referencedEntity" in association && association.referencedEntityId === entityId) {
                        idSets.associationIdSet.add(association.id)
                    }
                }
            }
            for (const mappedSuperClassId of idSets.mappedSuperClassIdSet) {
                for (const association of contextData.associationMap.values()) {
                    if ("sourceAbstractEntityId" in association && association.sourceAbstractEntityId === mappedSuperClassId) {
                        idSets.associationIdSet.add(association.id)
                    }
                }
            }

            // 真正执行删除
            for (const associationId of idSets.associationIdSet) {
                const association = contextData.associationMap.get(associationId)
                if (association) {
                    result.associations.push(association)
                    revertAddAssociation({id: association.id})
                }
            }

            for (const entityId of idSets.entityIdSet) {
                const entity = contextData.entityMap.get(entityId)
                const node = vueFlow.findNode(entityId)
                if (entity && node) {
                    result.entities.push({data: entity, position: node.position})
                    revertAddEntity({id: entity.id})
                }
            }

            for (const mappedSuperClassId of idSets.mappedSuperClassIdSet) {
                const mappedSuperClass = contextData.mappedSuperClassMap.get(mappedSuperClassId)
                const node = vueFlow.findNode(mappedSuperClassId)
                if (mappedSuperClass && node) {
                    result.mappedSuperClasses.push({data: mappedSuperClass, position: node.position})
                    revertAddMappedSuperClass({id: mappedSuperClass.id})
                }
            }

            for (const embeddableTypeId of idSets.embeddableTypeIdSet) {
                const embeddableType = contextData.embeddableTypeMap.get(embeddableTypeId)
                const node = vueFlow.findNode(embeddableTypeId)
                if (embeddableType && node) {
                    result.embeddableTypes.push({data: embeddableType, position: node.position})
                    revertAddEmbeddableType({id: embeddableType.id})
                }
            }

            for (const enumerationId of idSets.enumerationIdSet) {
                const enumeration = contextData.enumerationMap.get(enumerationId)
                const node = vueFlow.findNode(enumerationId)
                if (enumeration && node) {
                    result.enumerations.push({data: enumeration, position: node.position})
                    revertAddEnumeration({id: enumeration.id})
                }
            }

            for (const groupId of idSets.groupIdSet) {
                const group = contextData.groupMap.get(groupId)
                if (group) {
                    result.groups.push(group)
                    revertAddGroup({id: groupId})
                }
            }

            return cloneDeepReadonlyRaw(result)
        } catch (e) {
            sendMessage(`Remove from Context Fail: ${e}`, {type: "error"})
            importIntoContext(result)
            throw e
        }
    }

    history.registerCommand("import", {
        applyAction: ({data, startPosition}) => {
            const ids = importIntoContext(cloneDeepReadonlyRaw<ModelGraphSubData>(data), startPosition)
            return {ids, startPosition}
        },
        revertAction: ({ids, startPosition}) => {
            const data = removeFromContext(cloneDeepReadonlyRaw<ModelSubIds>(ids))
            return {data, startPosition}
        }
    })
    history.registerCommand("remove", {
        applyAction: (modelSubIds) => {
            return removeFromContext(cloneDeepReadonlyRaw<ModelSubIds>(modelSubIds))
        },
        revertAction: (graphData) => {
            return importIntoContext(cloneDeepReadonlyRaw<ModelGraphSubData>(graphData))
        }
    })

    return {
        history,
        canUndo,
        canRedo,
        menuMap: shallowReadonly(menuMap),
        waitChangeSync,
        noEffect: {
            group: {
                add: addGroup,
                delete: revertAddGroup,
                update: updateGroup,
            },
            entity: {
                add: addEntity,
                delete: revertAddEntity,
                update: updateEntity,
            },
            mappedSuperClass: {
                add: addMappedSuperClass,
                delete: revertAddMappedSuperClass,
                update: updateMappedSuperClass,
            },
            embeddableType: {
                add: addEmbeddableType,
                delete: revertAddEmbeddableType,
                update: updateEmbeddableType,
            },
            enumeration: {
                add: addEnumeration,
                delete: revertAddEnumeration,
                update: updateEnumeration,
            },
            association: {
                add: addAssociation,
                delete: revertAddAssociation,
                update: updateAssociation,
            },
        }
    }
}
