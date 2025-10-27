import type {Executor} from '../';
import type {GenerateScriptInsertInput, GenerateScriptUpdateInput, GenerateScriptView} from '../model/static/';

export class GenerateScriptService {
    
    constructor(private executor: Executor) {}
    
    readonly insert: (options: GenerateScriptServiceOptions['insert']) => Promise<
        string
    > = async(options) => {
        let _uri = '/generateScript/insert';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.input.name;
        _uri += _separator
        _uri += 'name='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.input.type;
        _uri += _separator
        _uri += 'type='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.input.enabled;
        _uri += _separator
        _uri += 'enabled='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.input.databaseType;
        _uri += _separator
        _uri += 'databaseType='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.input.jvmLanguage;
        _uri += _separator
        _uri += 'jvmLanguage='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.input.scriptContent;
        _uri += _separator
        _uri += 'scriptContent='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<string>;
    }
    
    readonly list: () => Promise<
        Array<GenerateScriptView>
    > = async() => {
        let _uri = '/generateScript/list';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<GenerateScriptView>>;
    }
    
    readonly update: (options: GenerateScriptServiceOptions['update']) => Promise<
        string
    > = async(options) => {
        let _uri = '/generateScript/update';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.input.name;
        _uri += _separator
        _uri += 'name='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.input.type;
        _uri += _separator
        _uri += 'type='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.input.enabled;
        _uri += _separator
        _uri += 'enabled='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.input.databaseType;
        _uri += _separator
        _uri += 'databaseType='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.input.jvmLanguage;
        _uri += _separator
        _uri += 'jvmLanguage='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.input.scriptContent;
        _uri += _separator
        _uri += 'scriptContent='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.input.id;
        _uri += _separator
        _uri += 'id='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<string>;
    }
}

export type GenerateScriptServiceOptions = {
    'list': {}, 
    'insert': {
        input: GenerateScriptInsertInput
    }, 
    'update': {
        input: GenerateScriptUpdateInput
    }
}
