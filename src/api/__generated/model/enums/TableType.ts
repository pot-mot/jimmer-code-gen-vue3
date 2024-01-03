export const TableType_CONSTANTS = [
    'TABLE', 
    'VIEW', 
    'SYSTEM_TABLE', 
    'GLOBAL_TEMPORARY', 
    'LOCAL_TEMPORARY', 
    'ALIAS', 
    'UNKNOWN', 
    'Companion'
] as const;
export type TableType = typeof TableType_CONSTANTS[number];
