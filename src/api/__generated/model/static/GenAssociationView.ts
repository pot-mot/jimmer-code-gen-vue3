import type { AssociationType, DissociateAction } from '../enums';

export interface GenAssociationView {
    
    associationType?: AssociationType;
    
    comment: string;
    
    createdTime: string;
    
    dissociateAction?: DissociateAction;
    
    id: number;
    
    modifiedTime: string;
    
    orderKey: number;
    
    remark: string;
    
    sourceColumn: GenAssociationView_TargetOf_sourceColumn;
    
    targetColumn: GenAssociationView_TargetOf_targetColumn;
}

export interface GenAssociationView_TargetOf_sourceColumn {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    table: GenAssociationView_TargetOf_sourceColumn_TargetOf_table;
}

export interface GenAssociationView_TargetOf_sourceColumn_TargetOf_table {
    
    comment: string;
    
    id: number;
    
    name: string;
}

export interface GenAssociationView_TargetOf_targetColumn {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    table: GenAssociationView_TargetOf_targetColumn_TargetOf_table;
}

export interface GenAssociationView_TargetOf_targetColumn_TargetOf_table {
    
    comment: string;
    
    id: number;
    
    name: string;
}
