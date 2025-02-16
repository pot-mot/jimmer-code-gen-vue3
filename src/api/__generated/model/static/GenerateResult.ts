import type {GenerateFile, IdName, TableEntityNotNullPair} from './';

export interface GenerateResult {
    files: Array<GenerateFile>;
    tableEntityPairs: Array<TableEntityNotNullPair>;
    enums: Array<IdName>;
}
