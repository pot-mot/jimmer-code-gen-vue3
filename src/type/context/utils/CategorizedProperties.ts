const defaultEntityCategorizedProperties = (): Omit<EntityCategorizedProperties, 'idProperty'> => {
    return {
        keyPropertyMap: new Map<string, Property & KeyProperty>(),
        logicalDeletedProperty: undefined,
        versionProperty: undefined,
        defaultOrderPropertyMap: new Map<string, Property & { defaultOrderDirection?: OrderDirection }>(),

        scalarPropertyMap: new Map<string, ScalarProperty>(),
        enumPropertyMap: new Map<string, EnumProperty>(),

        columnPropertyMap: new Map<string, Property & ColumnProperty>(),
        embeddablePropertyMap: new Map<string, Property & EmbeddableProperty>(),

        oneToOneSourcePropertyMap: new Map<string, OneToOneSourceProperty & { association: OneToOneAssociation }>(),
        oneToOneMappedPropertyMap: new Map<string, OneToOneMappedProperty & { association: OneToOneAssociation }>(),
        manyToOnePropertyMap: new Map<string, ManyToOneProperty & { association: ManyToOneAssociation }>(),
        oneToManyPropertyMap: new Map<string, OneToManyProperty & { association: ManyToOneAssociation }>(),
        manyToManySourcePropertyMap: new Map<string, ManyToManySourceProperty & {
            association: ManyToManyAssociation
        }>(),
        manyToManyMappedPropertyMap: new Map<string, ManyToManyMappedProperty & {
            association: ManyToManyAssociation
        }>(),

        manyToManyViewPropertyMap: new Map<string, ManyToManyViewProperty>(),

        getterFormulaPropertyMap: new Map<string, GetterFormulaProperty>(),
        sqlFormulaPropertyMap: new Map<string, SqlFormulaProperty>(),
        transientPropertyMap: new Map<string, TransientProperty>(),
    }
}

const defaultAbstractCategorizedProperties = (): AbstractCategorizedProperties => {
    return {
        idProperty: undefined,
        keyPropertyMap: new Map<string, Property & KeyProperty>(),
        logicalDeletedProperty: undefined,
        versionProperty: undefined,
        defaultOrderPropertyMap: new Map<string, Property & { defaultOrderDirection?: OrderDirection }>(),

        scalarPropertyMap: new Map<string, ScalarProperty>(),
        enumPropertyMap: new Map<string, EnumProperty>(),

        columnPropertyMap: new Map<string, Property & ColumnProperty>(),
        embeddablePropertyMap: new Map<string, Property & EmbeddableProperty>(),

        oneToOneSourcePropertyMap: new Map<string, OneToOneSourceProperty & {
            association: OneToOneAbstractAssociation
        }>(),
        manyToOnePropertyMap: new Map<string, ManyToOneProperty & { association: ManyToOneAbstractAssociation }>(),

        manyToManyViewPropertyMap: new Map<string, ManyToManyViewProperty>(),

        getterFormulaPropertyMap: new Map<string, GetterFormulaProperty>(),
        sqlFormulaPropertyMap: new Map<string, SqlFormulaProperty>(),
        transientPropertyMap: new Map<string, TransientProperty>(),
    }
}

const defaultCategorizedEmbeddableTypeProperties = (): CategorizedEmbeddableTypeProperties => {
    return {
        scalarPropertyMap: new Map<string, ScalarProperty>(),
        enumPropertyMap: new Map<string, EnumProperty>(),

        columnPropertyMap: new Map<string, Property & ColumnProperty>(),
        embeddablePropertyMap: new Map<string, Property & EmbeddableProperty>(),
    }
}

export const categorizeEntityProperties = (
    properties: ReadonlyArray<Property>,
    associationMap: ReadonlyMap<string, Readonly<Association>>,
): EntityCategorizedProperties => {
    const result = defaultEntityCategorizedProperties()
    let idProperty: IdProperty | undefined

    for (const property of properties) {
        if (property.category === "ID") {
            if (idProperty !== undefined) {
                throw new Error(`Multiple idProperties: ${property.name}(${property.id}), ${idProperty.name}(${idProperty.id})`)
            }
            idProperty = property
        } else if (property.category === "VERSION") {
            if (result.versionProperty !== undefined) {
                throw new Error(`Multiple versionProperty: ${property.name}(${property.id}), ${result.versionProperty.name}(${result.versionProperty.id})`)
            }
            result.versionProperty = property
        } else if (property.category === "ManyToMany_View") {
            if (result.manyToManyViewPropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToManyViewProperty id (${property.id}): ${property.name}, ${result.manyToManyViewPropertyMap.get(property.id)?.name}`)
            }
            result.manyToManyViewPropertyMap.set(property.id, property)
        } else if (property.category === "FORMULA_GETTER") {
            if (result.getterFormulaPropertyMap.has(property.id)) {
                throw new Error(`Duplicate getterFormulaProperty id (${property.id}): ${property.name}, ${result.getterFormulaPropertyMap.get(property.id)?.name}`)
            }
            result.getterFormulaPropertyMap.set(property.id, property)
        } else if (property.category === "FORMULA_SQL") {
            if (result.sqlFormulaPropertyMap.has(property.id)) {
                throw new Error(`Duplicate sqlFormulaProperty id (${property.id}): ${property.name}, ${result.sqlFormulaPropertyMap.get(property.id)?.name}`)
            }
            result.sqlFormulaPropertyMap.set(property.id, property)
        } else if (property.category === "TRANSIENT") {
            if (result.transientPropertyMap.has(property.id)) {
                throw new Error(`Duplicate transientProperty id (${property.id}): ${property.name}, ${result.transientPropertyMap.get(property.id)?.name}`)
            }
            result.transientPropertyMap.set(property.id, property)
        } else if (property.category === "SCALAR") {
            if (result.scalarPropertyMap.has(property.id)) {
                throw new Error(`Duplicate scalarProperty id (${property.id}): ${property.name}, ${result.scalarPropertyMap.get(property.id)?.name}`)
            }
            result.scalarPropertyMap.set(property.id, property)
        } else if (property.category === "ENUM") {
            if (result.enumPropertyMap.has(property.id)) {
                throw new Error(`Duplicate enumProperty id (${property.id}): ${property.name}, ${result.enumPropertyMap.get(property.id)?.name}`)
            }
            result.enumPropertyMap.set(property.id, property)
        }

        else if (property.category === "OneToOne_Source") {
            if (result.oneToOneSourcePropertyMap.has(property.id)) {
                throw new Error(`Duplicate oneToOneSourceProperty id (${property.id}): ${property.name}, ${result.oneToOneSourcePropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "OneToOne") throw new Error(`association ${association.name}(${association.id}) is not OneToOne`)
            result.oneToOneSourcePropertyMap.set(property.id, {...property, association})
        } else if (property.category === "OneToOne_Mapped") {
            if (result.oneToOneMappedPropertyMap.has(property.id)) {
                throw new Error(`Duplicate oneToOneTargetProperty id (${property.id}): ${property.name}, ${result.oneToOneMappedPropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "OneToOne") throw new Error(`association ${association.name}(${association.id}) is not OneToOne`)
            result.oneToOneMappedPropertyMap.set(property.id, {...property, association})
        } else if (property.category === "ManyToOne") {
            if (result.manyToOnePropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToOneProperty id (${property.id}): ${property.name}, ${result.manyToOnePropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "ManyToOne") throw new Error(`association ${association.name}(${association.id}) is not ManyToOne`)
            result.manyToOnePropertyMap.set(property.id, {...property, association})
        } else if (property.category === "OneToMany") {
            if (result.oneToManyPropertyMap.has(property.id)) {
                throw new Error(`Duplicate oneToManyProperty id (${property.id}): ${property.name}, ${result.oneToManyPropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "ManyToOne") throw new Error(`association ${association.name}(${association.id}) is not ManyToOne`)
            result.oneToManyPropertyMap.set(property.id, {...property, association})
        } else if (property.category === "ManyToMany_Source") {
            if (result.manyToManySourcePropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToManySourceProperty id (${property.id}): ${property.name}, ${result.manyToManySourcePropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "ManyToMany") throw new Error(`association ${association.name}(${association.id}) is not ManyToMany`)
            result.manyToManySourcePropertyMap.set(property.id, {...property, association})
        } else if (property.category === "ManyToMany_Mapped") {
            if (result.manyToManyMappedPropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToManyTargetProperty id (${property.id}): ${property.name}, ${result.manyToManyMappedPropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "ManyToMany") throw new Error(`association ${association.name}(${association.id}) is not ManyToMany`)
            result.manyToManyMappedPropertyMap.set(property.id, {...property, association})
        }

        if ("key" in property && property.key) {
            if (result.keyPropertyMap.has(property.id)) {
                throw new Error(`Duplicate keyProperty id (${property.id}): ${property.name}, ${result.keyPropertyMap.get(property.id)?.name}`)
            }
            result.keyPropertyMap.set(property.id, property)
        } else if ("logicalDelete" in property && property.logicalDelete) {
            if (result.logicalDeletedProperty !== undefined) {
                throw new Error(`Multiple logicalDeletedProperty: ${property.name}(${property.id}), ${result.logicalDeletedProperty.name}(${result.logicalDeletedProperty.id})`)
            }
            result.logicalDeletedProperty = property
        }

        if ("columnInfo" in property) {
            if (result.columnPropertyMap.has(property.id)) {
                throw new Error(`Duplicate columnProperty id (${property.id}): ${property.name}, ${result.columnPropertyMap.get(property.id)?.name}`)
            }
            result.columnPropertyMap.set(property.id, property)
        } else if ("embeddableTypeId" in property) {
            if (result.embeddablePropertyMap.has(property.id)) {
                throw new Error(`Duplicate embeddableProperty id (${property.id}): ${property.name}, ${result.embeddablePropertyMap.get(property.id)?.name}`)
            }
            result.embeddablePropertyMap.set(property.id, property)
        }

        if ("defaultOrderDirection" in property) {
            if (result.defaultOrderPropertyMap.has(property.id)) {
                throw new Error(`Duplicate defaultOrderProperty id (${property.id}): ${property.name}, ${result.defaultOrderPropertyMap.get(property.id)?.name}`)
            }
            result.defaultOrderPropertyMap.set(property.id, property)
        }
    }

    if (idProperty === undefined) {
        throw new Error(`No idProperty`)
    }
    return {
        ...result,
        idProperty,
    }
}

export const categorizeAbstractCategorizedProperties = (
    properties: ReadonlyArray<Property>,
    associationMap: ReadonlyMap<string, Readonly<Association>>,
): AbstractCategorizedProperties => {
    const result = defaultAbstractCategorizedProperties()

    for (const property of properties) {
        if (property.category === "ID") {
            if (result.idProperty !== undefined) {
                throw new Error(`Multiple idProperties: ${property.name}(${property.id}), ${result.idProperty.name}(${result.idProperty.id})`)
            }
            result.idProperty = property
        } else if (property.category === "VERSION") {
            if (result.versionProperty !== undefined) {
                throw new Error(`Multiple versionProperty: ${property.name}(${property.id}), ${result.versionProperty.name}(${result.versionProperty.id})`)
            }
            result.versionProperty = property
        } else if (property.category === "ManyToMany_View") {
            if (result.manyToManyViewPropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToManyViewProperty id (${property.id}): ${property.name}, ${result.manyToManyViewPropertyMap.get(property.id)?.name}`)
            }
            result.manyToManyViewPropertyMap.set(property.id, property)
        } else if (property.category === "FORMULA_GETTER") {
            if (result.getterFormulaPropertyMap.has(property.id)) {
                throw new Error(`Duplicate getterFormulaProperty id (${property.id}): ${property.name}, ${result.getterFormulaPropertyMap.get(property.id)?.name}`)
            }
            result.getterFormulaPropertyMap.set(property.id, property)
        } else if (property.category === "FORMULA_SQL") {
            if (result.sqlFormulaPropertyMap.has(property.id)) {
                throw new Error(`Duplicate sqlFormulaProperty id (${property.id}): ${property.name}, ${result.sqlFormulaPropertyMap.get(property.id)?.name}`)
            }
            result.sqlFormulaPropertyMap.set(property.id, property)
        } else if (property.category === "TRANSIENT") {
            if (result.transientPropertyMap.has(property.id)) {
                throw new Error(`Duplicate transientProperty id (${property.id}): ${property.name}, ${result.transientPropertyMap.get(property.id)?.name}`)
            }
            result.transientPropertyMap.set(property.id, property)
        } else if (property.category === "SCALAR") {
            if (result.scalarPropertyMap.has(property.id)) {
                throw new Error(`Duplicate scalarProperty id (${property.id}): ${property.name}, ${result.scalarPropertyMap.get(property.id)?.name}`)
            }
            result.scalarPropertyMap.set(property.id, property)
        } else if (property.category === "ENUM") {
            if (result.enumPropertyMap.has(property.id)) {
                throw new Error(`Duplicate enumProperty id (${property.id}): ${property.name}, ${result.enumPropertyMap.get(property.id)?.name}`)
            }
            result.enumPropertyMap.set(property.id, property)
        }

        else if (property.category === "OneToOne_Source") {
            if (result.oneToOneSourcePropertyMap.has(property.id)) {
                throw new Error(`Duplicate oneToOneSourceProperty id (${property.id}): ${property.name}, ${result.oneToOneSourcePropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "OneToOne_Abstract") throw new Error(`association ${association.name}(${association.id}) is not OneToOne`)
            result.oneToOneSourcePropertyMap.set(property.id, {...property, association})
        } else if (property.category === "ManyToOne") {
            if (result.manyToOnePropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToOneProperty id (${property.id}): ${property.name}, ${result.manyToOnePropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`association (${property.associationId}) not found`)
            if (association.type !== "ManyToOne_Abstract") throw new Error(`association ${association.name}(${association.id}) is not ManyToOne`)
            result.manyToOnePropertyMap.set(property.id, {...property, association})
        }

        if ("key" in property && property.key) {
            if (result.keyPropertyMap.has(property.id)) {
                throw new Error(`Duplicate keyProperty id (${property.id}): ${property.name}, ${result.keyPropertyMap.get(property.id)?.name}`)
            }
            result.keyPropertyMap.set(property.id, property)
        } else if ("logicalDelete" in property && property.logicalDelete) {
            if (result.logicalDeletedProperty !== undefined) {
                throw new Error(`Multiple logicalDeletedProperty: ${property.name}(${property.id}), ${result.logicalDeletedProperty.name}(${result.logicalDeletedProperty.id})`)
            }
            result.logicalDeletedProperty = property
        }

        if ("columnInfo" in property) {
            if (result.columnPropertyMap.has(property.id)) {
                throw new Error(`Duplicate columnProperty id (${property.id}): ${property.name}, ${result.columnPropertyMap.get(property.id)?.name}`)
            }
            result.columnPropertyMap.set(property.id, property)
        } else if ("embeddableTypeId" in property) {
            if (result.embeddablePropertyMap.has(property.id)) {
                throw new Error(`Duplicate embeddableProperty id (${property.id}): ${property.name}, ${result.embeddablePropertyMap.get(property.id)?.name}`)
            }
            result.embeddablePropertyMap.set(property.id, property)
        }

        if ("defaultOrderDirection" in property) {
            if (result.defaultOrderPropertyMap.has(property.id)) {
                throw new Error(`Duplicate defaultOrderProperty id (${property.id}): ${property.name}, ${result.defaultOrderPropertyMap.get(property.id)?.name}`)
            }
            result.defaultOrderPropertyMap.set(property.id, property)
        }
    }

    return result
}

export const categorizeEmbeddableTypeProperties = (
    properties: ReadonlyArray<Property>,
): CategorizedEmbeddableTypeProperties => {
    const result = defaultCategorizedEmbeddableTypeProperties()

    for (const property of properties) {
        if (property.category === "SCALAR") {
            if (result.scalarPropertyMap.has(property.id)) {
                throw new Error(`Duplicate scalarProperty id (${property.id}): ${property.name}, ${result.scalarPropertyMap.get(property.id)?.name}`)
            }
            result.scalarPropertyMap.set(property.id, property)
        } else if (property.category === "ENUM") {
            if (result.enumPropertyMap.has(property.id)) {
                throw new Error(`Duplicate enumProperty id (${property.id}): ${property.name}, ${result.enumPropertyMap.get(property.id)?.name}`)
            }
            result.enumPropertyMap.set(property.id, property)
        }

        if ("columnInfo" in property) {
            if (result.columnPropertyMap.has(property.id)) {
                throw new Error(`Duplicate columnProperty id (${property.id}): ${property.name}, ${result.columnPropertyMap.get(property.id)?.name}`)
            }
            result.columnPropertyMap.set(property.id, property)
        } else if ("embeddableTypeId" in property) {
            if (result.embeddablePropertyMap.has(property.id)) {
                throw new Error(`Duplicate embeddableProperty id (${property.id}): ${property.name}, ${result.embeddablePropertyMap.get(property.id)?.name}`)
            }
            result.embeddablePropertyMap.set(property.id, property)
        }
    }

    return result
}