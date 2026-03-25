import {CharStream, CommonTokenStream, ParseTreeWalker, ParserRuleContext} from 'antlr4ng';
import {
    AdditionalBoundContext,
    AnnotationContext,
    AnnotationInterfaceDeclarationContext,
    AnnotationInterfaceMemberDeclarationContext,
    ClassDeclarationContext,
    ClassMemberDeclarationContext,
    CompactConstructorDeclarationContext,
    ConstantDeclarationContext,
    ConstructorDeclarationContext,
    ElementValueContext,
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
    RecordComponentContext,
    RecordDeclarationContext,
    ThrowsTContext,
    TopLevelClassOrInterfaceDeclarationContext,
    TypeArgumentsContext,
    TypeBoundContext,
    TypeParametersContext,
    UnannTypeContext,
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
} from './type/JavaMetadata';

const createEmptyInner = (): JavaInner => ({
    classes: [],
    enums: [],
    records: [],
    interfaces: [],
    annotationInterfaces: [],
});

const getRawTextByCtx = (tokenStream: CommonTokenStream, ctx: ParserRuleContext): string => {
    if (!ctx || !ctx.start || !ctx.stop) return '';
    const startToken = ctx.start;
    const stopToken = ctx.stop;

    // 从输入流中获取原始文本
    const inputStream = tokenStream.tokenSource?.inputStream;
    if (inputStream) {
        return inputStream.getTextFromRange(startToken.start, stopToken.stop);
    }

    // 降级方案：使用 tokenStream 的 getText
    return tokenStream.getTextFromContext(ctx);
};

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

const getDimsCount = (dims: {LBRACK: (i?: number) => unknown} | null | undefined): number => {
    if (!dims) return 0;
    const leftBrackets = dims.LBRACK();
    if (Array.isArray(leftBrackets)) return leftBrackets.length;
    return leftBrackets ? 1 : 0;
};

const stripGeneric = (text: string): string => {
    let depth = 0;
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (!ch) continue;
        if (ch === '<') {
            depth += 1;
            continue;
        }
        if (ch === '>') {
            if (depth > 0) depth -= 1;
            continue;
        }
        if (depth === 0) result += ch;
    }
    return result;
};

const buildType = (
    name: string,
    typeArguments?: JavaTypeArgument[],
    arrayDimensions = 0,
    raw?: string,
): JavaType => ({
    name,
    isArray: arrayDimensions > 0,
    arrayDimensions: arrayDimensions > 0 ? arrayDimensions : undefined,
    typeArguments,
    raw,
});

const applyAdditionalDims = (type: JavaType, additionalDims: number): JavaType => {
    if (additionalDims <= 0) return type;
    const nextDims = (type.arrayDimensions || 0) + additionalDims;
    const raw = `${type.raw || type.name}${'[]'.repeat(additionalDims)}`;
    return {
        ...type,
        isArray: true,
        arrayDimensions: nextDims,
        raw,
    };
};

const parseElementValue = (ctx: ElementValueContext): string | JavaAnnotationParameter[] => {
    const arrayInitializer = ctx.elementValueArrayInitializer();
    if (arrayInitializer) {
        const values = arrayInitializer.elementValueList()?.elementValue() || [];
        return values.map((value, index) => ({
            name: String(index),
            value: parseElementValue(value),
        }));
    }

    const annotation = ctx.annotation();
    if (annotation) return annotation.getText();

    const expression = ctx.conditionalExpression();
    if (expression) return expression.getText();

    return ctx.getText() || '';
};

const parseAnnotation = (ctx: AnnotationContext): JavaAnnotation => {
    const normal = ctx.normalAnnotation();
    if (normal) {
        const pairs = normal.elementValuePairList()?.elementValuePair() || [];
        const parameters: JavaAnnotationParameter[] = pairs.map((pair) => ({
            name: pair.identifier().getText(),
            value: parseElementValue(pair.elementValue()),
        }));
        return {
            name: normal.typeName().getText(),
            parameters,
        };
    }

    const single = ctx.singleElementAnnotation();
    if (single) {
        return {
            name: single.typeName().getText(),
            parameters: [{name: 'value', value: parseElementValue(single.elementValue())}],
        };
    }

    const marker = ctx.markerAnnotation();
    if (marker) {
        return {
            name: marker.typeName().getText(),
            parameters: [],
        };
    }

    return {
        name: ctx.getText(),
        parameters: [],
    };
};

const parseAnnotations = (annotationCtxList: AnnotationContext[]): JavaAnnotation[] => {
    const result: JavaAnnotation[] = [];
    for (let i = 0; i < annotationCtxList.length; i++) {
        const annotation = annotationCtxList[i];
        if (!annotation) continue;
        result.push(parseAnnotation(annotation));
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
): {
    modifiers: string[];
    annotations: JavaAnnotation[];
} => {
    const modifiers: string[] = [];
    const annotations: JavaAnnotation[] = [];
    if (!modifierList) return {modifiers, annotations};

    for (let i = 0; i < modifierList.length; i++) {
        const modifier = modifierList[i];
        if (!modifier) continue;
        const annotation = modifier.annotation();
        if (annotation) {
            annotations.push(parseAnnotation(annotation));
            continue;
        }
        const text = modifier.getText();
        if (text) modifiers.push(text);
    }

    return {modifiers, annotations};
};

const parseWildcardTypeArgument = (wildcard: WildcardContext): JavaTypeArgument => {
    const bounds = wildcard.wildcardBounds();
    let wildcardBound: JavaTypeArgument['wildcardBound'];
    if (bounds) {
        const referenceType = bounds.referenceType();
        if (bounds.EXTENDS()) {
            wildcardBound = {kind: 'extends', type: referenceType.getText()};
        } else if (bounds.SUPER()) {
            wildcardBound = {kind: 'super', type: referenceType.getText()};
        }
    }

    return {
        kind: 'wildcard',
        name: '?',
        isArray: false,
        wildcardBound,
        raw: wildcard.getText(),
    };
};

const parseTypeArguments = (ctx: TypeArgumentsContext): JavaTypeArgument[] => {
    const result: JavaTypeArgument[] = [];
    const args = ctx.typeArgumentList().typeArgument();

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!arg) continue;

        const wildcard = arg.wildcard();
        if (wildcard) {
            result.push(parseWildcardTypeArgument(wildcard));
            continue;
        }

        const referenceType = arg.referenceType();
        if (!referenceType) {
            result.push({
                kind: 'type',
                name: arg.getText(),
                isArray: false,
                raw: arg.getText(),
            });
            continue;
        }

        const classOrInterfaceType = referenceType.classOrInterfaceType();
        if (classOrInterfaceType) {
            const typeArgsCtx = classOrInterfaceType.typeArguments();
            result.push({
                kind: 'type',
                name: stripGeneric(classOrInterfaceType.getText()),
                raw: referenceType.getText(),
                isArray: false,
                typeArguments: typeArgsCtx ? parseTypeArguments(typeArgsCtx) : undefined,
            });
            continue;
        }

        const typeVariable = referenceType.typeVariable();
        if (typeVariable) {
            result.push({
                kind: 'type',
                name: typeVariable.typeIdentifier().getText(),
                isArray: false,
                raw: typeVariable.getText(),
            });
            continue;
        }

        const arrayType = referenceType.arrayType();
        if (arrayType) {
            const dims = getDimsCount(arrayType.dims());
            const componentText =
                arrayType.classType()?.getText() ||
                arrayType.typeVariable()?.getText() ||
                arrayType.primitiveType()?.getText() ||
                arrayType.getText();

            result.push({
                kind: 'type',
                name: stripGeneric(componentText),
                raw: componentText,
                isArray: dims > 0,
                arrayDimensions: dims > 0 ? dims : undefined,
            });
            continue;
        }

        result.push({
            kind: 'type',
            name: referenceType.getText(),
            isArray: false,
            raw: referenceType.getText(),
        });
    }

    return result;
};

const parseType = (typeCtx: UnannTypeContext): JavaType => {
    const primitiveType = typeCtx.unannPrimitiveType();
    if (primitiveType) {
        const raw = primitiveType.getText();
        return buildType(raw, undefined, 0, raw);
    }

    const referenceType = typeCtx.unannReferenceType();
    if (referenceType) {
        const classOrInterfaceType = referenceType.unannClassOrInterfaceType();
        if (classOrInterfaceType) {
            const typeArgs = classOrInterfaceType.typeArguments();
            const raw = classOrInterfaceType.getText();
            return buildType(
                stripGeneric(raw),
                typeArgs ? parseTypeArguments(typeArgs) : undefined,
                0,
                raw,
            );
        }

        const typeVariable = referenceType.unannTypeVariable();
        if (typeVariable) {
            const raw = typeVariable.getText();
            return buildType(raw, undefined, 0, raw);
        }

        const arrayType = referenceType.unannArrayType();
        if (arrayType) {
            const dims = getDimsCount(arrayType.dims());
            const component =
                arrayType.unannClassOrInterfaceType()?.getText() ||
                arrayType.unannTypeVariable()?.getText() ||
                arrayType.unannPrimitiveType()?.getText() ||
                arrayType.getText();
            const componentTypeArgs = arrayType.unannClassOrInterfaceType()?.typeArguments();
            return buildType(
                stripGeneric(component),
                componentTypeArgs ? parseTypeArguments(componentTypeArgs) : undefined,
                dims,
                arrayType.getText(),
            );
        }
    }

    const raw = typeCtx.getText();
    return buildType(stripGeneric(raw), undefined, 0, raw);
};

const parseAdditionalBound = (ctx: AdditionalBoundContext): JavaTypeParameterAdditionalBound => {
    const interfaceTypeCtx = ctx.interfaceType();
    const classTypeCtx = interfaceTypeCtx.classType();

    // 获取类型标识符
    const typeIdentifier = classTypeCtx.typeIdentifier()?.getText() || '';

    // 获取包名（如果有）
    const packageName = classTypeCtx.packageName()?.getText();
    const fullTypeName = packageName ? `${packageName}.${typeIdentifier}` : typeIdentifier;

    // 获取泛型参数（如果有）
    const typeArgsCtx = classTypeCtx.typeArguments();
    const typeArguments = typeArgsCtx ? parseTypeArguments(typeArgsCtx) : undefined;

    // 构建完整类型名称（包含泛型）
    const typeNameWithGenerics = typeArguments
        ? `${fullTypeName}<${typeArguments.map((arg) => arg.raw || arg.name).join(', ')}>`
        : fullTypeName;

    return {
        name: typeIdentifier,
        raw: typeNameWithGenerics,
        typeArguments,
    };
};

const parseTypeBound = (
    ctx: TypeBoundContext | null | undefined,
): JavaTypeParameterBound | undefined => {
    if (!ctx) return;

    const typeText = ctx.classOrInterfaceType()?.getText() || ctx.typeVariable()?.getText();
    if (!typeText) return;

    const typeArguments = ctx.classOrInterfaceType()?.typeArguments();

    return {
        name: stripGeneric(typeText),
        raw: typeText,
        typeArguments: typeArguments ? parseTypeArguments(typeArguments) : undefined,
        additionalBounds: ctx.additionalBound()?.map(parseAdditionalBound),
    };
};

const parseTypeParameters = (ctx: TypeParametersContext): JavaTypeParameter[] => {
    const typeParameters: JavaTypeParameter[] = [];
    const typeParamList = ctx.typeParameterList().typeParameter();

    for (let i = 0; i < typeParamList.length; i++) {
        const typeParam = typeParamList[i];
        if (!typeParam) continue;

        const typeName = typeParam.typeIdentifier()?.getText() || '';
        const modifierList = typeParam.typeParameterModifier() || [];
        const {modifiers, annotations} = parseModifiersAndAnnotations(modifierList);

        typeParameters.push({
            name: typeName,
            modifiers,
            annotations,
            bound: parseTypeBound(typeParam.typeBound()),
        });
    }

    return typeParameters;
};

const parseThrows = (throwsCtx: ThrowsTContext | null | undefined): JavaType[] => {
    const result: JavaType[] = [];
    const exceptionTypes = throwsCtx?.exceptionTypeList()?.exceptionType() || [];
    for (let i = 0; i < exceptionTypes.length; i++) {
        const exceptionType = exceptionTypes[i];
        if (!exceptionType) continue;
        const raw = exceptionType.getText();
        result.push(buildType(stripGeneric(raw), undefined, 0, raw));
    }
    return result;
};

const parseFieldLike = (
    variableDeclaratorList: VariableDeclaratorListContext,
    typeCtx: UnannTypeContext,
    modifiers: string[],
    annotations: JavaAnnotation[],
    comments: string[],
): JavaField[] => {
    const result: JavaField[] = [];

    const baseType = parseType(typeCtx);
    const declarators = variableDeclaratorList?.variableDeclarator() || [];

    for (let i = 0; i < declarators.length; i++) {
        const declarator = declarators[i];
        if (!declarator) continue;
        const idCtx = declarator.variableDeclaratorId();
        const name = idCtx?.identifier()?.getText();
        if (!name) continue;
        const extraDims = getDimsCount(idCtx?.dims());

        result.push({
            name,
            comments,
            type: applyAdditionalDims(baseType, extraDims),
            modifiers: [...modifiers],
            annotations: [...annotations],
        });
    }

    return result;
};

const parseField = (ctx: FieldDeclarationContext, tokenStream: CommonTokenStream): JavaField[] => {
    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.fieldModifier());
    return parseFieldLike(
        ctx.variableDeclaratorList(),
        ctx.unannType(),
        modifiers,
        annotations,
        getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
    );
};

const parseConstantDeclaration = (
    ctx: ConstantDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaField[] => {
    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.constantModifier());
    return parseFieldLike(
        ctx.variableDeclaratorList(),
        ctx.unannType(),
        modifiers,
        annotations,
        getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
    );
};

const parseMethodParameters = (
    formalParameterList: FormalParameterListContext | null | undefined,
    tokenStream: CommonTokenStream,
): JavaMethodParameter[] => {
    const parameters: JavaMethodParameter[] = [];
    const formalParams: FormalParameterContext[] = formalParameterList?.formalParameter() || [];

    for (let i = 0; i < formalParams.length; i++) {
        const param = formalParams[i];
        if (!param) continue;

        const variableArity = param.variableArityParameter();
        if (variableArity) {
            const baseType = parseType(variableArity.unannType());
            const finalType = applyAdditionalDims(baseType, 1);
            const {annotations: modifierAnnotations} = parseModifiersAndAnnotations(
                param.variableModifier(),
            );
            const inlineVarArgAnnotations = parseAnnotations(variableArity.annotation() || []);
            parameters.push({
                name: variableArity.identifier().getText(),
                comments: getCommentsBeforeToken(tokenStream, variableArity.start?.tokenIndex),
                type: finalType,
                annotations: [...modifierAnnotations, ...inlineVarArgAnnotations],
                isVarArgs: true,
            });
            continue;
        }

        const typeCtx = param.unannType();
        if (!typeCtx) continue;
        const declaratorId = param.variableDeclaratorId();
        const name = declaratorId?.identifier()?.getText();
        if (!name) continue;
        const extraDims = getDimsCount(declaratorId?.dims());
        const {annotations} = parseModifiersAndAnnotations(param.variableModifier());

        parameters.push({
            name,
            comments: getCommentsBeforeToken(tokenStream, param.start?.tokenIndex),
            type: applyAdditionalDims(parseType(typeCtx), extraDims),
            annotations,
        });
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
    const {modifiers, annotations} = parseModifiersAndAnnotations(modifierNodes);
    const headerAnnotations = parseAnnotations(methodHeader.annotation() || []);

    const resultCtx = methodHeader.result();
    let returnType: JavaType | 'void' = 'void';
    if (!resultCtx.VOID()) {
        const returnTypeCtx = resultCtx.unannType();
        if (returnTypeCtx) {
            returnType = applyAdditionalDims(
                parseType(returnTypeCtx),
                getDimsCount(methodDeclarator.dims()),
            );
        }
    }

    const parameters = parseMethodParameters(methodDeclarator.formalParameterList(), tokenStream);

    const typeParametersCtx = methodHeader.typeParameters();
    const typeParameters = typeParametersCtx ? parseTypeParameters(typeParametersCtx) : [];

    const throwsTypes = parseThrows(methodHeader.throwsT());

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
    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.constructorModifier());

    const parameters = parseMethodParameters(
        constructorDeclarator.formalParameterList(),
        tokenStream,
    );

    const typeParametersCtx = constructorDeclarator.typeParameters();
    const typeParameters = typeParametersCtx ? parseTypeParameters(typeParametersCtx) : [];

    const throwsTypes = parseThrows(ctx.throwsT());

    return {
        name,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        parameters,
        modifiers,
        annotations,
        typeParameters,
        throws: throwsTypes,
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

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.classModifier());

    const typeParametersCtx = ctx.typeParameters();
    const typeParameters = typeParametersCtx ? parseTypeParameters(typeParametersCtx) : [];

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
        );
        const inlineAnnotations = parseAnnotations(variableArity.annotation() || []);
        const type = applyAdditionalDims(parseType(variableArity.unannType()), 1);
        return {
            name: variableArity.identifier().getText(),
            comments: getCommentsBeforeToken(tokenStream, variableArity.start?.tokenIndex),
            type,
            modifiers,
            annotations: [...annotations, ...inlineAnnotations],
            isVarArgs: true,
        };
    }

    const typeCtx = ctx.unannType();
    const idCtx = ctx.identifier();
    if (!typeCtx || !idCtx) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.recordComponentModifier());
    return {
        name: idCtx.getText(),
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        type: parseType(typeCtx),
        modifiers,
        annotations,
    };
};

const parseCompactConstructor = (
    ctx: CompactConstructorDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaConstructor => {
    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.constructorModifier());
    return {
        name: ctx.simpleTypeName()?.typeIdentifier().Identifier()?.getText() || '',
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        parameters: [],
        modifiers,
        annotations,
        typeParameters: [],
        throws: [],
    };
};

const parseRecord = (
    ctx: RecordDeclarationContext,
    tokenStream: CommonTokenStream,
): JavaRecord | undefined => {
    const recordName =
        ctx.typeIdentifier()?.Identifier()?.getText() || ctx.typeIdentifier()?.getText();
    if (!recordName) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.classModifier());

    const typeParametersCtx = ctx.typeParameters();
    const typeParameters = typeParametersCtx ? parseTypeParameters(typeParametersCtx) : [];

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
    for (let i = 0; i < bodyDeclarations.length; i++) {
        const recordBodyDecl = bodyDeclarations[i];
        if (!recordBodyDecl) continue;

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

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.interfaceModifier());

    const interfaces: string[] = [];
    const interfaceList = ctx.interfaceExtends()?.interfaceTypeList()?.interfaceType() || [];
    for (let i = 0; i < interfaceList.length; i++) {
        const text = interfaceList[i]?.getText();
        if (text) interfaces.push(text);
    }

    const typeParametersCtx = ctx.typeParameters();
    const typeParameters = typeParametersCtx ? parseTypeParameters(typeParametersCtx) : [];

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

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.classModifier());

    const interfaces: string[] = [];
    const interfaceList = ctx.classImplements()?.interfaceTypeList()?.interfaceType() || [];
    for (let i = 0; i < interfaceList.length; i++) {
        const text = interfaceList[i]?.getText();
        if (text) interfaces.push(text);
    }

    const enumItems: JavaEnumItem[] = [];
    const bodyCtx = ctx.enumBody();
    const constantList = bodyCtx?.enumConstantList()?.enumConstant() || [];
    for (let i = 0; i < constantList.length; i++) {
        const constant = constantList[i];
        if (!constant) continue;

        const {modifiers: enumModifiers, annotations: enumAnnotations} =
            parseModifiersAndAnnotations(constant.enumConstantModifier());
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
    );
    const type = parseType(elementDeclareCtx.unannType());

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

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.interfaceModifier());
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

    private tokenStream: CommonTokenStream;

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
