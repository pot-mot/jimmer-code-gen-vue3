type TableGenerator = (
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

