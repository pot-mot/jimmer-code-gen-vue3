import type { Executor } from '../';
import type { GenLanguage } from '../model/enums';
import type { EntityQuery, GenEntityCommonView, GenEntityConfigInput, GenEntityPropertiesView } from '../model/static';

export class EntityService {
    
    constructor(private executor: Executor) {}
    
    async config(options: EntityServiceOptions['config']): Promise<number> {
        let _uri = '/entity/config';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as number
    }
    
    async delete(options: EntityServiceOptions['delete']): Promise<number> {
        let _uri = '/entity/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async get(options: EntityServiceOptions['get']): Promise<
        GenEntityPropertiesView | undefined
    > {
        let _uri = '/entity/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as GenEntityPropertiesView | undefined
    }
    
    async list(): Promise<
        Array<GenEntityCommonView>
    > {
        let _uri = '/entity/';
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenEntityCommonView>
    }
    
    async listLanguage(): Promise<
        Array<GenLanguage>
    > {
        let _uri = '/entity/language';
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenLanguage>
    }
    
    async query(options: EntityServiceOptions['query']): Promise<
        Array<GenEntityPropertiesView>
    > {
        let _uri = '/entity/query';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.query.ids?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'ids='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.keywords?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'keywords='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.names?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'names='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.nonPackage;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'nonPackage='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.packageIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'packageIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenEntityPropertiesView>
    }
}

export type EntityServiceOptions = {
    'config': {body: GenEntityConfigInput},
    'delete': {ids: Array<number>},
    'get': {id: number},
    'list': {},
    'listLanguage': {},
    'query': {query: EntityQuery}
}