import type { DataSourceType, TableType } from '../enums';

export interface GenTableCommonView {
    
    comment: string;
    
    createdTime: string;
    
    entityId?: number;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    schema?: GenTableCommonView_TargetOf_schema;
    
    type: TableType;
}

export interface GenTableCommonView_TargetOf_schema {
    
    dataSource: GenTableCommonView_TargetOf_schema_TargetOf_dataSource;
    
    id: number;
    
    name: string;
}

export interface GenTableCommonView_TargetOf_schema_TargetOf_dataSource {
    
    id: number;
    
    name: string;
    
    type: DataSourceType;
}
