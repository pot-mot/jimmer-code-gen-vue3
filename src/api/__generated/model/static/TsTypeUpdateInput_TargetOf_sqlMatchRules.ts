import type {DatabaseTypeOrAny} from '../enums/';

export interface TsTypeUpdateInput_TargetOf_sqlMatchRules {
    id?: string | undefined;
    databaseSource: DatabaseTypeOrAny;
    matchRegExp: string;
}
