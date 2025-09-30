type Property =
    | IdCommonProperty
    | IdEmbeddableProperty
    | VersionProperty
    | ScalarCommonProperty
    | ScalarEnumProperty
    | ScalarEmbeddableProperty
    | OneToOneSourceProperty
    | OneToOneMappedProperty
    | OneToOneMappedAbstractProperty
    | ManyToOneProperty
    | OneToManyProperty
    | OneToManyAbstractProperty
    | ManyToManySourceProperty
    | ManyToManyMappedProperty
    | ManyToManyViewProperty
    | GetterFormulaProperty
    | SqlFormulaProperty
    | TransientProperty

type EntityWithProperties = Entity & {
    properties: EntityProperty[]
}

type EntityCategorizedProperties = {
    idProperty: IdCommonProperty | IdEmbeddableProperty
    keyPropertyMap: Map<string, Property & KeyProperty>
    logicalDeleteProperty?: Property & LogicalDeleteProperty
    versionProperty?: VersionProperty
    defaultOrderPropertyMap: Map<string, Property & { defaultOrderDirection?: OrderDirection }>

    scalarCommonPropertyMap: Map<string, ScalarCommonProperty>
    scalarEnumPropertyMap: Map<string, ScalarEnumProperty>
    scalarEmbeddablePropertyMap: Map<string, ScalarEmbeddableProperty>

    oneToOneSourcePropertyMap: Map<string, OneToOneSourceProperty & {association: OneToOneAssociation}>
    oneToOneMappedPropertyMap: Map<string, OneToOneMappedProperty & {association: OneToOneAssociation}>
    manyToOnePropertyMap: Map<string, ManyToOneProperty & {association: ManyToOneAssociation}>
    oneToManyPropertyMap: Map<string, OneToManyProperty & {association: ManyToOneAssociation}>
    manyToManySourcePropertyMap: Map<string, ManyToManySourceProperty & {association: ManyToManyAssociation}>
    manyToManyMappedPropertyMap: Map<string, ManyToManyMappedProperty & {association: ManyToManyAssociation}>

    manyToManyViewPropertyMap: Map<string, ManyToManyViewProperty>

    getterFormulaPropertyMap: Map<string, GetterFormulaProperty>
    sqlFormulaPropertyMap: Map<string, SqlFormulaProperty>
    transientPropertyMap: Map<string, TransientProperty>
}

type EntityWithCategorizedProperties = EntityWithProperties & EntityCategorizedProperties

type MappedSuperClassWithProperties = MappedSuperClass & {
    properties: MappedSuperClassProperty[]
}

type AbstractCategorizedProperties = Omit<EntityCategorizedProperties,
    | "idProperty"
    | "oneToOneSourcePropertyMap"
    | "oneToOneMappedPropertyMap"
    | "manyToOnePropertyMap"
    | "oneToManyPropertyMap"
    | "manyToManySourcePropertyMap"
    | "manyToManyMappedPropertyMap"
> & {
    idProperty?: IdCommonProperty | IdEmbeddableProperty
    oneToOneSourcePropertyMap: Map<string, OneToOneSourceProperty & {association: OneToOneAbstractAssociation}>
    manyToOnePropertyMap: Map<string, ManyToOneProperty & {association: ManyToOneAbstractAssociation}>
}

type MappedSuperClassWithCategorizedProperties = MappedSuperClassWithProperties & AbstractCategorizedProperties

type EmbeddableTypeWithProperties = EmbeddableType & {
    properties: EmbeddableTypeProperty[]
}

type CategorizedEmbeddableTypeProperties = Pick<EntityCategorizedProperties,
    | "scalarCommonPropertyMap"
    | "scalarEnumPropertyMap"
    | "scalarEmbeddablePropertyMap"
>

type EmbeddableTypeWithCategorizedProperties = EmbeddableTypeWithProperties & CategorizedEmbeddableTypeProperties