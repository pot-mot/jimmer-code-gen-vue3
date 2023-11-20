import type { Executor } from '../';
import type { GenSchemaDto } from '../model/dto';
import type { GenSchemaView } from '../model/static';

export class SchemaService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: SchemaServiceOptions['delete']): Promise<number> {
        let _uri = '/schema/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async list(options: SchemaServiceOptions['list']): Promise<
        Array<GenSchemaView>
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema/';
        _uri += encodeURIComponent(options.schemaIds.join(','));
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenSchemaView>
    }
    
    async load(options: SchemaServiceOptions['load']): Promise<
        Array<number>
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema/';
        _uri += encodeURIComponent(options.name);
        return (await this.executor({uri: _uri, method: 'POST'})) as Array<number>
    }
    
    async preview(options: SchemaServiceOptions['preview']): Promise<
        Array<GenSchemaDto['DEFAULT']>
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema/preview';
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenSchemaDto['DEFAULT']>
    }
}

export type SchemaServiceOptions = {
    'delete': {ids: Array<number>},
    'list': {dataSourceId: number, schemaIds: Array<number>},
    'load': {dataSourceId: number, name: string},
    'preview': {dataSourceId: number}
}