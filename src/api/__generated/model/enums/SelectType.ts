export const SelectType_CONSTANTS = [
    'AND',
    'OR'
] as const;
export type SelectType = typeof SelectType_CONSTANTS[number];
