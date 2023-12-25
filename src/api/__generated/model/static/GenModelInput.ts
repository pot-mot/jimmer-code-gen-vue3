import type { DataSourceType, GenLanguage } from '../enums';

export interface GenModelInput {
    
    dataSourceType: DataSourceType;
    
    graphData?: string;
    
    id?: number;
    
    language: GenLanguage;
    
    name: string;
    
    remark: string;
}
