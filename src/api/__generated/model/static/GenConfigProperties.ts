import type {DataSourceType, GenLanguage} from '../enums/';

export interface GenConfigProperties {
    /**
     * 数据源类型
     */
    dataSourceType?: DataSourceType | undefined;
    /**
     * 语言，java/kotlin
     */
    language?: GenLanguage | undefined;
    /**
     * 作者
     */
    author?: string | undefined;
    /**
     * 默认包路径
     */
    packagePath?: string | undefined;
    /**
     * 默认启用小写命名
     */
    lowerCaseName?: boolean | undefined;
    /**
     * 默认真实外键
     */
    realFk?: boolean | undefined;
    /**
     * 是否生成 IdView 注释
     */
    idViewProperty?: boolean | undefined;
    /**
     * 逻辑删除默认配置
     */
    logicalDeletedAnnotation?: string | undefined;
    /**
     * 是否生成 Table 注释
     */
    tableAnnotation?: boolean | undefined;
    /**
     * 是否生成 Column 注释
     */
    columnAnnotation?: boolean | undefined;
    /**
     * 是否生成 JoinTable 注释
     */
    joinTableAnnotation?: boolean | undefined;
    /**
     * 是否生成 JoinColumn 注释
     */
    joinColumnAnnotation?: boolean | undefined;
    /**
     * 表名前缀
     * 关联匹配与实体名生成时生效
     * 配置文件中由 ',' 进行分割
     */
    tablePrefix?: string | undefined;
    /**
     * 表名后缀
     * 关联匹配与实体名生成时生效
     * 配置文件中由 ',' 进行分割
     */
    tableSuffix?: string | undefined;
    /**
     * 表注释前缀
     * 实体注释生成时生效
     * 配置文件中由 ',' 进行分割
     */
    tableCommentPrefix?: string | undefined;
    /**
     * 表注释后缀
     * 实体注释生成时生效
     * 配置文件中由 ',' 进行分割
     */
    tableCommentSuffix?: string | undefined;
    /**
     * 列名前缀
     * 属性名生成时生效
     * 配置文件中由 ',' 进行分割
     */
    columnPrefix?: string | undefined;
    /**
     * 列名后缀
     * 属性名生成时生效
     * 配置文件中由 ',' 进行分割
     */
    columnSuffix?: string | undefined;
    /**
     * 列注释前缀
     * 属性名生成时生效
     * 配置文件中由 ',' 进行分割
     */
    columnCommentPrefix?: string | undefined;
    /**
     * 列注释后缀
     * 属性注释生成时生效
     * 配置文件中由 ',' 进行分割
     */
    columnCommentSuffix?: string | undefined;
}
