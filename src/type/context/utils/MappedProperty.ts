import {createId} from "@/modelEditor/useModelEditor.ts";
import {firstCaseToLower} from "@/utils/name/firstCase.ts";

export const getEntityMappedProperties = (
    properties: DeepReadonly<EntityProperty[]>,
    associationMap: ReadonlyMap<string, Readonly<Association>>,
): {mappedProperty: OneToOneMappedProperty | OneToManyProperty | ManyToManyMappedProperty, referencedEntity: EntityWithProperties}[] => {
    const result: {mappedProperty: OneToOneMappedProperty | OneToManyProperty | ManyToManyMappedProperty, referencedEntity: EntityWithProperties}[] = []

    for (const property of properties) {
        if (property.category === "OneToOne_Source") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "OneToOne") throw new Error(`association (${property.associationId}) is not OneToOne`)
            result.push({mappedProperty: association.mappedProperty, referencedEntity: association.referencedEntity})
        } else if (property.category === "ManyToOne") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "ManyToOne") throw new Error(`association (${property.associationId}) is not ManyToOne`)
            result.push({mappedProperty: association.mappedProperty, referencedEntity: association.referencedEntity})
        } else if (property.category === "ManyToMany_Source") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "ManyToMany") throw new Error(`association (${property.associationId}) is not ManyToMany`)
            result.push({mappedProperty: association.mappedProperty, referencedEntity: association.referencedEntity})
        }
    }

    return result
}

export const getAbstractMappedProperties = (
    properties: DeepReadonly<MappedSuperClassProperty[]>,
    associationMap: ReadonlyMap<string, Readonly<Association>>,
): {mappedProperty: OneToOneMappedAbstractProperty | OneToManyAbstractProperty, referencedEntity: EntityWithProperties}[] => {
    const result: {mappedProperty: OneToOneMappedAbstractProperty | OneToManyAbstractProperty, referencedEntity: EntityWithProperties}[] = []

    for (const property of properties) {
        if (property.category === "OneToOne_Source") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "OneToOne_Abstract") throw new Error(`association (${property.associationId}) is not OneToOne_Abstract`)
            result.push({mappedProperty: association.mappedProperty, referencedEntity: association.referencedEntity})
        } else if (property.category === "ManyToOne") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "ManyToOne_Abstract") throw new Error(`association (${property.associationId}) is not ManyToOne_Abstract`)
            result.push({mappedProperty: association.mappedProperty, referencedEntity: association.referencedEntity})
        }
    }

    return result
}

export const ABSTRACT_NAME_PLACEHOLDER = "[[ABSTRACT_NAME_PLACEHOLDER]]"
export const ABSTRACT_COMMENT_PLACEHOLDER = "[[ABSTRACT_COMMENT_PLACEHOLDER]]"
export const ABSTRACT_ID_VIEW_PLACEHOLDER = "[[ABSTRACT_ID_VIEW_PLACEHOLDER]]"

export const oneToOneMappedAbstractPropertyToReal = (
    abstractProperty: OneToOneMappedAbstractProperty,
    typeEntity: EntityWithProperties
): OneToOneMappedProperty => {
    const lowerName = firstCaseToLower(typeEntity.name)
    return {
        associationId: "",
        category: "OneToOne_Mapped",
        name: abstractProperty.name.replace(ABSTRACT_NAME_PLACEHOLDER, lowerName),
        comment: abstractProperty.comment.replace(ABSTRACT_COMMENT_PLACEHOLDER, typeEntity.comment),
        idViewName: abstractProperty.idViewName.replace(ABSTRACT_ID_VIEW_PLACEHOLDER, lowerName),
        extraAnnotations: [],
        extraImports: [],
        mappedById: abstractProperty.mappedById,
        nullable: true,
        referencedEntityId: typeEntity.id,
        id: createId("Property")

    }
}

export const oneToManyAbstractPropertyToReal = (
    abstractProperty: OneToManyAbstractProperty,
    typeEntity: EntityWithProperties,
): OneToManyProperty => {
    const lowerName = firstCaseToLower(typeEntity.name)
    return {
        associationId: "",
        category: "OneToMany",
        name: abstractProperty.name.replace(ABSTRACT_NAME_PLACEHOLDER, lowerName),
        comment: abstractProperty.comment.replace(ABSTRACT_COMMENT_PLACEHOLDER, ""),
        idViewName: abstractProperty.idViewName.replace(ABSTRACT_ID_VIEW_PLACEHOLDER, lowerName),
        extraAnnotations: [],
        extraImports: [],
        mappedById: abstractProperty.mappedById,
        nullable: false,
        referencedEntityId: typeEntity.id,
        typeIsList: true,
        id: createId("Property")

    }
}
