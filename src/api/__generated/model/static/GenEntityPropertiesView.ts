import type { AssociationType, GenerationType } from '../enums';

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
    
    tableId: number;
}

export interface GenEntityPropertiesView_TargetOf_genPackage {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_genPackage_TargetOf_parent;
}

export interface GenEntityPropertiesView_TargetOf_genPackage_TargetOf_parent {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_genPackage_TargetOf_parent;
}

export interface GenEntityPropertiesView_TargetOf_properties {
    
    associationAnnotation?: string;
    
    associationType?: AssociationType;
    
    columnId?: number;
    
    comment: string;
    
    createdTime: string;
    
    dissociateAnnotation?: string;
    
    entityId: number;
    
    enum?: GenEntityPropertiesView_TargetOf_properties_TargetOf_enum;
    
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
    
    notNull: boolean;
    
    otherAnnotation?: string;
    
    remark: string;
    
    type: string;
    
    typeTable?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_enum {
    
    comment: string;
    
    genPackage?: GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_TargetOf_genPackage;
    
    id: number;
    
    name: string;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_TargetOf_genPackage {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_TargetOf_genPackage_TargetOf_parent;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_TargetOf_genPackage_TargetOf_parent {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_TargetOf_genPackage_TargetOf_parent;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable {
    
    entity?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_TargetOf_entity;
    
    id: number;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_TargetOf_entity {
    
    comment: string;
    
    genPackage?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_TargetOf_entity_TargetOf_genPackage;
    
    id: number;
    
    name: string;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_TargetOf_entity_TargetOf_genPackage {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_TargetOf_entity_TargetOf_genPackage_TargetOf_parent;
}

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_TargetOf_entity_TargetOf_genPackage_TargetOf_parent {
    
    id: number;
    
    name: string;
    
    parent?: GenEntityPropertiesView_TargetOf_properties_TargetOf_typeTable_TargetOf_entity_TargetOf_genPackage_TargetOf_parent;
}
