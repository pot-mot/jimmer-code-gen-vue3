import {createStore} from "@/utils/store/createStore.ts";
import {modelGenerate} from "@/modelEditor/generator/modelGenerate.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {useScriptDialog} from "@/modelEditor/script/useScriptDialog.ts";
import {ref} from "vue";

export const useModelGenerator = createStore(() => {
    const generateScope = ref<"ALL" | "SELECTED">("ALL")

    return {
        ...useDialogOpenState(),
        generateScope,
        generate: (
            context: DeepReadonly<ModelContext>,
            selectedIds: DeepReadonly<Partial<ModelSubIds>>,
        ): Record<string, string> => {
            return modelGenerate(
                context,
                useScriptDialog().scriptsStore.value,
                generateScope.value === 'ALL' ? undefined : selectedIds,
            )
        },
    }
})
