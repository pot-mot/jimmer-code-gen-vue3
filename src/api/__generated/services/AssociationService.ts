import type { Executor } from '../';
import type { AssociationMatchType, SelectType } from '../model/enums';
import type { AssociationQuery, GenAssociationInput, GenAssociationMatchView, GenAssociationView } from '../model/static';

export class AssociationService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: AssociationServiceOptions['delete']): Promise<number> {
        let _uri = '/association/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async deleteByColumn(options: AssociationServiceOptions['deleteByColumn']): Promise<number> {
        let _uri = '/association/column';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.sourceColumnIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'sourceColumnIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.targetColumnIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'targetColumnIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.selectType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'selectType='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async deleteByTable(options: AssociationServiceOptions['deleteByTable']): Promise<number> {
        let _uri = '/association/table';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.tableIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'tableIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.selectType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'selectType='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async match(options: AssociationServiceOptions['match']): Promise<
        Array<GenAssociationMatchView>
    > {
        let _uri = '/association/match';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.matchType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'matchType='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<GenAssociationMatchView>
    }
    
    async query(options: AssociationServiceOptions['query']): Promise<
        Array<GenAssociationView>
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenAssociationView>
    }
    
    async queryByColumn(options: AssociationServiceOptions['queryByColumn']): Promise<
        Array<GenAssociationView>
    > {
        let _uri = '/association/column';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.sourceColumnIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'sourceColumnIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.targetColumnIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'targetColumnIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.selectType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'selectType='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenAssociationView>
    }
    
    async queryByTable(options: AssociationServiceOptions['queryByTable']): Promise<
        Array<GenAssociationView>
    > {
        let _uri = '/association/table';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.tableIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'tableIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.selectType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'selectType='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenAssociationView>
    }
    
    async save(options: AssociationServiceOptions['save']): Promise<
        Array<number>
    > {
        let _uri = '/association/save';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<number>
    }
}

export type AssociationServiceOptions = {
    'delete': {ids: Array<number>},
    'deleteByColumn': {
        sourceColumnIds: Array<number>, 
        targetColumnIds: Array<number>, 
        selectType?: SelectType
    },
    'deleteByTable': {tableIds: Array<number>, selectType?: SelectType},
    'match': {body: Array<number>, matchType?: AssociationMatchType},
    'query': {query: AssociationQuery},
    'queryByColumn': {
        sourceColumnIds: Array<number>, 
        targetColumnIds: Array<number>, 
        selectType?: SelectType
    },
    'queryByTable': {tableIds: Array<number>, selectType?: SelectType},
    'save': {body: Array<GenAssociationInput>}
}