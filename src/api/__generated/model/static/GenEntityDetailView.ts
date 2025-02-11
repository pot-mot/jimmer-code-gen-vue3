import type {AnnotationWithImports, GenEntityDetailView_TargetOf_properties} from './';

/**
 * 生成实体
 */
export interface GenEntityDetailView {
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
     * 包路径
     */
    packagePath: string;
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
     * 作者
     */
    author: string;
    /**
     * 其他注解
     */
    otherAnnotation?: AnnotationWithImports | undefined;
    /**
     * 是否可以创建
     */
    canAdd: boolean;
    /**
     * 是否可以修改
     */
    canEdit: boolean;
    /**
     * 是否可以删除
     */
    canDelete: boolean;
    /**
     * 是否可以查询
     */
    canQuery: boolean;
    /**
     * 是否具有管理端页面
     */
    hasPage: boolean;
    /**
     * 管理端页面中可查询
     */
    pageCanQuery: boolean;
    /**
     * 管理端页面中可新增
     */
    pageCanAdd: boolean;
    /**
     * 管理端页面中可编辑
     */
    pageCanEdit: boolean;
    /**
     * 管理端页面中可查看详情
     */
    pageCanViewDetail: boolean;
    /**
     * 管理端页面中可删除
     */
    pageCanDelete: boolean;
    /**
     * 应用分页查询
     */
    queryByPage: boolean;
    /**
     * 备注
     */
    remark: string;
    /**
     * 模型
     */
    modelId?: number | undefined;
    /**
     * 对应表
     */
    tableId: number;
    /**
     * 上级实体
     */
    superEntityIds: Array<number>;
    /**
     * 属性
     */
    properties: Array<GenEntityDetailView_TargetOf_properties>;
}
