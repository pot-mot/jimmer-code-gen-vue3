import type {TsImport, TsTypeInput_TargetOf_jvmMatchRules, TsTypeInput_TargetOf_sqlMatchRules} from './';

export interface TsTypeInput {
    id?: string | undefined;
    typeExpression: string;
    extraImports: Array<TsImport>;
    jvmMatchRules: Array<TsTypeInput_TargetOf_jvmMatchRules>;
    sqlMatchRules: Array<TsTypeInput_TargetOf_sqlMatchRules>;
}
