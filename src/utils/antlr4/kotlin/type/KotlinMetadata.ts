export type KotlinAnnotationParameter = {
    name: string | undefined;
    value: string;
};

export type KotlinAnnotation = {
    raw: string;
    target?: string;
    name: string;
    typeArguments: KotlinTypeArgument[];
    parameters: KotlinAnnotationParameter[];
};

export type KotlinTypeParameterBound = {
    raw: string;
    name: string;
    typeArguments?: KotlinTypeArgument[];
};

export type KotlinTypeParameter = {
    name: string;
    modifiers: string[];
    annotations: KotlinAnnotation[];
    bound?: KotlinTypeParameterBound;
    reified?: boolean;
};

export type KotlinWildcardBound = {
    kind: 'in' | 'out' | '*';
    type?: string;
};

export type KotlinTypeArgument = {
    raw: string;
    kind: 'type' | 'wildcard' | 'star';
    name: string;
    typeArguments?: KotlinTypeArgument[];
    variance?: 'in' | 'out';
    wildcardBound?: KotlinWildcardBound;
};

export type KotlinType = {
    raw: string;
    name: string;
    typeArguments?: KotlinTypeArgument[];
    isNullable: boolean;
    isFunctionType: boolean;
};

export type KotlinImport = {
    raw: string;
    path: string;
    alias?: string;
    isOnDemand: boolean;
};

export type KotlinProperty = {
    name: string;
    comments: string[];
    type: KotlinType;
    modifiers: string[];
    annotations: KotlinAnnotation[];
    isVar: boolean;
    isVal: boolean;
    initializer?: string;
    receiverType?: KotlinType;
    getter?: KotlinGetter;
    setter?: KotlinSetter;
};

export type KotlinGetter = {
    modifiers: string[];
    annotations: KotlinAnnotation[];
    body: string;
};

export type KotlinSetter = {
    parameterName: string;
    modifiers: string[];
    annotations: KotlinAnnotation[];
    body: string | undefined;
};

export type KotlinFunctionParameter = {
    name: string;
    comments: string[];
    type: KotlinType;
    annotations: KotlinAnnotation[];
    isVarArg: boolean;
    defaultValue?: string;
};

export type KotlinFunction = {
    name: string;
    comments: string[];
    returnType?: KotlinType;
    parameters: KotlinFunctionParameter[];
    modifiers: string[];
    annotations: KotlinAnnotation[];
    typeParameters: KotlinTypeParameter[];
    receiverType?: KotlinType;
    body: string | undefined;
    isExpressionBody: boolean;
};

export type KotlinPrimaryConstructor = {
    name: string;
    comments: string[];
    parameters: KotlinClassParameter[];
    modifiers: string[];
    annotations: KotlinAnnotation[];
};

export type KotlinSecondaryConstructor = {
    name: string;
    comments: string[];
    parameters: KotlinFunctionParameter[];
    modifiers: string[];
    annotations: KotlinAnnotation[];
    delegateCall: 'this' | 'super' | undefined;
    delegateArguments:
        | {
              name: string | undefined;
              value: string;
          }[]
        | undefined;
};

export type KotlinClassParameter = {
    name: string;
    comments: string[];
    type: KotlinType;
    modifiers: string[];
    annotations: KotlinAnnotation[];
    isVal: boolean;
    isVar: boolean;
    defaultValue?: string;
};

export type DelegationSpecifier = {
    raw: string;
    type: KotlinType;
    delegationType?: KotlinType;
};

export type KotlinClass = {
    name: string;
    comments: string[];
    modifiers: string[];
    annotations: KotlinAnnotation[];
    properties: KotlinProperty[];
    functions: KotlinFunction[];
    primaryConstructor: KotlinPrimaryConstructor | undefined;
    secondaryConstructors: KotlinSecondaryConstructor[];
    delegationSpecifiers: DelegationSpecifier[];
    typeParameters: KotlinTypeParameter[];
    inner: KotlinInner;
    isInterface: boolean;
    isSealed: boolean;
    isData: boolean;
    isAnnotation: boolean;
};

export type KotlinObject = {
    name: string;
    comments: string[];
    modifiers: string[];
    annotations: KotlinAnnotation[];
    properties: KotlinProperty[];
    functions: KotlinFunction[];
    delegationSpecifiers: DelegationSpecifier[];
    inner: KotlinInner;
    isCompanion: boolean;
};

export type KotlinTypeAlias = {
    name: string;
    comments: string[];
    modifiers: string[];
    annotations: KotlinAnnotation[];
    typeParameters: KotlinTypeParameter[];
    underlyingType: KotlinType;
};

export type KotlinEnumEntry = {
    name: string;
    comments: string[];
    arguments: string[];
    modifiers: string[];
    annotations: KotlinAnnotation[];
    properties: KotlinProperty[];
    functions: KotlinFunction[];
    constructors: KotlinSecondaryConstructor[];
    classBody: KotlinInner;
};

export type KotlinEnum = {
    name: string;
    comments: string[];
    modifiers: string[];
    annotations: KotlinAnnotation[];
    enumEntries: KotlinEnumEntry[];
    delegationSpecifiers: DelegationSpecifier[];
    properties: KotlinProperty[];
    functions: KotlinFunction[];
    primaryConstructor: KotlinPrimaryConstructor | undefined;
    secondaryConstructors: KotlinSecondaryConstructor[];
    inner: KotlinInner;
};

export type KotlinInner = {
    classes: KotlinClass[];
    objects: KotlinObject[];
    enums: KotlinEnum[];
    typeAliases: KotlinTypeAlias[];
};

export type KotlinFile = {
    packageName: string;
    imports: KotlinImport[];
    fileAnnotations: KotlinAnnotation[];
    classes: KotlinClass[];
    objects: KotlinObject[];
    enums: KotlinEnum[];
    functions: KotlinFunction[];
    properties: KotlinProperty[];
    typeAliases: KotlinTypeAlias[];
};
