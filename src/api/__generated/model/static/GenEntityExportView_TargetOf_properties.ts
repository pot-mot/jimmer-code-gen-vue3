import type {AssociationType, PropertySpecialFormType} from '../enums/';
import type {
    AnnotationWithImports, 
    GenEntityExportView_TargetOf_properties_TargetOf_typeTable, 
    JoinColumnMeta, 
    JoinTableMeta
} from './';

/**
 * 生成属性
 */
export interface GenEntityExportView_TargetOf_properties {
    /**
     * 字面类型
     */
    type: string;
    /**
     * 是否非空
     */
    typeNotNull: boolean;
    /**
     * 类型对应表
     */
    typeTable?: GenEntityExportView_TargetOf_properties_TargetOf_typeTable | undefined;
    /**
     * 关联类型
     */
    associationType?: AssociationType | undefined;
    /**
     * 关联列注解
     */
    joinColumnMetas?: Array<JoinColumnMeta> | undefined;
    /**
     * 关联表注解
     */
    joinTableMeta?: JoinTableMeta | undefined;
    /**
     * 属性名
     */
    name: string;
    /**
     * 覆盖自动生成属性名
     */
    overwriteName: boolean;
    /**
     * 属性注释
     */
    comment: string;
    /**
     * 覆盖自动生成注释
     */
    overwriteComment: boolean;
    /**
     * 备注
     */
    remark: string;
    /**
     * 是否 ID 属性
     */
    idProperty: boolean;
    /**
     * 是否是生成式 ID
     */
    generatedId: boolean;
    /**
     * 生成 ID 注解
     */
    generatedIdAnnotation?: AnnotationWithImports | undefined;
    /**
     * 是否为逻辑删除属性
     */
    logicalDelete: boolean;
    /**
     * 逻辑删除注解
     */
    logicalDeletedAnnotation?: AnnotationWithImports | undefined;
    /**
     * 其他注解
     */
    otherAnnotation?: AnnotationWithImports | undefined;
    /**
     * 排序键
     */
    orderKey: number;
    /**
     * 是否为长关联
     */
    longAssociation: boolean;
    /**
     * 是否在列表视图DTO中
     */
    inListView: boolean;
    /**
     * 是否在详情视图DTO中
     */
    inDetailView: boolean;
    /**
     * 是否在选项视图DTO中
     */
    inOptionView: boolean;
    /**
     * 是否在新增入参DTO中
     */
    inInsertInput: boolean;
    /**
     * 是否在修改入参DTO中
     */
    inUpdateInput: boolean;
    /**
     * 是否在查询规格DTO中
     */
    inSpecification: boolean;
    /**
     * 是否在短关联视图DTO中
     */
    inShortAssociationView: boolean;
    /**
     * 是否在长关联入参DTO中
     */
    inLongAssociationInput: boolean;
    /**
     * 是否在长关联视图DTO中
     */
    inLongAssociationView: boolean;
    /**
     * 特殊表单类型
     */
    specialFormType?: PropertySpecialFormType | undefined;
    /**
     * 名称
     */
    columnName?: string | undefined;
}
