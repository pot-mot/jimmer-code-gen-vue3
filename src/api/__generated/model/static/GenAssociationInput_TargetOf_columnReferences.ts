export interface GenAssociationInput_TargetOf_columnReferences {
    /**
     * ID
     */
    id?: number | undefined;
    /**
     * 排序键
     */
    orderKey: number;
    /**
     * 备注
     */
    remark: string;
    /**
     * 主列
     */
    sourceColumnId: number;
    /**
     * 从列
     */
    targetColumnId: number;
}
