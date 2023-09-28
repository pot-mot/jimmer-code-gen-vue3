import type { TimeRangeQueryParam } from './';

export interface EntityQuery {
    
    createdTime?: TimeRangeQueryParam;
    
    ids?: number[];
    
    keywords?: string[];
    
    modifiedTime?: TimeRangeQueryParam;
    
    names?: string[];
}
