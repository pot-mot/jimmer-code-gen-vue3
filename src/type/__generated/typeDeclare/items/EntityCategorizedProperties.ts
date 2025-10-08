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

    oneToOneSourcePropertyMap: Map<string, OneToOneSourceProperty & {association: OneToOneAssociationIdOnly}>
    oneToOneMappedPropertyMap: Map<string, OneToOneMappedProperty & {association: OneToOneAssociationIdOnly}>
    manyToOnePropertyMap: Map<string, ManyToOneProperty & {association: ManyToOneAssociationIdOnly}>
    oneToManyPropertyMap: Map<string, OneToManyProperty & {association: ManyToOneAssociationIdOnly}>
    manyToManySourcePropertyMap: Map<string, ManyToManySourceProperty & {association: ManyToManyAssociationIdOnly}>
    manyToManyMappedPropertyMap: Map<string, ManyToManyMappedProperty & {association: ManyToManyAssociationIdOnly}>

    manyToManyViewPropertyMap: Map<string, ManyToManyViewProperty>

    getterFormulaPropertyMap: Map<string, GetterFormulaProperty>
    sqlFormulaPropertyMap: Map<string, SqlFormulaProperty>
    transientPropertyMap: Map<string, TransientProperty>
}`,
})
