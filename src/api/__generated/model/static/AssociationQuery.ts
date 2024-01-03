import type {AssociationType} from '../enums/';
import type {TimeRangeQueryParam} from './';

export interface AssociationQuery {
    ids?: Array<number> | undefined;
    associationType?: AssociationType | undefined;
    createdTime?: TimeRangeQueryParam | undefined;
    modifiedTime?: TimeRangeQueryParam | undefined;
    keywords?: Array<string> | undefined;
    sourceTableId?: number | undefined;
    targetTableId?: number | undefined;
    sourceColumnId?: number | undefined;
    targetColumnId?: number | undefined;
}
