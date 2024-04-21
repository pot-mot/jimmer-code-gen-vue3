import type {Executor} from '../';
import type {GenConfigProperties, Pair} from '../model/static/';

export class GenerateService {
    
    constructor(private executor: Executor) {}
    
    readonly generateEntity: (options: GenerateServiceOptions['generateEntity']) => Promise<
        Array<Pair<string, string>>
    > = async(options) => {
        let _uri = '/preview/entity';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.entityIds.join(',');
        _uri += _separator
        _uri += 'entityIds='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.withPath;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'withPath='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<Pair<string, string>>>;
    }
    
    readonly generateEnums: (options: GenerateServiceOptions['generateEnums']) => Promise<
        Array<Pair<string, string>>
    > = async(options) => {
        let _uri = '/preview/enum';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.enumIds.join(',');
        _uri += _separator
        _uri += 'enumIds='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.withPath;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'withPath='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<Pair<string, string>>>;
    }
    
    readonly generateModelEntity: (options: GenerateServiceOptions['generateModelEntity']) => Promise<
        Array<Pair<string, string>>
    > = async(options) => {
        let _uri = '/preview/model/entity';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.id;
        _uri += _separator
        _uri += 'id='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.withPath;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'withPath='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<Pair<string, string>>>;
    }
    
    readonly generateModelSql: (options: GenerateServiceOptions['generateModelSql']) => Promise<
        Array<Pair<string, string>>
    > = async(options) => {
        let _uri = '/preview/model/sql';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.id;
        _uri += _separator
        _uri += 'id='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<Pair<string, string>>>;
    }
    
    readonly generateTableDefine: (options: GenerateServiceOptions['generateTableDefine']) => Promise<
        Array<Pair<string, string>>
    > = async(options) => {
        let _uri = '/preview/tableDefine';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.tableIds.join(',');
        _uri += _separator
        _uri += 'tableIds='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<Pair<string, string>>>;
    }
}

export type GenerateServiceOptions = {
    'generateTableDefine': {
        tableIds: Array<number>, 
        properties?: GenConfigProperties | undefined
    }, 
    'generateEntity': {
        entityIds: Array<number>, 
        withPath?: boolean | undefined, 
        properties?: GenConfigProperties | undefined
    }, 
    'generateEnums': {
        enumIds: Array<number>, 
        withPath?: boolean | undefined, 
        properties?: GenConfigProperties | undefined
    }, 
    'generateModelSql': {
        id: number
    }, 
    'generateModelEntity': {
        id: number, 
        withPath?: boolean | undefined
    }
}
