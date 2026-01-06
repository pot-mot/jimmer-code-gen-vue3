export default Object.freeze({
    fileName: 'ObjectDiff.d.ts',
    content: `type ObjectDiff<T extends Record<string, unknown>> = PropertyDiffItem<T[K], keyof T[K]>[]`,
})
