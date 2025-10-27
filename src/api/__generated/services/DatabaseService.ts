import type {Executor} from '../';
import type {
    DatabaseInsertInput, 
    DatabaseSpec, 
    DatabaseUpdateInput, 
    DatabaseView, 
    TableView
} from '../model/static/';

export class DatabaseService {
    
    constructor(private executor: Executor) {}
    
    readonly delete: (options: DatabaseServiceOptions['delete']) => Promise<
        number
    > = async(options) => {
        let _uri = '/database/delete';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.databaseId;
        _uri += _separator
        _uri += 'databaseId='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<number>;
    }
    
    readonly fetchTables: (options: DatabaseServiceOptions['fetchTables']) => Promise<
        Array<TableView>
    > = async(options) => {
        let _uri = '/database/fetchTables';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.databaseId;
        _uri += _separator
        _uri += 'databaseId='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<Array<TableView>>;
    }
    
    readonly insert: (options: DatabaseServiceOptions['insert']) => Promise<
        string
    > = async(options) => {
        let _uri = '/database/insert';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<string>;
    }
    
    readonly list: (options: DatabaseServiceOptions['list']) => Promise<
        Array<DatabaseView>
    > = async(options) => {
        let _uri = '/database/list';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Array<DatabaseView>>;
    }
    
    readonly refreshTables: (options: DatabaseServiceOptions['refreshTables']) => Promise<
        void
    > = async(options) => {
        let _uri = '/database/refreshTables';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.databaseId;
        _uri += _separator
        _uri += 'databaseId='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<void>;
    }
    
    readonly test: (options: DatabaseServiceOptions['test']) => Promise<
        boolean
    > = async(options) => {
        let _uri = '/database/test';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.databaseId;
        _uri += _separator
        _uri += 'databaseId='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<boolean>;
    }
    
    readonly update: (options: DatabaseServiceOptions['update']) => Promise<
        string
    > = async(options) => {
        let _uri = '/database/update';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<string>;
    }
}

export type DatabaseServiceOptions = {
    'list': {
        body: DatabaseSpec
    }, 
    'insert': {
        body: DatabaseInsertInput
    }, 
    'update': {
        body: DatabaseUpdateInput
    }, 
    'test': {
        databaseId: string
    }, 
    'fetchTables': {
        databaseId: string
    }, 
    'refreshTables': {
        databaseId: string
    }, 
    'delete': {
        databaseId: string
    }
}
