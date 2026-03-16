import type {DatabaseTypeOrAny} from '../enums/';
import type {SqlTypeUpdateInput_TargetOf_jvmMatchRules, SqlTypeUpdateInput_TargetOf_tsMatchRules} from './';

export interface SqlTypeUpdateInput {
    databaseSource: DatabaseTypeOrAny;
    type: string;
    dataSize?: number | undefined;
    numericPrecision?: number | undefined;
    defaultValue?: string | undefined;
    id: string;
    jvmMatchRules: Array<SqlTypeUpdateInput_TargetOf_jvmMatchRules>;
    tsMatchRules: Array<SqlTypeUpdateInput_TargetOf_tsMatchRules>;
}
