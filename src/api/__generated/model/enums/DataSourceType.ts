export const DataSourceType_CONSTANTS = [
    'MySQL', 
    'PostgreSQL', 
    'H2'
] as const;
export type DataSourceType = typeof DataSourceType_CONSTANTS[number];
