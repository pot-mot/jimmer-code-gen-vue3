import {createStore} from "@/utils/store/createStore.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {
    createScriptsStore,
    emptyScriptsStore,
    type ScriptInfo,
    type ScriptsStore
} from "@/modelEditor/script/ScriptsStore.ts";
import {withLoading} from "@/components/loading/loadingApi.ts";
import {api} from "@/api";
import type {
    GenerateScriptInsertInput,
    GenerateScriptUpdateInput,
    GenerateScriptView
} from "@/api/__generated/model/static";
import {readonly, ref} from "vue";
import type {ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";
import {createTsScript} from "@/components/code/scriptEditor/TsScriptExecutor.ts";
import {sendMessage} from "@/components/message/messageApi.ts";
import {defaultScripts} from "@/type/__generated/defaultScript";
import {sendConfirm} from "@/components/confirm/confirmApi.ts";
import {translate} from "@/store/i18nStore.ts";

const scriptsStore = ref<ScriptsStore>(emptyScriptsStore())

const scriptInfoToInsertInput = (info: Omit<ScriptInfo<any>, 'id'>): GenerateScriptInsertInput => {
    return {
        name: info.name,
        type: info.type,
        enabled: info.enabled,
        databaseType: info.databaseType,
        jvmLanguage: info.jvmLanguage,
        scriptContent: info.script.code
    }
}

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

const fetchScripts = async (): Promise<ScriptsStore> => {
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

    return createScriptsStore([
        ...Object.values(defaultScripts),
        ...scriptInfos
    ])
}

export const initScriptDialog = async () => {
    scriptsStore.value = await fetchScripts()
}

export const useScriptDialog = createStore(() => {
    return {
        ...useDialogOpenState(),
        scriptsStore: readonly(scriptsStore),
        insertScript: async (scriptInfo: Omit<ScriptInfo<any>, 'id'>) => {
            try {
                await withLoading('insert scripts', async () => {
                    const result = await api.generateScriptService.insert({body: scriptInfoToInsertInput(scriptInfo)})
                    scriptsStore.value.add({id: result.id, ...scriptInfo})
                    sendMessage(translate({key: "insert_success", args: [translate("script")]}), {type: "success"})
                })
            } catch (e) {
                sendMessage(translate({key: "insert_fail", args: [translate("script")]}), {type: "warning"})
            }
        },
        updateScript: async (scriptInfo: ScriptInfo<any>) => {
            try {
                await withLoading('update scripts', async () => {
                    const result = await api.generateScriptService.update({body: scriptInfoToUpdateInput(scriptInfo)})
                    scriptsStore.value.update(result.id, scriptInfo)
                    sendMessage(translate({key: "update_success", args: [translate("script")]}), {type: "success"})
                })
            } catch (e) {
                sendMessage(translate({key: "update_fail", args: [translate("script")]}), {type: "warning"})
            }
        },
        deleteScript: async (id: string) => {
            const scriptInfo = scriptsStore.value.scriptInfoMap.get(id)
            if (!scriptInfo) return
            sendConfirm({
                title: translate({key: "delete_confirm_title", args: [translate("script")]}),
                content: translate({
                    key: "delete_confirm_content",
                    args: [` ${translate("script")}[${scriptInfo.name}] `]
                }),
                onConfirm: async () => {
                    try {
                        await withLoading('delete scripts', async () => {
                            await api.generateScriptService.delete({scriptId: id})
                            scriptsStore.value.remove(id)
                            sendMessage(translate({
                                key: "delete_success",
                                args: [translate("script")]
                            }), {type: "success"})
                        })
                    } catch (e) {
                        sendMessage(translate({key: "delete_fail", args: [translate("script")]}), {type: "warning"})
                    }
                }
            })
        },
    }
})
