import {objectDiff} from "@/utils/diff/objectDiff.ts";

type ModelDiffInput = DeepReadonly<Partial<{
    model: Partial<Omit<Model, "id" | "createdTime" | "modifiedTime">>
    viewport: ModelViewport
    subData: Partial<ModelGraphSubData>
}>>

const excludeModelFields = (model?: Partial<Model>) => {
    if (!model) return model;

    const { id, createdTime, modifiedTime, ...rest } = model;
    return rest;
};

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

export const versionDiff = (
    prev: ModelDiffInput | undefined,
    next: ModelDiffInput | undefined
) => {
    return {
        model: objectDiff(excludeModelFields(prev?.model), excludeModelFields(next?.model)),
        viewport: objectDiff(prev?.viewport, next?.viewport),
        subData: objectDiff(prev?.subData, next?.subData, nameIdAnyMatch)
    }
}