import type {Executor} from '../';
import type {ColumnQuery, GenColumnCommonView} from '../model/static/';

export class ColumnService {
    
    constructor(private executor: Executor) {}
    
    readonly query: (options: ColumnServiceOptions['query']) => Promise<
        Array<GenColumnCommonView>
    > = async(options) => {
        let _uri = '/column/query';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<GenColumnCommonView>>;
    }
}

export type ColumnServiceOptions = {
    'query': {
        body: ColumnQuery
    }
}
