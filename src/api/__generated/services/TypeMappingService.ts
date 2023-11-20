import type { Dynamic, Executor } from '../';
import type { GenTypeMapping } from '../model/entities';
import type { GenTypeMappingInput, GenTypeMappingView } from '../model/static';

export class TypeMappingService {
    
    constructor(private executor: Executor) {}
    
    async create(options: TypeMappingServiceOptions['create']): Promise<number> {
        let _uri = '/typeMapping/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as number
    }
    
    async delete(options: TypeMappingServiceOptions['delete']): Promise<number> {
        let _uri = '/typeMapping/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async get(options: TypeMappingServiceOptions['get']): Promise<
        GenTypeMappingView | undefined
    > {
        let _uri = '/typeMapping/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as GenTypeMappingView | undefined
    }
    
    async getDefault(): Promise<
        GenTypeMappingInput
    > {
        let _uri = '/typeMapping/default';
        return (await this.executor({uri: _uri, method: 'GET'})) as GenTypeMappingInput
    }
    
    async list(): Promise<
        Array<GenTypeMappingView>
    > {
        let _uri = '/typeMapping/';
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenTypeMappingView>
    }
    
    async update(options: TypeMappingServiceOptions['update']): Promise<number> {
        let _uri = '/typeMapping/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as number
    }
}

export type TypeMappingServiceOptions = {
    'create': {body: GenTypeMappingInput},
    'delete': {ids: Array<number>},
    'get': {id: number},
    'getDefault': {},
    'list': {},
    'update': {body: Dynamic<GenTypeMapping>}
}