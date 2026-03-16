import type {DatabaseTypeOrAny} from '../enums/';

export interface JvmTypeUpdateInput_TargetOf_sqlMatchRules {
    id?: string | undefined;
    databaseSource: DatabaseTypeOrAny;
    nullableLimit?: boolean | undefined;
    matchRegExp: string;
}
