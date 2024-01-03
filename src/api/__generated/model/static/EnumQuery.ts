import type {TimeRangeQueryParam} from './';

export interface EnumQuery {
    ids?: Array<number> | undefined;
    createdTime?: TimeRangeQueryParam | undefined;
    modifiedTime?: TimeRangeQueryParam | undefined;
    names?: Array<string> | undefined;
}
