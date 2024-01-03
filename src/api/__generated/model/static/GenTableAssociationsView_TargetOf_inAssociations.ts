import type {AssociationType, DissociateAction} from '../enums/';
import type {GenTableAssociationsView_TargetOf_inAssociations_TargetOf_columnReferences_2, GenTableAssociationsView_TargetOf_inAssociations_TargetOf_sourceTable_2} from './';

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
     * 备注
     */
    remark: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 关联类型
     */
    associationType: AssociationType;
    /**
     * 脱钩行为
     */
    dissociateAction?: DissociateAction | undefined;
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
    sourceTable: GenTableAssociationsView_TargetOf_inAssociations_TargetOf_sourceTable_2;
    /**
     * 列引用
     */
    columnReferences: Array<GenTableAssociationsView_TargetOf_inAssociations_TargetOf_columnReferences_2>;
}
