import type { DataSourceType } from '../enums';

export interface GenDataSourceSchemasView {
    
    host: string;
    
    id: number;
    
    name: string;
    
    orderKey: number;
    
    port: string;
    
    schemas: GenDataSourceSchemasView_TargetOf_schemas[];
    
    type: DataSourceType;
}

export interface GenDataSourceSchemasView_TargetOf_schemas {
    
    dataSourceId: number;
    
    id: number;
    
    name: string;
    
    orderKey: number;
}
