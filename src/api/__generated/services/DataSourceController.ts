import type { Dynamic, Executor } from '../';
import type { GenSchemaDto } from '../model/dto';
import type { GenDataSource, GenSchema } from '../model/entities';
import type { GenDataSourceInput, GenDataSourceSchemasView, GenSchemaInsertInput, GenSchemaTablesView } from '../model/static';

export class DataSourceController {
    
    constructor(private executor: Executor) {}
    
    async delete(options: DataSourceControllerOptions['delete']): Promise<number> {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async importSchema(options: DataSourceControllerOptions['importSchema']): Promise<
        ReadonlyArray<Dynamic<GenSchema>>
    > {
        let _uri = '/dataSource/schema';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as ReadonlyArray<Dynamic<GenSchema>>
    }
    
    async list(): Promise<
        ReadonlyArray<GenDataSourceSchemasView>
    > {
        let _uri = '/dataSource/';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<GenDataSourceSchemasView>
    }
    
    async listSchemas(options: DataSourceControllerOptions['listSchemas']): Promise<
        ReadonlyArray<GenSchemaTablesView>
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schemas/imported';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<GenSchemaTablesView>
    }
    
    async listTypes(): Promise<
        ReadonlyArray<string>
    > {
        let _uri = '/dataSource/types';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<string>
    }
    
    async save(options: DataSourceControllerOptions['save']): Promise<
        Dynamic<GenDataSource>
    > {
        let _uri = '/dataSource/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Dynamic<GenDataSource>
    }
    
    async viewSchemas(options: DataSourceControllerOptions['viewSchemas']): Promise<
        ReadonlyArray<GenSchemaDto['DEFAULT']>
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schemas/all';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<GenSchemaDto['DEFAULT']>
    }
}

export type DataSourceControllerOptions = {
    'delete': {readonly ids: ReadonlyArray<number>},
    'importSchema': {readonly body: GenSchemaInsertInput},
    'list': {},
    'listSchemas': {readonly dataSourceId: number},
    'listTypes': {},
    'save': {readonly body: GenDataSourceInput},
    'viewSchemas': {readonly dataSourceId: number}
}