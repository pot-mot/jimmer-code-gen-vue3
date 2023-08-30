import type { Executor } from '../';
import type { AssociationQuery, GenAssociationCommonInput, GenAssociationCommonView, GenAssociationPreviewView } from '../model/static';

export class AssociationController {
    
    constructor(private executor: Executor) {}
    
    async delete(options: AssociationControllerOptions['delete']): Promise<number> {
        let _uri = '/association/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async query(options: AssociationControllerOptions['query']): Promise<
        ReadonlyArray<GenAssociationCommonView>
    > {
        let _uri = '/association/query';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as ReadonlyArray<GenAssociationCommonView>
    }
    
    async save(options: AssociationControllerOptions['save']): Promise<
        ReadonlyArray<GenAssociationCommonView>
    > {
        let _uri = '/association/save';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as ReadonlyArray<GenAssociationCommonView>
    }
    
    async select(options: AssociationControllerOptions['select']): Promise<
        ReadonlyArray<GenAssociationPreviewView>
    > {
        let _uri = '/association/select';
        return (await this.executor({uri: _uri, method: 'GET', body: options.body})) as ReadonlyArray<GenAssociationPreviewView>
    }
}

export type AssociationControllerOptions = {
    'delete': {readonly ids: ReadonlyArray<number>},
    'query': {readonly body: AssociationQuery},
    'save': {readonly body: ReadonlyArray<GenAssociationCommonInput>},
    'select': {readonly body: ReadonlyArray<number>}
}