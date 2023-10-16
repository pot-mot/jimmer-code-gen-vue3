import type { Executor } from '../';
import type { DataSourceType } from '../model/enums';
import type { GenDataSourceInput, GenDataSourceTemplateView, GenDataSourceView } from '../model/static';

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
    
    async getDefaultDataSource(options: DataSourceServiceOptions['getDefaultDataSource']): Promise<
        GenDataSourceTemplateView
    > {
        let _uri = '/dataSource/type/';
        _uri += encodeURIComponent(options.dataSourceType);
        _uri += '/default';
        return (await this.executor({uri: _uri, method: 'GET'})) as GenDataSourceTemplateView
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
    
    async listType(): Promise<
        DataSourceType[]
    > {
        let _uri = '/dataSource/type';
        return (await this.executor({uri: _uri, method: 'GET'})) as DataSourceType[]
    }
    
    async test(options: DataSourceServiceOptions['test']): Promise<boolean> {
        let _uri = '/dataSource/test';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as boolean
    }
}

export type DataSourceServiceOptions = {
    'delete': {ids: number[]},
    'edit': {id: number, body: GenDataSourceInput},
    'get': {id: number},
    'getDefaultDataSource': {dataSourceType: DataSourceType},
    'insert': {body: GenDataSourceInput},
    'list': {},
    'listType': {},
    'test': {body: GenDataSourceInput}
}