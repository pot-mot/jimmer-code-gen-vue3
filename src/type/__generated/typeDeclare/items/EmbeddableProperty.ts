export default Object.freeze({
    fileName: 'EmbeddableProperty.d.ts',
    content: `type EmbeddableProperty = {
    embeddableTypeId: string
    propOverrides: {
        propertyPath: string
        overrideColumnName: string
    }[]
}`,
})
