import type { Executor } from '../';
import type { GenAssociationModelInput, GenModelInput, GenModelView, GenTableColumnsInput, Tuple2 } from '../model/static';

export class ModelService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: ModelServiceOptions['delete']): Promise<number> {
        let _uri = '/model/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async insertToSchema(options: ModelServiceOptions['insertToSchema']): Promise<
        Tuple2<number[], number>[]
    > {
        let _uri = '/model/insert/';
        _uri += encodeURIComponent(options.schemaId);
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.tables.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'tables='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.associations.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'associations='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST'})) as Tuple2<number[], number>[]
    }
    
    async list(): Promise<
        GenModelView[]
    > {
        let _uri = '/model/';
        return (await this.executor({uri: _uri, method: 'GET'})) as GenModelView[]
    }
    
    async listDataBaseType(): Promise<
        { [key: string]: number }
    > {
        let _uri = '/model/type';
        return (await this.executor({uri: _uri, method: 'GET'})) as { [key: string]: number }
    }
    
    async loadToDataSource(options: ModelServiceOptions['loadToDataSource']): Promise<string | undefined> {
        let _uri = '/model/load';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.dataSourceId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'dataSourceId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST'})) as string | undefined
    }
    
    async save(options: ModelServiceOptions['save']): Promise<number> {
        let _uri = '/model/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as number
    }
    
    async toSql(options: ModelServiceOptions['toSql']): Promise<string | undefined> {
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
        _value = options.dataSourceId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'dataSourceId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST'})) as string | undefined
    }
}

export type ModelServiceOptions = {
    'delete': {ids: number[]},
    'insertToSchema': {
        schemaId: number, 
        tables: GenTableColumnsInput[], 
        associations: GenAssociationModelInput[]
    },
    'list': {},
    'listDataBaseType': {},
    'loadToDataSource': {id: number, dataSourceId: number},
    'save': {body: GenModelInput},
    'toSql': {id: number, dataSourceId: number}
}