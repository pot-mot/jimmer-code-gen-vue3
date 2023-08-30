import type { GenAssociation, GenProperty, GenTable } from './';

export interface GenColumn {
    
    createdTime: string;
    
    modifiedTime: string;
    
    remark: string;
    
    id: number;
    
    propertyIds: number[];
    
    properties: GenProperty[];
    
    tableId?: number;
    
    table?: GenTable;
    
    orderKey: number;
    
    name: string;
    
    typeCode: number;
    
    type: string;
    
    displaySize: number;
    
    numericPrecision: number;
    
    defaultValue?: string;
    
    comment: string;
    
    isPk: boolean;
    
    isAutoIncrement: boolean;
    
    isFk: boolean;
    
    isUnique: boolean;
    
    isNotNull: boolean;
    
    inAssociations: GenAssociation[];
    
    outAssociations: GenAssociation[];
}
