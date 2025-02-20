import type {Executor} from '../';
import type {
    EntityExportView, 
    GenModelInput, 
    GenModelSimpleView, 
    GenModelView, 
    ModelInputEntities
} from '../model/static/';

export class ModelService {
    
    constructor(private executor: Executor) {}
    
    readonly configEntities: (options: ModelServiceOptions['configEntities']) => Promise<
        void
    > = async(options) => {
        let _uri = '/model/configEntities/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly delete: (options: ModelServiceOptions['delete']) => Promise<
        number
    > = async(options) => {
        let _uri = '/model';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.ids;
        for (const _item of _value) {
            _uri += _separator
            _uri += 'ids='
            _uri += encodeURIComponent(_item);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
    }
    
    readonly exportEntities: (options: ModelServiceOptions['exportEntities']) => Promise<
        Array<EntityExportView>
    > = async(options) => {
        let _uri = '/model/exportEntities/';
        _uri += encodeURIComponent(options.id);
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.excludeEntityIds;
        if (_value !== undefined && _value !== null) {
            for (const _item of _value) {
                _uri += _separator
                _uri += 'excludeEntityIds='
                _uri += encodeURIComponent(_item);
                _separator = '&';
            }
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<EntityExportView>>;
    }
    
    readonly get: (options: ModelServiceOptions['get']) => Promise<
        GenModelView | undefined
    > = async(options) => {
        let _uri = '/model/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenModelView | undefined>;
    }
    
    readonly getValueData: (options: ModelServiceOptions['getValueData']) => Promise<
        ModelInputEntities | undefined
    > = async(options) => {
        let _uri = '/model/valueData/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<ModelInputEntities | undefined>;
    }
    
    readonly list: () => Promise<
        Array<GenModelSimpleView>
    > = async() => {
        let _uri = '/model';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenModelSimpleView>>;
    }
    
    readonly save: (options: ModelServiceOptions['save']) => Promise<
        number
    > = async(options) => {
        let _uri = '/model';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<number>;
    }
}

export type ModelServiceOptions = {
    'list': {}, 
    'get': {
        id: number
    }, 
    'getValueData': {
        id: number
    }, 
    'save': {
        body: GenModelInput
    }, 
    'exportEntities': {
        id: number, 
        excludeEntityIds?: Array<number> | undefined
    }, 
    'configEntities': {
        id: number, 
        body: Array<EntityExportView>
    }, 
    'delete': {
        ids: Array<number>
    }
}
