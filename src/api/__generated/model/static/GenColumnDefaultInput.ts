import type {DataSourceType} from '../enums/';

export interface GenColumnDefaultInput {
    /**
     * ID
     */
    id?: number | undefined;
    /**
     * 数据源类型
     */
    dataSourceType: DataSourceType;
    /**
     * JdbcType 码值
     */
    typeCode: number;
    /**
     * 数据库类型表达式
     */
    rawType: string;
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
     * 排序键
     */
    orderKey: number;
    /**
     * 备注
     */
    remark: string;
}
