export interface GenPackageTreeView {
    
    children?: Array<GenPackageTreeView_TargetOf_children>;
    
    createdTime: string;
    
    entities: Array<GenPackageTreeView_TargetOf_entities>;
    
    enums: Array<GenPackageTreeView_TargetOf_enums>;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    parentId?: number;
    
    remark: string;
}

export interface GenPackageTreeView_TargetOf_children {
    
    children?: Array<GenPackageTreeView_TargetOf_children>;
    
    createdTime: string;
    
    entities: Array<GenPackageTreeView_TargetOf_children_TargetOf_entities_2>;
    
    enums: Array<GenPackageTreeView_TargetOf_children_TargetOf_enums_2>;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
}

export interface GenPackageTreeView_TargetOf_children_TargetOf_entities_2 {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    tableId: number;
}

export interface GenPackageTreeView_TargetOf_children_TargetOf_enums_2 {
    
    comment: string;
    
    id: number;
    
    name: string;
}

export interface GenPackageTreeView_TargetOf_entities {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    tableId: number;
}

export interface GenPackageTreeView_TargetOf_enums {
    
    comment: string;
    
    id: number;
    
    name: string;
}
