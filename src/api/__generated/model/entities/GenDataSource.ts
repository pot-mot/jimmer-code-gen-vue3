import type {DataSourceType} from '../enums';
import type {GenSchema} from './';

export interface GenDataSource {

    createdTime: string;

    modifiedTime: string;

    remark: string;

    id: number;

    type: DataSourceType;

    name: string;

    host: string;

    port: string;

    username: string;

    password: string;

    orderKey: number;

    schemas: GenSchema[];
}
