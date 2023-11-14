export type AllErrors = 
    {
        readonly family: "DATA_SOURCE_ERROR_CODE",
        readonly code: "CONNECT_FAIL"
    } | 
    {
        readonly family: "DATA_SOURCE_ERROR_CODE",
        readonly code: "SQL_EXECUTE_FAIL"
    }
;

export type ApiErrors = {
    "associationService": {
    },
    "columnService": {
    },
    "configService": {
    },
    "dataSourceService": {
        "create": AllErrors & (
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'CONNECT_FAIL',
                readonly [key:string]: any
            } | 
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'SQL_EXECUTE_FAIL',
                readonly [key:string]: any
            }
        ),
        "edit": AllErrors & (
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'CONNECT_FAIL',
                readonly [key:string]: any
            } | 
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'SQL_EXECUTE_FAIL',
                readonly [key:string]: any
            }
        )
    },
    "entityService": {
    },
    "enumService": {
    },
    "generateService": {
    },
    "modelService": {
        "previewSql": AllErrors & (
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'CONNECT_FAIL',
                readonly [key:string]: any
            } | 
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'SQL_EXECUTE_FAIL',
                readonly [key:string]: any
            }
        )
    },
    "packageService": {
    },
    "schemaService": {
        "load": AllErrors & (
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'CONNECT_FAIL',
                readonly [key:string]: any
            } | 
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'SQL_EXECUTE_FAIL',
                readonly [key:string]: any
            }
        ),
        "preview": AllErrors & (
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'CONNECT_FAIL',
                readonly [key:string]: any
            } | 
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'SQL_EXECUTE_FAIL',
                readonly [key:string]: any
            }
        )
    },
    "tableService": {
    },
    "typeMappingService": {
    }
};
