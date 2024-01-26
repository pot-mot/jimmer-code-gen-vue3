import type {DataSourceType} from '../enums/';

export interface GenDataSourceInput {
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
     * 用户名
     */
    username: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 备注
     */
    remark: string;
}
