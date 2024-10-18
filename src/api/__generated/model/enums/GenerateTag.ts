export const GenerateTag_CONSTANTS = [
    'BackEnd', 
    'Table', 
    'Enum', 
    'Entity', 
    'Service', 
    'FrontEnd', 
    'DTO', 
    'View', 
    'Component'
] as const;
export type GenerateTag = typeof GenerateTag_CONSTANTS[number];
