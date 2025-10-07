import type {ScriptInfo} from "@/modelEditor/generator/ScriptsStore.ts";
import {mysqlTableGenerator} from "@/type/script/default/TableGenerator/mysqlTableGenerator.ts";

const scriptInfo: ScriptInfo<"TableGenerator"> = {
    key: "mysqlTableGenerator",
    name: "Table Generator - MySQL",
    type: "TableGenerator",
    enabled: true,
    databaseType: "MYSQL",
    jvmLanguage: "ANY",
    script: {
        code: `
(
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>,
) => {
    const baseDir = "/sql"
    const result: Record<string, string> = {}

    const createTableStatementMap = new Map<string, string>()
    for (const table of tables) {
        createTableStatementMap.set(
            table.name,
            \`CREATE TABLE \${table.name}
(
\${table.columns.map(column => \`    \${column.name} \${column.type} \${
        column.nullable ? '' : 'NOT NULL'
    } \${
        column.defaultValue ? \`DEFAULT \${column.defaultValue}\` : ''
    } \${
        column.autoIncrement ? 'AUTO INCREMENT' : ''
    } \${
        column.otherConstraints ? column.otherConstraints.join(' ') : ''
    }\`).join("\\n")}
)
\`
        )
    }

    for (const [tableName, createTableStatement] of createTableStatementMap) {
        result[\`\${baseDir}/\${tableName}/\${tableName}.sql\`] = createTableStatement
    }
    result[\`\${baseDir}/all-tables.sql\`] = [...createTableStatementMap.values()].join("\\n")

    return result
}
`,
        execute: mysqlTableGenerator
    },
}

export default scriptInfo