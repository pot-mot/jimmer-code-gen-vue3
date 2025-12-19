import type {ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";
import {type TsScript} from "@/utils/tsExecutor/TsScriptExecutor.ts";
import {reactive, readonly} from "vue";

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

export type ScriptsStore = {
    readonly scriptInfoMap: DeepReadonly<Map<string, ScriptInfo<any>>>
    readonly getScriptInfos: (options?: ScriptFilterOptions) => DeepReadonly<{[key in ScriptTypeName]: ScriptInfo<key>[]}>
    readonly add: (script: ScriptInfo<any>) => void
    readonly enable: (id: string) => boolean
    readonly disable: (id: string) => boolean
    readonly rename: (id: string, newName: string) => boolean
    readonly update: (id: string, script: ScriptInfo<any>) => boolean
    readonly remove: (id: string) => boolean
}

export const createScriptsStore = (
    scripts: Readonly<Iterable<ScriptInfo<any>>> = [],
): ScriptsStore => {
    const scriptInfoMap = reactive(new Map<string, ScriptInfo<any>>())

    for (const script of scripts) {
        scriptInfoMap.set(script.id, script)
    }

    return Object.freeze({
        scriptInfoMap: readonly(scriptInfoMap),
        getScriptInfos: (options?: ScriptFilterOptions) => {
            const result: {[key in ScriptTypeName]: ScriptInfo<key>[]} = {
                ModelGenerator: [],
                GroupGenerator: [],
                TableGenerator: [],
                EntityGenerator: [],
                MappedSuperClassGenerator: [],
                EmbeddableTypeGenerator: [],
                EnumerationGenerator: [],
                AssociationGenerator: [],
            }
            for (const script of scriptInfoMap.values()) {
                if (options?.enabled !== undefined && script.enabled !== options.enabled) continue
                if (options?.databaseType !== undefined && (script.databaseType !== "ANY" && script.databaseType !== options.databaseType)) continue
                if (options?.jvmLanguage !== undefined && (script.jvmLanguage !== "ANY" && script.jvmLanguage !== options.jvmLanguage)) continue

                const currentList = result[script.type]
                if (currentList !== undefined) {
                    currentList.push(script)
                } else {
                    result[script.type] = [script]
                }
            }
            return result
        },
        add: (script: ScriptInfo<any>) => {
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
        update: (id: string, script: ScriptInfo<any>) => {
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
    return createScriptsStore()
}
