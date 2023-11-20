import type { Executor } from '../';
import type { DataSourceType } from '../model/enums';
import type { GenDataSourceInput, GenDataSourceTemplateView, GenDataSourceView } from '../model/static';

export class DataSourceService {
    
    constructor(private executor: Executor) {}
    
    async create(options: DataSourceServiceOptions['create']): Promise<number> {
        let _uri = '/dataSource/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as number
    }
    
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
        GenDataSourceView | undefined
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as GenDataSourceView | undefined
    }
    
    async getDefault(options: DataSourceServiceOptions['getDefault']): Promise<
        GenDataSourceTemplateView
    > {
        let _uri = '/dataSource/default';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.dataSourceType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'dataSourceType='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as GenDataSourceTemplateView
    }
    
    async getDefaults(): Promise<
        Array<GenDataSourceTemplateView>
    > {
        let _uri = '/dataSource/defaults';
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenDataSourceTemplateView>
    }
    
    async list(): Promise<
        Array<GenDataSourceView>
    > {
        let _uri = '/dataSource/';
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenDataSourceView>
    }
    
    async test(options: DataSourceServiceOptions['test']): Promise<boolean> {
        let _uri = '/dataSource/test';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as boolean
    }
}

export type DataSourceServiceOptions = {
    'create': {body: GenDataSourceInput},
    'delete': {ids: Array<number>},
    'edit': {id: number, body: GenDataSourceInput},
    'get': {id: number},
    'getDefault': {dataSourceType: DataSourceType},
    'getDefaults': {},
    'list': {},
    'test': {body: GenDataSourceInput}
}