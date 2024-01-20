import type {TableType} from '../enums/';
import type {
    Dynamic_GenAssociation, 
    Dynamic_GenColumn, 
    Dynamic_GenEntity, 
    Dynamic_GenModel, 
    Dynamic_GenSchema, 
    Dynamic_GenTableIndex
} from './';

/**
 */
export interface Dynamic_GenTable {
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
     * 数据架构
     */
    schema?: Dynamic_GenSchema | undefined;
    /**
     * 所属架构 ID视图
     */
    schemaId?: number | undefined;
    /**
     * 对应实体 ID
     */
    entityId?: number | undefined;
    /**
     * 对应实体
     */
    entity?: Dynamic_GenEntity | undefined;
    /**
     * 名称
     */
    name?: string;
    /**
     * 注释
     */
    comment?: string;
    /**
     * 种类
     */
    type?: TableType;
    /**
     * 自定排序
     */
    orderKey?: number;
    /**
     * 列
     */
    columns?: Array<Dynamic_GenColumn>;
    /**
     * 列 ID
     */
    columnIds?: Array<number>;
    /**
     * 唯一索引
     */
    indexes?: Array<Dynamic_GenTableIndex>;
    /**
     * 唯一索引 ID 视图
     */
    indexIds?: Array<number>;
    /**
     * 入关联
     */
    inAssociations?: Array<Dynamic_GenAssociation>;
    /**
     * 入关联 ID 视图
     */
    inAssociationIds?: Array<number>;
    /**
     * 出关联
     */
    outAssociations?: Array<Dynamic_GenAssociation>;
    /**
     * 出关联 ID 视图
     */
    outAssociationIds?: Array<number>;
}
