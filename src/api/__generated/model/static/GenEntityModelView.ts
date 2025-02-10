import type {GenEntityModelView_TargetOf_properties, OtherAnnotation} from './';

/**
 * 生成实体
 */
export interface GenEntityModelView {
    /**
     * ID
     */
    id: number;
    /**
     * 类名称
     */
    name: string;
    /**
     * 覆盖自动生成类名称
     */
    overwriteName: boolean;
    /**
     * 类注释
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
     * 是否可以创建
     */
    canAdd: boolean;
    /**
     * 是否可以修改
     */
    canEdit: boolean;
    /**
     * 是否可以查询
     */
    canQuery: boolean;
    /**
     * 是否可以删除
     */
    canDelete: boolean;
    /**
     * 是否具有页面
     */
    hasPage: boolean;
    /**
     * 属性
     */
    properties: Array<GenEntityModelView_TargetOf_properties>;
    /**
     * 名称
     */
    tableName: string;
}
