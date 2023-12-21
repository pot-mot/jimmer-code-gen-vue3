import type { AssociationType, DissociateAction } from '../enums';

export interface GenAssociationView {
    
    associationType: AssociationType;
    
    columnReferences: Array<GenAssociationView_TargetOf_columnReferences>;
    
    createdTime: string;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    sourceTable: GenAssociationView_TargetOf_sourceTable;
    
    targetTable: GenAssociationView_TargetOf_targetTable;
}

export interface GenAssociationView_TargetOf_columnReferences {
    
    sourceColumn: GenAssociationView_TargetOf_columnReferences_TargetOf_sourceColumn_2;
    
    targetColumn: GenAssociationView_TargetOf_columnReferences_TargetOf_targetColumn_2;
}

export interface GenAssociationView_TargetOf_columnReferences_TargetOf_sourceColumn_2 {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    type: string;
}

export interface GenAssociationView_TargetOf_columnReferences_TargetOf_targetColumn_2 {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    type: string;
}

export interface GenAssociationView_TargetOf_sourceTable {
    
    comment: string;
    
    id: number;
    
    name: string;
}

export interface GenAssociationView_TargetOf_targetTable {
    
    comment: string;
    
    id: number;
    
    name: string;
}
