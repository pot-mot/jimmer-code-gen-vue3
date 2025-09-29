export default Object.freeze({
    fileName: 'IdProperty.d.ts',
    content: `type IdProperty = {
        category: "ID"
        rawType: string
        nullable: false
        generatedValue?:
            | { type: "IDENTITY" }
            | { type: "SEQUENCE", sequenceName: string }
            | { type: "UUID" }
            | { type: "CustomerIdGenerator", generatorName: string }
    }
    & Omit<BaseProperty, 'nullable'>
    & (ColumnProperty | EmbeddableProperty)`,
})
