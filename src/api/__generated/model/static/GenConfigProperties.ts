import type { GenLanguage } from '../enums';

export interface GenConfigProperties {
    
    author?: string;
    
    columnPrefix?: string;
    
    columnSuffix?: string;
    
    language?: GenLanguage;
    
    logicalDeletedAnnotation?: string;
    
    removeColumnPrefix?: boolean;
    
    removeColumnSuffix?: boolean;
    
    removeTablePrefix?: boolean;
    
    removeTableSuffix?: boolean;
    
    separator?: string;
    
    tablePrefix?: string;
    
    tableSuffix?: string;
}
