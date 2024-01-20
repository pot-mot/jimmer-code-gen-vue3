import type {AssociationType, DissociateAction} from '../enums/';
import type {GenAssociationInput_TargetOf_columnReferences} from './';

export interface GenAssociationInput {
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
    sourceTableId: number;
    /**
     * 从表
     */
    targetTableId: number;
    /**
     * 列引用
     */
    columnReferences: Array<GenAssociationInput_TargetOf_columnReferences>;
}
