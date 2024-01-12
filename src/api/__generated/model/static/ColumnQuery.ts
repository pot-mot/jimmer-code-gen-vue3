import type {TimeRangeQueryParam} from './';

export interface ColumnQuery {
    keywords?: Array<string> | undefined;
    tableIds?: Array<number> | undefined;
    type?: string | undefined;
    typeCode?: number | undefined;
    partOfPk?: boolean | undefined;
    ids?: Array<number> | undefined;
    createdTime?: TimeRangeQueryParam | undefined;
    modifiedTime?: TimeRangeQueryParam | undefined;
}
