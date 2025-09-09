export default Object.freeze({
    fileName: 'EnumProperty.d.ts',
    content: `type EnumProperty = {
        category: "ENUM"
        enumId: string
    }
    & BaseProperty
    & ColumnProperty
    & ({} | KeyProperty | EnumLogicalDeleteProperty)`,
})
