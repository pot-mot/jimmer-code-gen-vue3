import type {Executor} from '../';
import type {GenConfig, GenConfigProperties} from '../model/static/';

export class ConfigService {
    
    constructor(private executor: Executor) {}
    
    readonly getConfig: () => Promise<
        GenConfig
    > = async() => {
        let _uri = '/config';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenConfig>;
    }
    
    readonly setConfig: (options: ConfigServiceOptions['setConfig']) => Promise<
        void
    > = async(options) => {
        let _uri = '/config';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<void>;
    }
}

export type ConfigServiceOptions = {
    'getConfig': {}, 
    'setConfig': {
        body: GenConfigProperties
    }
}
