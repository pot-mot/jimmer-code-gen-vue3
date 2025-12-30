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

export const contextDataToSubIds = (
    contextData: Partial<DeepReadonly<ModelContextData>>
): ModelSubIds => {
    const result = defaultModelSubIds()

    if (contextData.groupMap !== undefined) {
        for (const id of contextData.groupMap.keys()) {
            result.groupIds.push(id)
        }
    }
    if (contextData.entityMap !== undefined) {
        for (const id of contextData.entityMap.keys()) {
            result.entityIds.push(id)
        }
    }
    if (contextData.mappedSuperClassMap !== undefined) {
        for (const id of contextData.mappedSuperClassMap.keys()) {
            result.mappedSuperClassIds.push(id)
        }
    }
    if (contextData.embeddableTypeMap !== undefined) {
        for (const id of contextData.embeddableTypeMap.keys()) {
            result.embeddableTypeIds.push(id)
        }
    }
    if (contextData.enumerationMap !== undefined) {
        for (const id of contextData.enumerationMap.keys()) {
            result.enumerationIds.push(id)
        }
    }
    if (contextData.associationMap !== undefined) {
        for (const id of contextData.associationMap.keys()) {
            result.associationIds.push(id)
        }
    }

    return result
}

export const subDataToSubIds = (
    subData: Partial<DeepReadonly<ModelGraphSubData>>
): ModelSubIds => {
    const result = defaultModelSubIds()

    if (subData.groups !== undefined) {
        for (const group of subData.groups) {
            result.groupIds.push(group.id)
        }
    }
    if (subData.entities !== undefined) {
        for (const entity of subData.entities) {
            result.entityIds.push(entity.data.id)
        }
    }
    if (subData.mappedSuperClasses !== undefined) {
        for (const mappedSuperClass of subData.mappedSuperClasses) {
            result.mappedSuperClassIds.push(mappedSuperClass.data.id)
        }
    }
    if (subData.embeddableTypes !== undefined) {
        for (const embeddableType of subData.embeddableTypes) {
            result.embeddableTypeIds.push(embeddableType.data.id)
        }
    }
    if (subData.enumerations !== undefined) {
        for (const enumeration of subData.enumerations) {
            result.enumerationIds.push(enumeration.data.id)
        }
    }
    if (subData.associations !== undefined) {
        for (const association of subData.associations) {
            result.associationIds.push(association.data.id)
        }
    }

    return result
}

export const subIdSetToSubIds = (
    subIdSets: Partial<DeepReadonly<ModelSubIdSets>>
): ModelSubIds => {
    const result = defaultModelSubIds()

    if (subIdSets.groupIdSet !== undefined) {
        for (const id of subIdSets.groupIdSet) {
            result.groupIds.push(id)
        }
    }
    if (subIdSets.entityIdSet !== undefined) {
        for (const id of subIdSets.entityIdSet) {
            result.entityIds.push(id)
        }
    }
    if (subIdSets.mappedSuperClassIdSet !== undefined) {
        for (const id of subIdSets.mappedSuperClassIdSet) {
            result.mappedSuperClassIds.push(id)
        }
    }
    if (subIdSets.embeddableTypeIdSet !== undefined) {
        for (const id of subIdSets.embeddableTypeIdSet) {
            result.embeddableTypeIds.push(id)
        }
    }
    if (subIdSets.enumerationIdSet !== undefined) {
        for (const id of subIdSets.enumerationIdSet) {
            result.enumerationIds.push(id)
        }
    }
    if (subIdSets.associationIdSet !== undefined) {
        for (const id of subIdSets.associationIdSet) {
            result.associationIds.push(id)
        }
    }

    return result
}

export const defaultModelSubIdSets: () => ModelSubIdSets = () => ({
    groupIdSet: new Set(),
    entityIdSet: new Set(),
    mappedSuperClassIdSet: new Set(),
    embeddableTypeIdSet: new Set(),
    enumerationIdSet: new Set(),
    associationIdSet: new Set(),
})

export const subDataToSubIdSets = (
    subData: Partial<DeepReadonly<ModelGraphSubData>>
): ModelSubIdSets => {
    const result = defaultModelSubIdSets()

    if (subData.groups !== undefined) {
        for (const group of subData.groups) {
            result.groupIdSet.add(group.id)
        }
    }
    if (subData.entities !== undefined) {
        for (const entity of subData.entities) {
            result.entityIdSet.add(entity.data.id)
        }
    }
    if (subData.mappedSuperClasses !== undefined) {
        for (const mappedSuperClass of subData.mappedSuperClasses) {
            result.mappedSuperClassIdSet.add(mappedSuperClass.data.id)
        }
    }
    if (subData.embeddableTypes !== undefined) {
        for (const embeddableType of subData.embeddableTypes) {
            result.embeddableTypeIdSet.add(embeddableType.data.id)
        }
    }
    if (subData.enumerations !== undefined) {
        for (const enumeration of subData.enumerations) {
            result.enumerationIdSet.add(enumeration.data.id)
        }
    }
    if (subData.associations !== undefined) {
        for (const association of subData.associations) {
            result.associationIdSet.add(association.data.id)
        }
    }

    return result
}

export const subIdsToSubIdSets = (
    subIds: Partial<DeepReadonly<ModelSubIds>>
): ModelSubIdSets => {
    const result = defaultModelSubIdSets()

    if (subIds.groupIds !== undefined) {
        for (const id of subIds.groupIds) result.groupIdSet.add(id)
    }
    if (subIds.entityIds !== undefined) {
        for (const id of subIds.entityIds) result.entityIdSet.add(id)
    }
    if (subIds.mappedSuperClassIds !== undefined) {
        for (const id of subIds.mappedSuperClassIds) result.mappedSuperClassIdSet.add(id)
    }
    if (subIds.embeddableTypeIds !== undefined) {
        for (const id of subIds.embeddableTypeIds) result.embeddableTypeIdSet.add(id)
    }
    if (subIds.enumerationIds !== undefined) {
        for (const id of subIds.enumerationIds) result.enumerationIdSet.add(id)
    }
    if (subIds.associationIds !== undefined) {
        for (const id of subIds.associationIds) result.associationIdSet.add(id)
    }

    return result
}
