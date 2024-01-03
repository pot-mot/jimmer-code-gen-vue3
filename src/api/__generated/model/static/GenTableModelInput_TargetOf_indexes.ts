import type {GenTableModelInput_TargetOf_indexes_TargetOf_columns_2} from './';

export interface GenTableModelInput_TargetOf_indexes {
    /**
     * 名称
     */
    name: string;
    /**
     * 唯一索引
     */
    uniqueIndex: boolean;
    /**
     * 列
     */
    columns: Array<GenTableModelInput_TargetOf_indexes_TargetOf_columns_2>;
}
