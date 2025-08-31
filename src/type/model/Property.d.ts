type BaseProperty = {
    id: string
    name: string
    comment: string
    extraImports: string[]
    extraAnnotations: string[]
    nullable: boolean
}

type ColumnProperty = {
    columnInfo: Omit<Column, 'id'>
}

type OptionalKeyProperty = {
    key: true
    keyGroups: string[]
} | {
    key: false
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
    category: "scalar"
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
    category: "enum"
    enumId: string
} & BaseProperty & (
    OptionalKeyProperty |
    (OptionalLogicalDeleteProperty & ({ logicalDelete: false } | { logicalDelete: true; logicalDeleteType: 'enum' }))
    ) & ColumnProperty

type EntityTypeProperty = {
    entityId: string
}

type OnDissociationAction = "NONE" | "LAX" | "CHECK" | "SET_NULL" | "DELETE"

type OneToOneSourceProperty = {
    category: "OneToOne_Source"
    associationId: string
    idView?: {
        name: string
    }
    onDissociateAction: OnDissociationAction
} & BaseProperty & EntityTypeProperty & (ColumnProperty | EmbeddableProperty)

type OneToOneTargetProperty = {
    category: "OneToOne_Target"
    associationId: string
    idView: {
        name: string
    }
    mappedBy: string
    nullable: true
} & Omit<BaseProperty, 'nullable'> & EntityTypeProperty

type ManyToOneProperty = {
    category: "ManyToOne"
    associationId: string
    idView: {
        name: string
    }
    onDissociateAction: OnDissociationAction
} & BaseProperty & EntityTypeProperty & (
    ({
        joinColumnName: string
    } & ColumnProperty) |
    ({
        joinColumnNames: string[]
    } & EmbeddableProperty)
    )

type OneToManyProperty = {
    category: "OneToMany"
    associationId: string
    idView: {
        name: string
    }
    mappedBy: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & EntityTypeProperty

type ManyToManySourceProperty = {
    category: "ManyToMany_Source"
    associationId: string
    idView: {
        name: string
    }
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & EntityTypeProperty & (
    ({
        joinTableName: string
        joinColumnName: string
        inverseJoinColumnName: string
    } & ColumnProperty) |
    ({
        joinTableName: string
        joinColumns: {
            joinColumnName: string
            inverseJoinColumnName: string
        }[]
    } & EmbeddableProperty)
    )

type ManyToManyTargetProperty = {
    category: "ManyToMany_Target"
    associationId: string
    idView: {
        name: string
    }
    mappedBy: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & EntityTypeProperty

type AssociationProperty =
    OneToOneSourceProperty |
    OneToOneTargetProperty |
    OneToManyProperty |
    ManyToOneProperty |
    ManyToManySourceProperty |
    ManyToManyTargetProperty

type ManyToManyViewProperty = {
    category: "ManyToMany_View"
    baseToManyPropertyId: string
    deeperAssociationPropertyId: string
} & EntityTypeProperty

type FormulaProperty = {
    category: "Formula"
    dependencies: string[]
    body: string
    rawType: string
} | {
    category: "Formula"
    sql: string
    rawType: string
} & BaseProperty

type TransientProperty = {
    category: "Transient"
    resolver?: string
} & BaseProperty & (
    { rawType: string } |
    EntityTypeProperty
    )
