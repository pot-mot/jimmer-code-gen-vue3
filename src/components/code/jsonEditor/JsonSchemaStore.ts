import {languages} from "monaco-editor";
import jsonSchemas from "@/type/__generated/jsonSchema";
import {typeObjectEntries} from "@/utils/type/typeObjectEntries.ts";
type DiagnosticsOptions = languages.json.DiagnosticsOptions

export type JsonSchemaKey = keyof typeof jsonSchemas

const fileMatchMap = new Map<JsonSchemaKey, Set<string>>

const createDiagnosticsOptions = (): DiagnosticsOptions => {
    return {
        validate: true,
        schemas: typeObjectEntries(jsonSchemas).map(([key, value]) => {
            const fileMatchSet = fileMatchMap.get(key)
            return {
                ...value,
                fileMatch: fileMatchSet ? [...fileMatchSet] : []
            }
        }),
    }
}

export const addJsonSchemaFile = (key: JsonSchemaKey, fileName: string | Iterable<string>) => {
    let fileMatchSet = fileMatchMap.get(key)
    if (!fileMatchSet) {
        fileMatchSet = new Set<string>()
        fileMatchMap.set(key, fileMatchSet)
    }
    if (typeof fileName === 'string') {
        fileMatchSet.add(fileName)
    } else {
        for (const name of fileName) {
            fileMatchSet.add(name)
        }
    }
    languages.json.jsonDefaults.setDiagnosticsOptions(createDiagnosticsOptions())
}

export const removeJsonSchemaFile = (key: JsonSchemaKey, fileName: string | Iterable<string>) => {
    const fileMatchSet = fileMatchMap.get(key)
    if (fileMatchSet) {
        if (typeof fileName === 'string') {
            fileMatchSet.delete(fileName)
        } else {
            for (const name of fileName) {
                fileMatchSet.delete(name)
            }
        }
        if (fileMatchSet.size === 0) {
            fileMatchMap.delete(key)
        }
    }
    languages.json.jsonDefaults.setDiagnosticsOptions(createDiagnosticsOptions())
}
