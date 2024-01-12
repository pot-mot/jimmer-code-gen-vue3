import type {Executor} from '../';
import type {
    GenTableAssociationsView, 
    GenTableColumnsView, 
    GenTableCommonView, 
    GenTableIdView, 
    TableQuery
} from '../model/static/';

export class TableService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: TableServiceOptions['delete']): Promise<
        number
    > {
        let _uri = '/table/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
    }
    
    async queryAssociationsView(options: TableServiceOptions['queryAssociationsView']): Promise<
        Array<GenTableAssociationsView>
    > {
        let _uri = '/table/query';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenTableAssociationsView>>;
    }
    
    async queryColumnsView(options: TableServiceOptions['queryColumnsView']): Promise<
        Array<GenTableColumnsView>
    > {
        let _uri = '/table/query/columns';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenTableColumnsView>>;
    }
    
    async queryCommonView(options: TableServiceOptions['queryCommonView']): Promise<
        Array<GenTableCommonView>
    > {
        let _uri = '/table/query/common';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenTableCommonView>>;
    }
    
    async queryIdView(options: TableServiceOptions['queryIdView']): Promise<
        Array<GenTableIdView>
    > {
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
    'queryAssociationsView': {
        body: TableQuery
    }, 
    'delete': {
        ids: Array<number>
    }
}
