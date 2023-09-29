import type { AssociationType, GenerationType } from '../enums';

export interface GenEntityPropertiesView {
    
    add: boolean;
    
    author: string;
    
    comment: string;
    
    createdTime: string;
    
    edit: boolean;
    
    genPath: string;
    
    id: number;
    
    list: boolean;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    properties: GenEntityPropertiesView_TargetOf_properties[];
    
    query: boolean;
    
    remark: string;
    
    tableId?: number;
}

export interface GenEntityPropertiesView_TargetOf_properties {
    
    annotationExpression?: string;
    
    associationType?: AssociationType;
    
    columnId?: number;
    
    comment: string;
    
    createdTime: string;
    
    entityId: number;
    
    enumId?: number;
    
    id: boolean;
    
    idGenerationType?: GenerationType;
    
    key: boolean;
    
    logicalDelete: boolean;
    
    modifiedTime: string;
    
    name: string;
    
    remark: string;
    
    type: string;
}
