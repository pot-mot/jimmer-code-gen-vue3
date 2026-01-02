export const ModelHistoryOrder_CONSTANTS = [
    'MODIFIED_TIME_ASC', 
    'MODIFIED_TIME_DESC'
] as const;
export type ModelHistoryOrder = typeof ModelHistoryOrder_CONSTANTS[number];
