import {createStore} from "@/utils/store/createStore.ts";
import {modelGenerate} from "@/modelEditor/generator/modelGenerate.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {useScriptDialog} from "@/modelEditor/script/useScriptDialog.ts";

export const useModelGenerator = createStore(() => {
    return {
        ...useDialogOpenState(),
        generate: (
            context: DeepReadonly<ModelContext>,
            selectedIds: DeepReadonly<Partial<ModelSubIds>>,
        ): Record<string, string> => {
            return modelGenerate(
                context,
                selectedIds,
                useScriptDialog().scriptsStore.value,
            )
        },
    }
})
