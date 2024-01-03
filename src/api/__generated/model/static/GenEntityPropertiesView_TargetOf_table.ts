import type {GenEntityPropertiesView_TargetOf_table_TargetOf_schema_2} from './';

export interface GenEntityPropertiesView_TargetOf_table {
    /**
     * ID
     */
    id: number;
    /**
     * 表名称
     */
    name: string;
    /**
     * 表注释
     */
    comment: string;
    /**
     * 数据架构
     */
    schema?: GenEntityPropertiesView_TargetOf_table_TargetOf_schema_2 | undefined;
}
