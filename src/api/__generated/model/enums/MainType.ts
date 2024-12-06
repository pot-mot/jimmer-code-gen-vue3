export const MainType_CONSTANTS = [
    'Table', 
    'Entity', 
    'Enum'
] as const;
export type MainType = typeof MainType_CONSTANTS[number];
