import {DeepReadonly} from "vue"
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts"

/**
 * 在确保不变动传入参数的前提下，返回根据 key 和 jsonStr 合并后的结果
 * 在 key 相同的情况下，如果 jsonStr 相同，则不重复添加，否则调用 duplicateHandler 处理
 */
export const mergeWithExisted = <T extends object, K extends string | number | symbol>(
    waitMergeItems: DeepReadonly<T[]>,
    existedItems: DeepReadonly<T[]>,
    keySelector: (item: T) => K,
    duplicateHandler: (key: K, item: T, keyDuplicateItems: T[], newItems: T[], existedItems: T[]) => void =
        (_, item, keyDuplicateItems) => {
            keyDuplicateItems.push(item)
        },
): {
    allItems: T[]
    newItems: T[]
    keyToItemsMap: Map<K, T[]>
} => {
    const keyToItemsMap = new Map<K, T[]>()
    const allItems: T[] = []
    const newItems: T[] = []

    // 初始化现有项
    for (const item of cloneDeepReadonly<T[]>(existedItems)) {
        const key = keySelector(item)
        const keyDuplicateItems = keyToItemsMap.get(key)
        if (keyDuplicateItems === undefined) {
            keyToItemsMap.set(key, [item])
            allItems.push(item)
        } else {
            duplicateHandler(key, item, keyDuplicateItems, newItems, [...keyToItemsMap.values()].flat())
        }
    }

    // 处理新增项
    for (const item of cloneDeepReadonly<T[]>(waitMergeItems)) {
        const key = keySelector(item)
        const keyDuplicateItems = keyToItemsMap.get(key)
        if (keyDuplicateItems === undefined) {
            keyToItemsMap.set(key, [item])
            allItems.push(item)
            newItems.push(item)
        } else {
            duplicateHandler(key, item, keyDuplicateItems, newItems, [...keyToItemsMap.values()].flat())
        }
    }

    return {
        allItems,
        newItems,
        keyToItemsMap,
    }
}
