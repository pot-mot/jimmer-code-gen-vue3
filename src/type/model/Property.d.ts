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

type LogicalDeleteProperty = {
    logicalDelete: true
}

type OrderDirection = "ASC" | "DESC"

type ColumnInfo = Omit<Column, 'partOfPrimaryKey' | 'autoIncrement'>

type ColumnProperty = {
    columnInfo: ColumnInfo
    autoSyncColumnName: boolean
    defaultOrderDirection?: OrderDirection
}

type ColumnNameOverride = {
    propertyPath: string
    overrideColumnName: string
}

type EmbeddableProperty = {
    embeddableTypeId: string
    columnNameOverrides: ColumnNameOverride[]
}

type IdCommonProperty = {
        category: "ID_COMMON"
        nullable: false
        rawType: string
        generatedValue?:
            | { type: "IDENTITY" }
            | { type: "SEQUENCE", sequenceName: string }
            | { type: "UUID" }
            | { type: "CustomerIdGenerator", generatorName: string }
    }
    & Omit<BaseProperty, 'nullable'>
    & ColumnProperty

type IdEmbeddableProperty = {
        category: "ID_EMBEDDABLE"
        nullable: false
        generatedValue?: { type: "CustomerIdGenerator", generatorName: string }
    }
    & Omit<BaseProperty, 'nullable'>
    & EmbeddableProperty

type VersionProperty = {
        category: "VERSION"
        nullable: false
        rawType: string
    }
    & Omit<BaseProperty, 'nullable'>
    & ColumnProperty

type ScalarCommonProperty = {
        category: "SCALAR_COMMON"
        rawType: string
        serialized: boolean
        defaultValue?: string
        typeIsArray?: boolean
    }
    & BaseProperty
    & ColumnProperty
    & ({} | KeyProperty | LogicalDeleteProperty)

type ScalarEnumProperty = {
        category: "SCALAR_ENUM"
        enumId: string
    }
    & BaseProperty
    & ColumnProperty
    & ({} | KeyProperty | LogicalDeleteProperty)

type ScalarEmbeddableProperty = {
        category: "SCALAR_EMBEDDABLE"
    }
    & BaseProperty
    & EmbeddableProperty

type BaseAssociationProperty = {
    associationId: string
    referencedEntityId: string
    idViewName: string
    idViewNameTemplate: string
    useIdViewNameTemplate: boolean
}

type OnDissociationAction = "NONE" | "LAX" | "CHECK" | "SET_NULL" | "DELETE"

type OneToOneSourceProperty = {
    category: "OneToOne_Source"
    typeIsList: false
    autoGenerateJoinInfo: boolean
    onDissociateAction: OnDissociationAction
} & ({ joinInfo: FkJoinInfo, nullable: boolean } | { joinInfo: MidTableJoinInfo, nullable: true })
    & Omit<BaseProperty, 'nullable'>
    & BaseAssociationProperty
    & ({} | KeyProperty)

type OneToOneMappedProperty = {
    category: "OneToOne_Mapped"
    typeIsList: false
    mappedById: string
    nullable: true
    nameTemplate: string
    useNameTemplate: boolean
    commentTemplate: string
    useCommentTemplate: boolean
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type OneToOneMappedAbstractProperty = Omit<OneToOneMappedProperty,
    'category' | 'referencedEntityId' |
    'name' | 'comment' | 'idViewName' |
    'useNameTemplate' | 'useCommentTemplate' | 'useIdViewNameTemplate'
> & {
    category: "OneToOne_Mapped_Abstract"
    referencedAbstractEntityId: string
}

type ManyToOneProperty = {
    category: "ManyToOne"
    typeIsList: false
    autoGenerateJoinInfo: boolean
    onDissociateAction: OnDissociationAction
} & ({ joinInfo: FkJoinInfo, nullable: boolean } | { joinInfo: MidTableJoinInfo, nullable: true })
    & Omit<BaseProperty, 'nullable'>
    & BaseAssociationProperty
    & ({} | KeyProperty)

type OneToManyProperty = {
    category: "OneToMany"
    typeIsList: true
    mappedById: string
    nullable: false
    nameTemplate: string
    useNameTemplate: boolean
    commentTemplate: string
    useCommentTemplate: boolean
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type OneToManyAbstractProperty = Omit<OneToManyProperty,
    'category' | 'referencedEntityId' |
    'name' | 'comment' | 'idViewName' |
    'useNameTemplate' | 'useCommentTemplate' | 'useIdViewNameTemplate'
> & {
    category: "OneToMany_Abstract"
    referencedAbstractEntityId: string
}

type ManyToManySourceProperty = {
    category: "ManyToMany_Source"
    typeIsList: true
    joinInfo: MidTableJoinInfo
    autoGenerateJoinInfo: boolean
    nullable: false
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type ManyToManyMappedProperty = {
    category: "ManyToMany_Mapped"
    typeIsList: true
    mappedById: string
    nullable: false
    nameTemplate: string
    useNameTemplate: boolean
    commentTemplate: string
    useCommentTemplate: boolean
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty

type ManyToManyMappedAbstractProperty = Omit<ManyToManyMappedProperty,
    'category' | 'referencedEntityId' |
    'name' | 'comment' | 'idViewName' |
    'useNameTemplate' | 'useCommentTemplate' | 'useIdViewNameTemplate'
> & {
    category: "ManyToMany_Mapped_Abstract"
    referencedAbstractEntityId: string
}

type ManyToManyViewProperty = {
    category: "ManyToMany_View"
    typeIsList: true
    baseToManyPropertyId: string
    deeperPropertyId: string
    nullable: false
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
    | IdCommonProperty
    | IdEmbeddableProperty
    | VersionProperty
    | ScalarCommonProperty
    | ScalarEnumProperty
    | ScalarEmbeddableProperty
    | OneToOneSourceProperty
    | ManyToOneProperty
    | ManyToManySourceProperty
    | ManyToManyViewProperty
    | GetterFormulaProperty
    | SqlFormulaProperty
    | TransientProperty

type MappedSuperClassProperty =
    | IdCommonProperty
    | IdEmbeddableProperty
    | VersionProperty
    | ScalarCommonProperty
    | ScalarEnumProperty
    | ScalarEmbeddableProperty
    | OneToOneSourceProperty
    | ManyToOneProperty
    | ManyToManySourceProperty
    | GetterFormulaProperty
    | SqlFormulaProperty
    | TransientProperty

type EmbeddableTypeProperty =
    | ScalarCommonProperty
    | ScalarEnumProperty
    | ScalarEmbeddableProperty
