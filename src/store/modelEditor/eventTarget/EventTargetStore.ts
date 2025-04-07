import {DeepReadonly, ref} from "vue";
import {
    GenAssociationModelInput, GenModelInput_TargetOf_enums,
    GenModelInput_TargetOf_subGroups,
    GenTableModelInput,
    Pair
} from "@/api/__generated/model/static";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import {Edge, Node} from "@antv/x6";
import {defineStore} from "pinia";

type ModelEditorEventTarget = {
    type: "Model",
} | {
    type: "Table",
    tableNodePair: DeepReadonly<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>
} | {
    type: "Association",
    associationEdgePair: DeepReadonly<Pair<GenAssociationModelInput, UnwrapRefSimple<Edge>>>
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

        const toDefault = () => {
            target.value = getDefaultTarget()
        }

        return {
            target,
            toDefault,
        }
    }
)
