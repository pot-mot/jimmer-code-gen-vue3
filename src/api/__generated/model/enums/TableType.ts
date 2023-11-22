export const TableType_CONSTANTS = [
    'TABLE', 
    'VIEW', 
    'SYSTEM_TABLE', 
    'GLOBAL_TEMPORARY', 
    'LOCAL_TEMPORARY', 
    'ALIAS', 
    'UNKNOWN'
] as const;
export type TableType = typeof TableType_CONSTANTS[number];
