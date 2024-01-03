import type {Dynamic_GenColumn, Dynamic_GenTable} from './';

/**
 */
export interface Dynamic_GenTableIndex {
    /**
     * ID
     */
    id?: number;
    /**
     * 归属表
     */
    table?: Dynamic_GenTable;
    /**
     * 归属表 ID 视图
     */
    tableId?: number;
    /**
     * 名称
     */
    name?: string;
    /**
     * 唯一索引
     */
    uniqueIndex?: boolean;
    /**
     * 列
     */
    columns?: Array<Dynamic_GenColumn>;
    /**
     * 列 ID 视图
     */
    columnIds?: Array<number>;
}
