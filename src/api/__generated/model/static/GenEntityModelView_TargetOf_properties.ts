import type {AssociationType} from '../enums/';
import type {
    GenEntityModelView_TargetOf_properties_TargetOf_typeTable, 
    JoinColumnMeta, 
    JoinTableMeta, 
    OtherAnnotation
} from './';

/**
 * 生成属性
 */
export interface GenEntityModelView_TargetOf_properties {
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
    typeTable?: GenEntityModelView_TargetOf_properties_TargetOf_typeTable | undefined;
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
     * 其他注解
     */
    otherAnnotation?: OtherAnnotation | undefined;
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
     * 名称
     */
    columnName?: string | undefined;
}
