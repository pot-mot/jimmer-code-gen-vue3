import type {Executor} from '../';
import type {GenConfigProperties} from '../model/static/';

export class ConvertService {
    
    constructor(private executor: Executor) {}
    
    async convert(options: ConvertServiceOptions['convert']): Promise<
        Array<number>
    > {
        let _uri = '/convert/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.modelId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'modelId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<number>>;
    }
}
export type ConvertServiceOptions = {
    'convert': {
        body: Array<number>, 
        modelId?: number | undefined, 
        properties?: GenConfigProperties | undefined
    }
}
