import type {Executor} from '../';
import type {GenerateType, ViewType} from '../model/enums/';
import type {GenConfigProperties, GenerateFile} from '../model/static/';

export class GenerateService {
    
    constructor(private executor: Executor) {}
    
    readonly generateModel: (options: GenerateServiceOptions['generateModel']) => Promise<
        Array<GenerateFile>
    > = async(options) => {
        let _uri = '/preview/model';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.id;
        _uri += _separator
        _uri += 'id='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.types.join(',');
        _uri += _separator
        _uri += 'types='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.viewType;
        _uri += _separator
        _uri += 'viewType='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<GenerateFile>>;
    }
}

export type GenerateServiceOptions = {
    'generateModel': {
        id: number, 
        types: Array<GenerateType>, 
        viewType: ViewType, 
        properties?: GenConfigProperties | undefined
    }
}
