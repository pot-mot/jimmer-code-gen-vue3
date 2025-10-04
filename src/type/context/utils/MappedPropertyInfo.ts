type OneToOneMappedPropertyInfo = {
    association: OneToOneAssociation
    mappedProperty: OneToOneMappedProperty
    referencedEntity: EntityWithProperties
}

type OneToManyMappedPropertyInfo = {
    association: ManyToOneAssociation
    mappedProperty: OneToManyProperty
    referencedEntity: EntityWithProperties
}

type ManyToManyMappedPropertyInfo = {
    association: ManyToManyAssociation
    mappedProperty: ManyToManyMappedProperty
    referencedEntity: EntityWithProperties
}

export const getEntityMappedPropertyInfo = (
    properties: DeepReadonly<EntityProperty[]>,
    associationMap: ReadonlyMap<string, Readonly<Association>>,
): (OneToOneMappedPropertyInfo | OneToManyMappedPropertyInfo | ManyToManyMappedPropertyInfo)[] => {
    const result: (OneToOneMappedPropertyInfo | OneToManyMappedPropertyInfo | ManyToManyMappedPropertyInfo)[] = []

    for (const property of properties) {
        if (property.category === "OneToOne_Source") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "OneToOne") throw new Error(`association (${property.associationId}) is not OneToOne`)
            result.push({association, mappedProperty: association.mappedProperty, referencedEntity: association.referencedEntity})
        } else if (property.category === "ManyToOne") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "ManyToOne") throw new Error(`association (${property.associationId}) is not ManyToOne`)
            result.push({association, mappedProperty: association.mappedProperty, referencedEntity: association.referencedEntity})
        } else if (property.category === "ManyToMany_Source") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "ManyToMany") throw new Error(`association (${property.associationId}) is not ManyToMany`)
            result.push({association, mappedProperty: association.mappedProperty, referencedEntity: association.referencedEntity})
        }
    }

    return result
}

type OneToOneAbstractMappedPropertyInfo = {
    association: OneToOneAbstractAssociation,
    mappedProperty: OneToOneMappedAbstractProperty,
    referencedEntity: EntityWithProperties
}

type OneToManyAbstractAssociation = {
    association: ManyToOneAbstractAssociation,
    mappedProperty: OneToManyAbstractProperty,
    referencedEntity: EntityWithProperties
}

export const getAbstractMappedProperties = (
    properties: DeepReadonly<MappedSuperClassProperty[]>,
    associationMap: ReadonlyMap<string, Readonly<Association>>,
): (OneToOneAbstractMappedPropertyInfo | OneToManyAbstractAssociation)[] => {
    const result: (OneToOneAbstractMappedPropertyInfo | OneToManyAbstractAssociation)[] = []

    for (const property of properties) {
        if (property.category === "OneToOne_Source") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "OneToOne_Abstract") throw new Error(`association (${property.associationId}) is not OneToOne_Abstract`)
            result.push({
                association,
                mappedProperty: association.mappedProperty,
                referencedEntity: association.referencedEntity
            })
        } else if (property.category === "ManyToOne") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "ManyToOne_Abstract") throw new Error(`association (${property.associationId}) is not ManyToOne_Abstract`)
            result.push({
                association,
                mappedProperty: association.mappedProperty,
                referencedEntity: association.referencedEntity
            })
        }
    }

    return result
}
