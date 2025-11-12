import type {JvmTypeView_TargetOf_sqlToJvmMappingRules} from './';

export interface JvmTypeView {
    id: string;
    typeExpression: string;
    serialized: boolean;
    extraImports: Array<string>;
    extraAnnotations: Array<string>;
    sqlToJvmMappingRules: Array<JvmTypeView_TargetOf_sqlToJvmMappingRules>;
}
