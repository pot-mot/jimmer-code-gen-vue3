import type { Executor } from '../';
import type { GenPackageInput, GenPackageTreeView } from '../model/static';

export class PackageService {
    
    constructor(private executor: Executor) {}
    
    async create(options: PackageServiceOptions['create']): Promise<number | undefined> {
        let _uri = '/package/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.path;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'path='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.parentId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'parentId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'POST'})) as number | undefined
    }
    
    async delete(options: PackageServiceOptions['delete']): Promise<number> {
        let _uri = '/package/';
        _uri += encodeURIComponent(options.ids.join(','));
        return (await this.executor({uri: _uri, method: 'DELETE'})) as number
    }
    
    async list(): Promise<
        Array<GenPackageTreeView>
    > {
        let _uri = '/package/';
        return (await this.executor({uri: _uri, method: 'GET'})) as Array<GenPackageTreeView>
    }
    
    async moveEntity(options: PackageServiceOptions['moveEntity']): Promise<number> {
        let _uri = '/package/';
        _uri += encodeURIComponent(options.packageId);
        _uri += '/entity/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'PUT'})) as number
    }
    
    async moveEnum(options: PackageServiceOptions['moveEnum']): Promise<number> {
        let _uri = '/package/';
        _uri += encodeURIComponent(options.packageId);
        _uri += '/enum/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'PUT'})) as number
    }
    
    async movePackage(options: PackageServiceOptions['movePackage']): Promise<number> {
        let _uri = '/package/';
        _uri += encodeURIComponent(options.packageId);
        _uri += '/package/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'PUT'})) as number
    }
    
    async update(options: PackageServiceOptions['update']): Promise<number> {
        let _uri = '/package/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as number
    }
}

export type PackageServiceOptions = {
    'create': {path: string, parentId?: number},
    'delete': {ids: Array<number>},
    'list': {},
    'moveEntity': {id: number, packageId: number},
    'moveEnum': {id: number, packageId: number},
    'movePackage': {id: number, packageId: number},
    'update': {body: GenPackageInput}
}