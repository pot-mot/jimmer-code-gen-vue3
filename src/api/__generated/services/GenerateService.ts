import type {Executor} from '../';
import type {GenConfigProperties, GenerateResult, GenerateType} from '../model/static/';

export class GenerateService {
    
    constructor(private executor: Executor) {}
    
    readonly generateModel: (options: GenerateServiceOptions['generateModel']) => Promise<
        GenerateResult
    > = async(options) => {
        let _uri = '/generate/model';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.id;
        _uri += _separator
        _uri += 'id='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.types;
        for (const _item of _value) {
            _uri += _separator
            _uri += 'types='
            _uri += encodeURIComponent(_item);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<GenerateResult>;
    }
    
    readonly listGenerateType: () => Promise<
        Array<GenerateType>
    > = async() => {
        let _uri = '/generate/model';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<GenerateType>>;
    }
}

export type GenerateServiceOptions = {
    'listGenerateType': {}, 
    'generateModel': {
        id: number, 
        types: Array<GenerateType>, 
        properties?: GenConfigProperties | undefined
    }
}
