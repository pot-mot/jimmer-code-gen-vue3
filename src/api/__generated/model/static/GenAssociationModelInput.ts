import type { AssociationType, DissociateAction } from '../enums';

export interface GenAssociationModelInput {
    
    associationType: AssociationType;
    
    comment: string;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
    modelId?: number;
    
    sourceColumn: GenAssociationModelInput_TargetOf_sourceColumn;
    
    targetColumn: GenAssociationModelInput_TargetOf_targetColumn;
}

export interface GenAssociationModelInput_TargetOf_sourceColumn {
    
    comment: string;
    
    name: string;
    
    table: GenAssociationModelInput_TargetOf_sourceColumn_TargetOf_table_2;
    
    type: string;
    
    typeCode: number;
}

export interface GenAssociationModelInput_TargetOf_sourceColumn_TargetOf_table_2 {
    
    comment: string;
    
    modelId?: number;
    
    name: string;
}

export interface GenAssociationModelInput_TargetOf_targetColumn {
    
    comment: string;
    
    name: string;
    
    table: GenAssociationModelInput_TargetOf_targetColumn_TargetOf_table_2;
    
    type: string;
    
    typeCode: number;
}

export interface GenAssociationModelInput_TargetOf_targetColumn_TargetOf_table_2 {
    
    comment: string;
    
    modelId?: number;
    
    name: string;
}
