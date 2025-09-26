export default Object.freeze({
    fileName: 'EntityProperty.d.ts',
    content: `type EntityProperty =
    | IdProperty
    | VersionProperty
    | ScalarProperty
    | EnumProperty
    | OneToOneSourceProperty
    | OneToOneMappedProperty
    | ManyToOneProperty
    | OneToManyProperty
    | ManyToManySourceProperty
    | ManyToManyMappedProperty
    | ManyToManyViewProperty
    | GetterFormulaProperty
    | SqlFormulaProperty
    | TransientProperty`,
})
