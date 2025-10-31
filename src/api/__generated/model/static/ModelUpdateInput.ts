import type {
    DatabaseType, 
    DbNameStrategy, 
    EnumerationStrategy, 
    JvmLanguage, 
    ModelForeignKeyType
} from '../enums/';

export interface ModelUpdateInput {
    name: string;
    description: string;
    databaseType: DatabaseType;
    databaseNameStrategy: DbNameStrategy;
    defaultForeignKeyType: ModelForeignKeyType;
    jvmLanguage: JvmLanguage;
    defaultEnumerationStrategy: EnumerationStrategy;
    jsonData: string;
    id: string;
}
