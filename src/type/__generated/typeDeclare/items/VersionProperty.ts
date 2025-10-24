export default Object.freeze({
    fileName: 'VersionProperty.d.ts',
    content: `type VersionProperty = {
        category: "VERSION"
        nullable: false
        rawType: string
    }
    & Omit<BaseProperty, 'nullable'>
    & ColumnProperty`,
})
