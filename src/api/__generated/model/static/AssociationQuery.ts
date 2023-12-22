import type { AssociationType } from '../enums';
import type { TimeRangeQueryParam } from './';

export interface AssociationQuery {
    
    associationType?: AssociationType;
    
    createdTime?: TimeRangeQueryParam;
    
    ids?: Array<number>;
    
    keywords?: Array<string>;
    
    modifiedTime?: TimeRangeQueryParam;
    
    sourceColumnId?: number;
    
    sourceTableId?: number;
    
    targetColumnId?: number;
    
    targetTableId?: number;
}
