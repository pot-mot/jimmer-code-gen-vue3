import type {JvmLanguageOrAny} from '../enums/';
import type {JvmTypeUpdateInput_TargetOf_sqlMatchRules, JvmTypeUpdateInput_TargetOf_tsMatchRules} from './';

export interface JvmTypeUpdateInput {
    jvmSource: JvmLanguageOrAny;
    typeExpression: string;
    serialized: boolean;
    extraImports: Array<string>;
    extraAnnotations: Array<string>;
    id: string;
    sqlMatchRules: Array<JvmTypeUpdateInput_TargetOf_sqlMatchRules>;
    tsMatchRules: Array<JvmTypeUpdateInput_TargetOf_tsMatchRules>;
}
