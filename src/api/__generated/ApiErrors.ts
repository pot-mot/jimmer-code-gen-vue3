export type AllErrors = {
        family: 'DATABASE', 
        code: 'CONNECT_FAIL'
    } | {
        family: 'DATABASE', 
        code: 'DATABASE_TYPE_NOT_MATCH'
    } | {
        family: 'UPDATE', 
        code: 'NOT_EXISTED'
    } | {
        family: 'DATABASE', 
        code: 'DATABASE_NOT_FOUND'
    } | {
        family: 'DELETE', 
        code: 'NOT_EXISTED'
    };
export type ApiErrors = {
    'databaseService': {
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
                family: 'UPDATE', 
                code: 'NOT_EXISTED', 
                readonly [key:string]: any
            } | {
                family: 'DATABASE', 
                code: 'CONNECT_FAIL', 
                readonly [key:string]: any
            } | {
                family: 'DATABASE', 
                code: 'DATABASE_TYPE_NOT_MATCH', 
                readonly [key:string]: any
            }), 
        'test': AllErrors & ({
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
            }), 
        'delete': AllErrors & ({
                family: 'DELETE', 
                code: 'NOT_EXISTED', 
                readonly [key:string]: any
            })
    }, 
    'generateScriptService': {
        'update': AllErrors & ({
                family: 'UPDATE', 
                code: 'NOT_EXISTED', 
                readonly [key:string]: any
            })
    }, 
    'modelService': {
        'update': AllErrors & ({
                family: 'UPDATE', 
                code: 'NOT_EXISTED', 
                readonly [key:string]: any
            }), 
        'delete': AllErrors & ({
                family: 'DELETE', 
                code: 'NOT_EXISTED', 
                readonly [key:string]: any
            }), 
        'deleteHistory': AllErrors & ({
                family: 'DELETE', 
                code: 'NOT_EXISTED', 
                readonly [key:string]: any
            })
    }, 
    'typeMappingService': {
    }
};
