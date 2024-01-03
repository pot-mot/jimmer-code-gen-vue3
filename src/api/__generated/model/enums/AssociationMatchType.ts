export const AssociationMatchType_CONSTANTS = [
    'SIMPLE_PK', 
    'INCLUDE_TABLE_NAME', 
    'PK_SUFFIX'
] as const;
export type AssociationMatchType = typeof AssociationMatchType_CONSTANTS[number];
