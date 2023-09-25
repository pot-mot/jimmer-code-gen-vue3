import type {DataSourceType} from '../enums';

export interface GenDataSourceView {

    createdTime: string;

    host: string;

    id: number;

    modifiedTime: string;

    name: string;

    orderKey: number;

    port: string;

    remark: string;

    type: DataSourceType;
}
