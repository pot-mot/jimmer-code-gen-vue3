import type { DataSourceType } from '../enums';

export interface GenDataSourceView {
    
    host: string;
    
    id: number;
    
    name: string;
    
    orderKey: number;
    
    port: string;
    
    type: DataSourceType;
}
