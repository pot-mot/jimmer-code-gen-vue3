export const JvmLanguage_CONSTANTS = [
    'JAVA', 
    'KOTLIN'
] as const;
export type JvmLanguage = typeof JvmLanguage_CONSTANTS[number];
