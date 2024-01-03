import type {DataSourceType} from '../enums/';

export interface GenColumnDefaultInput {
    /**
     * ID
     */
    id?: number | undefined;
    /**
     * 备注
     */
    remark: string;
    /**
     * 数据源类型
     */
    dataSourceType: DataSourceType;
    /**
     * JDBCType 码值
     */
    typeCode: number;
    /**
     * 数据库类型表达式
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
     * 默认值
     */
    defaultValue?: string | undefined;
    /**
     * 自定排序
     */
    orderKey: number;
}
