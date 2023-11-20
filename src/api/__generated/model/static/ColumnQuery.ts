import type { TimeRangeQueryParam } from './';

export interface ColumnQuery {
    
    createdTime?: TimeRangeQueryParam;
    
    ids?: Array<number>;
    
    keywords?: Array<string>;
    
    modifiedTime?: TimeRangeQueryParam;
    
    tableIds?: Array<number>;
}
