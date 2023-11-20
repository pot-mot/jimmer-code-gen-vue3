import type { TimeRangeQueryParam } from './';

export interface TableQuery {
    
    createdTime?: TimeRangeQueryParam;
    
    ids?: Array<number>;
    
    keywords?: Array<string>;
    
    modifiedTime?: TimeRangeQueryParam;
    
    name?: string;
    
    nonSchema?: boolean;
    
    schemaIds?: Array<number>;
}
