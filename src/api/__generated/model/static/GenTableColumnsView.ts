import type { TableType } from '../enums';

export interface GenTableColumnsView {
    
    columns: GenTableColumnsView_TargetOf_columns[];
    
    comment: string;
    
    createdTime: string;
    
    groupId?: number;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    schemaId: number;
    
    type: TableType;
}

export interface GenTableColumnsView_TargetOf_columns {
    
    autoIncrement: boolean;
    
    comment: string;
    
    createdTime: string;
    
    defaultValue?: string;
    
    displaySize: number;
    
    fk: boolean;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    notNull: boolean;
    
    numericPrecision: number;
    
    orderKey: number;
    
    pk: boolean;
    
    remark: string;
    
    tableId?: number;
    
    type: string;
    
    typeCode: number;
    
    unique: boolean;
}
