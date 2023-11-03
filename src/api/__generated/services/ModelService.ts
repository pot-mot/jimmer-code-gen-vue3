import type { Executor } from '../';
import type { GenAssociationModelInput, GenModelInput, GenModelView, GenTableColumnsInput } from '../model/static';

export class ModelService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: ModelServiceOptions['delete']): Promise<number> {
        let _uri = '/model/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
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
        return (await this.executor({uri: _uri, method: 'POST'})) as string | undefined
    }
    
    async save(options: ModelServiceOptions['save']): Promise<number> {
        let _uri = '/model/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as number
    }
}

export type ModelServiceOptions = {
    'delete': {ids: number[]},
    'list': {},
    'listDataBaseType': {},
    'loadToDataSource': {
        id: number, 
        tables: GenTableColumnsInput[], 
        associations: GenAssociationModelInput[]
    },
    'save': {body: GenModelInput}
}