import type {DatabaseTypeOrAny} from '../enums/';

export interface TsTypeView_TargetOf_sqlMatchRules {
    id: string;
    databaseSource: DatabaseTypeOrAny;
    matchRegExp: string;
}
