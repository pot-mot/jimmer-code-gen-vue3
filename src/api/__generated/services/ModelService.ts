import type {Executor} from '../';
import type {
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
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
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
    'get': {
        id: number
    }, 
    'getValueData': {
        id: number
    }, 
    'list': {}, 
    'save': {
        body: GenModelInput
    }, 
    'delete': {
        ids: Array<number>
    }
}
