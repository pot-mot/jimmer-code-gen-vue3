import type {TableType} from '../enums/';

/**
 * 生成表
 */
export interface GenTableCommonView {
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
     * 名称
     */
    name: string;
    /**
     * 注释
     */
    comment: string;
    /**
     * 种类
     */
    type: TableType;
    /**
     * 备注
     */
    remark: string;
    /**
     * 对应实体
     */
    entityId?: number | undefined;
}
