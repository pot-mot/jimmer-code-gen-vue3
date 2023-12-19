import type { DataSourceType, GenLanguage } from '../enums';

export interface GenModelSimpleView {
    
    createdTime: string;
    
    dataSourceType: DataSourceType;
    
    id: number;
    
    language: GenLanguage;
    
    modifiedTime: string;
    
    name: string;
    
    remark: string;
}
