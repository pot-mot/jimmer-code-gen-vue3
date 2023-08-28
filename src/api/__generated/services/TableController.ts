import type { Executor } from '../';
import type { ColumnQuery, GenColumnCommonView, GenTableColumnsView, TableQuery } from '../model/static';

export class TableController {
    
    constructor(private executor: Executor) {}
    
    async delete(options: TableControllerOptions['delete']): Promise<number> {
        let _uri = '/table/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async query(options: TableControllerOptions['query']): Promise<
        ReadonlyArray<GenTableColumnsView>
    > {
        let _uri = '/table/query';
        return (await this.executor({uri: _uri, method: 'GET', body: options.body})) as ReadonlyArray<GenTableColumnsView>
    }
    
    async queryColumns(options: TableControllerOptions['queryColumns']): Promise<
        ReadonlyArray<GenColumnCommonView>
    > {
        let _uri = '/table/column/query';
        return (await this.executor({uri: _uri, method: 'GET', body: options.body})) as ReadonlyArray<GenColumnCommonView>
    }
}

export type TableControllerOptions = {
    'delete': {readonly ids: ReadonlyArray<number>},
    'query': {readonly body: TableQuery},
    'queryColumns': {readonly body: ColumnQuery}
}