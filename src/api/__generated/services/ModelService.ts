import type {Executor} from '../';
import type {
    ModelHistoryNoJsonView, 
    ModelHistoryView, 
    ModelInsertInput, 
    ModelNoJsonView, 
    ModelSpec, 
    ModelUpdateInput, 
    ModelView
} from '../model/static/';

export class ModelService {
    
    constructor(private executor: Executor) {}
    
    readonly delete: (options: ModelServiceOptions['delete']) => Promise<
        number
    > = async(options) => {
        let _uri = '/model/delete';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.modelId;
        _uri += _separator
        _uri += 'modelId='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<number>;
    }
    
    readonly deleteHistory: (options: ModelServiceOptions['deleteHistory']) => Promise<
        number
    > = async(options) => {
        let _uri = '/model/deleteHistory';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.modelHistoryId;
        _uri += _separator
        _uri += 'modelHistoryId='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<number>;
    }
    
    readonly fetchHistories: (options: ModelServiceOptions['fetchHistories']) => Promise<
        Array<ModelHistoryNoJsonView>
    > = async(options) => {
        let _uri = '/model/fetchHistories';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.modelId;
        _uri += _separator
        _uri += 'modelId='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<ModelHistoryNoJsonView>>;
    }
    
    readonly get: (options: ModelServiceOptions['get']) => Promise<
        ModelView | undefined
    > = async(options) => {
        let _uri = '/model/get';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.modelId;
        _uri += _separator
        _uri += 'modelId='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<ModelView | undefined>;
    }
    
    readonly getHistory: (options: ModelServiceOptions['getHistory']) => Promise<
        ModelHistoryView | undefined
    > = async(options) => {
        let _uri = '/model/getHistory';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.modelHistoryId;
        _uri += _separator
        _uri += 'modelHistoryId='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<ModelHistoryView | undefined>;
    }
    
    readonly insert: (options: ModelServiceOptions['insert']) => Promise<
        ModelNoJsonView
    > = async(options) => {
        let _uri = '/model/insert';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<ModelNoJsonView>;
    }
    
    readonly list: (options: ModelServiceOptions['list']) => Promise<
        Array<ModelNoJsonView>
    > = async(options) => {
        let _uri = '/model/list';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<ModelNoJsonView>>;
    }
    
    readonly update: (options: ModelServiceOptions['update']) => Promise<
        ModelNoJsonView
    > = async(options) => {
        let _uri = '/model/update';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<ModelNoJsonView>;
    }
}

export type ModelServiceOptions = {
    'list': {
        body: ModelSpec
    }, 
    'get': {
        modelId: string
    }, 
    'insert': {
        body: ModelInsertInput
    }, 
    'update': {
        body: ModelUpdateInput
    }, 
    'fetchHistories': {
        modelId: string
    }, 
    'getHistory': {
        modelHistoryId: string
    }, 
    'delete': {
        modelId: string
    }, 
    'deleteHistory': {
        modelHistoryId: string
    }
}
