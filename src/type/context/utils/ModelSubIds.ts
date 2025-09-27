import {getKeys} from "@/utils/type/typeGuard.ts";

export const defaultModelSubIds: () => ModelSubIds = () => ({
    groupIds: [],
    entityIds: [],
    mappedSuperClassIds: [],
    embeddableTypeIds: [],
    enumerationIds: [],
    associationIds: [],
})

export const fillModelSubIds = (ids: DeepReadonly<Partial<ModelSubIds>>): ModelSubIds => {
    const result = defaultModelSubIds()
    for (const id of ids.groupIds ?? []) result.groupIds.push(id)
    for (const id of ids.entityIds ?? []) result.entityIds.push(id)
    for (const id of ids.mappedSuperClassIds ?? []) result.mappedSuperClassIds.push(id)
    for (const id of ids.embeddableTypeIds ?? []) result.embeddableTypeIds.push(id)
    for (const id of ids.enumerationIds ?? []) result.enumerationIds.push(id)
    for (const id of ids.associationIds ?? []) result.associationIds.push(id)
    return result
}

export const subDataToSubIds = (
    subData: DeepReadonly<ModelGraphSubData>
): ModelSubIds => {
    const result = defaultModelSubIds()

    for (const group of subData.groups) {
        result.groupIds.push(group.id)
    }
    for (const {data} of subData.entities) {
        result.entityIds.push(data.id)
    }
    for (const {data} of subData.mappedSuperClasses) {
        result.mappedSuperClassIds.push(data.id)
    }
    for (const {data} of subData.embeddableTypes) {
        result.embeddableTypeIds.push(data.id)
    }
    for (const {data} of subData.enumerations) {
        result.enumerationIds.push(data.id)
    }
    for (const association of subData.associations) {
        result.associationIds.push(association.id)
    }

    return result
}

export const subIdSetToSubIds = (
    subIdSets: DeepReadonly<ModelSubIdSets>
): ModelSubIds => {
    const result = defaultModelSubIds()

    for (const id of subIdSets.groupIdSet) {
        result.groupIds.push(id)
    }
    for (const id of subIdSets.entityIdSet) {
        result.entityIds.push(id)
    }
    for (const id of subIdSets.mappedSuperClassIdSet) {
        result.mappedSuperClassIds.push(id)
    }
    for (const id of subIdSets.embeddableTypeIdSet) {
        result.embeddableTypeIds.push(id)
    }
    for (const id of subIdSets.enumerationIdSet) {
        result.enumerationIds.push(id)
    }
    for (const id of subIdSets.associationIdSet) {
        result.associationIds.push(id)
    }

    return result
}

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
