import {defineStore} from "pinia";
import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {getDefaultGenModelSubGroup} from "@/components/business/modelSubGroup/defaultModelSubGroupForm.ts";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {
    setSubGroupNameForEnums,
    setSubGroupNameForTables,
    syncSubGroupNameForEnums, syncSubGroupNameForTables
} from "@/components/pages/ModelEditor/sync/syncSubGroup.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {deleteConfirm} from "@/message/confirm.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const SUB_GROUP_CREATE_PREFIX = "[[SUB_GROUP_CREATE_PREFIX]]"

export type SubGroupCreateOptions = {
    tableKeys?: string[] | undefined,
    enumKeys?: string[] | undefined,
}

export const useSubGroupsStore = defineStore(
    'ModelEditor_SubGroups',
    () => {
        const dialogs = useDialogOpenListState<string, GenModelInput_TargetOf_subGroups>()

        const {MODEL_EDITOR, MODEL, GRAPH} = useModelEditorStore()

        const createOptionsMap = new Map<string, SubGroupCreateOptions | undefined>

        const create = (options?: SubGroupCreateOptions | undefined) => {
            const createKey = SUB_GROUP_CREATE_PREFIX + Date.now()
            dialogs.open(createKey, getDefaultGenModelSubGroup())
            createOptionsMap.set(createKey, options)
        }

        const created = (createKey: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => {
            MODEL_EDITOR.startBatchSync('createdSubGroup', () => {
                const model = MODEL._model()
                const graph = GRAPH._graph()
                model.subGroups.push(cloneDeepReadonly<GenModelInput_TargetOf_subGroups>(subGroup))

                const options = createOptionsMap.get(createKey)

                if (options !== undefined) {
                    const {tableKeys, enumKeys} = options
                    if (tableKeys) {
                        setSubGroupNameForTables(graph, new Set(tableKeys), subGroup.name)
                    }
                    if (enumKeys) {
                        setSubGroupNameForEnums(model, new Set(enumKeys), subGroup.name)
                    }
                }

                createOptionsMap.delete(createKey)
            })

            dialogs.close(createKey, true)

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        const edit = (name: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => {
            dialogs.open(name, cloneDeepReadonly<GenModelInput_TargetOf_subGroups>(subGroup))
        }

        const edited = (name: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => {
            const oldName = name

            MODEL_EDITOR.startBatchSync('editedSubGroup', () => {
                const model = MODEL._model()
                const graph = GRAPH._graph()
                model.subGroups = [
                    ...model.subGroups.filter(it => it.name !== oldName),
                    cloneDeepReadonly<GenModelInput_TargetOf_subGroups>(subGroup)
                ]
                syncSubGroupNameForEnums(model, oldName, subGroup.name)
                syncSubGroupNameForTables(graph, oldName, subGroup.name)
            })

            dialogs.close(name, true)

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        const pureRemove = (name: string) => {
            MODEL_EDITOR.startBatchSync('removeSubGroup', () => {
                const model = MODEL._model()
                const graph = GRAPH._graph()
                model.subGroups = model.subGroups.filter(it => it.name !== name)
                syncSubGroupNameForEnums(model, name, undefined)
                syncSubGroupNameForTables(graph, name, undefined)
            })

            MODEL_EDITOR.waitRefreshModelAndCode()
        }
        const remove = (name: string, confirm: boolean = true) => {
            if (confirm) {
                deleteConfirm(`${useI18nStore().translate('LABEL_DeleteTarget_SubGroup')}【${name}】`, () => {
                    pureRemove(name)
                })
            } else {
                pureRemove(name)
            }
        }

        const submit = (key: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => {
            if (createOptionsMap.has(key)) {
                created(key, subGroup)
            } else {
                edited(key, subGroup)
            }
        }

        return {
            ...dialogs,

            create,
            edit,
            submit,
            remove,
        }
    }
)
