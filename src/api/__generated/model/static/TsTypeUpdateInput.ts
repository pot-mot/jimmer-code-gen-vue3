import type {TsImport, TsTypeUpdateInput_TargetOf_jvmMatchRules, TsTypeUpdateInput_TargetOf_sqlMatchRules} from './';

export interface TsTypeUpdateInput {
    typeExpression: string;
    extraImports: Array<TsImport>;
    id: string;
    jvmMatchRules: Array<TsTypeUpdateInput_TargetOf_jvmMatchRules>;
    sqlMatchRules: Array<TsTypeUpdateInput_TargetOf_sqlMatchRules>;
}
