import type {AssociationType, DissociateAction} from '../enums/';
import type {GenAssociationModelInput_TargetOf_columnReferences, GenAssociationModelInput_TargetOf_sourceTable, GenAssociationModelInput_TargetOf_targetTable} from './';

export interface GenAssociationModelInput {
    /**
     * 模型
     */
    modelId?: number | undefined;
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
     * 主表
     */
    sourceTable: GenAssociationModelInput_TargetOf_sourceTable;
    /**
     * 从表
     */
    targetTable: GenAssociationModelInput_TargetOf_targetTable;
    /**
     * 列引用
     */
    columnReferences: Array<GenAssociationModelInput_TargetOf_columnReferences>;
}
