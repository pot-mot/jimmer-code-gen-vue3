import {createStore} from "@/utils/store/createStore.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {ref} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {defaultGroup} from "@/type/context/default/modelDefaults.ts";

export const useGroupCreateDialog = createStore(() => {
    const {open, close, ...dialogOpenState} = useDialogOpenState()
    const groupState = ref<Group>()

    const {
        addGroup,
        toggleCurrentGroup,
    } = useModelEditor()

    return {
        ...dialogOpenState,
        close,
        groupState,
        open() {
            groupState.value = defaultGroup()
            open()
        },
        submit() {
            if (groupState.value) {
                addGroup(groupState.value)
                toggleCurrentGroup(groupState.value)
            }
            close()
        },
    }
})
