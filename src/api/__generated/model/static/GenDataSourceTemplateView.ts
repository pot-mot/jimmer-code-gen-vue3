import type {DataSourceType} from '../enums/';

export interface GenDataSourceTemplateView {
    /**
     * 名称
     */
    name: string;
    /**
     * 数据库类型
     */
    type: DataSourceType;
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
     * 用户名
     */
    username: string;
    /**
     * 备注
     */
    remark: string;
}
