import {createStore} from "@/utils/store/createStore.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {ref} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";

export const useGroupEditDialog = createStore(() => {
    const {open, close, ...dialogOpenState} = useDialogOpenState()
    const groupState = ref<Group>()

    const {
        changeGroup,
    } = useModelEditor()

    return {
        ...dialogOpenState,
        close,
        groupState,
        open(group: DeepReadonly<Group>) {
            groupState.value = cloneDeepReadonlyRaw<Group>(group)
            open()
        },
        submit() {
            if (groupState.value) {
                changeGroup(groupState.value)
            }
            close()
        },
    }
})
