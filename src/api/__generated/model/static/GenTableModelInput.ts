import type {TableType} from '../enums/';
import type {GenTableModelInput_TargetOf_columns, GenTableModelInput_TargetOf_indexes, GenTableModelInput_TargetOf_superTables} from './';

export interface GenTableModelInput {
    /**
     * 名称
     */
    name: string;
    /**
     * 注释
     */
    comment: string;
    /**
     * 种类
     */
    type: TableType;
    /**
     * 备注
     */
    remark: string;
    /**
     * 模型
     */
    modelId?: number | undefined;
    /**
     * 上级表
     */
    superTables: Array<GenTableModelInput_TargetOf_superTables>;
    /**
     * 列
     */
    columns: Array<GenTableModelInput_TargetOf_columns>;
    /**
     * 唯一索引
     */
    indexes: Array<GenTableModelInput_TargetOf_indexes>;
}
