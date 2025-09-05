export default Object.freeze({
    fileName: 'TableDiffGenerator.d.ts',
    content: `type TableDiffGenerator = (
    oldTable: DeepReadonly<Table>,
    newTable: DeepReadonly<Table>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
