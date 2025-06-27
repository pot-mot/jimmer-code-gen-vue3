import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {defineStore} from "pinia";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {updateAssociationEdgeData} from "@/components/pages/ModelEditor/graph/associationEdge/updateData.ts";
import {AssociationEdgePair, useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {getDefaultAssociation} from "@/components/business/association/defaultColumn.ts";
import {deleteConfirm} from "@/message/confirm.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const ASSOCIATION_CREATE_PREFIX = "[[ASSOCIATION_CREATE_PREFIX]]"

export type AssociationCreateOptions = {
    sourceTableName?: string | undefined,
    targetTableName?: string | undefined,
}

export const useAssociationsStore = defineStore(
    'ModelEditor_Associations',
    () => {
        const dialogs = useDialogOpenListState<string, GenAssociationModelInput>()

        const {MODEL_EDITOR, GRAPH, SELECT} = useModelEditorStore()

        const createOptionsMap = new Map<string, AssociationCreateOptions | undefined>

        const create = (options?: AssociationCreateOptions | undefined) => {
            const createKey = ASSOCIATION_CREATE_PREFIX + Date.now()
            const association = getDefaultAssociation()
            if (options) {
                if (options.sourceTableName) {
                    association.sourceTableName = options.sourceTableName
                }
                if (options.targetTableName) {
                    association.targetTableName = options.targetTableName
                }
            }
            dialogs.open(createKey, association)
            createOptionsMap.set(createKey, options)
        }

        const created = (createKey: string, association: DeepReadonly<GenAssociationModelInput>) => {
            const edge = MODEL_EDITOR.loadInput({
                associations: [association]
            }).edges[0]

            if (edge) {
                createOptionsMap.delete(createKey)

                dialogs.close(createKey, true)

                setTimeout(() => {
                    SELECT.select(edge)
                }, 200)
            }

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        const edit = (id: string, association: DeepReadonly<GenAssociationModelInput>) => {
            dialogs.open(id, cloneDeepReadonly<GenAssociationModelInput>(association))
        }

        const edited = (id: string, association: DeepReadonly<GenAssociationModelInput>) => {
            const graph = GRAPH._graph()

            const cell = graph.getCellById(id)
            if (!cell || !cell.isEdge()) {
                sendI18nMessage({
                    key: "MESSAGE_ModelEditorStore_associationEditFail_edgeNotFound",
                    args: [id]
                }, 'error')
            } else {
                graph.startBatch(`editAssociation [id=${id}]`)

                updateAssociationEdgeData(cell, association)

                graph.stopBatch(`editAssociation [id=${id}]`)
            }

            dialogs.close(id, true)

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        const remove = (associationEdgePair: DeepReadonly<AssociationEdgePair>, confirm: boolean = true) => {
            deleteConfirm(`${useI18nStore().translate('LABEL_DeleteTarget_Association')}【${associationEdgePair.association.name}】`, () => {
                GRAPH._graph().removeEdge(associationEdgePair.edge.id)
                MODEL_EDITOR.waitRefreshModelAndCode()
            }, confirm)
        }

        const submit = (key: string, association: DeepReadonly<GenAssociationModelInput>) => {
            if (createOptionsMap.has(key)) {
                created(key, association)
            } else {
                edited(key, association)
            }
        }

        const modify = async (id: string, modifyAction: () => any) => {
            const graph = GRAPH._graph()

            const key = `modifyAssociation [id=${id}]`
            graph.startBatch(key)
            await modifyAction()
            graph.stopBatch(key)
        }

        return {
            ...dialogs,

            create,
            edit,
            submit,
            remove,

            modify
        }
    }
)
