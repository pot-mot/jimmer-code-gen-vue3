export const DatabaseType_CONSTANTS = [
    'MYSQL', 
    'POSTGRESQL', 
    'ORACLE', 
    'SQLSERVER', 
    'H2', 
    'SQLITE'
] as const;
export type DatabaseType = typeof DatabaseType_CONSTANTS[number];
