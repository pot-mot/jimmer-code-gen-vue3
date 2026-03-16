import type {JvmLanguageOrAny} from '../enums/';

export interface SqlTypeUpdateInput_TargetOf_jvmMatchRules {
    id?: string | undefined;
    jvmSource: JvmLanguageOrAny;
    matchRegExp: string;
}
