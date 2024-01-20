import type {AssociationType, DissociateAction} from '../enums/';
import type {GenTableAssociationsView_TargetOf_outAssociations_TargetOf_columnReferences_2, GenTableAssociationsView_TargetOf_outAssociations_TargetOf_targetTable_2} from './';

export interface GenTableAssociationsView_TargetOf_outAssociations {
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
     * 从表
     */
    targetTable: GenTableAssociationsView_TargetOf_outAssociations_TargetOf_targetTable_2;
    /**
     * 列引用
     */
    columnReferences: Array<GenTableAssociationsView_TargetOf_outAssociations_TargetOf_columnReferences_2>;
}
