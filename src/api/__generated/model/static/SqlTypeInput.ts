import type {SqlTypeInput_TargetOf_jvmToSqlMappingRule} from './';

export interface SqlTypeInput {
    id?: string | undefined;
    type: string;
    dataSize?: number | undefined;
    numericPrecision?: number | undefined;
    defaultValue?: string | undefined;
    jvmToSqlMappingRule: Array<SqlTypeInput_TargetOf_jvmToSqlMappingRule>;
}
