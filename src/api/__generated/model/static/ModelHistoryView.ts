import type {
    DatabaseType, 
    DbNameStrategy, 
    EnumerationStrategy, 
    ForeignKeyType, 
    JvmLanguage
} from '../enums/';

export interface ModelHistoryView {
    id: string;
    name: string;
    description: string;
    modifiedTime: string;
    databaseType: DatabaseType;
    databaseNameStrategy: DbNameStrategy;
    defaultForeignKeyType: ForeignKeyType;
    jvmLanguage: JvmLanguage;
    defaultEnumerationStrategy: EnumerationStrategy;
    jsonData: string;
    modelId: string;
}
