import type { TableType } from '../enums';

export interface GenTableColumnView {
    
    columns: GenTableColumnView_TargetOf_columns[];
    
    comment: string;
    
    createdTime: string;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    schema: GenTableColumnView_TargetOf_schema;
    
    type: TableType;
}

export interface GenTableColumnView_TargetOf_columns {
    
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

export interface GenTableColumnView_TargetOf_schema {
    
    dataSource: GenTableColumnView_TargetOf_schema_TargetOf_dataSource;
    
    id: number;
}

export interface GenTableColumnView_TargetOf_schema_TargetOf_dataSource {
    
    id: number;
}
