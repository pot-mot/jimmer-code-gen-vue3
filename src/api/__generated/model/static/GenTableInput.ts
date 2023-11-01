import type { TableType } from '../enums';

export interface GenTableInput {
    
    comment: string;
    
    id?: number;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    schemaId?: number;
    
    type: TableType;
}
