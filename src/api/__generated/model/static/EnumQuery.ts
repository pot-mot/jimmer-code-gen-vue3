import type { TimeRangeQueryParam } from './';

export interface EnumQuery {
    
    createdTime?: TimeRangeQueryParam;
    
    ids?: number[];
    
    modifiedTime?: TimeRangeQueryParam;
    
    names?: string[];
    
    nonPackage?: boolean;
    
    packageIds?: number[];
}
