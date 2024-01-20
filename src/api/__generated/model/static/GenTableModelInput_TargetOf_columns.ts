import type {GenTableModelInput_TargetOf_columns_TargetOf_enum_2} from './';

export interface GenTableModelInput_TargetOf_columns {
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
     * 生成枚举
     */
    enum?: GenTableModelInput_TargetOf_columns_TargetOf_enum_2 | undefined;
}
