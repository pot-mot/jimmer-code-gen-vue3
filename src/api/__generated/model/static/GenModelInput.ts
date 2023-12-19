import type { DataSourceType, GenLanguage } from '../enums';

export interface GenModelInput {
    
    dataSourceType: DataSourceType;
    
    id?: number;
    
    language: GenLanguage;
    
    name: string;
    
    remark: string;
    
    value?: string;
}
