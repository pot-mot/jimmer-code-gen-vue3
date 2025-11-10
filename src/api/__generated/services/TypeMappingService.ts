import type {Executor} from '../';
import type {
    CrossTypeInput, 
    JvmTypeInput, 
    SqlTypeInput, 
    TsTypeInput
} from '../model/static/';

export class TypeMappingService {
    
    constructor(private executor: Executor) {}
    
    readonly listCrossType: () => Promise<
        Array<CrossTypeInput>
    > = async() => {
        let _uri = '/typeMapping/listCrossType';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<CrossTypeInput>>;
    }
    
    readonly listJvmType: () => Promise<
        Array<JvmTypeInput>
    > = async() => {
        let _uri = '/typeMapping/listJvmType';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<JvmTypeInput>>;
    }
    
    readonly listSqlType: () => Promise<
        Array<SqlTypeInput>
    > = async() => {
        let _uri = '/typeMapping/listSqlType';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<SqlTypeInput>>;
    }
    
    readonly listTsType: () => Promise<
        Array<TsTypeInput>
    > = async() => {
        let _uri = '/typeMapping/listTsType';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<TsTypeInput>>;
    }
    
    readonly saveCrossType: (options: TypeMappingServiceOptions['saveCrossType']) => Promise<
        Array<CrossTypeInput>
    > = async(options) => {
        let _uri = '/typeMapping/saveCrossType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<CrossTypeInput>>;
    }
    
    readonly saveJvmType: (options: TypeMappingServiceOptions['saveJvmType']) => Promise<
        Array<JvmTypeInput>
    > = async(options) => {
        let _uri = '/typeMapping/saveJvmType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<JvmTypeInput>>;
    }
    
    readonly saveSqlType: (options: TypeMappingServiceOptions['saveSqlType']) => Promise<
        Array<SqlTypeInput>
    > = async(options) => {
        let _uri = '/typeMapping/saveSqlType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<SqlTypeInput>>;
    }
    
    readonly saveTsType: (options: TypeMappingServiceOptions['saveTsType']) => Promise<
        Array<TsTypeInput>
    > = async(options) => {
        let _uri = '/typeMapping/saveTsType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<TsTypeInput>>;
    }
}

export type TypeMappingServiceOptions = {
    'listCrossType': {}, 
    'saveCrossType': {
        body: Array<CrossTypeInput>
    }, 
    'listJvmType': {}, 
    'saveJvmType': {
        body: Array<JvmTypeInput>
    }, 
    'listSqlType': {}, 
    'saveSqlType': {
        body: Array<SqlTypeInput>
    }, 
    'listTsType': {}, 
    'saveTsType': {
        body: Array<TsTypeInput>
    }
}
