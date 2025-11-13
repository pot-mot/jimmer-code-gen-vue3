import type {DatabaseTypeOrAny} from '../enums/';

export interface JvmTypeView_TargetOf_sqlMatchRules {
    id: string;
    databaseSource: DatabaseTypeOrAny;
    matchRegExp: string;
}
