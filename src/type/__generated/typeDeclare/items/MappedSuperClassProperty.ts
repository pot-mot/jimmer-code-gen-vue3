export default Object.freeze({
    fileName: 'MappedSuperClassProperty.d.ts',
    content: `type MappedSuperClassProperty =
    | IdCommonProperty
    | IdEmbeddableProperty
    | VersionProperty
    | ScalarCommonProperty
    | ScalarEnumProperty
    | ScalarEmbeddableProperty
    | OneToOneSourceProperty
    | ManyToOneProperty
    | GetterFormulaProperty
    | SqlFormulaProperty
    | TransientProperty`,
})
