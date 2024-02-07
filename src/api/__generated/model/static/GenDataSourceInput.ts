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
     * 链接
     */
    url: string;
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
