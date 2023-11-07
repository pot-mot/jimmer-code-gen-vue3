import type { AssociationType, EnumType, GenerationType } from '../enums';

export interface GenEntityPropertiesView {
    
    author: string;
    
    comment: string;
    
    createdTime: string;
    
    genPackage?: GenEntityPropertiesView_TargetOf_genPackage;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    orderKey: number;
    
    properties: GenEntityPropertiesView_TargetOf_properties[];
    
    remark: string;
    
    table: GenEntityPropertiesView_TargetOf_table;
}

export interface GenEntityPropertiesView_TargetOf_genPackage {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_genPackage_TargetOf_parent_2;
}

export interface GenEntityPropertiesView_TargetOf_genPackage_TargetOf_parent_2 {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_genPackage_TargetOf_parent_2;
}

export interface GenEntityPropertiesView_TargetOf_properties {
    
    associationAnnotation?: string;
    
    associationType?: AssociationType;
    
    columnId?: number;
    
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
    
    otherAnnotation?: string;
    
    remark: string;
    
    type: string;
    
    typeNotNull: boolean;
    
    typeTable?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2 {
    
    comment: string;
    
    enumType?: EnumType;
    
    genPackage?: GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2_TargetOf_genPackage_3;
    
    id: number;
    
    items: GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2_TargetOf_items_3[];
    
    name: string;
    
    remark: string;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2_TargetOf_genPackage_3 {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2_TargetOf_genPackage_3_TargetOf_parent_4;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2_TargetOf_genPackage_3_TargetOf_parent_4 {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2_TargetOf_genPackage_3_TargetOf_parent_4;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2_TargetOf_items_3 {
    
    comment: string;
    
    id: number;
    
    name: string;
    
    remark: string;
    
    value: string;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2 {
    
    entity?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2_TargetOf_entity_3;
    
    id: number;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2_TargetOf_entity_3 {
    
    comment: string;
    
    genPackage?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2_TargetOf_entity_3_TargetOf_genPackage_4;
    
    id: number;
    
    name: string;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2_TargetOf_entity_3_TargetOf_genPackage_4 {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2_TargetOf_entity_3_TargetOf_genPackage_4_TargetOf_parent_5;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2_TargetOf_entity_3_TargetOf_genPackage_4_TargetOf_parent_5 {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_2_TargetOf_entity_3_TargetOf_genPackage_4_TargetOf_parent_5;
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
