import type {JvmLanguageOrAny} from '../enums/';

export interface SqlTypeInput_TargetOf_jvmMatchRules {
    id?: string | undefined;
    jvmSource: JvmLanguageOrAny;
    matchRegExp: string;
}
