import {languages} from "monaco-editor";
import {jsonSchemas, type JsonSchemaKey} from "@/type/__generated/jsonSchema";
import {typeObjectEntries} from "@/utils/type/typeObjectEntries.ts";
import type {ErrorObject} from "ajv";
type DiagnosticsOptions = languages.json.DiagnosticsOptions

const fileMatchMap = new Map<JsonSchemaKey, Set<string>>

const createDiagnosticsOptions = (): DiagnosticsOptions => {
    return {
        validate: true,
        schemas: typeObjectEntries(jsonSchemas).map(([key, value]) => {
            const fileMatchSet = fileMatchMap.get(key)
            return {
                uri: value.uri,
                schema: value.schema,
                fileMatch: fileMatchSet ? [...fileMatchSet] : []
            }
        }),
        schemaValidation: "error",
        enableSchemaRequest: false,
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

export type JsonSchemaValidationResult = {
    valid: true
} | {
    valid: false
    error?: ErrorObject[] | any
}


export const validateJsonSchema = (key: JsonSchemaKey, value: any): JsonSchemaValidationResult => {
    try {
        let error
        const result = jsonSchemas[key].validate(value, (errorObject) => {
            error = errorObject
        })
        return {
            valid: result,
            error
        }
    } catch (e) {
        return {
            valid: false,
            error: e
        }
    }
}

export const validateJsonSchemaString = (key: JsonSchemaKey, value: string): JsonSchemaValidationResult => {
    try {
        const jsonValue = JSON.parse(value)
        return validateJsonSchema(key, jsonValue)
    } catch (e) {
        return {
            valid: false,
            error: e
        }
    }
}