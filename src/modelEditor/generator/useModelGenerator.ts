import {readonly, ref} from "vue";
import {
    emptyScriptsStore,
    type ScriptInfo, type ScriptsStore, createScriptsStore,
} from "@/modelEditor/generator/ScriptsStore.ts";
import {createStore} from "@/utils/store/createStore.ts";
import {modelGenerate} from "@/modelEditor/generator/modelGenerate.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import type {ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";
import type {GenerateScriptView} from "@/api/__generated/model/static";
import {createTsScript} from "@/components/code/scriptEditor/TsScriptExecutor.ts";
import {api} from "@/api";
import {sendMessage} from "@/components/message/messageApi.ts";
import {defaultScripts} from "@/type/__generated/defaultScript";
import {withLoading} from "@/components/loading/loadingApi.ts";

const scriptsStore = ref<ScriptsStore<any>>(emptyScriptsStore())

const scriptViewToInfo = async <Name extends ScriptTypeName>(
    view: GenerateScriptView
): Promise<ScriptInfo<Name>> => {
    const scriptResult = await createTsScript(view.type, view.scriptContent)
    if (scriptResult.valid) {
        return {
            id: view.id,
            name: view.name,
            type: view.type,
            enabled: view.enabled,
            databaseType: view.databaseType,
            jvmLanguage: view.jvmLanguage,
            script: scriptResult.script
        }
    } else {
        throw scriptResult
    }
}

export const fetchScripts = async (): Promise<ScriptsStore<any>> => {
    const scriptViews = await withLoading('fetch scripts', async () => {
        return await api.generateScriptService.list()
    })
    const scriptInfos: ScriptInfo<any>[] = []
    for (const scriptView of scriptViews) {
        try {
            const scriptInfo = await scriptViewToInfo(scriptView)
            scriptInfos.push(scriptInfo)
        } catch (e) {
            sendMessage(`${scriptView.name} pass error: ${e}`, {type: "warning"})
        }
    }

    return createScriptsStore<any>([
        ...Object.values(defaultScripts),
        ...scriptInfos
    ])
}

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
        refresh: async () => {
            scriptsStore.value = await fetchScripts()
        },
    }
})