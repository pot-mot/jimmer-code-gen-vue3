import type { TimeRangeQueryParam } from './';

export interface EnumQuery {
    
    createdTime?: TimeRangeQueryParam;
    
    ids?: Array<number>;
    
    modifiedTime?: TimeRangeQueryParam;
    
    names?: Array<string>;
}
