import type {DataSourceType, GenLanguage} from '../enums/';

/**
 * 读取代码生成相关配置
 */
export interface GenConfig {
    /**
     * 数据源类型
     */
    dataSourceType: DataSourceType;
    /**
     * 语言，java/kotlin
     */
    language: GenLanguage;
    /**
     * 默认真实外键
     */
    realFk: boolean;
    /**
     * 默认启用小写命名
     */
    lowerCaseName: boolean;
    /**
     * 作者
     */
    author: string;
    /**
     * 默认包路径
     */
    defaultPackagePath: string;
    /**
     * 是否生成 IdView 属性
     */
    idViewProperty: boolean;
    /**
     * 逻辑删除默认配置
     */
    logicalDeletedAnnotation: string;
    /**
     * 是否生成 Table 注释
     */
    tableAnnotation: boolean;
    /**
     * 是否生成 Column 注释
     */
    columnAnnotation: boolean;
    /**
     * 是否生成 JoinTable 注释
     */
    joinTableAnnotation: boolean;
    /**
     * 是否生成 JoinColumn 注释
     */
    joinColumnAnnotation: boolean;
    /**
     * 表名前缀
     * 关联匹配 与 实体名生成 时生效
     * 配置文件中由 ',' 进行分割
     */
    tablePrefix: string;
    /**
     * 表名后缀
     * 关联匹配 与 实体名生成 时生效
     * 配置文件中由 ',' 进行分割
     */
    tableSuffix: string;
    /**
     * 表注释前缀
     * 实体注释生成 时生效
     * 配置文件中由 ',' 进行分割
     */
    tableCommentPrefix: string;
    /**
     * 表注释后缀
     * 实体注释生成 时生效
     * 配置文件中由 ',' 进行分割
     */
    tableCommentSuffix: string;
    /**
     * 列名前缀
     * 属性名生成 时生效
     * 配置文件中由 ',' 进行分割
     */
    columnPrefix: string;
    /**
     * 列名后缀
     * 属性名生成 时生效
     * 配置文件中由 ',' 进行分割
     */
    columnSuffix: string;
    /**
     * 列注释前缀
     * 属性名生成 时生效
     * 配置文件中由 ',' 进行分割
     */
    columnCommentPrefix: string;
    /**
     * 列注释后缀
     * 属性注释生成 时生效
     * 配置文件中由 ',' 进行分割
     */
    columnCommentSuffix: string;
}
