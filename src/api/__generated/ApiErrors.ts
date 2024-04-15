export type AllErrors = {
        family: 'CONVERT_ENTITY', 
        code: 'ASSOCIATION'
    } | {
        family: 'CONVERT_ENTITY', 
        code: 'SUPER_TABLE'
    } | {
        family: 'COLUMN_TYPE', 
        code: 'MISS_REQUIRED_PARAM'
    } | {
        family: 'DATA_SOURCE', 
        code: 'CONNECT_FAIL'
    } | {
        family: 'MODEL_LOAD', 
        code: 'TABLE'
    } | {
        family: 'MODEL_LOAD', 
        code: 'COLUMN'
    } | {
        family: 'MODEL_LOAD', 
        code: 'INDEX'
    } | {
        family: 'MODEL_LOAD', 
        code: 'ASSOCIATION'
    } | {
        family: 'MODEL_LOAD', 
        code: 'ENUM'
    } | {
        family: 'GENERATE_TABLE_DEFINE', 
        code: 'TABLE'
    } | {
        family: 'GENERATE_TABLE_DEFINE', 
        code: 'COLUMN'
    } | {
        family: 'GENERATE_TABLE_DEFINE', 
        code: 'INDEX'
    } | {
        family: 'GENERATE_ENTITY', 
        code: 'TABLE'
    } | {
        family: 'GENERATE_ENTITY', 
        code: 'COLUMN'
    } | {
        family: 'GENERATE_ENTITY', 
        code: 'ASSOCIATION'
    } | {
        family: 'GENERATE_ENTITY', 
        code: 'ENUM'
    } | {
        family: 'DATA_SOURCE_LOAD', 
        code: 'TABLE'
    } | {
        family: 'DATA_SOURCE_LOAD', 
        code: 'COLUMN'
    } | {
        family: 'DATA_SOURCE_LOAD', 
        code: 'ASSOCIATION'
    } | {
        family: 'DATA_SOURCE_LOAD', 
        code: 'INDEX'
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
                family: 'CONVERT_ENTITY', 
                code: 'ASSOCIATION', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT_ENTITY', 
                code: 'SUPER_TABLE', 
                readonly [key:string]: any
            } | {
                family: 'COLUMN_TYPE', 
                code: 'MISS_REQUIRED_PARAM', 
                readonly [key:string]: any
            }), 
        'convertModel': AllErrors & ({
                family: 'CONVERT_ENTITY', 
                code: 'ASSOCIATION', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT_ENTITY', 
                code: 'SUPER_TABLE', 
                readonly [key:string]: any
            } | {
                family: 'COLUMN_TYPE', 
                code: 'MISS_REQUIRED_PARAM', 
                readonly [key:string]: any
            })
    }, 
    'dataSourceService': {
        'create': AllErrors & ({
                family: 'DATA_SOURCE', 
                code: 'CONNECT_FAIL', 
                readonly [key:string]: any
            }), 
        'edit': AllErrors & ({
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
    'jdbcService': {
    }, 
    'modelService': {
        'save': AllErrors & ({
                family: 'MODEL_LOAD', 
                code: 'TABLE', 
                readonly [key:string]: any
            } | {
                family: 'MODEL_LOAD', 
                code: 'COLUMN', 
                readonly [key:string]: any
            } | {
                family: 'MODEL_LOAD', 
                code: 'INDEX', 
                readonly [key:string]: any
            } | {
                family: 'MODEL_LOAD', 
                code: 'ASSOCIATION', 
                readonly [key:string]: any
            } | {
                family: 'MODEL_LOAD', 
                code: 'ENUM', 
                readonly [key:string]: any
            })
    }, 
    'previewService': {
        'previewTableDefine': AllErrors & ({
                family: 'GENERATE_TABLE_DEFINE', 
                code: 'TABLE', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE_TABLE_DEFINE', 
                code: 'COLUMN', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE_TABLE_DEFINE', 
                code: 'INDEX', 
                readonly [key:string]: any
            } | {
                family: 'COLUMN_TYPE', 
                code: 'MISS_REQUIRED_PARAM', 
                readonly [key:string]: any
            }), 
        'previewEntity': AllErrors & ({
                family: 'GENERATE_ENTITY', 
                code: 'TABLE', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE_ENTITY', 
                code: 'COLUMN', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE_ENTITY', 
                code: 'ASSOCIATION', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE_ENTITY', 
                code: 'ENUM', 
                readonly [key:string]: any
            }), 
        'previewModelSql': AllErrors & ({
                family: 'GENERATE_TABLE_DEFINE', 
                code: 'TABLE', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE_TABLE_DEFINE', 
                code: 'COLUMN', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE_TABLE_DEFINE', 
                code: 'INDEX', 
                readonly [key:string]: any
            } | {
                family: 'COLUMN_TYPE', 
                code: 'MISS_REQUIRED_PARAM', 
                readonly [key:string]: any
            }), 
        'previewModelEntity': AllErrors & ({
                family: 'CONVERT_ENTITY', 
                code: 'ASSOCIATION', 
                readonly [key:string]: any
            } | {
                family: 'CONVERT_ENTITY', 
                code: 'SUPER_TABLE', 
                readonly [key:string]: any
            } | {
                family: 'COLUMN_TYPE', 
                code: 'MISS_REQUIRED_PARAM', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE_ENTITY', 
                code: 'TABLE', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE_ENTITY', 
                code: 'COLUMN', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE_ENTITY', 
                code: 'ASSOCIATION', 
                readonly [key:string]: any
            } | {
                family: 'GENERATE_ENTITY', 
                code: 'ENUM', 
                readonly [key:string]: any
            })
    }, 
    'schemaService': {
        'load': AllErrors & ({
                family: 'DATA_SOURCE_LOAD', 
                code: 'TABLE', 
                readonly [key:string]: any
            } | {
                family: 'DATA_SOURCE_LOAD', 
                code: 'COLUMN', 
                readonly [key:string]: any
            } | {
                family: 'DATA_SOURCE_LOAD', 
                code: 'ASSOCIATION', 
                readonly [key:string]: any
            } | {
                family: 'DATA_SOURCE_LOAD', 
                code: 'INDEX', 
                readonly [key:string]: any
            })
    }, 
    'tableService': {
    }, 
    'typeMappingService': {
    }
};
