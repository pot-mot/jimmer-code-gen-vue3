import {defineStore} from "pinia";
import {useDialogOpenState} from "@/components/global/dialog/DialogOpenState.ts";
import {ref} from "vue";
import {GenerateFile} from "@/api/__generated/model/static";

export const useMultiCodePreviewStore = defineStore(
    'MultiCodePreview', () => {
        const dialogOpenState = useDialogOpenState()

        const codeFiles = ref<Array<GenerateFile>>([])

        type codeRefreshAction = () => void

        const codeRefreshActionSet = new Set<codeRefreshAction>

        return {
            codeFiles,
            ...dialogOpenState,

            codeRefresh: () => {
                codeRefreshActionSet.forEach(it => it())
            },
            onCodeRefresh: (action: () => any) => {
                codeRefreshActionSet.add(action)
            },
            offCodeRefresh: (action: () => any) => {
                codeRefreshActionSet.delete(action)
            }
        }
    }
)
