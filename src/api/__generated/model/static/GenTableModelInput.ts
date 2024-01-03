import type {TableType} from '../enums/';
import type {GenTableModelInput_TargetOf_columns, GenTableModelInput_TargetOf_indexes, GenTableModelInput_TargetOf_schema} from './';

export interface GenTableModelInput {
    /**
     * 备注
     */
    remark: string;
    /**
     * 表名称
     */
    name: string;
    /**
     * 表注释
     */
    comment: string;
    /**
     * 表种类
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
     * 数据架构
     */
    schema?: GenTableModelInput_TargetOf_schema | undefined;
    /**
     * 列
     */
    columns: Array<GenTableModelInput_TargetOf_columns>;
    /**
     * 唯一索引
     */
    indexes: Array<GenTableModelInput_TargetOf_indexes>;
}
