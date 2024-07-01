import type {GenAssociationView_TargetOf_columnReferences_TargetOf_sourceColumn, GenAssociationView_TargetOf_columnReferences_TargetOf_targetColumn} from './';

/**
 * 生成关联
 */
export interface GenAssociationView_TargetOf_columnReferences {
    /**
     * 主列
     */
    sourceColumn: GenAssociationView_TargetOf_columnReferences_TargetOf_sourceColumn;
    /**
     * 从列
     */
    targetColumn: GenAssociationView_TargetOf_columnReferences_TargetOf_targetColumn;
}
