export interface GenColumnCommonView {
    
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
    
    overwriteByType: boolean;
    
    partOfPk: boolean;
    
    remark: string;
    
    tableId: number;
    
    type: string;
    
    typeCode: number;
    
    typeNotNull: boolean;
}
