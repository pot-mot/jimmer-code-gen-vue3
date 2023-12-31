import type { DataSourceType, EnumType, GenLanguage } from '../enums';

export interface GenModelInput {
    
    dataSourceType: DataSourceType;
    
    enums: Array<GenModelInput_TargetOf_enums>;
    
    graphData?: string;
    
    id?: number;
    
    language: GenLanguage;
    
    name: string;
    
    packagePath: string;
    
    remark: string;
    
    syncConvertEntity: boolean;
}

export interface GenModelInput_TargetOf_enums {
    
    comment: string;
    
    enumType?: EnumType;
    
    items: Array<GenModelInput_TargetOf_enums_TargetOf_items_2>;
    
    modelId?: number;
    
    name: string;
    
    orderKey: number;
    
    packagePath: string;
    
    remark: string;
}

export interface GenModelInput_TargetOf_enums_TargetOf_items_2 {
    
    comment: string;
    
    mappedValue: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
}
