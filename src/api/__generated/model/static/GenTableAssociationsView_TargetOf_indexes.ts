export interface GenTableAssociationsView_TargetOf_indexes {
    /**
     * ID
     */
    id: number;
    /**
     * 归属表
     */
    tableId: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 唯一索引
     */
    uniqueIndex: boolean;
    /**
     * 列 ID 视图
     */
    columnIds: Array<number>;
}
