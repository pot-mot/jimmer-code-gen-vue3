import type { EnumType } from '../enums';

export interface GenEnumItemsInput {
    
    comment: string;
    
    enumType?: EnumType;
    
    genPackageId?: number;
    
    id?: number;
    
    items: Array<GenEnumItemsInput_TargetOf_items>;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
}

export interface GenEnumItemsInput_TargetOf_items {
    
    comment: string;
    
    id?: number;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    value: string;
}
