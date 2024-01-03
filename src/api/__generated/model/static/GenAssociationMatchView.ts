import type {AssociationType} from '../enums/';
import type {GenAssociationMatchView_TargetOf_columnReferences} from './';

export interface GenAssociationMatchView {
    /**
     * 名称
     */
    name: string;
    /**
     * 关联类型
     */
    associationType: AssociationType;
    /**
     * 是否伪外键
     */
    fake: boolean;
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
    columnReferences: Array<GenAssociationMatchView_TargetOf_columnReferences>;
}
