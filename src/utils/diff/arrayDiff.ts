import {objectDiff} from "@/utils/diff/objectDiff.ts";
import {deepEquals} from "@/utils/diff/deepEquals.ts";
import {commonDiffKey} from "@/utils/diff/commonDiffKey.ts";

export const arrayDiff = <T extends Record<string, unknown>>(
    prevList: ReadonlyArray<T> | undefined | null,
    nextList: ReadonlyArray<T> | undefined | null,
    keyFn: (item: T) => string | number,
    deepKeyFn: (item: any) => string | number = commonDiffKey,
    visitedOld: WeakSet<object> = new WeakSet<object>(),
    visitedNew: WeakSet<object> = new WeakSet<object>(),
): ArrayDiff<T> => {
    const result: ArrayDiff<T> = {
        added: [],
        updated: [],
        deleted: [],
        moved: [],
        equals: [],
    }

    // 如果两个列表都为空，直接返回空结果
    if (!prevList && !nextList) {
        return result
    }

    if (!prevList) {
        // 如果前一个列表为空，所有项目都是新增的
        nextList?.forEach((item, index) => {
            result.added.push({data: item, nextIndex: index})
        })
        return result
    }

    if (!nextList) {
        // 如果后一个列表为空，所有项目都是删除的
        prevList?.forEach((item, index) => {
            result.deleted.push({data: item, prevIndex: index})
        })
        return result
    }

    const prevKeyMap = new Map(prevList.map((item, index) => [keyFn(item), {item, index}]))
    const nextKeyMap = new Map(nextList.map((item, index) => [keyFn(item), {item, index}]))

    for (const [key, nextItemData] of nextKeyMap) {
        const prevItemData = prevKeyMap.get(key)

        if (prevItemData) {
            if (deepEquals(prevItemData.item, nextItemData.item)) {
                if (prevItemData.index === nextItemData.index) {
                    result.equals.push({
                        data: nextItemData.item,
                        index: nextItemData.index
                    })
                } else {
                    result.moved.push({
                        data: nextItemData.item,
                        prevIndex: prevItemData.index,
                        nextIndex: nextItemData.index
                    })
                }
            } else {
                const diffResult = Array.isArray(prevItemData.item) && Array.isArray(nextItemData.item) ?
                    arrayDiff(prevItemData.item, nextItemData.item, deepKeyFn, deepKeyFn, visitedOld, visitedNew) :
                    typeof prevItemData.item === "object" && typeof nextItemData.item === "object" ?
                        objectDiff(prevItemData.item, nextItemData.item, deepKeyFn, visitedOld, visitedNew) :
                        undefined
                result.updated.push({
                    prevData: prevItemData.item,
                    prevIndex: prevItemData.index,
                    nextData: nextItemData.item,
                    nextIndex: nextItemData.index,
                    diff: diffResult as any
                })
            }
        } else {
            result.added.push({
                data: nextItemData.item,
                nextIndex: nextItemData.index
            })
        }
    }

    for (const [key, prevItemData] of prevKeyMap) {
        if (!nextKeyMap.has(key)) {
            // 键不存在于新列表中，表示删除
            result.deleted.push({
                data: prevItemData.item,
                prevIndex: prevItemData.index
            })
        }
    }

    return result
}
