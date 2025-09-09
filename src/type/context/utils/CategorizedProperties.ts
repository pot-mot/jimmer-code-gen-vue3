export const validCategorizedPropertiesRequiredId = (
    entityProperties: CategorizedProperties
): entityProperties is CategorizedPropertiesRequiredId => {
    return "idProperty" in entityProperties && entityProperties.idProperty !== undefined
}

const defaultCategorizedProperties = (): CategorizedProperties => {
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

        associationPropertyMap: new Map<string, AssociationProperty>(),
        oneToOneSourcePropertyMap: new Map<string, OneToOneSourceProperty>(),
        oneToOneTargetPropertyMap: new Map<string, OneToOneTargetProperty>(),
        oneToManyPropertyMap: new Map<string, OneToManyProperty>(),
        manyToOnePropertyMap: new Map<string, ManyToOneProperty>(),
        manyToManySourcePropertyMap: new Map<string, ManyToManySourceProperty>(),
        manyToManyTargetPropertyMap: new Map<string, ManyToManyTargetProperty>(),

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

export const categorizeProperties = (
    properties: Property[],
): CategorizedProperties => {
    const result = defaultCategorizedProperties()

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
        } else if (property.category === "ASSOCIATION_ManyToMany_View") {
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
        } else if (property.category === "ASSOCIATION_OneToOne_Source") {
            if (result.oneToOneSourcePropertyMap.has(property.id)) {
                throw new Error(`Duplicate oneToOneSourceProperty id (${property.id}): ${property.name}, ${result.oneToOneSourcePropertyMap.get(property.id)?.name}`)
            }
            result.oneToOneSourcePropertyMap.set(property.id, property)
        } else if (property.category === "ASSOCIATION_OneToOne_Target") {
            if (result.oneToOneTargetPropertyMap.has(property.id)) {
                throw new Error(`Duplicate oneToOneTargetProperty id (${property.id}): ${property.name}, ${result.oneToOneTargetPropertyMap.get(property.id)?.name}`)
            }
            result.oneToOneTargetPropertyMap.set(property.id, property)
        } else if (property.category === "ASSOCIATION_OneToMany") {
            if (result.oneToManyPropertyMap.has(property.id)) {
                throw new Error(`Duplicate oneToManyProperty id (${property.id}): ${property.name}, ${result.oneToManyPropertyMap.get(property.id)?.name}`)
            }
            result.oneToManyPropertyMap.set(property.id, property)
        } else if (property.category === "ASSOCIATION_ManyToOne") {
            if (result.manyToOnePropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToOneProperty id (${property.id}): ${property.name}, ${result.manyToOnePropertyMap.get(property.id)?.name}`)
            }
            result.manyToOnePropertyMap.set(property.id, property)
        } else if (property.category === "ASSOCIATION_ManyToMany_Source") {
            if (result.manyToManySourcePropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToManySourceProperty id (${property.id}): ${property.name}, ${result.manyToManySourcePropertyMap.get(property.id)?.name}`)
            }
            result.manyToManySourcePropertyMap.set(property.id, property)
        } else if (property.category === "ASSOCIATION_ManyToMany_Target") {
            if (result.manyToManyTargetPropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToManyTargetProperty id (${property.id}): ${property.name}, ${result.manyToManyTargetPropertyMap.get(property.id)?.name}`)
            }
            result.manyToManyTargetPropertyMap.set(property.id, property)
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

        if ("associationId" in property) {
            if (result.associationPropertyMap.has(property.id)) {
                throw new Error(`Duplicate associationProperty id (${property.id}): ${property.name}, ${result.associationPropertyMap.get(property.id)?.name}`)
            }
            result.associationPropertyMap.set(property.id, property)
        }
    }

    return result
}

export const categorizePropertiesRequiredId = (
    properties: Property[],
): CategorizedPropertiesRequiredId => {
    const categoryProperties = categorizeProperties(properties)
    if (!validCategorizedPropertiesRequiredId(categoryProperties)) {
        throw new Error(`No idProperty`)
    }
    return categoryProperties
}

export const categorizeEmbeddableTypeProperties = (
    properties: Property[],
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