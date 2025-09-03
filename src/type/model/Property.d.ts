type BaseProperty = {
    id: string
    name: string
    comment: string
    extraImports: string[]
    extraAnnotations: string[]
    nullable: boolean
}

type OptionalKeyProperty = {
    key: true
    keyGroups: string[]
} | {
    key: false
}

type OptionalOrderProperty = {
    orderedProperty: false
} | {
    orderedProperty: true,
    orderDirection: "ASC" | "DESC"
}

type OptionalLogicalDeleteProperty = {
    logicalDelete: true
    logicalDeleteType: 'boolean'
    logicalDeleteDefaultValue: 'true' | 'false'
} | {
    logicalDelete: true
    logicalDeleteType: 'int'
} | {
    logicalDelete: true
    logicalDeleteType: 'long'
} | {
    logicalDelete: true
    logicalDeleteType: 'uuid'
} | {
    logicalDelete: true
    logicalDeleteType: 'time'
    logicalDeleteDeletedValue: 'now' | 'null'
    nullable: true
} | {
    logicalDelete: true
    logicalDeleteType: 'enum'
    logicalDeleteDefaultValue: string
    logicalDeleteDeletedValue: string
} | {
    logicalDelete: false
}

type ColumnProperty = {
    columnInfo: Omit<Column, 'id' | 'partOfPrimaryKey' | 'autoIncrement'>
} & OptionalOrderProperty

type EmbeddableProperty = {
    embeddableTypeId: string
    propOverrides: {
        propertyId: string
        overrideColumnName: string
    }[]
}

type IdProperty = {
    category: "id"
    rawType: string
    nullable: false
    GeneratedValue: {
        type: "IDENTITY"
    } | {
        type: "SEQUENCE"
        sequenceName: string
    } | {
        type: "UUID"
    } | {
        type: "CustomerIdGenerator",
        generatorName: string
    }
} & Omit<BaseProperty, 'nullable'> & (ColumnProperty | EmbeddableProperty)

type ScalarProperty = {
    category: "SCALAR"
    rawType: string
    serialized: boolean
    defaultValue: string
} & BaseProperty & (OptionalKeyProperty | OptionalLogicalDeleteProperty)
    & (ColumnProperty | EmbeddableProperty)
    & (
    { arrayType: false } |
    { arrayType: true, databaseType?: string }
    )

type EnumProperty = {
    category: "ENUM"
    enumId: string
} & BaseProperty & (
    OptionalKeyProperty |
    (OptionalLogicalDeleteProperty & ({ logicalDelete: false } | { logicalDelete: true; logicalDeleteType: 'enum' }))
    ) & ColumnProperty


type BaseAssociationProperty = {
    associationId: string
    entityId: string
    idViewName: string
}

type OnDissociationAction = "NONE" | "LAX" | "CHECK" | "SET_NULL" | "DELETE"

type OneToOneSourceProperty = {
    category: "ASSOCIATION_OneToOne_Source"
    onDissociateAction: OnDissociationAction
} & BaseProperty & BaseAssociationProperty

type OneToOneTargetProperty = {
    category: "ASSOCIATION_OneToOne_Target"
    mappedBy: string
    nullable: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type ManyToOneProperty = {
    category: "ASSOCIATION_ManyToOne"
    onDissociateAction: OnDissociationAction
} & BaseProperty & BaseAssociationProperty

type OneToManyProperty = {
    category: "ASSOCIATION_OneToMany"
    mappedBy: string
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
    mappedBy: string
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
    deeperAssociationPropertyId: string
}

type FormulaProperty = {
    category: "FORMULA"
    dependencies: string[]
    body: string
    rawType: string
} | ({
        category: "FORMULA"
        sql: string
        rawType: string
    } & OptionalOrderProperty)
    & BaseProperty

type TransientProperty = {
    category: "TRANSIENT"
} & BaseProperty & ({
    rawType: string
} | {
    entityId: string
    resolver: string
    typeIsList: boolean
})
