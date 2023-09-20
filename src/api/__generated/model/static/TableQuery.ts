import type { TimeRangeQueryParam } from './';

export interface TableQuery {
    
    createdTime?: TimeRangeQueryParam;
    
    groupIds?: number[];
    
    ids?: number[];
    
    keywords?: string[];
    
    modifiedTime?: TimeRangeQueryParam;
    
    name?: string;
    
    schemaIds?: number[];
}
