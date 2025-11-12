import type {DatabaseSource, JvmSource} from '../enums/';

export interface JvmTypeView_TargetOf_sqlToJvmMappingRules {
    id: string;
    jvmSource: JvmSource;
    databaseSource: DatabaseSource;
    matchRegExp: string;
}
