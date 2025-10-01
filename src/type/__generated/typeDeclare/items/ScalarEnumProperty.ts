export default Object.freeze({
    fileName: 'ScalarEnumProperty.d.ts',
    content: `type ScalarEnumProperty = {
        category: "SCALAR_ENUM"
        enumId: string
    }
    & BaseProperty
    & ColumnProperty
    & ({} | KeyProperty | LogicalDeleteProperty)`,
})
