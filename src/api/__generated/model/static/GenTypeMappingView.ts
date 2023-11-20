import type { DataSourceType, GenLanguage } from '../enums';

export interface GenTypeMappingView {
    
    createdTime: string;
    
    dataSourceType: DataSourceType;
    
    id: number;
    
    language: GenLanguage;
    
    modifiedTime: string;
    
    orderKey: number;
    
    propertyType: string;
    
    remark: string;
    
    typeExpression: string;
}
