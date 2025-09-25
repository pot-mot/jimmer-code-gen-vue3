export default Object.freeze({
    fileName: 'Property.d.ts',
    content: `type Property =
    | IdProperty
    | VersionProperty
    | ScalarProperty
    | EnumProperty
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
