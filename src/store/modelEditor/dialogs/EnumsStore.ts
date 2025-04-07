import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {defineStore} from "pinia";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {getDefaultEnum} from "@/components/business/enum/defaultEnum.ts";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {
    syncEnumNameForEntities,
    syncEnumNameForTables,
    syncNewEnumForTables
} from "@/components/pages/ModelEditor/sync/syncEnum.ts";

const ENUM_CREATE_PREFIX = "[[ENUM_CREATE_PREFIX]]"

export type EnumCreateOptions = {
    subGroupName?: string | undefined,
} | {
    tableKey: string,
    columnName: string,
}

export const useEnumsStore = defineStore(
    'ModelEditor_Enums',
    () => {
        const dialogs = useDialogOpenListState<string, GenModelInput_TargetOf_enums>()

        const {MODEL_EDITOR, MODEL, GRAPH} = useModelEditorStore()

        const createOptionsMap = new Map<string, EnumCreateOptions | undefined>

        const create = (options?: EnumCreateOptions | undefined) => {
            const createKey = ENUM_CREATE_PREFIX + Date.now()
            const genEnum = getDefaultEnum()
            if (options !== undefined && "subGroupName" in options && options.subGroupName !== undefined) {
                genEnum.subGroup = {name: options.subGroupName}
            }
            dialogs.open(createKey, genEnum)
            createOptionsMap.set(createKey, options)
        }

        const created = (createKey: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
            MODEL_EDITOR.startBatchSync('createdEnum', () => {
                const model = MODEL._model()
                model.enums.push(cloneDeepReadonly<GenModelInput_TargetOf_enums>(genEnum))

                const options = createOptionsMap.get(createKey)

                if (options !== undefined && "tableKey" in options) {
                    const {tableKey, columnName} = options
                    syncNewEnumForTables(genEnum, tableKey, columnName)
                }

                createOptionsMap.delete(createKey)
            })

            dialogs.close(createKey, true)

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        const edit = (name: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
            dialogs.open(name, cloneDeepReadonly<GenModelInput_TargetOf_enums>(genEnum))
        }

        const edited = (name: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
            const oldName = name

            MODEL_EDITOR.startBatchSync('editedEnum', () => {
                const model = MODEL._model()
                const graph = GRAPH._graph()
                model.enums = [
                    ...model.enums.filter(it => it.name !== oldName),
                    cloneDeepReadonly<GenModelInput_TargetOf_enums>(genEnum)
                ]
                syncEnumNameForEntities(oldName, genEnum.name)
                syncEnumNameForTables(graph, oldName, genEnum.name)
            })

            dialogs.close(name, true)

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        const remove = (name: string) => {
            const oldName = name

            MODEL_EDITOR.startBatchSync('removeEnum', () => {
                const model = MODEL._model()
                const graph = GRAPH._graph()
                model.enums = model.enums.filter(it => it.name !== oldName)
                syncEnumNameForTables(graph, oldName, undefined)
            })

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        const submit = (key: string, association: DeepReadonly<GenModelInput_TargetOf_enums>) => {
            if (createOptionsMap.has(key)) {
                created(key, association)
            } else {
                edited(key, association)
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
