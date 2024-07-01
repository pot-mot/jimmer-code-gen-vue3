import type {AssociationType, DissociateAction} from '../enums/';
import type {GenAssociationModelInput_TargetOf_columnReferences} from './';

/**
 * 生成关联
 */
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
     * 列引用
     */
    columnReferences: Array<GenAssociationModelInput_TargetOf_columnReferences>;
    /**
     * 主表
     */
    sourceTableName: string;
    /**
     * 从表
     */
    targetTableName: string;
}
