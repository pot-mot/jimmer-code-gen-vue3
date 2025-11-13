import type {DatabaseTypeOrAny} from '../enums/';

export interface TsTypeInput_TargetOf_sqlMatchRules {
    id?: string | undefined;
    databaseSource: DatabaseTypeOrAny;
    matchRegExp: string;
}
