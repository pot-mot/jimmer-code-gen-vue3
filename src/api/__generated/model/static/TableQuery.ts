import type { TableType } from '../enums';
import type { TimeRangeQueryParam } from './';

export interface TableQuery {
    
    createdTime?: TimeRangeQueryParam;
    
    ids?: Array<number>;
    
    keywords?: Array<string>;
    
    modelIds?: Array<number>;
    
    modifiedTime?: TimeRangeQueryParam;
    
    nonModel?: boolean;
    
    nonSchema?: boolean;
    
    schemaIds?: Array<number>;
    
    type?: TableType;
}
