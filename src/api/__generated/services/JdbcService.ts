import type {Executor} from '../';

export class JdbcService {
    
    constructor(private executor: Executor) {}
    
    async listType(): Promise<
        {[key:string]: number}
    > {
        let _uri = '/jdbc/type';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<{[key:string]: number}>;
    }
}
export type JdbcServiceOptions = {
    'listType': {}
}
