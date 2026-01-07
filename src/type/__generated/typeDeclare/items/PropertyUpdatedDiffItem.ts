export default Object.freeze({
    fileName: 'PropertyUpdatedDiffItem.d.ts',
    content: `type PropertyUpdatedDiffItem<
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
}`,
})
