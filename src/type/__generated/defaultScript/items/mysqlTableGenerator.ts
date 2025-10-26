import type {ScriptInfo} from "@/modelEditor/generator/ScriptsStore.ts";
import {mysqlTableGenerator} from "@/type/script/default/TableGenerator/mysqlTableGenerator.ts";

const scriptInfo: ScriptInfo<"TableGenerator"> = {
    id: "mysqlTableGenerator",
    name: "mysqlTableGenerator",
    type: "TableGenerator",
    enabled: true,
    databaseType: "MYSQL",
    jvmLanguage: "ANY",
    script: {
        code: `(
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>,
) => {
    const baseDir = "/sql"
    const result: Record<string, string> = {}

    const statementMap = new Map<string, {
        createTable: string,
        createIndexes: string[],
        createForeignKeys: string[],
    }>()

    for (const table of tables) {
        statementMap.set(
            table.name,
            {
                createTable: \`CREATE TABLE \${table.name}
(
\${table.columns.map(column => \`    \${column.name} \${column.type} \${
    column.nullable ? '' : 'NOT NULL'
} \${
    column.defaultValue ? \`DEFAULT \${column.defaultValue}\` : ''
} \${
    column.autoIncrement ? 'AUTO INCREMENT' : ''
} \${
    column.otherConstraints ? column.otherConstraints.join(' ') : ''
} \${
    column.comment ? \`COMMENT '\${column.comment}'\` : ''
}\`.trimEnd()).join(",\\n")},
    PRIMARY KEY (\${table.columns.filter(it => it.partOfPrimaryKey).map(it => it.name).join(", ")})
);
\`,
                createForeignKeys: table.foreignKeys.map(foreignKey => \`ALTER TABLE \${table.name}
    ADD CONSTRAINT \${foreignKey.name}
        FOREIGN KEY (\${foreignKey.columnRefs.map(it => it.columnName).join(", ")}) 
            REFERENCES \${foreignKey.referencedTableName} (\${foreignKey.columnRefs.map(it => it.referencedColumnName).join(", ")});
\`),
                createIndexes: table.indexes.map(index => \`CREATE \${index.uniqueIndex ? "UNIQUE" : ""} INDEX \${index.name} ON \${table.name} (\${index.columnNames.join(", ")});\`)
            },
        )
    }

    for (const [tableName, {createTable, createIndexes, createForeignKeys}] of statementMap) {
        result[\`\${baseDir}/tables/\${tableName}.sql\`] = \`\${createTable}\\n\${createIndexes.join("\\n")}\\n\${createForeignKeys.join("\\n")}\`
    }

    const allTableStatements: string[] = []
    for (const {createTable, createIndexes} of statementMap.values()) {
        allTableStatements.push(createTable)
        allTableStatements.push(...createIndexes)
    }
    for (const {createForeignKeys} of statementMap.values()) {
        allTableStatements.push(...createForeignKeys)
    }
    result[\`\${baseDir}/all-tables.sql\`] = allTableStatements.join("\\n")

    return result
}`,
        execute: mysqlTableGenerator
    }
}

export default scriptInfo
