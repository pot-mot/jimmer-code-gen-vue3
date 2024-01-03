import type {Executor} from '../';
import type {
    GenAssociationModelInput, 
    GenModelInput, 
    GenModelSimpleView, 
    GenModelView, 
    GenTableModelInput, 
    Pair
} from '../model/static/';

export class ModelService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: ModelServiceOptions['delete']): Promise<
        number
    > {
        let _uri = '/model/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
    }
    
    async get(options: ModelServiceOptions['get']): Promise<
        GenModelView | undefined
    > {
        let _uri = '/model/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenModelView | undefined>;
    }
    
    async getValueData(options: ModelServiceOptions['getValueData']): Promise<
        Pair<Array<GenTableModelInput>, Array<GenAssociationModelInput>> | undefined
    > {
        let _uri = '/model/valueData/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Pair<Array<GenTableModelInput>, Array<GenAssociationModelInput>> | undefined>;
    }
    
    async list(): Promise<
        Array<GenModelSimpleView>
    > {
        let _uri = '/model/';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenModelSimpleView>>;
    }
    
    async save(options: ModelServiceOptions['save']): Promise<
        number
    > {
        let _uri = '/model/';
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
