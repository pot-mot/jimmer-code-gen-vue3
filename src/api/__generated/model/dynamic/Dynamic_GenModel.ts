import type {DataSourceType, GenLanguage} from '../enums/';
import type {
    Dynamic_GenAssociation, 
    Dynamic_GenEntity, 
    Dynamic_GenEnum, 
    Dynamic_GenTable
} from './';

/**
 */
export interface Dynamic_GenModel {
    /**
     * ID
     */
    id?: number;
    /**
     * 名称
     */
    name?: string;
    /**
     * Graph 数据
     */
    graphData?: string;
    /**
     * 同步转换实体
     */
    syncConvertEntity?: boolean;
    /**
     * 语言
     */
    language?: GenLanguage;
    /**
     * 数据源类型
     */
    dataSourceType?: DataSourceType;
    /**
     * 作者
     */
    author?: string;
    /**
     * 包路径
     */
    packagePath?: string;
    /**
     * 启用小写命名
     */
    lowerCaseName?: boolean;
    /**
     * 启用真实外键
     */
    realFk?: boolean;
    /**
     * 生成 IdView 属性
     */
    idViewProperty?: boolean;
    /**
     * 逻辑删除注解
     */
    logicalDeletedAnnotation?: string;
    /**
     * 生成 Table 注解
     */
    tableAnnotation?: boolean;
    /**
     * 生成 Column 注解
     */
    columnAnnotation?: boolean;
    /**
     * 生成 JoinTable 注解
     */
    joinTableAnnotation?: boolean;
    /**
     * 生成 JoinColumn 注解
     */
    joinColumnAnnotation?: boolean;
    /**
     * 转换实体时移除的表名前缀
     */
    tableNamePrefixes?: string;
    /**
     * 转换实体时移除的表名后缀
     */
    tableNameSuffixes?: string;
    /**
     * 转换实体时移除的表注释前缀
     */
    tableCommentPrefixes?: string;
    /**
     * 转换实体时移除的表注释后缀
     */
    tableCommentSuffixes?: string;
    /**
     * 转换属性时移除的列名前缀
     */
    columnNamePrefixes?: string;
    /**
     * 转换属性时移除的列名后缀
     */
    columnNameSuffixes?: string;
    /**
     * 转换属性时移除的列注释前缀
     */
    columnCommentPrefixes?: string;
    /**
     * 转换属性时移除的列注释后缀
     */
    columnCommentSuffixes?: string;
    /**
     * 表
     */
    tables?: Array<Dynamic_GenTable>;
    /**
     * 表 ID 视图
     */
    tableIds?: Array<number>;
    /**
     * 关联
     */
    associations?: Array<Dynamic_GenAssociation>;
    /**
     * 关联 ID 视图
     */
    associationIds?: Array<number>;
    /**
     * 实体
     */
    entities?: Array<Dynamic_GenEntity>;
    /**
     * 实体 ID 视图
     */
    entityIds?: Array<number>;
    /**
     * 枚举
     */
    enums?: Array<Dynamic_GenEnum>;
    /**
     * 枚举 ID 视图
     */
    enumIds?: Array<number>;
}
