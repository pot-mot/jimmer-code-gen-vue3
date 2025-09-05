export default Object.freeze({
    fileName: 'EmbeddableProperty.d.ts',
    content: `type EmbeddableProperty = {
    embeddableTypeId: string
    propOverrides: {
        propertyId: string
        overrideColumnName: string
    }[]
}`,
})
