import type {Executor} from '../';
import type {GenerateType} from '../model/enums/';
import type {GenConfigProperties, GenerateResult} from '../model/static/';

export class GenerateService {
    
    constructor(private executor: Executor) {}
    
    /**
     * 生成模型
     * @parameter {GenerateServiceOptions['generateModel']} options
     * - id 模型ID
     * - types 生成类型，null 默认全部
     * - customTypes 自定义生成类型，null 默认全部
     * - properties 生成配置
     */
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
        if (_value !== undefined && _value !== null) {
            for (const _item of _value) {
                _uri += _separator
                _uri += 'types='
                _uri += encodeURIComponent(_item);
                _separator = '&';
            }
        }
        _value = options.customTypes;
        if (_value !== undefined && _value !== null) {
            for (const _item of _value) {
                _uri += _separator
                _uri += 'customTypes='
                _uri += encodeURIComponent(_item);
                _separator = '&';
            }
        }
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<GenerateResult>;
    }
    
    readonly listCustomGenerateType: () => Promise<
        Array<string>
    > = async() => {
        let _uri = '/generate/types';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<string>>;
    }
}

export type GenerateServiceOptions = {
    'listCustomGenerateType': {}, 
    'generateModel': {
        /**
         * 模型ID
         */
        id: number, 
        /**
         * 生成类型，null 默认全部
         */
        types?: Array<GenerateType> | undefined, 
        /**
         * 自定义生成类型，null 默认全部
         */
        customTypes?: Array<string> | undefined, 
        /**
         * 生成配置
         */
        properties?: GenConfigProperties | undefined
    }
}
