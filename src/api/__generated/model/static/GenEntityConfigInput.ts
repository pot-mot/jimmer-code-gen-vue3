import type { AssociationType, GenerationType } from '../enums';

export interface GenEntityConfigInput {
    
    add: boolean;
    
    author: string;
    
    comment: string;
    
    edit: boolean;
    
    genPath: string;
    
    id?: number;
    
    list: boolean;
    
    name: string;
    
    orderKey: number;
    
    properties: GenEntityConfigInput_TargetOf_properties[];
    
    query: boolean;
    
    remark: string;
}

export interface GenEntityConfigInput_TargetOf_properties {
    
    associationAnnotation?: string;
    
    associationType?: AssociationType;
    
    comment: string;
    
    dissociateAnnotation?: string;
    
    enumId?: number;
    
    id: boolean;
    
    idGenerationType?: GenerationType;
    
    idView: boolean;
    
    idViewAnnotation?: string;
    
    key: boolean;
    
    list: boolean;
    
    logicalDelete: boolean;
    
    name: string;
    
    notNull: boolean;
    
    otherAnnotation?: string;
    
    remark: string;
    
    type: string;
}
