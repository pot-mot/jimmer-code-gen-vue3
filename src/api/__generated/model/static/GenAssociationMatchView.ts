import type { AssociationType } from '../enums';

export interface GenAssociationMatchView {
    
    associationType: AssociationType;
    
    sourceColumnId: number;
    
    targetColumnId: number;
}
