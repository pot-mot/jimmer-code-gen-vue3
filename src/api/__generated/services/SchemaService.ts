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
    
    async import(options: SchemaServiceOptions['import']): Promise<
        number[]
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema/';
        _uri += encodeURIComponent(options.name);
        return (await this.executor({uri: _uri, method: 'POST'})) as number[]
    }
    
    async list(options: SchemaServiceOptions['list']): Promise<
        GenSchemaView[]
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema/';
        _uri += encodeURIComponent(options.schemaIds.join(','));
        return (await this.executor({uri: _uri, method: 'GET'})) as GenSchemaView[]
    }
    
    async preview(options: SchemaServiceOptions['preview']): Promise<
        GenSchemaDto['DEFAULT'][]
    > {
        let _uri = '/dataSource/';
        _uri += encodeURIComponent(options.dataSourceId);
        _uri += '/schema/preview';
        return (await this.executor({uri: _uri, method: 'GET'})) as GenSchemaDto['DEFAULT'][]
    }
}

export type SchemaServiceOptions = {
    'delete': {ids: number[]},
    'import': {dataSourceId: number, name: string},
    'list': {dataSourceId: number, schemaIds: number[]},
    'preview': {dataSourceId: number}
}