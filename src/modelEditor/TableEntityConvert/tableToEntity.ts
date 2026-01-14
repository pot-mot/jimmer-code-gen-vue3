import {
    FK_COMMENT_TEMPLATE,
    FK_NAME_TEMPLATE,
    MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE,
    MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
    ID_VIEW_TEMPLATE,
    LIST_ID_VIEW_TEMPLATE,
    MAPPED_PROPERTY_NAME_TEMPLATE,
    MAPPED_PROPERTY_COMMENT_TEMPLATE, MID_TABLE_NAME_TEMPLATE, MID_TABLE_COMMENT_TEMPLATE
} from "@/modelEditor/utils/AssociationTemplate.ts";
import {createId} from "@/modelEditor/useModelEditor.ts";
import {nameTool} from "@/modelEditor/utils/NameTool.ts";

const removeLastId = (text: string): string => {
    if (text.length < 2) {
        return text
    }

    if (text.substring(text.length - 2, text.length).toLowerCase() === "id") {
        return text.substring(0, text.length - 2)
    }

    return text;
}

export const tableToEntity = (
    tables: DeepReadonly<Table[]>,
    databaseNameStrategy: NameStrategy,
    groupId: string,
    sqlToJvm: SqlToJvm
): {
    entities: EntityWithProperties[],
    embeddableTypes: EmbeddableTypeWithProperties[],
    associations: AssociationIdOnly[],
} => {
    const associations: AssociationIdOnly[] = []
    const embeddableTypes: EmbeddableTypeWithProperties[] = []

    const tableToEntity = (table: DeepReadonly<Table>): EntityWithProperties => {
        return {
            groupId,
            id: createId("Entity"),
            name: nameTool.convert(table.name, databaseNameStrategy, 'UPPER_CAMEL'),
            subPackagePath: "",
            tableName: table.name,
            autoSyncTableName: true,
            comment: table.comment,
            extraImports: [],
            extraAnnotations: [],
            extendsIds: [],
            properties: [],
        }
    }

    const columnToIdProperty = (column: DeepReadonly<Column>): IdCommonProperty => {
        const jvmType = sqlToJvm(column.type, column.nullable)
        return {
            id: createId("Property"),
            name: nameTool.convert(column.name, databaseNameStrategy, 'LOWER_CAMEL'),
            category: "ID_COMMON",
            rawType: jvmType.typeExpression,
            extraImports: jvmType.extraImports,
            extraAnnotations: jvmType.extraAnnotations,
            comment: column.comment,
            nullable: false,
            columnInfo: {
                name: column.name,
                comment: column.comment,
                type: column.type,
                dataSize: column.dataSize,
                numericPrecision: column.numericPrecision,
                nullable: false,
                defaultValue: column.defaultValue,
            },
            autoSyncColumnName: true,
        }
    }

    const columnToCommonProperty = (column: DeepReadonly<Column>): ScalarCommonProperty => {
        const jvmType = sqlToJvm(column.type, column.nullable)
        return {
            id: createId("Property"),
            name: nameTool.convert(column.name, databaseNameStrategy, 'LOWER_CAMEL'),
            category: "SCALAR_COMMON",
            rawType: jvmType.typeExpression,
            serialized: jvmType.serialized,
            extraImports: jvmType.extraImports,
            extraAnnotations: jvmType.extraAnnotations,
            comment: column.comment,
            nullable: column.nullable,
            columnInfo: {
                name: column.name,
                comment: column.comment,
                type: column.type,
                dataSize: column.dataSize,
                numericPrecision: column.numericPrecision,
                nullable: column.nullable,
                defaultValue: column.defaultValue,
            },
            autoSyncColumnName: true,
        }
    }

    const tableNameMap = new Map<string, DeepReadonly<Table>>()
    for (const table of tables) {
        if (tableNameMap.has(table.name)) {
            throw new Error(`Table ${table.name} already exists`)
        }
        tableNameMap.set(table.name, table)
    }

    const entityTableNameMap = new Map<string, EntityWithProperties>
    const columnNameMaps = new Map<string, Map<string, DeepReadonly<Column>>>()
    for (const table of tables) {
        const entity = tableToEntity(table)
        entityTableNameMap.set(table.name, entity)

        const columnNameMap = new Map<string, DeepReadonly<Column>>()
        for (const column of table.columns) {
            if (columnNameMap.has(column.name)) {
                throw new Error(`Column ${column.name} already exists in table ${table.name}`)
            }
            columnNameMap.set(column.name, column)
        }
        columnNameMaps.set(table.name, columnNameMap)
    }

    const idEmbeddableTypeMap = new Map<string, EmbeddableTypeWithProperties>()
    for (const table of tables) {
        const entity = entityTableNameMap.get(table.name)
        if (entity === undefined) throw new Error(`Table ${table.name} has no corresponding entity`)

        const pkColumns = table.columns.filter(column => column.partOfPrimaryKey)
        if (pkColumns.length > 1) {
            const embeddableType: EmbeddableTypeWithProperties = {
                groupId,
                id: createId("EmbeddableType"),
                name: entity.name + "IdType",
                subPackagePath: "",
                comment: entity.comment + "ID",
                extraImports: [],
                extraAnnotations: [],
                properties: [],
            }

            for (const column of pkColumns) {
                embeddableType.properties.push(columnToCommonProperty(column))
            }
            embeddableTypes.push(embeddableType)
            idEmbeddableTypeMap.set(entity.id, embeddableType)

            const idProperty: IdEmbeddableProperty = {
                id: createId("Property"),
                name: "id",
                category: "ID_EMBEDDABLE",
                embeddableTypeId: embeddableType.id,
                columnNameOverrides: [],
                extraImports: [],
                extraAnnotations: [],
                comment: "",
                nullable: false
            }
            entity.properties.push(idProperty)
        }
    }

    const notMidTables: DeepReadonly<Table>[] = []
    const midTables: {
        table: DeepReadonly<Table>,
        sourceForeignKey: DeepReadonly<ForeignKey>,
        targetForeignKey: DeepReadonly<ForeignKey>,
        sourceTable: DeepReadonly<Table>,
        sourceEntity: EntityWithProperties,
        sourceTablePkColumns: DeepReadonly<Column[]>,
        targetTable: DeepReadonly<Table>,
        targetEntity: EntityWithProperties,
        targetTablePkColumns: DeepReadonly<Column[]>,
        sourceUnique: boolean,
        targetUnique: boolean,
    }[] = []

    for (const table of tables) {
        const entity = entityTableNameMap.get(table.name)
        if (entity === undefined) throw new Error(`Table ${table.name} has no corresponding entity`)

        const idEmbeddableType = idEmbeddableTypeMap.get(entity.id)

        if (
            table.foreignKeys.length !== 2 ||
            idEmbeddableType === undefined ||
            table.columns.length !== idEmbeddableType.properties.length
        ) {
            notMidTables.push(table)
            continue
        }

        const [sourceForeignKey, targetForeignKey] = table.foreignKeys
        if (sourceForeignKey === undefined || targetForeignKey === undefined) {
            notMidTables.push(table)
            continue
        }

        const sourceTable = tableNameMap.get(sourceForeignKey.referencedTableName)
        if (sourceTable === undefined) {
            notMidTables.push(table)
            continue
        }
        const sourceEntity = entityTableNameMap.get(sourceTable.name)
        if (sourceEntity === undefined) {
            notMidTables.push(table)
            continue
        }
        const targetTable = tableNameMap.get(targetForeignKey.referencedTableName)
        if (targetTable === undefined) {
            notMidTables.push(table)
            continue
        }
        const targetEntity = entityTableNameMap.get(targetTable.name)
        if (targetEntity === undefined) {
            notMidTables.push(table)
            continue
        }

        const sourceTablePkColumns = sourceTable.columns.filter(column => column.partOfPrimaryKey)
        const targetTablePkColumns = targetTable.columns.filter(column => column.partOfPrimaryKey)
        const sourceTablePkColumnNameSet = new Set(sourceTablePkColumns.map(it => it.name))
        const targetTablePkColumnNameSet = new Set(targetTablePkColumns.map(it => it.name))
        // 如果外键引用的列不是主键列，则不作为中间表
        if (
            sourceTablePkColumns.length !== sourceForeignKey.columnRefs.length ||
            targetTablePkColumns.length !== targetForeignKey.columnRefs.length ||
            sourceForeignKey.columnRefs.some(it => !sourceTablePkColumnNameSet.has(it.referencedColumnName)) ||
            targetForeignKey.columnRefs.some(it => !targetTablePkColumnNameSet.has(it.referencedColumnName))
        ) {
            notMidTables.push(table)
            continue
        }

        entityTableNameMap.delete(table.name)
        const embeddableTypeIndex = embeddableTypes.indexOf(idEmbeddableType)
        if (embeddableTypeIndex !== -1) embeddableTypes.splice(embeddableTypeIndex, 1)

        let sourceUnique = false
        let targetUnique = false
        for (const index of table.indexes) {
            if (index.uniqueIndex && index.columnNames.every(it => sourceTablePkColumnNameSet.has(it))) {
                sourceUnique = true
            }
            if (index.uniqueIndex && index.columnNames.every(it => targetTablePkColumnNameSet.has(it))) {
                targetUnique = true
            }
        }

        midTables.push({
            table,
            sourceForeignKey,
            targetForeignKey,
            sourceTable,
            sourceEntity,
            targetTable,
            targetEntity,
            sourceTablePkColumns,
            targetTablePkColumns,
            sourceUnique,
            targetUnique,
        })
    }

    for (const table of notMidTables) {
        const entity = entityTableNameMap.get(table.name)
        if (entity === undefined) throw new Error(`Table ${table.name} has no corresponding entity`)

        const hasEmbeddableId = idEmbeddableTypeMap.has(entity.id)

        const fkColumnMapSet = new Map<string, DeepReadonly<ForeignKey>[]>()
        const producedFkColumnNameSet = new Set<string>()
        for (const fk of table.foreignKeys) {
            for (const columnRef of fk.columnRefs) {
                const fkList = fkColumnMapSet.get(columnRef.columnName)
                if (fkList === undefined) {
                    fkColumnMapSet.set(columnRef.columnName, [fk])
                } else {
                    // fkList.push(fk)
                    throw new Error(`Table ${table.name} ForeignKey ${fk.name} used column ${columnRef.columnName} already exists in other ForeignKey: (${
                        fkList.map(it => it.name)
                    })`)
                }
            }
        }

        const indexColumnMapSet = new Map<string, DeepReadonly<Index>[]>()
        for (const index of table.indexes) {
            for (const columnName of index.columnNames) {
                const indexList = indexColumnMapSet.get(columnName)
                if (indexList === undefined) {
                    indexColumnMapSet.set(columnName, [index])
                } else {
                    indexList.push(index)
                }
            }
        }

        for (const column of table.columns) {
            // 主键
            if (column.partOfPrimaryKey) {
                if (!hasEmbeddableId) {
                    entity.properties.push(columnToIdProperty(column))
                }
            }

            // 非外键
            else if (!fkColumnMapSet.has(column.name)) {
                const property = columnToCommonProperty(column)
                entity.properties.push(property)

                const indexList = indexColumnMapSet.get(column.name)
                if (indexList !== undefined) {
                    if (table.indexes.length === 1 && table.indexes[0]?.uniqueIndex) {
                        Object.assign(property, {key: true, keyGroups: []})
                    } else {
                        for (const index of indexList.filter(it => it.uniqueIndex)) {
                            if ("key" in property) {
                                property.keyGroups.push(index.name)
                            } else {
                                Object.assign(property, {key: true, keyGroups: [index.name]})
                            }
                        }
                    }
                }
            }

            // 外键
            else if (!producedFkColumnNameSet.has(column.name)) {
                const sourceEntity = entity
                const fkList = fkColumnMapSet.get(column.name)
                if (fkList === undefined || fkList.length === 0) {
                    throw new Error(`Table ${table.name} ForeignKey Column ${column.name} has no ForeignKey`)
                }
                for (const foreignKey of fkList) {
                    for (const columnRef of foreignKey.columnRefs) {
                        producedFkColumnNameSet.add(columnRef.columnName)
                    }

                    const referencedEntity = entityTableNameMap.get(foreignKey.referencedTableName)
                    if (referencedEntity === undefined) throw new Error(`Table ${foreignKey.referencedTableName} has no corresponding entity`)
                    const idEmbeddableType = idEmbeddableTypeMap.get(referencedEntity.id)

                    let joinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo
                    if (foreignKey.columnRefs.length === 0) {
                        throw new Error(`ForeignKey ${foreignKey.name} has no column`)
                    } else if (foreignKey.columnRefs.length === 1 && foreignKey.columnRefs[0]) {
                        joinInfo = {
                            type: "SingleColumn",
                            columnName: foreignKey.columnRefs[0].columnName,
                            foreignKeyType: "REAL",
                        }
                    } else {
                        if (idEmbeddableType === undefined)
                            throw new Error(`Table ${table.name} has no corresponding embeddable type`)
                        joinInfo = {
                            type: "MultiColumn",
                            embeddableTypeId: idEmbeddableType.id,
                            columnRefs: foreignKey.columnRefs.map(columnRef => ({
                                columnName: columnRef.columnName,
                                referencedColumnName: columnRef.referencedColumnName,
                            })),
                            foreignKeyType: "REAL",
                        }
                    }

                    const sourceColumns: DeepReadonly<Column>[] = foreignKey.columnRefs.map(it => {
                        return columnNameMaps.get(table.name)?.get(it.columnName)
                    }).filter(it => it !== undefined)
                    if (sourceColumns.length !== foreignKey.columnRefs.length) {
                        throw new Error(`Table ${table.name}(${
                            sourceColumns.map(it => it.name).join(", ")
                        }) and ForeignKey ${
                            foreignKey.name}(${foreignKey.columnRefs.map(it => it.columnName).join(", ")
                        }) not match`)
                    }
                    const sourceNullable = sourceColumns.some(it => it.nullable)

                    const sourcePropertyId = createId("Property")
                    const mappedPropertyId = createId("Property")
                    const associationId = createId("Association")
                    const lowerSourceEntityName = nameTool.firstCaseToLower(sourceEntity.name)
                    const lowerReferencedEntityName = nameTool.firstCaseToLower(referencedEntity.name)

                    const sourcePropertyName = sourceColumns.length === 1 && sourceColumns[0] !== undefined ?
                        removeLastId(nameTool.convert(sourceColumns[0].name, databaseNameStrategy, "LOWER_CAMEL").trim()) :
                        lowerReferencedEntityName
                    const sourcePropertyComment = sourceColumns.length === 1 && sourceColumns[0] !== undefined ?
                        removeLastId(sourceColumns[0].comment.trim()) :
                        referencedEntity.comment
                    const sourcePropertyIdViewName = sourcePropertyName + "Id"

                    const sourceProperty: Omit<ManyToOneProperty | OneToOneSourceProperty, 'category'> & {
                        joinInfo: FkJoinInfo,
                        onDissociateAction: OnDissociationAction,
                    } = {
                        id: sourcePropertyId,
                        name: sourcePropertyName,
                        comment: sourcePropertyComment,
                        typeIsList: false,
                        associationId,
                        joinInfo,
                        autoGenerateJoinInfo: true,
                        referencedEntityId: referencedEntity.id,
                        idViewName: sourcePropertyIdViewName,
                        idViewNameTemplate: ID_VIEW_TEMPLATE,
                        useIdViewNameTemplate: true,
                        onDissociateAction: "NONE",
                        extraImports: [],
                        extraAnnotations: [],
                        nullable: sourceNullable
                    }

                    // 区分多对一还是一对一
                    let targetIsUniqueFlag = false

                    const indexList = indexColumnMapSet.get(column.name)
                    if (indexList !== undefined) {
                        for (const index of indexList.filter(it => it.uniqueIndex)) {
                            const indexColumnNameSet = new Set(index.columnNames)
                            const allSourceColumnInIndex = sourceColumns.every(sourceColumn => indexColumnNameSet.has(sourceColumn.name))
                            if (allSourceColumnInIndex) {
                                targetIsUniqueFlag = true
                                if (table.indexes.length === 1) {
                                    Object.assign(sourceProperty, {key: true})
                                } else {
                                    if ("key" in sourceProperty && "keyGroups" in sourceProperty) {
                                        (sourceProperty as KeyProperty).keyGroups.push(index.name)
                                    } else {
                                        Object.assign(sourceProperty, {key: true, keyGroups: [index.name]})
                                    }
                                }
                            }
                        }
                    }

                    if (targetIsUniqueFlag) {
                        const mappedPropertyName = lowerSourceEntityName
                        const mappedPropertyComment = sourceEntity.comment
                        const mappedPropertyIdViewName = mappedPropertyName + "Id"

                        const mappedProperty: OneToOneMappedProperty = {
                            mappedById: sourceProperty.id,
                            id: mappedPropertyId,
                            name: mappedPropertyName,
                            nameTemplate: MAPPED_PROPERTY_NAME_TEMPLATE,
                            useNameTemplate: true,
                            comment: mappedPropertyComment,
                            commentTemplate: MAPPED_PROPERTY_COMMENT_TEMPLATE,
                            useCommentTemplate: true,
                            category: "OneToOne_Mapped",
                            associationId,
                            referencedEntityId: sourceEntity.id,
                            idViewName: mappedPropertyIdViewName,
                            idViewNameTemplate: ID_VIEW_TEMPLATE,
                            useIdViewNameTemplate: true,
                            nullable: true,
                            typeIsList: false,
                            extraAnnotations: [],
                            extraImports: [],
                        }

                        const association: OneToOneAssociationIdOnly = {
                            id: associationId,
                            name: foreignKey.name,
                            nameTemplate: FK_NAME_TEMPLATE,
                            useNameTemplate: false,
                            comment: foreignKey.comment,
                            commentTemplate: FK_COMMENT_TEMPLATE,
                            useCommentTemplate: false,
                            type: "OneToOne",
                            foreignKeyType: "REAL",
                            sourceEntityId: sourceEntity.id,
                            referencedEntityId: referencedEntity.id,
                            sourcePropertyId: sourcePropertyId,
                            withMappedProperty: true,
                            mappedProperty,
                        }

                        sourceEntity.properties.push({...sourceProperty, category: "OneToOne_Source"})
                        associations.push(association)
                    } else {
                        const mappedPropertyName = lowerSourceEntityName + "List"
                        const mappedPropertyComment = sourceEntity.comment + "列表"
                        const mappedPropertyIdViewName = mappedPropertyName + "Ids"

                        const mappedProperty: OneToManyProperty = {
                            mappedById: sourceProperty.id,
                            id: mappedPropertyId,
                            name: mappedPropertyName,
                            nameTemplate: MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
                            useNameTemplate: true,
                            comment: mappedPropertyComment,
                            commentTemplate: MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE,
                            useCommentTemplate: true,
                            category: "OneToMany",
                            associationId,
                            referencedEntityId: sourceEntity.id,
                            idViewName: mappedPropertyIdViewName,
                            idViewNameTemplate: LIST_ID_VIEW_TEMPLATE,
                            useIdViewNameTemplate: true,
                            nullable: false,
                            typeIsList: true,
                            extraAnnotations: [],
                            extraImports: [],
                        }

                        const association: ManyToOneAssociationIdOnly = {
                            id: associationId,
                            name: foreignKey.name,
                            nameTemplate: FK_NAME_TEMPLATE,
                            useNameTemplate: false,
                            comment: foreignKey.comment,
                            commentTemplate: FK_COMMENT_TEMPLATE,
                            useCommentTemplate: false,
                            type: "ManyToOne",
                            foreignKeyType: "REAL",
                            sourceEntityId: sourceEntity.id,
                            referencedEntityId: referencedEntity.id,
                            sourcePropertyId: sourcePropertyId,
                            withMappedProperty: true,
                            mappedProperty,
                        }

                        sourceEntity.properties.push({...sourceProperty, category: "ManyToOne"})
                        associations.push(association)
                    }
                }
            }
        }
    }

    const getIdEmbeddableType = (entity: EntityWithProperties): EmbeddableTypeWithProperties => {
        const idEmbeddableType = idEmbeddableTypeMap.get(entity.id)
        if (idEmbeddableType === undefined) throw new Error(`idEmbeddableType is undefined for entity: ${entity.name}(${entity.id})`)
        return idEmbeddableType
    }

    // 中间表至关联
    for (const {
        table: midTable,
        sourceForeignKey,
        targetForeignKey,
        sourceEntity,
        sourceTablePkColumns: sourceColumns,
        targetEntity: referencedEntity,
        targetTablePkColumns: referencedColumns,
        sourceUnique,
        targetUnique,
    } of midTables) {
        const associationId = createId("Association")
        const sourcePropertyId = createId("Property")
        const mappedPropertyId = createId("Property")

        const lowerSourceEntityName = nameTool.firstCaseToLower(sourceEntity.name)
        const lowerReferencedEntityName = nameTool.firstCaseToLower(referencedEntity.name)


        const joinInfo: MidTableJoinInfo = {
            type: "MidTable",
            sourceJoinInfo: sourceColumns.length === 1 && sourceColumns[0] !== undefined ? {
                type: "SingleColumn",
                foreignKeyType: "REAL",
                columnName: sourceColumns[0].name,
            } : {
                type: "MultiColumn",
                foreignKeyType: "REAL",
                embeddableTypeId: getIdEmbeddableType(sourceEntity).id,
                columnRefs: sourceForeignKey.columnRefs.map(it => ({
                    columnName: it.columnName,
                    referencedColumnName: it.referencedColumnName,
                }))
            },
            targetJoinInfo: referencedColumns.length === 1 && referencedColumns[0] !== undefined ? {
                type: "SingleColumn",
                foreignKeyType: "REAL",
                columnName: referencedColumns[0].name,
            } : {
                type: "MultiColumn",
                foreignKeyType: "REAL",
                embeddableTypeId: getIdEmbeddableType(referencedEntity).id,
                columnRefs: targetForeignKey.columnRefs.map(it => ({
                    columnName: it.columnName,
                    referencedColumnName: it.referencedColumnName,
                }))
            },
            midTableExtraInfo: {}
        }

        if (sourceUnique && targetUnique) {
            const sourcePropertyName = lowerReferencedEntityName
            const sourcePropertyComment = referencedEntity.comment
            const sourcePropertyIdViewName = sourcePropertyName + "Id"

            const sourceProperty: OneToOneSourceProperty = {
                id: sourcePropertyId,
                name: sourcePropertyName,
                comment: sourcePropertyComment,
                typeIsList: false,
                associationId,
                joinInfo,
                autoGenerateJoinInfo: true,
                referencedEntityId: referencedEntity.id,
                idViewName: sourcePropertyIdViewName,
                idViewNameTemplate: ID_VIEW_TEMPLATE,
                useIdViewNameTemplate: true,
                onDissociateAction: "NONE",
                extraImports: [],
                extraAnnotations: [],
                nullable: true,
                category: "OneToOne_Source",
            }
            sourceEntity.properties.push(sourceProperty)

            const mappedPropertyName = lowerSourceEntityName
            const mappedPropertyComment = sourceEntity.comment
            const mappedPropertyIdViewName = mappedPropertyName + "Id"

            const mappedProperty: OneToOneMappedProperty = {
                mappedById: sourceProperty.id,
                id: mappedPropertyId,
                name: mappedPropertyName,
                nameTemplate: MAPPED_PROPERTY_NAME_TEMPLATE,
                useNameTemplate: true,
                comment: mappedPropertyComment,
                commentTemplate: MAPPED_PROPERTY_COMMENT_TEMPLATE,
                useCommentTemplate: true,
                category: "OneToOne_Mapped",
                associationId,
                referencedEntityId: sourceEntity.id,
                idViewName: mappedPropertyIdViewName,
                idViewNameTemplate: ID_VIEW_TEMPLATE,
                useIdViewNameTemplate: true,
                nullable: true,
                typeIsList: false,
                extraAnnotations: [],
                extraImports: [],
            }

            const association: OneToOneAssociationIdOnly = {
                id: associationId,
                name: midTable.name,
                nameTemplate: MID_TABLE_NAME_TEMPLATE,
                useNameTemplate: false,
                comment: midTable.comment,
                commentTemplate: MID_TABLE_COMMENT_TEMPLATE,
                useCommentTemplate: false,
                type: "OneToOne",
                foreignKeyType: "REAL",
                sourceEntityId: sourceEntity.id,
                referencedEntityId: referencedEntity.id,
                sourcePropertyId: sourcePropertyId,
                withMappedProperty: true,
                mappedProperty,
            }
            associations.push(association)
        } else if (sourceUnique) {
            const sourcePropertyName = lowerSourceEntityName
            const sourcePropertyComment = sourceEntity.comment
            const sourcePropertyIdViewName = sourcePropertyName + "Id"

            const sourceProperty: ManyToOneProperty = {
                id: sourcePropertyId,
                name: sourcePropertyName,
                comment: sourcePropertyComment,
                typeIsList: false,
                associationId,
                joinInfo,
                autoGenerateJoinInfo: true,
                referencedEntityId: sourceEntity.id,
                idViewName: sourcePropertyIdViewName,
                idViewNameTemplate: ID_VIEW_TEMPLATE,
                useIdViewNameTemplate: true,
                onDissociateAction: "NONE",
                extraImports: [],
                extraAnnotations: [],
                nullable: true,
                category: "ManyToOne",
            }
            referencedEntity.properties.push(sourceProperty)

            const mappedPropertyName = lowerReferencedEntityName + "List"
            const mappedPropertyComment = referencedEntity.comment + "列表"
            const mappedPropertyIdViewName = mappedPropertyName + "Ids"

            const mappedProperty: OneToManyProperty = {
                mappedById: sourceProperty.id,
                id: mappedPropertyId,
                name: mappedPropertyName,
                nameTemplate: MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
                useNameTemplate: true,
                comment: mappedPropertyComment,
                commentTemplate: MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE,
                useCommentTemplate: true,
                category: "OneToMany",
                associationId,
                referencedEntityId: referencedEntity.id,
                idViewName: mappedPropertyIdViewName,
                idViewNameTemplate: LIST_ID_VIEW_TEMPLATE,
                useIdViewNameTemplate: true,
                nullable: false,
                typeIsList: true,
                extraAnnotations: [],
                extraImports: [],
            }

            const association: ManyToOneAssociationIdOnly = {
                id: associationId,
                name: midTable.name,
                nameTemplate: MID_TABLE_NAME_TEMPLATE,
                useNameTemplate: false,
                comment: midTable.comment,
                commentTemplate: MID_TABLE_COMMENT_TEMPLATE,
                useCommentTemplate: false,
                type: "ManyToOne",
                foreignKeyType: "REAL",
                sourceEntityId: referencedEntity.id,
                referencedEntityId: sourceEntity.id,
                sourcePropertyId: sourcePropertyId,
                withMappedProperty: true,
                mappedProperty,
            }
            associations.push(association)
        } else if (targetUnique) {
            const sourcePropertyName = lowerReferencedEntityName
            const sourcePropertyComment = referencedEntity.comment
            const sourcePropertyIdViewName = sourcePropertyName + "Id"

            const sourceProperty: ManyToOneProperty = {
                id: sourcePropertyId,
                name: sourcePropertyName,
                comment: sourcePropertyComment,
                typeIsList: false,
                associationId,
                joinInfo,
                autoGenerateJoinInfo: true,
                referencedEntityId: referencedEntity.id,
                idViewName: sourcePropertyIdViewName,
                idViewNameTemplate: ID_VIEW_TEMPLATE,
                useIdViewNameTemplate: true,
                onDissociateAction: "NONE",
                extraImports: [],
                extraAnnotations: [],
                nullable: true,
                category: "ManyToOne",
            }
            sourceEntity.properties.push(sourceProperty)

            const mappedPropertyName = lowerSourceEntityName + "List"
            const mappedPropertyComment = sourceEntity.comment + "列表"
            const mappedPropertyIdViewName = mappedPropertyName + "Ids"

            const mappedProperty: OneToManyProperty = {
                mappedById: sourceProperty.id,
                id: mappedPropertyId,
                name: mappedPropertyName,
                nameTemplate: MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
                useNameTemplate: true,
                comment: mappedPropertyComment,
                commentTemplate: MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE,
                useCommentTemplate: true,
                category: "OneToMany", // 这是One-to-Many关系中的"一"方的集合属性
                associationId,
                referencedEntityId: sourceEntity.id,
                idViewName: mappedPropertyIdViewName,
                idViewNameTemplate: LIST_ID_VIEW_TEMPLATE,
                useIdViewNameTemplate: true,
                nullable: false,
                typeIsList: true,
                extraAnnotations: [],
                extraImports: [],
            }

            const association: ManyToOneAssociationIdOnly = {
                id: associationId,
                name: midTable.name,
                nameTemplate: MID_TABLE_NAME_TEMPLATE,
                useNameTemplate: false,
                comment: midTable.comment,
                commentTemplate: MID_TABLE_COMMENT_TEMPLATE,
                useCommentTemplate: false,
                type: "ManyToOne", // 虽然逻辑上是One-to-Many，但存储时以Many端为源
                foreignKeyType: "REAL",
                sourceEntityId: sourceEntity.id,
                referencedEntityId: referencedEntity.id,
                sourcePropertyId: sourcePropertyId,
                withMappedProperty: true,
                mappedProperty,
            }
            associations.push(association)
        } else {
            const sourcePropertyName = lowerReferencedEntityName + "List"
            const sourcePropertyComment = referencedEntity.comment + "列表"
            const sourcePropertyIdViewName = sourcePropertyName + "Ids"

            const sourceProperty: ManyToManySourceProperty = {
                id: sourcePropertyId,
                name: sourcePropertyName,
                comment: sourcePropertyComment,
                typeIsList: true,
                associationId,
                joinInfo,
                autoGenerateJoinInfo: true,
                referencedEntityId: referencedEntity.id,
                idViewName: sourcePropertyIdViewName,
                idViewNameTemplate: ID_VIEW_TEMPLATE,
                useIdViewNameTemplate: true,
                extraImports: [],
                extraAnnotations: [],
                nullable: false,
                category: "ManyToMany_Source",
            }
            sourceEntity.properties.push(sourceProperty)

            const mappedPropertyName = lowerReferencedEntityName + "List"
            const mappedPropertyComment = referencedEntity.comment + "列表"
            const mappedPropertyIdViewName = mappedPropertyName + "Ids"

            const mappedProperty: ManyToManyMappedProperty = {
                mappedById: sourceProperty.id,
                id: mappedPropertyId,
                name: mappedPropertyName,
                nameTemplate: MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
                useNameTemplate: true,
                comment: mappedPropertyComment,
                commentTemplate: MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE,
                useCommentTemplate: true,
                category: "ManyToMany_Mapped",
                associationId,
                referencedEntityId: sourceEntity.id,
                idViewName: mappedPropertyIdViewName,
                idViewNameTemplate: LIST_ID_VIEW_TEMPLATE,
                useIdViewNameTemplate: true,
                nullable: false,
                typeIsList: true,
                extraAnnotations: [],
                extraImports: [],
            }

            const association: ManyToManyAssociationIdOnly = {
                id: associationId,
                name: midTable.name,
                nameTemplate: MID_TABLE_NAME_TEMPLATE,
                useNameTemplate: false,
                comment: midTable.comment,
                commentTemplate: MID_TABLE_COMMENT_TEMPLATE,
                useCommentTemplate: false,
                type: "ManyToMany",
                foreignKeyType: "REAL",
                sourceEntityId: sourceEntity.id,
                referencedEntityId: referencedEntity.id,
                sourcePropertyId: sourcePropertyId,
                withMappedProperty: true,
                mappedProperty,
            }
            associations.push(association)
        }

    }

    return {
        entities: [...entityTableNameMap.values()],
        associations,
        embeddableTypes,
    }
}
