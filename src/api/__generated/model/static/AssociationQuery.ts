import type { TimeRangeQueryParam } from './';

export interface AssociationQuery {
    
    createdTime?: TimeRangeQueryParam;
    
    ids?: number[];
    
    keywords?: string[];
    
    modifiedTime?: TimeRangeQueryParam;
    
    sourceColumnId?: number;
    
    sourceTableId?: number;
    
    targetColumnId?: number;
    
    targetTableId?: number;
}
