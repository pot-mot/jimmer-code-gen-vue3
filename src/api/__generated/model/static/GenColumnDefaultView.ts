import type {DataSourceType} from '../enums/';

export interface GenColumnDefaultView {
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
