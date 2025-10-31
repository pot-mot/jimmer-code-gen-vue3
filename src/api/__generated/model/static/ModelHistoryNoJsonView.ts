import type {
    DatabaseType, 
    DbNameStrategy, 
    EnumerationStrategy, 
    JvmLanguage, 
    ModelForeignKeyType
} from '../enums/';

export interface ModelHistoryNoJsonView {
    id: string;
    name: string;
    description: string;
    modifiedTime: string;
    databaseType: DatabaseType;
    databaseNameStrategy: DbNameStrategy;
    defaultForeignKeyType: ModelForeignKeyType;
    jvmLanguage: JvmLanguage;
    defaultEnumerationStrategy: EnumerationStrategy;
    modelId: string;
}
