import type {Executor} from '../';
import type {GenEnumItemsView} from '../model/static/';

export class EnumService {
    
    constructor(private executor: Executor) {}
    
    readonly get: (options: EnumServiceOptions['get']) => Promise<
        GenEnumItemsView | undefined
    > = async(options) => {
        let _uri = '/enum/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenEnumItemsView | undefined>;
    }
}

export type EnumServiceOptions = {
    'get': {
        id: number
    }
}
