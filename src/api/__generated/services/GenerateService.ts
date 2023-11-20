import type { Executor } from '../';
import type { GenLanguage } from '../model/enums';
import type { byte } from '../model/static';

export class GenerateService {
    
    constructor(private executor: Executor) {}
    
    async convert(options: GenerateServiceOptions['convert']): Promise<
        Array<number>
    > {
        let _uri = '/generate/convert';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<number>
    }
    
    async generate(options: GenerateServiceOptions['generate']): Promise<
        Array<byte>
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
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<byte>
    }
    
    async generateByModel(options: GenerateServiceOptions['generateByModel']): Promise<
        Array<byte>
    > {
        let _uri = '/generate/model';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.language;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'language='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<byte>
    }
    
    async generateByPackage(options: GenerateServiceOptions['generateByPackage']): Promise<
        Array<byte>
    > {
        let _uri = '/generate/package';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.language;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'language='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<byte>
    }
    
    async generateByTable(options: GenerateServiceOptions['generateByTable']): Promise<
        Array<byte>
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
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<byte>
    }
    
    async preview(options: GenerateServiceOptions['preview']): Promise<
        {[key:string]: string}
    > {
        let _uri = '/generate/preview';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.entityIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'entityIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.language;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'language='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as {[key:string]: string}
    }
    
    async previewByModel(options: GenerateServiceOptions['previewByModel']): Promise<
        {[key:string]: string}
    > {
        let _uri = '/generate/preview/model';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.modelId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'modelId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.language;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'language='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as {[key:string]: string}
    }
    
    async previewByTable(options: GenerateServiceOptions['previewByTable']): Promise<
        {[key:string]: string}
    > {
        let _uri = '/generate/preview/table';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.tableIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'tableIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.language;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'language='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST'})) as {[key:string]: string}
    }
}

export type GenerateServiceOptions = {
    'convert': {body: Array<number>},
    'generate': {body: Array<number>, language?: GenLanguage},
    'generateByModel': {body: number, language?: GenLanguage},
    'generateByPackage': {body: number, language?: GenLanguage},
    'generateByTable': {body: Array<number>, language?: GenLanguage},
    'preview': {entityIds: Array<number>, language?: GenLanguage},
    'previewByModel': {modelId: number, language?: GenLanguage},
    'previewByTable': {tableIds: Array<number>, language?: GenLanguage}
}