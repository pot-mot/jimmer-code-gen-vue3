import type { Executor } from '../';
import type { GenTypeMappingInput, GenTypeMappingView } from '../model/static';

export class TypeMappingService {
    
    constructor(private executor: Executor) {}
    
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
    
    async saveAll(options: TypeMappingServiceOptions['saveAll']): Promise<
        Array<number>
    > {
        let _uri = '/typeMapping/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<number>
    }
}

export type TypeMappingServiceOptions = {
    'get': {id: number},
    'getDefault': {},
    'list': {},
    'saveAll': {body: Array<GenTypeMappingInput>}
}