import {getPropertyView} from "@/modelEditor/utils/PropertyView.ts";

export const oneToOneIdOnlyToAssociation = (
    idOnly: OneToOneAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithInheritInfo>,
): OneToOneAssociation => {
    const sourceEntity = entityMap.get(idOnly.sourceEntityId)
    if (!sourceEntity) throw new Error(`[${idOnly.sourceEntityId}] not found`)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)
    if (!referencedEntity) throw new Error(`[${idOnly.referencedEntityId}] not found`)
    const sourceProperty = sourceEntity.allProperties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`[${idOnly.sourcePropertyId}] not found`)
    if (sourceProperty.category !== 'OneToOne_Source') throw new Error(`[${getPropertyView(sourceProperty)}] is not a OneToOne_Source`)

    return {
        id: idOnly.id,
        name: idOnly.name,
        comment: idOnly.comment,
        type: idOnly.type,
        sourceEntity,
        referencedEntity,
        sourceProperty,
        withMappedProperty: idOnly.withMappedProperty,
        mappedProperty: idOnly.mappedProperty,
        foreignKeyType: idOnly.foreignKeyType,
    }
}

export const manyToOneIdOnlyToAssociation = (
    idOnly: ManyToOneAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithInheritInfo>,
): ManyToOneAssociation => {
    const sourceEntity = entityMap.get(idOnly.sourceEntityId)
    if (!sourceEntity) throw new Error(`[${idOnly.sourceEntityId}] not found`)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)
    if (!referencedEntity) throw new Error(`[${idOnly.referencedEntityId}] not found`)
    const sourceProperty = sourceEntity.allProperties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`[${idOnly.sourcePropertyId}] not found`)
    if (sourceProperty.category !== 'ManyToOne') throw new Error(`[${getPropertyView(sourceProperty)}] is not a ManyToOne`)

    return {
        id: idOnly.id,
        name: idOnly.name,
        comment: idOnly.comment,
        type: idOnly.type,
        sourceEntity,
        referencedEntity,
        sourceProperty,
        withMappedProperty: idOnly.withMappedProperty,
        mappedProperty: idOnly.mappedProperty,
        foreignKeyType: idOnly.foreignKeyType,
    }
}

export const manyToManyIdOnlyToAssociation = (
    idOnly: ManyToManyAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithInheritInfo>,
): ManyToManyAssociation => {
    const sourceEntity = entityMap.get(idOnly.sourceEntityId)
    if (!sourceEntity) throw new Error(`[${idOnly.sourceEntityId}] not found`)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)
    if (!referencedEntity) throw new Error(`[${idOnly.referencedEntityId}] not found`)
    const sourceProperty = sourceEntity.allProperties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`[${idOnly.sourcePropertyId}] not found`)
    if (sourceProperty.category !== 'ManyToMany_Source') throw new Error(`[${getPropertyView(sourceProperty)}] is not a ManyToMany_Source`)

    return {
        id: idOnly.id,
        name: idOnly.name,
        comment: idOnly.comment,
        type: idOnly.type,
        sourceEntity,
        referencedEntity,
        sourceProperty,
        withMappedProperty: idOnly.withMappedProperty,
        mappedProperty: idOnly.mappedProperty,
        foreignKeyType: idOnly.foreignKeyType,
    }
}

export const abstractOneToOneIdOnlyToAssociation = (
    idOnly: OneToOneAbstractAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithInheritInfo>,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithInheritInfo>,
): OneToOneAbstractAssociation => {
    const sourceAbstractEntity = mappedSuperClassMap.get(idOnly.sourceAbstractEntityId)
    if (!sourceAbstractEntity) throw new Error(`[${idOnly.sourceAbstractEntityId}] not found`)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)
    if (!referencedEntity) throw new Error(`[${idOnly.referencedEntityId}] not found`)
    const sourceProperty = sourceAbstractEntity.allProperties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`[${idOnly.sourcePropertyId}] not found`)
    if (sourceProperty.category !== 'OneToOne_Source') throw new Error(`[${getPropertyView(sourceProperty)}] is not a OneToOne_Source`)

    return {
        id: idOnly.id,
        nameTemplate: idOnly.nameTemplate,
        commentTemplate: idOnly.commentTemplate,
        type: idOnly.type,
        sourceAbstractEntity,
        referencedEntity,
        sourceProperty,
        withMappedProperty: idOnly.withMappedProperty,
        mappedProperty: idOnly.mappedProperty,
        foreignKeyType: idOnly.foreignKeyType,
    }
}

export const abstractManyToOneIdOnlyToAssociation = (
    idOnly: ManyToOneAbstractAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithInheritInfo>,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithInheritInfo>,
): ManyToOneAbstractAssociation => {
    const sourceAbstractEntity = mappedSuperClassMap.get(idOnly.sourceAbstractEntityId)
    if (!sourceAbstractEntity) throw new Error(`[${idOnly.sourceAbstractEntityId}] not found`)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)
    if (!referencedEntity) throw new Error(`[${idOnly.referencedEntityId}] not found`)
    const sourceProperty = sourceAbstractEntity.allProperties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`[${idOnly.sourcePropertyId}] not found`)
    if (sourceProperty.category !== 'ManyToOne') throw new Error(`[${getPropertyView(sourceProperty)}] is not a ManyToOne`)

    return {
        id: idOnly.id,
        nameTemplate: idOnly.nameTemplate,
        commentTemplate: idOnly.commentTemplate,
        type: idOnly.type,
        sourceAbstractEntity,
        referencedEntity,
        sourceProperty,
        withMappedProperty: idOnly.withMappedProperty,
        mappedProperty: idOnly.mappedProperty,
        foreignKeyType: idOnly.foreignKeyType,
    }
}

export const abstractManyToManyIdOnlyToAssociation = (
    idOnly: ManyToManyAbstractAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithInheritInfo>,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithInheritInfo>,
): ManyToManyAbstractAssociation => {
    const sourceAbstractEntity = mappedSuperClassMap.get(idOnly.sourceAbstractEntityId)
    if (!sourceAbstractEntity) throw new Error(`[${idOnly.sourceAbstractEntityId}] not found`)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)
    if (!referencedEntity) throw new Error(`[${idOnly.referencedEntityId}] not found`)
    const sourceProperty = sourceAbstractEntity.allProperties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`[${idOnly.sourcePropertyId}] not found`)
    if (sourceProperty.category !== 'ManyToMany_Source') throw new Error(`[${getPropertyView(sourceProperty)}] is not a ManyToMany_Source`)
    return {
        id: idOnly.id,
        nameTemplate: idOnly.nameTemplate,
        commentTemplate: idOnly.commentTemplate,
        type: idOnly.type,
        sourceAbstractEntity,
        referencedEntity,
        sourceProperty,
        withMappedProperty: idOnly.withMappedProperty,
        mappedProperty: idOnly.mappedProperty,
        foreignKeyType: idOnly.foreignKeyType,
    }
}

export const idOnlyToAssociation = (
    idOnly: AssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithInheritInfo>,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithInheritInfo>,
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
        case "ManyToMany_Abstract":
            return abstractManyToManyIdOnlyToAssociation(idOnly, entityMap, mappedSuperClassMap)
    }
}