export default Object.freeze({
    fileName: 'TableGenerator.d.ts',
    content: `type TableGenerator = (
    table: DeepReadonly<Table>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
