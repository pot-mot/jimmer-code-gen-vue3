import type {GenTableModelInput_TargetOf_indexes_TargetOf_columns} from './';

/**
 * 生成列
 */
export interface GenTableModelInput_TargetOf_indexes {
    /**
     * 名称
     */
    name: string;
    /**
     * 索引
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
