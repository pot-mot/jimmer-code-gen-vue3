import type { DataSourceType } from '../enums';

export interface GenDataSourceTemplateView {
    
    host: string;
    
    name: string;
    
    port: string;
    
    remark: string;
    
    type: DataSourceType;
    
    urlSuffix: string;
    
    username: string;
}
