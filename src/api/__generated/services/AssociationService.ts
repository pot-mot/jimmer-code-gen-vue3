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
    
    async listMatchType(): Promise<
        AssociationMatchType[]
    > {
        let _uri = '/association/matchType';
        return (await this.executor({uri: _uri, method: 'GET'})) as AssociationMatchType[]
    }
    
    async match(options: AssociationServiceOptions['match']): Promise<
        GenAssociationMatchView[]
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
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as GenAssociationMatchView[]
    }
    
    async query(options: AssociationServiceOptions['query']): Promise<
        GenAssociationView[]
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
        return (await this.executor({uri: _uri, method: 'GET'})) as GenAssociationView[]
    }
    
    async save(options: AssociationServiceOptions['save']): Promise<
        number[]
    > {
        let _uri = '/association/save';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as number[]
    }
    
    async selectByColumn(options: AssociationServiceOptions['selectByColumn']): Promise<
        GenAssociationView[]
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
        return (await this.executor({uri: _uri, method: 'GET'})) as GenAssociationView[]
    }
    
    async selectByTable(options: AssociationServiceOptions['selectByTable']): Promise<
        GenAssociationView[]
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
        return (await this.executor({uri: _uri, method: 'GET'})) as GenAssociationView[]
    }
}

export type AssociationServiceOptions = {
    'delete': {ids: number[]},
    'deleteByColumn': {
        sourceColumnIds: number[], 
        targetColumnIds: number[], 
        selectType?: SelectType
    },
    'deleteByTable': {tableIds: number[], selectType?: SelectType},
    'listMatchType': {},
    'match': {body: number[], matchType?: AssociationMatchType},
    'query': {query: AssociationQuery},
    'save': {body: GenAssociationInput[]},
    'selectByColumn': {
        sourceColumnIds: number[], 
        targetColumnIds: number[], 
        selectType?: SelectType
    },
    'selectByTable': {tableIds: number[], selectType?: SelectType}
}