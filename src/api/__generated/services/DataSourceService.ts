import type { Dynamic, Executor } from '../';
import type { GenSchemaDto } from '../model/dto';
import type { GenSchema } from '../model/entities';
import type { GenDataSourceInput, GenDataSourceView } from '../model/static';

export class DataSourceService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: DataSourceServiceOptions['delete']): Promise<number> {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async importSchema(options: DataSourceServiceOptions['importSchema']): Promise<
        ReadonlyArray<Dynamic<GenSchema>>
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema/';
        _uri += encodeURIComponent(options.name);
        return (await this.executor({uri: _uri, method: 'POST'})) as ReadonlyArray<Dynamic<GenSchema>>
    }
    
    async list(): Promise<
        ReadonlyArray<GenDataSourceView>
    > {
        let _uri = '/dataSource/';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<GenDataSourceView>
    }
    
    async listTypes(): Promise<
        ReadonlyArray<string>
    > {
        let _uri = '/dataSource/types';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<string>
    }
    
    async save(options: DataSourceServiceOptions['save']): Promise<
        GenDataSourceView
    > {
        let _uri = '/dataSource/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as GenDataSourceView
    }
    
    async viewSchemas(options: DataSourceServiceOptions['viewSchemas']): Promise<
        ReadonlyArray<GenSchemaDto['DEFAULT']>
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<GenSchemaDto['DEFAULT']>
    }
}

export type DataSourceServiceOptions = {
    'delete': {readonly ids: ReadonlyArray<number>},
    'importSchema': {readonly dataSourceId: number, readonly name: string},
    'list': {},
    'listTypes': {},
    'save': {readonly body: GenDataSourceInput},
    'viewSchemas': {readonly dataSourceId: number}
}