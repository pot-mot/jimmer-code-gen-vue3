import type { DataSourceType, GenLanguage } from '../enums';

export interface GenConfigProperties {
    
    author?: string;
    
    columnCommentPrefix?: string;
    
    columnCommentSuffix?: string;
    
    columnPrefix?: string;
    
    columnSuffix?: string;
    
    dataSourceType?: DataSourceType;
    
    defaultPackagePath?: string;
    
    idViewProperty?: boolean;
    
    joinColumnAnnotation?: boolean;
    
    joinTableAnnotation?: boolean;
    
    language?: GenLanguage;
    
    logicalDeletedAnnotation?: string;
    
    separator?: string;
    
    tableCommentPrefix?: string;
    
    tableCommentSuffix?: string;
    
    tableDefineWithFk?: boolean;
    
    tablePrefix?: string;
    
    tableSuffix?: string;
}
