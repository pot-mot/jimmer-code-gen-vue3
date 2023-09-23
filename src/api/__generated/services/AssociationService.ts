import type { Executor } from '../';
import type { AssociationMatchType, SelectType } from '../model/enums';
import type { AssociationQuery, GenAssociationCommonInput, GenAssociationCommonView, GenAssociationMatchView } from '../model/static';

export class AssociationService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: AssociationServiceOptions['delete']): Promise<number> {
        let _uri = '/association/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async deleteByColumn(options: AssociationServiceOptions['deleteByColumn']): Promise<number> {
        let _uri = '/association/column/';
        _uri += encodeURIComponent(options.columnIds.join(','));
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
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
        let _uri = '/association/table/';
        _uri += encodeURIComponent(options.tableIds.join(','));
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
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
        ReadonlyArray<AssociationMatchType>
    > {
        let _uri = '/association/matchType';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<AssociationMatchType>
    }
    
    async match(options: AssociationServiceOptions['match']): Promise<
        ReadonlyArray<GenAssociationMatchView>
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
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as ReadonlyArray<GenAssociationMatchView>
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
    
    async save(options: AssociationServiceOptions['save']): Promise<
        ReadonlyArray<number>
    > {
        let _uri = '/association/save';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as ReadonlyArray<number>
    }
    
    async selectByColumn(options: AssociationServiceOptions['selectByColumn']): Promise<
        ReadonlyArray<GenAssociationMatchView>
    > {
        let _uri = '/association/select/column/';
        _uri += encodeURIComponent(options.columnIds.join(','));
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.selectType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'selectType='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<GenAssociationMatchView>
    }
    
    async selectByTable(options: AssociationServiceOptions['selectByTable']): Promise<
        ReadonlyArray<GenAssociationMatchView>
    > {
        let _uri = '/association/select/table/';
        _uri += encodeURIComponent(options.tableIds.join(','));
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.selectType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'selectType='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<GenAssociationMatchView>
    }
}

export type AssociationServiceOptions = {
    'delete': {readonly ids: ReadonlyArray<number>},
    'deleteByColumn': {readonly columnIds: ReadonlyArray<number>, readonly selectType?: SelectType},
    'deleteByTable': {readonly tableIds: ReadonlyArray<number>, readonly selectType?: SelectType},
    'listMatchType': {},
    'match': {readonly body: ReadonlyArray<number>, readonly matchType?: AssociationMatchType},
    'query': {readonly query: AssociationQuery},
    'save': {readonly body: ReadonlyArray<GenAssociationCommonInput>},
    'selectByColumn': {readonly columnIds: ReadonlyArray<number>, readonly selectType?: SelectType},
    'selectByTable': {readonly tableIds: ReadonlyArray<number>, readonly selectType?: SelectType}
}