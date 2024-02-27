import type {AssociationType, DissociateAction} from '../enums/';
import type {GenTableAssociationsView_TargetOf_inAssociations_TargetOf_columnReferences, GenTableAssociationsView_TargetOf_inAssociations_TargetOf_sourceTable} from './';

export interface GenTableAssociationsView_TargetOf_inAssociations {
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
     * 备注
     */
    remark: string;
    /**
     * 主表
     */
    sourceTable: GenTableAssociationsView_TargetOf_inAssociations_TargetOf_sourceTable;
    /**
     * 列引用
     */
    columnReferences: Array<GenTableAssociationsView_TargetOf_inAssociations_TargetOf_columnReferences>;
}
