import type { Executor } from '../';
import type { EntityQuery, GenEntityConfigInput, GenEntityPropertiesView, byte } from '../model/static';

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
    
    async generate(options: EntityServiceOptions['generate']): Promise<
        byte[]
    > {
        let _uri = '/entity/generate';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as byte[]
    }
    
    async mapping(options: EntityServiceOptions['mapping']): Promise<
        number[]
    > {
        let _uri = '/entity/mapping';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as number[]
    }
    
    async query(options: EntityServiceOptions['query']): Promise<
        GenEntityPropertiesView[]
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
        return (await this.executor({uri: _uri, method: 'GET'})) as GenEntityPropertiesView[]
    }
}

export type EntityServiceOptions = {
    'config': {body: GenEntityConfigInput},
    'delete': {ids: number[]},
    'generate': {body: number[]},
    'mapping': {body: number[]},
    'query': {query: EntityQuery}
}