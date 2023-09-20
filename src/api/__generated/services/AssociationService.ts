import type { Executor } from '../';
import type { AssociationQuery, GenAssociationCommonInput, GenAssociationCommonView, GenAssociationMatchView } from '../model/static';

export class AssociationService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: AssociationServiceOptions['delete']): Promise<number> {
        let _uri = '/association/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async query(options: AssociationServiceOptions['query']): Promise<
        ReadonlyArray<GenAssociationCommonView>
    > {
        let _uri = '/association/query';
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
        _value = options.query.sourceColumnId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'sourceColumnId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.sourceTableId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'sourceTableId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.targetColumnId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'targetColumnId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.targetTableId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'targetTableId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<GenAssociationCommonView>
    }
    
    async save(options: AssociationServiceOptions['save']): Promise<number> {
        let _uri = '/association/save';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as number
    }
    
    async scan(options: AssociationServiceOptions['scan']): Promise<
        ReadonlyArray<GenAssociationMatchView>
    > {
        let _uri = '/association/scan';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as ReadonlyArray<GenAssociationMatchView>
    }
    
    async select(options: AssociationServiceOptions['select']): Promise<
        ReadonlyArray<GenAssociationCommonView>
    > {
        let _uri = '/association/select';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.tableId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'tableId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<GenAssociationCommonView>
    }
}

export type AssociationServiceOptions = {
    'delete': {readonly ids: ReadonlyArray<number>},
    'query': {readonly query: AssociationQuery},
    'save': {readonly body: ReadonlyArray<GenAssociationCommonInput>},
    'scan': {readonly body: ReadonlyArray<number>},
    'select': {readonly tableId: number}
}