import type { AssociationType } from '../enums';

export interface GenAssociationCommonView {
    
    associationType: AssociationType;
    
    comment: string;
    
    createdTime: string;
    
    id: number;
    
    modifiedTime: string;
    
    orderKey: number;
    
    remark: string;
    
    sourceColumn: GenAssociationCommonView_TargetOf_sourceColumn;
    
    targetColumn: GenAssociationCommonView_TargetOf_targetColumn;
}

export interface GenAssociationCommonView_TargetOf_sourceColumn {
    
    id: number;
    
    table?: GenAssociationCommonView_TargetOf_sourceColumn_TargetOf_table;
}

export interface GenAssociationCommonView_TargetOf_sourceColumn_TargetOf_table {
    
    id: number;
}

export interface GenAssociationCommonView_TargetOf_targetColumn {
    
    id: number;
    
    table?: GenAssociationCommonView_TargetOf_targetColumn_TargetOf_table;
}

export interface GenAssociationCommonView_TargetOf_targetColumn_TargetOf_table {
    
    id: number;
}
