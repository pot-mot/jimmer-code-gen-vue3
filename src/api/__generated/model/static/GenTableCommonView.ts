import type { TableType } from '../enums';

export interface GenTableCommonView {
    
    comment: string;
    
    createdTime: string;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    schema: GenTableCommonView_TargetOf_schema;
    
    type: TableType;
}

export interface GenTableCommonView_TargetOf_schema {
    
    dataSource: GenTableCommonView_TargetOf_schema_TargetOf_dataSource;
    
    id: number;
}

export interface GenTableCommonView_TargetOf_schema_TargetOf_dataSource {
    
    id: number;
}
