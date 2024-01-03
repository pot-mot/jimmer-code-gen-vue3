export const EnumType_CONSTANTS = [
    'NAME', 
    'ORDINAL'
] as const;
export type EnumType = typeof EnumType_CONSTANTS[number];
