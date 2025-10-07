import {readonly, ref} from "vue";
import {
    emptyScriptsStore,
    fetchScripts, saveScripts, type ScriptsStore,
} from "@/modelEditor/generator/ScriptsStore.ts";
import {createStore} from "@/utils/store/createStore.ts";
import {modelGenerate} from "@/modelEditor/generator/modelGenerate.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";

const scriptsStore = ref<ScriptsStore<any>>(emptyScriptsStore())

export const initModelGenerator = async () => {
    scriptsStore.value = await fetchScripts()
}

export const useModelGenerator = createStore(() => {
    return {
        ...useDialogOpenState(),
        scriptsStore: readonly(scriptsStore),
        generate: (
            context: DeepReadonly<ModelContext>,
            selectedIds: DeepReadonly<Partial<ModelSubIds>>,
        ): Record<string, string> => {
            return modelGenerate(
                context,
                selectedIds,
                scriptsStore.value,
            )
        },
        save: async () => {
            await saveScripts(scriptsStore.value)
        },
        refresh: async () => {
            scriptsStore.value = await fetchScripts()
        },
    }
})