import type { AssociationType } from '../enums';

export interface GenAssociationInput {
    
    associationType: AssociationType;
    
    comment: string;
    
    orderKey: number;
    
    remark: string;
    
    sourceColumnId: number;
    
    targetColumnId: number;
}
