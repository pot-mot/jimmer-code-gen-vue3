import type {ScriptInfo} from "@/modelEditor/generator/ScriptsStore.ts";
import {pgTableGenerator} from "@/type/script/default/TableGenerator/pgTableGenerator.ts";

const scriptInfo: ScriptInfo<"TableGenerator"> = {
    id: "pgTableGenerator",
    name: "pgTableGenerator",
    type: "TableGenerator",
    enabled: true,
    databaseType: "POSTGRESQL",
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
    column.otherConstraints ? column.otherConstraints.join(' ') : ''
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
        execute: pgTableGenerator
    }
}

export default scriptInfo
