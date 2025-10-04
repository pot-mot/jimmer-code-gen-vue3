export const defaultEntityToTable: EntityToTable = (
    entities: DeepReadonly<EntityWithInheritInfo[]>,
    context: DeepReadonly<ModelContext>
): ReturnType<EntityToTable> => {

    const scalarPropertyToColumn = (
        property: DeepReadonly<IdCommonProperty | ScalarCommonProperty | ScalarEnumProperty>
    ): Column => {
        return {
            ...property.columnInfo,
            otherConstraints: property.columnInfo.otherConstraints ? [...property.columnInfo.otherConstraints] : undefined
        }
    }

    const flatEmbeddableTypeColumns = (
        embeddableTypeId: string,
    ): Column[] => {
        const embeddableType = context.embeddableTypeMap.get(embeddableTypeId)
        if (!embeddableType) throw new Error(`[${embeddableTypeId}] not found`)

        const columns: Column[] = []

        for (const property of embeddableType.overrideColumnNameProperties) {
            if (property.category === "SCALAR_COMMON" || property.category === "SCALAR_ENUM") {
                columns.push(scalarPropertyToColumn(property))
            } else (
                columns.push(...flatEmbeddableTypeColumns(property.embeddableTypeId))
            )
        }

        return columns
    }

    const getEntityIdColumns = (entityId: string): Column[] => {
        const entity = context.entityMap.get(entityId)
        if (!entity) throw new Error(`[${entityId}] not found`)

        for (const property of entity.allProperties) {
            if (property.category === "ID_COMMON") {
                const idColumn = scalarPropertyToColumn(property)
                idColumn.partOfPrimaryKey = true
                if (property.generatedValue?.type === "IDENTITY") {
                    idColumn.autoIncrement = true
                }
                return [idColumn]
            } else if (property.category === "ID_EMBEDDABLE") {
                const idColumns = flatEmbeddableTypeColumns(property.embeddableTypeId)
                for (const idColumn of idColumns) {
                    idColumn.partOfPrimaryKey = true
                }
                return idColumns
            }
        }

        throw new Error(`[${entity.name}] has no ID`)
    }

    type JoinColumnInfo = {
        columnRef: ColumnRef,
        columnInfo: Omit<ColumnInfo, 'name' | 'nullable' | 'otherConstraints'>
    }

    const bindJoinColumnInfo = (
        columnRefs: DeepReadonly<ColumnRef[]>,
        refColumns: DeepReadonly<Column[]>,
    ): JoinColumnInfo[] => {
        if (refColumns.length !== columnRefs.length) {
            throw new Error(`columns [${refColumns.map(it => it.name).join(", ")}] is not match [${columnRefs}]`)
        }

        const joinColumnInfos: JoinColumnInfo[] = []
        for (const columnRef of columnRefs) {
            const nameMatchedColumn = refColumns.find(column => column.name === columnRef.referencedColumnName)
            if (nameMatchedColumn === undefined) throw new Error(`columnRef [${columnRef.referencedColumnName}] not found in columns [${refColumns.map(it => it.name).join(", ")}]`)
            joinColumnInfos.push({
                columnRef: {columnName: columnRef.columnName, referencedColumnName: columnRef.referencedColumnName},
                columnInfo: {
                    comment: nameMatchedColumn.comment,
                    type: nameMatchedColumn.type,
                    dataSize: nameMatchedColumn.dataSize,
                    numericPrecision: nameMatchedColumn.numericPrecision,
                    defaultValue: nameMatchedColumn.defaultValue,
                }
            })
        }
        return joinColumnInfos
    }

    type MidTableJoinColumnInfo = {
        columnRefs: {
            source: ColumnRef,
            target: ColumnRef,
        }
        columnInfo: Omit<ColumnInfo, 'name' | 'nullable' | 'otherConstraints'>
    }

    const bindMidTableJoinColumnInfo = (
        columnRefs: DeepReadonly<{source: ColumnRef, target: ColumnRef}[]>,
        refColumns: DeepReadonly<Column[]>,
    ): MidTableJoinColumnInfo[] => {
        if (refColumns.length !== columnRefs.length) {
            throw new Error(`columns [${refColumns.map(it => it.name).join(", ")}] is not match [${columnRefs}]`)
        }

        const joinColumnInfos: MidTableJoinColumnInfo[] = []
        for (const columnRef of columnRefs) {
            const nameMatchedColumn = refColumns.find(column => column.name === columnRef.target.referencedColumnName)
            if (nameMatchedColumn === undefined) throw new Error(`columnRef [${columnRef.target.referencedColumnName}] not found in columns [${refColumns.map(it => it.name).join(", ")}]`)
            joinColumnInfos.push({
                columnRefs: {
                    source: {
                        columnName: columnRef.source.columnName,
                        referencedColumnName: columnRef.source.referencedColumnName
                    },
                    target: {
                        columnName: columnRef.target.columnName,
                        referencedColumnName: columnRef.target.referencedColumnName
                    }
                },
                columnInfo: {
                    comment: nameMatchedColumn.comment,
                    type: nameMatchedColumn.type,
                    dataSize: nameMatchedColumn.dataSize,
                    numericPrecision: nameMatchedColumn.numericPrecision,
                    defaultValue: nameMatchedColumn.defaultValue,
                }
            })
        }
        return joinColumnInfos
    }

    const buildMidTable = (
        options: DeepReadonly<{
            midTable: {schema: string, name: string, comment: string},
            sourceTable: {name: string, schema: string},
            targetTable: {name: string, schema: string},
            joinColumnInfos: MidTableJoinColumnInfo[],
            associationType: "OneToOne_Source" | "ManyToOne" | "ManyToMany_Source"
        }>
    ): Table => {
        const {
            sourceTable,
            targetTable,
            joinColumnInfos,
            associationType
        } = options

        const midTable: Table = {
            schema: options.midTable.name,
            name: options.midTable.schema,
            comment: options.midTable.comment,
            columns: [],
            indexes: [],
            foreignKeys: []
        }
        for (const {columnRefs: {source}, columnInfo} of joinColumnInfos) {
            midTable.columns.push({
                ...columnInfo,
                name: source.columnName,
                comment: "",
                nullable: false,
                partOfPrimaryKey: true,
                autoIncrement: false,
                otherConstraints: []
            })
        }
        for (const {columnRefs: {target}, columnInfo} of joinColumnInfos) {
            midTable.columns.push({
                ...columnInfo,
                name: target.columnName,
                comment: "",
                nullable: false,
                partOfPrimaryKey: true,
                autoIncrement: false,
                otherConstraints: []
            })
        }
        midTable.foreignKeys.push({
            name: midTable.name + "_S",
            comment: midTable.comment + " Source Foreign Key",
            referencedTableSchema: sourceTable.schema,
            referencedTableName: sourceTable.name,
            columnRefs: joinColumnInfos.map(it => it.columnRefs.source),
            onDelete: "",
            onUpdate: "",
        })
        midTable.foreignKeys.push({
            name: midTable.name + "_T",
            comment: midTable.comment + " Target Foreign Key",
            referencedTableSchema: targetTable.schema,
            referencedTableName: targetTable.name,
            columnRefs: joinColumnInfos.map(it => it.columnRefs.target),
            onDelete: "",
            onUpdate: "",
        })

        if (associationType === "OneToOne_Source") {
            midTable.indexes.push({
                name: midTable.name + "_S_U",
                columnNames: joinColumnInfos.map(it => it.columnRefs.source.columnName),
                unique: true,
            })
            midTable.indexes.push({
                name: midTable.name + "_T_U",
                columnNames: joinColumnInfos.map(it => it.columnRefs.target.columnName),
                unique: true,
            })
        } else if (associationType === "ManyToOne") {
            midTable.indexes.push({
                name: midTable.name + "_T_U",
                columnNames: joinColumnInfos.map(it => it.columnRefs.target.columnName),
                unique: true,
            })
        }

        return midTable
    }

    const entityIdTableMap = new Map<string, Table>()
    const entityIdTableIdColumnsMap = new Map<string, Column[]>()

    const tables: Table[] = []
    const midTables: Table[] = []

    for (const entity of entities) {
        const group = context.groupMap.get(entity.groupId)
        if (!group) throw new Error(`[${entity.groupId}] not found`)

        const table: Table = {
            schema: group.baseTableSchema,
            name: entity.tableName,
            comment: entity.comment,
            columns: [],
            indexes: [],
            foreignKeys: []
        }
        const idColumns = getEntityIdColumns(entity.id)
        table.columns.push(...idColumns)
        tables.push(table)
        entityIdTableIdColumnsMap.set(entity.id, idColumns)

        entityIdTableMap.set(entity.id, table)
    }

    for (const entity of entities) {
        const table = entityIdTableMap.get(entity.id)
        if (!table) throw new Error(`[${entity.id}] not found`)
        const idColumns = entityIdTableIdColumnsMap.get(entity.id)
        if (!idColumns) throw new Error(`[${entity.id}] not found idColumns`)

        for (const property of entity.allProperties) {
            // 标量属性
            if (property.category === "SCALAR_COMMON" || property.category === "SCALAR_ENUM") {
                table.columns.push(scalarPropertyToColumn(property))
            } else if (property.category === "SCALAR_EMBEDDABLE") {
                table.columns.push(...flatEmbeddableTypeColumns(property.embeddableTypeId))
            }

            // 关联属性
            else if (property.category === "OneToOne_Source" || property.category === "ManyToOne" || property.category === "ManyToMany_Source") {
                const association = context.associationMap.get(property.associationId)
                if (!association) throw new Error(`[${property.associationId}] not found`)
                const refTable = entityIdTableMap.get(property.referencedEntityId)
                if (!refTable) throw new Error(`[${property.referencedEntityId}] not found`)
                const refColumns = entityIdTableIdColumnsMap.get(property.referencedEntityId)
                if (!refColumns) throw new Error(`[${property.referencedEntityId}] not found idColumns`)

                if (property.joinInfo.type === "SingleColumn") {
                    if (refColumns.length !== 1) {
                        throw new Error(`[${entity.name}.${property.name}] refColumns [${refColumns.map(it => it.name).join(", ")}] length is not 1`)
                    }
                    const columnRef = {
                        columnName: property.joinInfo.columnName,
                        referencedColumnName: refColumns[0].name
                    }
                    const joinColumnInfos = bindJoinColumnInfo([columnRef], refColumns)
                    for (const {columnRef, columnInfo} of joinColumnInfos) {
                        table.columns.push({
                            ...columnInfo,
                            name: columnRef.columnName,
                            comment: property.comment + columnInfo.comment,
                            nullable: property.nullable,
                        })
                    }
                    table.foreignKeys.push({
                        name: association.name,
                        comment: association.comment,
                        referencedTableSchema: refTable.schema,
                        referencedTableName: refTable.name,
                        columnRefs: [columnRef],
                        onDelete: "",
                        onUpdate: "",
                    })
                } else if (property.joinInfo.type === "MultiColumn") {
                    if (refColumns.length !== property.joinInfo.columnRefs.length) {
                        throw new Error(`[${entity.name}.${property.name}] refColumns [${refColumns.map(it => it.name).join(", ")}] length is not ${property.joinInfo.columnRefs.length}`)
                    }
                    const joinColumnInfos = bindJoinColumnInfo(property.joinInfo.columnRefs, refColumns)
                    for (const {columnRef, columnInfo} of joinColumnInfos) {
                        table.columns.push({
                            ...columnInfo,
                            name: columnRef.columnName,
                            comment: property.comment + columnInfo.comment,
                            nullable: property.nullable,
                        })
                    }
                    table.foreignKeys.push({
                        name: association.name,
                        comment: association.comment,
                        referencedTableSchema: refTable.schema,
                        referencedTableName: refTable.name,
                        columnRefs: joinColumnInfos.map(it => it.columnRef),
                        onDelete: "",
                        onUpdate: "",
                    })
                } else if (property.joinInfo.type === "SingleColumnMidTable") {
                    if (idColumns.length !== 1) {
                        throw new Error(`[${entity.name}.${property.name}] idColumns [${idColumns.map(it => it.name).join(", ")}] length is not 1`)
                    }
                    if (refColumns.length !== 1) {
                        throw new Error(`[${entity.name}.${property.name}] refColumns [${refColumns.map(it => it.name).join(", ")}] length is not 1`)
                    }
                    midTables.push(buildMidTable({
                        midTable: {name: association.name, comment: association.comment, schema: table.schema},
                        sourceTable: {name: table.name, schema: table.schema},
                        targetTable: {name: refTable.name, schema: refTable.schema},
                        joinColumnInfos: bindMidTableJoinColumnInfo([{
                            source: {columnName: property.joinInfo.sourceColumnName, referencedColumnName: idColumns[0].name},
                            target: {columnName: property.joinInfo.targetColumnName, referencedColumnName: refColumns[0].name}
                        }], refColumns),
                        associationType: property.category,
                    }))
                } else if (property.joinInfo.type === "MultiColumnMidTable") {
                    if (refColumns.length !== property.joinInfo.columnRefs.length) {
                        throw new Error(`[${entity.name}.${property.name}] refColumns [${refColumns.map(it => it.name).join(", ")}] length is not ${property.joinInfo.columnRefs.length}`)
                    }
                    midTables.push(buildMidTable({
                        midTable: {name: association.name, comment: association.comment, schema: table.schema},
                        sourceTable: {name: table.name, schema: table.schema},
                        targetTable: {name: refTable.name, schema: refTable.schema},
                        joinColumnInfos: bindMidTableJoinColumnInfo(property.joinInfo.columnRefs, refColumns),
                        associationType: property.category,
                    }))
                }
            }
        }
    }

    return {
        tables,
        midTables,
    }
}