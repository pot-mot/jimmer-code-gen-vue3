import type { TimeRangeQueryParam } from './';

export interface TableQuery {
    
    createdTime?: TimeRangeQueryParam;
    
    ids?: number[];
    
    keywords?: string[];
    
    modifiedTime?: TimeRangeQueryParam;
    
    name?: string;
    
    schemaIds?: number[];
}
