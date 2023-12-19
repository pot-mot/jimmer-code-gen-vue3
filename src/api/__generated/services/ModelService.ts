import type { Executor } from '../';
import type { DataSourceType } from '../model/enums';
import type { GenAssociationModelInput, GenModelInput, GenModelSimpleView, GenModelView, GenTableColumnsInput, Pair } from '../model/static';

export class ModelService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: ModelServiceOptions['delete']): Promise<number> {
        let _uri = '/model/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async get(options: ModelServiceOptions['get']): Promise<
        GenModelView | undefined
    > {
        let _uri = '/model/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as GenModelView | undefined
    }
    
    async getValueData(options: ModelServiceOptions['getValueData']): Promise<
        Pair<Array<GenTableColumnsInput>, Array<GenAssociationModelInput>> | undefined
    > {
        let _uri = '/model/valueData/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Pair<Array<GenTableColumnsInput>, Array<GenAssociationModelInput>> | undefined
    }
    
    async list(): Promise<
        Array<GenModelSimpleView>
    > {
        let _uri = '/model/';
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenModelSimpleView>
    }
    
    async listDatabaseType(): Promise<
        {[key:string]: number}
    > {
        let _uri = '/model/type';
        return (await this.executor({uri: _uri, method: 'GET'})) as {[key:string]: number}
    }
    
    async previewSql(options: ModelServiceOptions['previewSql']): Promise<
        Array<Pair<string, string>>
    > {
        let _uri = '/model/sql';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.type;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'type='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST'})) as Array<Pair<string, string>>
    }
    
    async save(options: ModelServiceOptions['save']): Promise<number> {
        let _uri = '/model/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as number
    }
}

export type ModelServiceOptions = {
    'delete': {ids: Array<number>},
    'get': {id: number},
    'getValueData': {id: number},
    'list': {},
    'listDatabaseType': {},
    'previewSql': {id: number, type?: DataSourceType},
    'save': {body: GenModelInput}
}