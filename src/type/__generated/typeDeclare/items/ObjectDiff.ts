export default Object.freeze({
    fileName: 'ObjectDiff.d.ts',
    content: `type ObjectDiff<T extends Record<string, unknown>, U extends Record<string, unknown> = T> = {
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
}`,
})
