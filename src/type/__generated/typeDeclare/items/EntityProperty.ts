export default Object.freeze({
    fileName: 'EntityProperty.d.ts',
    content: `type EntityProperty =
    | IdCommonProperty
    | IdEmbeddableProperty
    | VersionProperty
    | ScalarCommonProperty
    | ScalarEnumProperty
    | ScalarEmbeddableProperty
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
