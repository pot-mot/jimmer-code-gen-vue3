import {
    FK_COMMENT_TEMPLATE,
    FK_NAME_TEMPLATE,
    MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE,
    MAPPED_PROPERTY_LIST_ID_VIEW_NAME_TEMPLATE, MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
    ID_VIEW_TEMPLATE
} from "@/type/context/utils/AssociationTemplate.ts";

export const tableToEntity: TableToEntity = (
    groupId: string,
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
): ReturnType<TableToEntity> => {
    const entities: EntityWithProperties[] = []
    const associations: AssociationIdOnly[] = []
    const embeddableTypes: EmbeddableTypeWithProperties[] = []

    const databaseNameStrategy = context.model.databaseNameStrategy
    const createId = context.createId
    const nameTool = context.nameTool
    const typeTool = context.typeTool

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
        const jvmType = typeTool.sqlToJvm(column.type)
        return {
            id: createId("Property"),
            name: nameTool.convert(column.name, databaseNameStrategy, 'LOWER_CAMEL'),
            category: "ID_COMMON",
            rawType: jvmType.fullTypeExpression,
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
                otherConstraints: column.otherConstraints === undefined ? undefined : [...column.otherConstraints],
            },
            autoSyncColumnName: true,
        }
    }

    const columnToCommonProperty = (column: DeepReadonly<Column>): ScalarCommonProperty => {
        const jvmType = typeTool.sqlToJvm(column.type)
        return {
            id: createId("Property"),
            name: nameTool.convert(column.name, databaseNameStrategy, 'LOWER_CAMEL'),
            category: "SCALAR_COMMON",
            rawType: jvmType.fullTypeExpression,
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
                otherConstraints: column.otherConstraints === undefined ? undefined : [...column.otherConstraints],
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
        entities.push(entity)
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
                comment: "",
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
                name: entity.name + "Id",
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

    for (const table of tables) {
        const entity = entityTableNameMap.get(table.name)
        if (entity === undefined) throw new Error(`Table ${table.name} has no corresponding entity`)

        const hasEmbeddableId = idEmbeddableTypeMap.has(entity.id)
        const fkColumnNameSet = new Set<string>()
        for (const fk of table.foreignKeys) {
            for (const fkColumn of fk.columnRefs) {
                fkColumnNameSet.add(fkColumn.columnName)
            }
        }

        for (const column of table.columns) {
            if (column.partOfPrimaryKey && !hasEmbeddableId) {
                entity.properties.push(columnToIdProperty(column))
            } else if (!fkColumnNameSet.has(column.name)) {
                const property = columnToCommonProperty(column)
                entity.properties.push(property)
                if (table.indexes.length === 1) {
                    for (const index of table.indexes) {
                        if (index.columnNames.includes(column.name)) {
                            if (!("key" in property)) {
                                Object.assign(property, {key: true})
                            }
                        }
                    }
                }
                for (const index of table.indexes) {
                    if (index.columnNames.includes(column.name)) {
                        if ("key" in property) {
                            property.keyGroups.push(index.name)
                        } else {
                            Object.assign(property, {key: true, keyGroups: [index.name]})
                        }
                    }
                }
            }
        }
    }

    for (const table of tables) {
        const sourceEntity = entityTableNameMap.get(table.name)
        if (sourceEntity === undefined) throw new Error(`Table ${table.name} has no corresponding entity`)

        for (const foreignKey of table.foreignKeys) {
            const referencedEntity = entityTableNameMap.get(foreignKey.referencedTableName)
            if (referencedEntity === undefined) throw new Error(`Table ${foreignKey.referencedTableName} has no corresponding entity`)
            const idEmbeddableType = idEmbeddableTypeMap.get(referencedEntity.id)

            const sourcePropertyId = createId("Property")
            const mappedPropertyId = createId("Property")
            const associationId = createId("Association")
            const lowerSourceEntityName = nameTool.firstCaseToLower(sourceEntity.name)
            const lowerReferencedEntityName = nameTool.firstCaseToLower(referencedEntity.name)

            let joinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo
            if (foreignKey.columnRefs[0]) {
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

            const sourceProperty: ManyToOneProperty = {
                id: sourcePropertyId,
                name: lowerSourceEntityName,
                category: "ManyToOne",
                typeIsList: false,
                associationId,
                joinInfo,
                autoGenerateJoinInfo: true,
                referencedEntityId: referencedEntity.id,
                idViewName: lowerSourceEntityName + "Id",
                idViewNameTemplate: ID_VIEW_TEMPLATE,
                useIdViewNameTemplate: true,
                onDissociateAction: "NONE",
                extraImports: [],
                extraAnnotations: [],
                comment: "",
                nullable: false
            }

            const mappedProperty: OneToManyProperty = {
                mappedById: sourceProperty.id,
                id: mappedPropertyId,
                name: lowerReferencedEntityName + "List",
                nameTemplate: MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
                useNameTemplate: true,
                comment: referencedEntity.comment + "列表",
                commentTemplate: MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE,
                useCommentTemplate: true,
                category: "OneToMany",
                associationId,
                referencedEntityId: sourceEntity.id,
                idViewName: lowerReferencedEntityName + "Ids",
                idViewNameTemplate: MAPPED_PROPERTY_LIST_ID_VIEW_NAME_TEMPLATE,
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

            sourceEntity.properties.push(sourceProperty)
            associations.push(association)
        }
    }

    return {
        entities,
        associations,
        embeddableTypes,
    }
}
