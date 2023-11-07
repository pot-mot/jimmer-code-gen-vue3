import type { AssociationType } from '../enums';

export interface GenAssociationMatchView {
    
    associationType: AssociationType;
    
    sourceColumn: GenAssociationMatchView_TargetOf_sourceColumn;
    
    targetColumn: GenAssociationMatchView_TargetOf_targetColumn;
}

export interface GenAssociationMatchView_TargetOf_sourceColumn {
    
    id: number;
    
    table: GenAssociationMatchView_TargetOf_sourceColumn_TargetOf_table_2;
}

export interface GenAssociationMatchView_TargetOf_sourceColumn_TargetOf_table_2 {
    
    id: number;
}

export interface GenAssociationMatchView_TargetOf_targetColumn {
    
    id: number;
    
    table: GenAssociationMatchView_TargetOf_targetColumn_TargetOf_table_2;
}

export interface GenAssociationMatchView_TargetOf_targetColumn_TargetOf_table_2 {
    
    id: number;
}
