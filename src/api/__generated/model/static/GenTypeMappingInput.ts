import type { DataSourceType, GenLanguage } from '../enums';

export interface GenTypeMappingInput {
    
    dataSourceType: DataSourceType;
    
    language: GenLanguage;
    
    propertyType: string;
    
    remark?: string;
    
    typeExpression: string;
}
