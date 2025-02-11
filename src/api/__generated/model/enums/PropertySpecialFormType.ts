export const PropertySpecialFormType_CONSTANTS = [
    'FILE', 
    'FILE_LIST', 
    'IMAGE', 
    'IMAGE_LIST'
] as const;
/**
 * 特殊表单类型
 */
export type PropertySpecialFormType = typeof PropertySpecialFormType_CONSTANTS[number];
