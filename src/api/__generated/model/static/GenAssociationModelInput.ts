import type { AssociationType, DissociateAction } from '../enums';

export interface GenAssociationModelInput {
    
    associationType: AssociationType;
    
    columnReferences: Array<GenAssociationModelInput_TargetOf_columnReferences>;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
    modelId?: number;
    
    name: string;
    
    sourceTable: GenAssociationModelInput_TargetOf_sourceTable;
    
    targetTable: GenAssociationModelInput_TargetOf_targetTable;
}

export interface GenAssociationModelInput_TargetOf_columnReferences {
    
    sourceColumn: GenAssociationModelInput_TargetOf_columnReferences_TargetOf_sourceColumn_2;
    
    targetColumn: GenAssociationModelInput_TargetOf_columnReferences_TargetOf_targetColumn_2;
}

export interface GenAssociationModelInput_TargetOf_columnReferences_TargetOf_sourceColumn_2 {
    
    comment: string;
    
    name: string;
    
    type: string;
    
    typeCode: number;
}

export interface GenAssociationModelInput_TargetOf_columnReferences_TargetOf_targetColumn_2 {
    
    comment: string;
    
    name: string;
    
    type: string;
    
    typeCode: number;
}

export interface GenAssociationModelInput_TargetOf_sourceTable {
    
    comment: string;
    
    modelId?: number;
    
    name: string;
}

export interface GenAssociationModelInput_TargetOf_targetTable {
    
    comment: string;
    
    modelId?: number;
    
    name: string;
}
