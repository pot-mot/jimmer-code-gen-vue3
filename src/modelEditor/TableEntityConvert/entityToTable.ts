export const entityToTable = (
    entities: DeepReadonly<EntityWithInheritInfo[]>,
    allEntities: DeepReadonly<EntityWithInheritInfo[]>,
    context: DeepReadonly<ModelContext>
): {
    tables: Table[],
    midTables: Table[]
} => {
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
        columnInfo: Omit<ColumnInfo, 'name' | 'nullable' | 'otherConstraints'>,
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
                },
            })
        }
        return joinColumnInfos
    }

    const buildMidTable = (
        options: DeepReadonly<{
            midTable: {schema: string, name: string, comment: string},
            sourceTable: {name: string, schema: string},
            targetTable: {name: string, schema: string},
            sourceJoinColumnInfos: JoinColumnInfo[],
            sourceForeignKeyType: ForeignKeyType,
            targetJoinColumnInfos: JoinColumnInfo[],
            targetForeignKeyType: ForeignKeyType,
            associationType: "OneToOne_Source" | "ManyToOne" | "ManyToMany_Source"
        }>
    ): Table => {
        const {
            sourceTable,
            targetTable,
            sourceJoinColumnInfos,
            sourceForeignKeyType,
            targetJoinColumnInfos,
            targetForeignKeyType,
            associationType
        } = options

        const midTable: Table = {
            schema: options.midTable.schema,
            name: options.midTable.name,
            comment: options.midTable.comment,
            columns: [],
            indexes: [],
            foreignKeys: []
        }
        for (const {columnRef, columnInfo} of sourceJoinColumnInfos) {
            midTable.columns.push({
                ...columnInfo,
                name: columnRef.columnName,
                comment: "",
                nullable: false,
                partOfPrimaryKey: true,
                autoIncrement: false,
                otherConstraints: []
            })
        }
        for (const {columnRef, columnInfo} of targetJoinColumnInfos) {
            midTable.columns.push({
                ...columnInfo,
                name: columnRef.columnName,
                comment: "",
                nullable: false,
                partOfPrimaryKey: true,
                autoIncrement: false,
                otherConstraints: []
            })
        }
        if (sourceForeignKeyType === "REAL") {
            midTable.foreignKeys.push({
                name: midTable.name + "_S",
                comment: midTable.comment + " Source Foreign Key",
                referencedTableSchema: sourceTable.schema,
                referencedTableName: sourceTable.name,
                columnRefs: sourceJoinColumnInfos.map(it => it.columnRef),
                onDelete: "",
                onUpdate: "",
            })
        }
        if (targetForeignKeyType === "REAL") {
            midTable.foreignKeys.push({
                name: midTable.name + "_T",
                comment: midTable.comment + " Target Foreign Key",
                referencedTableSchema: targetTable.schema,
                referencedTableName: targetTable.name,
                columnRefs: targetJoinColumnInfos.map(it => it.columnRef),
                onDelete: "",
                onUpdate: "",
            })
        }

        if (associationType === "OneToOne_Source") {
            midTable.indexes.push({
                name: midTable.name + "_S_U",
                columnNames: sourceJoinColumnInfos.map(it => it.columnRef.columnName),
                unique: true,
            })
            midTable.indexes.push({
                name: midTable.name + "_T_U",
                columnNames: targetJoinColumnInfos.map(it => it.columnRef.columnName),
                unique: true,
            })
        } else if (associationType === "ManyToOne") {
            midTable.indexes.push({
                name: midTable.name + "_T_U",
                columnNames:  targetJoinColumnInfos.map(it => it.columnRef.columnName),
                unique: true,
            })
        }

        return midTable
    }

    const entityIdTableMap = new Map<string, Table>()
    const entityIdTableIdColumnsMap = new Map<string, Column[]>()
    const defaultForeignKeyType = context.model.defaultForeignKeyType

    const tables: Table[] = []
    const midTables: Table[] = []

    for (const entity of allEntities) {
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
        entityIdTableMap.set(entity.id, table)
        entityIdTableIdColumnsMap.set(entity.id, idColumns)
    }

    for (const entity of entities) {
        const table = entityIdTableMap.get(entity.id)
        if (!table) throw new Error(`[${entity.id}] not found`)
        const idColumns = entityIdTableIdColumnsMap.get(entity.id)
        if (!idColumns) throw new Error(`[${entity.id}] not found idColumns`)

        tables.push(table)

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
                if (association.type === "OneToOne_Abstract" || association.type === "ManyToOne_Abstract")
                    throw new Error(`[${property.associationId}] cannot be abstract`)

                const refTable = entityIdTableMap.get(property.referencedEntityId)
                if (!refTable) throw new Error(`[${property.referencedEntityId}] not found`)
                const refColumns = entityIdTableIdColumnsMap.get(property.referencedEntityId)
                if (!refColumns) throw new Error(`[${property.referencedEntityId}] not found idColumns`)

                if (property.joinInfo.type === "SingleColumn") {
                    if (refColumns.length !== 1 || !refColumns[0]) {
                        throw new Error(`[${entity.name}.${property.name}] refColumns [${refColumns.map(it => it.name).join(", ")}] length is not 1`)
                    }

                    if (property.category === "OneToOne_Source") {
                        table.indexes.push({
                            name: 'IDX_' + association.name,
                            columnNames: [property.joinInfo.columnName],
                            unique: true,
                        })
                    }

                    if (property.joinInfo.foreignKeyType === "REAL") {
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
                    }
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

                    if (property.category === "OneToOne_Source") {
                        table.indexes.push({
                            name: 'IDX_' + association.name,
                            columnNames: property.joinInfo.columnRefs.map(it => it.columnName),
                            unique: true,
                        })
                    }

                    if (property.joinInfo.foreignKeyType === "REAL") {
                        table.foreignKeys.push({
                            name: association.name,
                            comment: association.comment,
                            referencedTableSchema: refTable.schema,
                            referencedTableName: refTable.name,
                            columnRefs: joinColumnInfos.map(it => it.columnRef),
                            onDelete: "",
                            onUpdate: "",
                        })
                    }
                } else if (property.joinInfo.type === "SingleColumnMidTable") {
                    if (idColumns.length !== 1 || !idColumns[0]) {
                        throw new Error(`[${entity.name}.${property.name}] idColumns [${idColumns.map(it => it.name).join(", ")}] length is not 1`)
                    }
                    if (refColumns.length !== 1 || !refColumns[0]) {
                        throw new Error(`[${entity.name}.${property.name}] refColumns [${refColumns.map(it => it.name).join(", ")}] length is not 1`)
                    }
                    midTables.push(buildMidTable({
                        midTable: {name: association.name, comment: association.comment, schema: table.schema},
                        sourceTable: {name: table.name, schema: table.schema},
                        targetTable: {name: refTable.name, schema: refTable.schema},
                        sourceJoinColumnInfos: bindJoinColumnInfo([{columnName: property.joinInfo.sourceColumnName, referencedColumnName: idColumns[0].name}], refColumns),
                        sourceForeignKeyType: defaultForeignKeyType,
                        targetJoinColumnInfos: bindJoinColumnInfo([{columnName: property.joinInfo.targetColumnName, referencedColumnName: refColumns[0].name}], refColumns),
                        targetForeignKeyType: defaultForeignKeyType,
                        associationType: property.category,
                    }))
                } else if (property.joinInfo.type === "MultiColumnMidTable") {
                    const sourceColumnRef: ColumnRef[] = []
                    if (property.joinInfo.sourceJoinInfo.type === "SingleColumn") {
                        if (idColumns.length !== 1 || !idColumns[0]) {
                            throw new Error(`[${entity.name}.${property.name}] idColumns [${idColumns.map(it => it.name).join(", ")}] length is not 1`)
                        }
                        sourceColumnRef.push({
                            columnName: property.joinInfo.sourceJoinInfo.columnName,
                            referencedColumnName: idColumns[0].name
                        })
                    } else if (property.joinInfo.sourceJoinInfo.type === "MultiColumn") {
                        if (idColumns.length !== property.joinInfo.sourceJoinInfo.columnRefs.length) {
                            throw new Error(`[${entity.name}.${property.name}] idColumns [${idColumns.map(it => it.name).join(", ")}] length is not ${property.joinInfo.sourceJoinInfo.columnRefs.length}`)
                        }
                        sourceColumnRef.push(...property.joinInfo.sourceJoinInfo.columnRefs)
                    }

                    const targetColumnRef: ColumnRef[] = []
                    if (property.joinInfo.targetJoinInfo.type === "SingleColumn") {
                        if (refColumns.length !== 1 || !refColumns[0]) {
                            throw new Error(`[${entity.name}.${property.name}] refColumns [${refColumns.map(it => it.name).join(", ")}] length is not 1`)
                        }
                        targetColumnRef.push({
                            columnName: property.joinInfo.targetJoinInfo.columnName,
                            referencedColumnName: refColumns[0].name
                        })
                    } else if (property.joinInfo.targetJoinInfo.type === "MultiColumn") {
                        if (refColumns.length !== property.joinInfo.targetJoinInfo.columnRefs.length) {
                            throw new Error(`[${entity.name}.${property.name}] refColumns [${refColumns.map(it => it.name).join(", ")}] length is not ${property.joinInfo.targetJoinInfo.columnRefs.length}`)
                        }
                        targetColumnRef.push(...property.joinInfo.targetJoinInfo.columnRefs)
                    }

                    midTables.push(buildMidTable({
                        midTable: {name: association.name, comment: association.comment, schema: table.schema},
                        sourceTable: {name: table.name, schema: table.schema},
                        targetTable: {name: refTable.name, schema: refTable.schema},
                        sourceJoinColumnInfos: bindJoinColumnInfo(sourceColumnRef, idColumns),
                        sourceForeignKeyType: property.joinInfo.sourceJoinInfo.foreignKeyType,
                        targetJoinColumnInfos: bindJoinColumnInfo(targetColumnRef, refColumns),
                        targetForeignKeyType: property.joinInfo.targetJoinInfo.foreignKeyType,
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