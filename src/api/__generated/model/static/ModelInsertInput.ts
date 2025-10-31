import type {
    DatabaseType, 
    DbNameStrategy, 
    EnumerationStrategy, 
    JvmLanguage, 
    ModelForeignKeyType
} from '../enums/';

export interface ModelInsertInput {
    name: string;
    description: string;
    databaseType: DatabaseType;
    databaseNameStrategy: DbNameStrategy;
    defaultForeignKeyType: ModelForeignKeyType;
    jvmLanguage: JvmLanguage;
    defaultEnumerationStrategy: EnumerationStrategy;
    jsonData: string;
}
