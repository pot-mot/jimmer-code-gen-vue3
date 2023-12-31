import type {DataSourceType} from '../enums/';

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
     * 备注
     */
    remark: string;
    /**
     * 数据库类型
     */
    type: DataSourceType;
    /**
     * 名称
     */
    name: string;
    /**
     * 主机
     */
    host: string;
    /**
     * 端口
     */
    port: string;
    /**
     * 链接后缀
     */
    urlSuffix: string;
    /**
     * 自定排序
     */
    orderKey: number;
}
