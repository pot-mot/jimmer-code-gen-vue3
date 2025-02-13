import type {PropertySpecialFormType} from '../enums/';
import type {AnnotationWithImports, PropertyBody} from './';

/**
 * 生成属性
 */
export interface GenPropertyEntityConfigInput {
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
     * 字面类型
     */
    type: string;
    /**
     * 是否列表
     */
    listType: boolean;
    /**
     * 是否非空
     */
    typeNotNull: boolean;
    /**
     * 是否为长关联
     */
    longAssociation: boolean;
    /**
     * 其他注解
     */
    otherAnnotation?: AnnotationWithImports | undefined;
    /**
     * 属性方法体
     */
    body?: PropertyBody | undefined;
    /**
     * 排序键
     */
    orderKey: number;
    /**
     * 特殊表单类型
     */
    specialFormType?: PropertySpecialFormType | undefined;
    /**
     * 是否在列表视图DTO中
     */
    inListView: boolean;
    /**
     * 是否在详情视图DTO中
     */
    inDetailView: boolean;
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
     * 是否在选项视图DTO中
     */
    inOptionView: boolean;
    /**
     * 是否在短关联视图DTO中
     */
    inShortAssociationView: boolean;
    /**
     * 是否在长关联视图DTO中
     */
    inLongAssociationView: boolean;
    /**
     * 是否在长关联入参DTO中
     */
    inLongAssociationInput: boolean;
    /**
     * 备注
     */
    remark: string;
    /**
     * 类型对应表 ID 视图
     */
    typeTableId?: number | undefined;
    /**
     * 生成枚举 ID 视图
     */
    enumId?: number | undefined;
}
