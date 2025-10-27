import type {DatabaseType} from '../enums/';

export interface DatabaseSpec {
    name?: string | undefined;
    type?: DatabaseType | undefined;
}
