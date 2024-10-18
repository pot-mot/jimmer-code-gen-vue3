export const GenerateType_CONSTANTS = [
    'ALL', 
    'DDL', 
    'Enum', 
    'Entity', 
    'Service', 
    'DTO', 
    'EnumComponent', 
    'View'
] as const;
export type GenerateType = typeof GenerateType_CONSTANTS[number];
