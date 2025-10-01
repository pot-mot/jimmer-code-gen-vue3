export default Object.freeze({
    fileName: 'ScalarCommonProperty.d.ts',
    content: `type ScalarCommonProperty = {
        category: "SCALAR_COMMON"
        rawType: string
        serialized: boolean
        defaultValue?: string
        typeIsArray?: boolean
    }
    & BaseProperty
    & ColumnProperty
    & ({} | KeyProperty | LogicalDeleteProperty)`,
})
