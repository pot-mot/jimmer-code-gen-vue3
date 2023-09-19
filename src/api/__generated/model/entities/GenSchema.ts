import type { GenDataSource, GenTable } from './';

export interface GenSchema {
    
    createdTime: string;
    
    modifiedTime: string;
    
    remark: string;
    
    id: number;
    
    dataSourceId: number;
    
    dataSource: GenDataSource;
    
    name: string;
    
    orderKey: number;
    
    tables: GenTable[];
}
