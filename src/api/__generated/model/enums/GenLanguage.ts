export const GenLanguage_CONSTANTS = [
    'KOTLIN', 
    'JAVA'
] as const;
/**
 * 生成语言
 */
export type GenLanguage = typeof GenLanguage_CONSTANTS[number];
