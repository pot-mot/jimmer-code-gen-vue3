import type {
    DatabaseType, 
    DbNameStrategy, 
    EnumerationStrategy, 
    ForeignKeyType, 
    JvmLanguage
} from '../enums/';

export interface ModelInsertInput {
    name: string;
    description: string;
    createdTime: string;
    modifiedTime: string;
    databaseType: DatabaseType;
    databaseNameStrategy: DbNameStrategy;
    defaultForeignKeyType: ForeignKeyType;
    jvmLanguage: JvmLanguage;
    defaultEnumerationStrategy: EnumerationStrategy;
    jsonData: string;
}
