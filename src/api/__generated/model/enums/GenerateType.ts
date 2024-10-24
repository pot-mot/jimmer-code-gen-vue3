export const GenerateType_CONSTANTS = [
    'ALL', 
    'BackEnd', 
    'DDL', 
    'Enum', 
    'Entity', 
    'Service', 
    'DTO', 
    'FrontEnd', 
    'EnumComponent', 
    'View', 
    'Permission', 
    'Route'
] as const;
export type GenerateType = typeof GenerateType_CONSTANTS[number];
