export default Object.freeze({
    fileName: 'EmbeddableTypeGenerator.d.ts',
    content: `type EmbeddableTypeGenerator = (
    embeddableType: DeepReadonly<EmbeddableTypeWithCategoryProperties>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
