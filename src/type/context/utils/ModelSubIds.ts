import {getKeys} from "@/utils/type/typeGuard.ts";

export const defaultModelSubIds: () => ModelSubIds = () => ({
    groupIds: [],
    entityIds: [],
    mappedSuperClassIds: [],
    embeddableTypeIds: [],
    enumerationIds: [],
    associationIds: [],
})

/**
 * 合并任意多个 ModelSubIds 对象
 * @param subIds - 需要合并的 ModelSubIds 对象数组
 * @returns 合并后的 ModelSubIds 对象
 */
export const mergeModelSubIds = (...subIds: ModelSubIds[]): ModelSubIds => {
    const result: ModelSubIds = defaultModelSubIds()

    // 遍历每个字段名
    for (const fieldName of getKeys(result)) {
        const uniqueSet = new Set<string>()

        // 遍历所有传入的对象
        for (const subId of subIds) {
            if (subId[fieldName] && subId[fieldName].length > 0) {
                for (const id of subId[fieldName]) {
                    if (!uniqueSet.has(id)) {
                        uniqueSet.add(id)
                    }
                }
            }
        }

        // 只有当数组不为空时才添加到结果中
        if (uniqueSet.size > 0) {
            result[fieldName] = Array.from(uniqueSet)
        }
    }

    return result
}
