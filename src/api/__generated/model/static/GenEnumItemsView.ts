import type { EnumType } from '../enums';

export interface GenEnumItemsView {
    
    comment: string;
    
    createdTime: string;
    
    enumType?: EnumType;
    
    id: number;
    
    items: Array<GenEnumItemsView_TargetOf_items>;
    
    modelId?: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    packagePath: string;
    
    remark: string;
}

export interface GenEnumItemsView_TargetOf_items {
    
    comment: string;
    
    createdTime: string;
    
    id: number;
    
    mappedValue: string;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
}
