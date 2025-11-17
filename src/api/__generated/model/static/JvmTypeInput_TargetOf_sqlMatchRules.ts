import type {DatabaseTypeOrAny} from '../enums/';

export interface JvmTypeInput_TargetOf_sqlMatchRules {
    id?: string | undefined;
    databaseSource: DatabaseTypeOrAny;
    nullableLimit?: boolean | undefined;
    matchRegExp: string;
}
