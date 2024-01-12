import type {AssociationType} from '../enums/';
import type {TimeRangeQueryParam} from './';

export interface AssociationQuery {
    keywords?: Array<string> | undefined;
    associationType?: AssociationType | undefined;
    sourceTableId?: number | undefined;
    targetTableId?: number | undefined;
    sourceColumnId?: number | undefined;
    targetColumnId?: number | undefined;
    ids?: Array<number> | undefined;
    createdTime?: TimeRangeQueryParam | undefined;
    modifiedTime?: TimeRangeQueryParam | undefined;
}
