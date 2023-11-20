export interface GenEnumItemsInput {
    
    comment: string;
    
    genPackageId?: number;
    
    items: Array<GenEnumItemsInput_TargetOf_items>;
    
    name: string;
}

export interface GenEnumItemsInput_TargetOf_items {
    
    name: string;
    
    value: string;
}
