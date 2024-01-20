import type {AssociationType, GenerationType} from '../enums/';
import type {
    Dynamic_GenColumn, 
    Dynamic_GenEntity, 
    Dynamic_GenEnum, 
    Dynamic_GenTable
} from './';

/**
 */
export interface Dynamic_GenProperty {
    /**
     * ID
     */
    id?: number;
    /**
     * 对应列 ID
     */
    columnId?: number | undefined;
    /**
     * 对应列
     */
    column?: Dynamic_GenColumn | undefined;
    /**
     * 归属实体编号
     */
    entityId?: number;
    /**
     * 归属实体
     */
    entity?: Dynamic_GenEntity;
    /**
     * 属性名
     */
    name?: string;
    /**
     * 属性注释
     */
    comment?: string;
    /**
     * 字面类型
     */
    type?: string;
    /**
     * 类型对应表
     */
    typeTable?: Dynamic_GenTable | undefined;
    /**
     * 类型对应表 ID 视图
     */
    typeTableId?: number | undefined;
    /**
     * 是否列表
     */
    listType?: boolean;
    /**
     * 是否非空
     */
    typeNotNull?: boolean;
    /**
     * 是否Id
     */
    idProperty?: boolean;
    /**
     * Id 生成类型
     */
    idGenerationType?: GenerationType | undefined;
    /**
     * 是否为业务键属性
     */
    keyProperty?: boolean;
    /**
     * 是否为逻辑删除属性
     */
    logicalDelete?: boolean;
    /**
     * 是否为 ID 视图属性
     */
    idView?: boolean;
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
    orderKey?: number;
    /**
     * 生成枚举 ID 视图
     */
    enumId?: number | undefined;
    /**
     * 生成枚举
     */
    enum?: Dynamic_GenEnum | undefined;
}
