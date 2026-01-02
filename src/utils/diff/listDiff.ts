import {getObjectDiff, type ObjectDiffOptions} from "@donedeal0/superdiff";
import type {AddedItem, DeletedItem, EqualsItem, MovedItem, UpdatedItem} from "@/utils/diff/DiffItem.ts";

export const listDiff = <T extends Record<string, unknown>>(
    prevList: ReadonlyArray<T> | undefined | null,
    nextList: ReadonlyArray<T> | undefined | null,
    keyFn: (item: T) => string | number,
    options: ObjectDiffOptions = {
        ignoreArrayOrder: false,
        showOnly: {
            statuses: ['added', 'deleted', 'updated'],
            granularity: 'deep'
        }
    },
): {
    added: AddedItem<T>[],
    updated: UpdatedItem<T>[],
    deleted: DeletedItem<T>[],
    moved: MovedItem<T>[],
    equals: EqualsItem<T>[],
} => {
    const added: AddedItem<T>[] = []
    const updated: UpdatedItem<T>[] = []
    const deleted: DeletedItem<T>[] = []
    const moved: MovedItem<T>[] = []
    const equals: EqualsItem<T>[] = []

    // 如果两个列表都为空，直接返回空结果
    if (!prevList && !nextList) {
        return {added, updated, deleted, moved, equals}
    }

    if (!prevList) {
        // 如果前一个列表为空，所有项目都是新增的
        nextList?.forEach((item, index) => {
            added.push({data: item, nextIndex: index})
        })
        return {added, updated, deleted, moved, equals}
    }

    if (!nextList) {
        // 如果后一个列表为空，所有项目都是删除的
        prevList?.forEach((item, index) => {
            deleted.push({data: item, prevIndex: index})
        })
        return {added, updated, deleted, moved, equals}
    }

    const prevKeyMap = new Map(prevList.map((item, index) => [keyFn(item), {item, index}]))
    const nextKeyMap = new Map(nextList.map((item, index) => [keyFn(item), {item, index}]))

    for (const [key, nextItemData] of nextKeyMap) {
        const prevItemData = prevKeyMap.get(key)

        if (prevItemData) {
            // 键存在，检查内容是否有变化
            const diff = getObjectDiff(prevItemData.item, nextItemData.item, options)
            if (diff.status !== 'equal') {
                updated.push({
                    prevData: prevItemData.item,
                    prevIndex: prevItemData.index,
                    nextData: nextItemData.item,
                    nextIndex: nextItemData.index,
                    diff
                })
            } else if (prevItemData.index !== nextItemData.index) {
                moved.push({
                    data: nextItemData.item,
                    prevIndex: prevItemData.index,
                    nextIndex: nextItemData.index
                })
            } else {
                equals.push({
                    data: nextItemData.item,
                    index: nextItemData.index
                })
            }
        } else {
            added.push({
                data: nextItemData.item,
                nextIndex: nextItemData.index
            })
        }
    }

    for (const [key, prevItemData] of prevKeyMap) {
        if (!nextKeyMap.has(key)) {
            // 键不存在于新列表中，表示删除
            deleted.push({
                data: prevItemData.item,
                prevIndex: prevItemData.index
            })
        }
    }

    return {added, updated, deleted, moved, equals}
}
