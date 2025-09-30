export default Object.freeze({
    fileName: 'Property.d.ts',
    content: `type Property =
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
    | TransientProperty`,
})
