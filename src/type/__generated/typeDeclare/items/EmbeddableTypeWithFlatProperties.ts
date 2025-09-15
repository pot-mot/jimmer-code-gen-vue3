export default Object.freeze({
    fileName: 'EmbeddableTypeWithFlatProperties.d.ts',
    content: `type EmbeddableTypeWithFlatProperties = EmbeddableTypeWithCategorizedProperties & {
    allProperties: EmbeddableTypeProperty[],
    allCategorizedProperties: CategorizedEmbeddableTypeProperties,
}`,
})
