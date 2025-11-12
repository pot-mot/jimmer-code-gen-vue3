import type {SqlTypeView_TargetOf_jvmToSqlMappingRule} from './';

export interface SqlTypeView {
    id: string;
    type: string;
    dataSize?: number | undefined;
    numericPrecision?: number | undefined;
    defaultValue?: string | undefined;
    jvmToSqlMappingRule: Array<SqlTypeView_TargetOf_jvmToSqlMappingRule>;
}
