import type {DataSourceType} from '../enums';

export interface GenDataSourceInput {

    host: string;

    name: string;

    orderKey: number;

    password: string;

    port: string;

    remark: string;

    type: DataSourceType;

    username: string;
}
