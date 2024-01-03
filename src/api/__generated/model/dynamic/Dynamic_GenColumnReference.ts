import type {Dynamic_GenAssociation, Dynamic_GenColumn} from './';

/**
 */
export interface Dynamic_GenColumnReference {
    /**
     * ID
     */
    id?: number;
    /**
     * 关联
     */
    association?: Dynamic_GenAssociation;
    /**
     * 关联 ID 视图
     */
    associationId?: number;
    /**
     * 主列
     */
    sourceColumn?: Dynamic_GenColumn;
    /**
     * 主列 ID 视图
     */
    sourceColumnId?: number;
    /**
     * 从列
     */
    targetColumn?: Dynamic_GenColumn;
    /**
     * 从列 ID 视图
     */
    targetColumnId?: number;
    /**
     * 自定排序
     */
    orderKey?: number;
}
