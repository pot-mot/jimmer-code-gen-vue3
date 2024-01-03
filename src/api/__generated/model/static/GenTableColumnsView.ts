import type {TableType} from '../enums/';
import type {GenTableColumnsView_TargetOf_columns, GenTableColumnsView_TargetOf_indexes, GenTableColumnsView_TargetOf_schema} from './';

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
     * 备注
     */
    remark: string;
    /**
     * 表名称
     */
    name: string;
    /**
     * 表注释
     */
    comment: string;
    /**
     * 表种类
     */
    type: TableType;
    /**
     * 自定排序
     */
    orderKey: number;
    /**
     * 对应实体
     */
    entityId?: number | undefined;
    /**
     * 数据架构
     */
    schema?: GenTableColumnsView_TargetOf_schema | undefined;
    /**
     * 列
     */
    columns: Array<GenTableColumnsView_TargetOf_columns>;
    /**
     * 唯一索引
     */
    indexes: Array<GenTableColumnsView_TargetOf_indexes>;
}
