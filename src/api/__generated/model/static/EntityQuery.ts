import type { TimeRangeQueryParam } from './';

export interface EntityQuery {
    
    createdTime?: TimeRangeQueryParam;
    
    ids?: Array<number>;
    
    keywords?: Array<string>;
    
    modifiedTime?: TimeRangeQueryParam;
    
    names?: Array<string>;
    
    nonPackage?: boolean;
    
    packageIds?: Array<number>;
}
