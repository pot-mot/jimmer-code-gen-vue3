export default Object.freeze({
    fileName: 'PropertyDeletedDiffItem.d.ts',
    content: `type PropertyDeletedDiffItem<T extends Record<string, unknown>, K extends keyof T = keyof T> = {
    propertyName: K,
    value: T[K]
}`,
})
