/**
 * 生成列
 */
export interface GenTableColumnsView_TargetOf_indexes {
    /**
     * ID
     */
    id: number;
    /**
     * 创建事件
     */
    createdTime: string;
    /**
     * 修改时间
     */
    modifiedTime: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 唯一索引
     */
    uniqueIndex: boolean;
    /**
     * 备注
     */
    remark: string;
    /**
     * 归属表
     */
    tableId: number;
    /**
     * 列 ID 视图
     */
    columnIds: Array<number>;
}
