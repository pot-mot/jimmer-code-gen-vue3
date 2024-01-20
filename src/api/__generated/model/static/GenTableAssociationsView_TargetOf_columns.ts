export interface GenTableAssociationsView_TargetOf_columns {
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
     * JdbcType 码值
     */
    typeCode: number;
    /**
     * 覆盖为字面类型
     */
    overwriteByRaw: boolean;
    /**
     * 字面类型
     */
    rawType: string;
    /**
     * 是否非空
     */
    typeNotNull: boolean;
    /**
     * 展示长度
     */
    displaySize: number;
    /**
     * 数字精度
     */
    numericPrecision: number;
    /**
     * 默认值
     */
    defaultValue?: string | undefined;
    /**
     * 注释
     */
    comment: string;
    /**
     * 是否主键
     */
    partOfPk: boolean;
    /**
     * 是否自增
     */
    autoIncrement: boolean;
    /**
     * 是否为业务键
     */
    businessKey: boolean;
    /**
     * 是否为逻辑删除
     */
    logicalDelete: boolean;
    /**
     * 在表中顺序
     */
    orderKey: number;
    /**
     * 归属表
     */
    tableId: number;
    /**
     * 生成枚举
     */
    enumId?: number | undefined;
}
