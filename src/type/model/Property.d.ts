type BaseProperty = {
    id: string
    name: string
    comment: string
    extraImports: string[]
    extraAnnotations: string[]
    nullable: boolean
}

type KeyProperty = {
    key: true
    keyGroups: string[]
}

type OrderDirection = "ASC" | "DESC"

type ColumnProperty = {
    columnInfo: Omit<Column, 'partOfPrimaryKey' | 'autoIncrement'>,
    defaultOrderDirection?: OrderDirection,
    typeIsArray: boolean
}

type EmbeddableProperty = {
    embeddableTypeId: string
    propOverrides: {
        propertyPath: string
        overrideColumnName: string
    }[]
}

type ScalarLogicalDeleteProperty = {
    logicalDelete: true
} & ({
    logicalDeleteType: 'boolean'
    logicalDeleteDefaultValue: boolean
} | {
    logicalDeleteType: 'int'
} | {
    logicalDeleteType: 'long'
} | {
    logicalDeleteType: 'uuid'
} | {
    logicalDeleteType: 'time'
    logicalDeleteDeletedValue: 'now' | 'null'
    nullable: true
})

type EnumLogicalDeleteProperty = {
    logicalDelete: true
    logicalDeleteType: 'enum'
    logicalDeleteDefaultValue: string
    logicalDeleteDeletedValue: string
}

type IdProperty = {
        category: "ID"
        rawType: string
        nullable: false
        generatedValue?:
            | { type: "IDENTITY" }
            | { type: "SEQUENCE", sequenceName: string }
            | { type: "UUID" }
            | { type: "CustomerIdGenerator", generatorName: string }
    }
    & Omit<BaseProperty, 'nullable'>
    & (ColumnProperty | EmbeddableProperty)

type VersionProperty = {
        category: "VERSION"
        nullable: false
    }
    & Omit<BaseProperty, 'nullable'>
    & { columnName: string }

type ScalarProperty = {
        category: "SCALAR"
        rawType: string
        serialized: boolean
        defaultValue?: string
    }
    & BaseProperty
    & (ColumnProperty | EmbeddableProperty)
    & ({} | KeyProperty | ScalarLogicalDeleteProperty)


type EnumProperty = {
        category: "ENUM"
        enumId: string
    }
    & BaseProperty
    & ColumnProperty
    & ({} | KeyProperty | EnumLogicalDeleteProperty)

type BaseAssociationProperty = {
    associationId: string
    referencedEntityId: string
    idViewName: string
}

type OnDissociationAction = "NONE" | "LAX" | "CHECK" | "SET_NULL" | "DELETE"

type OneToOneSourceProperty = {
    category: "OneToOne_Source"
    onDissociateAction: OnDissociationAction
} & BaseProperty & BaseAssociationProperty

type OneToOneMappedProperty = {
    category: "OneToOne_Mapped"
    mappedById: string
    nullable: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type OneToOneMappedAbstractProperty = Omit<OneToOneMappedProperty, 'category' | 'referencedEntityId'> & {
    category: "OneToOne_Mapped_Abstract"
    referencedAbstractEntityId: string
}

type ManyToOneProperty = {
    category: "ManyToOne"
    onDissociateAction: OnDissociationAction
} & BaseProperty & BaseAssociationProperty

type OneToManyProperty = {
    category: "OneToMany"
    mappedById: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type OneToManyAbstractProperty = Omit<OneToManyProperty, 'category' | 'referencedEntityId'> & {
    category: "OneToMany_Abstract"
    referencedAbstractEntityId: string
}

type ManyToManySourceProperty = {
    category: "ManyToMany_Source"
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type ManyToManyMappedProperty = {
    category: "ManyToMany_Mapped"
    mappedById: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type ManyToManyViewProperty = {
    category: "ManyToMany_View"
    baseToManyPropertyId: string
    deeperPropertyId: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'>

type GetterFormulaProperty = {
    category: "FORMULA_GETTER"
    dependencies: string[]
    body: string
    rawType: string
} & BaseProperty

type SqlFormulaProperty = {
    category: "FORMULA_SQL"
    sql: string
    rawType: string
    defaultOrderDirection?: OrderDirection
} & BaseProperty

type TransientProperty = {
    category: "TRANSIENT"
} & BaseProperty & ({
    rawType: string
} | {
    referencedEntityId: string
    resolver: string
    typeIsList: boolean
})

type EntityProperty =
    | IdProperty
    | VersionProperty
    | ScalarProperty
    | EnumProperty
    | OneToOneSourceProperty
    | OneToOneMappedProperty
    | ManyToOneProperty
    | OneToManyProperty
    | ManyToManySourceProperty
    | ManyToManyMappedProperty
    | ManyToManyViewProperty
    | GetterFormulaProperty
    | SqlFormulaProperty
    | TransientProperty

type MappedSuperClassProperty =
    | IdProperty
    | VersionProperty
    | ScalarProperty
    | EnumProperty
    | OneToOneSourceProperty
    | ManyToOneProperty
    | GetterFormulaProperty
    | SqlFormulaProperty
    | TransientProperty

type EmbeddableTypeProperty =
    | ScalarProperty
    | EnumProperty