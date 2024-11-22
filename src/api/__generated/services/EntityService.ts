import type {Executor} from '../';
import type {GenLanguage} from '../model/enums/';
import type {EntityQuery, GenEntityDetailView} from '../model/static/';

export class EntityService {
    
    constructor(private executor: Executor) {}
    
    readonly get: (options: EntityServiceOptions['get']) => Promise<
        GenEntityDetailView | undefined
    > = async(options) => {
        let _uri = '/entity/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenEntityDetailView | undefined>;
    }
    
    readonly listLanguage: () => Promise<
        Array<GenLanguage>
    > = async() => {
        let _uri = '/entity/language';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenLanguage>>;
    }
    
    readonly query: (options: EntityServiceOptions['query']) => Promise<
        Array<GenEntityDetailView>
    > = async(options) => {
        let _uri = '/entity/query';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenEntityDetailView>>;
    }
}

export type EntityServiceOptions = {
    'get': {
        id: number
    }, 
    'listLanguage': {}, 
    'query': {
        body: EntityQuery
    }
}
