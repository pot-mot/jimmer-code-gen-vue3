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
    columnInfo: Omit<Column, 'id' | 'partOfPrimaryKey' | 'autoIncrement'>,
    defaultOrderDirection?: OrderDirection
} & (
    | { typeIsArray: false }
    | { typeIsArray: true, databaseType?: string }
    )

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
    & ((ColumnProperty & { typeIsArray: false }) | EmbeddableProperty)

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
    referenceEntityId: string
    idViewName: string
}

type OnDissociationAction = "NONE" | "LAX" | "CHECK" | "SET_NULL" | "DELETE"

type OneToOneSourceProperty = {
    category: "ASSOCIATION_OneToOne_Source"
    onDissociateAction: OnDissociationAction
} & BaseProperty & BaseAssociationProperty

type OneToOneTargetProperty = {
    category: "ASSOCIATION_OneToOne_Target"
    mappedById: string
    nullable: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type ManyToOneProperty = {
    category: "ASSOCIATION_ManyToOne"
    onDissociateAction: OnDissociationAction
} & BaseProperty & BaseAssociationProperty

type OneToManyProperty = {
    category: "ASSOCIATION_OneToMany"
    mappedById: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type ManyToManySourceProperty = {
    category: "ASSOCIATION_ManyToMany_Source"
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type ManyToManyTargetProperty = {
    category: "ASSOCIATION_ManyToMany_Target"
    mappedById: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type AssociationProperty =
    OneToOneSourceProperty |
    OneToOneTargetProperty |
    OneToManyProperty |
    ManyToOneProperty |
    ManyToManySourceProperty |
    ManyToManyTargetProperty

type ManyToManyViewProperty = {
    category: "ASSOCIATION_ManyToMany_View"
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
    referenceEntityId: string
    resolver: string
    typeIsList: boolean
})

type Property =
    | IdProperty
    | VersionProperty
    | ScalarProperty
    | EnumProperty
    | AssociationProperty
    | ManyToManyViewProperty
    | GetterFormulaProperty
    | SqlFormulaProperty
    | TransientProperty

type EmbeddableTypeProperty =
    | ScalarProperty
    | EnumProperty