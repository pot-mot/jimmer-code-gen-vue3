import type {Executor} from '../';
import type {
    GenDataSourceInput, 
    GenDataSourceTemplateView, 
    GenDataSourceView, 
    Pair
} from '../model/static/';

export class DataSourceService {
    
    constructor(private executor: Executor) {}
    
    /**
     * 创建数据源
     */
    readonly create: (options: DataSourceServiceOptions['create']) => Promise<
        number
    > = async(options) => {
        let _uri = '/dataSource/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<number>;
    }
    
    /**
     * 删除数据源
     */
    readonly delete: (options: DataSourceServiceOptions['delete']) => Promise<
        number
    > = async(options) => {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
    }
    
    /**
     * 编辑数据源
     */
    readonly edit: (options: DataSourceServiceOptions['edit']) => Promise<
        number
    > = async(options) => {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<number>;
    }
    
    /**
     * 获取单个数据源
     */
    readonly get: (options: DataSourceServiceOptions['get']) => Promise<
        GenDataSourceView | undefined
    > = async(options) => {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenDataSourceView | undefined>;
    }
    
    /**
     * 获取默认数据库配置
     */
    readonly getDefaults: () => Promise<
        Array<Pair<string, GenDataSourceTemplateView>>
    > = async() => {
        let _uri = '/dataSource/defaults';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<Pair<string, GenDataSourceTemplateView>>>;
    }
    
    /**
     * 列出所有数据源
     */
    readonly list: () => Promise<
        Array<GenDataSourceView>
    > = async() => {
        let _uri = '/dataSource/';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenDataSourceView>>;
    }
    
    /**
     * 测试数据源
     */
    readonly test: (options: DataSourceServiceOptions['test']) => Promise<
        boolean
    > = async(options) => {
        let _uri = '/dataSource/test';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<boolean>;
    }
}

export type DataSourceServiceOptions = {
    'list': {}, 
    'get': {
        id: number
    }, 
    'getDefaults': {}, 
    'create': {
        body: GenDataSourceInput
    }, 
    'edit': {
        id: number, 
        body: GenDataSourceInput
    }, 
    'test': {
        body: GenDataSourceInput
    }, 
    'delete': {
        ids: Array<number>
    }
}
