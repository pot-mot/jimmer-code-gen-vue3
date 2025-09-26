export default Object.freeze({
    fileName: 'EntityCategorizedProperties.d.ts',
    content: `type EntityCategorizedProperties = {
    idProperty: IdProperty
    keyPropertyMap: Map<string, Property & KeyProperty>
    logicalDeletedProperty?: (Property & (ScalarLogicalDeleteProperty | EnumLogicalDeleteProperty))
    versionProperty?: VersionProperty
    defaultOrderPropertyMap: Map<string, Property & { defaultOrderDirection?: OrderDirection }>

    scalarPropertyMap: Map<string, ScalarProperty>
    enumPropertyMap: Map<string, EnumProperty>

    columnPropertyMap: Map<string, Property & ColumnProperty>
    embeddablePropertyMap: Map<string, Property & EmbeddableProperty>

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
}`,
})
