export interface GenEntityCommonView {
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
     * 包路径
     */
    packagePath: string;
    /**
     * 类名称
     */
    name: string;
    /**
     * 类注释
     */
    comment: string;
    /**
     * 作者
     */
    author: string;
    /**
     * 备注
     */
    remark: string;
    /**
     * 对应表
     */
    tableId: number;
}
