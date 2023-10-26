export interface GenPackageTreeView {
    
    children?: GenPackageTreeView_TargetOf_children[];
    
    createdTime: string;
    
    entities: GenPackageTreeView_TargetOf_entities[];
    
    enums: GenPackageTreeView_TargetOf_enums[];
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    parentId?: number;
    
    remark: string;
}

export interface GenPackageTreeView_TargetOf_children {
    
    children?: GenPackageTreeView_TargetOf_children[];
    
    createdTime: string;
    
    entities: GenPackageTreeView_TargetOf_children_TargetOf_entities[];
    
    enums: GenPackageTreeView_TargetOf_children_TargetOf_enums[];
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
}

export interface GenPackageTreeView_TargetOf_children_TargetOf_entities {
    
    id: number;
    
    name: string;
    
    tableId: number;
}

export interface GenPackageTreeView_TargetOf_children_TargetOf_enums {
    
    id: number;
    
    name: string;
}

export interface GenPackageTreeView_TargetOf_entities {
    
    id: number;
    
    name: string;
    
    tableId: number;
}

export interface GenPackageTreeView_TargetOf_enums {
    
    id: number;
    
    name: string;
}
