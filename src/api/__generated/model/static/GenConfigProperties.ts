import type { GenLanguage } from '../enums';

export interface GenConfigProperties {
    
    author?: string;
    
    columnCommentPrefix?: string;
    
    columnCommentSuffix?: string;
    
    columnPrefix?: string;
    
    columnSuffix?: string;
    
    language?: GenLanguage;
    
    logicalDeletedAnnotation?: string;
    
    separator?: string;
    
    tableCommentPrefix?: string;
    
    tableCommentSuffix?: string;
    
    tableDefineWithFk?: boolean;
    
    tablePrefix?: string;
    
    tableSuffix?: string;
}
