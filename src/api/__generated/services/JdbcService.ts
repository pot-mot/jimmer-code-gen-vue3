import type {Executor} from '../';

export class JdbcService {
    
    constructor(private executor: Executor) {}
    
    readonly listType: () => Promise<
        {[key:string]: number}
    > = async() => {
        let _uri = '/jdbc/type';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<{[key:string]: number}>;
    }
}

export type JdbcServiceOptions = {
    'listType': {}
}
