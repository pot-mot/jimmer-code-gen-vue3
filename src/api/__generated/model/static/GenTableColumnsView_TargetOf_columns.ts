import type {GenTableColumnsView_TargetOf_columns_TargetOf_enum} from './';

/**
 * 生成列
 */
export interface GenTableColumnsView_TargetOf_columns {
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
     * 长度
     */
    dataSize: number;
    /**
     * 精度
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
     * 是否为主键的部分
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
     * 业务键组
     */
    keyGroup?: string | undefined;
    /**
     * 是否为逻辑删除
     */
    logicalDelete: boolean;
    /**
     * 排序键
     */
    orderKey: number;
    /**
     * 备注
     */
    remark: string;
    /**
     * 生成枚举
     */
    enum?: GenTableColumnsView_TargetOf_columns_TargetOf_enum | undefined;
}
