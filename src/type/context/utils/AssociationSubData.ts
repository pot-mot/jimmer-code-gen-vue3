export const getAssociationSubData = (
    association: Association,
    entityMap: ReadonlyMap<string, EntityWithCategorizedProperties>,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithCategorizedProperties>,
): AssociationSubData => {
    const sourceEntity =
        entityMap.get(association.sourceEntityId) ??
        mappedSuperClassMap.get(association.sourceEntityId)
    if (!sourceEntity) {
        throw new Error(`Association ${association.name}(${association.id}) sourceEntity ${association.sourceEntityId} not found`)
    }
    const targetEntity =
        entityMap.get(association.targetEntityId) ??
        mappedSuperClassMap.get(association.targetEntityId)
    if (!targetEntity) {
        throw new Error(`Association ${association.name}(${association.id}) targetEntity ${association.targetEntityId} not found`)
    }

    const sourceProperty = sourceEntity.associationPropertyMap.get(association.sourcePropertyId)
    if (!sourceProperty) {
        throw new Error(`Association ${association.name}(${association.id}) sourceProperty ${association.sourcePropertyId} not found`)
    }
    const targetProperty = targetEntity.associationPropertyMap.get(association.targetPropertyId)
    if (!targetProperty) {
        throw new Error(`Association ${association.name}(${association.id}) targetProperty ${association.targetPropertyId} not found`)
    }

    return {
        sourceEntity,
        targetEntity,
        sourceProperty,
        targetProperty,
    }
}