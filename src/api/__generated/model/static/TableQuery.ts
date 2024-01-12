import type {TableType} from '../enums/';
import type {TimeRangeQueryParam} from './';

export interface TableQuery {
    keywords?: Array<string> | undefined;
    schemaIds?: Array<number> | undefined;
    nonSchema?: boolean | undefined;
    modelIds?: Array<number> | undefined;
    nonModel?: boolean | undefined;
    type?: TableType | undefined;
    ids?: Array<number> | undefined;
    createdTime?: TimeRangeQueryParam | undefined;
    modifiedTime?: TimeRangeQueryParam | undefined;
}
