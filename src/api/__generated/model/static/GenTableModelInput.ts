import type {TableType} from '../enums/';
import type {GenTableModelInput_TargetOf_columns, GenTableModelInput_TargetOf_indexes} from './';

export interface GenTableModelInput {
    /**
     * 备注
     */
    remark: string;
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
     * 自定排序
     */
    orderKey: number;
    /**
     * 模型
     */
    modelId?: number | undefined;
    /**
     * 列
     */
    columns: Array<GenTableModelInput_TargetOf_columns>;
    /**
     * 唯一索引
     */
    indexes: Array<GenTableModelInput_TargetOf_indexes>;
}
