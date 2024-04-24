import type {Executor} from '../';
import type {GenTypeMappingInput, GenTypeMappingView} from '../model/static/';

export class TypeMappingService {
    
    constructor(private executor: Executor) {}
    
    readonly get: (options: TypeMappingServiceOptions['get']) => Promise<
        GenTypeMappingView | undefined
    > = async(options) => {
        let _uri = '/typeMapping/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenTypeMappingView | undefined>;
    }
    
    readonly list: () => Promise<
        Array<GenTypeMappingView>
    > = async() => {
        let _uri = '/typeMapping';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenTypeMappingView>>;
    }
    
    readonly saveAll: (options: TypeMappingServiceOptions['saveAll']) => Promise<
        Array<number>
    > = async(options) => {
        let _uri = '/typeMapping';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<number>>;
    }
}

export type TypeMappingServiceOptions = {
    'get': {
        id: number
    }, 
    'list': {}, 
    'saveAll': {
        body: Array<GenTypeMappingInput>
    }
}
