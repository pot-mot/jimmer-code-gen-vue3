import {CharStream, CommonTokenStream, ParseTreeWalker} from 'antlr4ng';
import {
    AdditionalBoundContext,
    AnnotationContext,
    AnnotationInterfaceDeclarationContext,
    AnnotationInterfaceMemberDeclarationContext,
    ArrayTypeContext,
    ClassDeclarationContext,
    ClassMemberDeclarationContext,
    ClassOrInterfaceTypeContext,
    ClassTypeContext,
    CompactConstructorDeclarationContext,
    ConstantDeclarationContext,
    ConstructorDeclarationContext,
    EnumDeclarationContext,
    FieldDeclarationContext,
    FormalParameterContext,
    FormalParameterListContext,
    ImportDeclarationContext,
    InterfaceDeclarationContext,
    InterfaceMemberDeclarationContext,
    InterfaceMethodDeclarationContext,
    Java20Parser,
    MethodDeclarationContext,
    NormalClassDeclarationContext,
    NormalInterfaceDeclarationContext,
    PackageDeclarationContext,
    PrimitiveTypeContext,
    RecordComponentContext,
    RecordDeclarationContext,
    ReferenceTypeContext,
    ThrowsTContext,
    TopLevelClassOrInterfaceDeclarationContext,
    TypeArgumentsContext,
    TypeBoundContext,
    TypeParametersContext,
    TypeVariableContext,
    UnannArrayTypeContext,
    UnannClassOrInterfaceTypeContext,
    UnannClassTypeContext,
    UnannPrimitiveTypeContext,
    UnannReferenceTypeContext,
    UnannTypeContext,
    UnannTypeVariableContext,
    VariableDeclaratorListContext,
    WildcardContext,
} from './__generated/Java20Parser';
import {Java20ParserListener} from './__generated/Java20ParserListener';
import {Java20Lexer} from './__generated/Java20Lexer';
import type {
    JavaAnnotation,
    JavaAnnotationInterface,
    JavaAnnotationInterfaceField,
    JavaAnnotationParameter,
    JavaClass,
    JavaConstructor,
    JavaEnum,
    JavaEnumItem,
    JavaField,
    JavaImport,
    JavaInner,
    JavaInterface,
    JavaMethod,
    JavaMethodParameter,
    JavaRecord,
    JavaRecordComponent,
    JavaType,
    JavaTypeArgument,
    JavaTypeParameter,
    JavaTypeParameterAdditionalBound,
    JavaTypeParameterBound,
    JavaWildcardBound,
} from './type/JavaMetadata';
import {getRawTextByCtx} from '@/utils/antlr4/common/Antlr4Common.ts';

const createEmptyInner = (): JavaInner => ({
    classes: [],
    enums: [],
    records: [],
    interfaces: [],
    annotationInterfaces: [],
});

const getCommentsBeforeToken = (
    tokenStream: CommonTokenStream,
    tokenIndex: number | null | undefined,
): string[] => {
    if (tokenIndex === null || tokenIndex === undefined) return [];
    const comments: string[] = [];
    const hiddenTokens = tokenStream.getHiddenTokensToLeft(tokenIndex, 1);
    if (hiddenTokens) {
        for (const hiddenToken of hiddenTokens) {
            if (
                hiddenToken.type === Java20Lexer.COMMENT ||
                hiddenToken.type === Java20Lexer.LINE_COMMENT
            ) {
                if (hiddenToken.text) comments.push(hiddenToken.text);
            }
        }
    }

    return comments;
};

const parsePrimitiveTypeName = (ctx: UnannPrimitiveTypeContext | PrimitiveTypeContext): string => {
    return ctx.getText();
};

const parseTypeVariableName = (ctx: UnannTypeVariableContext | TypeVariableContext): string => {
    return ctx.typeIdentifier().getText();
};

const parseClassOrInterface = (
    ctx:
        | UnannClassOrInterfaceTypeContext
        | UnannClassTypeContext
        | ClassOrInterfaceTypeContext
        | ClassTypeContext,
    tokenStream: CommonTokenStream,
): {
    typeName: string;
    typeArguments: JavaTypeArgument[];
} => {
    const packageName = ctx.packageName()?.getText();
    const typeArgsCtx = ctx.typeArguments();
    return {
        typeName: `${packageName ? `${packageName}.` : ''}${ctx.typeIdentifier().getText()}`,
        typeArguments: typeArgsCtx ? parseTypeArguments(typeArgsCtx, tokenStream) : [],
    };
};

const parseUnannArrayType = (
    ctx: UnannArrayTypeContext,
    tokenStream: CommonTokenStream,
): {
    typeName: string;
    typeArguments: JavaTypeArgument[];
    arrayDimensions: number;
} => {
    const arrayDimensions = ctx.dims().LBRACK().length;

    const primitiveType = ctx.unannPrimitiveType();
    if (primitiveType) {
        return {
            typeName: parsePrimitiveTypeName(primitiveType),
            typeArguments: [],
            arrayDimensions,
        };
    }

    const classOrInterfaceType = ctx.unannClassOrInterfaceType();
    if (classOrInterfaceType) {
        const {typeName, typeArguments} = parseClassOrInterface(classOrInterfaceType, tokenStream);
        return {
            typeName,
            typeArguments,
            arrayDimensions,
        };
    }

    const typeVariable = ctx.unannTypeVariable();
    if (typeVariable) {
        return {
            typeName: parseTypeVariableName(typeVariable),
            typeArguments: [],
            arrayDimensions,
        };
    }

    throw new Error(`Unsupported array type: ${JSON.stringify(ctx)}`);
};

const parseArrayType = (
    ctx: ArrayTypeContext,
    tokenStream: CommonTokenStream,
): {
    typeName: string;
    typeArguments: JavaTypeArgument[];
    arrayDimensions: number;
} => {
    const arrayDimensions = ctx.dims().LBRACK().length;

    const primitiveType = ctx.primitiveType();
    if (primitiveType) {
        return {
            typeName: parsePrimitiveTypeName(primitiveType),
            typeArguments: [],
            arrayDimensions,
        };
    }

    const classType = ctx.classType();
    if (classType) {
        const {typeName, typeArguments} = parseClassOrInterface(classType, tokenStream);
        return {
            typeName,
            typeArguments,
            arrayDimensions,
        };
    }

    const typeVariable = ctx.typeVariable();
    if (typeVariable) {
        return {
            typeName: parseTypeVariableName(typeVariable),
            typeArguments: [],
            arrayDimensions,
        };
    }

    throw new Error(`Unsupported array type: ${JSON.stringify(ctx)}`);
};

const parseUnannReferenceType = (
    ctx: UnannReferenceTypeContext,
    tokenStream: CommonTokenStream,
): JavaType => {
    const raw = getRawTextByCtx(tokenStream, ctx);

    const classOrInterfaceType = ctx.unannClassOrInterfaceType();
    if (classOrInterfaceType) {
        const {typeName, typeArguments} = parseClassOrInterface(classOrInterfaceType, tokenStream);

        return {
            raw,
            name: typeName,
            typeArguments,
            isArray: false,
        };
    }

    const typeVariable = ctx.unannTypeVariable();
    if (typeVariable) {
        return {
            raw,
            name: parseTypeVariableName(typeVariable),
            typeArguments: [],
            isArray: false,
        };
    }

    const arrayType = ctx.unannArrayType();
    if (arrayType) {
        const {typeName, typeArguments, arrayDimensions} = parseUnannArrayType(
            arrayType,
            tokenStream,
        );

        return {
            raw,
            name: typeName,
            typeArguments,
            isArray: true,
            arrayDimensions,
        };
    }

    throw new Error(`Unsupported reference type: ${JSON.stringify(ctx)}`);
};

const parseReferenceType = (
    ctx: ReferenceTypeContext,
    tokenStream: CommonTokenStream,
): JavaType => {
    const raw = getRawTextByCtx(tokenStream, ctx);

    const classOrInterfaceType = ctx.classOrInterfaceType();
    if (classOrInterfaceType) {
        const {typeName, typeArguments} = parseClassOrInterface(classOrInterfaceType, tokenStream);

        return {
            raw,
            name: typeName,
            typeArguments,
            isArray: false,
        };
    }

    const typeVariable = ctx.typeVariable();
    if (typeVariable) {
        return {
            raw,
            name: parseTypeVariableName(typeVariable),
            typeArguments: [],
            isArray: false,
        };
    }

    const arrayType = ctx.arrayType();
    if (arrayType) {
        const {typeName, typeArguments, arrayDimensions} = parseArrayType(arrayType, tokenStream);

        return {
            raw,
            name: typeName,
            typeArguments,
            isArray: true,
            arrayDimensions,
        };
    }

    throw new Error(`Unsupported reference type: ${JSON.stringify(ctx)}`);
};

const parseAnnotation = (
    ctx: AnnotationContext,
    tokenStream: CommonTokenStream,
): JavaAnnotation => {
    const raw = getRawTextByCtx(tokenStream, ctx);

    const normal = ctx.normalAnnotation();
    if (normal) {
        const pairs = normal.elementValuePairList()?.elementValuePair() || [];
        const parameters: JavaAnnotationParameter[] = pairs.map((pair) => ({
            name: pair.identifier().getText(),
            rawValue: getRawTextByCtx(tokenStream, pair.elementValue()),
        }));
        return {
            raw,
            name: normal.typeName().getText(),
            parameters,
        };
    }

    const single = ctx.singleElementAnnotation();
    if (single) {
        return {
            raw,
            name: single.typeName().getText(),
            parameters: [
                {name: 'value', rawValue: getRawTextByCtx(tokenStream, single.elementValue())},
            ],
        };
    }

    const marker = ctx.markerAnnotation();
    if (marker) {
        return {
            raw,
            name: marker.typeName().getText(),
            parameters: [],
        };
    }

    throw new Error(`Unsupported annotation: ${JSON.stringify(ctx)}`);
};

const parseAnnotations = (
    annotationCtxList: AnnotationContext[],
    tokenStream: CommonTokenStream,
): JavaAnnotation[] => {
    const result: JavaAnnotation[] = [];
    for (const annotation of annotationCtxList) {
        result.push(parseAnnotation(annotation, tokenStream));
    }
    return result;
};

const parseModifiersAndAnnotations = (
    modifierList:
        | {
              annotation(): AnnotationContext | null;
              getText(): string | null;
          }[]
        | null
        | undefined,
    tokenStream: CommonTokenStream,
): {
    modifiers: string[];
    annotations: JavaAnnotation[];
} => {
    const modifiers: string[] = [];
    const annotations: JavaAnnotation[] = [];
    if (!modifierList) return {modifiers, annotations};

    for (const modifier of modifierList) {
        const annotation = modifier.annotation();
        if (annotation) {
            annotations.push(parseAnnotation(annotation, tokenStream));
            continue;
        }
        const text = modifier.getText();
        if (text) modifiers.push(text);
    }

    return {modifiers, annotations};
};

const parseReferenceTypeArgument = (
    ctx: ReferenceTypeContext,
    tokenStream: CommonTokenStream,
): JavaTypeArgument & {kind: 'type'} => {
    const {name, typeArguments, isArray, arrayDimensions} = parseReferenceType(ctx, tokenStream);
    return {
        raw: getRawTextByCtx(tokenStream, ctx),
        kind: 'type',
        typeName: name,
        typeArguments,
        isArray,
        arrayDimensions,
    };
};

const parseWildcardTypeArgument = (
    wildcard: WildcardContext,
    tokenStream: CommonTokenStream,
): JavaTypeArgument & {kind: 'wildcard'} => {
    const annotation = wildcard.annotation();

    const bounds = wildcard.wildcardBounds();
    let wildcardBound: JavaWildcardBound | undefined;
    if (bounds) {
        const referenceType = bounds.referenceType();
        if (bounds.EXTENDS()) {
            wildcardBound = {kind: 'extends', type: parseReferenceType(referenceType, tokenStream)};
        } else if (bounds.SUPER()) {
            wildcardBound = {kind: 'super', type: parseReferenceType(referenceType, tokenStream)};
        }
    }

    return {
        raw: getRawTextByCtx(tokenStream, wildcard),
        kind: 'wildcard',
        wildcardBound,
        annotations: parseAnnotations(annotation, tokenStream),
    };
};

const parseTypeArguments = (
    ctx: TypeArgumentsContext,
    tokenStream: CommonTokenStream,
): JavaTypeArgument[] => {
    const result: JavaTypeArgument[] = [];
    const args = ctx.typeArgumentList().typeArgument();

    for (const arg of args) {
        const wildcard = arg.wildcard();
        if (wildcard) {
            result.push(parseWildcardTypeArgument(wildcard, tokenStream));
            continue;
        }

        const referenceType = arg.referenceType();
        if (referenceType) {
            result.push(parseReferenceTypeArgument(referenceType, tokenStream));
        }
    }

    return result;
};

const parseType = (ctx: UnannTypeContext, tokenStream: CommonTokenStream): JavaType => {
    const raw = getRawTextByCtx(tokenStream, ctx);

    const primitiveType = ctx.unannPrimitiveType();
    if (primitiveType) {
        return {
            raw,
            name: parsePrimitiveTypeName(primitiveType),
            typeArguments: [],
            isArray: false,
        };
    }

    const referenceType = ctx.unannReferenceType();
    if (referenceType) {
        return parseUnannReferenceType(referenceType, tokenStream);
    }

    throw new Error(`Unsupported type: ${JSON.stringify(ctx)}`);
};

const parseAdditionalBound = (
    ctx: AdditionalBoundContext,
    tokenStream: CommonTokenStream,
): JavaTypeParameterAdditionalBound => {
    const raw = getRawTextByCtx(tokenStream, ctx);
    const {typeName, typeArguments} = parseClassOrInterface(
        ctx.interfaceType().classType(),
        tokenStream,
    );
    return {
        raw,
        typeName,
        typeArguments,
    };
};

const parseTypeBound = (
    ctx: TypeBoundContext,
    tokenStream: CommonTokenStream,
): JavaTypeParameterBound => {
    const raw = getRawTextByCtx(tokenStream, ctx);

    const classOrInterface = ctx.classOrInterfaceType();
    if (classOrInterface) {
        const {typeName, typeArguments} = parseClassOrInterface(classOrInterface, tokenStream);
        return {
            raw,
            typeName,
            typeArguments,
            additionalBounds: ctx
                .additionalBound()
                ?.map((it) => parseAdditionalBound(it, tokenStream)),
        };
    }

    const typeVariable = ctx.typeVariable();
    if (typeVariable) {
        return {
            raw,
            typeName: parseTypeVariableName(typeVariable),
            typeArguments: [],
            additionalBounds: [],
        };
    }

    throw new Error(`Unsupported type bound: ${JSON.stringify(ctx)}`);
};

const parseTypeParameters = (
    ctx: TypeParametersContext,
    tokenStream: CommonTokenStream,
): JavaTypeParameter[] => {
    const typeParameters: JavaTypeParameter[] = [];
    const typeParamList = ctx.typeParameterList().typeParameter();

    for (const typeParam of typeParamList) {
        const typeName = typeParam.typeIdentifier()?.getText() || '';
        const modifierList = typeParam.typeParameterModifier() || [];
        const {modifiers, annotations} = parseModifiersAndAnnotations(modifierList, tokenStream);
        const typeBoundCtx = typeParam.typeBound();
        typeParameters.push({
            raw: getRawTextByCtx(tokenStream, typeParam),
            typeName,
            modifiers,
            annotations,
            bound: typeBoundCtx ? parseTypeBound(typeBoundCtx, tokenStream) : undefined,
        });
    }

    return typeParameters;
};

const parseThrows = (
    throwsCtx: ThrowsTContext | null | undefined,
    tokenStream: CommonTokenStream,
): JavaType[] => {
    const result: JavaType[] = [];
    const exceptionTypes = throwsCtx?.exceptionTypeList()?.exceptionType() ?? [];

    for (const exceptionType of exceptionTypes) {
        const classType = exceptionType.classType();
        if (classType) {
            const {typeName, typeArguments} = parseClassOrInterface(classType, tokenStream);
            result.push({
                raw: getRawTextByCtx(tokenStream, classType),
                name: typeName,
                typeArguments,
                isArray: false,
            });
            continue;
        }

        const typeVariable = exceptionType.typeVariable();
        if (typeVariable) {
            result.push({
                raw: getRawTextByCtx(tokenStream, typeVariable),
                name: parseTypeVariableName(typeVariable),
                typeArguments: [],
                isArray: false,
            });
        }
    }

    return result;
};

const parseFieldLike = (
    variableDeclaratorList: VariableDeclaratorListContext,
    typeCtx: UnannTypeContext,
    modifiers: string[],
    annotations: JavaAnnotation[],
    comments: string[],
    tokenStream: CommonTokenStream,
): JavaField[] => {
    const result: JavaField[] = [];

    const type = parseType(typeCtx, tokenStream);
    const declarators = variableDeclaratorList?.variableDeclarator() || [];

    for (const declarator of declarators) {
        const idCtx = declarator.variableDeclaratorId();
        const name = idCtx.identifier().getText();
        result.push({
            name,
            comments,
            type,
            modifiers: [...modifiers],
            annotations: [...annotations],
        });
    }

    return result;
};

const parseField = (ctx: FieldDeclarationContext, tokenStream: CommonTokenStream): JavaField[] => {
    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.fieldModifier(), tokenStream);
    return parseFieldLike(
        ctx.variableDeclaratorList(),
        ctx.unannType(),
        modifiers,
        annotations,
        getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        tokenStream,
    );
};

const parseConstantDeclaration = (
    ctx: ConstantDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaField[] => {
    const {modifiers, annotations} = parseModifiersAndAnnotations(
        ctx.constantModifier(),
        tokenStream,
    );
    return parseFieldLike(
        ctx.variableDeclaratorList(),
        ctx.unannType(),
        modifiers,
        annotations,
        getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        tokenStream,
    );
};

const parseMethodParameters = (
    formalParameterList: FormalParameterListContext | null | undefined,
    tokenStream: CommonTokenStream,
): JavaMethodParameter[] => {
    const parameters: JavaMethodParameter[] = [];
    const formalParams: FormalParameterContext[] = formalParameterList?.formalParameter() || [];

    for (const param of formalParams) {
        const variableArity = param.variableArityParameter();
        if (variableArity) {
            const {annotations: modifierAnnotations} = parseModifiersAndAnnotations(
                param.variableModifier(),
                tokenStream,
            );
            const inlineVarArgAnnotations = parseAnnotations(
                variableArity.annotation(),
                tokenStream,
            );
            parameters.push({
                name: variableArity.identifier().getText(),
                comments: getCommentsBeforeToken(tokenStream, variableArity.start?.tokenIndex),
                type: parseType(variableArity.unannType(), tokenStream),
                annotations: [...modifierAnnotations, ...inlineVarArgAnnotations],
                isVarArgs: true,
            });
            continue;
        }

        const typeCtx = param.unannType();
        if (typeCtx) {
            const declaratorId = param.variableDeclaratorId();
            const name = declaratorId?.identifier()?.getText();
            if (!name) continue;
            const {annotations} = parseModifiersAndAnnotations(
                param.variableModifier(),
                tokenStream,
            );
            parameters.push({
                name,
                comments: getCommentsBeforeToken(tokenStream, param.start?.tokenIndex),
                type: parseType(typeCtx, tokenStream),
                annotations,
            });
        }
    }

    return parameters;
};

const parseMethod = (
    ctx: MethodDeclarationContext | InterfaceMethodDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaMethod => {
    const methodHeader = ctx.methodHeader();
    const methodBody = ctx.methodBody();

    const methodDeclarator = methodHeader.methodDeclarator();
    const methodName = methodDeclarator.identifier().getText();

    const classMethodModifiers = 'methodModifier' in ctx ? ctx.methodModifier() : undefined;
    const interfaceMethodModifiers =
        'interfaceMethodModifier' in ctx ? ctx.interfaceMethodModifier() : undefined;

    const modifierNodes = classMethodModifiers || interfaceMethodModifiers || [];
    const {modifiers, annotations} = parseModifiersAndAnnotations(modifierNodes, tokenStream);
    const headerAnnotations = parseAnnotations(methodHeader.annotation() || [], tokenStream);

    const resultCtx = methodHeader.result();
    let returnType: JavaType | 'void' = 'void';
    if (!resultCtx.VOID()) {
        const returnTypeCtx = resultCtx.unannType();
        if (returnTypeCtx) {
            returnType = parseType(returnTypeCtx, tokenStream);
        }
    }

    const parameters = parseMethodParameters(methodDeclarator.formalParameterList(), tokenStream);

    const typeParametersCtx = methodHeader.typeParameters();
    const typeParameters = typeParametersCtx
        ? parseTypeParameters(typeParametersCtx, tokenStream)
        : [];

    const throwsTypes = parseThrows(methodHeader.throwsT(), tokenStream);

    return {
        name: methodName,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        returnType,
        parameters,
        modifiers,
        annotations: [...annotations, ...headerAnnotations],
        typeParameters,
        throws: throwsTypes,
        rawBody: getRawTextByCtx(tokenStream, methodBody),
    };
};

const parseConstructor = (
    ctx: ConstructorDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaConstructor => {
    const constructorDeclarator = ctx.constructorDeclarator();
    const name = constructorDeclarator.simpleTypeName().typeIdentifier().getText();
    const {modifiers, annotations} = parseModifiersAndAnnotations(
        ctx.constructorModifier(),
        tokenStream,
    );

    const parameters = parseMethodParameters(
        constructorDeclarator.formalParameterList(),
        tokenStream,
    );

    const typeParametersCtx = constructorDeclarator.typeParameters();
    const typeParameters = typeParametersCtx
        ? parseTypeParameters(typeParametersCtx, tokenStream)
        : [];

    const throwsTypes = parseThrows(ctx.throwsT(), tokenStream);

    return {
        name,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        parameters,
        modifiers,
        annotations,
        typeParameters,
        throws: throwsTypes,
        rawBody: getRawTextByCtx(tokenStream, ctx.constructorBody()),
    };
};

const parseInnerClassDeclaration = (
    ctx: ClassDeclarationContext,
    inner: JavaInner,
    tokenStream: CommonTokenStream,
) => {
    const normalClassCtx = ctx.normalClassDeclaration();
    if (normalClassCtx) {
        const javaClass = parseClass(normalClassCtx, tokenStream);
        if (javaClass) inner.classes.push(javaClass);
        return;
    }

    const enumCtx = ctx.enumDeclaration();
    if (enumCtx) {
        const javaEnum = parseEnum(enumCtx, tokenStream);
        if (javaEnum) inner.enums.push(javaEnum);
        return;
    }

    const recordCtx = ctx.recordDeclaration();
    if (recordCtx) {
        const javaRecord = parseRecord(recordCtx, tokenStream);
        if (javaRecord) inner.records.push(javaRecord);
    }
};

const parseInnerInterfaceDeclaration = (
    ctx: InterfaceDeclarationContext,
    inner: JavaInner,
    tokenStream: CommonTokenStream,
) => {
    const normalInterfaceCtx = ctx.normalInterfaceDeclaration();
    if (normalInterfaceCtx) {
        const javaInterface = parseInterface(normalInterfaceCtx, tokenStream);
        if (javaInterface) inner.interfaces.push(javaInterface);
        return;
    }

    const annotationInterfaceCtx = ctx.annotationInterfaceDeclaration();
    if (annotationInterfaceCtx) {
        const javaAnnotationInterface = parseAnnotationInterface(
            annotationInterfaceCtx,
            tokenStream,
        );
        if (javaAnnotationInterface) inner.annotationInterfaces.push(javaAnnotationInterface);
    }
};

const parseInnerClassMemberDeclaration = (
    memberDecl: ClassMemberDeclarationContext,
    inner: JavaInner,
    tokenStream: CommonTokenStream,
) => {
    const classDecl = memberDecl.classDeclaration();
    if (classDecl) parseInnerClassDeclaration(classDecl, inner, tokenStream);

    const interfaceDecl = memberDecl.interfaceDeclaration();
    if (interfaceDecl) parseInnerInterfaceDeclaration(interfaceDecl, inner, tokenStream);
};

const parseClass = (
    ctx: NormalClassDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaClass | undefined => {
    const className =
        ctx.typeIdentifier().Identifier()?.getText() || ctx.typeIdentifier().getText();
    if (!className) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.classModifier(), tokenStream);

    const typeParametersCtx = ctx.typeParameters();
    const typeParameters = typeParametersCtx
        ? parseTypeParameters(typeParametersCtx, tokenStream)
        : [];

    const superClass = ctx.classExtends()?.classType()?.getText();

    const interfaces: string[] = [];
    const interfaceList = ctx.classImplements()?.interfaceTypeList()?.interfaceType() || [];
    for (let i = 0; i < interfaceList.length; i++) {
        const text = interfaceList[i]?.getText();
        if (text) interfaces.push(text);
    }

    const fields: JavaField[] = [];
    const methods: JavaMethod[] = [];
    const constructors: JavaConstructor[] = [];
    const inner = createEmptyInner();

    const bodyDeclarations = ctx.classBody()?.classBodyDeclaration() || [];
    for (const bodyDecl of bodyDeclarations) {
        const constructorDecl = bodyDecl.constructorDeclaration();
        if (constructorDecl) {
            constructors.push(parseConstructor(constructorDecl, tokenStream));
            continue;
        }

        const memberDecl = bodyDecl.classMemberDeclaration();
        if (!memberDecl) continue;

        const fieldDecl = memberDecl.fieldDeclaration();
        if (fieldDecl) fields.push(...parseField(fieldDecl, tokenStream));

        const methodDecl = memberDecl.methodDeclaration();
        if (methodDecl) methods.push(parseMethod(methodDecl, tokenStream));

        parseInnerClassMemberDeclaration(memberDecl, inner, tokenStream);
    }

    return {
        name: className,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        modifiers,
        annotations,
        fields,
        methods,
        constructors,
        superClass,
        interfaces,
        typeParameters,
        inner,
    };
};

const parseRecordComponent = (
    ctx: RecordComponentContext,
    tokenStream: CommonTokenStream,
): JavaRecordComponent | undefined => {
    const variableArity = ctx.variableArityRecordComponent();
    if (variableArity) {
        const {modifiers, annotations} = parseModifiersAndAnnotations(
            variableArity.recordComponentModifier(),
            tokenStream,
        );
        const inlineAnnotations = parseAnnotations(variableArity.annotation() || [], tokenStream);
        return {
            name: variableArity.identifier().getText(),
            comments: getCommentsBeforeToken(tokenStream, variableArity.start?.tokenIndex),
            type: parseType(variableArity.unannType(), tokenStream),
            modifiers,
            annotations: [...annotations, ...inlineAnnotations],
            isVarArgs: true,
        };
    }

    const typeCtx = ctx.unannType();
    const idCtx = ctx.identifier();
    if (!typeCtx || !idCtx) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(
        ctx.recordComponentModifier(),
        tokenStream,
    );
    return {
        name: idCtx.getText(),
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        type: parseType(typeCtx, tokenStream),
        modifiers,
        annotations,
    };
};

const parseCompactConstructor = (
    ctx: CompactConstructorDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaConstructor => {
    const {modifiers, annotations} = parseModifiersAndAnnotations(
        ctx.constructorModifier(),
        tokenStream,
    );
    return {
        name: ctx.simpleTypeName()?.typeIdentifier().Identifier()?.getText() || '',
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        parameters: [],
        modifiers,
        annotations,
        typeParameters: [],
        throws: [],
        rawBody: getRawTextByCtx(tokenStream, ctx.constructorBody()),
    };
};

const parseRecord = (
    ctx: RecordDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaRecord | undefined => {
    const recordName =
        ctx.typeIdentifier()?.Identifier()?.getText() || ctx.typeIdentifier()?.getText();
    if (!recordName) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.classModifier(), tokenStream);

    const typeParametersCtx = ctx.typeParameters();
    const typeParameters = typeParametersCtx
        ? parseTypeParameters(typeParametersCtx, tokenStream)
        : [];

    const interfaces: string[] = [];
    const interfaceList = ctx.classImplements()?.interfaceTypeList()?.interfaceType() || [];
    for (let i = 0; i < interfaceList.length; i++) {
        const text = interfaceList[i]?.getText();
        if (text) interfaces.push(text);
    }

    const recordComponents: JavaRecordComponent[] = [];
    const componentList = ctx.recordHeader()?.recordComponentList()?.recordComponent() || [];
    for (let i = 0; i < componentList.length; i++) {
        const component = componentList[i];
        if (!component) continue;
        const parsed = parseRecordComponent(component, tokenStream);
        if (parsed) recordComponents.push(parsed);
    }

    const fields: JavaField[] = recordComponents.map((it) => ({
        name: it.name,
        comments: it.comments,
        type: it.type,
        modifiers: it.modifiers,
        annotations: it.annotations,
    }));
    const methods: JavaMethod[] = [];
    const constructors: JavaConstructor[] = [];
    const inner = createEmptyInner();

    const bodyDeclarations = ctx.recordBody()?.recordBodyDeclaration() || [];
    for (const recordBodyDecl of bodyDeclarations) {
        const compactConstructorDecl = recordBodyDecl.compactConstructorDeclaration();
        if (compactConstructorDecl) {
            constructors.push(parseCompactConstructor(compactConstructorDecl, tokenStream));
            continue;
        }

        const bodyDecl = recordBodyDecl.classBodyDeclaration();
        if (!bodyDecl) continue;

        const constructorDecl = bodyDecl.constructorDeclaration();
        if (constructorDecl) {
            constructors.push(parseConstructor(constructorDecl, tokenStream));
            continue;
        }

        const memberDecl = bodyDecl.classMemberDeclaration();
        if (!memberDecl) continue;

        const fieldDecl = memberDecl.fieldDeclaration();
        if (fieldDecl) fields.push(...parseField(fieldDecl, tokenStream));

        const methodDecl = memberDecl.methodDeclaration();
        if (methodDecl) methods.push(parseMethod(methodDecl, tokenStream));

        parseInnerClassMemberDeclaration(memberDecl, inner, tokenStream);
    }

    return {
        name: recordName,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        modifiers,
        annotations,
        recordComponents,
        fields,
        methods,
        constructors,
        interfaces,
        typeParameters,
        inner,
    };
};

const parseInterface = (
    ctx: NormalInterfaceDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaInterface | undefined => {
    const interfaceName =
        ctx.typeIdentifier()?.Identifier()?.getText() || ctx.typeIdentifier()?.getText();
    if (!interfaceName) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(
        ctx.interfaceModifier(),
        tokenStream,
    );

    const interfaces: string[] = [];
    const interfaceList = ctx.interfaceExtends()?.interfaceTypeList()?.interfaceType() || [];
    for (let i = 0; i < interfaceList.length; i++) {
        const text = interfaceList[i]?.getText();
        if (text) interfaces.push(text);
    }

    const typeParametersCtx = ctx.typeParameters();
    const typeParameters = typeParametersCtx
        ? parseTypeParameters(typeParametersCtx, tokenStream)
        : [];

    const fields: JavaField[] = [];
    const methods: JavaMethod[] = [];
    const inner = createEmptyInner();

    const bodyDeclarations = ctx.interfaceBody()?.interfaceMemberDeclaration() || [];
    for (let i = 0; i < bodyDeclarations.length; i++) {
        const bodyDecl: InterfaceMemberDeclarationContext | undefined = bodyDeclarations[i];
        if (!bodyDecl) continue;

        const constantDecl = bodyDecl.constantDeclaration();
        if (constantDecl) fields.push(...parseConstantDeclaration(constantDecl, tokenStream));

        const methodDecl = bodyDecl.interfaceMethodDeclaration();
        if (methodDecl) methods.push(parseMethod(methodDecl, tokenStream));

        const classDecl = bodyDecl.classDeclaration();
        if (classDecl) parseInnerClassDeclaration(classDecl, inner, tokenStream);

        const interfaceDecl = bodyDecl.interfaceDeclaration();
        if (interfaceDecl) parseInnerInterfaceDeclaration(interfaceDecl, inner, tokenStream);
    }

    return {
        name: interfaceName,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        modifiers,
        annotations,
        fields,
        methods,
        interfaces,
        typeParameters,
        inner,
    };
};

const parseEnum = (
    ctx: EnumDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaEnum | undefined => {
    const enumName =
        ctx.typeIdentifier()?.Identifier()?.getText() || ctx.typeIdentifier()?.getText();
    if (!enumName) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.classModifier(), tokenStream);

    const interfaces: string[] = [];
    const interfaceList = ctx.classImplements()?.interfaceTypeList()?.interfaceType() || [];
    for (let i = 0; i < interfaceList.length; i++) {
        const text = interfaceList[i]?.getText();
        if (text) interfaces.push(text);
    }

    const enumItems: JavaEnumItem[] = [];
    const bodyCtx = ctx.enumBody();
    const constantList = bodyCtx?.enumConstantList()?.enumConstant() || [];
    for (const constant of constantList) {
        const {modifiers: enumModifiers, annotations: enumAnnotations} =
            parseModifiersAndAnnotations(constant.enumConstantModifier(), tokenStream);
        const itemArguments: string[] = [];
        const argList = constant.argumentList()?.expression() || [];
        for (let j = 0; j < argList.length; j++) {
            const arg = argList[j]?.getText();
            if (arg) itemArguments.push(arg);
        }

        enumItems.push({
            name: constant.identifier()?.getText() || '',
            comments: getCommentsBeforeToken(tokenStream, constant.start?.tokenIndex),
            arguments: itemArguments,
            modifiers: enumModifiers,
            annotations: enumAnnotations,
        });
    }

    const fields: JavaField[] = [];
    const methods: JavaMethod[] = [];
    const constructors: JavaConstructor[] = [];
    const inner = createEmptyInner();

    const bodyDeclarations = bodyCtx?.enumBodyDeclarations()?.classBodyDeclaration() || [];
    for (let i = 0; i < bodyDeclarations.length; i++) {
        const bodyDecl = bodyDeclarations[i];
        if (!bodyDecl) continue;

        const constructorDecl = bodyDecl.constructorDeclaration();
        if (constructorDecl) {
            constructors.push(parseConstructor(constructorDecl, tokenStream));
            continue;
        }

        const memberDecl = bodyDecl.classMemberDeclaration();
        if (!memberDecl) continue;

        const fieldDecl = memberDecl.fieldDeclaration();
        if (fieldDecl) fields.push(...parseField(fieldDecl, tokenStream));

        const methodDecl = memberDecl.methodDeclaration();
        if (methodDecl) methods.push(parseMethod(methodDecl, tokenStream));

        parseInnerClassMemberDeclaration(memberDecl, inner, tokenStream);
    }

    return {
        name: enumName,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        modifiers,
        annotations,
        enumItems,
        interfaces,
        fields,
        methods,
        constructors,
        inner,
    };
};

const parseAnnotationInterfaceField = (
    ctx: AnnotationInterfaceMemberDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaAnnotationInterfaceField | undefined => {
    const elementDeclareCtx = ctx.annotationInterfaceElementDeclaration();
    if (!elementDeclareCtx) return;

    const fieldName = elementDeclareCtx.identifier()?.getText();
    if (!fieldName) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(
        elementDeclareCtx.annotationInterfaceElementModifier(),
        tokenStream,
    );
    const type = parseType(elementDeclareCtx.unannType(), tokenStream);

    const defaultValue = elementDeclareCtx.defaultValue()?.elementValue()?.getText();

    return {
        name: fieldName,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        type,
        modifiers,
        annotations,
        defaultValue,
    };
};

const parseAnnotationInterface = (
    ctx: AnnotationInterfaceDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaAnnotationInterface | undefined => {
    const interfaceName =
        ctx.typeIdentifier()?.Identifier()?.getText() || ctx.typeIdentifier()?.getText();
    if (!interfaceName) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(
        ctx.interfaceModifier(),
        tokenStream,
    );
    const inner = createEmptyInner();

    const members = ctx.annotationInterfaceBody()?.annotationInterfaceMemberDeclaration() || [];

    const fields: JavaAnnotationInterfaceField[] = [];
    for (let i = 0; i < members.length; i++) {
        const member = members[i];
        if (!member) continue;

        const field = parseAnnotationInterfaceField(member, tokenStream);
        if (field) fields.push(field);

        const classDecl = member.classDeclaration();
        if (classDecl) parseInnerClassDeclaration(classDecl, inner, tokenStream);

        const interfaceDecl = member.interfaceDeclaration();
        if (interfaceDecl) parseInnerInterfaceDeclaration(interfaceDecl, inner, tokenStream);
    }

    return {
        name: interfaceName,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        modifiers,
        annotations,
        fields,
        inner,
    };
};

const parseImport = (ctx: ImportDeclarationContext): JavaImport | undefined => {
    const singleType = ctx.singleTypeImportDeclaration();
    if (singleType) {
        const path = singleType.typeName().getText();
        return {
            path,
            isStatic: false,
            isOnDemand: false,
            raw: path,
        };
    }

    const onDemand = ctx.typeImportOnDemandDeclaration();
    if (onDemand) {
        const path = `${onDemand.packageOrTypeName().getText()}.*`;
        return {
            path,
            isStatic: false,
            isOnDemand: true,
            raw: path,
        };
    }

    const singleStatic = ctx.singleStaticImportDeclaration();
    if (singleStatic) {
        const typeName = singleStatic.typeName().getText();
        const member = singleStatic.identifier().getText();
        return {
            path: `${typeName}.${member}`,
            isStatic: true,
            isOnDemand: false,
            member,
            raw: `static ${typeName}.${member}`,
        };
    }

    const staticOnDemand = ctx.staticImportOnDemandDeclaration();
    if (staticOnDemand) {
        const typeName = staticOnDemand.typeName().getText();
        return {
            path: `${typeName}.*`,
            isStatic: true,
            isOnDemand: true,
            raw: `static ${typeName}.*`,
        };
    }

    return;
};

class CustomJavaListener extends Java20ParserListener {
    public packageName = '';
    public imports: JavaImport[] = [];
    public classes: JavaClass[] = [];
    public enums: JavaEnum[] = [];
    public records: JavaRecord[] = [];
    public interfaces: JavaInterface[] = [];
    public annotationInterfaces: JavaAnnotationInterface[] = [];

    private readonly tokenStream: CommonTokenStream;

    constructor(tokenStream: CommonTokenStream) {
        super();
        this.tokenStream = tokenStream;
    }

    enterPackageDeclaration = (ctx: PackageDeclarationContext) => {
        const packageParts: string[] = [];
        const identifierList = ctx.identifier() || [];
        for (let i = 0; i < identifierList.length; i++) {
            const identifierText = identifierList[i]?.getText();
            if (identifierText) packageParts.push(identifierText);
        }
        this.packageName = packageParts.join('.');
    };

    enterImportDeclaration = (ctx: ImportDeclarationContext) => {
        const parsed = parseImport(ctx);
        if (!parsed) return;
        this.imports.push(parsed);
    };

    enterTopLevelClassOrInterfaceDeclaration = (
        ctx: TopLevelClassOrInterfaceDeclarationContext,
    ) => {
        const tokenStream = this.tokenStream;

        const classCtx = ctx.classDeclaration();
        if (classCtx) {
            const normalClassCtx = classCtx.normalClassDeclaration();
            if (normalClassCtx) {
                const javaClass = parseClass(normalClassCtx, tokenStream);
                if (javaClass) this.classes.push(javaClass);
                return;
            }

            const enumCtx = classCtx.enumDeclaration();
            if (enumCtx) {
                const javaEnum = parseEnum(enumCtx, tokenStream);
                if (javaEnum) this.enums.push(javaEnum);
                return;
            }

            const recordCtx = classCtx.recordDeclaration();
            if (recordCtx) {
                const javaRecord = parseRecord(recordCtx, tokenStream);
                if (javaRecord) this.records.push(javaRecord);
            }
            return;
        }

        const interfaceCtx = ctx.interfaceDeclaration();
        if (!interfaceCtx) return;

        const normalInterfaceCtx = interfaceCtx.normalInterfaceDeclaration();
        if (normalInterfaceCtx) {
            const javaInterface = parseInterface(normalInterfaceCtx, tokenStream);
            if (javaInterface) this.interfaces.push(javaInterface);
            return;
        }

        const annotationInterfaceCtx = interfaceCtx.annotationInterfaceDeclaration();
        if (annotationInterfaceCtx) {
            const javaAnnotationInterface = parseAnnotationInterface(
                annotationInterfaceCtx,
                tokenStream,
            );
            if (javaAnnotationInterface) this.annotationInterfaces.push(javaAnnotationInterface);
        }
    };
}

export const parseJava = (
    code: string,
): {
    packageName: string;
    imports: JavaImport[];
    classes: JavaClass[];
    enums: JavaEnum[];
    records: JavaRecord[];
    interfaces: JavaInterface[];
    annotationInterfaces: JavaAnnotationInterface[];
} => {
    const inputStream = CharStream.fromString(code);
    const lexer = new Java20Lexer(inputStream);
    const tokens = new CommonTokenStream(lexer);
    const parser = new Java20Parser(tokens);
    const tree = parser.compilationUnit();

    const listener = new CustomJavaListener(tokens);
    const walker = new ParseTreeWalker();
    walker.walk(listener, tree);

    return {
        packageName: listener.packageName,
        imports: listener.imports,
        classes: listener.classes,
        enums: listener.enums,
        records: listener.records,
        interfaces: listener.interfaces,
        annotationInterfaces: listener.annotationInterfaces,
    };
};
