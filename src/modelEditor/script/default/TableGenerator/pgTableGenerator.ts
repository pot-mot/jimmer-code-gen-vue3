// databaseType=POSTGRESQL
export const pgTableGenerator: TableGenerator = (
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
): Record<string, string> => {
    const result: Record<string, string> = {}

    const statementMap = new Map<string, {
        createTable: string,
        createIndexes: string[],
        createForeignKeys: string[],
        createChecks: string[],
        addComments: string[],
    }>()

    const template = context.createTemplateBuilder({
        indent: "    ",
        scope: {start: "", end: ""}
    })

    for (const table of tables) {
        template.appendLine(`CREATE TABLE ${table.name}`)
        template.startScope("(")
        const pkColumns: DeepReadonly<Column>[] = []
        for (const column of table.columns) {
            template.append(column.name)
            template.append(" ")
            template.append(column.type)
            if (!column.nullable) {
                template.append(" NOT NULL")
            }
            if (column.defaultValue) {
                template.append(" DEFAULT ")
                template.append(column.defaultValue)
            }
            template.appendLine(",")
            if (column.partOfPrimaryKey) {
                pkColumns.push(column)
            }
        }
        template.appendLine(`PRIMARY KEY (${pkColumns.map(it => it.name).join(", ")})`)
        template.endScope(");")
        const createTable = template.build({cleanEmptyLineIndent: true})
        template.clean()

        const createForeignKeys: string[] =[]
        for (const foreignKey of table.foreignKeys) {
            template.append(`ALTER TABLE ${table.name}`)
            template.append(` ADD CONSTRAINT ${foreignKey.name}`)
            template.append(` FOREIGN KEY (${foreignKey.columnRefs.map(it => it.columnName).join(", ")})`)
            template.append(` REFERENCES ${foreignKey.referencedTableName}`)
            template.append(` (${foreignKey.columnRefs.map(it => it.referencedColumnName).join(", ")})`)
            if (foreignKey.onUpdate) {
                template.append(` ON UPDATE ${foreignKey.onUpdate}`)
            }
            if (foreignKey.onDelete) {
                template.append(` ON DELETE ${foreignKey.onDelete}`)
            }
            template.appendLine(";")

            createForeignKeys.push( template.build({cleanEmptyLineIndent: true}))
            template.clean()
        }

        const createIndexes: string[] = []
        for (const index of table.indexes) {
            template.append("CREATE")
            if (index.uniqueIndex) {
                template.append(" UNIQUE")
            }
            template.append(" INDEX ")
            template.append(index.name)
            template.append(" ON ")
            template.append(table.name)
            template.append(` (${index.columnNames.join(", ")})`)
            if (index.wherePredicates) {
                template.append(' WHERE')
                template.append(` ${index.wherePredicates}`)
            }
            template.appendLine(";")
            createIndexes.push( template.build({cleanEmptyLineIndent: true}))
            template.clean()
        }

        const createChecks: string[] = []
        for (const check of table.checks) {
            template.append("ALTER TABLE ")
            template.append(table.name)
            template.append(" ADD CONSTRAINT ")
            template.append(check.name)
            template.append(" CHECK ")
            template.append(check.expression)
            template.appendLine(";")
            createIndexes.push(template.build({cleanEmptyLineIndent: true}))
            template.clean()
        }

        const addComments: string[] = []
        template.append("COMMENT ON TABLE ")
        template.append(table.name)
        template.appendLine(` IS '${table.comment}';`)
        addComments.push(template.build({cleanEmptyLineIndent: true}))
        template.clean()
        for (const column of table.columns) {
            template.append("COMMENT ON COLUMN ")
            template.append(table.name)
            template.append(".")
            template.append(column.name)
            template.append(" IS '")
            template.append(column.comment)
            template.append("';")
            addComments.push(template.build({cleanEmptyLineIndent: true}))
            template.clean()
        }

        // TODO add comment
        statementMap.set(
            table.name,
            {
                createTable,
                createForeignKeys,
                createIndexes,
                createChecks,
                addComments,
            },
        )
    }

    for (const [tableName, {
        createTable,
        createIndexes,
        createForeignKeys,
        createChecks,
        addComments,
    }] of statementMap) {
        template.appendBlock(createTable)
        if (createIndexes.length > 0) {
            template.appendLine()
            for (const createIndex of createIndexes) {
                template.appendBlock(createIndex)
            }
        }
        if (createForeignKeys.length > 0) {
            template.appendLine()
            for (const createForeignKey of createForeignKeys) {
                template.appendBlock(createForeignKey)
            }
        }
        if (createChecks.length > 0) {
            template.appendLine()
            for (const createCheck of createChecks) {
                template.appendBlock(createCheck)
            }
        }
        if (addComments.length > 0) {
            template.appendLine()
            for (const addComment of addComments) {
                template.appendBlock(addComment)
            }
        }

        result[`/sql/tables/${tableName}.sql`] = template.build({cleanEmptyLineIndent: true})
        template.clean()
    }

    for (const {createTable} of statementMap.values()) {
        template.appendBlock(createTable)
        template.appendLine()
    }
    for (const {createIndexes} of statementMap.values()) {
        if (createIndexes.length > 0) {
            for (const createIndex of createIndexes) {
                template.appendBlock(createIndex)
            }
            template.appendLine()
        }
    }
    for (const {createForeignKeys} of statementMap.values()) {
        if (createForeignKeys.length > 0) {
            for (const createForeignKey of createForeignKeys) {
                template.appendBlock(createForeignKey)
            }
            template.appendLine()
        }
    }
    for (const {createChecks} of statementMap.values()) {
        if (createChecks.length > 0) {
            for (const createCheck of createChecks) {
                template.appendBlock(createCheck)
            }
            template.appendLine()
        }
    }
    for (const {addComments} of statementMap.values()) {
        if (addComments.length > 0) {
            for (const addComment of addComments) {
                template.appendBlock(addComment)
            }
            template.appendLine()
        }
    }

    result[`/sql/all-tables.sql`] = template.build({cleanEmptyLineIndent: true})
    template.clean()

    return result
}