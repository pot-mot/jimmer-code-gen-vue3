import type {Dynamic_GenDataSource, Dynamic_GenTable} from './';

/**
 */
export interface Dynamic_GenSchema {
    /**
     * ID
     */
    id?: number;
    /**
     * 数据源 ID
     */
    dataSourceId?: number;
    /**
     * 数据源
     */
    dataSource?: Dynamic_GenDataSource;
    /**
     * 名称
     */
    name?: string;
    /**
     * 自定排序
     */
    orderKey?: number;
    /**
     * 表
     */
    tables?: Array<Dynamic_GenTable>;
}
