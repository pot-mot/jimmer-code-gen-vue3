import type { AssociationType, DataSourceType, DissociateAction, TableType } from '../enums';

export interface GenTableAssociationsView {
    
    columns: Array<GenTableAssociationsView_TargetOf_columns>;
    
    comment: string;
    
    createdTime: string;
    
    entityId?: number;
    
    id: number;
    
    inAssociations: Array<GenTableAssociationsView_TargetOf_inAssociations>;
    
    indexes: Array<GenTableAssociationsView_TargetOf_indexes>;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    outAssociations: Array<GenTableAssociationsView_TargetOf_outAssociations>;
    
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
    
    id: number;
    
    logicalDelete: boolean;
    
    modifiedTime: string;
    
    name: string;
    
    numericPrecision: number;
    
    orderKey: number;
    
    partOfPk: boolean;
    
    remark: string;
    
    tableId: number;
    
    type: string;
    
    typeCode: number;
    
    typeNotNull: boolean;
}

export interface GenTableAssociationsView_TargetOf_inAssociations {
    
    associationType: AssociationType;
    
    columnReferences: Array<GenTableAssociationsView_TargetOf_inAssociations_TargetOf_columnReferences_2>;
    
    createdTime: string;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    sourceTable: GenTableAssociationsView_TargetOf_inAssociations_TargetOf_sourceTable_2;
}

export interface GenTableAssociationsView_TargetOf_inAssociations_TargetOf_columnReferences_2 {
    
    sourceColumn: GenTableAssociationsView_TargetOf_inAssociations_TargetOf_columnReferences_2_TargetOf_sourceColumn_3;
    
    targetColumnId: number;
}

export interface GenTableAssociationsView_TargetOf_inAssociations_TargetOf_columnReferences_2_TargetOf_sourceColumn_3 {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    type: string;
}

export interface GenTableAssociationsView_TargetOf_inAssociations_TargetOf_sourceTable_2 {
    
    comment: string;
    
    id: number;
    
    name: string;
}

export interface GenTableAssociationsView_TargetOf_indexes {
    
    columnIds: Array<number>;
    
    id: number;
    
    name: string;
    
    tableId: number;
    
    uniqueIndex: boolean;
}

export interface GenTableAssociationsView_TargetOf_outAssociations {
    
    associationType: AssociationType;
    
    columnReferences: Array<GenTableAssociationsView_TargetOf_outAssociations_TargetOf_columnReferences_2>;
    
    createdTime: string;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    targetTable: GenTableAssociationsView_TargetOf_outAssociations_TargetOf_targetTable_2;
}

export interface GenTableAssociationsView_TargetOf_outAssociations_TargetOf_columnReferences_2 {
    
    sourceColumnId: number;
    
    targetColumn: GenTableAssociationsView_TargetOf_outAssociations_TargetOf_columnReferences_2_TargetOf_targetColumn_3;
}

export interface GenTableAssociationsView_TargetOf_outAssociations_TargetOf_columnReferences_2_TargetOf_targetColumn_3 {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    type: string;
}

export interface GenTableAssociationsView_TargetOf_outAssociations_TargetOf_targetTable_2 {
    
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
