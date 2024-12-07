import type {
    ColumnTableNotMatchItem, 
    IdName, 
    IdNullableName, 
    PropertyNameDuplicateData
} from './model/static/';

export type AllErrors = {
        family: 'CONVERT', 
        code: 'MODEL_NOT_FOUND', 
        modelId: number
    } | {
        family: 'CONVERT', 
        code: 'ENTITY_MATCH_TABLE_NOT_FOUND', 
        entity: IdName, 
        tableId: number
    } | {
        family: 'CONVERT', 
        code: 'OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN', 
        association: IdName, 
        sourceTable: IdName, 
        sourceColumn: IdNullableName, 
        targetTable: IdName, 
        targetColumn: IdName
    } | {
        family: 'CONVERT', 
        code: 'IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN', 
        association: IdName, 
        sourceTable: IdName, 
        sourceColumn: IdName, 
        targetTable: IdName, 
        targetColumn: IdNullableName
    } | {
        family: 'CONVERT', 
        code: 'ASSOCIATION_CANNOT_BE_ONE_TO_MANY', 
        association: IdName, 
        sourceTable: IdName, 
        sourceColumn: IdName, 
        targetTable: IdName, 
        targetColumn: IdName
    } | {
        family: 'CONVERT', 
        code: 'MULTIPLE_COLUMNS_NOT_SUPPORTED', 
        association: IdName, 
        sourceTable: IdName, 
        sourceColumns: Array<IdName>, 
        targetTable: IdName, 
        targetColumns: Array<IdName>
    } | {
        family: 'CONVERT', 
        code: 'ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED', 
        idViewProperty: string, 
        baseProperty: string, 
        associationProperty: string, 
        typeTable: IdName, 
        typeTablePkColumnIds: Array<number>
    } | {
        family: 'CONVERT', 
        code: 'OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY', 
        association: IdName, 
        sourceTable: IdName, 
        sourceColumn: IdName, 
        targetTable: IdName, 
        targetColumn: IdName
    } | {
        family: 'CONVERT', 
        code: 'IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY', 
        association: IdName, 
        sourceTable: IdName, 
        sourceColumn: IdName, 
        targetTable: IdName, 
        targetColumn: IdName
    } | {
        family: 'CONVERT', 
        code: 'PROPERTY_NAME_DUPLICATE', 
        table: IdName, 
        duplicateName: string, 
        properties: Array<PropertyNameDuplicateData>
    } | {
        family: 'CONVERT', 
        code: 'SUPER_TABLE_SUPER_ENTITY_NOT_MATCH', 
        table: IdName, 
        superTableIds: Array<number>, 
        superEntityIds: Array<number>
    } | {
        family: 'COLUMN_TYPE', 
        code: 'MISS_REQUIRED_PARAM', 
        column?: IdName | undefined, 
        columnName?: string | undefined, 
        typeCode: number, 
        requiredParam: string
    } | {
        family: 'DATA_SOURCE', 
        code: 'CONNECT_FAIL', 
        exceptionMessage: string
    } | {
        family: 'MODEL', 
        code: 'DEFAULT_ITEM_NOT_FOUND', 
        enum: IdName
    } | {
        family: 'MODEL', 
        code: 'ID_PROPERTY_NOT_FOUND', 
        entity: IdName
    } | {
        family: 'MODEL', 
        code: 'INDEX_REF_PROPERTY_NOT_FOUND', 
        entity: IdName, 
        entityProperties: Array<IdName>, 
        index: IdName, 
        indexPropertyIds: Array<number>, 
        notFoundPropertyId: number
    } | {
        family: 'MODEL', 
        code: 'INDEX_REF_PROPERTY_CANNOT_BE_LIST', 
        entity: IdName, 
        entityProperties: Array<IdName>, 
        index: IdName, 
        indexPropertyIds: Array<number>, 
        listProperty: IdName
    } | {
        family: 'GENERATE', 
        code: 'MODEL_NOT_FOUND', 
        modelId: number
    } | {
        family: 'GENERATE', 
        code: 'ENTITY_NOT_FOUND', 
        entityId: number
    } | {
        family: 'GENERATE', 
        code: 'INDEX_COLUMN_NOT_FOUND_IN_TABLE', 
        index: IdName, 
        indexColumnIds: Array<number>, 
        table: IdName, 
        tableColumns: Array<IdName>
    } | {
        family: 'GENERATE', 
        code: 'DEFAULT_IMPORT_MORE_THAN_ONE', 
        path: string, 
        importItems: Array<string>
    } | {
        family: 'LOAD_FROM_MODEL', 
        code: 'INDEX_COLUMN_NOT_FOUND', 
        indexName: string, 
        indexColumnNames: Array<string>, 
        table: IdName, 
        notFoundColumnName: string
    } | {
        family: 'LOAD_FROM_MODEL', 
        code: 'ASSOCIATION_SOURCE_TABLE_NOT_FOUND', 
        associationName: string, 
        sourceTableName: string, 
        sourceColumnNames: Array<string>, 
        targetTableName: string, 
        targetColumnNames: Array<string>
    } | {
        family: 'LOAD_FROM_MODEL', 
        code: 'ASSOCIATION_TARGET_TABLE_NOT_FOUND', 
        associationName: string, 
        sourceTableName: string, 
        sourceColumnNames: Array<string>, 
        targetTableName: string, 
        targetColumnNames: Array<string>
    } | {
        family: 'LOAD_FROM_MODEL', 
        code: 'ASSOCIATION_SOURCE_COLUMN_NOT_FOUND', 
        associationName: string, 
        sourceTableName: string, 
        sourceColumnNames: Array<string>, 
        targetTableName: string, 
        targetColumnNames: Array<string>, 
        notFoundSourceColumnName: string
    } | {
        family: 'LOAD_FROM_MODEL', 
        code: 'ASSOCIATION_TARGET_COLUMN_NOT_FOUND', 
        associationName: string, 
        sourceTableName: string, 
        sourceColumnNames: Array<string>, 
        targetTableName: string, 
        targetColumnNames: Array<string>, 
        notFoundTargetColumnName: string
    } | {
        family: 'LOAD_FROM_MODEL', 
        code: 'TABLE_NOT_FOUND', 
        tableName: string
    } | {
        family: 'LOAD_FROM_MODEL', 
        code: 'TABLE_SUPER_TABLE_NOT_FOUND', 
        table: IdName, 
        superTableNames: Array<string>, 
        notFoundSuperTableName: string
    } | {
        family: 'LOAD_FROM_MODEL', 
        code: 'INDEXES_TABLE_NOT_FOUND', 
        indexNames: Array<string>, 
        notFoundTableName: string
    } | {
        family: 'LOAD_FROM_MODEL', 
        code: 'INDEXES_TABLE_SUPER_TABLE_NOT_FOUND', 
        indexNames: Array<string>, 
        table: IdName, 
        superTableIds: Array<number>
    } | {
        family: 'MODEL_BUSINESS_INPUT', 
        code: 'ENTITY_CANNOT_MATCH_TABLE', 
        entityName: string, 
        tableName: string
    } | {
        family: 'MODEL_BUSINESS_INPUT', 
        code: 'ENTITY_MATCHED_TABLE_CONVERTED_ENTITY_NOT_FOUND', 
        entityName: string, 
        table: IdName
    } | {
        family: 'MODEL_BUSINESS_INPUT', 
        code: 'PROPERTY_CANNOT_MATCH_COLUMN', 
        entity: IdName, 
        propertyName: string
    } | {
        family: 'MODEL_BUSINESS_INPUT', 
        code: 'PROPERTY_CANNOT_REMATCH_OLD_PROPERTY', 
        entity: IdName, 
        propertyName: string, 
        matchedColumn: IdName
    } | {
        family: 'MODEL_BUSINESS_INPUT', 
        code: 'PROPERTY_MATCHED_MORE_THAN_ONE_OLD_PROPERTY', 
        entity: IdName, 
        propertyName: string, 
        matchedColumn: IdName, 
        matchedProperties: Array<IdName>
    } | {
        family: 'DATA_SOURCE', 
        code: 'H2__INIT_FAIL', 
        exceptionMessage: string
    } | {
        family: 'DATA_SOURCE', 
        code: 'SQL_EXECUTE_FAIL', 
        sql: string, 
        exceptionMessage: string
    } | {
        family: 'DATA_SOURCE', 
        code: 'DATA_SOURCE_NOT_FOUND', 
        id: number
    } | {
        family: 'LOAD_FROM_DATA_SOURCE', 
        code: 'ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY', 
        foreignKeyName: string
    } | {
        family: 'LOAD_FROM_DATA_SOURCE', 
        code: 'ASSOCIATION_SOURCE_TABLE_NOT_MATCH', 
        foreignKeyName: string, 
        columnToSourceTables: Array<ColumnTableNotMatchItem>
    } | {
        family: 'LOAD_FROM_DATA_SOURCE', 
        code: 'ASSOCIATION_TARGET_TABLE_NOT_MATCH', 
        foreignKeyName: string, 
        columnToTargetTables: Array<ColumnTableNotMatchItem>
    } | {
        family: 'LOAD_FROM_DATA_SOURCE', 
        code: 'INDEX_COLUMN_TABLE_NOT_MATCH', 
        indexName: string, 
        indexColumnToTables: Array<ColumnTableNotMatchItem>
    } | {
        family: 'LOAD_FROM_DATA_SOURCE', 
        code: 'ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND', 
        foreignKeyName: string, 
        tableName: string
    } | {
        family: 'LOAD_FROM_DATA_SOURCE', 
        code: 'ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND', 
        foreignKeyName: string, 
        tableName: string, 
        columnName: string
    };
export type ApiErrors = {
    'associationService': {
    }, 
    'columnDefaultService': {
    }, 
    'columnService': {
    }, 
    'configService': {
    }, 
    'convertService': {
        'convertTable': AllErrors & ({
                family: 'CONVERT', 
                code: 'MODEL_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'ENTITY_MATCH_TABLE_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'ASSOCIATION_CANNOT_BE_ONE_TO_MANY', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'MULTIPLE_COLUMNS_NOT_SUPPORTED', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'PROPERTY_NAME_DUPLICATE', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'SUPER_TABLE_SUPER_ENTITY_NOT_MATCH', 
                readonly [key:string]: any
            } | {
                family: 'COLUMN_TYPE', 
                code: 'MISS_REQUIRED_PARAM', 
                readonly [key:string]: any
            }), 
        'convertModel': AllErrors & ({
                family: 'CONVERT', 
                code: 'MODEL_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'ENTITY_MATCH_TABLE_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'ASSOCIATION_CANNOT_BE_ONE_TO_MANY', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'MULTIPLE_COLUMNS_NOT_SUPPORTED', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'PROPERTY_NAME_DUPLICATE', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT', 
                code: 'SUPER_TABLE_SUPER_ENTITY_NOT_MATCH', 
                readonly [key:string]: any
            } | {
                family: 'COLUMN_TYPE', 
                code: 'MISS_REQUIRED_PARAM', 
                readonly [key:string]: any
            })
    }, 
    'dataSourceService': {
        'save': AllErrors & ({
                family: 'DATA_SOURCE', 
                code: 'CONNECT_FAIL', 
                readonly [key:string]: any
            }), 
        'test': AllErrors & ({
                family: 'DATA_SOURCE', 
                code: 'CONNECT_FAIL', 
                readonly [key:string]: any
            })
    }, 
    'entityService': {
    }, 
    'enumService': {
    }, 
    'generateService': {
        'generateModel': AllErrors & ({
                family: 'MODEL', 
                code: 'DEFAULT_ITEM_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'MODEL', 
                code: 'ID_PROPERTY_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'MODEL', 
                code: 'INDEX_REF_PROPERTY_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'MODEL', 
                code: 'INDEX_REF_PROPERTY_CANNOT_BE_LIST', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE', 
                code: 'MODEL_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE', 
                code: 'ENTITY_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE', 
                code: 'INDEX_COLUMN_NOT_FOUND_IN_TABLE', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE', 
                code: 'DEFAULT_IMPORT_MORE_THAN_ONE', 
                readonly [key:string]: any
            } | {
                family: 'COLUMN_TYPE', 
                code: 'MISS_REQUIRED_PARAM', 
                readonly [key:string]: any
            })
    }, 
    'jdbcService': {
    }, 
    'modelService': {
        'save': AllErrors & ({
                family: 'LOAD_FROM_MODEL', 
                code: 'INDEX_COLUMN_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_MODEL', 
                code: 'ASSOCIATION_SOURCE_TABLE_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_MODEL', 
                code: 'ASSOCIATION_TARGET_TABLE_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_MODEL', 
                code: 'ASSOCIATION_SOURCE_COLUMN_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_MODEL', 
                code: 'ASSOCIATION_TARGET_COLUMN_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_MODEL', 
                code: 'TABLE_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_MODEL', 
                code: 'TABLE_SUPER_TABLE_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_MODEL', 
                code: 'INDEXES_TABLE_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_MODEL', 
                code: 'INDEXES_TABLE_SUPER_TABLE_NOT_FOUND', 
                readonly [key:string]: any
            }), 
        'saveBusiness': AllErrors & ({
                family: 'MODEL_BUSINESS_INPUT', 
                code: 'ENTITY_CANNOT_MATCH_TABLE', 
                readonly [key:string]: any
            } | {
                family: 'MODEL_BUSINESS_INPUT', 
                code: 'ENTITY_MATCHED_TABLE_CONVERTED_ENTITY_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'MODEL_BUSINESS_INPUT', 
                code: 'PROPERTY_CANNOT_MATCH_COLUMN', 
                readonly [key:string]: any
            } | {
                family: 'MODEL_BUSINESS_INPUT', 
                code: 'PROPERTY_CANNOT_REMATCH_OLD_PROPERTY', 
                readonly [key:string]: any
            } | {
                family: 'MODEL_BUSINESS_INPUT', 
                code: 'PROPERTY_MATCHED_MORE_THAN_ONE_OLD_PROPERTY', 
                readonly [key:string]: any
            })
    }, 
    'schemaService': {
        'preview': AllErrors & ({
                family: 'DATA_SOURCE', 
                code: 'H2__INIT_FAIL', 
                readonly [key:string]: any
            } | {
                family: 'DATA_SOURCE', 
                code: 'CONNECT_FAIL', 
                readonly [key:string]: any
            } | {
                family: 'DATA_SOURCE', 
                code: 'SQL_EXECUTE_FAIL', 
                readonly [key:string]: any
            } | {
                family: 'DATA_SOURCE', 
                code: 'DATA_SOURCE_NOT_FOUND', 
                readonly [key:string]: any
            }), 
        'load': AllErrors & ({
                family: 'DATA_SOURCE', 
                code: 'H2__INIT_FAIL', 
                readonly [key:string]: any
            } | {
                family: 'DATA_SOURCE', 
                code: 'CONNECT_FAIL', 
                readonly [key:string]: any
            } | {
                family: 'DATA_SOURCE', 
                code: 'SQL_EXECUTE_FAIL', 
                readonly [key:string]: any
            } | {
                family: 'DATA_SOURCE', 
                code: 'DATA_SOURCE_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_DATA_SOURCE', 
                code: 'ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_DATA_SOURCE', 
                code: 'ASSOCIATION_SOURCE_TABLE_NOT_MATCH', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_DATA_SOURCE', 
                code: 'ASSOCIATION_TARGET_TABLE_NOT_MATCH', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_DATA_SOURCE', 
                code: 'INDEX_COLUMN_TABLE_NOT_MATCH', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_DATA_SOURCE', 
                code: 'ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'LOAD_FROM_DATA_SOURCE', 
                code: 'ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND', 
                readonly [key:string]: any
            })
    }, 
    'tableService': {
    }, 
    'typeMappingService': {
    }
};
