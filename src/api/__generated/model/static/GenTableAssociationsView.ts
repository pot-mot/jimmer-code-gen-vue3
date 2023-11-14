import type { AssociationType, DataSourceType, DissociateAction, TableType } from '../enums';

export interface GenTableAssociationsView {
    
    columns: GenTableAssociationsView_TargetOf_columns[];
    
    comment: string;
    
    createdTime: string;
    
    entityId?: number;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    schema?: GenTableAssociationsView_TargetOf_schema;
    
    type: TableType;
}

export interface GenTableAssociationsView_TargetOf_columns {
    
    autoIncrement: boolean;
    
    businessKey: boolean;
    
    comment: string;
    
    createdTime: string;
    
    defaultValue?: string;
    
    displaySize: number;
    
    enumId?: number;
    
    fullType: string;
    
    id: number;
    
    inAssociations: GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations_2[];
    
    logicalDelete: boolean;
    
    modifiedTime: string;
    
    name: string;
    
    numericPrecision: number;
    
    orderKey: number;
    
    outAssociations: GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations_2[];
    
    partOfFk: boolean;
    
    partOfPk: boolean;
    
    partOfUniqueIdx: boolean;
    
    remark: string;
    
    table: GenTableAssociationsView_TargetOf_columns_TargetOf_table_2;
    
    type: string;
    
    typeCode: number;
    
    typeNotNull: boolean;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations_2 {
    
    associationType: AssociationType;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
    id: number;
    
    sourceColumn: GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations_2_TargetOf_sourceColumn_3;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations_2_TargetOf_sourceColumn_3 {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    table: GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations_2_TargetOf_sourceColumn_3_TargetOf_table_4;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations_2_TargetOf_sourceColumn_3_TargetOf_table_4 {
    
    comment: string;
    
    id: number;
    
    name: string;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations_2 {
    
    associationType: AssociationType;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
    id: number;
    
    targetColumn: GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations_2_TargetOf_targetColumn_3;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations_2_TargetOf_targetColumn_3 {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    table: GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations_2_TargetOf_targetColumn_3_TargetOf_table_4;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations_2_TargetOf_targetColumn_3_TargetOf_table_4 {
    
    comment: string;
    
    id: number;
    
    name: string;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_table_2 {
    
    comment: string;
    
    id: number;
    
    name: string;
}

export interface GenTableAssociationsView_TargetOf_schema {
    
    dataSource: GenTableAssociationsView_TargetOf_schema_TargetOf_dataSource_2;
    
    id: number;
    
    name: string;
}

export interface GenTableAssociationsView_TargetOf_schema_TargetOf_dataSource_2 {
    
    id: number;
    
    name: string;
    
    type: DataSourceType;
}
