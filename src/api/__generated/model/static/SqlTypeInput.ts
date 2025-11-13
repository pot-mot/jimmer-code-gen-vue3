import type {DatabaseTypeOrAny} from '../enums/';
import type {SqlTypeInput_TargetOf_jvmMatchRules, SqlTypeInput_TargetOf_tsMatchRules} from './';

export interface SqlTypeInput {
    id?: string | undefined;
    databaseSource: DatabaseTypeOrAny;
    type: string;
    dataSize?: number | undefined;
    numericPrecision?: number | undefined;
    defaultValue?: string | undefined;
    jvmMatchRules: Array<SqlTypeInput_TargetOf_jvmMatchRules>;
    tsMatchRules: Array<SqlTypeInput_TargetOf_tsMatchRules>;
}
