import {deepEquals} from "@/utils/diff/deepEquals.ts";
import {arrayDiff} from "@/utils/diff/arrayDiff.ts";

export const objectDiff = <T extends Record<string, unknown>, U extends Record<string, unknown> = T>(
    oldVal: T | undefined | null,
    newVal: U | undefined | null,
    deepMatchFnList: ((a: any, b: any) => boolean)[] = [deepEquals],
    visitedOld: WeakSet<object> = new WeakSet<object>(),
    visitedNew: WeakSet<object> = new WeakSet<object>(),
): ObjectDiff<T, U> | CircularReferenceDiff => {
    // 如果两个值都为空，返回空对象
    if (
        (oldVal === undefined || oldVal === null || Object.keys(oldVal).length === 0) &&
        (newVal === undefined || newVal === null || Object.keys(newVal).length === 0)
    ) {
        return {type: "object"};
    }

    // 如果旧值为空，所有属性都是新增的
    if (oldVal === undefined || oldVal === null || typeof oldVal !== 'object') {
        const added: { [K in keyof U]?: PropertyAddedDiffItem<U, K> } = {};
        if (newVal !== undefined && newVal !== null && typeof newVal === 'object') {
            Object.keys(newVal).forEach(key => {
                const k = key as keyof U;
                added[k] = {
                    propertyName: k,
                    value: newVal[k]
                };
            });
        }
        return {type: "object", added}
    }

    // 如果新值为空，所有属性都是删除的
    if (newVal === undefined || newVal === null || typeof newVal !== 'object') {
        const deleted: { [K in keyof T]?: PropertyDeletedDiffItem<T, K> } = {};
        Object.keys(oldVal).forEach(key => {
            const k = key as keyof T;
            deleted[k] = {
                propertyName: k,
                value: oldVal[k]
            };
        });
        return {type: "object", deleted}
    }

    // 检查循环引用
    if (typeof oldVal === 'object') {
        if (visitedOld.has(oldVal)) {
            // 检测到旧值中的循环引用
            return {type: "circular reference"};
        }
        visitedOld.add(oldVal);
    }

    if (typeof newVal === 'object') {
        if (visitedNew.has(newVal)) {
            // 检测到新值中的循环引用
            return {type: "circular reference"};
        }
        visitedNew.add(newVal);
    }

    const result: ObjectDiff<T, U> = {type: "object"};

    // 检查属性删除
    const deleted: { [K in keyof T]?: PropertyDeletedDiffItem<T, K> } = {};
    for (const key in oldVal) {
        if (!(key in newVal)) {
            deleted[key] = {
                propertyName: key,
                value: oldVal[key]
            };
        }
    }
    if (Object.keys(deleted).length > 0) {
        result.deleted = deleted;
    }

    // 检查属性新增
    const added: { [K in keyof U]?: PropertyAddedDiffItem<U, K> } = {};
    for (const key in newVal) {
        if (!(key in oldVal)) {
            added[key] = {
                propertyName: key,
                value: newVal[key]
            };
        }
    }
    if (Object.keys(added).length > 0) {
        result.added = added;
    }

    // 检查属性更新
    const updated: { [K in keyof T & keyof U]?: PropertyUpdatedDiffItem<T, U, K> } = {};
    for (const key in oldVal) {
        if (key in newVal) {
            const oldKey = key as keyof T;
            const newKey = key as keyof U;

            if (!deepEquals(oldVal[oldKey], newVal[newKey])) {
                // 确定值的类型并创建适当的 diff
                const oldValue = oldVal[oldKey];
                const newValue = newVal[newKey];

                let diff: ObjectDiff<any> | ArrayDiff<any> | CircularReferenceDiff | undefined = undefined;

                // 检查是否为数组
                if (Array.isArray(oldValue) && Array.isArray(newValue)) {
                    diff = arrayDiff(oldValue, newValue, deepMatchFnList, deepMatchFnList);
                } else if (
                    typeof oldValue === 'object' && typeof newValue === 'object' &&
                    oldValue !== null && newValue !== null &&
                    oldValue !== undefined && newValue !== undefined
                ) {
                    // 传递已访问的 WeakMap 以处理嵌套对象的循环引用
                    diff = objectDiff(oldValue as Record<string, any>, newValue as Record<string, any>, deepMatchFnList, visitedOld, visitedNew);
                }

                updated[key] = {
                    propertyName: key,
                    prevValue: oldVal[oldKey],
                    nextValue: newVal[newKey],
                    diff: diff
                } as any
            }
        }
    }
    if (Object.keys(updated).length > 0) {
        result.updated = updated;
    }

    return result;
};
