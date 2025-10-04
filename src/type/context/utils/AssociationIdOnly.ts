export const oneToOneToIdOnly = (
    association: OneToOneAssociation
): OneToOneAssociationIdOnly => {
    return {
        id: association.id,
        name: association.name,
        comment: association.comment,
        type: association.type,
        sourceEntityId: association.sourceEntity.id,
        referencedEntityId: association.referencedEntity.id,
        sourcePropertyId: association.sourceProperty.id,
        mappedProperty: association.mappedProperty,
        foreignKeyType: association.foreignKeyType,
    }
}

export const abstractOneToOneToIdOnly = (
    association: OneToOneAbstractAssociation
): OneToOneAbstractAssociationIdOnly => {
    return {
        id: association.id,
        name: association.name,
        comment: association.comment,
        type: association.type,
        sourceAbstractEntityId: association.sourceAbstractEntity.id,
        referencedEntityId: association.referencedEntity.id,
        sourcePropertyId: association.sourceProperty.id,
        mappedProperty: association.mappedProperty,
        foreignKeyType: association.foreignKeyType,
    }
}

export const manyToOneToIdOnly = (
    association: ManyToOneAssociation
): ManyToOneAssociationIdOnly => {
    return {
        id: association.id,
        name: association.name,
        comment: association.comment,
        type: association.type,
        sourceEntityId: association.sourceEntity.id,
        referencedEntityId: association.referencedEntity.id,
        sourcePropertyId: association.sourceProperty.id,
        mappedProperty: association.mappedProperty,
        foreignKeyType: association.foreignKeyType,
    }
}

export const abstractManyToOneToIdOnly = (
    association: ManyToOneAbstractAssociation
): ManyToOneAbstractAssociationIdOnly => {
    return {
        id: association.id,
        name: association.name,
        comment: association.comment,
        type: association.type,
        sourceAbstractEntityId: association.sourceAbstractEntity.id,
        referencedEntityId: association.referencedEntity.id,
        sourcePropertyId: association.sourceProperty.id,
        mappedProperty: association.mappedProperty,
        foreignKeyType: association.foreignKeyType,
    }
}

export const manyToManyToIdOnly = (
    association: ManyToManyAssociation
): ManyToManyAssociationIdOnly => {
    return {
        id: association.id,
        name: association.name,
        comment: association.comment,
        type: association.type,
        sourceEntityId: association.sourceEntity.id,
        referencedEntityId: association.referencedEntity.id,
        sourcePropertyId: association.sourceProperty.id,
        mappedProperty: association.mappedProperty,
        foreignKeyType: association.foreignKeyType,
    }
}

export const associationToIdOnly = (
    association: Association
): AssociationIdOnly => {
    switch (association.type) {
        case 'OneToOne':
            return oneToOneToIdOnly(association)
        case 'ManyToOne':
            return manyToOneToIdOnly(association)
        case 'ManyToMany':
            return manyToManyToIdOnly(association)
        case 'OneToOne_Abstract':
            return abstractOneToOneToIdOnly(association)
        case 'ManyToOne_Abstract':
            return abstractManyToOneToIdOnly(association)
    }
}

export const oneToOneIdOnlyToAssociation = (
    idOnly: OneToOneAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithProperties>,
): OneToOneAssociation => {
    const sourceEntity = entityMap.get(idOnly.sourceEntityId)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)

    if (!sourceEntity) throw new Error(`Source entity ${idOnly.sourceEntityId} not found`)
    if (!referencedEntity) throw new Error(`Referenced entity ${idOnly.referencedEntityId} not found`)
    const sourceProperty = sourceEntity.properties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`Source property ${idOnly.sourcePropertyId} not found`)
    if (sourceProperty.category !== 'OneToOne_Source') throw new Error(`Property [${sourceProperty.name}] is not a OneToOne_Source`)

    return {
        id: idOnly.id,
        name: idOnly.name,
        comment: idOnly.comment,
        type: idOnly.type,
        sourceEntity,
        referencedEntity,
        sourceProperty,
        mappedProperty: idOnly.mappedProperty,
        foreignKeyType: idOnly.foreignKeyType,
    }
}

export const manyToOneIdOnlyToAssociation = (
    idOnly: ManyToOneAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithProperties>,
): ManyToOneAssociation => {
    const sourceEntity = entityMap.get(idOnly.sourceEntityId)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)

    if (!sourceEntity) throw new Error(`Source entity ${idOnly.sourceEntityId} not found`)
    if (!referencedEntity) throw new Error(`Referenced entity ${idOnly.referencedEntityId} not found`)
    const sourceProperty = sourceEntity.properties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`Source property ${idOnly.sourcePropertyId} not found`)
    if (sourceProperty.category !== 'ManyToOne') throw new Error(`Property [${sourceProperty.name}] is not a ManyToOne`)

    return {
        id: idOnly.id,
        name: idOnly.name,
        comment: idOnly.comment,
        type: idOnly.type,
        sourceEntity,
        referencedEntity,
        sourceProperty,
        mappedProperty: idOnly.mappedProperty,
        foreignKeyType: idOnly.foreignKeyType,
    }
}

export const manyToManyIdOnlyToAssociation = (
    idOnly: ManyToManyAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithProperties>,
): ManyToManyAssociation => {
    const sourceEntity = entityMap.get(idOnly.sourceEntityId)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)

    if (!sourceEntity) throw new Error(`Source entity ${idOnly.sourceEntityId} not found`)
    if (!referencedEntity) throw new Error(`Referenced entity ${idOnly.referencedEntityId} not found`)
    const sourceProperty = sourceEntity.properties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`Source property ${idOnly.sourcePropertyId} not found`)
    if (sourceProperty.category !== 'ManyToMany_Source') throw new Error(`Property [${sourceProperty.name}] is not a ManyToMany_Source`)

    return {
        id: idOnly.id,
        name: idOnly.name,
        comment: idOnly.comment,
        type: idOnly.type,
        sourceEntity,
        referencedEntity,
        sourceProperty,
        mappedProperty: idOnly.mappedProperty,
        foreignKeyType: idOnly.foreignKeyType,
    }
}

export const abstractOneToOneIdOnlyToAssociation = (
    idOnly: OneToOneAbstractAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithProperties>,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithProperties>,
): OneToOneAbstractAssociation => {
    const sourceAbstractEntity = mappedSuperClassMap.get(idOnly.sourceAbstractEntityId)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)

    if (!sourceAbstractEntity) throw new Error(`Source abstract entity ${idOnly.sourceAbstractEntityId} not found`)
    if (!referencedEntity) throw new Error(`Referenced entity ${idOnly.referencedEntityId} not found`)
    const sourceProperty = sourceAbstractEntity.properties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`Source property ${idOnly.sourcePropertyId} not found`)
    if (sourceProperty.category !== 'OneToOne_Source') throw new Error(`Property [${sourceProperty.name}] is not a OneToOne_Source`)

    return {
        id: idOnly.id,
        name: idOnly.name,
        comment: idOnly.comment,
        type: idOnly.type,
        sourceAbstractEntity,
        referencedEntity,
        sourceProperty,
        mappedProperty: idOnly.mappedProperty,
        foreignKeyType: idOnly.foreignKeyType,
    }
}

export const abstractManyToOneIdOnlyToAssociation = (
    idOnly: ManyToOneAbstractAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithProperties>,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithProperties>,
): ManyToOneAbstractAssociation => {
    const sourceAbstractEntity = mappedSuperClassMap.get(idOnly.sourceAbstractEntityId)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)

    if (!sourceAbstractEntity) throw new Error(`Source abstract entity ${idOnly.sourceAbstractEntityId} not found`)
    if (!referencedEntity) throw new Error(`Referenced entity ${idOnly.referencedEntityId} not found`)
    const sourceProperty = sourceAbstractEntity.properties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`Source property ${idOnly.sourcePropertyId} not found`)
    if (sourceProperty.category !== 'ManyToOne') throw new Error(`Property [${sourceProperty.name}] is not a ManyToOne`)

    return {
        id: idOnly.id,
        name: idOnly.name,
        comment: idOnly.comment,
        type: idOnly.type,
        sourceAbstractEntity,
        referencedEntity,
        sourceProperty,
        mappedProperty: idOnly.mappedProperty,
        foreignKeyType: idOnly.foreignKeyType,
    }
}

export const idOnlyToAssociation = (
    idOnly: AssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithProperties>,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithProperties>,
): Association => {
    switch (idOnly.type) {
        case 'OneToOne':
            return oneToOneIdOnlyToAssociation(idOnly, entityMap)
        case 'ManyToOne':
            return manyToOneIdOnlyToAssociation(idOnly, entityMap)
        case 'ManyToMany':
            return manyToManyIdOnlyToAssociation(idOnly, entityMap)
        case 'OneToOne_Abstract':
            return abstractOneToOneIdOnlyToAssociation(idOnly, entityMap, mappedSuperClassMap)
        case 'ManyToOne_Abstract':
            return abstractManyToOneIdOnlyToAssociation(idOnly, entityMap, mappedSuperClassMap)
    }
}