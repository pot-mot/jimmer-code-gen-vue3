import type {TimeRangeQueryParam} from './';

export interface EntityQuery {
    ids?: Array<number> | undefined;
    createdTime?: TimeRangeQueryParam | undefined;
    modifiedTime?: TimeRangeQueryParam | undefined;
    keywords?: Array<string> | undefined;
    names?: Array<string> | undefined;
}
