export const ForeignKeyType_CONSTANTS = [
    'AUTO', 
    'REAL', 
    'FAKE'
] as const;
export type ForeignKeyType = typeof ForeignKeyType_CONSTANTS[number];
