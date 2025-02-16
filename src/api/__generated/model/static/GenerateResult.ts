import type {GenerateFile, IdNamePackagePath, TableEntityNotNullPair} from './';

export interface GenerateResult {
    files: Array<GenerateFile>;
    tableEntityPairs: Array<TableEntityNotNullPair>;
    enums: Array<IdNamePackagePath>;
}
