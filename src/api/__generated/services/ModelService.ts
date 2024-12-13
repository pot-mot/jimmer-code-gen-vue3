import type {Executor} from '../';
import type {
    EntityModelBusinessView, 
    GenModelInput, 
    GenModelSimpleView, 
    GenModelView, 
    ModelInputEntities
} from '../model/static/';

export class ModelService {
    
    constructor(private executor: Executor) {}
    
    readonly delete: (options: ModelServiceOptions['delete']) => Promise<
        number
    > = async(options) => {
        let _uri = '/model/';
        _uri += encodeURIComponent(options.ids);
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
    }
    
    readonly get: (options: ModelServiceOptions['get']) => Promise<
        GenModelView | undefined
    > = async(options) => {
        let _uri = '/model/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenModelView | undefined>;
    }
    
    readonly getEntityBusinessViews: (options: ModelServiceOptions['getEntityBusinessViews']) => Promise<
        Array<EntityModelBusinessView>
    > = async(options) => {
        let _uri = '/model/entityBusinessViews/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<EntityModelBusinessView>>;
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
    
    readonly saveBusiness: (options: ModelServiceOptions['saveBusiness']) => Promise<
        void
    > = async(options) => {
        let _uri = '/model/business/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
}

export type ModelServiceOptions = {
    'get': {
        id: number
    }, 
    'getValueData': {
        id: number
    }, 
    'getEntityBusinessViews': {
        id: number, 
        excludeEntityIds?: Array<number> | undefined
    }, 
    'list': {}, 
    'save': {
        body: GenModelInput
    }, 
    'saveBusiness': {
        id: number, 
        body: Array<EntityModelBusinessView>
    }, 
    'delete': {
        ids: Array<number>
    }
}
