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
    
    annotationExpression?: string;
    
    associationType?: AssociationType;
    
    comment: string;
    
    enumId?: number;
    
    id?: number;
    
    idGenerationType?: GenerationType;
    
    key: boolean;
    
    logicalDelete: boolean;
    
    name: string;
    
    remark: string;
    
    type: string;
}
