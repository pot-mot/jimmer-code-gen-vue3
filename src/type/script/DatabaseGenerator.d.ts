type TableGenerator = (
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type TableDiffGenerator = (
    oldTables: DeepReadonly<Table[]>,
    newTables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>
