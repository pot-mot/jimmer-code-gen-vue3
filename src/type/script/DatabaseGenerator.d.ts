type TableGenerator = (
    table: DeepReadonly<Table>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type TableDiffGenerator = (
    oldTable: DeepReadonly<Table>,
    newTable: DeepReadonly<Table>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>