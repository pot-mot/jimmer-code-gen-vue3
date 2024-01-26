import type {Executor} from '../';
import type {GenConfigProperties, Pair} from '../model/static/';

export class PreviewService {
    
    constructor(private executor: Executor) {}
    
    async previewEntity(options: PreviewServiceOptions['previewEntity']): Promise<
        Array<Pair<string, string>>
    > {
        let _uri = '/preview/entity';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.entityIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'entityIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.withPath;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'withPath='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<Pair<string, string>>>;
    }
    
    async previewEntityByTable(options: PreviewServiceOptions['previewEntityByTable']): Promise<
        Array<Pair<string, string>>
    > {
        let _uri = '/preview/entity/byTable';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.tableIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'tableIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.modelId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'modelId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.withPath;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'withPath='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<Pair<string, string>>>;
    }
    
    async previewEnums(options: PreviewServiceOptions['previewEnums']): Promise<
        Array<Pair<string, string>>
    > {
        let _uri = '/preview/enum';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.enumIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'enumIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.withPath;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'withPath='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<Pair<string, string>>>;
    }
    
    async previewModelEntity(options: PreviewServiceOptions['previewModelEntity']): Promise<
        Array<Pair<string, string>>
    > {
        let _uri = '/preview/model/entity';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.withPath;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'withPath='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<Pair<string, string>>>;
    }
    
    async previewModelSql(options: PreviewServiceOptions['previewModelSql']): Promise<
        Array<Pair<string, string>>
    > {
        let _uri = '/preview/model/sql';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<Pair<string, string>>>;
    }
    
    async previewTableDefine(options: PreviewServiceOptions['previewTableDefine']): Promise<
        Array<Pair<string, string>>
    > {
        let _uri = '/preview/tableDefine';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.tableIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'tableIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<Pair<string, string>>>;
    }
}

export type PreviewServiceOptions = {
    'previewTableDefine': {
        tableIds: Array<number>, 
        properties?: GenConfigProperties | undefined
    }, 
    'previewEntity': {
        entityIds: Array<number>, 
        withPath?: boolean | undefined, 
        properties?: GenConfigProperties | undefined
    }, 
    'previewEnums': {
        enumIds: Array<number>, 
        withPath?: boolean | undefined, 
        properties?: GenConfigProperties | undefined
    }, 
    'previewEntityByTable': {
        tableIds: Array<number>, 
        modelId?: number | undefined, 
        withPath?: boolean | undefined, 
        properties?: GenConfigProperties | undefined
    }, 
    'previewModelSql': {
        id: number
    }, 
    'previewModelEntity': {
        id: number, 
        withPath?: boolean | undefined
    }
}
