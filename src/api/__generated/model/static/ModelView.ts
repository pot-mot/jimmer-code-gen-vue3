import type {
    DatabaseType, 
    DbNameStrategy, 
    EnumerationStrategy, 
    JvmLanguage, 
    ModelForeignKeyType
} from '../enums/';

export interface ModelView {
    id: string;
    name: string;
    description: string;
    createdTime: string;
    modifiedTime: string;
    databaseType: DatabaseType;
    databaseNameStrategy: DbNameStrategy;
    defaultForeignKeyType: ModelForeignKeyType;
    jvmLanguage: JvmLanguage;
    defaultEnumerationStrategy: EnumerationStrategy;
    jsonData: string;
}
