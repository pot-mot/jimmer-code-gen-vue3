export default {
    fileName: 'EmbeddableProperty.d.ts',
    content: `type EmbeddableProperty = {
    embeddableTypeName: string
    propOverrides: {
        propertyName: string
        overrideColumnName: string
    }[]
}`,
}
