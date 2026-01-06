export default Object.freeze({
    fileName: 'PropertyDiffItem.d.ts',
    content: `type PropertyDiffItem<T, K extends keyof T = keyof T> = {
    propertyName: K,
    prevValue: T[K],
    nextValue: T[K],
    diff: T[K] extends Array<infer Item> | ReadonlyArray<infer Item>
        ? ArrayDiff<Item>
        : T[K] extends Record<string, unknown>
            ? ObjectDiff<T[K]>
            : never
}`,
})
