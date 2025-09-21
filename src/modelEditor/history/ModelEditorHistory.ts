import {type CommandDefinition, useCommandHistory} from "@/history/commandHistory.ts";
import {type VueFlowStore, type XYPosition} from "@vue-flow/core";
import {computed, reactive, type Ref, ref, shallowReadonly, type ShallowRef, watch} from "vue";
import type {MenuItem} from "@/modelEditor/useModelEditor.ts";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";
import {debounce} from "lodash-es";
import {NodeType_Entity} from "@/modelEditor/node/EntityNode.ts";
import {NodeType_MappedSuperClass} from "@/modelEditor/node/MappedSuperClassNode.ts";
import {NodeType_EmbeddableType} from "@/modelEditor/node/EmbeddableTypeNode.ts";
import {NodeType_Enumeration} from "@/modelEditor/node/EnumerationNode.ts";

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
        console.log("change", options)
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

    const menuMap = ref(new Map<string, MenuItem>())

    // 分组
    const groupWatchStopMap = new Map<string, () => void>()
    const addGroupWatcher = (id: string) => {
        const contextData = getContextData()

        if (groupWatchStopMap.has(id)) throw new Error(`Group [${id}] is already watched`)

        let oldGroup = cloneDeepReadonlyRaw(contextData.groupMap.get(id))
        const debounceSyncGroupUpdate = debounce((newGroup: Group | undefined) => {
            if (newGroup && oldGroup) {
                history.pushCommand("group:change", {
                    group: newGroup
                }, {
                    group: oldGroup
                })
            }
            oldGroup = cloneDeepReadonlyRaw(newGroup)
        }, SYNC_DEBOUNCE_TIMEOUT)
        const stopWatch = watch(() => contextData.groupMap.get(id),
            (value) => {
                debounceSyncGroupUpdate(value)
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

        const existedGroup = cloneDeepReadonlyRaw(contextData.groupMap.get(id))
        if (!existedGroup) throw new Error(`Group [${id}] is not existed`)
        const menuItem = menuMap.value.get(id)
        if (!menuItem) throw new Error(`Group [${id}] is not existed in menuMap`)

        if (menuItem.entityMap.size > 0) throw new Error(`Group [${id}] has entities, can't remove`)
        if (menuItem.mappedSuperClassMap.size > 0) throw new Error(`Group [${id}] has mapped super classes, can't remove`)
        if (menuItem.embeddableTypeMap.size > 0) throw new Error(`Group [${id}] has embeddable types, can't remove`)
        if (menuItem.enumerationMap.size > 0) throw new Error(`Group [${id}] has enumerations, can't remove`)

        removeGroupWatcher(id)
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
        const watchStop = groupWatchStopMap.get(id)
        if (!watchStop) throw new Error(`Group [${id}] is not watched`)

        const group = cloneDeepReadonlyRaw(options.group)

        removeGroupWatcher(id)
        contextData.groupMap.set(id, group)
        addGroupWatcher(id)
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
    const entityWatchStopMap = new Map<string, () => void>()
    const addEntityWatcher = (id: string) => {
        const contextData = getContextData()

        if (entityWatchStopMap.has(id)) throw new Error(`Entity [${id}] is already watched`)

        let oldEntity = cloneDeepReadonlyRaw(contextData.entityMap.get(id))
        const debounceSyncEntityUpdate = debounce((newEntity: EntityWithProperties | undefined) => {
            if (newEntity && oldEntity) {
                history.pushCommand("entity:change", {
                    entity: newEntity
                }, {
                    entity: oldEntity
                })
            }
            oldEntity = cloneDeepReadonlyRaw(newEntity)
        }, SYNC_DEBOUNCE_TIMEOUT)
        const stopWatch = watch(() => contextData.entityMap.get(id),
            (value) => {
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
        vueFlow.addNodes({
            id,
            type: NodeType_Entity,
            position: options.position,
            data: {entity},
        })
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

        const oldGroupId = existedEntity.groupId
        if (oldGroupId !== groupId) {
            const oldMenuItem = menuMap.value.get(oldGroupId)
            if (!oldMenuItem) throw new Error(`Group [${oldGroupId}] is not existed in menuMap`)
            if (!oldMenuItem.entityMap.has(id)) throw new Error(`Entity [${id}] is not existed in group [${oldGroupId}]`)
            oldMenuItem.entityMap.delete(id)
            menuItem.entityMap.set(id, entity)
        }

        removeEntityWatcher(id)
        contextData.entityMap.set(id, entity)
        addEntityWatcher(id)
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
    const mappedSuperClassWatchStopMap = new Map<string, () => void>()
    const addMappedSuperClassWatcher = (id: string) => {
        const contextData = getContextData()

        if (mappedSuperClassWatchStopMap.has(id)) throw new Error(`MappedSuperClass [${id}] is already watched`)

        let oldMappedSuperClass = cloneDeepReadonlyRaw(contextData.mappedSuperClassMap.get(id))
        const debounceSyncMappedSuperClassUpdate = debounce((newMappedSuperClass: MappedSuperClassWithProperties | undefined) => {
            if (newMappedSuperClass && oldMappedSuperClass) {
                history.pushCommand("mapped-super-class:change", {
                    mappedSuperClass: newMappedSuperClass
                }, {
                    mappedSuperClass: oldMappedSuperClass
                })
            }
            oldMappedSuperClass = cloneDeepReadonlyRaw(newMappedSuperClass)
        }, SYNC_DEBOUNCE_TIMEOUT)
        const stopWatch = watch(() => contextData.mappedSuperClassMap.get(id),
            (value) => {
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
        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (menuItem.entityMap.has(id)) throw new Error(`MappedSuperClass [${id}] is already existed in group [${groupId}]`)

        const mappedSuperClass = cloneDeepReadonlyRaw<MappedSuperClassWithProperties>(options.mappedSuperClass)
        contextData.mappedSuperClassMap.set(id, mappedSuperClass)
        addMappedSuperClassWatcher(id)
        menuItem.mappedSuperClassMap.set(id, mappedSuperClass)
        vueFlow.addNodes({
            id,
            type: NodeType_MappedSuperClass,
            position: options.position,
            data: {mappedSuperClass},
        })
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

        removeMappedSuperClassWatcher(id)
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
        if (!menuItem.mappedSuperClassMap.has(id)) throw new Error(`MappedSuperClass [${id}] is not existed in group [${groupId}]`)

        const mappedSuperClass = cloneDeepReadonlyRaw<MappedSuperClassWithProperties>(options.mappedSuperClass)

        const oldGroupId = existedMappedSuperClass.groupId
        if (oldGroupId !== groupId) {
            const oldMenuItem = menuMap.value.get(oldGroupId)
            if (!oldMenuItem) throw new Error(`Group [${oldGroupId}] is not existed in menuMap`)
            if (!oldMenuItem.mappedSuperClassMap.has(id)) throw new Error(`MappedSuperClass [${id}] is not existed in group [${oldGroupId}]`)
            oldMenuItem.mappedSuperClassMap.delete(id)
            menuItem.mappedSuperClassMap.set(id, mappedSuperClass)
        }

        removeMappedSuperClassWatcher(id)
        contextData.mappedSuperClassMap.set(id, mappedSuperClass)
        addMappedSuperClassWatcher(id)
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
    const embeddableTypeWatchStopMap = new Map<string, () => void>()
    const addEmbeddableTypeWatcher = (id: string) => {
        const contextData = getContextData()

        if (embeddableTypeWatchStopMap.has(id)) throw new Error(`EmbeddableType [${id}] is already watched`)

        let oldEmbeddableType = cloneDeepReadonlyRaw(contextData.embeddableTypeMap.get(id))
        const debounceSyncEmbeddableTypeUpdate = debounce((newEmbeddableType: EmbeddableTypeWithProperties | undefined) => {
            if (newEmbeddableType && oldEmbeddableType) {
                history.pushCommand("embeddable-type:change", {
                    embeddableType: newEmbeddableType
                }, {
                    embeddableType: oldEmbeddableType
                })
            }
        }, SYNC_DEBOUNCE_TIMEOUT)
        const stopWatch = watch(
            () => contextData.embeddableTypeMap.get(id),
            (newEmbeddableType) => {
                debounceSyncEmbeddableTypeUpdate(newEmbeddableType)
                oldEmbeddableType = cloneDeepReadonlyRaw(newEmbeddableType)
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

    const addEmbeddableType = (options: DeepReadonly<{ embeddableType: EmbeddableTypeWithProperties; position: XYPosition }>) => {
        const id = options.embeddableType.id
        const groupId = options.embeddableType.groupId
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        if (contextData.embeddableTypeMap.has(id)) throw new Error(`EmbeddableType [${id}] is already existed`)
        if (embeddableTypeWatchStopMap.has(id)) throw new Error(`EmbeddableType [${id}] is already watched`)
        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (menuItem.entityMap.has(id)) throw new Error(`EmbeddableType [${id}] is already existed in group [${groupId}]`)

        const embeddableTypeWithId = cloneDeepReadonlyRaw<EmbeddableTypeWithProperties>(options.embeddableType)
        contextData.embeddableTypeMap.set(id, embeddableTypeWithId)
        addEmbeddableTypeWatcher(id)
        menuItem.embeddableTypeMap.set(id, embeddableTypeWithId)
        vueFlow.addNodes({
            id,
            type: NodeType_EmbeddableType,
            position: options.position,
            data: { embeddableType: embeddableTypeWithId },
        })
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
        if (!menuItem.entityMap.has(id)) throw new Error(`EmbeddableType [${id}] is not existed in group [${groupId}]`)

        removeEmbeddableTypeWatcher(id)
        contextData.embeddableTypeMap.delete(id)
        menuItem.entityMap.delete(id)
        vueFlow.removeNodes([embeddableTypeNode])
        return {embeddableType,  position: embeddableTypeNode.position}
    }

    const updateEmbeddableType = (options: DeepReadonly<{ embeddableType: EmbeddableTypeWithProperties }>) => {
        const id = options.embeddableType.id
        const groupId = options.embeddableType.groupId
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const existedEmbeddableType = cloneDeepReadonlyRaw(contextData.embeddableTypeMap.get(id))
        if (!existedEmbeddableType) throw new Error(`EmbeddableType [${id}] is not existed`)
        const existingEmbeddableTypeNode = vueFlow.findNode(id)
        if (!existingEmbeddableTypeNode) throw new Error(`EmbeddableType [${id}] is not existed`)
        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(existedEmbeddableType.groupId)
        if (!menuItem) throw new Error(`Group [${existedEmbeddableType.groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(existedEmbeddableType.id)) throw new Error(`EmbeddableType [${existedEmbeddableType.id}] is not existed in group [${existedEmbeddableType.groupId}]`)

        const embeddableType = cloneDeepReadonlyRaw<EmbeddableTypeWithProperties>(options.embeddableType)

        const oldGroupId = existedEmbeddableType.groupId
        if (oldGroupId !== groupId) {
            const oldMenuItem = menuMap.value.get(oldGroupId)
            if (!oldMenuItem) throw new Error(`Group [${oldGroupId}] is not existed in menuMap`)
            if (!oldMenuItem.embeddableTypeMap.has(id)) throw new Error(`EmbeddableType [${id}] is not existed in group [${oldGroupId}]`)
            oldMenuItem.embeddableTypeMap.delete(id)
            menuItem.embeddableTypeMap.set(id, embeddableType)
        }

        removeEmbeddableTypeWatcher(id)
        contextData.embeddableTypeMap.set(id, embeddableType)
        addEmbeddableTypeWatcher(id)
        existingEmbeddableTypeNode.data.embeddableType = embeddableType
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
    const enumerationWatchStopMap = new Map<string, () => void>()
    const addEnumerationWatcher = (id: string) => {
        const contextData = getContextData()

        if (enumerationWatchStopMap.has(id)) throw new Error(`Enumeration [${id}] is already watched`)

        let oldEnumeration = cloneDeepReadonlyRaw(contextData.enumerationMap.get(id))
        const debounceSyncEnumerationUpdate = debounce((newEnumeration: Enumeration | undefined) => {
            if (newEnumeration && oldEnumeration) {
                history.pushCommand("enumeration:change", {
                    enumeration: newEnumeration
                }, {
                    enumeration: oldEnumeration
                })
            }
            oldEnumeration = cloneDeepReadonlyRaw(newEnumeration)
        }, SYNC_DEBOUNCE_TIMEOUT)
        const stopWatch = watch(() => contextData.enumerationMap.get(id),
            (value) => {
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
        if (menuItem.entityMap.has(id)) throw new Error(`Enumeration [${id}] is already existed in group [${groupId}]`)

        const enumeration = cloneDeepReadonlyRaw<Enumeration>(options.enumeration)
        contextData.enumerationMap.set(id, enumeration)
        addEnumerationWatcher(id)
        menuItem.enumerationMap.set(id, enumeration)
        vueFlow.addNodes({
            id,
            type: NodeType_Enumeration,
            position: options.position,
            data: { enumeration },
        })
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
        if (!menuItem.entityMap.has(id)) throw new Error(`Enumeration [${id}] is not existed in group [${groupId}]`)

        removeEnumerationWatcher(id)
        contextData.enumerationMap.delete(id)
        menuItem.enumerationMap.delete(id)
        vueFlow.removeNodes([enumerationNode])
        return {enumeration, position: enumerationNode.position}
    }

    const updateEnumeration = (options: DeepReadonly<{ enumeration: Enumeration }>) => {
        const id = options.enumeration.id
        const groupId = options.enumeration.groupId
        const contextData = getContextData()
        const vueFlow = getVueFlow()

        const existedEnumeration = cloneDeepReadonlyRaw(contextData.enumerationMap.get(id))
        if (!existedEnumeration) throw new Error(`Enumeration [${id}] is not existed`)
        const existingEnumerationNode = vueFlow.findNode(id)
        if (!existingEnumerationNode) throw new Error(`Enumeration [${id}] is not existed`)
        if (!contextData.groupMap.has(groupId)) throw new Error(`Group [${groupId}] is not existed`)
        const menuItem = menuMap.value.get(groupId)
        if (!menuItem) throw new Error(`Group [${groupId}] is not existed in menuMap`)
        if (!menuItem.entityMap.has(id)) throw new Error(`Enumeration [${id}] is not existed in group [${groupId}]`)

        const enumeration = cloneDeepReadonlyRaw<Enumeration>(options.enumeration)

        const oldGroupId = existedEnumeration.groupId
        if (oldGroupId !== groupId) {
            const oldMenuItem = menuMap.value.get(oldGroupId)
            if (!oldMenuItem) throw new Error(`Group [${oldGroupId}] is not existed in menuMap`)
            if (!oldMenuItem.enumerationMap.has(id)) throw new Error(`Enumeration [${id}] is not existed in group [${oldGroupId}]`)
            oldMenuItem.enumerationMap.delete(id)
            menuItem.enumerationMap.set(id, enumeration)
        }

        removeEnumerationWatcher(id)
        contextData.enumerationMap.set(id, enumeration)
        addEnumerationWatcher(id)
        existingEnumerationNode.data.enumeration = enumeration
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
    const associationWatchStopMap = new Map<string, () => void>()
    const addAssociationWatcher = (id: string) => {
        const contextData = getContextData()

        if (associationWatchStopMap.has(id)) throw new Error(`Association [${id}] is already watched`)

        let oldAssociation = cloneDeepReadonlyRaw(contextData.associationMap.get(id))
        const debounceSyncAssociationUpdate = debounce((newAssociation: Association | undefined) => {
            if (newAssociation && oldAssociation) {
                history.pushCommand("association:change", {
                    association: newAssociation
                }, {
                    association: oldAssociation
                })
            }
            oldAssociation = cloneDeepReadonlyRaw(newAssociation)
        }, SYNC_DEBOUNCE_TIMEOUT)
        const stopWatch = watch(() => contextData.associationMap.get(id),
            (value) => {
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

    const addAssociation = (options: DeepReadonly<{ association: Association }>) => {
        const id = options.association.id
        const contextData = getContextData()

        if (contextData.associationMap.has(id)) throw new Error(`Association [${id}] is already existed`)

        const association = cloneDeepReadonlyRaw<Association>(options.association)
        contextData.associationMap.set(id, association)
        addAssociationWatcher(id)
        return {id}
    }

    const revertAddAssociation = ({id}: DeepReadonly<{ id: string }>) => {
        const contextData = getContextData()

        const association = cloneDeepReadonlyRaw(contextData.associationMap.get(id))
        if (!association) throw new Error(`Association [${id}] is not existed`)

        removeAssociationWatcher(id)
        contextData.associationMap.delete(id)
        return {association}
    }

    const updateAssociation = (options: DeepReadonly<{ association: Association }>) => {
        const id = options.association.id
        const contextData = getContextData()

        const existedAssociation = cloneDeepReadonlyRaw(contextData.associationMap.get(id))
        if (!existedAssociation) throw new Error(`Association [${id}] is not existed`)

        const association = cloneDeepReadonlyRaw<Association>(options.association)

        removeAssociationWatcher(id)
        contextData.associationMap.set(id, association)
        addAssociationWatcher(id)
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
        menuMap: shallowReadonly(menuMap),
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
