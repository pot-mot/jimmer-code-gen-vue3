import type {Executor} from '../';
import type {
    GenTableColumnsView, 
    GenTableCommonView, 
    GenTableIdView, 
    TableQuery
} from '../model/static/';

export class TableService {
    
    constructor(private executor: Executor) {}
    
    readonly delete: (options: TableServiceOptions['delete']) => Promise<
        number
    > = async(options) => {
        let _uri = '/table/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
    }
    
    readonly queryColumnsView: (options: TableServiceOptions['queryColumnsView']) => Promise<
        Array<GenTableColumnsView>
    > = async(options) => {
        let _uri = '/table/query/columns';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenTableColumnsView>>;
    }
    
    readonly queryCommonView: (options: TableServiceOptions['queryCommonView']) => Promise<
        Array<GenTableCommonView>
    > = async(options) => {
        let _uri = '/table/query/common';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenTableCommonView>>;
    }
    
    readonly queryIdView: (options: TableServiceOptions['queryIdView']) => Promise<
        Array<GenTableIdView>
    > = async(options) => {
        let _uri = '/table/query/id';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenTableIdView>>;
    }
}

export type TableServiceOptions = {
    'queryIdView': {
        body: TableQuery
    }, 
    'queryCommonView': {
        body: TableQuery
    }, 
    'queryColumnsView': {
        body: TableQuery
    }, 
    'delete': {
        ids: Array<number>
    }
}
