type TableGenerator = (
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type TableDiffGenerator = (
    tablePairs: DeepReadonly<{oldTable: Table, newTable: Table}[]>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>
