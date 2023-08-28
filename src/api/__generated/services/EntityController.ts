import type { Executor } from '../';
import type { EntityQuery, GenEntityConfigInput, GenEntityPropertiesInput, GenEntityPropertiesView } from '../model/static';

export class EntityController {
    
    constructor(private executor: Executor) {}
    
    async config(options: EntityControllerOptions['config']): Promise<
        GenEntityPropertiesView
    > {
        let _uri = '/entity/config';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as GenEntityPropertiesView
    }
    
    async delete(options: EntityControllerOptions['delete']): Promise<number> {
        let _uri = '/entity/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async map(options: EntityControllerOptions['map']): Promise<
        ReadonlyArray<GenEntityPropertiesView>
    > {
        let _uri = '/entity/map';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as ReadonlyArray<GenEntityPropertiesView>
    }
    
    async query(options: EntityControllerOptions['query']): Promise<
        ReadonlyArray<GenEntityPropertiesView>
    > {
        let _uri = '/entity/query';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as ReadonlyArray<GenEntityPropertiesView>
    }
    
    async save(options: EntityControllerOptions['save']): Promise<
        ReadonlyArray<GenEntityPropertiesView>
    > {
        let _uri = '/entity/save';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as ReadonlyArray<GenEntityPropertiesView>
    }
    
    async sync(options: EntityControllerOptions['sync']): Promise<
        ReadonlyArray<GenEntityPropertiesView>
    > {
        let _uri = '/entity/sync';
        return (await this.executor({uri: _uri, method: 'GET', body: options.body})) as ReadonlyArray<GenEntityPropertiesView>
    }
}

export type EntityControllerOptions = {
    'config': {readonly body: GenEntityConfigInput},
    'delete': {readonly ids: ReadonlyArray<number>},
    'map': {readonly body: ReadonlyArray<number>},
    'query': {readonly body: EntityQuery},
    'save': {readonly body: ReadonlyArray<GenEntityPropertiesInput>},
    'sync': {readonly body: ReadonlyArray<number>}
}