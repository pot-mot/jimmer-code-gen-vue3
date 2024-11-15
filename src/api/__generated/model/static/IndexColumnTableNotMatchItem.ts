import type {IdName} from './';

export interface IndexColumnTableNotMatchItem {
    indexName: string;
    column: IdName;
    table: IdName;
}
