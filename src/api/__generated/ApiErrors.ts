export type AllErrors = {
        family: 'DATABASE', 
        code: 'DATABASE_NOT_FOUND'
    } | {
        family: 'DATABASE', 
        code: 'CONNECT_FAIL'
    } | {
        family: 'DATABASE', 
        code: 'DATABASE_TYPE_NOT_MATCH'
    };
export type ApiErrors = {
    'databaseService': {
        'get': AllErrors & ({
                family: 'DATABASE', 
                code: 'DATABASE_NOT_FOUND', 
                readonly [key:string]: any
            }), 
        'insert': AllErrors & ({
                family: 'DATABASE', 
                code: 'CONNECT_FAIL', 
                readonly [key:string]: any
            } | {
                family: 'DATABASE', 
                code: 'DATABASE_TYPE_NOT_MATCH', 
                readonly [key:string]: any
            }), 
        'update': AllErrors & ({
                family: 'DATABASE', 
                code: 'CONNECT_FAIL', 
                readonly [key:string]: any
            } | {
                family: 'DATABASE', 
                code: 'DATABASE_TYPE_NOT_MATCH', 
                readonly [key:string]: any
            }), 
        'fetchTables': AllErrors & ({
                family: 'DATABASE', 
                code: 'DATABASE_NOT_FOUND', 
                readonly [key:string]: any
            }), 
        'refreshTables': AllErrors & ({
                family: 'DATABASE', 
                code: 'DATABASE_NOT_FOUND', 
                readonly [key:string]: any
            } | {
                family: 'DATABASE', 
                code: 'CONNECT_FAIL', 
                readonly [key:string]: any
            } | {
                family: 'DATABASE', 
                code: 'DATABASE_TYPE_NOT_MATCH', 
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
