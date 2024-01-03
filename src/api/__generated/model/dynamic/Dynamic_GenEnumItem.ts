import type {Dynamic_GenEnum} from './';

/**
 */
export interface Dynamic_GenEnumItem {
    /**
     * ID
     */
    id?: number;
    /**
     * 生成枚举
     */
    enum?: Dynamic_GenEnum;
    /**
     * 生成枚举 ID 视图
     */
    enumId?: number;
    /**
     * 元素名
     */
    name?: string;
    /**
     * 映射值
     */
    mappedValue?: string;
    /**
     * 元素注释
     */
    comment?: string;
    /**
     * 自定排序
     */
    orderKey?: number;
}
