export default Object.freeze({
    fileName: 'CategoryProperties.d.ts',
    content: `type CategoryProperties = {
    idProperty?: IdProperty
    keyPropertyMap: Map<string, BaseProperty & KeyProperty>
    logicalDeletedProperty?: (BaseProperty & (ScalarLogicalDeleteProperty | EnumLogicalDeleteProperty))
    versionProperty?: VersionProperty

    scalarPropertyMap: Map<string, ScalarProperty>
    enumPropertyMap: Map<string, EnumProperty>
    associationPropertyMap: Map<string, AssociationProperty>
    manyToManyViewPropertyMap: Map<string, ManyToManyViewProperty>
    getterFormulaPropertyMap: Map<string, GetterFormulaProperty>
    sqlFormulaPropertyMap: Map<string, SqlFormulaProperty>
    transientPropertyMap: Map<string, TransientProperty>
}`,
})
