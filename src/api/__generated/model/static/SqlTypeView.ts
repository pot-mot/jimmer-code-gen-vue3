import type {DatabaseTypeOrAny} from '../enums/';
import type {SqlTypeView_TargetOf_jvmMatchRules, SqlTypeView_TargetOf_tsMatchRules} from './';

export interface SqlTypeView {
    id: string;
    databaseSource: DatabaseTypeOrAny;
    type: string;
    dataSize?: number | undefined;
    numericPrecision?: number | undefined;
    defaultValue?: string | undefined;
    jvmMatchRules: Array<SqlTypeView_TargetOf_jvmMatchRules>;
    tsMatchRules: Array<SqlTypeView_TargetOf_tsMatchRules>;
}
