import type { DataSourceType } from '../enums';

export interface GenColumnDefaultInput {
    
    dataSourceType: DataSourceType;
    
    defaultValue?: string;
    
    displaySize: number;
    
    id?: number;
    
    numericPrecision: number;
    
    orderKey: number;
    
    remark: string;
    
    type: string;
    
    typeCode: number;
}
