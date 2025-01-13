import type {Executor} from '../';
import type {GenConfigProperties} from '../model/static/';

export class ConvertService {
    
    constructor(private executor: Executor) {}
    
    readonly convertModel: (options: ConvertServiceOptions['convertModel']) => Promise<
        Array<number>
    > = async(options) => {
        let _uri = '/convert/model';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.id;
        _uri += _separator
        _uri += 'id='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<number>>;
    }
}

export type ConvertServiceOptions = {
    'convertModel': {
        id: number, 
        body?: GenConfigProperties | undefined
    }
}
