export const DatabaseTypeOrAny_CONSTANTS = [
    'MYSQL', 
    'POSTGRESQL', 
    'ORACLE', 
    'SQLSERVER', 
    'H2', 
    'SQLITE', 
    'ANY'
] as const;
export type DatabaseTypeOrAny = typeof DatabaseTypeOrAny_CONSTANTS[number];
