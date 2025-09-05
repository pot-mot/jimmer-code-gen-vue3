export default Object.freeze({
    fileName: 'EmbeddableTypeGenerator.d.ts',
    content: `type EmbeddableTypeGenerator = (
    embeddableType: DeepReadonly<EmbeddableType>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
