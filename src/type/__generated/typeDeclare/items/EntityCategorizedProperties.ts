export default Object.freeze({
    fileName: 'EntityCategorizedProperties.d.ts',
    content: `type EntityCategorizedProperties = {
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
}`,
})
