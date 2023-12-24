import type { Executor } from '../';

export class JDBCService {
    
    constructor(private executor: Executor) {}
    
    async listType(): Promise<
        {[key:string]: number}
    > {
        let _uri = '/jdbc/type';
        return (await this.executor({uri: _uri, method: 'GET'})) as {[key:string]: number}
    }
}

export type JDBCServiceOptions = {
    'listType': {}
}