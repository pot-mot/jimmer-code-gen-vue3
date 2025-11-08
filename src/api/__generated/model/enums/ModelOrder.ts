export const ModelOrder_CONSTANTS = [
    'CREATE_TIME_ASC', 
    'CREATE_TIME_DESC', 
    'MODIFIED_TIME_ASC', 
    'MODIFIED_TIME_DESC'
] as const;
export type ModelOrder = typeof ModelOrder_CONSTANTS[number];
