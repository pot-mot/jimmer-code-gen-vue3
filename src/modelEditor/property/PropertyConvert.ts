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

export const idToggleType = (
    property: DeepReadonly<IdCommonProperty>,
    typePair: DeepReadonly<TypeSelectPair>
): IdCommonProperty => {
    return {
        ...toBaseProperty(property),
        category: "ID_COMMON",
        nullable: false,
        rawType: typePair.backEndType.rawType,
        extraImports: [...typePair.backEndType.extraImports, ...property.extraImports],
        columnInfo: createColumnInfo(property, typePair.sqlType),
    }
}

export const idToEmbeddableProperty = (
    property: DeepReadonly<IdCommonProperty>,
    embeddableType: DeepReadonly<EmbeddableType>
): IdEmbeddableProperty => {
    return {
        ...toBaseProperty(property),
        category: "ID_EMBEDDABLE",
        nullable: false,
        embeddableTypeId: embeddableType.id,
        propOverrides: [],
    }
}

export const toScalarCommonProperty = (
    property: DeepReadonly<Property>,
    typePair: DeepReadonly<TypeSelectPair>
): ScalarCommonProperty => {
    return {
        ...toBaseProperty(property),
        category: "SCALAR_COMMON",
        rawType: typePair.backEndType.rawType,
        extraImports: Array.from(typePair.backEndType.extraImports),
        serialized: false,
        columnInfo: createColumnInfo(property, typePair.sqlType),
        typeIsArray: false,
    }
}

export const toScalarEnumProperty = (
    property: DeepReadonly<Property>,
    enumeration: DeepReadonly<Enumeration>
): ScalarEnumProperty => {
    return {
        ...toBaseProperty(property),
        category: "SCALAR_ENUM",
        enumId: enumeration.id,
        defaultOrderDirection: undefined,
        columnInfo: createColumnInfo(property, {
            type: "VARCHAR",
            nullable: false,
            dataSize: 255,
            numericPrecision: undefined,
        }), // TODO
    }
}

export const toScalarEmbeddableProperty = (
    property: DeepReadonly<Property>,
    embeddableType: DeepReadonly<EmbeddableType>
): ScalarEmbeddableProperty => {
    return {
        ...toBaseProperty(property),
        category: "SCALAR_EMBEDDABLE",
        embeddableTypeId: embeddableType.id,
        propOverrides: [],
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
