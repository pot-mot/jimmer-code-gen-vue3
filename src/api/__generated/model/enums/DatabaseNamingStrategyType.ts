export const DatabaseNamingStrategyType_CONSTANTS = [
    'RAW', 
    'LOWER_CASE', 
    'UPPER_CASE'
] as const;
export type DatabaseNamingStrategyType = typeof DatabaseNamingStrategyType_CONSTANTS[number];
