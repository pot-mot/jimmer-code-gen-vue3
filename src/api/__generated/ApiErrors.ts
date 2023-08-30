export type AllErrors = 
    {
        readonly family: "DATA_SOURCE_ERROR_CODE",
        readonly code: "CONNECT_FAIL"
    }
;

export type ApiErrors = {
    "associationController": {
    },
    "dataSourceController": {
        "importSchema": AllErrors & (
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'CONNECT_FAIL',
                readonly [key:string]: any
            }
        ),
        "save": AllErrors & (
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'CONNECT_FAIL',
                readonly [key:string]: any
            }
        ),
        "viewSchemas": AllErrors & (
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'CONNECT_FAIL',
                readonly [key:string]: any
            }
        )
    },
    "entityController": {
    },
    "schemaController": {
    },
    "tableController": {
    }
};
