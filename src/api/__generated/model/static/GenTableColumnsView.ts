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
    
    businessKey: boolean;
    
    comment: string;
    
    createdTime: string;
    
    defaultValue?: string;
    
    displaySize: number;
    
    enumId?: number;
    
    id: number;
    
    logicalDelete: boolean;
    
    modifiedTime: string;
    
    name: string;
    
    numericPrecision: number;
    
    orderKey: number;
    
    partOfFk: boolean;
    
    partOfPk: boolean;
    
    partOfUniqueIdx: boolean;
    
    remark: string;
    
    tableId: number;
    
    type: string;
    
    typeCode: number;
    
    typeNotNull: boolean;
}

export interface GenTableColumnsView_TargetOf_schema {
    
    dataSource: GenTableColumnsView_TargetOf_schema_TargetOf_dataSource_2;
    
    id: number;
    
    name: string;
}

export interface GenTableColumnsView_TargetOf_schema_TargetOf_dataSource_2 {
    
    id: number;
    
    name: string;
    
    type: DataSourceType;
}
