import type { EnumType } from '../enums';

export interface GenEnumView {
    
    comment: string;
    
    createdTime: string;
    
    enumType?: EnumType;
    
    genPackageId?: number;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
}
