export const ModelForeignKeyType_CONSTANTS = [
    'REAL', 
    'FAKE'
] as const;
export type ModelForeignKeyType = typeof ModelForeignKeyType_CONSTANTS[number];
