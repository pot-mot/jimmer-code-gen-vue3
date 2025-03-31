export const GenerateType_CONSTANTS = [
    'ALL', 
    'BackEnd', 
    'DDL', 
    'Enum', 
    'Entity', 
    'Service', 
    'Test', 
    'DTO', 
    'FrontEnd', 
    'View', 
    'Permission', 
    'Route'
] as const;
export type GenerateType = typeof GenerateType_CONSTANTS[number];
