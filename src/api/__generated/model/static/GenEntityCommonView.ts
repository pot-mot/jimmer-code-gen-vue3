export interface GenEntityCommonView {
    
    author: string;
    
    comment: string;
    
    createdTime: string;
    
    genPackage?: GenEntityCommonView_TargetOf_genPackage;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    tableId: number;
}

export interface GenEntityCommonView_TargetOf_genPackage {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityCommonView_TargetOf_genPackage_TargetOf_parent;
}

export interface GenEntityCommonView_TargetOf_genPackage_TargetOf_parent {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityCommonView_TargetOf_genPackage_TargetOf_parent;
}
