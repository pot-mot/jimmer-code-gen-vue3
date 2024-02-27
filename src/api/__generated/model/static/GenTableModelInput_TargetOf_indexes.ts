import type {GenTableModelInput_TargetOf_indexes_TargetOf_columns} from './';

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
     * 备注
     */
    remark: string;
    /**
     * 列
     */
    columns: Array<GenTableModelInput_TargetOf_indexes_TargetOf_columns>;
}
