import type { AssociationType } from '../enums';

export interface GenAssociationModelInput {
    
    associationType: AssociationType;
    
    sourceColumn: GenAssociationModelInput_TargetOf_sourceColumn;
    
    targetColumn: GenAssociationModelInput_TargetOf_targetColumn;
}

export interface GenAssociationModelInput_TargetOf_sourceColumn {
    
    name: string;
    
    table: GenAssociationModelInput_TargetOf_sourceColumn_TargetOf_table;
    
    type: string;
}

export interface GenAssociationModelInput_TargetOf_sourceColumn_TargetOf_table {
    
    comment: string;
    
    name: string;
}

export interface GenAssociationModelInput_TargetOf_targetColumn {
    
    name: string;
    
    table: GenAssociationModelInput_TargetOf_targetColumn_TargetOf_table;
    
    type: string;
}

export interface GenAssociationModelInput_TargetOf_targetColumn_TargetOf_table {
    
    comment: string;
    
    name: string;
}
