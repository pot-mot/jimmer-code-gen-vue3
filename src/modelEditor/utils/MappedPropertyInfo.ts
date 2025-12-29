export type OneToOneMappedPropertyInfo = {
    mappedProperty: OneToOneMappedProperty
    association: OneToOneAssociationIdOnly
    sourceProperty: OneToOneSourceProperty
}

export type OneToManyMappedPropertyInfo = {
    mappedProperty: OneToManyProperty
    association: ManyToOneAssociationIdOnly
    sourceProperty: ManyToOneProperty
}

export type ManyToManyMappedPropertyInfo = {
    mappedProperty: ManyToManyMappedProperty
    association: ManyToManyAssociationIdOnly
    sourceProperty: ManyToManySourceProperty
}

export type MappedPropertyInfo = OneToOneMappedPropertyInfo | OneToManyMappedPropertyInfo | ManyToManyMappedPropertyInfo

export const getMappedPropertyInfo = (
    properties: Property[],
    associationMap: Map<string, Readonly<AssociationIdOnly>>,
): MappedPropertyInfo[] => {
    const result: MappedPropertyInfo[] = []

    for (const property of properties) {
        if (property.category === "OneToOne_Source") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "OneToOne") throw new Error(`[${property.associationId}] is not OneToOne`)
            result.push({
                association,
                sourceProperty: property,
                mappedProperty: association.mappedProperty,
            })
        } else if (property.category === "ManyToOne") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "ManyToOne") throw new Error(`[${property.associationId}] is not ManyToOne`)
            result.push({
                association,
                sourceProperty: property,
                mappedProperty: association.mappedProperty,
            })
        } else if (property.category === "ManyToMany_Source") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "ManyToMany") throw new Error(`[${property.associationId}] is not ManyToMany`)
            result.push({
                association,
                sourceProperty: property,
                mappedProperty: association.mappedProperty,
            })
        }
    }

    return result
}

export type OneToOneAbstractMappedPropertyInfo = {
    mappedProperty: OneToOneMappedAbstractProperty
    association: OneToOneAbstractAssociationIdOnly
    sourceProperty: OneToOneSourceProperty
}

export type OneToManyAbstractMappedPropertyInfo = {
    mappedProperty: OneToManyAbstractProperty
    association: ManyToOneAbstractAssociationIdOnly
    sourceProperty: ManyToOneProperty
}

export type ManyToManyAbstractMappedPropertyInfo = {
    mappedProperty: ManyToManyMappedAbstractProperty
    association: ManyToManyAbstractAssociationIdOnly
    sourceProperty: ManyToManySourceProperty
}

export type AbstractMappedPropertyInfo = OneToOneAbstractMappedPropertyInfo | OneToManyAbstractMappedPropertyInfo | ManyToManyAbstractMappedPropertyInfo

export const getAbstractMappedPropertyInfo = (
    properties: Property[],
    associationMap: Map<string, Readonly<AssociationIdOnly>>,
): AbstractMappedPropertyInfo[] => {
    const result: AbstractMappedPropertyInfo[] = []

    for (const property of properties) {
        if (property.category === "OneToOne_Source") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "OneToOne_Abstract") throw new Error(`[${property.associationId}] is not OneToOne_Abstract`)
            result.push({
                association,
                sourceProperty: property,
                mappedProperty: association.mappedProperty,
            })
        } else if (property.category === "ManyToOne") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "ManyToOne_Abstract") throw new Error(`[${property.associationId}] is not ManyToOne_Abstract`)
            result.push({
                association,
                sourceProperty: property,
                mappedProperty: association.mappedProperty,
            })
        } else if (property.category === "ManyToMany_Source") {
            const association = associationMap.get(property.associationId)
            if (!association) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "ManyToMany_Abstract") throw new Error(`[${property.associationId}] is not ManyToMany_Abstract`)
            result.push({
                association,
                sourceProperty: property,
                mappedProperty: association.mappedProperty,
            })
        }
    }

    return result
}
