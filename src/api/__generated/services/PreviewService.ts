import type {Executor} from '../';
import type {DataSourceType, GenLanguage} from '../model/enums/';
import type {Pair} from '../model/static/';

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
        _value = options.dataSourceType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'dataSourceType='
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
        _value = options.dataSourceType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'dataSourceType='
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
        _value = options.packagePath;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'packagePath='
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
        _value = options.dataSourceType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'dataSourceType='
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
}
export type PreviewServiceOptions = {
    'previewEntity': {
        entityIds: Array<number>, 
        dataSourceType?: DataSourceType | undefined, 
        language?: GenLanguage | undefined, 
        withPath?: boolean | undefined
    }, 
    'previewEnums': {
        enumIds: Array<number>, 
        dataSourceType?: DataSourceType | undefined, 
        language?: GenLanguage | undefined, 
        withPath?: boolean | undefined
    }, 
    'previewEntityByTable': {
        tableIds: Array<number>, 
        modelId?: number | undefined, 
        dataSourceType?: DataSourceType | undefined, 
        language?: GenLanguage | undefined, 
        packagePath?: string | undefined, 
        withPath?: boolean | undefined
    }, 
    'previewModelSql': {
        id: number
    }, 
    'previewModelEntity': {
        id: number, 
        withPath?: boolean | undefined
    }
}
