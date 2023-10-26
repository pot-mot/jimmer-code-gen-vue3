export interface GenEnumItemsView {
    
    comment: string;
    
    createdTime: string;
    
    genPackageId?: number;
    
    id: number;
    
    items: GenEnumItemsView_TargetOf_items[];
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
}

export interface GenEnumItemsView_TargetOf_items {
    
    comment: string;
    
    createdTime: string;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    remark: string;
    
    value: string;
}