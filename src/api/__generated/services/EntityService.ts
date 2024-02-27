import type {Executor} from '../';
import type {GenLanguage} from '../model/enums/';
import type {
    EntityQuery, 
    GenEntityCommonView, 
    GenEntityConfigInput, 
    GenEntityPropertiesView
} from '../model/static/';

export class EntityService {
    
    constructor(private executor: Executor) {}
    
    readonly config: (options: EntityServiceOptions['config']) => Promise<
        number
    > = async(options) => {
        let _uri = '/entity/config';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<number>;
    }
    
    readonly delete: (options: EntityServiceOptions['delete']) => Promise<
        number
    > = async(options) => {
        let _uri = '/entity/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
    }
    
    /**
     * 获取单个数据源
     */
    readonly get: (options: EntityServiceOptions['get']) => Promise<
        GenEntityPropertiesView | undefined
    > = async(options) => {
        let _uri = '/entity/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenEntityPropertiesView | undefined>;
    }
    
    /**
     * 列出所有数据源
     */
    readonly list: () => Promise<
        Array<GenEntityCommonView>
    > = async() => {
        let _uri = '/entity/';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenEntityCommonView>>;
    }
    
    readonly listLanguage: () => Promise<
        Array<GenLanguage>
    > = async() => {
        let _uri = '/entity/language';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenLanguage>>;
    }
    
    readonly query: (options: EntityServiceOptions['query']) => Promise<
        Array<GenEntityPropertiesView>
    > = async(options) => {
        let _uri = '/entity/query';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenEntityPropertiesView>>;
    }
}

export type EntityServiceOptions = {
    'list': {}, 
    'get': {
        id: number
    }, 
    'listLanguage': {}, 
    'config': {
        body: GenEntityConfigInput
    }, 
    'query': {
        body: EntityQuery
    }, 
    'delete': {
        ids: Array<number>
    }
}
