import type { DataSourceType, GenLanguage } from '../enums';

export interface GenTypeMappingInput {
    
    dataSourceType: DataSourceType;
    
    id?: number;
    
    language: GenLanguage;
    
    orderKey: number;
    
    propertyType: string;
    
    remark: string;
    
    typeExpression: string;
}
