import type { DataSourceType, TableType } from '../enums';

export interface GenTableColumnsView {
    
    columns: Array<GenTableColumnsView_TargetOf_columns>;
    
    comment: string;
    
    createdTime: string;
    
    entityId?: number;
    
    id: number;
    
    indexes: Array<GenTableColumnsView_TargetOf_indexes>;
    
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
    
    enum?: GenTableColumnsView_TargetOf_columns_TargetOf_enum_2;
    
    id: number;
    
    logicalDelete: boolean;
    
    modifiedTime: string;
    
    name: string;
    
    numericPrecision: number;
    
    orderKey: number;
    
    overwriteByType: boolean;
    
    partOfPk: boolean;
    
    remark: string;
    
    tableId: number;
    
    type: string;
    
    typeCode: number;
    
    typeNotNull: boolean;
}

export interface GenTableColumnsView_TargetOf_columns_TargetOf_enum_2 {
    
    id: number;
    
    name: string;
}

export interface GenTableColumnsView_TargetOf_indexes {
    
    columnIds: Array<number>;
    
    id: number;
    
    name: string;
    
    tableId: number;
    
    uniqueIndex: boolean;
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
