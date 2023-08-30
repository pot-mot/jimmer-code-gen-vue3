import type { AssociationType } from '../enums';

export interface GenAssociationPreviewView {
    
    associationType: AssociationType;
    
    comment: string;
    
    createdTime: string;
    
    modifiedTime: string;
    
    orderKey: number;
    
    remark: string;
}
