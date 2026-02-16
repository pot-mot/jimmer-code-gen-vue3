import {validatePartialModelGraphSubData} from "@/type/context/jsonSchema/PartialModelGraphSubData.ts";
import {fillModelGraphSubData} from "@/modelEditor/utils/ModelGraphSubData.ts";
import type {ModelHistoryView} from "@/api/__generated/model/static";
import {objectDiff} from "@potmot/diff"
import type {CircularReferenceDiff, ObjectDiff} from "@potmot/diff/dist/type/DiffItem.d.ts";

export type ModelDiffInput = DeepReadonly<Partial<{
    model: Partial<Omit<Model, "id" | "createdTime" | "modifiedTime">>
    viewport: ModelViewport
    subData: Partial<ModelGraphSubData>
}>>

export type ModelVersionDiff = DeepReadonly<{
    model: ObjectDiff<Partial<Omit<Model, "id" | "createdTime" | "modifiedTime">>> | CircularReferenceDiff
    viewport: ObjectDiff<ModelViewport> | CircularReferenceDiff
    subData: ObjectDiff<Partial<ModelGraphSubData>> | CircularReferenceDiff
}>

const nameIdAnyMatch = [
    (a: any, b: any): boolean => {
        if (
            "data" in a && typeof a.data === "object" &&
            "data" in b && typeof b.data === "object" &&
            "name" in a.data && typeof a.data.name === "string" &&
            "name" in b.data && typeof b.data.name === "string" &&
            "id" in a.data && typeof a.data.id === "string" &&
            "id" in b.data && typeof b.data.id === "string"
        ) return a.data.name === b.data.name && a.data.id === b.data.id
        if (
            "name" in a && typeof a.name === "string" &&
            "name" in b && typeof b.name === "string" &&
            "id" in a && typeof a.id === "string" &&
            "id" in b && typeof b.id === "string"
        ) return a.name === b.name && a.id === b.id
        return false
    },
    (a: any, b: any): boolean => {
        if (
            "data" in a && typeof a.data === "object" &&
            "data" in b && typeof b.data === "object" &&
            "name" in a.data && typeof a.data.name === "string" &&
            "name" in b.data && typeof b.data.name === "string"
        ) return a.data.name === b.data.name
        if (
            "name" in a && typeof a.name === "string" &&
            "name" in b && typeof b.name === "string"
        ) return a.name === b.name
        return false
    },
    (a: any, b: any): boolean => {
        if (
            "data" in a && typeof a.data === "object" &&
            "data" in b && typeof b.data === "object" &&
            "id" in a.data && typeof a.data.id === "string" &&
            "id" in b.data && typeof b.data.id === "string"
        ) return a.data.id === b.data.id
        if (
            "id" in a && typeof a.id === "string" &&
            "id" in b && typeof b.id === "string"
        ) return a.id === b.id
        return false
    },
]

export const modelVersionDiff = (
    prev: ModelDiffInput | undefined,
    next: ModelDiffInput | undefined
): ModelVersionDiff => {
    return {
        model: objectDiff(prev?.model, next?.model),
        viewport: objectDiff(prev?.viewport, next?.viewport),
        subData: objectDiff(prev?.subData, next?.subData, nameIdAnyMatch)
    }
}

const parseGraphSubData = (json: string | undefined): ModelGraphSubData | undefined => {
    try {
        if (!json) return undefined

        const parsedJson = JSON.parse(json)
        if (validatePartialModelGraphSubData(parsedJson)) {
            return fillModelGraphSubData(parsedJson)
        } else {
            return undefined
        }
    } catch (e) {
        console.warn(e)
        return undefined
    }
}

export const versionViewToDiffInput = (data: ModelHistoryView): ModelDiffInput => {
    return {
        model: {
            name: data.name,
            description: data.description,
            databaseType: data.databaseType,
            databaseNameStrategy: data.databaseNameStrategy,
            defaultForeignKeyType: data.defaultForeignKeyType,
            jvmLanguage: data.jvmLanguage,
            defaultEnumerationStrategy: data.defaultEnumerationStrategy,
        },
        viewport: data.viewport,
        subData: parseGraphSubData(data.jsonData),
    }
}

export const graphDataToDiffInput = (data: ModelGraphData): ModelDiffInput => {
    const {id, createdTime, modifiedTime, ...rest} = data.model
    return {
        model: rest,
        viewport: data.viewport,
        subData: data.subData,
    }
}
