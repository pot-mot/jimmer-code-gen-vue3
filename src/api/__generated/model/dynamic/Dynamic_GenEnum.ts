import type {EnumType} from '../enums/';
import type {Dynamic_GenEnumItem, Dynamic_GenModel} from './';

/**
 */
export interface Dynamic_GenEnum {
    /**
     * ID
     */
    id?: number;
    /**
     * 模型
     */
    model?: Dynamic_GenModel | undefined;
    /**
     * 模型 ID 视图
     */
    modelId?: number | undefined;
    /**
     * 包路径
     */
    packagePath?: string;
    /**
     * 枚举名
     */
    name?: string;
    /**
     * 枚举注释
     */
    comment?: string;
    /**
     * 枚举类型
     */
    enumType?: EnumType | undefined;
    /**
     * 自定排序
     */
    orderKey?: number;
    /**
     * 生成枚举元素
     */
    items?: Array<Dynamic_GenEnumItem>;
    /**
     * 生成枚举元素 ID 视图
     */
    itemIds?: Array<number>;
}
