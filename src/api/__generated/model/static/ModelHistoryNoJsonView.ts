import type {
    DatabaseType, 
    DbNameStrategy, 
    EnumerationStrategy, 
    ForeignKeyType, 
    JvmLanguage
} from '../enums/';

export interface ModelHistoryNoJsonView {
    id: string;
    name: string;
    description: string;
    modifiedTime: string;
    databaseType: DatabaseType;
    databaseNameStrategy: DbNameStrategy;
    defaultForeignKeyType: ForeignKeyType;
    jvmLanguage: JvmLanguage;
    defaultEnumerationStrategy: EnumerationStrategy;
    modelId: string;
}
