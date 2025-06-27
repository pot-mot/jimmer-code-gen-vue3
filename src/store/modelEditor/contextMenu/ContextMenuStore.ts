import {defineStore} from "pinia";
import {useOpenState} from "@/components/global/dialog/OpenState.ts";
import {ref} from "vue";
import {MenuOptions} from "@imengyu/vue3-context-menu";

type ModelEditorContextMenuOpenOptions = Pick<
    MenuOptions, 'x' | 'y' | 'xOffset' | 'yOffset'
>

export const useContextMenuStore = defineStore(
    'ModelEditor_ContextMenu',
    () => {
        const {open, close, ...otherOperations} = useOpenState()

        const options = ref<ModelEditorContextMenuOpenOptions>({x: 0, y: 0})

        return {
            ...otherOperations,
            options,
            open: (inputOptions: ModelEditorContextMenuOpenOptions) => {
                options.value = inputOptions
                open()
            },
            close: () => {
                close()
            }
        }
    }
)
