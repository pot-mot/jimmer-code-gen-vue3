import type { DataSourceType, GenLanguage } from '../enums';

export interface GenConfig {
}

export interface GenConfig_Companion {
    
    author: string;
    
    columnPrefix: string[];
    
    columnSuffix: string[];
    
    dataSourceType: DataSourceType;
    
    language: GenLanguage;
    
    logicalDeletedAnnotation: string;
    
    removeColumnPrefix: boolean;
    
    removeColumnSuffix: boolean;
    
    removeTablePrefix: boolean;
    
    removeTableSuffix: boolean;
    
    separator: string;
    
    tablePrefix: string[];
    
    tableSuffix: string[];
}
