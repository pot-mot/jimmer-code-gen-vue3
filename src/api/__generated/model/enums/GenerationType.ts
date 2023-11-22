export const GenerationType_CONSTANTS = [
    'AUTO', 
    'USER', 
    'IDENTITY', 
    'SEQUENCE'
] as const;
export type GenerationType = typeof GenerationType_CONSTANTS[number];
