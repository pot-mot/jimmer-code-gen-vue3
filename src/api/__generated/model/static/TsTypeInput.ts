import type {TsImport, TsTypeInput_TargetOf_jvmToTsMappingRules} from './';

export interface TsTypeInput {
    id?: string | undefined;
    typeExpression: string;
    extraImports: Array<TsImport>;
    jvmToTsMappingRules: Array<TsTypeInput_TargetOf_jvmToTsMappingRules>;
}
