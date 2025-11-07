import type {JvmTypeInput_TargetOf_sqlToJvmMappingRules} from './';

export interface JvmTypeInput {
    id?: string | undefined;
    typeExpression: string;
    serialized: boolean;
    extraImports: Array<string>;
    extraAnnotations: Array<string>;
    sqlToJvmMappingRules: Array<JvmTypeInput_TargetOf_sqlToJvmMappingRules>;
}
