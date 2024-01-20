import type {AssociationType, DissociateAction} from '../enums/';
import type {GenAssociationView_TargetOf_columnReferences, GenAssociationView_TargetOf_sourceTable, GenAssociationView_TargetOf_targetTable} from './';

export interface GenAssociationView {
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
     * 类型
     */
    type: AssociationType;
    /**
     * 脱钩行为
     */
    dissociateAction?: DissociateAction | undefined;
    /**
     * 更新行为
     */
    updateAction: string;
    /**
     * 删除行为
     */
    deleteAction: string;
    /**
     * 是否伪外键
     */
    fake: boolean;
    /**
     * 自定排序
     */
    orderKey: number;
    /**
     * 主表
     */
    sourceTable: GenAssociationView_TargetOf_sourceTable;
    /**
     * 从表
     */
    targetTable: GenAssociationView_TargetOf_targetTable;
    /**
     * 列引用
     */
    columnReferences: Array<GenAssociationView_TargetOf_columnReferences>;
}
