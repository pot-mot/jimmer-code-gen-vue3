export type JavaAnnotationParameter = {
    name: string;
    rawValue: string;
};

export type JavaAnnotation = {
    raw: string;
    name: string;
    parameters: JavaAnnotationParameter[];
};

export type JavaTypeParameterAdditionalBound = {
    raw: string;
    typeName: string;
    typeArguments: JavaTypeArgument[];
};

export type JavaTypeParameterBound = {
    raw: string;
    typeName: string;
    typeArguments: JavaTypeArgument[];
    additionalBounds: JavaTypeParameterAdditionalBound[];
};

export type JavaTypeParameter = {
    raw: string;
    typeName: string;
    modifiers: string[];
    annotations: JavaAnnotation[];
    bound: JavaTypeParameterBound | undefined;
};

export type JavaWildcardBound = {
    kind: 'extends' | 'super';
    type: JavaType;
};

export type JavaTypeArgument =
    | {
          raw: string;
          kind: 'type';
          typeName: string;
          isArray: boolean;
          arrayDimensions?: number;
          typeArguments: JavaTypeArgument[];
      }
    | {
          raw: string;
          kind: 'wildcard';
          wildcardBound?: JavaWildcardBound;
          annotations: JavaAnnotation[];
      };

export type JavaType = {
    raw: string;
    name: string;
    isArray: boolean;
    arrayDimensions?: number;
    typeArguments: JavaTypeArgument[];
};

export type JavaImport = {
    path: string;
    isStatic: boolean;
    isOnDemand: boolean;
    member?: string;
    raw: string;
};

export type JavaField = {
    name: string;
    comments: string[];
    type: JavaType;
    modifiers: string[];
    annotations: JavaAnnotation[];
};

export type JavaMethodParameter = {
    name: string;
    comments: string[];
    type: JavaType;
    annotations: JavaAnnotation[];
    isVarArgs?: boolean;
};

export type JavaMethod = {
    name: string;
    comments: string[];
    returnType: JavaType | 'void';
    parameters: JavaMethodParameter[];
    modifiers: string[];
    annotations: JavaAnnotation[];
    typeParameters: JavaTypeParameter[];
    throws: JavaType[];
    rawBody: string;
};

export type JavaConstructor = {
    name: string;
    comments: string[];
    parameters: JavaMethodParameter[];
    modifiers: string[];
    annotations: JavaAnnotation[];
    typeParameters: JavaTypeParameter[];
    throws: JavaType[];
    rawBody: string;
};

export type JavaRecordComponent = {
    name: string;
    comments: string[];
    type: JavaType;
    modifiers: string[];
    annotations: JavaAnnotation[];
    isVarArgs?: boolean;
};

export type JavaClass = {
    name: string;
    comments: string[];
    modifiers: string[];
    annotations: JavaAnnotation[];
    fields: JavaField[];
    methods: JavaMethod[];
    constructors: JavaConstructor[];
    superClass?: string;
    interfaces: string[];
    typeParameters: JavaTypeParameter[];
    inner: JavaInner;
};

export type JavaRecord = {
    name: string;
    comments: string[];
    modifiers: string[];
    annotations: JavaAnnotation[];
    recordComponents: JavaRecordComponent[];
    fields: JavaField[];
    methods: JavaMethod[];
    constructors: JavaConstructor[];
    interfaces: string[];
    typeParameters: JavaTypeParameter[];
    inner: JavaInner;
};

export type JavaInterface = {
    name: string;
    comments: string[];
    modifiers: string[];
    annotations: JavaAnnotation[];
    fields: JavaField[];
    methods: JavaMethod[];
    interfaces: string[];
    typeParameters: JavaTypeParameter[];
    inner: JavaInner;
};

export type JavaAnnotationInterfaceField = {
    name: string;
    comments: string[];
    type: JavaType;
    modifiers: string[];
    annotations: JavaAnnotation[];
    defaultValue?: string;
};

export type JavaAnnotationInterface = {
    name: string;
    comments: string[];
    modifiers: string[];
    annotations: JavaAnnotation[];
    fields: JavaAnnotationInterfaceField[];
    inner: JavaInner;
};

export type JavaEnumItem = {
    name: string;
    comments: string[];
    arguments: string[];
    modifiers: string[];
    annotations: JavaAnnotation[];
};

export type JavaEnum = {
    name: string;
    comments: string[];
    modifiers: string[];
    annotations: JavaAnnotation[];
    enumItems: JavaEnumItem[];
    interfaces: string[];
    fields: JavaField[];
    methods: JavaMethod[];
    constructors: JavaConstructor[];
    inner: JavaInner;
};

export type JavaInner = {
    classes: JavaClass[];
    enums: JavaEnum[];
    records: JavaRecord[];
    interfaces: JavaInterface[];
    annotationInterfaces: JavaAnnotationInterface[];
};

export type JavaFile = {
    packageName: string;
    imports: JavaImport[];
    classes: JavaClass[];
    enums: JavaEnum[];
    records: JavaRecord[];
    interfaces: JavaInterface[];
    annotationInterfaces: JavaAnnotationInterface[];
};
