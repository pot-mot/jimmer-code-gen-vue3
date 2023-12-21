import type { AssociationType, DissociateAction } from '../enums';

export interface GenAssociationInput {
    
    associationType: AssociationType;
    
    columnReferences: Array<GenAssociationInput_TargetOf_columnReferences>;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    sourceTableId: number;
    
    targetTableId: number;
}

export interface GenAssociationInput_TargetOf_columnReferences {
    
    sourceColumnId: number;
    
    targetColumnId: number;
}
