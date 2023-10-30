import type { AssociationType, DataSourceType, DissociateAction, TableType } from '../enums';

export interface GenTableAssociationView {
    
    columns: GenTableAssociationView_TargetOf_columns[];
    
    comment: string;
    
    createdTime: string;
    
    entityId?: number;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
    
    schema?: GenTableAssociationView_TargetOf_schema;
    
    type: TableType;
}

export interface GenTableAssociationView_TargetOf_columns {
    
    autoIncrement: boolean;
    
    comment: string;
    
    createdTime: string;
    
    defaultValue?: string;
    
    displaySize: number;
    
    id: number;
    
    inAssociations: GenTableAssociationView_TargetOf_columns_TargetOf_inAssociations[];
    
    modifiedTime: string;
    
    name: string;
    
    notNull: boolean;
    
    numericPrecision: number;
    
    orderKey: number;
    
    outAssociations: GenTableAssociationView_TargetOf_columns_TargetOf_outAssociations[];
    
    partOfFk: boolean;
    
    partOfPk: boolean;
    
    partOfUniqueIdx: boolean;
    
    remark: string;
    
    tableId: number;
    
    type: string;
    
    typeCode: number;
}

export interface GenTableAssociationView_TargetOf_columns_TargetOf_inAssociations {
    
    associationType: AssociationType;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
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
    
    associationType: AssociationType;
    
    dissociateAction?: DissociateAction;
    
    fake: boolean;
    
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

export interface GenTableAssociationView_TargetOf_schema {
    
    dataSource: GenTableAssociationView_TargetOf_schema_TargetOf_dataSource;
    
    id: number;
    
    name: string;
}

export interface GenTableAssociationView_TargetOf_schema_TargetOf_dataSource {
    
    id: number;
    
    name: string;
    
    type: DataSourceType;
}
