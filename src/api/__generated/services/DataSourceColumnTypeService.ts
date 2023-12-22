import type { Executor } from '../';
import type { DataSourceType } from '../model/enums';
import type { GenDataSourceColumnTypeInput, GenDataSourceColumnTypeView } from '../model/static';

export class DataSourceColumnTypeService {
    
    constructor(private executor: Executor) {}
    
    async get(options: DataSourceColumnTypeServiceOptions['get']): Promise<
        GenDataSourceColumnTypeView | undefined
    > {
        let _uri = '/dataSourceColumnType/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as GenDataSourceColumnTypeView | undefined
    }
    
    async list(options: DataSourceColumnTypeServiceOptions['list']): Promise<
        Array<GenDataSourceColumnTypeView>
    > {
        let _uri = '/dataSourceColumnType/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.dataSourceType;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'dataSourceType='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenDataSourceColumnTypeView>
    }
    
    async saveAll(options: DataSourceColumnTypeServiceOptions['saveAll']): Promise<
        Array<number>
    > {
        let _uri = '/dataSourceColumnType/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<number>
    }
}

export type DataSourceColumnTypeServiceOptions = {
    'get': {id: number},
    'list': {dataSourceType?: DataSourceType},
    'saveAll': {body: Array<GenDataSourceColumnTypeInput>}
}