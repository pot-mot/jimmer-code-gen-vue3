import type {DataSourceType, GenLanguage} from '../enums/';
import type {
    Dynamic_GenAssociation, 
    Dynamic_GenEntity, 
    Dynamic_GenEnum, 
    Dynamic_GenTable
} from './';

/**
 */
export interface Dynamic_GenModel {
    /**
     * ID
     */
    id?: number;
    /**
     * 名称
     */
    name?: string;
    /**
     * Graph 数据
     */
    graphData?: string;
    /**
     * 语言
     */
    language?: GenLanguage;
    /**
     * 数据源类型
     */
    dataSourceType?: DataSourceType;
    /**
     * 包路径
     */
    packagePath?: string;
    /**
     * 同步转换实体
     */
    syncConvertEntity?: boolean;
    /**
     * 表
     */
    tables?: Array<Dynamic_GenTable>;
    /**
     * 表 ID 视图
     */
    tableIds?: Array<number>;
    /**
     * 关联
     */
    associations?: Array<Dynamic_GenAssociation>;
    /**
     * 关联 ID 视图
     */
    associationIds?: Array<number>;
    /**
     * 实体
     */
    entities?: Array<Dynamic_GenEntity>;
    /**
     * 实体 ID 视图
     */
    entityIds?: Array<number>;
    /**
     * 实体
     */
    enums?: Array<Dynamic_GenEnum>;
    /**
     * 实体 ID 视图
     */
    enumIds?: Array<number>;
}
