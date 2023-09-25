export interface GenEntityConfigInput {

    add: boolean;

    author: string;

    classComment: string;

    className: string;

    edit: boolean;

    functionName: string;

    genPath: string;

    id?: number;

    list: boolean;

    moduleName: string;

    orderKey: number;

    packageName: string;

    properties: GenEntityConfigInput_TargetOf_properties[];

    query: boolean;

    remark: string;
}

export interface GenEntityConfigInput_TargetOf_properties {

    enumId?: number;

    id: boolean;

    idGenerationType: string;

    key: boolean;

    logicalDelete: boolean;

    name: string;

    propertyAnnotationExpression: string;

    propertyAssociationType: string;

    propertyComment: string;

    propertyType: string;

    remark: string;
}
