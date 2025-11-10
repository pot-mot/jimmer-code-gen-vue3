import type {Executor} from '../';
import type {GenerateScriptInsertInput, GenerateScriptSaveInput, GenerateScriptView} from '../model/static/';

export class GenerateScriptService {
    
    constructor(private executor: Executor) {}
    
    readonly delete: (options: GenerateScriptServiceOptions['delete']) => Promise<
        number
    > = async(options) => {
        let _uri = '/generateScript/delete';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.scriptId;
        _uri += _separator
        _uri += 'scriptId='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<number>;
    }
    
    readonly get: (options: GenerateScriptServiceOptions['get']) => Promise<
        GenerateScriptView | undefined
    > = async(options) => {
        let _uri = '/generateScript/get';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.scriptId;
        _uri += _separator
        _uri += 'scriptId='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<GenerateScriptView | undefined>;
    }
    
    readonly insert: (options: GenerateScriptServiceOptions['insert']) => Promise<
        GenerateScriptView
    > = async(options) => {
        let _uri = '/generateScript/insert';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<GenerateScriptView>;
    }
    
    readonly list: () => Promise<
        Array<GenerateScriptView>
    > = async() => {
        let _uri = '/generateScript/list';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<GenerateScriptView>>;
    }
    
    readonly save: (options: GenerateScriptServiceOptions['save']) => Promise<
        GenerateScriptView
    > = async(options) => {
        let _uri = '/generateScript/save';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<GenerateScriptView>;
    }
}

export type GenerateScriptServiceOptions = {
    'list': {}, 
    'get': {
        scriptId: string
    }, 
    'insert': {
        body: GenerateScriptInsertInput
    }, 
    'save': {
        body: GenerateScriptSaveInput
    }, 
    'delete': {
        scriptId: string
    }
}
