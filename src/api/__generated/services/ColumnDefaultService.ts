import type { Executor } from '../';
import type { DataSourceType } from '../model/enums';
import type { GenColumnDefaultInput, GenColumnDefaultView } from '../model/static';

export class ColumnDefaultService {
    
    constructor(private executor: Executor) {}
    
    async get(options: ColumnDefaultServiceOptions['get']): Promise<
        GenColumnDefaultView | undefined
    > {
        let _uri = '/columnDefault/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as GenColumnDefaultView | undefined
    }
    
    async list(options: ColumnDefaultServiceOptions['list']): Promise<
        Array<GenColumnDefaultView>
    > {
        let _uri = '/columnDefault/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.dataSourceType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'dataSourceType='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenColumnDefaultView>
    }
    
    async listDatabaseType(): Promise<
        {[key:string]: number}
    > {
        let _uri = '/columnDefault/type';
        return (await this.executor({uri: _uri, method: 'GET'})) as {[key:string]: number}
    }
    
    async saveAll(options: ColumnDefaultServiceOptions['saveAll']): Promise<
        Array<number>
    > {
        let _uri = '/columnDefault/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<number>
    }
}

export type ColumnDefaultServiceOptions = {
    'get': {id: number},
    'list': {dataSourceType?: DataSourceType},
    'listDatabaseType': {},
    'saveAll': {body: Array<GenColumnDefaultInput>}
}