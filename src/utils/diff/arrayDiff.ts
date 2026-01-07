import {objectDiff} from "@/utils/diff/objectDiff.ts";
import {deepEquals} from "@/utils/diff/deepEquals.ts";

export const arrayDiff = <T extends Record<string, unknown>>(
    prevList: ReadonlyArray<T> | undefined | null,
    nextList: ReadonlyArray<T> | undefined | null,
    matchFnList: ((a: T, b: T) => boolean)[],
    deepMatchFnList: ((a: any, b: any) => boolean)[] = [deepEquals],
    visitedOld: WeakSet<object> = new WeakSet<object>(),
    visitedNew: WeakSet<object> = new WeakSet<object>(),
): ArrayDiff<T> => {
    const result: ArrayDiff<T> = {
        type: "array",
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

    const prevWithIndexSet = new Set(prevList.map((item, index) => ({item, index})))
    const nextWithIndexSet = new Set(nextList.map((item, index) => ({item, index})))

    for (const fn of matchFnList) {
        for (const prev of prevWithIndexSet) {
            const {item: prevItem, index: prevIndex} = prev

            let matchedNext: {item: T, index: number} | undefined = undefined
            for (const next of nextWithIndexSet) {
                if (fn(prevItem, next.item)) matchedNext = next
            }
            if (matchedNext !== undefined) {
                const {item: nextItem, index: nextIndex} = matchedNext

                if (deepEquals(prevItem, nextItem)) {
                    if (prevIndex === nextIndex) {
                        result.equals.push({
                            data: nextItem,
                            index: nextIndex
                        })
                    } else {
                        result.moved.push({
                            data: nextItem,
                            prevIndex: prevIndex,
                            nextIndex: nextIndex
                        })
                    }
                } else {
                    const diffResult = Array.isArray(prevItem) && Array.isArray(nextItem) ?
                        arrayDiff(prevItem, nextItem, deepMatchFnList, deepMatchFnList, visitedOld, visitedNew) :
                        typeof prevItem === "object" && typeof nextItem === "object" ?
                            objectDiff(prevItem, nextItem, deepMatchFnList, visitedOld, visitedNew) :
                            undefined
                    result.updated.push({
                        prevData: prevItem,
                        prevIndex: prevIndex,
                        nextData: nextItem,
                        nextIndex: nextIndex,
                        diff: diffResult as any
                    })
                }

                prevWithIndexSet.delete(prev)
                nextWithIndexSet.delete(matchedNext)
            }
        }
    }

    prevWithIndexSet.forEach(({item, index}) => {
        result.deleted.push({data: item, prevIndex: index})
    })
    nextWithIndexSet.forEach(({item, index}) => {
        result.added.push({data: item, nextIndex: index})
    })

    return result
}
