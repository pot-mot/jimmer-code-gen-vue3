import {defineStore} from "pinia";
import {useOpenState} from "@/components/global/dialog/OpenState.ts";
import {DeepReadonly, ref} from "vue";
import {
    GenAssociationModelInput, GenModelInput_TargetOf_enums,
    GenModelInput_TargetOf_subGroups,
    GenTableModelInput, Pair
} from "@/api/__generated/model/static";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import {Edge, Node} from "@antv/x6";

type ModelEditorContextMenuOpenTarget = {
    type: "Model",
} | {
    type: "Table",
    tableNodePair: DeepReadonly<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>
} | {
    type: "Association",
    associationEdgePair: DeepReadonly<Pair<GenAssociationModelInput, UnwrapRefSimple<Edge>>>
} | {
    type: "SubGroup",
    subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>
} | {
    type: "Enum",
    enum: DeepReadonly<GenModelInput_TargetOf_enums>
}

export const useModelEditorContextMenuStore = defineStore(
    'ModelEditorContextMenu',
    () => {
        const {open, close, ...otherOperations} = useOpenState()

        const openTarget = ref<ModelEditorContextMenuOpenTarget>()

        return {
            ...otherOperations,
            openTarget,
            open: (target?: ModelEditorContextMenuOpenTarget | undefined) => {
                openTarget.value = target ?? {type: "Model"}
                open()
            },
            close: () => {
                openTarget.value = undefined
                close()
            }
        }
    }
)
