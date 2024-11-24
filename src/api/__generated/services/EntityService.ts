import type {Executor} from '../';
import type {GenLanguage} from '../model/enums/';
import type {GenEntityConfigInput, GenEntityDetailView} from '../model/static/';

export class EntityService {
    
    constructor(private executor: Executor) {}
    
    readonly config: (options: EntityServiceOptions['config']) => Promise<
        number
    > = async(options) => {
        let _uri = '/entity';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<number>;
    }
    
    readonly get: (options: EntityServiceOptions['get']) => Promise<
        GenEntityDetailView | undefined
    > = async(options) => {
        let _uri = '/entity/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenEntityDetailView | undefined>;
    }
    
    readonly getByTableId: (options: EntityServiceOptions['getByTableId']) => Promise<
        GenEntityDetailView | undefined
    > = async(options) => {
        let _uri = '/entity/table/';
        _uri += encodeURIComponent(options.tableId);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenEntityDetailView | undefined>;
    }
    
    readonly listLanguage: () => Promise<
        Array<GenLanguage>
    > = async() => {
        let _uri = '/entity/language';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenLanguage>>;
    }
}

export type EntityServiceOptions = {
    'listLanguage': {}, 
    'get': {
        id: number
    }, 
    'getByTableId': {
        tableId: number
    }, 
    'config': {
        body: GenEntityConfigInput
    }
}
