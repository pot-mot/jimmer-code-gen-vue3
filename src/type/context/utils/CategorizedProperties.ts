import {getPropertyView} from "@/type/context/utils/PropertyView.ts";

const defaultEntityCategorizedProperties = (): Omit<EntityCategorizedProperties, 'idProperty'> => {
    return {
        keyPropertyMap: new Map<string, Property & KeyProperty>(),
        logicalDeleteProperty: undefined,
        versionProperty: undefined,
        defaultOrderPropertyMap: new Map<string, Property & { defaultOrderDirection?: OrderDirection }>(),

        scalarCommonPropertyMap: new Map<string, ScalarCommonProperty>(),
        scalarEnumPropertyMap: new Map<string, ScalarEnumProperty>(),
        scalarEmbeddablePropertyMap: new Map<string, ScalarEmbeddableProperty>(),

        oneToOneSourcePropertyMap: new Map<string, OneToOneSourceProperty & { association: OneToOneAssociationIdOnly }>(),
        oneToOneMappedPropertyMap: new Map<string, OneToOneMappedProperty & { association: OneToOneAssociationIdOnly }>(),
        manyToOnePropertyMap: new Map<string, ManyToOneProperty & { association: ManyToOneAssociationIdOnly }>(),
        oneToManyPropertyMap: new Map<string, OneToManyProperty & { association: ManyToOneAssociationIdOnly }>(),
        manyToManySourcePropertyMap: new Map<string, ManyToManySourceProperty & {
            association: ManyToManyAssociationIdOnly
        }>(),
        manyToManyMappedPropertyMap: new Map<string, ManyToManyMappedProperty & {
            association: ManyToManyAssociationIdOnly
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
        keyPropertyMap: new Map<string, (ScalarCommonProperty | ScalarEnumProperty) & KeyProperty>(),
        logicalDeleteProperty: undefined,
        versionProperty: undefined,
        defaultOrderPropertyMap: new Map<string, Property & { defaultOrderDirection?: OrderDirection }>(),

        scalarCommonPropertyMap: new Map<string, ScalarCommonProperty>(),
        scalarEnumPropertyMap: new Map<string, ScalarEnumProperty>(),
        scalarEmbeddablePropertyMap: new Map<string, ScalarEmbeddableProperty>(),

        oneToOneSourcePropertyMap: new Map<string, OneToOneSourceProperty & {
            association: OneToOneAbstractAssociationIdOnly
        }>(),
        manyToOnePropertyMap: new Map<string, ManyToOneProperty & { association: ManyToOneAbstractAssociationIdOnly }>(),

        manyToManyViewPropertyMap: new Map<string, ManyToManyViewProperty>(),

        getterFormulaPropertyMap: new Map<string, GetterFormulaProperty>(),
        sqlFormulaPropertyMap: new Map<string, SqlFormulaProperty>(),
        transientPropertyMap: new Map<string, TransientProperty>(),
    }
}

const defaultCategorizedEmbeddableTypeProperties = (): CategorizedEmbeddableTypeProperties => {
    return {
        scalarCommonPropertyMap: new Map<string, ScalarCommonProperty>(),
        scalarEnumPropertyMap: new Map<string, ScalarEnumProperty>(),
        scalarEmbeddablePropertyMap: new Map<string, ScalarEmbeddableProperty>(),
    }
}

export const categorizeEntityProperties = (
    properties: ReadonlyArray<Property>,
    associationMap: ReadonlyMap<string, Readonly<AssociationIdOnly>>,
): EntityCategorizedProperties => {
    const result = defaultEntityCategorizedProperties()
    let idProperty: IdCommonProperty | IdEmbeddableProperty | undefined

    for (const property of properties) {
        if (property.category === "ID_COMMON" || property.category === "ID_EMBEDDABLE") {
            if (idProperty !== undefined) {
                throw new Error(`Multiple idProperties: ${property.name}(${property.id}), ${idProperty.name}(${idProperty.id})`)
            }
            idProperty = property
        } else if (property.category === "VERSION") {
            if (result.versionProperty !== undefined) {
                throw new Error(`Multiple versionProperty: ${property.name}(${property.id}), ${result.versionProperty.name}(${result.versionProperty.id})`)
            }
            result.versionProperty = property
        } else if (property.category === "SCALAR_COMMON") {
            if (result.scalarCommonPropertyMap.has(property.id)) {
                throw new Error(`Duplicate scalarCommonProperty id (${property.id}): ${property.name}, ${result.scalarCommonPropertyMap.get(property.id)?.name}`)
            }
            result.scalarCommonPropertyMap.set(property.id, property)
        } else if (property.category === "SCALAR_ENUM") {
            if (result.scalarEnumPropertyMap.has(property.id)) {
                throw new Error(`Duplicate scalarEnumProperty id (${property.id}): ${property.name}, ${result.scalarEnumPropertyMap.get(property.id)?.name}`)
            }
            result.scalarEnumPropertyMap.set(property.id, property)
        } else if (property.category === "SCALAR_EMBEDDABLE") {
            if (result.scalarEmbeddablePropertyMap.has(property.id)) {
                throw new Error(`Duplicate scalarEmbeddableProperty id (${property.id}): ${property.name}, ${result.scalarEmbeddablePropertyMap.get(property.id)?.name}`)
            }
            result.scalarEmbeddablePropertyMap.set(property.id, property)
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
        } else if (property.category === "OneToOne_Source") {
            if (result.oneToOneSourcePropertyMap.has(property.id)) {
                throw new Error(`Duplicate oneToOneSourceProperty id (${property.id}): ${property.name}, ${result.oneToOneSourcePropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "OneToOne") throw new Error(`[${association.id}] is not OneToOne`)
            result.oneToOneSourcePropertyMap.set(property.id, {...property, association})
        } else if (property.category === "OneToOne_Mapped") {
            if (result.oneToOneMappedPropertyMap.has(property.id)) {
                throw new Error(`Duplicate oneToOneTargetProperty id (${property.id}): ${property.name}, ${result.oneToOneMappedPropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "OneToOne") throw new Error(`[${association.id}] is not OneToOne`)
            result.oneToOneMappedPropertyMap.set(property.id, {...property, association})
        } else if (property.category === "ManyToOne") {
            if (result.manyToOnePropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToOneProperty id (${property.id}): ${property.name}, ${result.manyToOnePropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "ManyToOne") throw new Error(`[${association.id}] is not ManyToOne`)
            result.manyToOnePropertyMap.set(property.id, {...property, association})
        } else if (property.category === "OneToMany") {
            if (result.oneToManyPropertyMap.has(property.id)) {
                throw new Error(`Duplicate oneToManyProperty id (${property.id}): ${property.name}, ${result.oneToManyPropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "ManyToOne") throw new Error(`[${association.id}] is not ManyToOne`)
            result.oneToManyPropertyMap.set(property.id, {...property, association})
        } else if (property.category === "ManyToMany_Source") {
            if (result.manyToManySourcePropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToManySourceProperty id (${property.id}): ${property.name}, ${result.manyToManySourcePropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "ManyToMany") throw new Error(`[${association.id}] is not ManyToMany`)
            result.manyToManySourcePropertyMap.set(property.id, {...property, association})
        } else if (property.category === "ManyToMany_Mapped") {
            if (result.manyToManyMappedPropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToManyTargetProperty id (${property.id}): ${property.name}, ${result.manyToManyMappedPropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "ManyToMany") throw new Error(`[${association.id}] is not ManyToMany`)
            result.manyToManyMappedPropertyMap.set(property.id, {...property, association})
        }

        if ("key" in property && property.key) {
            if (result.keyPropertyMap.has(property.id)) {
                throw new Error(`Duplicate keyProperty id (${property.id}): ${property.name}, ${getPropertyView(result.keyPropertyMap.get(property.id))}`)
            }
            result.keyPropertyMap.set(property.id, property)
        } else if ("logicalDelete" in property && property.logicalDelete) {
            if (result.logicalDeleteProperty !== undefined) {
                throw new Error(`Multiple logicalDeleteProperty: ${property.name}(${property.id}), ${getPropertyView(result.logicalDeleteProperty)}(${result.logicalDeleteProperty.id})`)
            }
            result.logicalDeleteProperty = property
        }

        if ("defaultOrderDirection" in property) {
            if (result.defaultOrderPropertyMap.has(property.id)) {
                throw new Error(`Duplicate defaultOrderProperty id (${property.id}): ${property.name}, ${getPropertyView(result.defaultOrderPropertyMap.get(property.id))}`)
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
    associationMap: ReadonlyMap<string, AssociationIdOnly>,
): AbstractCategorizedProperties => {
    const result = defaultAbstractCategorizedProperties()

    for (const property of properties) {
        if (property.category === "ID_COMMON" || property.category === "ID_EMBEDDABLE") {
            if (result.idProperty !== undefined) {
                throw new Error(`Multiple idProperties: ${property.name}(${property.id}), ${result.idProperty.name}(${result.idProperty.id})`)
            }
            result.idProperty = property
        } else if (property.category === "VERSION") {
            if (result.versionProperty !== undefined) {
                throw new Error(`Multiple versionProperty: ${property.name}(${property.id}), ${result.versionProperty.name}(${result.versionProperty.id})`)
            }
            result.versionProperty = property
        } else if (property.category === "SCALAR_COMMON") {
            if (result.scalarCommonPropertyMap.has(property.id)) {
                throw new Error(`Duplicate scalarCommonProperty id (${property.id}): ${property.name}, ${result.scalarCommonPropertyMap.get(property.id)?.name}`)
            }
            result.scalarCommonPropertyMap.set(property.id, property)
        } else if (property.category === "SCALAR_ENUM") {
            if (result.scalarEnumPropertyMap.has(property.id)) {
                throw new Error(`Duplicate scalarEnumProperty id (${property.id}): ${property.name}, ${result.scalarEnumPropertyMap.get(property.id)?.name}`)
            }
            result.scalarEnumPropertyMap.set(property.id, property)
        } else if (property.category === "SCALAR_EMBEDDABLE") {
            if (result.scalarEmbeddablePropertyMap.has(property.id)) {
                throw new Error(`Duplicate scalarEmbeddableProperty id (${property.id}): ${property.name}, ${result.scalarEmbeddablePropertyMap.get(property.id)?.name}`)
            }
            result.scalarEmbeddablePropertyMap.set(property.id, property)
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
        } else if (property.category === "OneToOne_Source") {
            if (result.oneToOneSourcePropertyMap.has(property.id)) {
                throw new Error(`Duplicate oneToOneSourceProperty id (${property.id}): ${property.name}, ${result.oneToOneSourcePropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "OneToOne_Abstract") throw new Error(`[${association.id}] is not OneToOne`)
            result.oneToOneSourcePropertyMap.set(property.id, {...property, association})
        } else if (property.category === "ManyToOne") {
            if (result.manyToOnePropertyMap.has(property.id)) {
                throw new Error(`Duplicate manyToOneProperty id (${property.id}): ${property.name}, ${result.manyToOnePropertyMap.get(property.id)?.name}`)
            }
            const association = associationMap.get(property.associationId)
            if (association === undefined) throw new Error(`[${property.associationId}] not found`)
            if (association.type !== "ManyToOne_Abstract") throw new Error(`[${association.id}] is not ManyToOne`)
            result.manyToOnePropertyMap.set(property.id, {...property, association})
        }

        if ("key" in property && property.key) {
            if (result.keyPropertyMap.has(property.id)) {
                throw new Error(`Duplicate keyProperty id (${property.id}): ${property.name}, ${getPropertyView(result.keyPropertyMap.get(property.id))}`)
            }
            result.keyPropertyMap.set(property.id, property)
        } else if ("logicalDelete" in property && property.logicalDelete) {
            if (result.logicalDeleteProperty !== undefined) {
                throw new Error(`Multiple logicalDeleteProperty: ${property.name}(${property.id}), ${getPropertyView(result.logicalDeleteProperty)}(${result.logicalDeleteProperty.id})`)
            }
            result.logicalDeleteProperty = property
        }

        if ("defaultOrderDirection" in property) {
            if (result.defaultOrderPropertyMap.has(property.id)) {
                throw new Error(`Duplicate defaultOrderProperty id (${property.id}): ${property.name}, ${getPropertyView(result.defaultOrderPropertyMap.get(property.id))}`)
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
        if (property.category === "SCALAR_COMMON") {
            if (result.scalarCommonPropertyMap.has(property.id)) {
                throw new Error(`Duplicate scalarCommonProperty id (${property.id}): ${property.name}, ${result.scalarCommonPropertyMap.get(property.id)?.name}`)
            }
            result.scalarCommonPropertyMap.set(property.id, property)
        } else if (property.category === "SCALAR_ENUM") {
            if (result.scalarEnumPropertyMap.has(property.id)) {
                throw new Error(`Duplicate scalarEnumProperty id (${property.id}): ${property.name}, ${result.scalarEnumPropertyMap.get(property.id)?.name}`)
            }
            result.scalarEnumPropertyMap.set(property.id, property)
        } else if (property.category === "SCALAR_EMBEDDABLE") {
            if (result.scalarEmbeddablePropertyMap.has(property.id)) {
                throw new Error(`Duplicate scalarEmbeddableProperty id (${property.id}): ${property.name}, ${result.scalarEmbeddablePropertyMap.get(property.id)?.name}`)
            }
            result.scalarEmbeddablePropertyMap.set(property.id, property)
        }
    }

    return result
}