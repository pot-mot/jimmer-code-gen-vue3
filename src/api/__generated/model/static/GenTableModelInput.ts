import type { TableType } from '../enums';

export interface GenTableModelInput {
    
    columns: Array<GenTableModelInput_TargetOf_columns>;
    
    comment: string;
    
    indexes: Array<GenTableModelInput_TargetOf_indexes>;
    
    modelId?: number;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    schema?: GenTableModelInput_TargetOf_schema;
    
    type: TableType;
}

export interface GenTableModelInput_TargetOf_columns {
    
    autoIncrement: boolean;
    
    businessKey: boolean;
    
    comment: string;
    
    defaultValue?: string;
    
    displaySize: number;
    
    enum?: GenTableModelInput_TargetOf_columns_TargetOf_enum_2;
    
    logicalDelete: boolean;
    
    name: string;
    
    numericPrecision: number;
    
    orderKey: number;
    
    overwriteByType: boolean;
    
    partOfPk: boolean;
    
    remark: string;
    
    type: string;
    
    typeCode: number;
    
    typeNotNull: boolean;
}

export interface GenTableModelInput_TargetOf_columns_TargetOf_enum_2 {
    
    name: string;
}

export interface GenTableModelInput_TargetOf_indexes {
    
    columns: Array<GenTableModelInput_TargetOf_indexes_TargetOf_columns_2>;
    
    name: string;
    
    uniqueIndex: boolean;
}

export interface GenTableModelInput_TargetOf_indexes_TargetOf_columns_2 {
    
    name: string;
}

export interface GenTableModelInput_TargetOf_schema {
    
    name: string;
}
