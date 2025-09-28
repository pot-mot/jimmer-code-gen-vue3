const toBaseProperty = (property: DeepReadonly<BaseProperty>): BaseProperty => {
    return {
        id: property.id,
        name: property.name,
        comment: property.comment,
        extraImports: Array.from(property.extraImports),
        extraAnnotations: Array.from(property.extraAnnotations),
        nullable: property.nullable,
    }
}

const createColumnInfo = (
    property: DeepReadonly<Property>,
    sqlType: DeepReadonly<TypeSelectPair["sqlType"]>
): ColumnProperty["columnInfo"] => {
    return {
        name: property.name,
        comment: property.comment,
        nullable: sqlType.nullable,
        type: sqlType.type,
        dataSize: sqlType.dataSize,
        numericPrecision: sqlType.numericPrecision,
    }
}

export const toIdProperty = (
    property: DeepReadonly<Property>,
    typePair: DeepReadonly<TypeSelectPair>
): IdProperty => {
    return {
        ...toBaseProperty(property),
        category: "ID",
        rawType: typePair.backEndType.rawType,
        extraImports: Array.from(typePair.backEndType.extraImports),
        columnInfo: createColumnInfo(property, typePair.sqlType),
        typeIsArray: false,
        nullable: false,
    }
}

export const toScalarProperty = (
    property: DeepReadonly<Property>,
    typePair: DeepReadonly<TypeSelectPair>
): ScalarProperty => {
    return {
        ...toBaseProperty(property),
        category: "SCALAR",
        rawType: typePair.backEndType.rawType,
        extraImports: Array.from(typePair.backEndType.extraImports),
        serialized: false,
        columnInfo: createColumnInfo(property, typePair.sqlType),
        typeIsArray: false,
    }
}

export const toEnumProperty = (
    property: DeepReadonly<Property>,
    enumeration: DeepReadonly<Enumeration>
): EnumProperty => {
    return {
        ...toBaseProperty(property),
        category: "ENUM",
        columnInfo: createColumnInfo(property),
        enumId: enumeration.id,
    }
}

export const toEmbeddableIdProperty = (
    property: DeepReadonly<Property>,
    embeddableType: DeepReadonly<EmbeddableType>
): IdProperty => {
    return {
        ...toBaseProperty(property),
        category: "ID",
        embeddableTypeId: embeddableType.id,
        propOverrides: [],
    }
}

export const toEmbeddableScalarProperty = (
    property: DeepReadonly<Property>,
    embeddableType: DeepReadonly<EmbeddableType>
): ScalarProperty => {
    return {
        ...toBaseProperty(property),
        category: "SCALAR",
        serialized: false,
        embeddableTypeId: embeddableType.id,
        propOverrides: [],
    }
}

export const toScalarLogicalDeleteProperty = (
    property: DeepReadonly<Property>,
): ScalarLogicalDeleteProperty => {
    return {
        ...toBaseProperty(property)
    }
}

export const toEnumLogicalDeleteProperty = (
    property: DeepReadonly<Property>,
): EnumLogicalDeleteProperty => {
    return {
        ...toBaseProperty(property)
    }
}

export const toManyToOneProperty = (
    property: DeepReadonly<Property>,
    entity: DeepReadonly<Entity>,
    associationId: string
): ManyToOneProperty => {
    return {
        ...toBaseProperty(property),
        category: "ManyToOne",
        associationId,
        referencedEntityId: entity.id,
        onDissociateAction: "NONE",
        idViewName: entity.name + "Id",
    }
}

