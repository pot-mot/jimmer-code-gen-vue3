import type { Executor } from '../';
import type { GenLanguage } from '../model/enums';
import type { byte } from '../model/static';

export class GenerateService {
    
    constructor(private executor: Executor) {}
    
    async generateEntity(options: GenerateServiceOptions['generateEntity']): Promise<
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
    
    async generateEntityByTable(options: GenerateServiceOptions['generateEntityByTable']): Promise<
        Array<byte>
    > {
        let _uri = '/generate/entity/byTable';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.packagePath;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'packagePath='
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
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<byte>
    }
    
    async generateModel(options: GenerateServiceOptions['generateModel']): Promise<
        Array<byte>
    > {
        let _uri = '/generate/model';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<byte>
    }
    
    async generateModelEntity(options: GenerateServiceOptions['generateModelEntity']): Promise<
        Array<byte>
    > {
        let _uri = '/generate/model/entity';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<byte>
    }
    
    async generateModelSql(options: GenerateServiceOptions['generateModelSql']): Promise<
        Array<byte>
    > {
        let _uri = '/generate/model/sql';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<byte>
    }
}

export type GenerateServiceOptions = {
    'generateEntity': {body: Array<number>, language?: GenLanguage},
    'generateEntityByTable': {
        body: Array<number>, 
        packagePath?: string, 
        language?: GenLanguage
    },
    'generateModel': {body: number},
    'generateModelEntity': {body: number},
    'generateModelSql': {body: number}
}