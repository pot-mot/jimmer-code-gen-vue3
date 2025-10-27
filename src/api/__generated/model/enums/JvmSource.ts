export const JvmSource_CONSTANTS = [
    'JAVA', 
    'KOTLIN', 
    'BOTH'
] as const;
export type JvmSource = typeof JvmSource_CONSTANTS[number];
