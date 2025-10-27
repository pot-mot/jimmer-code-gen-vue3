export const ScriptJvmLanguage_CONSTANTS = [
    'JAVA', 
    'KOTLIN', 
    'ANY'
] as const;
export type ScriptJvmLanguage = typeof ScriptJvmLanguage_CONSTANTS[number];
