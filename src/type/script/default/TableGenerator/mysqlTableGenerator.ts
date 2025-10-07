export const mysqlTableGenerator: TableGenerator = (
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>,
) => {
    const baseDir = "/sql"
    const result: Record<string, string> = {}

    const createTableStatementMap = new Map<string, string>()
    for (const table of tables) {
        createTableStatementMap.set(
            table.name,
            `CREATE TABLE ${table.name}
(
${table.columns.map(column => `    ${column.name} ${column.type} ${
    column.nullable ? '' : 'NOT NULL'
} ${
    column.defaultValue ? `DEFAULT ${column.defaultValue}` : ''
} ${
    column.autoIncrement ? 'AUTO INCREMENT' : ''
} ${
    column.otherConstraints ? column.otherConstraints.join(' ') : ''
}`).join("\n")}
)
`
        )
    }

    for (const [tableName, createTableStatement] of createTableStatementMap) {
        result[`${baseDir}/${tableName}/${tableName}.sql`] = createTableStatement
    }
    result[`${baseDir}/all-tables.sql`] = [...createTableStatementMap.values()].join("\n")

    return result
}