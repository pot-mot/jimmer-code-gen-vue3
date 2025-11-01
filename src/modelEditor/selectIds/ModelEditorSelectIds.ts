import {readonly, ref} from "vue";
import type {EdgeChange, NodeChange, VueFlowStore} from "@vue-flow/core";
import mitt from "mitt";
import {fillModelSubIds} from "@/type/context/utils/ModelSubIds.ts";
import {findAssociationEdge} from "@/modelEditor/edge/findAssociationEdge.ts";

export const useModelEditorSelectIds = (
    modelEditorState: {
        getContextData: () => ModelContextData,
        getVueFlow: () => VueFlowStore,
        getNextZIndex: () => number,
    }
) => {
    const {getContextData, getVueFlow, getNextZIndex} = modelEditorState

    // 选中的 Id
    const selectedIdSets = ref<ModelSubIdSets>({
        groupIdSet: new Set<string>(),
        entityIdSet: new Set<string>(),
        mappedSuperClassIdSet: new Set<string>(),
        embeddableTypeIdSet: new Set<string>(),
        enumerationIdSet: new Set<string>(),
        associationIdSet: new Set<string>(),
    })
    const clearSelectedIdSets = () => {
        if (selectedIdSets.value.groupIdSet.size > 0) selectedIdSets.value.groupIdSet.clear()
        if (selectedIdSets.value.entityIdSet.size > 0) selectedIdSets.value.entityIdSet.clear()
        if (selectedIdSets.value.mappedSuperClassIdSet.size > 0) selectedIdSets.value.mappedSuperClassIdSet.clear()
        if (selectedIdSets.value.embeddableTypeIdSet.size > 0) selectedIdSets.value.embeddableTypeIdSet.clear()
        if (selectedIdSets.value.enumerationIdSet.size > 0) selectedIdSets.value.enumerationIdSet.clear()
        if (selectedIdSets.value.associationIdSet.size > 0) selectedIdSets.value.associationIdSet.clear()

        const vueFlow = getVueFlow()
        vueFlow.removeSelectedNodes(vueFlow.getSelectedNodes.value)
        vueFlow.removeSelectedEdges(vueFlow.getSelectedEdges.value)
    }
    const modelSelectionEventBus = mitt<{
        "group": { id: string, selected: boolean },
        "entity": { id: string, selected: boolean },
        "mappedSuperClass": { id: string, selected: boolean },
        "embeddableType": { id: string, selected: boolean },
        "enumeration": { id: string, selected: boolean },
        "association": { id: string, selected: boolean },
    }>()

    const selectGroup = (id: string) => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()
        if (!contextData.groupMap.has(id)) throw new Error(`[${id}] is not existed`)

        if (!vueFlow.multiSelectionActive.value) clearSelectedIdSets()
        selectedIdSets.value.groupIdSet.add(id)
        modelSelectionEventBus.emit('group', {id, selected: true})
    }
    const unselectGroup = (id: string) => {
        selectedIdSets.value.groupIdSet.delete(id)
        modelSelectionEventBus.emit('group', {id, selected: false})
    }
    const selectEntity = (id: string) => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()
        if (!contextData.entityMap.has(id)) throw new Error(`[${id}] is not existed`)
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Node [${id}] is not existed`)

        if (!vueFlow.multiSelectionActive.value) clearSelectedIdSets()
        selectedIdSets.value.entityIdSet.add(id)
        vueFlow.addSelectedNodes([node])
        modelSelectionEventBus.emit('entity', {id, selected: true})
    }
    const unselectEntity = (id: string) => {
        const vueFlow = getVueFlow()
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Node [${id}] is not existed`)
        selectedIdSets.value.entityIdSet.delete(id)
        vueFlow.removeSelectedNodes([node])
        modelSelectionEventBus.emit('entity', {id, selected: false})
    }
    const selectMappedSuperClass = (id: string) => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()
        if (!contextData.mappedSuperClassMap.has(id)) throw new Error(`[${id}] is not existed`)
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Node [${id}] is not existed`)

        if (!vueFlow.multiSelectionActive.value) clearSelectedIdSets()
        selectedIdSets.value.mappedSuperClassIdSet.add(id)
        vueFlow.addSelectedNodes([node])
        modelSelectionEventBus.emit('mappedSuperClass', {id, selected: true})
    }
    const unselectMappedSuperClass = (id: string) => {
        const vueFlow = getVueFlow()
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Node [${id}] is not existed`)
        selectedIdSets.value.mappedSuperClassIdSet.delete(id)
        vueFlow.removeSelectedNodes([node])
        modelSelectionEventBus.emit('mappedSuperClass', {id, selected: false})
    }
    const selectEmbeddableType = (id: string) => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()
        if (!contextData.embeddableTypeMap.has(id)) throw new Error(`[${id}] is not existed`)
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Node [${id}] is not existed`)

        if (!vueFlow.multiSelectionActive.value) clearSelectedIdSets()
        selectedIdSets.value.embeddableTypeIdSet.add(id)
        vueFlow.addSelectedNodes([node])
        modelSelectionEventBus.emit('embeddableType', {id, selected: true})
    }
    const unselectEmbeddableType = (id: string) => {
        const vueFlow = getVueFlow()
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Node [${id}] is not existed`)
        selectedIdSets.value.embeddableTypeIdSet.delete(id)
        vueFlow.removeSelectedNodes([node])
        modelSelectionEventBus.emit('embeddableType', {id, selected: false})
    }
    const selectEnumeration = (id: string) => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()
        if (!contextData.enumerationMap.has(id)) throw new Error(`[${id}] is not existed`)
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Node [${id}] is not existed`)

        if (!vueFlow.multiSelectionActive.value) clearSelectedIdSets()
        selectedIdSets.value.enumerationIdSet.add(id)
        vueFlow.addSelectedNodes([node])
        modelSelectionEventBus.emit('enumeration', {id, selected: true})
    }
    const unselectEnumeration = (id: string) => {
        const vueFlow = getVueFlow()
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Node [${id}] is not existed`)
        selectedIdSets.value.enumerationIdSet.delete(id)
        vueFlow.removeSelectedNodes([node])
        modelSelectionEventBus.emit('enumeration', {id, selected: false})
    }
    const selectAssociation = (id: string) => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()
        if (!contextData.associationMap.has(id)) throw new Error(`Association [${id}] is not existed`)
        const edge = findAssociationEdge(id, vueFlow)
        if (!edge) throw new Error(`Edge [${id}] is not existed`)

        if (!vueFlow.multiSelectionActive.value) clearSelectedIdSets()
        selectedIdSets.value.associationIdSet.add(id)
        vueFlow.addSelectedEdges([edge])
        modelSelectionEventBus.emit('association', {id, selected: true})
    }
    const unselectAssociation = (id: string) => {
        const vueFlow = getVueFlow()
        const edge = findAssociationEdge(id, vueFlow)
        if (!edge) throw new Error(`Edge [${id}] is not existed`)

        selectedIdSets.value.associationIdSet.delete(id)
        vueFlow.removeSelectedEdges([edge])
        modelSelectionEventBus.emit('association', {id, selected: false})
    }

    const select = (ids: DeepReadonly<Partial<ModelSubIds>>) => {
        const vueFlow = getVueFlow()
        const oldMultiSelectionActive = vueFlow.multiSelectionActive.value
        if (!oldMultiSelectionActive) vueFlow.multiSelectionActive.value = true
        const fullIds = fillModelSubIds(ids)
        for (const id of fullIds.groupIds) selectGroup(id)
        for (const id of fullIds.entityIds) selectEntity(id)
        for (const id of fullIds.mappedSuperClassIds) selectMappedSuperClass(id)
        for (const id of fullIds.embeddableTypeIds) selectEmbeddableType(id)
        for (const id of fullIds.enumerationIds) selectEnumeration(id)
        for (const id of fullIds.associationIds) selectAssociation(id)
        if (!oldMultiSelectionActive) vueFlow.multiSelectionActive.value = false
    }

    const selectAll = () => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()
        const oldMultiSelectionActive = vueFlow.multiSelectionActive.value
        if (!oldMultiSelectionActive) vueFlow.multiSelectionActive.value = true
        for (const id of contextData.groupMap.keys()) selectGroup(id)
        for (const id of contextData.entityMap.keys()) selectEntity(id)
        for (const id of contextData.mappedSuperClassMap.keys()) selectMappedSuperClass(id)
        for (const id of contextData.embeddableTypeMap.keys()) selectEmbeddableType(id)
        for (const id of contextData.enumerationMap.keys()) selectEnumeration(id)
        for (const id of contextData.associationMap.keys()) selectAssociation(id)
        if (!oldMultiSelectionActive) vueFlow.multiSelectionActive.value = false
    }

    const unselect = (ids: DeepReadonly<Partial<ModelSubIds>>) => {
        const fullIds = fillModelSubIds(ids)
        for (const id of fullIds.groupIds) unselectGroup(id)
        for (const id of fullIds.entityIds) unselectEntity(id)
        for (const id of fullIds.mappedSuperClassIds) unselectMappedSuperClass(id)
        for (const id of fullIds.embeddableTypeIds) unselectEmbeddableType(id)
        for (const id of fullIds.enumerationIds) unselectEnumeration(id)
        for (const id of fullIds.associationIds) unselectAssociation(id)
    }

    const unselectAll = () => {
        for (const id of selectedIdSets.value.groupIdSet) unselectGroup(id)
        for (const id of selectedIdSets.value.entityIdSet) unselectEntity(id)
        for (const id of selectedIdSets.value.mappedSuperClassIdSet) unselectMappedSuperClass(id)
        for (const id of selectedIdSets.value.embeddableTypeIdSet) unselectEmbeddableType(id)
        for (const id of selectedIdSets.value.enumerationIdSet) unselectEnumeration(id)
        for (const id of selectedIdSets.value.associationIdSet) unselectAssociation(id)
    }

    const syncNodeSelectChange = (changes: NodeChange[]) => {
        const vueFlow = getVueFlow()

        for (const change of changes) {
            if (change.type === "select") {
                if (change.selected) {
                    const node = vueFlow.findNode(change.id)
                    if (node) node.zIndex = getNextZIndex()

                    if (change.id.startsWith("Entity")) {
                        selectedIdSets.value.entityIdSet.add(change.id)
                        modelSelectionEventBus.emit('entity', {id: change.id, selected: true})
                    } else if (change.id.startsWith("MappedSuperClass")) {
                        selectedIdSets.value.mappedSuperClassIdSet.add(change.id)
                        modelSelectionEventBus.emit('mappedSuperClass', {id: change.id, selected: true})
                    } else if (change.id.startsWith("EmbeddableType")) {
                        selectedIdSets.value.embeddableTypeIdSet.add(change.id)
                        modelSelectionEventBus.emit('embeddableType', {id: change.id, selected: true})
                    } else if (change.id.startsWith("Enumeration")) {
                        selectedIdSets.value.enumerationIdSet.add(change.id)
                        modelSelectionEventBus.emit('enumeration', {id: change.id, selected: true})
                    }
                } else {
                    if (change.id.startsWith("Entity")) {
                        selectedIdSets.value.entityIdSet.delete(change.id)
                        modelSelectionEventBus.emit('entity', {id: change.id, selected: false})
                    } else if (change.id.startsWith("MappedSuperClass")) {
                        selectedIdSets.value.mappedSuperClassIdSet.delete(change.id)
                        modelSelectionEventBus.emit('mappedSuperClass', {id: change.id, selected: false})
                    } else if (change.id.startsWith("EmbeddableType")) {
                        selectedIdSets.value.embeddableTypeIdSet.delete(change.id)
                        modelSelectionEventBus.emit('embeddableType', {id: change.id, selected: false})
                    } else if (change.id.startsWith("Enumeration")) {
                        selectedIdSets.value.enumerationIdSet.delete(change.id)
                        modelSelectionEventBus.emit('enumeration', {id: change.id, selected: false})
                    }
                }
            } else if (change.type === "remove") {
                if (change.id.startsWith("Entity")) {
                    if (selectedIdSets.value.entityIdSet.has(change.id)) {
                        selectedIdSets.value.entityIdSet.delete(change.id)
                        modelSelectionEventBus.emit('entity', {id: change.id, selected: false})
                    }
                } else if (change.id.startsWith("MappedSuperClass")) {
                    if (selectedIdSets.value.mappedSuperClassIdSet.has(change.id)) {
                        selectedIdSets.value.mappedSuperClassIdSet.delete(change.id)
                        modelSelectionEventBus.emit('mappedSuperClass', {id: change.id, selected: false})
                    }
                } else if (change.id.startsWith("EmbeddableType")) {
                    if (selectedIdSets.value.embeddableTypeIdSet.has(change.id)) {
                        selectedIdSets.value.embeddableTypeIdSet.delete(change.id)
                        modelSelectionEventBus.emit('embeddableType', {id: change.id, selected: false})
                    }
                } else if (change.id.startsWith("Enumeration")) {
                    if (selectedIdSets.value.enumerationIdSet.has(change.id)) {
                        selectedIdSets.value.enumerationIdSet.delete(change.id)
                        modelSelectionEventBus.emit('enumeration', {id: change.id, selected: false})
                    }
                }
            }
        }
    }

    const syncEdgeSelectChange = (changes: EdgeChange[]) => {
        const vueFlow = getVueFlow()

        for (const change of changes) {
            if (change.type === "select") {
                if (change.selected) {
                    const edge = vueFlow.findEdge(change.id)
                    if (edge) edge.zIndex = getNextZIndex()

                    selectedIdSets.value.associationIdSet.add(change.id)
                    modelSelectionEventBus.emit('association', {id: change.id, selected: true})
                } else {
                    selectedIdSets.value.associationIdSet.delete(change.id)
                    modelSelectionEventBus.emit('association', {id: change.id, selected: false})
                }
            } else if (change.type === "remove") {
                if (selectedIdSets.value.associationIdSet.has(change.id)) {
                    selectedIdSets.value.associationIdSet.delete(change.id)
                    modelSelectionEventBus.emit('association', {id: change.id, selected: false})
                }
            }
        }
    }
    
    return {
        selectedIdSets: readonly(selectedIdSets),
        select,
        selectAll,
        unselect,
        unselectAll,
        eventBus: modelSelectionEventBus,
        selectGroup,
        unselectGroup,
        selectEntity,
        unselectEntity,
        selectMappedSuperClass,
        unselectMappedSuperClass,
        selectEmbeddableType,
        unselectEmbeddableType,
        selectEnumeration,
        unselectEnumeration,
        selectAssociation,
        unselectAssociation,

        syncNodeSelectChange,
        syncEdgeSelectChange,
    }
}