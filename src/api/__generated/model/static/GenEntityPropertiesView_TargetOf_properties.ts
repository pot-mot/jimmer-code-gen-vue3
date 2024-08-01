import type {AssociationType} from '../enums/';
import type {
    GenEntityPropertiesView_TargetOf_properties_TargetOf_column, 
    GenEntityPropertiesView_TargetOf_properties_TargetOf_enum, 
    GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable, 
    JoinColumnMeta, 
    JoinTableMeta
} from './';

/**
 * 生成属性
 */
export interface GenEntityPropertiesView_TargetOf_properties {
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
     * 属性名
     */
    name: string;
    /**
     * 属性注释
     */
    comment: string;
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
     * 是否 ID 属性
     */
    idProperty: boolean;
    /**
     * ID 生成类型
     */
    idGenerationAnnotation?: string | undefined;
    /**
     * 是否为业务键属性
     */
    keyProperty: boolean;
    /**
     * 是否为逻辑删除属性
     */
    logicalDelete: boolean;
    /**
     * 是否为 ID 视图属性
     */
    idView: boolean;
    /**
     * ID 视图注解
     */
    idViewTarget?: string | undefined;
    /**
     * 关联类型
     */
    associationType?: AssociationType | undefined;
    /**
     * 映射镜像
     */
    mappedBy?: string | undefined;
    /**
     * 输入非空
     */
    inputNotNull?: boolean | undefined;
    /**
     * 关联列注解
     */
    joinColumnMetas?: Array<JoinColumnMeta> | undefined;
    /**
     * 关联表注解
     */
    joinTableMeta?: JoinTableMeta | undefined;
    /**
     * 脱钩注解
     */
    dissociateAnnotation?: string | undefined;
    /**
     * 其他注解
     */
    otherAnnotation?: string | undefined;
    /**
     * 排序键
     */
    orderKey: number;
    /**
     * 备注
     */
    remark: string;
    /**
     * 归属实体
     */
    entityId: number;
    /**
     * 对应列
     */
    column?: GenEntityPropertiesView_TargetOf_properties_TargetOf_column | undefined;
    /**
     * 类型对应表
     */
    typeTable?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable | undefined;
    /**
     * 生成枚举
     */
    enum?: GenEntityPropertiesView_TargetOf_properties_TargetOf_enum | undefined;
}
