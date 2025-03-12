import type {TableType} from '../enums/';
import type {
    GenTableColumnsView_TargetOf_columns, 
    GenTableColumnsView_TargetOf_indexes, 
    GenTableColumnsView_TargetOf_subGroup, 
    GenTableColumnsView_TargetOf_superTables
} from './';

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
     * 子组
     */
    subGroup?: GenTableColumnsView_TargetOf_subGroup | undefined;
    /**
     * 上级表
     */
    superTables: Array<GenTableColumnsView_TargetOf_superTables>;
    /**
     * 列
     */
    columns: Array<GenTableColumnsView_TargetOf_columns>;
    /**
     * 索引
     */
    indexes: Array<GenTableColumnsView_TargetOf_indexes>;
}
