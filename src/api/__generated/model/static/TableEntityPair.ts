import type {IdName, IdNamePackagePath} from './';

export interface TableEntityPair {
    table?: IdName | undefined;
    entity?: IdNamePackagePath | undefined;
}
