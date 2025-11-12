import type {Executor} from '../';
import type {
    CrossTypeInput, 
    CrossTypeView, 
    JvmTypeInput, 
    JvmTypeView, 
    SqlTypeInput, 
    SqlTypeView, 
    TsTypeInput, 
    TsTypeView
} from '../model/static/';

export class TypeMappingService {
    
    constructor(private executor: Executor) {}
    
    readonly listCrossType: () => Promise<
        Array<CrossTypeView>
    > = async() => {
        let _uri = '/typeMapping/listCrossType';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<CrossTypeView>>;
    }
    
    readonly listJvmType: () => Promise<
        Array<JvmTypeView>
    > = async() => {
        let _uri = '/typeMapping/listJvmType';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<JvmTypeView>>;
    }
    
    readonly listSqlType: () => Promise<
        Array<SqlTypeView>
    > = async() => {
        let _uri = '/typeMapping/listSqlType';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<SqlTypeView>>;
    }
    
    readonly listTsType: () => Promise<
        Array<TsTypeView>
    > = async() => {
        let _uri = '/typeMapping/listTsType';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<TsTypeView>>;
    }
    
    readonly saveCrossType: (options: TypeMappingServiceOptions['saveCrossType']) => Promise<
        Array<CrossTypeView>
    > = async(options) => {
        let _uri = '/typeMapping/saveCrossType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<CrossTypeView>>;
    }
    
    readonly saveJvmType: (options: TypeMappingServiceOptions['saveJvmType']) => Promise<
        Array<JvmTypeView>
    > = async(options) => {
        let _uri = '/typeMapping/saveJvmType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<JvmTypeView>>;
    }
    
    readonly saveSqlType: (options: TypeMappingServiceOptions['saveSqlType']) => Promise<
        Array<SqlTypeView>
    > = async(options) => {
        let _uri = '/typeMapping/saveSqlType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<SqlTypeView>>;
    }
    
    readonly saveTsType: (options: TypeMappingServiceOptions['saveTsType']) => Promise<
        Array<TsTypeView>
    > = async(options) => {
        let _uri = '/typeMapping/saveTsType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<TsTypeView>>;
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
