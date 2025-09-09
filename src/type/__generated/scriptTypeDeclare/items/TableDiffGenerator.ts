export default Object.freeze({
    fileName: 'TableDiffGenerator.d.ts',
    content: `type TableDiffGenerator = (
    tablePairs: DeepReadonly<{oldTable: Table, newTable: Table}[]>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
