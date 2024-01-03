import type {TableType} from '../enums/';
import type {TimeRangeQueryParam} from './';

export interface TableQuery {
    ids?: Array<number> | undefined;
    createdTime?: TimeRangeQueryParam | undefined;
    modifiedTime?: TimeRangeQueryParam | undefined;
    keywords?: Array<string> | undefined;
    schemaIds?: Array<number> | undefined;
    nonSchema?: boolean | undefined;
    modelIds?: Array<number> | undefined;
    nonModel?: boolean | undefined;
    type?: TableType | undefined;
}
