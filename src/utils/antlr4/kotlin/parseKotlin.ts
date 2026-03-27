import {CharStream, CommonTokenStream, ParseTreeWalker} from 'antlr4ng';
import {
    KotlinParser,
    ClassDeclarationContext,
    FunctionDeclarationContext,
    PropertyDeclarationContext,
    ObjectDeclarationContext,
    CompanionObjectContext,
    EnumClassBodyContext,
    EnumEntryContext,
    TypeAliasContext,
    ImportHeaderContext,
    PackageHeaderContext,
    FileAnnotationContext,
    ClassBodyContext,
    ClassMemberDeclarationContext,
    PrimaryConstructorContext,
    SecondaryConstructorContext,
    TypeContext,
    TypeParametersContext,
    DelegationSpecifiersContext,
    GetterContext,
    SetterContext,
    TypeArgumentsContext,
    TypeReferenceContext,
    UserTypeContext,
    TopLevelObjectContext,
    ClassParametersContext,
    FunctionValueParametersContext,
    TypeConstraintsContext,
    AnnotationsContext,
    ModifierContext,
    AnnotationContext,
    AnnotationListContext,
    UnescapedAnnotationContext,
    ReceiverTypeContext,
    ValueArgumentContext,
} from './__generated/KotlinParser';
import {KotlinParserListener} from './__generated/KotlinParserListener';
import {KotlinLexer} from './__generated/KotlinLexer';
import type {
    KotlinAnnotation,
    KotlinClass,
    KotlinEnum,
    KotlinEnumEntry,
    KotlinFile,
    KotlinFunction,
    KotlinFunctionParameter,
    KotlinImport,
    KotlinInner,
    KotlinObject,
    KotlinProperty,
    KotlinType,
    KotlinTypeAlias,
    KotlinTypeArgument,
    KotlinTypeParameter,
    KotlinTypeParameterBound,
    KotlinClassParameter,
    KotlinGetter,
    KotlinSetter,
    KotlinSecondaryConstructor,
    KotlinPrimaryConstructor,
    DelegationSpecifier,
    KotlinAnnotationParameter,
} from './type/KotlinMetadata';
import {getRawTextByCtx} from '@/utils/antlr4/common/Antlr4Common.ts';

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
                hiddenToken.type === KotlinLexer.LineComment ||
                hiddenToken.type === KotlinLexer.DelimitedComment
            ) {
                if (hiddenToken.text) comments.push(hiddenToken.text);
            }
        }
    }

    return comments;
};

const createEmptyInner = (): KotlinInner => ({
    classes: [],
    objects: [],
    enums: [],
    typeAliases: [],
});

const parseValueArguments = (
    valueArgs: ValueArgumentContext[],
    tokenStream: CommonTokenStream,
): {
    name: string | undefined;
    value: string;
}[] => {
    const result: {
        name: string | undefined;
        value: string;
    }[] = [];

    for (const arg of valueArgs) {
        if (!arg) continue;

        const paramName = arg.simpleIdentifier()?.getText();
        const expression = arg.expression();
        const value = expression ? getRawTextByCtx(tokenStream, expression) : '';

        result.push({
            name: paramName,
            value: value,
        });
    }

    return result;
};

const parseUnescapedAnnotation = (
    ctx: UnescapedAnnotationContext,
    tokenStream: CommonTokenStream,
): KotlinAnnotation => {
    const raw = getRawTextByCtx(tokenStream, ctx);

    const parameters: KotlinAnnotationParameter[] = [];

    const identifier = ctx.identifier();
    let name = identifier.getText();
    if (name.startsWith('@')) name = name.slice(1);

    // 解析类型参数
    const typeArgumentsCtx = ctx.typeArguments();
    const typeArguments = typeArgumentsCtx ? parseTypeArguments(typeArgumentsCtx, tokenStream) : [];

    // 解析值参数
    const valueArgumentsCtx = ctx.valueArguments();
    if (valueArgumentsCtx) {
        parameters.push(...parseValueArguments(valueArgumentsCtx.valueArgument(), tokenStream));
    }

    return {
        raw,
        name,
        typeArguments,
        parameters,
    };
};

const parseAnnotation = (
    ctx: AnnotationContext,
    tokenStream: CommonTokenStream,
): KotlinAnnotation => {
    const raw = getRawTextByCtx(tokenStream, ctx);

    // 检查是否是带 use-site target 的注解
    const useSiteTarget = ctx.annotationUseSiteTarget();
    const target = useSiteTarget?.getText();

    const unescapedAnnotationCtx = ctx.unescapedAnnotation();

    if (unescapedAnnotationCtx) {
        const annotation = parseUnescapedAnnotation(unescapedAnnotationCtx, tokenStream);
        return {
            ...annotation,
            raw,
            target,
        };
    }

    // 处理标签引用形式的注解 (@LabelReference)
    const labelRef = ctx.LabelReference();
    if (labelRef) {
        let name = labelRef.getText();
        if (name.startsWith('@')) name = name.slice(1);

        const typeArgumentsCtx = ctx.typeArguments();
        const typeArguments = typeArgumentsCtx
            ? parseTypeArguments(typeArgumentsCtx, tokenStream)
            : [];

        const valueArgumentsCtx = ctx.valueArguments();
        const parameters = valueArgumentsCtx
            ? parseValueArguments(valueArgumentsCtx.valueArgument(), tokenStream)
            : [];

        return {
            raw,
            target,
            name,
            typeArguments,
            parameters,
        };
    }

    throw new Error(`unknown annotation type: ${JSON.stringify(ctx)}`);
};

const parseAnnotationList = (
    ctx: AnnotationListContext,
    tokenStream: CommonTokenStream,
): KotlinAnnotation[] => {
    const result: KotlinAnnotation[] = [];

    const useSiteTarget = ctx.annotationUseSiteTarget();
    const target = useSiteTarget?.getText();

    // 获取所有的 unescapedAnnotation
    const annotations = ctx.unescapedAnnotation() || [];
    for (const annotation of annotations) {
        if (!annotation) continue;

        const parsed = parseUnescapedAnnotation(annotation, tokenStream);
        result.push({
            ...parsed,
            target,
        });
    }

    return result;
};

const parseModifiersAndAnnotations = (
    modifierList:
        | {
              annotations?: () => AnnotationsContext[];
              modifier?: () => ModifierContext[];
          }
        | null
        | undefined,
    tokenStream: CommonTokenStream,
): {
    modifiers: string[];
    annotations: KotlinAnnotation[];
} => {
    const modifiers: string[] = [];
    const annotations: KotlinAnnotation[] = [];
    if (!modifierList) return {modifiers, annotations};

    const annotationsCtxList = modifierList.annotations?.() || [];
    for (const annotationsCtx of annotationsCtxList) {
        const annotationCtx = annotationsCtx.annotation();
        if (annotationCtx) {
            annotations.push(parseAnnotation(annotationCtx, tokenStream));
        }

        const annotationList = annotationsCtx.annotationList();
        if (annotationList) {
            annotations.push(...parseAnnotationList(annotationList, tokenStream));
        }
    }

    const modifierListItems = modifierList.modifier?.() || [];
    for (const modifier of modifierListItems) {
        const text = modifier.getText();
        if (text) modifiers.push(text);
    }

    return {modifiers, annotations};
};

const parseTypeArguments = (
    ctx: TypeArgumentsContext,
    tokenStream: CommonTokenStream,
): KotlinTypeArgument[] => {
    const result: KotlinTypeArgument[] = [];
    const projections = ctx.typeProjection() || [];

    for (const proj of projections) {
        if (!proj) continue;

        // 检查是否是星投影
        if (proj.MULT()) {
            result.push({
                raw: '*',
                kind: 'star',
                name: '*',
            });
            continue;
        }

        const typeCtx = proj.type();
        if (!typeCtx) continue;

        const varianceAnnotationList =
            proj.typeProjectionModifierList()?.varianceAnnotation() || [];
        const variance = varianceAnnotationList.some((v) => v.IN())
            ? 'in'
            : varianceAnnotationList.some((v) => v.OUT())
              ? 'out'
              : undefined;

        const type = parseType(typeCtx, tokenStream);
        result.push({
            raw: type.raw,
            kind: 'type',
            name: type.name,
            typeArguments: type.typeArguments,
            variance,
        });
    }

    return result;
};

const parseUserType = (userType: UserTypeContext, tokenStream: CommonTokenStream): KotlinType => {
    const simpleUserTypes = userType.simpleUserType() || [];
    const parts: string[] = [];
    let typeArguments: KotlinTypeArgument[] | undefined;

    for (const simple of simpleUserTypes) {
        if (!simple) continue;

        const identifier = simple.simpleIdentifier().getText();
        if (identifier) parts.push(identifier);

        const typeArgsCtx = simple.typeArguments();
        if (typeArgsCtx) {
            typeArguments = parseTypeArguments(typeArgsCtx, tokenStream);
        }
    }

    const name = parts.join('.');
    return {
        raw: getRawTextByCtx(tokenStream, userType),
        name: name,
        typeArguments,
        isNullable: false,
        isFunctionType: false,
    };
};

const parseTypeFromReference = (
    typeRef: TypeReferenceContext,
    tokenStream: CommonTokenStream,
): KotlinType => {
    if (typeRef.DYNAMIC()) {
        return {
            raw: getRawTextByCtx(tokenStream, typeRef),
            name: 'dynamic',
            typeArguments: undefined,
            isNullable: false,
            isFunctionType: false,
        };
    }

    const userType = typeRef.userType();
    if (userType) {
        return parseUserType(userType, tokenStream);
    }

    const nested = typeRef.typeReference();
    if (nested) {
        return parseTypeFromReference(nested, tokenStream);
    }

    throw new Error(`Unsupported type: ${JSON.stringify(typeRef)}`);
};

const parseType = (
    typeCtx: TypeContext | ReceiverTypeContext,
    tokenStream: CommonTokenStream,
): KotlinType => {
    const raw = getRawTextByCtx(tokenStream, typeCtx);

    // 检查是否是可空类型
    const nullableCtx = typeCtx.nullableType();
    if (nullableCtx) {
        const typeRef = nullableCtx.typeReference();
        if (typeRef) {
            const baseType = parseTypeFromReference(typeRef, tokenStream);
            return {
                ...baseType,
                isNullable: true,
                raw,
            };
        }

        const parenthesizedType = nullableCtx.parenthesizedType()?.type();
        if (parenthesizedType) {
            const baseType = parseType(parenthesizedType, tokenStream);
            return {
                ...baseType,
                isNullable: true,
                raw,
            };
        }
    }

    // 检查是否是函数类型
    const functionTypeCtx = 'functionType' in typeCtx ? typeCtx.functionType() : null;
    if (functionTypeCtx) {
        return {
            raw,
            name: raw,
            isNullable: false,
            isFunctionType: true,
        };
    }

    // 普通类型引用
    const typeRef = typeCtx.typeReference();
    if (typeRef) {
        return parseTypeFromReference(typeRef, tokenStream);
    }

    const parenthesized = typeCtx.parenthesizedType();
    if (parenthesized) {
        return parseType(parenthesized.type(), tokenStream);
    }

    throw new Error(`Unsupported type: ${JSON.stringify(typeCtx)}`);
};

const parseTypeParameterBound = (
    typeCtx: TypeContext | null | undefined,
    tokenStream: CommonTokenStream,
): KotlinTypeParameterBound | undefined => {
    if (!typeCtx) return;

    const type = parseType(typeCtx, tokenStream);
    return {
        raw: type.raw || type.name,
        name: type.name,
        typeArguments: type.typeArguments,
    };
};

const parseTypeParameters = (
    ctx: TypeParametersContext | null | undefined,
    tokenStream: CommonTokenStream,
): KotlinTypeParameter[] => {
    if (!ctx) return [];

    const result: KotlinTypeParameter[] = [];
    const params = ctx.typeParameter() || [];

    for (const param of params) {
        if (!param) continue;

        const name = param.simpleIdentifier()?.getText();
        if (!name) continue;

        const modifierList = param.modifierList();
        const {modifiers, annotations} = parseModifiersAndAnnotations(modifierList, tokenStream);

        const isReified = modifiers.some((m) => m === 'reified');

        result.push({
            name,
            modifiers,
            annotations,
            bound: parseTypeParameterBound(param.type(), tokenStream),
            reified: isReified,
        });
    }

    return result;
};

const parseTypeConstraints = (
    ctx: TypeConstraintsContext | null | undefined,
    tokenStream: CommonTokenStream,
): KotlinTypeParameter[] => {
    if (!ctx) return [];

    const result: KotlinTypeParameter[] = [];
    const constraints = ctx.typeConstraint() || [];

    for (const constraint of constraints) {
        if (!constraint) continue;

        const name = constraint.simpleIdentifier().getText();
        const type = parseType(constraint.type(), tokenStream);

        result.push({
            name,
            modifiers: [],
            annotations: [],
            bound: {
                name: type.name,
                raw: type.raw || type.name,
            },
        });
    }

    return result;
};

const parseFunctionParameters = (
    ctx: FunctionValueParametersContext | null | undefined,
    tokenStream: CommonTokenStream,
): KotlinFunctionParameter[] => {
    if (!ctx) return [];

    const result: KotlinFunctionParameter[] = [];
    const params = ctx.functionValueParameter() || [];

    for (const param of params) {
        if (!param) continue;

        const parameterCtx = param.parameter();
        if (!parameterCtx) continue;

        const name = parameterCtx.simpleIdentifier().getText();
        const type = parseType(parameterCtx.type(), tokenStream);
        const {modifiers, annotations} = parseModifiersAndAnnotations(
            param.modifierList(),
            tokenStream,
        );

        const isVarArg = modifiers.some((m) => m === 'vararg');
        const defaultValueCtx = param.expression();
        const defaultValue = defaultValueCtx
            ? getRawTextByCtx(tokenStream, defaultValueCtx)
            : undefined;

        result.push({
            name,
            comments: getCommentsBeforeToken(tokenStream, param.start?.tokenIndex),
            type,
            annotations,
            isVarArg,
            defaultValue,
        });
    }

    return result;
};

const parseClassParameters = (
    ctx: ClassParametersContext | null | undefined,
    tokenStream: CommonTokenStream,
): KotlinClassParameter[] => {
    if (!ctx) return [];

    const result: KotlinClassParameter[] = [];
    const params = ctx.classParameter() || [];

    for (const param of params) {
        if (!param) continue;

        const name = param.simpleIdentifier().getText();
        const type = parseType(param.type(), tokenStream);
        const {modifiers, annotations} = parseModifiersAndAnnotations(
            param.modifierList(),
            tokenStream,
        );

        const isVal = param.VAL() !== null;
        const isVar = param.VAR() !== null;
        const defaultValueCtx = param.expression();
        const defaultValue = defaultValueCtx
            ? getRawTextByCtx(tokenStream, defaultValueCtx)
            : undefined;

        result.push({
            name,
            comments: getCommentsBeforeToken(tokenStream, param.start?.tokenIndex),
            type,
            modifiers,
            annotations,
            isVal,
            isVar,
            defaultValue,
        });
    }

    return result;
};

const parsePrimaryConstructor = (
    ctx: PrimaryConstructorContext | null | undefined,
    properties: KotlinProperty[],
    tokenStream: CommonTokenStream,
): KotlinPrimaryConstructor | undefined => {
    if (!ctx) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.modifierList(), tokenStream);
    const parameters = parseClassParameters(ctx.classParameters(), tokenStream);
    for (const parameter of parameters) {
        if (!parameter.isVal && !parameter.isVar) continue;
        properties.push({
            name: parameter.name,
            comments: parameter.comments,
            type: parameter.type,
            modifiers: parameter.modifiers,
            annotations: parameter.annotations,
            isVar: parameter.isVar,
            isVal: parameter.isVal,
            initializer: parameter.defaultValue,
        });
    }

    return {
        name: 'constructor',
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        parameters,
        modifiers,
        annotations,
    };
};

const parseSecondaryConstructor = (
    ctx: SecondaryConstructorContext,
    tokenStream: CommonTokenStream,
): KotlinSecondaryConstructor => {
    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.modifierList(), tokenStream);
    const parameters = parseFunctionParameters(ctx.functionValueParameters(), tokenStream);

    let delegateCall: 'this' | 'super' | undefined;
    let delegateArguments:
        | {
              name: string | undefined;
              value: string;
          }[]
        | undefined;

    const delegationCtx = ctx.constructorDelegationCall();
    if (delegationCtx) {
        if (delegationCtx.THIS()) {
            delegateCall = 'this';
        } else if (delegationCtx.SUPER()) {
            delegateCall = 'super';
        }

        const valueArgs = delegationCtx.valueArguments()?.valueArgument() || [];
        delegateArguments = parseValueArguments(valueArgs, tokenStream);
    }

    return {
        name: 'constructor',
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        parameters,
        modifiers,
        annotations,
        delegateCall,
        delegateArguments,
    };
};

const parseGetter = (
    ctx: GetterContext | null | undefined,
    tokenStream: CommonTokenStream,
): KotlinGetter | undefined => {
    if (!ctx) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.modifierList(), tokenStream);
    const body = getRawTextByCtx(tokenStream, ctx);

    return {
        modifiers,
        annotations,
        body,
    };
};

const parseSetter = (
    ctx: SetterContext | null | undefined,
    tokenStream: CommonTokenStream,
): KotlinSetter | undefined => {
    if (!ctx) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.modifierList(), tokenStream);

    let parameterName = ctx.simpleIdentifier()?.getText();

    const paramCtx = ctx.parameter();
    if (paramCtx) {
        parameterName = paramCtx.simpleIdentifier()?.getText();
    }
    if (!parameterName) return;

    const functionBody = ctx.functionBody();
    const body = functionBody ? getRawTextByCtx(tokenStream, functionBody) : undefined;

    return {
        parameterName,
        modifiers,
        annotations,
        body,
    };
};

const parseProperty = (
    ctx: PropertyDeclarationContext,
    tokenStream: CommonTokenStream,
): KotlinProperty[] => {
    const result: KotlinProperty[] = [];

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.modifierList(), tokenStream);
    const isVar = ctx.VAR() !== null;
    const isVal = ctx.VAL() !== null;

    const receiverTypeCtx = ctx.type();
    const receiverType = receiverTypeCtx ? parseType(receiverTypeCtx, tokenStream) : undefined;

    const initializerExpression = ctx.expression();
    const initializer = initializerExpression
        ? getRawTextByCtx(tokenStream, initializerExpression)
        : undefined;

    // 解析变量声明
    const multiVarDecl = ctx.multiVariableDeclaration();
    const singleVarDecl = ctx.variableDeclaration();

    const declarations: {name: string; type: KotlinType}[] = [];

    if (multiVarDecl) {
        const vars = multiVarDecl.variableDeclaration() || [];
        for (const v of vars) {
            const name = v.simpleIdentifier().getText();
            const typeCtx = v.type();
            if (!typeCtx) continue;
            const vType = parseType(typeCtx, tokenStream);
            declarations.push({name, type: vType});
        }
    } else if (singleVarDecl) {
        const name = singleVarDecl.simpleIdentifier().getText();
        const typeCtx = singleVarDecl.type();
        if (typeCtx) {
            const vType = parseType(typeCtx, tokenStream);
            declarations.push({name, type: vType});
        }
    }

    const getterCtx = ctx.getter();
    const setterCtx = ctx.setter();

    for (const decl of declarations) {
        result.push({
            name: decl.name,
            comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
            type: decl.type,
            modifiers,
            annotations,
            isVar,
            isVal,
            initializer,
            receiverType,
            getter: parseGetter(getterCtx, tokenStream),
            setter: parseSetter(setterCtx, tokenStream),
        });
    }

    return result;
};

const parseFunction = (
    ctx: FunctionDeclarationContext,
    tokenStream: CommonTokenStream,
): KotlinFunction => {
    const {modifiers, annotations} = parseModifiersAndAnnotations(
        ctx.functionModifierList(),
        tokenStream,
    );

    const name = ctx.identifier()?.getText() || '';

    // 解析接收类型
    const receiverTypeCtx = ctx.receiverType();
    const receiverType = receiverTypeCtx ? parseType(receiverTypeCtx, tokenStream) : undefined;

    // 解析返回类型
    const returnTypeCtx = ctx.type();
    const returnType = returnTypeCtx ? parseType(returnTypeCtx, tokenStream) : undefined;

    // 解析参数
    const parameters = parseFunctionParameters(ctx.functionValueParameters(), tokenStream);

    // 解析类型参数
    const typeParametersCtx = ctx.typeParameters();
    const typeParameters = parseTypeParameters(typeParametersCtx, tokenStream);

    // 解析类型约束
    const typeConstraintsCtx = ctx.typeConstraints();
    const additionalTypeParams = parseTypeConstraints(typeConstraintsCtx, tokenStream);
    typeParameters.push(...additionalTypeParams);

    // 解析函数体
    const functionBody = ctx.functionBody();
    let body: string | undefined;
    let isExpressionBody = false;

    if (functionBody) {
        const block = functionBody.block();
        const expr = functionBody.expression();
        if (block) {
            body = block.getText();
        } else if (expr) {
            body = expr.getText();
            isExpressionBody = true;
        }
    }

    return {
        name,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        returnType,
        parameters,
        modifiers,
        annotations,
        typeParameters,
        receiverType,
        body,
        isExpressionBody,
    };
};

const parseDelegationSpecifiers = (
    ctx: DelegationSpecifiersContext | null | undefined,
    tokenStream: CommonTokenStream,
): DelegationSpecifier[] => {
    const result: DelegationSpecifier[] = [];

    if (!ctx) return result;

    const specifiers = ctx.delegationSpecifier() || [];
    for (const specifier of specifiers) {
        const typeCtx =
            specifier.userType() ??
            specifier.constructorInvocation()?.userType() ??
            specifier.explicitDelegation()?.userType();
        if (!typeCtx) {
            throw new Error(`Unsupported delegation specifier: ${JSON.stringify(specifier)}`);
        }
        const type = parseUserType(typeCtx, tokenStream);

        const delegationTypeCtx =
            specifier.explicitDelegation()?.explicitDelegationTarget().userType() ??
            specifier
                .explicitDelegation()
                ?.explicitDelegationTarget()
                .constructorInvocation()
                ?.userType();
        const delegationType = delegationTypeCtx
            ? parseUserType(delegationTypeCtx, tokenStream)
            : undefined;

        result.push({
            raw: getRawTextByCtx(tokenStream, specifier),
            type,
            delegationType,
        });
    }

    return result;
};

const parseEnumEntry = (ctx: EnumEntryContext, tokenStream: CommonTokenStream): KotlinEnumEntry => {
    const name = ctx.simpleIdentifier().getText();
    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx, tokenStream);

    // 解析构造函数参数
    const arguments_: string[] = [];
    const valueArgs = ctx.valueArguments()?.valueArgument() || [];
    for (const arg of valueArgs) {
        const argText = arg?.expression()?.getText();
        if (argText) arguments_.push(argText);
    }

    // 解析类体
    const classBody = ctx.classBody();

    const properties: KotlinProperty[] = [];
    const functions: KotlinFunction[] = [];
    const constructors: KotlinSecondaryConstructor[] = [];
    const classBodyInner = createEmptyInner();

    if (classBody) {
        parseClassBody(classBody, classBodyInner, properties, functions, constructors, tokenStream);
    }

    return {
        name,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        arguments: arguments_,
        modifiers,
        annotations,
        properties,
        functions,
        constructors,
        classBody: classBodyInner,
    };
};

const parseInnerClassDeclaration = (
    memberDecl: ClassMemberDeclarationContext,
    inner: KotlinInner,
    tokenStream: CommonTokenStream,
) => {
    const classDecl = memberDecl.classDeclaration();
    if (classDecl) {
        const kotlinClass = parseClass(classDecl, tokenStream);
        if (kotlinClass) inner.classes.push(kotlinClass);
    }

    const objectDecl = memberDecl.objectDeclaration();
    if (objectDecl) {
        const kotlinObject = parseObject(objectDecl, tokenStream);
        if (kotlinObject) inner.objects.push(kotlinObject);
    }

    const companionObjDecl = memberDecl.companionObject();
    if (companionObjDecl) {
        const kotlinObject = parseCompanionObject(companionObjDecl, tokenStream);
        if (kotlinObject) inner.objects.push(kotlinObject);
    }

    const enumDecl = memberDecl.classDeclaration();
    if (enumDecl && enumDecl.enumClassBody()) {
        // 内部枚举类较少见，可根据需要实现
    }

    const typeAliasDecl = memberDecl.typeAlias();
    if (typeAliasDecl) {
        const typeAlias = parseTypeAlias(typeAliasDecl, tokenStream);
        if (typeAlias) inner.typeAliases.push(typeAlias);
    }
};

const parseClassBody = (
    ctx: ClassBodyContext | null | undefined,
    inner: KotlinInner,
    properties: KotlinProperty[],
    functions: KotlinFunction[],
    constructors: KotlinSecondaryConstructor[],
    tokenStream: CommonTokenStream,
) => {
    if (!ctx) return;

    const members = ctx.classMemberDeclaration() || [];
    for (const member of members) {
        if (!member) continue;

        // 属性声明
        const propDecl = member.propertyDeclaration();
        if (propDecl) {
            properties.push(...parseProperty(propDecl, tokenStream));
        }

        // 函数声明
        const funcDecl = member.functionDeclaration();
        if (funcDecl) {
            functions.push(parseFunction(funcDecl, tokenStream));
        }

        // 次构造函数
        const secConstructor = member.secondaryConstructor();
        if (secConstructor) {
            constructors.push(parseSecondaryConstructor(secConstructor, tokenStream));
        }

        // 内部类声明
        parseInnerClassDeclaration(member, inner, tokenStream);
    }
};

const parseClass = (ctx: ClassDeclarationContext, tokenStream: CommonTokenStream): KotlinClass => {
    const className = ctx.simpleIdentifier().getText();

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.modifierList(), tokenStream);

    const properties: KotlinProperty[] = [];
    const functions: KotlinFunction[] = [];
    const secondaryConstructors: KotlinSecondaryConstructor[] = [];
    const inner = createEmptyInner();

    // 解析类型参数
    const typeParametersCtx = ctx.typeParameters();
    const typeParameters = parseTypeParameters(typeParametersCtx, tokenStream);

    // 解析主构造函数
    const primaryConstructor = parsePrimaryConstructor(
        ctx.primaryConstructor(),
        properties,
        tokenStream,
    );

    // 解析继承和代理
    const delegationSpecifiers = parseDelegationSpecifiers(ctx.delegationSpecifiers(), tokenStream);

    // 解析类体
    parseClassBody(
        ctx.classBody(),
        inner,
        properties,
        functions,
        secondaryConstructors,
        tokenStream,
    );

    return {
        name: className,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        modifiers,
        annotations,
        properties,
        functions,
        primaryConstructor,
        secondaryConstructors,
        delegationSpecifiers,
        typeParameters,
        inner,
        isInterface: ctx.INTERFACE() !== null,
        isSealed: modifiers.includes('sealed'),
        isData: modifiers.includes('data'),
        isAnnotation: modifiers.includes('annotation'),
    };
};

const parseObject = (
    ctx: ObjectDeclarationContext,
    tokenStream: CommonTokenStream,
): KotlinObject => {
    const objectName = ctx.simpleIdentifier().getText();

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.modifierList(), tokenStream);

    const delegationSpecifiers = parseDelegationSpecifiers(ctx.delegationSpecifiers(), tokenStream);

    const properties: KotlinProperty[] = [];
    const functions: KotlinFunction[] = [];
    const inner = createEmptyInner();

    parseClassBody(ctx.classBody(), inner, properties, functions, [], tokenStream);

    return {
        name: objectName,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        modifiers,
        annotations,
        properties,
        functions,
        delegationSpecifiers,
        inner,
        isCompanion: false,
    };
};

const parseCompanionObject = (
    ctx: CompanionObjectContext,
    tokenStream: CommonTokenStream,
): KotlinObject | undefined => {
    const objectName = ctx.simpleIdentifier()?.getText() || 'Companion';
    const modifiers = [];
    const annotations = [];

    for (const modifierList of ctx.modifierList() || []) {
        const result = parseModifiersAndAnnotations(modifierList, tokenStream);
        modifiers.push(...result.modifiers);
        annotations.push(...result.annotations);
    }

    const delegationSpecifiers = parseDelegationSpecifiers(ctx.delegationSpecifiers(), tokenStream);

    const properties: KotlinProperty[] = [];
    const functions: KotlinFunction[] = [];
    const constructors: KotlinSecondaryConstructor[] = [];
    const inner = createEmptyInner();

    parseClassBody(ctx.classBody(), inner, properties, functions, constructors, tokenStream);

    return {
        name: objectName,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        modifiers,
        annotations,
        properties,
        functions,
        delegationSpecifiers,
        inner,
        isCompanion: true,
    };
};

const parseEnum = (
    ctx: ClassDeclarationContext,
    enumClassBody: EnumClassBodyContext,
    tokenStream: CommonTokenStream,
): KotlinEnum => {
    const enumName = ctx.simpleIdentifier().getText();

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.modifierList(), tokenStream);

    const properties: KotlinProperty[] = [];
    const functions: KotlinFunction[] = [];
    const secondaryConstructors: KotlinSecondaryConstructor[] = [];
    const inner = createEmptyInner();

    const enumEntries: KotlinEnumEntry[] = [];

    // 解析枚举项
    const entriesCtx = enumClassBody.enumEntries()?.enumEntry() || [];
    for (const entry of entriesCtx) {
        if (entry) {
            enumEntries.push(parseEnumEntry(entry, tokenStream));
        }
    }

    // 解析主构造函数
    const primaryConstructor = parsePrimaryConstructor(
        ctx.primaryConstructor(),
        properties,
        tokenStream,
    );

    // 解析继承关系
    const delegationSpecifiers = parseDelegationSpecifiers(ctx.delegationSpecifiers(), tokenStream);

    // 解析枚举体中的成员
    const members = enumClassBody.classMemberDeclaration() || [];
    for (const member of members) {
        if (!member) continue;

        const propDecl = member.propertyDeclaration();
        if (propDecl) properties.push(...parseProperty(propDecl, tokenStream));

        const funcDecl = member.functionDeclaration();
        if (funcDecl) functions.push(parseFunction(funcDecl, tokenStream));

        const secConstructor = member.secondaryConstructor();
        if (secConstructor)
            secondaryConstructors.push(parseSecondaryConstructor(secConstructor, tokenStream));

        parseInnerClassDeclaration(member, inner, tokenStream);
    }

    return {
        name: enumName,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        modifiers,
        annotations,
        enumEntries,
        delegationSpecifiers,
        properties,
        functions,
        primaryConstructor,
        secondaryConstructors,
        inner,
    };
};

const parseTypeAlias = (
    ctx: TypeAliasContext,
    tokenStream: CommonTokenStream,
): KotlinTypeAlias | undefined => {
    const name = ctx.simpleIdentifier()?.getText();
    if (!name) return;

    const {modifiers, annotations} = parseModifiersAndAnnotations(ctx.modifierList(), tokenStream);

    const typeParameters = parseTypeParameters(ctx.typeParameters(), tokenStream);
    const underlyingType = parseType(ctx.type(), tokenStream);

    return {
        name,
        comments: getCommentsBeforeToken(tokenStream, ctx.start?.tokenIndex),
        modifiers,
        annotations,
        typeParameters,
        underlyingType,
    };
};

class CustomKotlinListener extends KotlinParserListener {
    public packageName = '';
    public imports: KotlinImport[] = [];
    public fileAnnotations: KotlinAnnotation[] = [];
    public classes: KotlinClass[] = [];
    public objects: KotlinObject[] = [];
    public enums: KotlinEnum[] = [];
    public functions: KotlinFunction[] = [];
    public properties: KotlinProperty[] = [];
    public typeAliases: KotlinTypeAlias[] = [];

    private readonly tokenStream: CommonTokenStream;

    constructor(tokenStream: CommonTokenStream) {
        super();
        this.tokenStream = tokenStream;
    }

    enterPackageHeader = (ctx: PackageHeaderContext) => {
        const packageId = ctx.identifier();
        if (packageId) {
            this.packageName = packageId.getText();
        }
    };

    enterFileAnnotation = (ctx: FileAnnotationContext) => {
        const annotations = ctx.unescapedAnnotation();
        for (const annotation of annotations) {
            this.fileAnnotations.push(parseUnescapedAnnotation(annotation, this.tokenStream));
        }
    };

    enterImportHeader = (ctx: ImportHeaderContext) => {
        const importPath = ctx.identifier()?.getText() || '';
        const alias = ctx.importAlias()?.simpleIdentifier()?.getText();
        const isOnDemand = ctx.MULT() !== null;

        this.imports.push({
            raw: getRawTextByCtx(this.tokenStream, ctx),
            path: importPath,
            alias: alias,
            isOnDemand,
        });
    };

    enterTopLevelObject = (ctx: TopLevelObjectContext) => {
        const tokenStream = this.tokenStream;

        // 类声明
        const classCtx = ctx.classDeclaration();
        if (classCtx) {
            const enumClassBody = classCtx.enumClassBody();

            if (enumClassBody) {
                const kotlinEnum = parseEnum(classCtx, enumClassBody, tokenStream);
                this.enums.push(kotlinEnum);
            } else {
                const kotlinClass = parseClass(classCtx, tokenStream);
                this.classes.push(kotlinClass);
            }
        }

        // 对象声明
        const objectCtx = ctx.objectDeclaration();
        if (objectCtx) {
            const kotlinObject = parseObject(objectCtx, tokenStream);
            if (kotlinObject) this.objects.push(kotlinObject);
        }

        // 函数声明
        const functionCtx = ctx.functionDeclaration();
        if (functionCtx) {
            this.functions.push(parseFunction(functionCtx, tokenStream));
        }

        // 属性声明
        const propertyCtx = ctx.propertyDeclaration();
        if (propertyCtx) {
            this.properties.push(...parseProperty(propertyCtx, tokenStream));
        }

        // 类型别名
        const typeAliasCtx = ctx.typeAlias();
        if (typeAliasCtx) {
            const typeAlias = parseTypeAlias(typeAliasCtx, tokenStream);
            if (typeAlias) this.typeAliases.push(typeAlias);
        }
    };
}

export const parseKotlin = (code: string): KotlinFile => {
    const inputStream = CharStream.fromString(code);
    const lexer = new KotlinLexer(inputStream);
    const tokens = new CommonTokenStream(lexer);
    const parser = new KotlinParser(tokens);
    const tree = parser.kotlinFile();

    const listener = new CustomKotlinListener(tokens);
    const walker = new ParseTreeWalker();
    walker.walk(listener, tree);

    return {
        packageName: listener.packageName,
        imports: listener.imports,
        fileAnnotations: listener.fileAnnotations,
        classes: listener.classes,
        objects: listener.objects,
        enums: listener.enums,
        functions: listener.functions,
        properties: listener.properties,
        typeAliases: listener.typeAliases,
    };
};
