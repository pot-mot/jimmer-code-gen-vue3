import type {Executor} from '../';
import type {AssociationTableQuery, GenAssociationView} from '../model/static/';

export class AssociationService {
    
    constructor(private executor: Executor) {}
    
    readonly queryByTable: (options: AssociationServiceOptions['queryByTable']) => Promise<
        Array<GenAssociationView>
    > = async(options) => {
        let _uri = '/association/queryByTable';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenAssociationView>>;
    }
}

export type AssociationServiceOptions = {
    'queryByTable': {
        body: AssociationTableQuery
    }
}
