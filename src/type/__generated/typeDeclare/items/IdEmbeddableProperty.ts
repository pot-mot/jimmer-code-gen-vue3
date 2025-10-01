export default Object.freeze({
    fileName: 'IdEmbeddableProperty.d.ts',
    content: `type IdEmbeddableProperty = {
        category: "ID_EMBEDDABLE"
        nullable: false
        generatedValue?: { type: "CustomerIdGenerator", generatorName: string }
    }
    & Omit<BaseProperty, 'nullable'>
    & EmbeddableProperty`,
})
