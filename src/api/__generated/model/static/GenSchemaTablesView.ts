import type { TableType } from '../enums';

export interface GenSchemaTablesView {
    
    dataSourceId: number;
    
    id: number;
    
    name: string;
    
    orderKey: number;
    
    tables: GenSchemaTablesView_TargetOf_tables[];
}

export interface GenSchemaTablesView_TargetOf_tables {
    
    id: number;
    
    tableComment: string;
    
    tableName: string;
    
    tableType: TableType;
}
