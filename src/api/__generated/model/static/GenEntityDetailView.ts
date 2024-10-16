import type {GenEntityDetailView_TargetOf_properties} from './';

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
     * 类注释
     */
    comment: string;
    /**
     * 作者
     */
    author: string;
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
