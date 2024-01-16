import type {
    Dynamic_GenColumnReference, 
    Dynamic_GenEnum, 
    Dynamic_GenProperty, 
    Dynamic_GenTable, 
    Dynamic_GenTableIndex
} from './';

/**
 */
export interface Dynamic_GenColumn {
    /**
     * ID
     */
    id?: number;
    /**
     * 对应属性
     */
    properties?: Array<Dynamic_GenProperty>;
    /**
     * 对应属性 ID 视图
     */
    propertyIds?: Array<number>;
    /**
     * 归属表
     */
    table?: Dynamic_GenTable;
    /**
     * 归属表 ID 视图
     */
    tableId?: number;
    /**
     * 列在表中顺序
     */
    orderKey?: number;
    /**
     * 列名称
     */
    name?: string;
    /**
     * 列 JdbcType 码值
     */
    typeCode?: number;
    /**
     * 覆盖为字面类型
     */
    overwriteByType?: boolean;
    /**
     * 列字面类型
     */
    type?: string;
    /**
     * 列展示长度
     */
    displaySize?: number;
    /**
     * 列精度
     */
    numericPrecision?: number;
    /**
     * 列默认值
     */
    defaultValue?: string | undefined;
    /**
     * 列注释
     */
    comment?: string;
    /**
     * 是否主键
     */
    partOfPk?: boolean;
    /**
     * 是否自增
     */
    autoIncrement?: boolean;
    /**
     * 是否非空
     */
    typeNotNull?: boolean;
    /**
     * 是否为业务键
     */
    businessKey?: boolean;
    /**
     * 是否为逻辑删除
     */
    logicalDelete?: boolean;
    /**
     * 生成枚举
     */
    enum?: Dynamic_GenEnum | undefined;
    /**
     * 生成枚举 ID 视图
     */
    enumId?: number | undefined;
    /**
     * 唯一索引
     */
    indexes?: Array<Dynamic_GenTableIndex>;
    /**
     * 入关联
     */
    inColumnReferences?: Array<Dynamic_GenColumnReference>;
    /**
     * 出关联
     */
    outColumnReferences?: Array<Dynamic_GenColumnReference>;
}
