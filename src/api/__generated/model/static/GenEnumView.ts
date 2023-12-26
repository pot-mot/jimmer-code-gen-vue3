import type { EnumType } from '../enums';

export interface GenEnumView {
    
    comment: string;
    
    createdTime: string;
    
    enumType?: EnumType;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    packagePath: string;
    
    remark: string;
}
