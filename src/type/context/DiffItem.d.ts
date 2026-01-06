type CircularReferenceDiff = {
    type: "circular reference"
}

type ObjectDiff<T extends Record<string, unknown>, U extends Record<string, unknown> = T> = {
    type: "object"
    // 属性更新（现有属性的值变化）
    updated?: {
        [K in keyof T & keyof U]?: PropertyUpdatedDiffItem<T, U, K>
    },
    // 属性添加（U 中有但 T 中没有的属性）
    added?: {
        [K in Exclude<keyof U, keyof T>]?: PropertyAddedDiffItem<U, K>
    },
    // 属性删除（T 中有但 U 中没有的属性）
    deleted?: {
        [K in Exclude<keyof T, keyof U>]?: PropertyDeletedDiffItem<T, K>
    }
}

type PropertyAddedDiffItem<T extends Record<string, unknown>, K extends keyof T = keyof T> = {
    propertyName: K,
    value: T[K]
}

type PropertyDeletedDiffItem<T extends Record<string, unknown>, K extends keyof T = keyof T> = {
    propertyName: K,
    value: T[K]
}

type PropertyUpdatedDiffItem<
    T extends Record<string, unknown>,
    U extends Record<string, unknown> = T,
    K extends (keyof T & keyof U) = (keyof T & keyof U)
> = {
    propertyName: K,
    prevValue: T[K],
    nextValue: U[K],
    diff?: (T[K] & U[K]) extends Array<infer Item> | ReadonlyArray<infer Item>
        ? ArrayDiff<Item>
        : (T[K] & U[K]) extends Record<string, unknown>
            ? ObjectDiff<T[K], U[K]> | CircularReferenceDiff
            : never
}

type ArrayAddedDiffItem<T> = {
    data: T,
    nextIndex: number,
}

type ArrayUpdatedDiffItem<T> = {
    prevData: T,
    prevIndex: number,
    nextData: T,
    nextIndex: number,
    diff: T extends Array<infer Item> | ReadonlyArray<infer Item>
        ? ArrayDiff<Item>
        : T extends Record<string, unknown>
            ? ObjectDiff<T> | CircularReferenceDiff
            : never
}

type ArrayDeletedDiffItem<T> = {
    data: T,
    prevIndex: number,
}

type ArrayMovedDiffItem<T> = {
    data: T,
    prevIndex: number,
    nextIndex: number,
}

type ArrayEqualsDiffItem<T> = {
    data: T,
    index: number,
}

type ArrayDiff<T> = {
    type: "array"
    added: ArrayAddedDiffItem<T>[],
    updated: ArrayUpdatedDiffItem<T>[],
    deleted: ArrayDeletedDiffItem<T>[],
    moved: ArrayMovedDiffItem<T>[],
    equals: ArrayEqualsDiffItem<T>[],
}