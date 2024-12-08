import {defineStore} from "pinia";
import {useDialogOpenState} from "@/components/global/dialog/DialogOpenState.ts";
import {ref} from "vue";
import {GenerateResult} from "@/api/__generated/model/static";

export const useMultiCodePreviewStore = defineStore(
    'MultiCodePreview', () => {
        const dialogOpenState = useDialogOpenState()

        const codes = ref<GenerateResult>({
            files: [],
            tableEntityPairs: []
        })

        type codeRefreshAction = () => void

        const codeRefreshActionSet = new Set<codeRefreshAction>

        return {
            codes,
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
