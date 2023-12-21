import type { AssociationType } from '../enums';

export interface GenAssociationMatchView {
    
    associationType: AssociationType;
    
    columnReferences: Array<GenAssociationMatchView_TargetOf_columnReferences>;
    
    fake: boolean;
    
    name: string;
    
    sourceTableId: number;
    
    targetTableId: number;
}

export interface GenAssociationMatchView_TargetOf_columnReferences {
    
    sourceColumnId: number;
    
    targetColumnId: number;
}
