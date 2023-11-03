import type { Executor } from '../';
import type { GenTableAssociationsView, GenTableColumnsView, GenTableCommonView, GenTableIdView, TableQuery } from '../model/static';

export class TableService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: TableServiceOptions['delete']): Promise<number> {
        let _uri = '/table/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async getTableDefine(options: TableServiceOptions['getTableDefine']): Promise<
        { [key: string]: string }
    > {
        let _uri = '/table/define/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as { [key: string]: string }
    }
    
    async queryAssociationsView(options: TableServiceOptions['queryAssociationsView']): Promise<
        GenTableAssociationsView[]
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
        _value = options.query.name;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'name='
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
        _value = options.query.schemaIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'schemaIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as GenTableAssociationsView[]
    }
    
    async queryColumnsView(options: TableServiceOptions['queryColumnsView']): Promise<
        GenTableColumnsView[]
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
        _value = options.query.name;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'name='
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
        _value = options.query.schemaIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'schemaIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as GenTableColumnsView[]
    }
    
    async queryCommonView(options: TableServiceOptions['queryCommonView']): Promise<
        GenTableCommonView[]
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
        _value = options.query.name;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'name='
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
        _value = options.query.schemaIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'schemaIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as GenTableCommonView[]
    }
    
    async queryIdView(options: TableServiceOptions['queryIdView']): Promise<
        GenTableIdView[]
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
        _value = options.query.name;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'name='
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
        _value = options.query.schemaIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'schemaIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as GenTableIdView[]
    }
}

export type TableServiceOptions = {
    'delete': {ids: number[]},
    'getTableDefine': {id: number},
    'queryAssociationsView': {query: TableQuery},
    'queryColumnsView': {query: TableQuery},
    'queryCommonView': {query: TableQuery},
    'queryIdView': {query: TableQuery}
}