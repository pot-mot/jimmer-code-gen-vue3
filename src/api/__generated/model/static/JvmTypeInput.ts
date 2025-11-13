import type {JvmLanguageOrAny} from '../enums/';
import type {JvmTypeInput_TargetOf_sqlMatchRules, JvmTypeInput_TargetOf_tsMatchRules} from './';

export interface JvmTypeInput {
    id?: string | undefined;
    jvmSource: JvmLanguageOrAny;
    typeExpression: string;
    serialized: boolean;
    extraImports: Array<string>;
    extraAnnotations: Array<string>;
    sqlMatchRules: Array<JvmTypeInput_TargetOf_sqlMatchRules>;
    tsMatchRules: Array<JvmTypeInput_TargetOf_tsMatchRules>;
}
