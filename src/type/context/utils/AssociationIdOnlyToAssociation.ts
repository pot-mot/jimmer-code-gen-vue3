import {
    INHERIT_ENTITY,
    tmpl_fkComment,
    tmpl_fkName,
    tmpl_midTableComment,
    tmpl_midTableName
} from "@/type/context/utils/AssociationTemplate.ts";
import {getPropertyView} from "@/type/context/utils/PropertyView.ts";

export const oneToOneIdOnlyToAssociation = (
    idOnly: OneToOneAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithInheritInfo>,
): OneToOneAssociation => {
    const sourceEntity = entityMap.get(idOnly.sourceEntityId)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)

    if (!sourceEntity) throw new Error(`[${idOnly.sourceEntityId}] not found`)
    if (!referencedEntity) throw new Error(`[${idOnly.referencedEntityId}] not found`)
    const sourceProperty = sourceEntity.allProperties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`[${idOnly.sourcePropertyId}] not found`)
    if (sourceProperty.category !== 'OneToOne_Source') throw new Error(`[${getPropertyView(sourceProperty)}] is not a OneToOne_Source`)

    const association: OneToOneAssociation = {
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
    if (sourceProperty.joinInfo.type === "SingleColumn" || sourceProperty.joinInfo.type === "MultiColumn") {
        if (idOnly.useNameTemplate) association.name = tmpl_fkName(idOnly.nameTemplate, sourceEntity, sourceProperty)
        if (idOnly.useCommentTemplate) association.comment = tmpl_fkComment(idOnly.commentTemplate, sourceEntity, sourceProperty)
    } else {
        if (idOnly.useNameTemplate) association.name = tmpl_midTableName(idOnly.nameTemplate, sourceEntity, referencedEntity)
        if (idOnly.useCommentTemplate) association.comment = tmpl_midTableComment(idOnly.commentTemplate, sourceEntity, referencedEntity)
    }

    return association
}

export const manyToOneIdOnlyToAssociation = (
    idOnly: ManyToOneAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithInheritInfo>,
): ManyToOneAssociation => {
    const sourceEntity = entityMap.get(idOnly.sourceEntityId)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)

    if (!sourceEntity) throw new Error(`[${idOnly.sourceEntityId}] not found`)
    if (!referencedEntity) throw new Error(`[${idOnly.referencedEntityId}] not found`)
    const sourceProperty = sourceEntity.allProperties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`[${idOnly.sourcePropertyId}] not found`)
    if (sourceProperty.category !== 'ManyToOne') throw new Error(`[${getPropertyView(sourceProperty)}] is not a ManyToOne`)

    const association: ManyToOneAssociation = {
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
    if (sourceProperty.joinInfo.type === "SingleColumn" || sourceProperty.joinInfo.type === "MultiColumn") {
        if (idOnly.useNameTemplate) association.name = tmpl_fkName(idOnly.nameTemplate, sourceEntity, sourceProperty)
        if (idOnly.useCommentTemplate) association.comment = tmpl_fkComment(idOnly.commentTemplate, sourceEntity, sourceProperty)
    } else {
        if (idOnly.useNameTemplate) association.name = tmpl_midTableName(idOnly.nameTemplate, sourceEntity, referencedEntity)
        if (idOnly.useCommentTemplate) association.comment = tmpl_midTableComment(idOnly.commentTemplate, sourceEntity, referencedEntity)
    }

    return association
}

export const manyToManyIdOnlyToAssociation = (
    idOnly: ManyToManyAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithInheritInfo>,
): ManyToManyAssociation => {
    const sourceEntity = entityMap.get(idOnly.sourceEntityId)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)

    if (!sourceEntity) throw new Error(`[${idOnly.sourceEntityId}] not found`)
    if (!referencedEntity) throw new Error(`[${idOnly.referencedEntityId}] not found`)
    const sourceProperty = sourceEntity.allProperties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`[${idOnly.sourcePropertyId}] not found`)
    if (sourceProperty.category !== 'ManyToMany_Source') throw new Error(`[${getPropertyView(sourceProperty)}] is not a ManyToMany_Source`)

    const association: ManyToManyAssociation = {
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
    if (idOnly.useNameTemplate) association.name = tmpl_midTableName(idOnly.nameTemplate, sourceEntity, referencedEntity)
    if (idOnly.useCommentTemplate) association.comment = tmpl_midTableComment(idOnly.commentTemplate, sourceEntity, referencedEntity)

    return association
}

export const abstractOneToOneIdOnlyToAssociation = (
    idOnly: OneToOneAbstractAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithInheritInfo>,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithInheritInfo>,
): OneToOneAbstractAssociation => {
    const sourceAbstractEntity = mappedSuperClassMap.get(idOnly.sourceAbstractEntityId)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)

    if (!sourceAbstractEntity) throw new Error(`[${idOnly.sourceAbstractEntityId}] not found`)
    if (!referencedEntity) throw new Error(`[${idOnly.referencedEntityId}] not found`)
    const sourceProperty = sourceAbstractEntity.allProperties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`[${idOnly.sourcePropertyId}] not found`)
    if (sourceProperty.category !== 'OneToOne_Source') throw new Error(`[${getPropertyView(sourceProperty)}] is not a OneToOne_Source`)

    const association: OneToOneAbstractAssociation = {
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
    association.nameTemplate = tmpl_fkName(idOnly.nameTemplate, {name: INHERIT_ENTITY}, sourceProperty)
    association.commentTemplate = tmpl_fkComment(idOnly.commentTemplate, {comment: INHERIT_ENTITY}, sourceProperty)

    return association
}

export const abstractManyToOneIdOnlyToAssociation = (
    idOnly: ManyToOneAbstractAssociationIdOnly,
    entityMap: ReadonlyMap<string, EntityWithInheritInfo>,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithInheritInfo>,
): ManyToOneAbstractAssociation => {
    const sourceAbstractEntity = mappedSuperClassMap.get(idOnly.sourceAbstractEntityId)
    const referencedEntity = entityMap.get(idOnly.referencedEntityId)

    if (!sourceAbstractEntity) throw new Error(`[${idOnly.sourceAbstractEntityId}] not found`)
    if (!referencedEntity) throw new Error(`[${idOnly.referencedEntityId}] not found`)
    const sourceProperty = sourceAbstractEntity.allProperties.find(it => it.id === idOnly.sourcePropertyId)
    if (!sourceProperty) throw new Error(`[${idOnly.sourcePropertyId}] not found`)
    if (sourceProperty.category !== 'ManyToOne') throw new Error(`[${getPropertyView(sourceProperty)}] is not a ManyToOne`)

    const association: ManyToOneAbstractAssociation = {
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
    association.nameTemplate = tmpl_fkName(idOnly.nameTemplate, {name: INHERIT_ENTITY}, sourceProperty)
    association.commentTemplate = tmpl_fkComment(idOnly.commentTemplate, {comment: INHERIT_ENTITY}, sourceProperty)

    return association
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
    }
}