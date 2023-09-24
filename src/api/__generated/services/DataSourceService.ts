import type { Executor } from '../';
import type { GenSchemaDto } from '../model/dto';
import type { DataSourceType } from '../model/enums';
import type { GenDataSourceInput, GenDataSourceView } from '../model/static';

export class DataSourceService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: DataSourceServiceOptions['delete']): Promise<number> {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async edit(options: DataSourceServiceOptions['edit']): Promise<number> {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as number
    }
    
    async get(options: DataSourceServiceOptions['get']): Promise<
        GenDataSourceView[]
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as GenDataSourceView[]
    }
    
    async importSchema(options: DataSourceServiceOptions['importSchema']): Promise<number> {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema/';
        _uri += encodeURIComponent(options.name);
        return (await this.executor({uri: _uri, method: 'POST'})) as number
    }
    
    async insert(options: DataSourceServiceOptions['insert']): Promise<number> {
        let _uri = '/dataSource/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as number
    }
    
    async list(): Promise<
        GenDataSourceView[]
    > {
        let _uri = '/dataSource/';
        return (await this.executor({uri: _uri, method: 'GET'})) as GenDataSourceView[]
    }
    
    async listTypes(): Promise<
        DataSourceType[]
    > {
        let _uri = '/dataSource/types';
        return (await this.executor({uri: _uri, method: 'GET'})) as DataSourceType[]
    }
    
    async test(options: DataSourceServiceOptions['test']): Promise<boolean> {
        let _uri = '/dataSource/test';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as boolean
    }
    
    async viewSchemas(options: DataSourceServiceOptions['viewSchemas']): Promise<
        GenSchemaDto['DEFAULT'][]
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema';
        return (await this.executor({uri: _uri, method: 'GET'})) as GenSchemaDto['DEFAULT'][]
    }
}

export type DataSourceServiceOptions = {
    'delete': {ids: number[]},
    'edit': {id: number, body: GenDataSourceInput},
    'get': {id: number},
    'importSchema': {dataSourceId: number, name: string},
    'insert': {body: GenDataSourceInput},
    'list': {},
    'listTypes': {},
    'test': {body: GenDataSourceInput},
    'viewSchemas': {dataSourceId: number}
}