import type { AssociationType, DissociateAction } from '../enums';

export interface GenAssociationInput {
    
    associationType: AssociationType;
    
    comment: string;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
    orderKey: number;
    
    remark: string;
    
    sourceColumnId: number;
    
    targetColumnId: number;
}
