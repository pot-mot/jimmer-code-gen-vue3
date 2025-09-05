export default Object.freeze({
    fileName: 'ModelGenerator.d.ts',
    content: `type ModelGenerator = (
    model: DeepReadonly<Model>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
