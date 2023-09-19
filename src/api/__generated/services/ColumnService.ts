import type {Executor} from '../';
import type {ColumnQuery, GenColumnCommonView} from '../model/static';

export class ColumnService {

    constructor(private executor: Executor) {
    }

    async query(options: ColumnServiceOptions['query']): Promise<
        ReadonlyArray<GenColumnCommonView>
    > {
        let _uri = '/column/query';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.query.ids?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'ids='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.keywords?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'keywords='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.query.tableIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'tableIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<GenColumnCommonView>
    }
}

export type ColumnServiceOptions = {
    'query': { readonly query: ColumnQuery }
}