export type PropertyAssociationChangeInfo = {
    needRemoveIds: string[],
    needCheckExistIds: string[],
}

export const getPropertiesAssociationChange = (
    oldProperties: DeepReadonly<Property[]>,
    newProperties: DeepReadonly<Property[]>,
    isAssociationExisted: (id: string) => boolean,
): PropertyAssociationChangeInfo => {
    const result: PropertyAssociationChangeInfo = {
        needRemoveIds: [],
        needCheckExistIds: [],
    }

    const oldAssociationIdSet = new Set<string>()
    for (const property of oldProperties) {
        if ("associationId" in property) {
            oldAssociationIdSet.add(property.associationId)
        }
    }
    const newAssociationIdSet = new Set<string>()
    for (const property of newProperties) {
        if ("associationId" in property) {
            newAssociationIdSet.add(property.associationId)
        }
    }

    for (const oldAssociationId of oldAssociationIdSet) {
        if (!newAssociationIdSet.has(oldAssociationId) && isAssociationExisted(oldAssociationId)) {
            result.needRemoveIds.push(oldAssociationId)
        }
    }
    for (const newAssociationId of newAssociationIdSet) {
        if (!oldAssociationIdSet.has(newAssociationId) && !isAssociationExisted(newAssociationId)) {
            result.needCheckExistIds.push(newAssociationId)
        }
    }

    return result
}
