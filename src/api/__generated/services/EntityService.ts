import type {Executor} from '../';
import type {GenLanguage} from '../model/enums/';
import type {GenEntityDetailView} from '../model/static/';

export class EntityService {
    
    constructor(private executor: Executor) {}
    
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
}

export type EntityServiceOptions = {
    'get': {
        id: number
    }, 
    'listLanguage': {}, 
    'delete': {
        ids: Array<number>
    }
}
