export default Object.freeze({
    fileName: 'ArrayUpdatedDiffItem.d.ts',
    content: `type ArrayUpdatedDiffItem<T> = {
    prevData: T,
    prevIndex: number,
    nextData: T,
    nextIndex: number,
    diff: T extends Array<infer Item> | ReadonlyArray<infer Item>
        ? ArrayDiff<Item>
        : T extends Record<string, unknown>
            ? ObjectDiff<T>
            : never
}`,
})
