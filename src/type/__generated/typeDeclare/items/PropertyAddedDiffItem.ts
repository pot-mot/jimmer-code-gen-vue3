export default Object.freeze({
    fileName: 'PropertyAddedDiffItem.d.ts',
    content: `type PropertyAddedDiffItem<T extends Record<string, unknown>, K extends keyof T = keyof T> = {
    propertyName: K,
    value: T[K]
}`,
})
