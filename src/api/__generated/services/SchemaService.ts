import type {Executor} from '../';
import type {GenSchemaPreview, GenSchemaView} from '../model/static/';

export class SchemaService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: SchemaServiceOptions['delete']): Promise<
        number
    > {
        let _uri = '/schema/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
    }
    
    async list(options: SchemaServiceOptions['list']): Promise<
        Array<GenSchemaView>
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.schemaIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'schemaIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenSchemaView>>;
    }
    
    /**
     * 导入 schema
     */
    async load(options: SchemaServiceOptions['load']): Promise<
        Array<number>
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema/';
        _uri += encodeURIComponent(options.name);
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<number>>;
    }
    
    /**
     * 预览数据源中全部的 schema
     */
    async preview(options: SchemaServiceOptions['preview']): Promise<
        Array<GenSchemaPreview>
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema/preview';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenSchemaPreview>>;
    }
}

export type SchemaServiceOptions = {
    'preview': {
        dataSourceId: number
    }, 
    'load': {
        dataSourceId: number, 
        name: string
    }, 
    'list': {
        dataSourceId: number, 
        schemaIds?: Array<number> | undefined
    }, 
    'delete': {
        ids: Array<number>
    }
}
