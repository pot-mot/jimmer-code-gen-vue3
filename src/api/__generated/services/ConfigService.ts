import type { Executor } from '../';
import type { GenConfig, GenConfigProperties } from '../model/static';

export class ConfigService {
    
    constructor(private executor: Executor) {}
    
    async getConfig(): Promise<
        GenConfig
    > {
        let _uri = '/config/';
        return (await this.executor({uri: _uri, method: 'GET'})) as GenConfig
    }
    
    async setConfig(options: ConfigServiceOptions['setConfig']): Promise<void> {
        let _uri = '/config/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as void
    }
}

export type ConfigServiceOptions = {
    'getConfig': {},
    'setConfig': {body: GenConfigProperties}
}