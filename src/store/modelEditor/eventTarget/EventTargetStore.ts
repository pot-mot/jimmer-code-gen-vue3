import {computed, DeepReadonly, ref, watch} from "vue";
import {GenModelInput_TargetOf_enums, GenModelInput_TargetOf_subGroups,} from "@/api/__generated/model/static";
import {defineStore} from "pinia";
import {AssociationEdgePair, TableNodePair} from "@/store/modelEditor/ModelEditorStore.ts";
import {useContextMenuStore} from "@/store/modelEditor/contextMenu/ContextMenuStore.ts";

export type ModelEditorEventTarget = {
    type: "Model",
} | {
    type: "Table",
    tableNodePair: DeepReadonly<TableNodePair>
} | {
    type: "Association",
    associationEdgePair: DeepReadonly<AssociationEdgePair>
} | {
    type: "SubGroup",
    subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups> | undefined
} | {
    type: "Enum",
    enum: DeepReadonly<GenModelInput_TargetOf_enums>
}

const getDefaultTarget = (): ModelEditorEventTarget => {
    return {type: "Model"}
}

export const useEventTargetStore = defineStore(
    'ModelEditor_EventTarget',
    () => {
        const target = ref<ModelEditorEventTarget>(getDefaultTarget())

        const targetLock = ref(false)
        const isLock = () => {return targetLock.value}
        const lock = () => {targetLock.value = true}
        const unlock = () => {targetLock.value = false}

        const contextMenuStore = useContextMenuStore()
        watch(() => contextMenuStore.openState, (value) => {
            targetLock.value = value;
        })

        const targetWrapper = computed({
            set(newTarget: ModelEditorEventTarget) {
                if (!targetLock.value) {
                    target.value = newTarget
                }
            },
            get(): ModelEditorEventTarget {
                return target.value
            }
        })

        const toDefault = () => {
            targetWrapper.value = getDefaultTarget()
        }

        const getTargetSubGroupName = (): string | undefined => {
            switch (target.value.type) {
                case "SubGroup":
                    return target.value.subGroup?.name;
                case "Table":
                    return target.value.tableNodePair.table.subGroup?.name;
                case "Enum":
                    return target.value.enum.subGroup?.name;
                default:
                    return undefined;
            }
        }

        return {
            target: targetWrapper,

            isLock,
            lock,
            unlock,

            toDefault,
            getTargetSubGroupName,
        }
    }
)
