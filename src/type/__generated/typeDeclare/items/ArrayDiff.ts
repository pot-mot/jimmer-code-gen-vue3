export default Object.freeze({
    fileName: 'ArrayDiff.d.ts',
    content: `type ArrayDiff<T> = {
    added: ArrayAddedDiffItem<T>[],
    updated: ArrayUpdatedDiffItem<T>[],
    deleted: ArrayDeletedDiffItem<T>[],
    moved: ArrayMovedDiffItem<T>[],
    equals: ArrayEqualsDiffItem<T>[],
}`,
})
