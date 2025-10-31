export type AllErrors = {
        family: 'DATABASE', 
        code: 'DATA_SOURCE_NOT_FOUND'
    };
export type ApiErrors = {
    'databaseService': {
        'get': AllErrors & ({
                family: 'DATABASE', 
                code: 'DATA_SOURCE_NOT_FOUND', 
                readonly [key:string]: any
            }), 
        'test': AllErrors & ({
                family: 'DATABASE', 
                code: 'DATA_SOURCE_NOT_FOUND', 
                readonly [key:string]: any
            }), 
        'fetchTables': AllErrors & ({
                family: 'DATABASE', 
                code: 'DATA_SOURCE_NOT_FOUND', 
                readonly [key:string]: any
            }), 
        'refreshTables': AllErrors & ({
                family: 'DATABASE', 
                code: 'DATA_SOURCE_NOT_FOUND', 
                readonly [key:string]: any
            })
    }, 
    'generateScriptService': {
    }, 
    'modelService': {
    }, 
    'typeMappingService': {
    }
};
