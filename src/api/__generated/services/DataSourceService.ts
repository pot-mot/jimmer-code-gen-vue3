import type {Executor} from '../';
import type {DataSourceType} from '../model/enums/';
import type {GenDataSourceInput, GenDataSourceTemplateView, GenDataSourceView} from '../model/static/';

export class DataSourceService {
    
    constructor(private executor: Executor) {}
    
    /**
     * 创建数据源
     */
    async create(options: DataSourceServiceOptions['create']): Promise<
        number
    > {
        let _uri = '/dataSource/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<number>;
    }
    
    /**
     * 删除数据源
     */
    async delete(options: DataSourceServiceOptions['delete']): Promise<
        number
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
    }
    
    /**
     * 编辑数据源
     */
    async edit(options: DataSourceServiceOptions['edit']): Promise<
        number
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<number>;
    }
    
    /**
     * 获取单个数据源
     */
    async get(options: DataSourceServiceOptions['get']): Promise<
        GenDataSourceView | undefined
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenDataSourceView | undefined>;
    }
    
    /**
     * 获取默认数据库配置
     */
    async getDefault(options: DataSourceServiceOptions['getDefault']): Promise<
        GenDataSourceTemplateView
    > {
        let _uri = '/dataSource/default';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.dataSourceType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'dataSourceType='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenDataSourceTemplateView>;
    }
    
    /**
     * 获取默认数据库配置
     */
    async getDefaults(): Promise<
        {[key:string]: GenDataSourceTemplateView}
    > {
        let _uri = '/dataSource/defaults';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<{[key:string]: GenDataSourceTemplateView}>;
    }
    
    /**
     * 列出所有数据源
     */
    async list(): Promise<
        Array<GenDataSourceView>
    > {
        let _uri = '/dataSource/';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenDataSourceView>>;
    }
    
    /**
     * 测试数据源
     */
    async test(options: DataSourceServiceOptions['test']): Promise<
        boolean
    > {
        let _uri = '/dataSource/test';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<boolean>;
    }
}
export type DataSourceServiceOptions = {
    'list': {}, 
    'get': {
        id: number
    }, 
    'getDefault': {
        dataSourceType: DataSourceType
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
