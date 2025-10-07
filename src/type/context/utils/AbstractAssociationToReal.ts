import {firstCaseToLower} from "@/utils/name/firstCase.ts";
import {createId} from "@/modelEditor/useModelEditor.ts";

export const ABSTRACT_ASSOCIATION_SOURCE_NAME_PLACEHOLDER = "[[ABSTRACT_ASSOCIATION_SOURCE_NAME_PLACEHOLDER]]"
export const ABSTRACT_ASSOCIATION_SOURCE_COMMENT_PLACEHOLDER = "[[ABSTRACT_ASSOCIATION_SOURCE_COMMENT_PLACEHOLDER]]"
export const ABSTRACT_PROPERTY_NAME_PLACEHOLDER = "[[ABSTRACT_PROPERTY_NAME_PLACEHOLDER]]"
export const ABSTRACT_PROPERTY_COMMENT_PLACEHOLDER = "[[ABSTRACT_PROPERTY_COMMENT_PLACEHOLDER]]"

export const oneToOneAbstractToReal = (
    abstractAssociation: OneToOneAbstractAssociation,
    abstractProperty: OneToOneMappedAbstractProperty,
    inheritSourceEntity: EntityWithProperties,
): {
    property: OneToOneMappedProperty,
    association: OneToOneAssociation
} => {
    const newPropertyId = createId("Property")
    const newAssociationId = createId("Association")
    const sourceEntityFirstLowerName = firstCaseToLower(inheritSourceEntity.name)

    const property: OneToOneMappedProperty = {
        id: newPropertyId,
        associationId: newAssociationId,
        category: "OneToOne_Mapped",
        typeIsList: false,
        name: abstractProperty.name.replace(ABSTRACT_PROPERTY_NAME_PLACEHOLDER, sourceEntityFirstLowerName),
        comment: abstractProperty.comment.replace(ABSTRACT_PROPERTY_COMMENT_PLACEHOLDER, inheritSourceEntity.comment),
        idViewName: abstractProperty.idViewName.replace(ABSTRACT_PROPERTY_NAME_PLACEHOLDER, sourceEntityFirstLowerName),
        autoSyncIdViewName: true,
        extraAnnotations: [...abstractProperty.extraAnnotations],
        extraImports: [...abstractProperty.extraImports],
        mappedById: abstractProperty.mappedById,
        nullable: abstractProperty.nullable,
        referencedEntityId: inheritSourceEntity.id,
    }
    const association: OneToOneAssociation = {
        id: newAssociationId,
        type: "OneToOne",
        name: abstractAssociation.name.replace(ABSTRACT_ASSOCIATION_SOURCE_NAME_PLACEHOLDER, sourceEntityFirstLowerName),
        comment: abstractAssociation.comment.replace(ABSTRACT_ASSOCIATION_SOURCE_COMMENT_PLACEHOLDER, inheritSourceEntity.comment),
        sourceEntity: inheritSourceEntity,
        sourceProperty: abstractAssociation.sourceProperty,
        referencedEntity: abstractAssociation.referencedEntity,
        mappedProperty: property,
        foreignKeyType: abstractAssociation.foreignKeyType,
    }

    return {
        property,
        association
    }
}
export const oneToManyAbstractToReal = (
    abstractAssociation: ManyToOneAbstractAssociation,
    abstractProperty: OneToManyAbstractProperty,
    inheritSourceEntity: EntityWithProperties,
): {
    property: OneToManyProperty,
    association: ManyToOneAssociation
} => {
    const newPropertyId = createId("Property")
    const newAssociationId = createId("Association")
    const sourceEntityFirstLowerName = firstCaseToLower(inheritSourceEntity.name)

    const property: OneToManyProperty = {
        id: newPropertyId,
        associationId: newAssociationId,
        category: "OneToMany",
        name: abstractProperty.name.replace(ABSTRACT_PROPERTY_NAME_PLACEHOLDER, sourceEntityFirstLowerName),
        comment: abstractProperty.comment.replace(ABSTRACT_PROPERTY_COMMENT_PLACEHOLDER, inheritSourceEntity.comment),
        idViewName: abstractProperty.idViewName.replace(ABSTRACT_PROPERTY_NAME_PLACEHOLDER, sourceEntityFirstLowerName),
        autoSyncIdViewName: true,
        extraAnnotations: [...abstractProperty.extraAnnotations],
        extraImports: [...abstractProperty.extraImports],
        mappedById: abstractProperty.mappedById,
        nullable: abstractProperty.nullable,
        referencedEntityId: inheritSourceEntity.id,
        typeIsList: true,
    }
    const association: ManyToOneAssociation = {
        id: newAssociationId,
        type: "ManyToOne",
        name: abstractAssociation.name.replace(ABSTRACT_ASSOCIATION_SOURCE_NAME_PLACEHOLDER, sourceEntityFirstLowerName),
        comment: abstractAssociation.comment.replace(ABSTRACT_ASSOCIATION_SOURCE_COMMENT_PLACEHOLDER, inheritSourceEntity.comment),
        sourceEntity: inheritSourceEntity,
        sourceProperty: abstractAssociation.sourceProperty,
        referencedEntity: abstractAssociation.referencedEntity,
        mappedProperty: property,
        foreignKeyType: abstractAssociation.foreignKeyType,
    }

    return {
        property,
        association
    }
}