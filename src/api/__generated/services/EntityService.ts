import type { Executor } from '../';
import type { EntityQuery, GenEntityConfigInput, GenEntityPropertiesView } from '../model/static';

export class EntityService {
    
    constructor(private executor: Executor) {}
    
    async config(options: EntityServiceOptions['config']): Promise<number> {
        let _uri = '/entity/config';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.entity.add;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'add='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.entity.author;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'author='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.entity.comment;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'comment='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.entity.edit;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'edit='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.entity.genPath;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'genPath='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.entity.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.entity.list;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'list='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.entity.name;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'name='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.entity.orderKey;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'orderKey='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.entity.properties.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'properties='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.entity.query;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'query='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.entity.remark;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'remark='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'PUT'})) as number
    }
    
    async delete(options: EntityServiceOptions['delete']): Promise<number> {
        let _uri = '/entity/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async mapping(options: EntityServiceOptions['mapping']): Promise<
        number[]
    > {
        let _uri = '/entity/mapping';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.tableIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'tableIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST'})) as number[]
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
        return (await this.executor({uri: _uri, method: 'POST'})) as GenEntityPropertiesView[]
    }
}

export type EntityServiceOptions = {
    'config': {entity: GenEntityConfigInput},
    'delete': {ids: number[]},
    'mapping': {tableIds: number[]},
    'query': {query: EntityQuery}
}