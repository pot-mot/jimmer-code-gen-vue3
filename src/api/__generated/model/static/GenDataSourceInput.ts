import type { DataSourceType } from '../enums';

export interface GenDataSourceInput {
    
    createdTime: string;
    
    host: string;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    password: string;
    
    port: string;
    
    remark: string;
    
    type: DataSourceType;
    
    username: string;
}
