export default Object.freeze({
    fileName: 'ScalarProperty.d.ts',
    content: `type ScalarProperty = {
    category: "SCALAR"
    rawType: string
    serialized: boolean
    defaultValue: string
} & BaseProperty & (OptionalKeyProperty | OptionalLogicalDeleteProperty)
    & (ColumnProperty | EmbeddableProperty)
    & (
    { arrayType: false } |
    { arrayType: true, databaseType?: string }
    )`,
})
