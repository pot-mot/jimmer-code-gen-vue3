import type {Executor} from '../';
import type {
    AssociationColumnQuery, 
    AssociationQuery, 
    AssociationTableQuery, 
    GenAssociationView
} from '../model/static/';

export class AssociationService {
    
    constructor(private executor: Executor) {}
    
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
    }
}
