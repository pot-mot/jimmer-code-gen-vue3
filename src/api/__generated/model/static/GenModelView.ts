import type { DataSourceType, GenLanguage } from '../enums';

export interface GenModelView {
    
    createdTime: string;
    
    dataSourceType: DataSourceType;
    
    graphData: string;
    
    id: number;
    
    language: GenLanguage;
    
    modifiedTime: string;
    
    name: string;
    
    packagePath: string;
    
    remark: string;
    
    syncConvertEntity: boolean;
}
