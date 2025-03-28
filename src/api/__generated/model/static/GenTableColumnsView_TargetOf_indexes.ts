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
     * 索引
     */
    uniqueIndex: boolean;
    /**
     * 备注
     */
    remark: string;
    /**
     * 列 ID 视图
     */
    columnIds: Array<number>;
}
