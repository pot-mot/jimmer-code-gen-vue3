import type {Dynamic_GenModel, Dynamic_GenProperty, Dynamic_GenTable} from './';

/**
 */
export interface Dynamic_GenEntity {
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
     * 对应表 ID
     */
    tableId?: number;
    /**
     * 对应表
     */
    table?: Dynamic_GenTable;
    /**
     * 类名称
     */
    name?: string;
    /**
     * 类注释
     */
    comment?: string;
    /**
     * 作者
     */
    author?: string;
    /**
     * 自定排序
     */
    orderKey?: number;
    /**
     * 属性 ID
     */
    propertyIds?: Array<number>;
    /**
     * 属性
     */
    properties?: Array<Dynamic_GenProperty>;
}
