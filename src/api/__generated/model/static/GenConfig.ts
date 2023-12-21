import type { DataSourceType, GenLanguage } from '../enums';

export interface GenConfig {
    
    author: string;
    
    columnAnnotation: boolean;
    
    columnCommentPrefix: string;
    
    columnCommentSuffix: string;
    
    columnPrefix: string;
    
    columnSuffix: string;
    
    dataSourceType: DataSourceType;
    
    defaultPackagePath: string;
    
    idViewProperty: boolean;
    
    joinColumnAnnotation: boolean;
    
    joinTableAnnotation: boolean;
    
    language: GenLanguage;
    
    logicalDeletedAnnotation: string;
    
    realFk: boolean;
    
    separator: string;
    
    tableAnnotation: boolean;
    
    tableCommentPrefix: string;
    
    tableCommentSuffix: string;
    
    tablePrefix: string;
    
    tableSuffix: string;
}
