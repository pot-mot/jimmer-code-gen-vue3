import type {Executor} from '../';
import type {
    EnumQuery, 
    GenEnumItemsInput, 
    GenEnumItemsView, 
    GenEnumView
} from '../model/static/';

export class EnumService {
    
    constructor(private executor: Executor) {}
    
    async get(options: EnumServiceOptions['get']): Promise<
        GenEnumItemsView | undefined
    > {
        let _uri = '/enum/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<GenEnumItemsView | undefined>;
    }
    
    async query(options: EnumServiceOptions['query']): Promise<
        Array<GenEnumView>
    > {
        let _uri = '/enum/query';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.query.ids?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'ids='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.names?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'names='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenEnumView>>;
    }
    
    async save(options: EnumServiceOptions['save']): Promise<
        number
    > {
        let _uri = '/enum/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<number>;
    }
}
export type EnumServiceOptions = {
    'save': {
        body: GenEnumItemsInput
    }, 
    'get': {
        id: number
    }, 
    'query': {
        query: EnumQuery
    }
}
