import type {AssociationType, GenerationType} from '../enums/';
import type {GenEntityPropertiesView_TargetOf_properties_TargetOf_column_2, GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2, GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2} from './';

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
     * 备注
     */
    remark: string;
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
     * 是否Id
     */
    idProperty: boolean;
    /**
     * Id 生成类型
     */
    idGenerationType?: GenerationType | undefined;
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
     * ID 视图注释
     */
    idViewAnnotation?: string | undefined;
    /**
     * 关联类型
     */
    associationType?: AssociationType | undefined;
    /**
     * 关联注释
     */
    associationAnnotation?: string | undefined;
    /**
     * 脱钩注释
     */
    dissociateAnnotation?: string | undefined;
    /**
     * 其他注释
     */
    otherAnnotation?: string | undefined;
    /**
     * 自定排序
     */
    orderKey: number;
    /**
     * 归属实体
     */
    entityId: number;
    /**
     * 对应列
     */
    column?: GenEntityPropertiesView_TargetOf_properties_TargetOf_column_2 | undefined;
    /**
     * 类型对应表
     */
    typeTable?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2 | undefined;
    /**
     * 生成枚举
     */
    enum?: GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2 | undefined;
}
