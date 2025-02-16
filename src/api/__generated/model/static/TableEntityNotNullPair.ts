import type {IdName, IdNamePackagePath} from './';

export interface TableEntityNotNullPair {
    table: IdName;
    entity: IdNamePackagePath;
}
