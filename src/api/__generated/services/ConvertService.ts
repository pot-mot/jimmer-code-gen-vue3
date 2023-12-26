import type { Executor } from '../';
import type { GenLanguage } from '../model/enums';

export class ConvertService {
    
    constructor(private executor: Executor) {}
    
    async convert(options: ConvertServiceOptions['convert']): Promise<
        Array<number>
    > {
        let _uri = '/convert/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.packagePath;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'packagePath='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.language;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'language='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Array<number>
    }
}

export type ConvertServiceOptions = {
    'convert': {
        body: Array<number>, 
        packagePath?: string, 
        language?: GenLanguage
    }
}