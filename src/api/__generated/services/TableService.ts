import type {Executor} from '../';
import type {
    GenTableAssociationsView, 
    GenTableColumnsView, 
    GenTableCommonView, 
    GenTableIdView, 
    TableQuery
} from '../model/static/';

export class TableService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: TableServiceOptions['delete']): Promise<
        number
    > {
        let _uri = '/table/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
    }
    
    async queryAssociationsView(options: TableServiceOptions['queryAssociationsView']): Promise<
        Array<GenTableAssociationsView>
    > {
        let _uri = '/table/query';
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
        _value = options.query.schemaIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'schemaIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.nonSchema;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'nonSchema='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.modelIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'modelIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.nonModel;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'nonModel='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenTableAssociationsView>>;
    }
    
    async queryColumnsView(options: TableServiceOptions['queryColumnsView']): Promise<
        Array<GenTableColumnsView>
    > {
        let _uri = '/table/query/columns';
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
        _value = options.query.schemaIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'schemaIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.nonSchema;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'nonSchema='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.modelIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'modelIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.nonModel;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'nonModel='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenTableColumnsView>>;
    }
    
    async queryCommonView(options: TableServiceOptions['queryCommonView']): Promise<
        Array<GenTableCommonView>
    > {
        let _uri = '/table/query/common';
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
        _value = options.query.schemaIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'schemaIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.nonSchema;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'nonSchema='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.modelIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'modelIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.nonModel;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'nonModel='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenTableCommonView>>;
    }
    
    async queryIdView(options: TableServiceOptions['queryIdView']): Promise<
        Array<GenTableIdView>
    > {
        let _uri = '/table/query/id';
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
        _value = options.query.schemaIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'schemaIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.nonSchema;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'nonSchema='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.modelIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'modelIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.nonModel;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'nonModel='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenTableIdView>>;
    }
}
export type TableServiceOptions = {
    'queryIdView': {
        query: TableQuery
    }, 
    'queryCommonView': {
        query: TableQuery
    }, 
    'queryColumnsView': {
        query: TableQuery
    }, 
    'queryAssociationsView': {
        query: TableQuery
    }, 
    'delete': {
        ids: Array<number>
    }
}
