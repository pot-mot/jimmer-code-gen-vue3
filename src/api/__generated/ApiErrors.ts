export type AllErrors =
    {
        readonly family: "DATA_SOURCE_ERROR_CODE",
        readonly code: "CONNECT_FAIL"
    }
    ;

export type ApiErrors = {
    "associationService": {},
    "columnService": {},
    "dataSourceService": {
        "edit": AllErrors & (
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'CONNECT_FAIL',
                readonly [key: string]: any
            }
            ),
        "importSchema": AllErrors & (
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'CONNECT_FAIL',
                readonly [key: string]: any
            }
            ),
        "insert": AllErrors & (
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'CONNECT_FAIL',
                readonly [key: string]: any
            }
            ),
        "viewSchemas": AllErrors & (
            {
                readonly family: 'DATA_SOURCE_ERROR_CODE',
                readonly code: 'CONNECT_FAIL',
                readonly [key: string]: any
            }
            )
    },
    "entityService": {},
    "schemaService": {},
    "tableService": {}
};
