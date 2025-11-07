import type {DatabaseSource, JvmSource} from '../enums/';

export interface SqlTypeInput_TargetOf_jvmToSqlMappingRule {
    id?: string | undefined;
    jvmSource: JvmSource;
    databaseSource: DatabaseSource;
    matchRegExp: string;
}
