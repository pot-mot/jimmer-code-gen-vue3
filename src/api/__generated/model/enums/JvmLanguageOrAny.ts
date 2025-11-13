export const JvmLanguageOrAny_CONSTANTS = [
    'JAVA', 
    'KOTLIN', 
    'ANY'
] as const;
export type JvmLanguageOrAny = typeof JvmLanguageOrAny_CONSTANTS[number];
