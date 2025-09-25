export const getAssociationWithInheritInfo = (
    association: Association,
    entityMap: ReadonlyMap<string, EntityWithCategorizedProperties>,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithCategorizedProperties>,
): AssociationWithInheritInfo => {
    const referencedEntity = entityMap.get(association.referencedEntity.id)
    if (!referencedEntity) {
        throw new Error(`Association ${association.name}(${association.id}) referencedEntity ${association.referencedEntity.id} not found`)
    }
    
    if ("sourceEntity" in association) {
        const sourceEntity = entityMap.get(association.sourceEntity.id)
        if (!sourceEntity) {
            throw new Error(`Association ${association.name}(${association.id}) sourceEntity ${association.sourceEntity.id} not found`)
        }
        return {
            ...association,
            referencedEntity,
            sourceEntity,
        }
    } else {
        const sourceAbstractEntity = mappedSuperClassMap.get(association.sourceAbstractEntity.id)
        if (!sourceAbstractEntity) {
            throw new Error(`Association ${association.name}(${association.id}) sourceAbstractEntity ${association.sourceAbstractEntity.id} not found`)
        }
        return {
            ...association,
            referencedEntity,
            sourceAbstractEntity,
        }
    }
}