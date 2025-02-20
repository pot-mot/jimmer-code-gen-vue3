import type {Executor} from '../';
import type {EntityConfigInput, EntityConfigView} from '../model/static/';

export class EntityService {
    
    constructor(private executor: Executor) {}
    
    readonly config: (options: EntityServiceOptions['config']) => Promise<
        void
    > = async(options) => {
        let _uri = '/entity/config';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<void>;
    }
    
    readonly get: (options: EntityServiceOptions['get']) => Promise<
        EntityConfigView | undefined
    > = async(options) => {
        let _uri = '/entity/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<EntityConfigView | undefined>;
    }
}

export type EntityServiceOptions = {
    'get': {
        id: number
    }, 
    'config': {
        body: EntityConfigInput
    }
}
