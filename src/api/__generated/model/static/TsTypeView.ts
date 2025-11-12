import type {TsImport, TsTypeView_TargetOf_jvmToTsMappingRules} from './';

export interface TsTypeView {
    id: string;
    typeExpression: string;
    extraImports: Array<TsImport>;
    jvmToTsMappingRules: Array<TsTypeView_TargetOf_jvmToTsMappingRules>;
}
