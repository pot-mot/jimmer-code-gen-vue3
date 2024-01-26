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
    
    async config(options: EntityServiceOptions['config']): Promise<
        number
    > {
        let _uri = '/entity/config';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<number>;
    }
    
    async delete(options: EntityServiceOptions['delete']): Promise<
        number
    > {
        let _uri = '/entity/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
    }
    
    /**
     * 获取单个数据源
     */
    async get(options: EntityServiceOptions['get']): Promise<
        GenEntityPropertiesView | undefined
    > {
        let _uri = '/entity/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenEntityPropertiesView | undefined>;
    }
    
    /**
     * 列出所有数据源
     */
    async list(): Promise<
        Array<GenEntityCommonView>
    > {
        let _uri = '/entity/';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenEntityCommonView>>;
    }
    
    async listLanguage(): Promise<
        Array<GenLanguage>
    > {
        let _uri = '/entity/language';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenLanguage>>;
    }
    
    async query(options: EntityServiceOptions['query']): Promise<
        Array<GenEntityPropertiesView>
    > {
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
