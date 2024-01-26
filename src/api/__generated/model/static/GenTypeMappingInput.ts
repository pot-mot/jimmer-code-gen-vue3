import type {DataSourceType, GenLanguage} from '../enums/';

export interface GenTypeMappingInput {
    id?: number | undefined;
    /**
     * 数据源类型
     */
    dataSourceType: DataSourceType;
    /**
     * 语言
     */
    language: GenLanguage;
    /**
     * 数据库类型表达式
     */
    typeExpression: string;
    /**
     * 属性类型
     */
    propertyType: string;
    /**
     * 排序键
     */
    orderKey: number;
    /**
     * 备注
     */
    remark: string;
}
