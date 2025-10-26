import type {ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";
import type {TsScript} from "@/components/code/scriptEditor/TsScriptExecutor.ts";
import {reactive, readonly} from "vue";
import {defaultScripts} from "@/type/__generated/defaultScript";

export type ScriptInfo<Name extends ScriptTypeName> = {
    id: string
    name: string
    type: ScriptTypeName
    enabled: boolean
    databaseType: DatabaseType | "ANY"
    jvmLanguage: JvmLanguage | "ANY"
    script: TsScript<Name>
}

export type ScriptFilterOptions = {
    enabled?: boolean | undefined
    databaseType?: DatabaseType | undefined
    jvmLanguage?: JvmLanguage | undefined
}

export type ScriptsStore<Name extends ScriptTypeName> = {
    readonly scriptInfoMap: DeepReadonly<Map<string, ScriptInfo<Name>>>
    readonly getScriptInfos: (options?: ScriptFilterOptions) => DeepReadonly<ScriptInfo<Name>[]>
    readonly add: (script: ScriptInfo<Name>) => void
    readonly enable: (id: string) => boolean
    readonly disable: (id: string) => boolean
    readonly rename: (id: string, newName: string) => boolean
    readonly update: (id: string, script: ScriptInfo<Name>) => boolean
    readonly remove: (id: string) => boolean
}

export const createScriptsStore = <Name extends ScriptTypeName>(
    scripts: Readonly<Iterable<ScriptInfo<Name>>> = [],
): ScriptsStore<Name> => {
    const scriptInfoMap = reactive(new Map<string, ScriptInfo<Name>>())

    for (const script of scripts) {
        scriptInfoMap.set(script.id, script)
    }

    return Object.freeze({
        scriptInfoMap: readonly(scriptInfoMap),
        getScriptInfos: (options?: ScriptFilterOptions) => {
            const result: ScriptInfo<Name>[] = []
            for (const script of scriptInfoMap.values()) {
                if (options?.enabled !== undefined && script.enabled !== options.enabled) continue
                if (options?.databaseType !== undefined && (script.databaseType !== "ANY" && script.databaseType !== options.databaseType)) continue
                if (options?.jvmLanguage !== undefined && (script.jvmLanguage !== "ANY" && script.jvmLanguage !== options.jvmLanguage)) continue
                result.push(script)
            }
            return result
        },
        add: (script: ScriptInfo<Name>) => {
            if (scriptInfoMap.has(script.id)) {
                throw new Error(`Script ${script.id} already exists`)
            }
            scriptInfoMap.set(script.id, script)
        },
        enable: (id: string) => {
            const script = scriptInfoMap.get(id)
            if (script) {
                script.enabled = true
                return true
            } else {
                return false
            }
        },
        disable: (id: string) => {
            const script = scriptInfoMap.get(id)
            if (script) {
                script.enabled = false
                return true
            } else {
                return false
            }
        },
        rename: (id: string, newName: string) => {
            const script = scriptInfoMap.get(id)
            if (script) {
                script.name = newName
                return true
            } else {
                return false
            }
        },
        update: (id: string, script: ScriptInfo<Name>) => {
            if (!scriptInfoMap.has(script.id)) return false
            scriptInfoMap.set(id, script)
            return true
        },
        remove: (id: string) => {
            if (!scriptInfoMap.has(id)) return false
            scriptInfoMap.delete(id)
            return true
        }
    })
}

export const emptyScriptsStore = () => {
    return createScriptsStore<any>()
}


// TODO add defaultScript
export const fetchScripts = async (): Promise<ScriptsStore<any>> => {
    return createScriptsStore<any>([
        ...Object.values(defaultScripts)
    ])
}

export const saveScripts = async (scripts: ScriptsStore<any>): Promise<void> => {
    // TODO save scripts
}
