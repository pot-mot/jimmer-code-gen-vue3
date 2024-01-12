import type {DataSourceType, GenLanguage} from '../enums/';

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
     * 作者
     */
    author: string;
    /**
     * 默认包路径
     */
    packagePath: string;
    /**
     * 默认启用小写命名
     */
    lowerCaseName: boolean;
    /**
     * 默认真实外键
     */
    realFk: boolean;
    /**
     * 是否生成 IdView 注释
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
     */
    tablePrefix: string;
    /**
     * 表名后缀
     */
    tableSuffix: string;
    /**
     * 表注释前缀
     */
    tableCommentPrefix: string;
    /**
     * 表注释后缀
     */
    tableCommentSuffix: string;
    /**
     * 列名前缀
     */
    columnPrefix: string;
    /**
     * 列名后缀
     */
    columnSuffix: string;
    /**
     * 列注释前缀
     */
    columnCommentPrefix: string;
    /**
     * 列注释后缀
     */
    columnCommentSuffix: string;
}
