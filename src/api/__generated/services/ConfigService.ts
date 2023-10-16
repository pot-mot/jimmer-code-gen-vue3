import type { Executor } from '../';
import type { GenConfigProperties, GenConfig_Companion } from '../model/static';

export class ConfigService {
    
    constructor(private executor: Executor) {}
    
    async getConfig(): Promise<
        GenConfig_Companion
    > {
        let _uri = '/service/';
        return (await this.executor({uri: _uri, method: 'GET'})) as GenConfig_Companion
    }
    
    async setConfig(options: ConfigServiceOptions['setConfig']): Promise<void> {
        let _uri = '/service/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as void
    }
}

export type ConfigServiceOptions = {
    'getConfig': {},
    'setConfig': {body: GenConfigProperties}
}