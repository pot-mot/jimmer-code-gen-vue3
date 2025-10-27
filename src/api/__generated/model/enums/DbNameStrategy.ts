export const DbNameStrategy_CONSTANTS = [
    'UPPER_SNAKE', 
    'LOWER_SNAKE'
] as const;
export type DbNameStrategy = typeof DbNameStrategy_CONSTANTS[number];
