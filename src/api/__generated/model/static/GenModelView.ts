import type {DataSourceType, GenLanguage} from '../enums/';
import type {GenModelView_TargetOf_enums} from './';

export interface GenModelView {
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
     * 名称
     */
    name: string;
    /**
     * Graph 数据
     */
    graphData: string;
    /**
     * 同步转换实体
     */
    syncConvertEntity: boolean;
    /**
     * 语言
     */
    language: GenLanguage;
    /**
     * 数据源类型
     */
    dataSourceType: DataSourceType;
    /**
     * 作者
     */
    author: string;
    /**
     * 包路径
     */
    packagePath: string;
    /**
     * 启用小写命名
     */
    lowerCaseName: boolean;
    /**
     * 启用真实外键
     */
    realFk: boolean;
    /**
     * 生成 IdView 属性
     */
    idViewProperty: boolean;
    /**
     * 逻辑删除注解
     */
    logicalDeletedAnnotation: string;
    /**
     * 生成 Table 注解
     */
    tableAnnotation: boolean;
    /**
     * 生成 Column 注解
     */
    columnAnnotation: boolean;
    /**
     * 生成 JoinTable 注解
     */
    joinTableAnnotation: boolean;
    /**
     * 生成 JoinColumn 注解
     */
    joinColumnAnnotation: boolean;
    /**
     * 转换实体时移除的表名前缀
     */
    tableNamePrefixes: string;
    /**
     * 转换实体时移除的表名后缀
     */
    tableNameSuffixes: string;
    /**
     * 转换实体时移除的表注释前缀
     */
    tableCommentPrefixes: string;
    /**
     * 转换实体时移除的表注释后缀
     */
    tableCommentSuffixes: string;
    /**
     * 转换属性时移除的列名前缀
     */
    columnNamePrefixes: string;
    /**
     * 转换属性时移除的列名后缀
     */
    columnNameSuffixes: string;
    /**
     * 转换属性时移除的列注释前缀
     */
    columnCommentPrefixes: string;
    /**
     * 转换属性时移除的列注释后缀
     */
    columnCommentSuffixes: string;
    /**
     * 枚举
     */
    enums: Array<GenModelView_TargetOf_enums>;
}
