import type { TimeRangeQueryParam } from './';

export interface AssociationQuery {
    
    createdTime?: TimeRangeQueryParam;
    
    ids?: Array<number>;
    
    keywords?: Array<string>;
    
    modifiedTime?: TimeRangeQueryParam;
    
    sourceColumnId?: number;
    
    sourceTableId?: number;
    
    targetColumnId?: number;
    
    targetTableId?: number;
}
