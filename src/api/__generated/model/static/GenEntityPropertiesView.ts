import type { AssociationType, GenerationType } from '../enums';

export interface GenEntityPropertiesView {
    
    add: boolean;
    
    author: string;
    
    comment: string;
    
    createdTime: string;
    
    edit: boolean;
    
    genPackage?: GenEntityPropertiesView_TargetOf_genPackage;
    
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

export interface GenEntityPropertiesView_TargetOf_genPackage {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_genPackage_TargetOf_parent;
}

export interface GenEntityPropertiesView_TargetOf_genPackage_TargetOf_parent {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_genPackage_TargetOf_parent;
}

export interface GenEntityPropertiesView_TargetOf_properties {
    
    associationAnnotation?: string;
    
    associationType?: AssociationType;
    
    columnId?: number;
    
    comment: string;
    
    createdTime: string;
    
    dissociateAnnotation?: string;
    
    entityId: number;
    
    enumId?: number;
    
    id: boolean;
    
    idGenerationType?: GenerationType;
    
    idView: boolean;
    
    idViewAnnotation?: string;
    
    key: boolean;
    
    list: boolean;
    
    logicalDelete: boolean;
    
    modifiedTime: string;
    
    name: string;
    
    notNull: boolean;
    
    otherAnnotation?: string;
    
    remark: string;
    
    type: string;
    
    typeTableId?: number;
}
