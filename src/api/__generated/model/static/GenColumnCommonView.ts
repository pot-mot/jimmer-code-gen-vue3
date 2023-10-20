export interface GenColumnCommonView {
    
    autoIncrement: boolean;
    
    comment: string;
    
    createdTime: string;
    
    defaultValue?: string;
    
    displaySize: number;
    
    id: number;
    
    modifiedTime: string;
    
    name: string;
    
    notNull: boolean;
    
    numericPrecision: number;
    
    orderKey: number;
    
    partOfFk: boolean;
    
    partOfPk: boolean;
    
    partOfUniqueIdx: boolean;
    
    remark: string;
    
    tableId: number;
    
    type: string;
    
    typeCode: number;
}
