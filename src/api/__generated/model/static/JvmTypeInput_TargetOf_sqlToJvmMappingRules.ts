import type {DatabaseSource, JvmSource} from '../enums/';

export interface JvmTypeInput_TargetOf_sqlToJvmMappingRules {
    id?: string | undefined;
    jvmSource: JvmSource;
    databaseSource: DatabaseSource;
    matchRegExp: string;
}
