export interface GenSchemaView {
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
     * 备注
     */
    remark: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 自定排序
     */
    orderKey: number;
    /**
     * 数据源
     */
    dataSourceId: number;
}
