import type { Dynamic, Executor } from '../';
import type { GenTypeMappingDto } from '../model/dto';
import type { GenTypeMapping } from '../model/entities';
import type { GenTypeMappingInput } from '../model/static';

export class TypeMappingService {
    
    constructor(private executor: Executor) {}
    
    async add(options: TypeMappingServiceOptions['add']): Promise<number> {
        let _uri = '/typeMapping/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as number
    }
    
    async delete(options: TypeMappingServiceOptions['delete']): Promise<number> {
        let _uri = '/typeMapping/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async get(options: TypeMappingServiceOptions['get']): Promise<
        GenTypeMappingDto['DEFAULT'] | undefined
    > {
        let _uri = '/typeMapping/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as GenTypeMappingDto['DEFAULT'] | undefined
    }
    
    async list(): Promise<
        GenTypeMappingDto['DEFAULT'][]
    > {
        let _uri = '/typeMapping/';
        return (await this.executor({uri: _uri, method: 'GET'})) as GenTypeMappingDto['DEFAULT'][]
    }
    
    async update(options: TypeMappingServiceOptions['update']): Promise<number> {
        let _uri = '/typeMapping/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as number
    }
}

export type TypeMappingServiceOptions = {
    'add': {body: GenTypeMappingInput},
    'delete': {ids: number[]},
    'get': {id: number},
    'list': {},
    'update': {body: Dynamic<GenTypeMapping>}
}