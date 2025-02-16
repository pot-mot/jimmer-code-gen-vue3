import {sendI18nMessage} from "@/message/message.ts";
import {api} from "@/api";
import {useMultiCodePreviewStore} from "@/store/modelEditor/MultiCodePreviewStore.ts";
import {useTableDialogsStore} from "@/store/modelEditor/TableDialogsStore.ts";
import {useEntityDialogsStore} from "@/store/modelEditor/EntityDialogsStore.ts";
import {useEnumDialogsStore} from "@/store/modelEditor/EnumDialogsStore.ts";
import {useAssociationDialogsStore} from "@/store/modelEditor/AssociationDialogsStore.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";
import {IdName} from "@/api/__generated/model/static";
import {nextTick} from "vue";
import {saveModel} from "@/components/pages/ModelEditor/save/saveModel.ts";
import {cloneDeep} from "lodash";
import {syncTypeEntityForEntities} from "@/components/pages/ModelEditor/sync/syncEntity.ts";

let editSaveAndRefresh: {
    editEntity: (idName: IdName) => void
    editEnum: (idName: IdName) => void
    editTable: (idName: IdName) => void
    editAssociation: (idName: IdName) => void
} | undefined = undefined

export const useEditSaveAndRefresh = () => {
    if (editSaveAndRefresh !== undefined) return editSaveAndRefresh

    const loadingStore = useGlobalLoadingStore()

    const {GRAPH, MODEL, MODEL_EDITOR} = useModelEditorStore()

    const codePreviewStore = useMultiCodePreviewStore()

    const tableDialogsStore = useTableDialogsStore()

    const entityDialogsStore = useEntityDialogsStore()

    const enumDialogsStore = useEnumDialogsStore()

    const associationDialogsStore = useAssociationDialogsStore()

    type DialogEventStore<K, V, O> = {
        open: (key: K, value: V, options?: O) => any,
        on: (event: 'close', fn: (options: { key: K, changed: boolean }) => any) => any,
        off: (event: 'close', fn: (options: { key: K, changed: boolean }) => any) => any
    }

    // open dialog, 并在对应 dialog close 后做些什么
    const openAndOnClosed = <K, V, O>(
        fn: (key: K, changed: boolean) => any,
        store: DialogEventStore<K, V, O>,
        key: K,
        value: V,
        option?: O,
    ) => {
        store.open(key, value, option)
        const onSubmitSave = async (options: { key: K, changed: boolean }) => {
            if (options.key === key) {
                try {
                    await fn(options.key, options.changed)
                } catch (e) {}
                store.off('close', onSubmitSave)
            }
        }
        store.on('close', onSubmitSave)
    }

    const refreshCode = async () => {
        await codePreviewStore.codeRefresh()
    }

    const refreshModelAndCode = async () => {
        await nextTick()

        let timer: number | undefined

        const waitRefresh = loadingStore.withLoading(
            'GenerateFileMenu saveModelAndRefreshCodes',
            async () => {
                // 若存在需要等待同步的表和历史记录，先行等待这些进行同步，此后再进行保存
                if (
                    MODEL_EDITOR.waitSyncTableIds.value.length === 0 &&
                    MODEL_EDITOR.waitSyncHistoryBatches.value.length === 0
                ) {
                    const graph = GRAPH._graph()
                    const model = MODEL._model()
                    const currentGraphData = JSON.stringify(MODEL_EDITOR.getGraphData())

                    if (model.graphData !== currentGraphData) {
                        graph.cleanSelection()
                        model.graphData = currentGraphData

                        await saveModel(model)

                        await refreshCode()
                    }
                    clearTimeout(timer)
                } else {
                    timer = window.setTimeout(waitRefresh, 100)
                }
            }
        )

        await waitRefresh()
    }

    const editEntity = async (idName: IdName): Promise<void> => {
        const entity = await api.entityService.get({id: idName.id})
        if (entity === undefined) {
            sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickEntityNotFound", args: [idName]})
            return
        }
        openAndOnClosed(
            async (_, changed) => {
                if (changed) {
                    await refreshCode()
                    await syncTypeEntityForEntities(idName.id)
                }
            },
            entityDialogsStore, idName.id, entity
        )
    }

    const editTable = (idName: IdName) => {
        const tableNodePair = cloneDeep(MODEL.tableNodePairs.filter(it => it.first.name === idName.name)[0])
        if (!tableNodePair) {
            sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickTableNotFoundInCurrentModel", args: [idName]})
            return
        }
        openAndOnClosed(
            async (_, changed) => {
                if (changed) await refreshModelAndCode()
            },
            tableDialogsStore, tableNodePair.second.id, tableNodePair.first
        )
    }

    const editEnum = (idName: IdName) => {
        const genEnum = cloneDeep(MODEL.enums.filter(it => it.name === idName.name)[0])
        if (!genEnum) {
            sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickEnumNotFoundInCurrentModel", args: [idName]})
            return
        }
        openAndOnClosed(
            async (_, changed) => {
                if (changed) await refreshModelAndCode()
            },
            enumDialogsStore, idName.name, genEnum
        )
    }

    const editAssociation = (idName: IdName) => {
        const associationEdgePair = cloneDeep(MODEL.associationEdgePairs.filter(it => it.first.name === idName.name)[0])
        if (!associationEdgePair) {
            sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickAssociationNotFoundInCurrentModel", args: [idName]})
            return
        }
        openAndOnClosed(
            async (_, changed) => {
                if (changed) await refreshModelAndCode()
            },
            associationDialogsStore, associationEdgePair.second.id, associationEdgePair.first
        )
    }

    editSaveAndRefresh = {
        editEntity,
        editEnum,
        editTable,
        editAssociation,
    }

    return editSaveAndRefresh
}
