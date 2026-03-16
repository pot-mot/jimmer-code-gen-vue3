import type {Executor} from '../';
import type {
    CrossTypeInput, 
    CrossTypeOrderInput, 
    CrossTypeUpdateInput, 
    CrossTypeView, 
    JvmTypeInput, 
    JvmTypeOrderInput, 
    JvmTypeUpdateInput, 
    JvmTypeView, 
    SqlTypeInput, 
    SqlTypeOrderInput, 
    SqlTypeUpdateInput, 
    SqlTypeView, 
    TsTypeInput, 
    TsTypeOrderInput, 
    TsTypeUpdateInput, 
    TsTypeView
} from '../model/static/';

export class TypeMappingService {
    
    constructor(private executor: Executor) {}
    
    readonly deleteCrossType: (options: TypeMappingServiceOptions['deleteCrossType']) => Promise<
        void
    > = async(options) => {
        let _uri = '/typeMapping/deleteCrossType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly deleteJvmType: (options: TypeMappingServiceOptions['deleteJvmType']) => Promise<
        void
    > = async(options) => {
        let _uri = '/typeMapping/deleteJvmType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly deleteSqlType: (options: TypeMappingServiceOptions['deleteSqlType']) => Promise<
        void
    > = async(options) => {
        let _uri = '/typeMapping/deleteSqlType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly deleteTsType: (options: TypeMappingServiceOptions['deleteTsType']) => Promise<
        void
    > = async(options) => {
        let _uri = '/typeMapping/deleteTsType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
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
    
    readonly updateCrossType: (options: TypeMappingServiceOptions['updateCrossType']) => Promise<
        void
    > = async(options) => {
        let _uri = '/typeMapping/updateCrossType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly updateCrossTypeOrder: (options: TypeMappingServiceOptions['updateCrossTypeOrder']) => Promise<
        void
    > = async(options) => {
        let _uri = '/typeMapping/updateCrossTypeOrder';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly updateJvmType: (options: TypeMappingServiceOptions['updateJvmType']) => Promise<
        void
    > = async(options) => {
        let _uri = '/typeMapping/updateJvmType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly updateJvmTypeOrder: (options: TypeMappingServiceOptions['updateJvmTypeOrder']) => Promise<
        void
    > = async(options) => {
        let _uri = '/typeMapping/updateJvmTypeOrder';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly updateSqlType: (options: TypeMappingServiceOptions['updateSqlType']) => Promise<
        void
    > = async(options) => {
        let _uri = '/typeMapping/updateSqlType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly updateSqlTypeOrder: (options: TypeMappingServiceOptions['updateSqlTypeOrder']) => Promise<
        void
    > = async(options) => {
        let _uri = '/typeMapping/updateSqlTypeOrder';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly updateTsType: (options: TypeMappingServiceOptions['updateTsType']) => Promise<
        void
    > = async(options) => {
        let _uri = '/typeMapping/updateTsType';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly updateTsTypeOrder: (options: TypeMappingServiceOptions['updateTsTypeOrder']) => Promise<
        void
    > = async(options) => {
        let _uri = '/typeMapping/updateTsTypeOrder';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
}

export type TypeMappingServiceOptions = {
    'listCrossType': {}, 
    'updateCrossType': {
        body: Array<CrossTypeUpdateInput>
    }, 
    'updateCrossTypeOrder': {
        body: Array<CrossTypeOrderInput>
    }, 
    'deleteCrossType': {
        body: Array<string>
    }, 
    'saveCrossType': {
        body: Array<CrossTypeInput>
    }, 
    'listJvmType': {}, 
    'updateJvmType': {
        body: Array<JvmTypeUpdateInput>
    }, 
    'updateJvmTypeOrder': {
        body: Array<JvmTypeOrderInput>
    }, 
    'deleteJvmType': {
        body: Array<string>
    }, 
    'saveJvmType': {
        body: Array<JvmTypeInput>
    }, 
    'listSqlType': {}, 
    'updateSqlType': {
        body: Array<SqlTypeUpdateInput>
    }, 
    'updateSqlTypeOrder': {
        body: Array<SqlTypeOrderInput>
    }, 
    'deleteSqlType': {
        body: Array<string>
    }, 
    'saveSqlType': {
        body: Array<SqlTypeInput>
    }, 
    'listTsType': {}, 
    'updateTsType': {
        body: Array<TsTypeUpdateInput>
    }, 
    'updateTsTypeOrder': {
        body: Array<TsTypeOrderInput>
    }, 
    'deleteTsType': {
        body: Array<string>
    }, 
    'saveTsType': {
        body: Array<TsTypeInput>
    }
}
