import type { Executor } from '../';
import type { GenTableCommonView } from '../model/static';

export class SchemaController {
    
    constructor(private executor: Executor) {}
    
    async delete(options: SchemaControllerOptions['delete']): Promise<number> {
        let _uri = '/schema/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async listTables(options: SchemaControllerOptions['listTables']): Promise<
        ReadonlyArray<GenTableCommonView>
    > {
        let _uri = '/schema/';
        _uri += encodeURIComponent(options.schemaId);
        _uri += '/table';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<GenTableCommonView>
    }
    
    async refresh(options: SchemaControllerOptions['refresh']): Promise<number> {
        let _uri = '/schema/';
        _uri += encodeURIComponent(options.id);
        _uri += '/refresh';
        return (await this.executor({uri: _uri, method: 'PUT'})) as number
    }
}

export type SchemaControllerOptions = {
    'delete': {readonly ids: ReadonlyArray<number>},
    'listTables': {readonly schemaId: number},
    'refresh': {readonly id: number}
}