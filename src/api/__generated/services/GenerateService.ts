import type { Executor } from '../';
import type { GenLanguage } from '../model/enums';
import type { byte } from '../model/static';

export class GenerateService {
    
    constructor(private executor: Executor) {}
    
    async convert(options: GenerateServiceOptions['convert']): Promise<
        number[]
    > {
        let _uri = '/generate/convert';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as number[]
    }
    
    async generate(options: GenerateServiceOptions['generate']): Promise<
        byte[]
    > {
        let _uri = '/generate/entity';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.language;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'language='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as byte[]
    }
    
    async generateByTable(options: GenerateServiceOptions['generateByTable']): Promise<
        byte[]
    > {
        let _uri = '/generate/table';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.language;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'language='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as byte[]
    }
    
    async preview(options: GenerateServiceOptions['preview']): Promise<
        { [key: string]: string }
    > {
        let _uri = '/generate/preview/';
        _uri += encodeURIComponent(options.entityIds.join(','));
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.language;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'language='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as { [key: string]: string }
    }
}

export type GenerateServiceOptions = {
    'convert': {body: number[]},
    'generate': {body: number[], language?: GenLanguage},
    'generateByTable': {body: number[], language?: GenLanguage},
    'preview': {entityIds: number[], language?: GenLanguage}
}