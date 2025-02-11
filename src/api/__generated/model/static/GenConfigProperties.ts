import type {
    DataSourceType, 
    DatabaseNamingStrategyType, 
    GenLanguage, 
    ViewType
} from '../enums/';
import type {AnnotationWithImports} from './';

/**
 * 生成模型
 */
export interface GenConfigProperties {
    /**
     * 语言
     */
    language?: GenLanguage | undefined;
    /**
     * 数据源类型
     */
    dataSourceType?: DataSourceType | undefined;
    /**
     * 视图类型
     */
    viewType?: ViewType | undefined;
    /**
     * 作者
     */
    author?: string | undefined;
    /**
     * 包路径
     */
    packagePath?: string | undefined;
    /**
     * 表路径
     */
    tablePath?: string | undefined;
    /**
     * 数据库命名策略
     */
    databaseNamingStrategy?: DatabaseNamingStrategyType | undefined;
    /**
     * 启用真实外键
     */
    realFk?: boolean | undefined;
    /**
     * 生成 IdView 属性
     */
    idViewProperty?: boolean | undefined;
    /**
     * 默认 ID 类型
     */
    defaultIdType?: number | undefined;
    /**
     * 生成 ID 注解
     */
    generatedIdAnnotation?: AnnotationWithImports | undefined;
    /**
     * 逻辑删除注解
     */
    logicalDeletedAnnotation?: AnnotationWithImports | undefined;
    /**
     * 在前端视图中进行日期格式化
     */
    dateTimeFormatInView?: boolean | undefined;
    /**
     * 生成 Table 注解
     */
    tableAnnotation?: boolean | undefined;
    /**
     * 生成 Column 注解
     */
    columnAnnotation?: boolean | undefined;
    /**
     * 生成 JoinTable 注解
     */
    joinTableAnnotation?: boolean | undefined;
    /**
     * 生成 JoinColumn 注解
     */
    joinColumnAnnotation?: boolean | undefined;
    /**
     * 转换实体时移除的表名前缀
     */
    tableNamePrefixes?: string | undefined;
    /**
     * 转换实体时移除的表名后缀
     */
    tableNameSuffixes?: string | undefined;
    /**
     * 转换实体时移除的表注释前缀
     */
    tableCommentPrefixes?: string | undefined;
    /**
     * 转换实体时移除的表注释后缀
     */
    tableCommentSuffixes?: string | undefined;
    /**
     * 转换属性时移除的列名前缀
     */
    columnNamePrefixes?: string | undefined;
    /**
     * 转换属性时移除的列名后缀
     */
    columnNameSuffixes?: string | undefined;
    /**
     * 转换属性时移除的列注释前缀
     */
    columnCommentPrefixes?: string | undefined;
    /**
     * 转换属性时移除的列注释后缀
     */
    columnCommentSuffixes?: string | undefined;
}
