import type {DataSourceType, GenLanguage} from '../enums/';

export interface GenTypeMappingView {
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
     * 自定排序
     */
    orderKey: number;
}
