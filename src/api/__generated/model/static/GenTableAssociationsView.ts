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
    
    comment: string;
    
    createdTime: string;
    
    defaultValue?: string;
    
    displaySize: number;
    
    id: number;
    
    inAssociations: GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations[];
    
    modifiedTime: string;
    
    name: string;
    
    notNull: boolean;
    
    numericPrecision: number;
    
    orderKey: number;
    
    outAssociations: GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations[];
    
    partOfFk: boolean;
    
    partOfPk: boolean;
    
    partOfUniqueIdx: boolean;
    
    remark: string;
    
    tableId: number;
    
    type: string;
    
    typeCode: number;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations {
    
    associationType: AssociationType;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
    id: number;
    
    sourceColumn: GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations_TargetOf_sourceColumn;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations_TargetOf_sourceColumn {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    table: GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations_TargetOf_sourceColumn_TargetOf_table;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations_TargetOf_sourceColumn_TargetOf_table {
    
    comment: string;
    
    id: number;
    
    name: string;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations {
    
    associationType: AssociationType;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
    id: number;
    
    targetColumn: GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations_TargetOf_targetColumn;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations_TargetOf_targetColumn {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    table: GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations_TargetOf_targetColumn_TargetOf_table;
}

export interface GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations_TargetOf_targetColumn_TargetOf_table {
    
    comment: string;
    
    id: number;
    
    name: string;
}

export interface GenTableAssociationsView_TargetOf_schema {
    
    dataSource: GenTableAssociationsView_TargetOf_schema_TargetOf_dataSource;
    
    id: number;
    
    name: string;
}

export interface GenTableAssociationsView_TargetOf_schema_TargetOf_dataSource {
    
    id: number;
    
    name: string;
    
    type: DataSourceType;
}
