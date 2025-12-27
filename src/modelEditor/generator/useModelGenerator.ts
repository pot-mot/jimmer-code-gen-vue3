import {createStore} from "@/utils/store/createStore.ts";
import {modelGenerate} from "@/modelEditor/generator/modelGenerate.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {useScriptDialog} from "@/modelEditor/script/useScriptDialog.ts";
import {ref} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {useDiagnoseDialog} from "@/modelEditor/diagnostic/useDiagnoseDialog.ts";

export const useModelGenerator = createStore(() => {
    const generateScope = ref<"ALL" | "SELECTED">("ALL")

    return {
        ...useDialogOpenState(),
        generateScope,
        generate: (
            context: DeepReadonly<ModelContext>,
            selectedIds: DeepReadonly<Partial<ModelSubIds>>,
        ): Record<string, string> | undefined => {
            const modelEditor = useModelEditor()
            modelEditor.diagnose()
            if (modelEditor.modelDiagnoseInfo.total > 0) {
                useDiagnoseDialog().open()
            } else {
                return modelGenerate(
                    context,
                    useScriptDialog().scriptsStore.value,
                    generateScope.value === 'ALL' ? undefined : selectedIds,
                )
            }
        },
    }
})
