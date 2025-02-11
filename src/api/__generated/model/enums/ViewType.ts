export const ViewType_CONSTANTS = [
    'VUE3_ELEMENT_PLUS'
] as const;
/**
 * 视图类型
 */
export type ViewType = typeof ViewType_CONSTANTS[number];
