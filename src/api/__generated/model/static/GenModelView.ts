import type { DataSourceType, EnumType, GenLanguage } from '../enums';

export interface GenModelView {
    
    createdTime: string;
    
    dataSourceType: DataSourceType;
    
    enums: Array<GenModelView_TargetOf_enums>;
    
    graphData: string;
    
    id: number;
    
    language: GenLanguage;
    
    modifiedTime: string;
    
    name: string;
    
    packagePath: string;
    
    remark: string;
    
    syncConvertEntity: boolean;
}

export interface GenModelView_TargetOf_enums {
    
    comment: string;
    
    enumType?: EnumType;
    
    items: Array<GenModelView_TargetOf_enums_TargetOf_items_2>;
    
    modelId?: number;
    
    name: string;
    
    orderKey: number;
    
    packagePath: string;
    
    remark: string;
}

export interface GenModelView_TargetOf_enums_TargetOf_items_2 {
    
    comment: string;
    
    mappedValue: string;
    
    name: string;
    
    orderKey: number;
    
    remark: string;
}
