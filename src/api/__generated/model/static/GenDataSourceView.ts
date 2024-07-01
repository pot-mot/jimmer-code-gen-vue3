import type {DataSourceType} from '../enums/';

/**
 * 生成数据源
 */
export interface GenDataSourceView {
    /**
     * ID
     */
    id: number;
    /**
     * 创建事件
     */
    createdTime: string;
    /**
     * 修改时间
     */
    modifiedTime: string;
    /**
     * 数据库类型
     */
    type: DataSourceType;
    /**
     * 名称
     */
    name: string;
    /**
     * 链接
     */
    url: string;
    /**
     * 备注
     */
    remark: string;
}
