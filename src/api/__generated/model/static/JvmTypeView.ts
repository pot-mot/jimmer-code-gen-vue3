import type {JvmLanguageOrAny} from '../enums/';
import type {JvmTypeView_TargetOf_sqlMatchRules, JvmTypeView_TargetOf_tsMatchRules} from './';

export interface JvmTypeView {
    id: string;
    jvmSource: JvmLanguageOrAny;
    typeExpression: string;
    serialized: boolean;
    extraImports: Array<string>;
    extraAnnotations: Array<string>;
    sqlMatchRules: Array<JvmTypeView_TargetOf_sqlMatchRules>;
    tsMatchRules: Array<JvmTypeView_TargetOf_tsMatchRules>;
}
