import type { EnumType } from '../enums';

export interface GenEnumItemsInput {
    
    comment: string;
    
    enumType?: EnumType;
    
    id?: number;
    
    items: Array<GenEnumItemsInput_TargetOf_items>;
    
    modelId?: number;
    
    name: string;
    
    orderKey: number;
    
    packagePath: string;
    
    remark: string;
}

export interface GenEnumItemsInput_TargetOf_items {
    
    comment: string;
    
    id?: number;
    
    mappedValue: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
}
