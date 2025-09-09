export default Object.freeze({
    fileName: 'EntityGenerator.d.ts',
    content: `type EntityGenerator = (
    entity: DeepReadonly<EntityWithCategorizedProperties>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
