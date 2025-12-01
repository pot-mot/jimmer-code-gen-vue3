import {createStore} from "@/utils/store/createStore.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {readonly, ref} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

type ContextMenuTarget =
    | { type: "Model" }
    | { type: "Group", id: string }
    | { type: "Entity", id: string }
    | { type: "MappedSuperClass", id: string }
    | { type: "Enumeration", id: string }
    | { type: "EmbeddableType", id: string }
    | { type: "Association", id: string }

export const useModelContextMenu = createStore(() => {
    const {open, close, ...dialogOpenState} = useDialogOpenState()

    const innerTarget = ref<ContextMenuTarget>({type: "Model"})
    const innerPosition = ref<{ x: number, y: number }>({x: 0, y: 0})

    return {
        ...dialogOpenState,
        target: readonly(innerTarget),
        position: readonly(innerPosition),
        open: (
            target: ContextMenuTarget,
            position: { x: number, y: number }
        ) => {
            innerTarget.value = target
            innerPosition.value = position
            open()
        },
        close: () => {
            useModelEditor().focus()
            close()
        }
    }
})
