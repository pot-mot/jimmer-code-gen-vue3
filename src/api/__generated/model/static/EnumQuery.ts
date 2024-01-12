import type {TimeRangeQueryParam} from './';

export interface EnumQuery {
    keywords?: Array<string> | undefined;
    names?: Array<string> | undefined;
    modelIds?: Array<number> | undefined;
    nonModel?: boolean | undefined;
    ids?: Array<number> | undefined;
    createdTime?: TimeRangeQueryParam | undefined;
    modifiedTime?: TimeRangeQueryParam | undefined;
}
