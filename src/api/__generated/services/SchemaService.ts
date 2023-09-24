import type { Executor } from '../';
import type { GenSchemaView } from '../model/static';

export class SchemaService {
    
    constructor(private executor: Executor) {}
    
    async delete(options: SchemaServiceOptions['delete']): Promise<number> {
        let _uri = '/schema/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async list(options: SchemaServiceOptions['list']): Promise<
        GenSchemaView[]
    > {
        let _uri = '/schema/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.dataSourceId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'dataSourceId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as GenSchemaView[]
    }
}

export type SchemaServiceOptions = {
    'delete': {ids: number[]},
    'list': {dataSourceId: number}
}