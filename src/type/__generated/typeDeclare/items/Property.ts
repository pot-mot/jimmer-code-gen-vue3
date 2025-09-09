export default Object.freeze({
    fileName: 'Property.d.ts',
    content: `type Property =
    | IdProperty
    | VersionProperty
    | ScalarProperty
    | EnumProperty
    | AssociationProperty
    | ManyToManyViewProperty
    | GetterFormulaProperty
    | SqlFormulaProperty
    | TransientProperty`,
})
