export default Object.freeze({
    fileName: 'TableDiffGenerator.d.ts',
    content: `type TableDiffGenerator = (
    oldTables: DeepReadonly<Table[]>,
    newTables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
