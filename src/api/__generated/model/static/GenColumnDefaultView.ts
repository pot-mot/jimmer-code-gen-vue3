import type { DataSourceType } from '../enums';

export interface GenColumnDefaultView {
    
    createdTime: string;
    
    dataSourceType: DataSourceType;
    
    defaultValue?: string;
    
    displaySize: number;
    
    id: number;
    
    modifiedTime: string;
    
    numericPrecision: number;
    
    orderKey: number;
    
    remark: string;
    
    type: string;
    
    typeCode: number;
}
