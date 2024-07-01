import type {TableType} from '../enums/';
import type {GenTableColumnsView_TargetOf_columns, GenTableColumnsView_TargetOf_indexes} from './';

/**
 * 生成表
 */
export interface GenTableColumnsView {
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
    /**
     * 列
     */
    columns: Array<GenTableColumnsView_TargetOf_columns>;
    /**
     * 唯一索引
     */
    indexes: Array<GenTableColumnsView_TargetOf_indexes>;
}
