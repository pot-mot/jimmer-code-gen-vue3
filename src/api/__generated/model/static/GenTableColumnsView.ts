import type { DataSourceType, TableType } from '../enums';

export interface GenTableColumnsView {
    
    columns: GenTableColumnsView_TargetOf_columns[];
    
    comment: string;
    
    createdTime: string;
    
    entityId?: number;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    schema?: GenTableColumnsView_TargetOf_schema;
    
    type: TableType;
}

export interface GenTableColumnsView_TargetOf_columns {
    
    autoIncrement: boolean;
    
    comment: string;
    
    createdTime: string;
    
    defaultValue?: string;
    
    displaySize: number;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    notNull: boolean;
    
    numericPrecision: number;
    
    orderKey: number;
    
    partOfFk: boolean;
    
    partOfPk: boolean;
    
    partOfUniqueIdx: boolean;
    
    remark: string;
    
    tableId: number;
    
    type: string;
    
    typeCode: number;
}

export interface GenTableColumnsView_TargetOf_schema {
    
    dataSource: GenTableColumnsView_TargetOf_schema_TargetOf_dataSource;
    
    id: number;
    
    name: string;
}

export interface GenTableColumnsView_TargetOf_schema_TargetOf_dataSource {
    
    id: number;
    
    name: string;
    
    type: DataSourceType;
}