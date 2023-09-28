import type { AssociationType, TableType } from '../enums';

export interface GenTableAssociationView {
    
    columns: GenTableAssociationView_TargetOf_columns[];
    
    comment: string;
    
    createdTime: string;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    schemaId: number;
    
    type: TableType;
}

export interface GenTableAssociationView_TargetOf_columns {
    
    autoIncrement: boolean;
    
    comment: string;
    
    createdTime: string;
    
    defaultValue?: string;
    
    displaySize: number;
    
    fk: boolean;
    
    id: number;
    
    inAssociations: GenTableAssociationView_TargetOf_columns_TargetOf_inAssociations[];
    
    modifiedTime: string;
    
    name: string;
    
    notNull: boolean;
    
    numericPrecision: number;
    
    orderKey: number;
    
    outAssociations: GenTableAssociationView_TargetOf_columns_TargetOf_outAssociations[];
    
    pk: boolean;
    
    remark: string;
    
    tableId: number;
    
    type: string;
    
    typeCode: number;
    
    unique: boolean;
}

export interface GenTableAssociationView_TargetOf_columns_TargetOf_inAssociations {
    
    associationType?: AssociationType;
    
    id: number;
    
    sourceColumn: GenTableAssociationView_TargetOf_columns_TargetOf_inAssociations_TargetOf_sourceColumn;
}

export interface GenTableAssociationView_TargetOf_columns_TargetOf_inAssociations_TargetOf_sourceColumn {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    table: GenTableAssociationView_TargetOf_columns_TargetOf_inAssociations_TargetOf_sourceColumn_TargetOf_table;
}

export interface GenTableAssociationView_TargetOf_columns_TargetOf_inAssociations_TargetOf_sourceColumn_TargetOf_table {
    
    comment: string;
    
    id: number;
    
    name: string;
}

export interface GenTableAssociationView_TargetOf_columns_TargetOf_outAssociations {
    
    associationType?: AssociationType;
    
    id: number;
    
    targetColumn: GenTableAssociationView_TargetOf_columns_TargetOf_outAssociations_TargetOf_targetColumn;
}

export interface GenTableAssociationView_TargetOf_columns_TargetOf_outAssociations_TargetOf_targetColumn {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    table: GenTableAssociationView_TargetOf_columns_TargetOf_outAssociations_TargetOf_targetColumn_TargetOf_table;
}

export interface GenTableAssociationView_TargetOf_columns_TargetOf_outAssociations_TargetOf_targetColumn_TargetOf_table {
    
    comment: string;
    
    id: number;
    
    name: string;
}
