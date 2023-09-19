import type {TimeRangeQueryParam} from './';

export interface ColumnQuery {

    createdTime?: TimeRangeQueryParam;

    ids?: number[];

    keywords?: string[];

    modifiedTime?: TimeRangeQueryParam;

    tableIds?: number[];
}
