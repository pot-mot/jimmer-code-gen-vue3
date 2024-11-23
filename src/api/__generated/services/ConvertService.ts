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
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<number>>;
    }
    
    readonly convertTable: (options: ConvertServiceOptions['convertTable']) => Promise<
        Array<number>
    > = async(options) => {
        let _uri = '/convert/table';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.modelId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'modelId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.keepNameComment;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'keepNameComment='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<number>>;
    }
}

export type ConvertServiceOptions = {
    'convertTable': {
        body: Array<number>, 
        modelId?: number | undefined, 
        properties?: GenConfigProperties | undefined, 
        keepNameComment?: boolean | undefined
    }, 
    'convertModel': {
        id: number, 
        properties?: GenConfigProperties | undefined
    }
}
