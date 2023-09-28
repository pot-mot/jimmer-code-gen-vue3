import type { Executor } from '../';
import type { GenTableAssociationView, GenTableColumnView, GenTableCommonView, TableQuery } from '../model/static';

export class TableService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: TableServiceOptions['delete']): Promise<number> {
        let _uri = '/table/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async getAssociationView(options: TableServiceOptions['getAssociationView']): Promise<
        GenTableAssociationView | undefined
    > {
        let _uri = '/table/associationView/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as GenTableAssociationView | undefined
    }
    
    async listColumnView(options: TableServiceOptions['listColumnView']): Promise<
        GenTableColumnView[]
    > {
        let _uri = '/table/columnView/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'GET'})) as GenTableColumnView[]
    }
    
    async query(options: TableServiceOptions['query']): Promise<
        GenTableCommonView[]
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
        _value = options.query.schemaIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'schemaIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as GenTableCommonView[]
    }
}

export type TableServiceOptions = {
    'delete': {ids: number[]},
    'getAssociationView': {id: number},
    'listColumnView': {ids: number[]},
    'query': {query: TableQuery}
}