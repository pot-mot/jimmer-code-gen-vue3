import type {DatabaseType} from '../enums/';

export interface ModelSpec {
    name?: string | undefined;
    description?: string | undefined;
    minCreatedTime?: string | undefined;
    maxCreatedTime?: string | undefined;
    minModifiedTime?: string | undefined;
    maxModifiedTime?: string | undefined;
    databaseType?: DatabaseType | undefined;
}
