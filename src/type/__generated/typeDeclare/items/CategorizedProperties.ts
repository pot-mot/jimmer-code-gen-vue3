export default Object.freeze({
    fileName: 'CategorizedProperties.d.ts',
    content: `type CategorizedProperties = {
    idProperty?: IdProperty
    keyPropertyMap: Map<string, Property & KeyProperty>
    logicalDeletedProperty?: (Property & (ScalarLogicalDeleteProperty | EnumLogicalDeleteProperty))
    versionProperty?: VersionProperty
    defaultOrderPropertyMap: Map<string, Property & { defaultOrderDirection?: OrderDirection }>

    scalarPropertyMap: Map<string, ScalarProperty>
    enumPropertyMap: Map<string, EnumProperty>

    columnPropertyMap: Map<string, Property & ColumnProperty>
    embeddablePropertyMap: Map<string, Property & EmbeddableProperty>

    associationPropertyMap: Map<string, AssociationProperty>
    oneToOneSourcePropertyMap: Map<string, OneToOneSourceProperty>
    oneToOneTargetPropertyMap: Map<string, OneToOneTargetProperty>
    oneToManyPropertyMap: Map<string, OneToManyProperty>
    manyToOnePropertyMap: Map<string, ManyToOneProperty>
    manyToManySourcePropertyMap: Map<string, ManyToManySourceProperty>
    manyToManyTargetPropertyMap: Map<string, ManyToManyTargetProperty>

    manyToManyViewPropertyMap: Map<string, ManyToManyViewProperty>

    getterFormulaPropertyMap: Map<string, GetterFormulaProperty>
    sqlFormulaPropertyMap: Map<string, SqlFormulaProperty>
    transientPropertyMap: Map<string, TransientProperty>
}`,
})
