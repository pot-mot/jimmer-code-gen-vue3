import type {Executor} from '../';
import type {EntityConfigInput, EntityConfigView} from '../model/static/';

export class EntityService {
    
    constructor(private executor: Executor) {}
    
    readonly config: (options: EntityServiceOptions['config']) => Promise<
        void
    > = async(options) => {
        let _uri = '/entity/config';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<void>;
    }
    
    readonly configList: (options: EntityServiceOptions['configList']) => Promise<
        void
    > = async(options) => {
        let _uri = '/entity/config/list';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<void>;
    }
    
    readonly get: (options: EntityServiceOptions['get']) => Promise<
        EntityConfigView | undefined
    > = async(options) => {
        let _uri = '/entity/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<EntityConfigView | undefined>;
    }
    
    readonly listByModelId: (options: EntityServiceOptions['listByModelId']) => Promise<
        Array<EntityConfigView>
    > = async(options) => {
        let _uri = '/entity/model/';
        _uri += encodeURIComponent(options.modelId);
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.excludeEntityIds;
        if (_value !== undefined && _value !== null) {
            for (const _item of _value) {
                _uri += _separator
                _uri += 'excludeEntityIds='
                _uri += encodeURIComponent(_item);
                _separator = '&';
            }
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<EntityConfigView>>;
    }
}

export type EntityServiceOptions = {
    'get': {
        id: number
    }, 
    'listByModelId': {
        modelId: number, 
        excludeEntityIds?: Array<number> | undefined
    }, 
    'config': {
        body: EntityConfigInput
    }, 
    'configList': {
        body: Array<EntityConfigInput>
    }
}
