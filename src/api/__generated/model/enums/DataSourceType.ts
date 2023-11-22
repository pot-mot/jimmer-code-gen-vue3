export const DataSourceType_CONSTANTS = ['MySQL', 'PostgreSQL'] as const;
export type DataSourceType = typeof DataSourceType_CONSTANTS[number];
