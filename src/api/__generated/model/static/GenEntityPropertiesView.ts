export interface GenEntityPropertiesView {

    add: boolean;

    author: string;

    classComment: string;

    className: string;

    createdTime: string;

    edit: boolean;

    functionName: string;

    genPath: string;

    id: number;

    list: boolean;

    modifiedTime: string;

    moduleName: string;

    orderKey: number;

    packageName: string;

    properties: GenEntityPropertiesView_TargetOf_properties[];

    query: boolean;

    remark: string;

    tableId?: number;
}

export interface GenEntityPropertiesView_TargetOf_properties {

    columnId?: number;

    createdTime: string;

    entityId: number;

    enumId?: number;

    id: boolean;

    idGenerationType: string;

    key: boolean;

    logicalDelete: boolean;

    modifiedTime: string;

    name: string;

    propertyAnnotationExpression: string;

    propertyAssociationType: string;

    propertyComment: string;

    propertyType: string;

    remark: string;
}
