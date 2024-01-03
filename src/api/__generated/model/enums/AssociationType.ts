export const AssociationType_CONSTANTS = [
    'ONE_TO_ONE', 
    'MANY_TO_ONE', 
    'ONE_TO_MANY', 
    'MANY_TO_MANY'
] as const;
export type AssociationType = typeof AssociationType_CONSTANTS[number];
