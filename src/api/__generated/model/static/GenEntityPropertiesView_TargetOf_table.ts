import type {TableType} from '../enums/';

/**
 * 生成表
 */
export interface GenEntityPropertiesView_TargetOf_table {
    /**
     * ID
     */
    id: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 种类
     */
    type: TableType;
}
