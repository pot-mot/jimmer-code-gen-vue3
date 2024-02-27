import type {Executor} from '../';
import type {
    AssociationColumnQuery, 
    AssociationQuery, 
    AssociationTableQuery, 
    GenAssociationInput, 
    GenAssociationView
} from '../model/static/';

export class AssociationService {
    
    constructor(private executor: Executor) {}
    
    readonly delete: (options: AssociationServiceOptions['delete']) => Promise<
        number
    > = async(options) => {
        let _uri = '/association/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<number>;
    }
    
    readonly query: (options: AssociationServiceOptions['query']) => Promise<
        Array<GenAssociationView>
    > = async(options) => {
        let _uri = '/association/query';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenAssociationView>>;
    }
    
    readonly queryByColumn: (options: AssociationServiceOptions['queryByColumn']) => Promise<
        Array<GenAssociationView>
    > = async(options) => {
        let _uri = '/association/queryByColumn';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenAssociationView>>;
    }
    
    readonly queryByTable: (options: AssociationServiceOptions['queryByTable']) => Promise<
        Array<GenAssociationView>
    > = async(options) => {
        let _uri = '/association/queryByTable';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenAssociationView>>;
    }
    
    readonly save: (options: AssociationServiceOptions['save']) => Promise<
        Array<number>
    > = async(options) => {
        let _uri = '/association/save';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<number>>;
    }
}

export type AssociationServiceOptions = {
    'query': {
        body: AssociationQuery
    }, 
    'queryByTable': {
        body: AssociationTableQuery
    }, 
    'queryByColumn': {
        body: AssociationColumnQuery
    }, 
    'save': {
        body: Array<GenAssociationInput>
    }, 
    'delete': {
        ids: Array<number>
    }
}
