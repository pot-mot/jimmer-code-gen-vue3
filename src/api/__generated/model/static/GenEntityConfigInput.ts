import type { AssociationType, GenerationType } from '../enums';

export interface GenEntityConfigInput {
    
    author: string;
    
    comment: string;
    
    id?: number;
    
    name: string;
    
    orderKey: number;
    
    properties: Array<GenEntityConfigInput_TargetOf_properties>;
    
    remark: string;
}

export interface GenEntityConfigInput_TargetOf_properties {
    
    associationAnnotation?: string;
    
    associationType?: AssociationType;
    
    comment: string;
    
    dissociateAnnotation?: string;
    
    id?: number;
    
    idGenerationType?: GenerationType;
    
    idProperty: boolean;
    
    idView: boolean;
    
    idViewAnnotation?: string;
    
    keyProperty: boolean;
    
    listType: boolean;
    
    logicalDelete: boolean;
    
    name: string;
    
    orderKey: number;
    
    otherAnnotation?: string;
    
    remark: string;
    
    type: string;
    
    typeNotNull: boolean;
}
