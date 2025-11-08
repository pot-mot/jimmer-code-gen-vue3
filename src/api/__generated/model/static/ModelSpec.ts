import type {DatabaseType, JvmLanguage} from '../enums/';

export interface ModelSpec {
    keywords?: string | undefined;
    databaseType?: DatabaseType | undefined;
    jvmLanguage?: JvmLanguage | undefined;
    minCreatedTime?: string | undefined;
    maxCreatedTime?: string | undefined;
    minModifiedTime?: string | undefined;
    maxModifiedTime?: string | undefined;
}
