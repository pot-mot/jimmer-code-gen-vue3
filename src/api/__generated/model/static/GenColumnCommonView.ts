export interface GenColumnCommonView {
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
     * 列在表中顺序
     */
    orderKey: number;
    /**
     * 列名称
     */
    name: string;
    /**
     * 列 JdbcType 码值
     */
    typeCode: number;
    /**
     * 覆盖为字面类型
     */
    overwriteByType: boolean;
    /**
     * 列字面类型
     */
    type: string;
    /**
     * 列展示长度
     */
    displaySize: number;
    /**
     * 列精度
     */
    numericPrecision: number;
    /**
     * 列默认值
     */
    defaultValue?: string | undefined;
    /**
     * 列注释
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
     * 是否非空
     */
    typeNotNull: boolean;
    /**
     * 是否为业务键
     */
    businessKey: boolean;
    /**
     * 是否为逻辑删除
     */
    logicalDelete: boolean;
    /**
     * 归属表
     */
    tableId: number;
    /**
     * 生成枚举
     */
    enumId?: number | undefined;
}
