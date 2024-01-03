import type {GenTableModelInput_TargetOf_columns_TargetOf_enum_2} from './';

export interface GenTableModelInput_TargetOf_columns {
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
     * 列 JDBCType 码值
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
     * 生成枚举
     */
    enum?: GenTableModelInput_TargetOf_columns_TargetOf_enum_2 | undefined;
}
