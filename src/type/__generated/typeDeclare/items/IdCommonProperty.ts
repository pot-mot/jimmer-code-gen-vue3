export default Object.freeze({
    fileName: 'IdCommonProperty.d.ts',
    content: `type IdCommonProperty = {
        category: "ID_COMMON"
        nullable: false
        rawType: string
        generatedValue?:
            | { type: "IDENTITY" }
            | { type: "SEQUENCE", sequenceName: string }
            | { type: "UUID" }
            | { type: "CustomerIdGenerator", generatorName: string }
    }
    & Omit<BaseProperty, 'nullable'>
    & ColumnProperty`,
})
