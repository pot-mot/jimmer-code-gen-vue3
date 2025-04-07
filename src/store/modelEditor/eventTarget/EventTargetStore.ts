import {DeepReadonly, ref} from "vue";
import {
    GenModelInput_TargetOf_enums,
    GenModelInput_TargetOf_subGroups,
} from "@/api/__generated/model/static";
import {defineStore} from "pinia";
import {AssociationEdgePair, TableNodePair} from "@/store/modelEditor/ModelEditorStore.ts";

type ModelEditorEventTarget = {
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

        const toDefault = () => {
            target.value = getDefaultTarget()
        }

        return {
            target,
            toDefault,
        }
    }
)
