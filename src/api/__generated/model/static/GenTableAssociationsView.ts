import type {TableType} from '../enums/';
import type {
    GenTableAssociationsView_TargetOf_columns, 
    GenTableAssociationsView_TargetOf_inAssociations, 
    GenTableAssociationsView_TargetOf_indexes, 
    GenTableAssociationsView_TargetOf_outAssociations
} from './';

/**
 * base on GenTableColumnsView and single part of GenAssociationView
 */
export interface GenTableAssociationsView {
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
     * 自定排序
     */
    orderKey: number;
    /**
     * 对应实体
     */
    entityId?: number | undefined;
    /**
     * 列
     */
    columns: Array<GenTableAssociationsView_TargetOf_columns>;
    /**
     * 唯一索引
     */
    indexes: Array<GenTableAssociationsView_TargetOf_indexes>;
    /**
     * 入关联
     */
    inAssociations: Array<GenTableAssociationsView_TargetOf_inAssociations>;
    /**
     * 出关联
     */
    outAssociations: Array<GenTableAssociationsView_TargetOf_outAssociations>;
}
