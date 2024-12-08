import type {GenerateFile, TableEntityNotNullPair} from './';

export interface GenerateResult {
    files: Array<GenerateFile>;
    tableEntityPairs: Array<TableEntityNotNullPair>;
}
