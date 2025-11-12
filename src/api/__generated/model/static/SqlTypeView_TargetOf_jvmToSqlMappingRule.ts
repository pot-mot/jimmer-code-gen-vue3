import type {DatabaseSource, JvmSource} from '../enums/';

export interface SqlTypeView_TargetOf_jvmToSqlMappingRule {
    id: string;
    jvmSource: JvmSource;
    databaseSource: DatabaseSource;
    matchRegExp: string;
}
