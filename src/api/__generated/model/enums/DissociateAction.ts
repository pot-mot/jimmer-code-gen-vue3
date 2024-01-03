export const DissociateAction_CONSTANTS = [
    'NONE', 
    'LAX', 
    'CHECK', 
    'SET_NULL', 
    'DELETE'
] as const;
export type DissociateAction = typeof DissociateAction_CONSTANTS[number];
