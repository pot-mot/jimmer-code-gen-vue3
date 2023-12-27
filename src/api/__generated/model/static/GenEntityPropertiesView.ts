import type { AssociationType, EnumType, GenerationType } from '../enums';

export interface GenEntityPropertiesView {
    
    author: string;
    
    comment: string;
    
    createdTime: string;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    packagePath: string;
    
    properties: Array<GenEntityPropertiesView_TargetOf_properties>;
    
    remark: string;
    
    table: GenEntityPropertiesView_TargetOf_table;
}

export interface GenEntityPropertiesView_TargetOf_properties {
    
    associationAnnotation?: string;
    
    associationType?: AssociationType;
    
    column?: GenEntityPropertiesView_TargetOf_properties_TargetOf_column_2;
    
    comment: string;
    
    createdTime: string;
    
    dissociateAnnotation?: string;
    
    entityId: number;
    
    enum?: GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2;
    
    id: number;
    
    idGenerationType?: GenerationType;
    
    idProperty: boolean;
    
    idView: boolean;
    
    idViewAnnotation?: string;
    
    keyProperty: boolean;
    
    listType: boolean;
    
    logicalDelete: boolean;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    otherAnnotation?: string;
    
    remark: string;
    
    type: string;
    
    typeNotNull: boolean;
    
    typeTable?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_column_2 {
    
    id: number;
    
    name: string;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2 {
    
    comment: string;
    
    enumType?: EnumType;
    
    id: number;
    
    items: Array<GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2_TargetOf_items_3>;
    
    name: string;
    
    packagePath: string;
    
    remark: string;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2_TargetOf_items_3 {
    
    comment: string;
    
    id: number;
    
    mappedValue: string;
    
    name: string;
    
    remark: string;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2 {
    
    entity?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2_TargetOf_entity_3;
    
    id: number;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2_TargetOf_entity_3 {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    packagePath: string;
}

export interface GenEntityPropertiesView_TargetOf_table {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    schema?: GenEntityPropertiesView_TargetOf_table_TargetOf_schema_2;
}

export interface GenEntityPropertiesView_TargetOf_table_TargetOf_schema_2 {
    
    id: number;
    
    name: string;
}
