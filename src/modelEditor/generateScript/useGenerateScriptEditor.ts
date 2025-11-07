import {createStore} from "@/utils/store/createStore.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import type {ScriptInfo} from "@/modelEditor/generator/ScriptsStore.ts";
import {withLoading} from "@/components/loading/loadingApi.ts";
import {api} from "@/api";
import type {GenerateScriptUpdateInput} from "@/api/__generated/model/static";
import {useModelGenerator} from "@/modelEditor/generator/useModelGenerator.ts";

const scriptInfoToUpdateInput = (info: ScriptInfo<any>): GenerateScriptUpdateInput => {
    return {
        id: info.id,
        name: info.name,
        type: info.type,
        enabled: info.enabled,
        databaseType: info.databaseType,
        jvmLanguage: info.jvmLanguage,
        scriptContent: info.script.code
    }
}

export const useGenerateScriptEditor = createStore(() => {
    const scriptsStore = useModelGenerator().scriptsStore

    return {
        ...useDialogOpenState(),
        insertScript: async (scriptInfo: ScriptInfo<any>) => {
            await withLoading('insert scripts', async () => {
                await api.generateScriptService.insert({body: scriptInfoToUpdateInput(scriptInfo)})
                scriptsStore.value.add(scriptInfo)
            })
        },
        updateScript: async (scriptInfo: ScriptInfo<any>) => {
            await withLoading('update scripts', async () => {
                await api.generateScriptService.update({body: scriptInfoToUpdateInput(scriptInfo)})
                scriptsStore.value.update(scriptInfo.id, scriptInfo)
            })
        },
    }
})
