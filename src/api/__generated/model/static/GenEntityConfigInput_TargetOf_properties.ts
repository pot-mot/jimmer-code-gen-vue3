import type {AssociationType, GenerationType} from '../enums/';

export interface GenEntityConfigInput_TargetOf_properties {
    /**
     * ID
     */
    id?: number | undefined;
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
     * 排序键
     */
    orderKey: number;
    /**
     * 备注
     */
    remark: string;
}
