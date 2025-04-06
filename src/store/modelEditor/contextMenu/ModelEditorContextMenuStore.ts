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
import {MenuOptions} from "@imengyu/vue3-context-menu";

type ModelEditorContextMenuOpenOptions = Pick<
    MenuOptions, 'x' | 'y' | 'xOffset' | 'yOffset'
>

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

const getDefaultTarget = (): ModelEditorContextMenuOpenTarget => {
    return {type: "Model"}
}

export const useModelEditorContextMenuStore = defineStore(
    'ModelEditorContextMenu',
    () => {
        const {open, close, ...otherOperations} = useOpenState()

        const target = ref<ModelEditorContextMenuOpenTarget>(getDefaultTarget())

        const options = ref<ModelEditorContextMenuOpenOptions>({x: 0, y: 0})

        return {
            ...otherOperations,
            target,
            options,
            open: (inputOptions: ModelEditorContextMenuOpenOptions, inputTarget?: ModelEditorContextMenuOpenTarget | undefined) => {
                target.value = inputTarget ?? getDefaultTarget()
                options.value = inputOptions
                open()
            },
            close: () => {
                target.value = getDefaultTarget()
                close()
            }
        }
    }
)
