export const DatabaseSource_CONSTANTS = [
    'MYSQL', 
    'POSTGRESQL', 
    'ORACLE', 
    'SQLSERVER', 
    'H2', 
    'SQLITE', 
    'ANY'
] as const;
export type DatabaseSource = typeof DatabaseSource_CONSTANTS[number];
