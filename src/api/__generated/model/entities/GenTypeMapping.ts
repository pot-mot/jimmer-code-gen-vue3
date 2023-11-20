import type { DataSourceType, GenLanguage } from '../enums';

export interface GenTypeMapping {
    
    createdTime: string;
    
    modifiedTime: string;
    
    remark: string;
    
    id: number;
    
    dataSourceType: DataSourceType;
    
    language: GenLanguage;
    
    typeExpression: string;
    
    propertyType: string;
    
    orderKey: number;
}
