export const ScriptDatabaseType_CONSTANTS = [
    'MYSQL', 
    'POSTGRESQL', 
    'ORACLE', 
    'SQLSERVER', 
    'H2', 
    'SQLITE', 
    'ANY'
] as const;
export type ScriptDatabaseType = typeof ScriptDatabaseType_CONSTANTS[number];
