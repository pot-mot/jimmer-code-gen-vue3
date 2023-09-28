import type { TableType } from '../enums';

export interface GenTableCommonView {
    
    comment: string;
    
    createdTime: string;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    schemaId: number;
    
    type: TableType;
}
