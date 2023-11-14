import type { TableType } from '../enums';

export interface GenTableColumnsInput {
    
    columns: GenTableColumnsInput_TargetOf_columns[];
    
    comment: string;
    
    id?: number;
    
    modelId?: number;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    schema?: GenTableColumnsInput_TargetOf_schema;
    
    type: TableType;
}

export interface GenTableColumnsInput_TargetOf_columns {
    
    autoIncrement: boolean;
    
    businessKey: boolean;
    
    comment: string;
    
    defaultValue?: string;
    
    displaySize: number;
    
    enumId?: number;
    
    id?: number;
    
    logicalDelete: boolean;
    
    name: string;
    
    numericPrecision: number;
    
    orderKey: number;
    
    partOfFk: boolean;
    
    partOfPk: boolean;
    
    partOfUniqueIdx: boolean;
    
    remark: string;
    
    type: string;
    
    typeCode: number;
    
    typeNotNull: boolean;
}

export interface GenTableColumnsInput_TargetOf_schema {
    
    id?: number;
    
    name: string;
}
