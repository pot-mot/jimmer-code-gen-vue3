import type {AssociationType, DissociateAction} from '../enums/';
import type {Dynamic_GenColumnReference, Dynamic_GenModel, Dynamic_GenTable} from './';

/**
 */
export interface Dynamic_GenAssociation {
    /**
     * ID
     */
    id?: number;
    /**
     * 模型
     */
    model?: Dynamic_GenModel | undefined;
    /**
     * 模型 ID 视图
     */
    modelId?: number | undefined;
    /**
     * 名称
     */
    name?: string;
    /**
     * 主表
     */
    sourceTable?: Dynamic_GenTable;
    /**
     * 主表 ID 视图
     */
    sourceTableId?: number;
    /**
     * 从表
     */
    targetTable?: Dynamic_GenTable;
    /**
     * 从表 ID 视图
     */
    targetTableId?: number;
    /**
     * 列引用
     */
    columnReferences?: Array<Dynamic_GenColumnReference>;
    /**
     * 列引用 ID 视图
     */
    columnReferenceIds?: Array<number>;
    /**
     * 类型
     */
    type?: AssociationType;
    /**
     * 脱钩行为
     */
    dissociateAction?: DissociateAction | undefined;
    /**
     * 更新行为
     */
    updateAction?: string;
    /**
     * 删除行为
     */
    deleteAction?: string;
    /**
     * 是否伪外键
     */
    fake?: boolean;
    /**
     * 自定排序
     */
    orderKey?: number;
}
