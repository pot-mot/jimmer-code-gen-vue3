export default Object.freeze({
    fileName: 'VersionProperty.d.ts',
    content: `type VersionProperty = {
        category: "VERSION"
        nullable: false
    }
    & Omit<BaseProperty, 'nullable'>
    & { columnName: string }`,
})
