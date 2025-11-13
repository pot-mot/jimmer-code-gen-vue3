import type {TsImport, TsTypeView_TargetOf_jvmMatchRules, TsTypeView_TargetOf_sqlMatchRules} from './';

export interface TsTypeView {
    id: string;
    typeExpression: string;
    extraImports: Array<TsImport>;
    jvmMatchRules: Array<TsTypeView_TargetOf_jvmMatchRules>;
    sqlMatchRules: Array<TsTypeView_TargetOf_sqlMatchRules>;
}
