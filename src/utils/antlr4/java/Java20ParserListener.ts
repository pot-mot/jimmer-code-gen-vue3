
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { Start_Context } from "./Java20Parser.js";
import { IdentifierContext } from "./Java20Parser.js";
import { TypeIdentifierContext } from "./Java20Parser.js";
import { UnqualifiedMethodIdentifierContext } from "./Java20Parser.js";
import { ContextualKeywordContext } from "./Java20Parser.js";
import { ContextualKeywordMinusForTypeIdentifierContext } from "./Java20Parser.js";
import { ContextualKeywordMinusForUnqualifiedMethodIdentifierContext } from "./Java20Parser.js";
import { LiteralContext } from "./Java20Parser.js";
import { PrimitiveTypeContext } from "./Java20Parser.js";
import { NumericTypeContext } from "./Java20Parser.js";
import { IntegralTypeContext } from "./Java20Parser.js";
import { FloatingPointTypeContext } from "./Java20Parser.js";
import { ReferenceTypeContext } from "./Java20Parser.js";
import { CoitContext } from "./Java20Parser.js";
import { ClassOrInterfaceTypeContext } from "./Java20Parser.js";
import { ClassTypeContext } from "./Java20Parser.js";
import { InterfaceTypeContext } from "./Java20Parser.js";
import { TypeVariableContext } from "./Java20Parser.js";
import { ArrayTypeContext } from "./Java20Parser.js";
import { DimsContext } from "./Java20Parser.js";
import { TypeParameterContext } from "./Java20Parser.js";
import { TypeParameterModifierContext } from "./Java20Parser.js";
import { TypeBoundContext } from "./Java20Parser.js";
import { AdditionalBoundContext } from "./Java20Parser.js";
import { TypeArgumentsContext } from "./Java20Parser.js";
import { TypeArgumentListContext } from "./Java20Parser.js";
import { TypeArgumentContext } from "./Java20Parser.js";
import { WildcardContext } from "./Java20Parser.js";
import { WildcardBoundsContext } from "./Java20Parser.js";
import { ModuleNameContext } from "./Java20Parser.js";
import { PackageNameContext } from "./Java20Parser.js";
import { TypeNameContext } from "./Java20Parser.js";
import { PackageOrTypeNameContext } from "./Java20Parser.js";
import { ExpressionNameContext } from "./Java20Parser.js";
import { MethodNameContext } from "./Java20Parser.js";
import { AmbiguousNameContext } from "./Java20Parser.js";
import { CompilationUnitContext } from "./Java20Parser.js";
import { OrdinaryCompilationUnitContext } from "./Java20Parser.js";
import { ModularCompilationUnitContext } from "./Java20Parser.js";
import { PackageDeclarationContext } from "./Java20Parser.js";
import { PackageModifierContext } from "./Java20Parser.js";
import { ImportDeclarationContext } from "./Java20Parser.js";
import { SingleTypeImportDeclarationContext } from "./Java20Parser.js";
import { TypeImportOnDemandDeclarationContext } from "./Java20Parser.js";
import { SingleStaticImportDeclarationContext } from "./Java20Parser.js";
import { StaticImportOnDemandDeclarationContext } from "./Java20Parser.js";
import { TopLevelClassOrInterfaceDeclarationContext } from "./Java20Parser.js";
import { ModuleDeclarationContext } from "./Java20Parser.js";
import { ModuleDirectiveContext } from "./Java20Parser.js";
import { RequiresModifierContext } from "./Java20Parser.js";
import { ClassDeclarationContext } from "./Java20Parser.js";
import { NormalClassDeclarationContext } from "./Java20Parser.js";
import { ClassModifierContext } from "./Java20Parser.js";
import { TypeParametersContext } from "./Java20Parser.js";
import { TypeParameterListContext } from "./Java20Parser.js";
import { ClassExtendsContext } from "./Java20Parser.js";
import { ClassImplementsContext } from "./Java20Parser.js";
import { InterfaceTypeListContext } from "./Java20Parser.js";
import { ClassPermitsContext } from "./Java20Parser.js";
import { ClassBodyContext } from "./Java20Parser.js";
import { ClassBodyDeclarationContext } from "./Java20Parser.js";
import { ClassMemberDeclarationContext } from "./Java20Parser.js";
import { FieldDeclarationContext } from "./Java20Parser.js";
import { FieldModifierContext } from "./Java20Parser.js";
import { VariableDeclaratorListContext } from "./Java20Parser.js";
import { VariableDeclaratorContext } from "./Java20Parser.js";
import { VariableDeclaratorIdContext } from "./Java20Parser.js";
import { VariableInitializerContext } from "./Java20Parser.js";
import { UnannTypeContext } from "./Java20Parser.js";
import { UnannPrimitiveTypeContext } from "./Java20Parser.js";
import { UnannReferenceTypeContext } from "./Java20Parser.js";
import { UnannClassOrInterfaceTypeContext } from "./Java20Parser.js";
import { UCOITContext } from "./Java20Parser.js";
import { UnannClassTypeContext } from "./Java20Parser.js";
import { UnannInterfaceTypeContext } from "./Java20Parser.js";
import { UnannTypeVariableContext } from "./Java20Parser.js";
import { UnannArrayTypeContext } from "./Java20Parser.js";
import { MethodDeclarationContext } from "./Java20Parser.js";
import { MethodModifierContext } from "./Java20Parser.js";
import { MethodHeaderContext } from "./Java20Parser.js";
import { ResultContext } from "./Java20Parser.js";
import { MethodDeclaratorContext } from "./Java20Parser.js";
import { ReceiverParameterContext } from "./Java20Parser.js";
import { FormalParameterListContext } from "./Java20Parser.js";
import { FormalParameterContext } from "./Java20Parser.js";
import { VariableArityParameterContext } from "./Java20Parser.js";
import { VariableModifierContext } from "./Java20Parser.js";
import { ThrowsTContext } from "./Java20Parser.js";
import { ExceptionTypeListContext } from "./Java20Parser.js";
import { ExceptionTypeContext } from "./Java20Parser.js";
import { MethodBodyContext } from "./Java20Parser.js";
import { InstanceInitializerContext } from "./Java20Parser.js";
import { StaticInitializerContext } from "./Java20Parser.js";
import { ConstructorDeclarationContext } from "./Java20Parser.js";
import { ConstructorModifierContext } from "./Java20Parser.js";
import { ConstructorDeclaratorContext } from "./Java20Parser.js";
import { SimpleTypeNameContext } from "./Java20Parser.js";
import { ConstructorBodyContext } from "./Java20Parser.js";
import { ExplicitConstructorInvocationContext } from "./Java20Parser.js";
import { EnumDeclarationContext } from "./Java20Parser.js";
import { EnumBodyContext } from "./Java20Parser.js";
import { EnumConstantListContext } from "./Java20Parser.js";
import { EnumConstantContext } from "./Java20Parser.js";
import { EnumConstantModifierContext } from "./Java20Parser.js";
import { EnumBodyDeclarationsContext } from "./Java20Parser.js";
import { RecordDeclarationContext } from "./Java20Parser.js";
import { RecordHeaderContext } from "./Java20Parser.js";
import { RecordComponentListContext } from "./Java20Parser.js";
import { RecordComponentContext } from "./Java20Parser.js";
import { VariableArityRecordComponentContext } from "./Java20Parser.js";
import { RecordComponentModifierContext } from "./Java20Parser.js";
import { RecordBodyContext } from "./Java20Parser.js";
import { RecordBodyDeclarationContext } from "./Java20Parser.js";
import { CompactConstructorDeclarationContext } from "./Java20Parser.js";
import { InterfaceDeclarationContext } from "./Java20Parser.js";
import { NormalInterfaceDeclarationContext } from "./Java20Parser.js";
import { InterfaceModifierContext } from "./Java20Parser.js";
import { InterfaceExtendsContext } from "./Java20Parser.js";
import { InterfacePermitsContext } from "./Java20Parser.js";
import { InterfaceBodyContext } from "./Java20Parser.js";
import { InterfaceMemberDeclarationContext } from "./Java20Parser.js";
import { ConstantDeclarationContext } from "./Java20Parser.js";
import { ConstantModifierContext } from "./Java20Parser.js";
import { InterfaceMethodDeclarationContext } from "./Java20Parser.js";
import { InterfaceMethodModifierContext } from "./Java20Parser.js";
import { AnnotationInterfaceDeclarationContext } from "./Java20Parser.js";
import { AnnotationInterfaceBodyContext } from "./Java20Parser.js";
import { AnnotationInterfaceMemberDeclarationContext } from "./Java20Parser.js";
import { AnnotationInterfaceElementDeclarationContext } from "./Java20Parser.js";
import { AnnotationInterfaceElementModifierContext } from "./Java20Parser.js";
import { DefaultValueContext } from "./Java20Parser.js";
import { AnnotationContext } from "./Java20Parser.js";
import { NormalAnnotationContext } from "./Java20Parser.js";
import { ElementValuePairListContext } from "./Java20Parser.js";
import { ElementValuePairContext } from "./Java20Parser.js";
import { ElementValueContext } from "./Java20Parser.js";
import { ElementValueArrayInitializerContext } from "./Java20Parser.js";
import { ElementValueListContext } from "./Java20Parser.js";
import { MarkerAnnotationContext } from "./Java20Parser.js";
import { SingleElementAnnotationContext } from "./Java20Parser.js";
import { ArrayInitializerContext } from "./Java20Parser.js";
import { VariableInitializerListContext } from "./Java20Parser.js";
import { BlockContext } from "./Java20Parser.js";
import { BlockStatementsContext } from "./Java20Parser.js";
import { BlockStatementContext } from "./Java20Parser.js";
import { LocalClassOrInterfaceDeclarationContext } from "./Java20Parser.js";
import { LocalVariableDeclarationContext } from "./Java20Parser.js";
import { LocalVariableTypeContext } from "./Java20Parser.js";
import { LocalVariableDeclarationStatementContext } from "./Java20Parser.js";
import { StatementContext } from "./Java20Parser.js";
import { StatementNoShortIfContext } from "./Java20Parser.js";
import { StatementWithoutTrailingSubstatementContext } from "./Java20Parser.js";
import { EmptyStatement_Context } from "./Java20Parser.js";
import { LabeledStatementContext } from "./Java20Parser.js";
import { LabeledStatementNoShortIfContext } from "./Java20Parser.js";
import { ExpressionStatementContext } from "./Java20Parser.js";
import { StatementExpressionContext } from "./Java20Parser.js";
import { IfThenStatementContext } from "./Java20Parser.js";
import { IfThenElseStatementContext } from "./Java20Parser.js";
import { IfThenElseStatementNoShortIfContext } from "./Java20Parser.js";
import { AssertStatementContext } from "./Java20Parser.js";
import { SwitchStatementContext } from "./Java20Parser.js";
import { SwitchBlockContext } from "./Java20Parser.js";
import { SwitchRuleContext } from "./Java20Parser.js";
import { SwitchBlockStatementGroupContext } from "./Java20Parser.js";
import { SwitchLabelContext } from "./Java20Parser.js";
import { CaseConstantContext } from "./Java20Parser.js";
import { WhileStatementContext } from "./Java20Parser.js";
import { WhileStatementNoShortIfContext } from "./Java20Parser.js";
import { DoStatementContext } from "./Java20Parser.js";
import { ForStatementContext } from "./Java20Parser.js";
import { ForStatementNoShortIfContext } from "./Java20Parser.js";
import { BasicForStatementContext } from "./Java20Parser.js";
import { BasicForStatementNoShortIfContext } from "./Java20Parser.js";
import { ForInitContext } from "./Java20Parser.js";
import { ForUpdateContext } from "./Java20Parser.js";
import { StatementExpressionListContext } from "./Java20Parser.js";
import { EnhancedForStatementContext } from "./Java20Parser.js";
import { EnhancedForStatementNoShortIfContext } from "./Java20Parser.js";
import { BreakStatementContext } from "./Java20Parser.js";
import { ContinueStatementContext } from "./Java20Parser.js";
import { ReturnStatementContext } from "./Java20Parser.js";
import { ThrowStatementContext } from "./Java20Parser.js";
import { SynchronizedStatementContext } from "./Java20Parser.js";
import { TryStatementContext } from "./Java20Parser.js";
import { CatchesContext } from "./Java20Parser.js";
import { CatchClauseContext } from "./Java20Parser.js";
import { CatchFormalParameterContext } from "./Java20Parser.js";
import { CatchTypeContext } from "./Java20Parser.js";
import { FinallyBlockContext } from "./Java20Parser.js";
import { TryWithResourcesStatementContext } from "./Java20Parser.js";
import { ResourceSpecificationContext } from "./Java20Parser.js";
import { ResourceListContext } from "./Java20Parser.js";
import { ResourceContext } from "./Java20Parser.js";
import { VariableAccessContext } from "./Java20Parser.js";
import { YieldStatementContext } from "./Java20Parser.js";
import { PatternContext } from "./Java20Parser.js";
import { TypePatternContext } from "./Java20Parser.js";
import { ExpressionContext } from "./Java20Parser.js";
import { PrimaryContext } from "./Java20Parser.js";
import { PrimaryNoNewArrayContext } from "./Java20Parser.js";
import { PNNAContext } from "./Java20Parser.js";
import { ClassLiteralContext } from "./Java20Parser.js";
import { ClassInstanceCreationExpressionContext } from "./Java20Parser.js";
import { UnqualifiedClassInstanceCreationExpressionContext } from "./Java20Parser.js";
import { ClassOrInterfaceTypeToInstantiateContext } from "./Java20Parser.js";
import { TypeArgumentsOrDiamondContext } from "./Java20Parser.js";
import { ArrayCreationExpressionContext } from "./Java20Parser.js";
import { ArrayCreationExpressionWithoutInitializerContext } from "./Java20Parser.js";
import { ArrayCreationExpressionWithInitializerContext } from "./Java20Parser.js";
import { DimExprsContext } from "./Java20Parser.js";
import { DimExprContext } from "./Java20Parser.js";
import { ArrayAccessContext } from "./Java20Parser.js";
import { FieldAccessContext } from "./Java20Parser.js";
import { MethodInvocationContext } from "./Java20Parser.js";
import { ArgumentListContext } from "./Java20Parser.js";
import { MethodReferenceContext } from "./Java20Parser.js";
import { PostfixExpressionContext } from "./Java20Parser.js";
import { PfEContext } from "./Java20Parser.js";
import { PostIncrementExpressionContext } from "./Java20Parser.js";
import { PostDecrementExpressionContext } from "./Java20Parser.js";
import { UnaryExpressionContext } from "./Java20Parser.js";
import { PreIncrementExpressionContext } from "./Java20Parser.js";
import { PreDecrementExpressionContext } from "./Java20Parser.js";
import { UnaryExpressionNotPlusMinusContext } from "./Java20Parser.js";
import { CastExpressionContext } from "./Java20Parser.js";
import { MultiplicativeExpressionContext } from "./Java20Parser.js";
import { AdditiveExpressionContext } from "./Java20Parser.js";
import { ShiftExpressionContext } from "./Java20Parser.js";
import { RelationalExpressionContext } from "./Java20Parser.js";
import { EqualityExpressionContext } from "./Java20Parser.js";
import { AndExpressionContext } from "./Java20Parser.js";
import { ExclusiveOrExpressionContext } from "./Java20Parser.js";
import { InclusiveOrExpressionContext } from "./Java20Parser.js";
import { ConditionalAndExpressionContext } from "./Java20Parser.js";
import { ConditionalOrExpressionContext } from "./Java20Parser.js";
import { ConditionalExpressionContext } from "./Java20Parser.js";
import { AssignmentExpressionContext } from "./Java20Parser.js";
import { AssignmentContext } from "./Java20Parser.js";
import { LeftHandSideContext } from "./Java20Parser.js";
import { AssignmentOperatorContext } from "./Java20Parser.js";
import { LambdaExpressionContext } from "./Java20Parser.js";
import { LambdaParametersContext } from "./Java20Parser.js";
import { LambdaParameterListContext } from "./Java20Parser.js";
import { LambdaParameterContext } from "./Java20Parser.js";
import { LambdaParameterTypeContext } from "./Java20Parser.js";
import { LambdaBodyContext } from "./Java20Parser.js";
import { SwitchExpressionContext } from "./Java20Parser.js";
import { ConstantExpressionContext } from "./Java20Parser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `Java20Parser`.
 */
export class Java20ParserListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `Java20Parser.start_`.
     * @param ctx the parse tree
     */
    enterStart_?: (ctx: Start_Context) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.start_`.
     * @param ctx the parse tree
     */
    exitStart_?: (ctx: Start_Context) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.identifier`.
     * @param ctx the parse tree
     */
    enterIdentifier?: (ctx: IdentifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.identifier`.
     * @param ctx the parse tree
     */
    exitIdentifier?: (ctx: IdentifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeIdentifier`.
     * @param ctx the parse tree
     */
    enterTypeIdentifier?: (ctx: TypeIdentifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeIdentifier`.
     * @param ctx the parse tree
     */
    exitTypeIdentifier?: (ctx: TypeIdentifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.unqualifiedMethodIdentifier`.
     * @param ctx the parse tree
     */
    enterUnqualifiedMethodIdentifier?: (ctx: UnqualifiedMethodIdentifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.unqualifiedMethodIdentifier`.
     * @param ctx the parse tree
     */
    exitUnqualifiedMethodIdentifier?: (ctx: UnqualifiedMethodIdentifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.contextualKeyword`.
     * @param ctx the parse tree
     */
    enterContextualKeyword?: (ctx: ContextualKeywordContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.contextualKeyword`.
     * @param ctx the parse tree
     */
    exitContextualKeyword?: (ctx: ContextualKeywordContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.contextualKeywordMinusForTypeIdentifier`.
     * @param ctx the parse tree
     */
    enterContextualKeywordMinusForTypeIdentifier?: (ctx: ContextualKeywordMinusForTypeIdentifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.contextualKeywordMinusForTypeIdentifier`.
     * @param ctx the parse tree
     */
    exitContextualKeywordMinusForTypeIdentifier?: (ctx: ContextualKeywordMinusForTypeIdentifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.contextualKeywordMinusForUnqualifiedMethodIdentifier`.
     * @param ctx the parse tree
     */
    enterContextualKeywordMinusForUnqualifiedMethodIdentifier?: (ctx: ContextualKeywordMinusForUnqualifiedMethodIdentifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.contextualKeywordMinusForUnqualifiedMethodIdentifier`.
     * @param ctx the parse tree
     */
    exitContextualKeywordMinusForUnqualifiedMethodIdentifier?: (ctx: ContextualKeywordMinusForUnqualifiedMethodIdentifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.primitiveType`.
     * @param ctx the parse tree
     */
    enterPrimitiveType?: (ctx: PrimitiveTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.primitiveType`.
     * @param ctx the parse tree
     */
    exitPrimitiveType?: (ctx: PrimitiveTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.numericType`.
     * @param ctx the parse tree
     */
    enterNumericType?: (ctx: NumericTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.numericType`.
     * @param ctx the parse tree
     */
    exitNumericType?: (ctx: NumericTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.integralType`.
     * @param ctx the parse tree
     */
    enterIntegralType?: (ctx: IntegralTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.integralType`.
     * @param ctx the parse tree
     */
    exitIntegralType?: (ctx: IntegralTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.floatingPointType`.
     * @param ctx the parse tree
     */
    enterFloatingPointType?: (ctx: FloatingPointTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.floatingPointType`.
     * @param ctx the parse tree
     */
    exitFloatingPointType?: (ctx: FloatingPointTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.referenceType`.
     * @param ctx the parse tree
     */
    enterReferenceType?: (ctx: ReferenceTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.referenceType`.
     * @param ctx the parse tree
     */
    exitReferenceType?: (ctx: ReferenceTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.coit`.
     * @param ctx the parse tree
     */
    enterCoit?: (ctx: CoitContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.coit`.
     * @param ctx the parse tree
     */
    exitCoit?: (ctx: CoitContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classOrInterfaceType`.
     * @param ctx the parse tree
     */
    enterClassOrInterfaceType?: (ctx: ClassOrInterfaceTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classOrInterfaceType`.
     * @param ctx the parse tree
     */
    exitClassOrInterfaceType?: (ctx: ClassOrInterfaceTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classType`.
     * @param ctx the parse tree
     */
    enterClassType?: (ctx: ClassTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classType`.
     * @param ctx the parse tree
     */
    exitClassType?: (ctx: ClassTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.interfaceType`.
     * @param ctx the parse tree
     */
    enterInterfaceType?: (ctx: InterfaceTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.interfaceType`.
     * @param ctx the parse tree
     */
    exitInterfaceType?: (ctx: InterfaceTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeVariable`.
     * @param ctx the parse tree
     */
    enterTypeVariable?: (ctx: TypeVariableContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeVariable`.
     * @param ctx the parse tree
     */
    exitTypeVariable?: (ctx: TypeVariableContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.arrayType`.
     * @param ctx the parse tree
     */
    enterArrayType?: (ctx: ArrayTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.arrayType`.
     * @param ctx the parse tree
     */
    exitArrayType?: (ctx: ArrayTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.dims`.
     * @param ctx the parse tree
     */
    enterDims?: (ctx: DimsContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.dims`.
     * @param ctx the parse tree
     */
    exitDims?: (ctx: DimsContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeParameter`.
     * @param ctx the parse tree
     */
    enterTypeParameter?: (ctx: TypeParameterContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeParameter`.
     * @param ctx the parse tree
     */
    exitTypeParameter?: (ctx: TypeParameterContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeParameterModifier`.
     * @param ctx the parse tree
     */
    enterTypeParameterModifier?: (ctx: TypeParameterModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeParameterModifier`.
     * @param ctx the parse tree
     */
    exitTypeParameterModifier?: (ctx: TypeParameterModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeBound`.
     * @param ctx the parse tree
     */
    enterTypeBound?: (ctx: TypeBoundContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeBound`.
     * @param ctx the parse tree
     */
    exitTypeBound?: (ctx: TypeBoundContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.additionalBound`.
     * @param ctx the parse tree
     */
    enterAdditionalBound?: (ctx: AdditionalBoundContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.additionalBound`.
     * @param ctx the parse tree
     */
    exitAdditionalBound?: (ctx: AdditionalBoundContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeArguments`.
     * @param ctx the parse tree
     */
    enterTypeArguments?: (ctx: TypeArgumentsContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeArguments`.
     * @param ctx the parse tree
     */
    exitTypeArguments?: (ctx: TypeArgumentsContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeArgumentList`.
     * @param ctx the parse tree
     */
    enterTypeArgumentList?: (ctx: TypeArgumentListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeArgumentList`.
     * @param ctx the parse tree
     */
    exitTypeArgumentList?: (ctx: TypeArgumentListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeArgument`.
     * @param ctx the parse tree
     */
    enterTypeArgument?: (ctx: TypeArgumentContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeArgument`.
     * @param ctx the parse tree
     */
    exitTypeArgument?: (ctx: TypeArgumentContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.wildcard`.
     * @param ctx the parse tree
     */
    enterWildcard?: (ctx: WildcardContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.wildcard`.
     * @param ctx the parse tree
     */
    exitWildcard?: (ctx: WildcardContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.wildcardBounds`.
     * @param ctx the parse tree
     */
    enterWildcardBounds?: (ctx: WildcardBoundsContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.wildcardBounds`.
     * @param ctx the parse tree
     */
    exitWildcardBounds?: (ctx: WildcardBoundsContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.moduleName`.
     * @param ctx the parse tree
     */
    enterModuleName?: (ctx: ModuleNameContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.moduleName`.
     * @param ctx the parse tree
     */
    exitModuleName?: (ctx: ModuleNameContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.packageName`.
     * @param ctx the parse tree
     */
    enterPackageName?: (ctx: PackageNameContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.packageName`.
     * @param ctx the parse tree
     */
    exitPackageName?: (ctx: PackageNameContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeName`.
     * @param ctx the parse tree
     */
    enterTypeName?: (ctx: TypeNameContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeName`.
     * @param ctx the parse tree
     */
    exitTypeName?: (ctx: TypeNameContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.packageOrTypeName`.
     * @param ctx the parse tree
     */
    enterPackageOrTypeName?: (ctx: PackageOrTypeNameContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.packageOrTypeName`.
     * @param ctx the parse tree
     */
    exitPackageOrTypeName?: (ctx: PackageOrTypeNameContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.expressionName`.
     * @param ctx the parse tree
     */
    enterExpressionName?: (ctx: ExpressionNameContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.expressionName`.
     * @param ctx the parse tree
     */
    exitExpressionName?: (ctx: ExpressionNameContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.methodName`.
     * @param ctx the parse tree
     */
    enterMethodName?: (ctx: MethodNameContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.methodName`.
     * @param ctx the parse tree
     */
    exitMethodName?: (ctx: MethodNameContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.ambiguousName`.
     * @param ctx the parse tree
     */
    enterAmbiguousName?: (ctx: AmbiguousNameContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.ambiguousName`.
     * @param ctx the parse tree
     */
    exitAmbiguousName?: (ctx: AmbiguousNameContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.compilationUnit`.
     * @param ctx the parse tree
     */
    enterCompilationUnit?: (ctx: CompilationUnitContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.compilationUnit`.
     * @param ctx the parse tree
     */
    exitCompilationUnit?: (ctx: CompilationUnitContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.ordinaryCompilationUnit`.
     * @param ctx the parse tree
     */
    enterOrdinaryCompilationUnit?: (ctx: OrdinaryCompilationUnitContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.ordinaryCompilationUnit`.
     * @param ctx the parse tree
     */
    exitOrdinaryCompilationUnit?: (ctx: OrdinaryCompilationUnitContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.modularCompilationUnit`.
     * @param ctx the parse tree
     */
    enterModularCompilationUnit?: (ctx: ModularCompilationUnitContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.modularCompilationUnit`.
     * @param ctx the parse tree
     */
    exitModularCompilationUnit?: (ctx: ModularCompilationUnitContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.packageDeclaration`.
     * @param ctx the parse tree
     */
    enterPackageDeclaration?: (ctx: PackageDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.packageDeclaration`.
     * @param ctx the parse tree
     */
    exitPackageDeclaration?: (ctx: PackageDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.packageModifier`.
     * @param ctx the parse tree
     */
    enterPackageModifier?: (ctx: PackageModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.packageModifier`.
     * @param ctx the parse tree
     */
    exitPackageModifier?: (ctx: PackageModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.importDeclaration`.
     * @param ctx the parse tree
     */
    enterImportDeclaration?: (ctx: ImportDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.importDeclaration`.
     * @param ctx the parse tree
     */
    exitImportDeclaration?: (ctx: ImportDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.singleTypeImportDeclaration`.
     * @param ctx the parse tree
     */
    enterSingleTypeImportDeclaration?: (ctx: SingleTypeImportDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.singleTypeImportDeclaration`.
     * @param ctx the parse tree
     */
    exitSingleTypeImportDeclaration?: (ctx: SingleTypeImportDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeImportOnDemandDeclaration`.
     * @param ctx the parse tree
     */
    enterTypeImportOnDemandDeclaration?: (ctx: TypeImportOnDemandDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeImportOnDemandDeclaration`.
     * @param ctx the parse tree
     */
    exitTypeImportOnDemandDeclaration?: (ctx: TypeImportOnDemandDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.singleStaticImportDeclaration`.
     * @param ctx the parse tree
     */
    enterSingleStaticImportDeclaration?: (ctx: SingleStaticImportDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.singleStaticImportDeclaration`.
     * @param ctx the parse tree
     */
    exitSingleStaticImportDeclaration?: (ctx: SingleStaticImportDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.staticImportOnDemandDeclaration`.
     * @param ctx the parse tree
     */
    enterStaticImportOnDemandDeclaration?: (ctx: StaticImportOnDemandDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.staticImportOnDemandDeclaration`.
     * @param ctx the parse tree
     */
    exitStaticImportOnDemandDeclaration?: (ctx: StaticImportOnDemandDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.topLevelClassOrInterfaceDeclaration`.
     * @param ctx the parse tree
     */
    enterTopLevelClassOrInterfaceDeclaration?: (ctx: TopLevelClassOrInterfaceDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.topLevelClassOrInterfaceDeclaration`.
     * @param ctx the parse tree
     */
    exitTopLevelClassOrInterfaceDeclaration?: (ctx: TopLevelClassOrInterfaceDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.moduleDeclaration`.
     * @param ctx the parse tree
     */
    enterModuleDeclaration?: (ctx: ModuleDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.moduleDeclaration`.
     * @param ctx the parse tree
     */
    exitModuleDeclaration?: (ctx: ModuleDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.moduleDirective`.
     * @param ctx the parse tree
     */
    enterModuleDirective?: (ctx: ModuleDirectiveContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.moduleDirective`.
     * @param ctx the parse tree
     */
    exitModuleDirective?: (ctx: ModuleDirectiveContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.requiresModifier`.
     * @param ctx the parse tree
     */
    enterRequiresModifier?: (ctx: RequiresModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.requiresModifier`.
     * @param ctx the parse tree
     */
    exitRequiresModifier?: (ctx: RequiresModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classDeclaration`.
     * @param ctx the parse tree
     */
    enterClassDeclaration?: (ctx: ClassDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classDeclaration`.
     * @param ctx the parse tree
     */
    exitClassDeclaration?: (ctx: ClassDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.normalClassDeclaration`.
     * @param ctx the parse tree
     */
    enterNormalClassDeclaration?: (ctx: NormalClassDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.normalClassDeclaration`.
     * @param ctx the parse tree
     */
    exitNormalClassDeclaration?: (ctx: NormalClassDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classModifier`.
     * @param ctx the parse tree
     */
    enterClassModifier?: (ctx: ClassModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classModifier`.
     * @param ctx the parse tree
     */
    exitClassModifier?: (ctx: ClassModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeParameters`.
     * @param ctx the parse tree
     */
    enterTypeParameters?: (ctx: TypeParametersContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeParameters`.
     * @param ctx the parse tree
     */
    exitTypeParameters?: (ctx: TypeParametersContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeParameterList`.
     * @param ctx the parse tree
     */
    enterTypeParameterList?: (ctx: TypeParameterListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeParameterList`.
     * @param ctx the parse tree
     */
    exitTypeParameterList?: (ctx: TypeParameterListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classExtends`.
     * @param ctx the parse tree
     */
    enterClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classExtends`.
     * @param ctx the parse tree
     */
    exitClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classImplements`.
     * @param ctx the parse tree
     */
    enterClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classImplements`.
     * @param ctx the parse tree
     */
    exitClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.interfaceTypeList`.
     * @param ctx the parse tree
     */
    enterInterfaceTypeList?: (ctx: InterfaceTypeListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.interfaceTypeList`.
     * @param ctx the parse tree
     */
    exitInterfaceTypeList?: (ctx: InterfaceTypeListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classPermits`.
     * @param ctx the parse tree
     */
    enterClassPermits?: (ctx: ClassPermitsContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classPermits`.
     * @param ctx the parse tree
     */
    exitClassPermits?: (ctx: ClassPermitsContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classBody`.
     * @param ctx the parse tree
     */
    enterClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classBody`.
     * @param ctx the parse tree
     */
    exitClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classBodyDeclaration`.
     * @param ctx the parse tree
     */
    enterClassBodyDeclaration?: (ctx: ClassBodyDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classBodyDeclaration`.
     * @param ctx the parse tree
     */
    exitClassBodyDeclaration?: (ctx: ClassBodyDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classMemberDeclaration`.
     * @param ctx the parse tree
     */
    enterClassMemberDeclaration?: (ctx: ClassMemberDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classMemberDeclaration`.
     * @param ctx the parse tree
     */
    exitClassMemberDeclaration?: (ctx: ClassMemberDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.fieldDeclaration`.
     * @param ctx the parse tree
     */
    enterFieldDeclaration?: (ctx: FieldDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.fieldDeclaration`.
     * @param ctx the parse tree
     */
    exitFieldDeclaration?: (ctx: FieldDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.fieldModifier`.
     * @param ctx the parse tree
     */
    enterFieldModifier?: (ctx: FieldModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.fieldModifier`.
     * @param ctx the parse tree
     */
    exitFieldModifier?: (ctx: FieldModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.variableDeclaratorList`.
     * @param ctx the parse tree
     */
    enterVariableDeclaratorList?: (ctx: VariableDeclaratorListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.variableDeclaratorList`.
     * @param ctx the parse tree
     */
    exitVariableDeclaratorList?: (ctx: VariableDeclaratorListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.variableDeclarator`.
     * @param ctx the parse tree
     */
    enterVariableDeclarator?: (ctx: VariableDeclaratorContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.variableDeclarator`.
     * @param ctx the parse tree
     */
    exitVariableDeclarator?: (ctx: VariableDeclaratorContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.variableDeclaratorId`.
     * @param ctx the parse tree
     */
    enterVariableDeclaratorId?: (ctx: VariableDeclaratorIdContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.variableDeclaratorId`.
     * @param ctx the parse tree
     */
    exitVariableDeclaratorId?: (ctx: VariableDeclaratorIdContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.variableInitializer`.
     * @param ctx the parse tree
     */
    enterVariableInitializer?: (ctx: VariableInitializerContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.variableInitializer`.
     * @param ctx the parse tree
     */
    exitVariableInitializer?: (ctx: VariableInitializerContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.unannType`.
     * @param ctx the parse tree
     */
    enterUnannType?: (ctx: UnannTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.unannType`.
     * @param ctx the parse tree
     */
    exitUnannType?: (ctx: UnannTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.unannPrimitiveType`.
     * @param ctx the parse tree
     */
    enterUnannPrimitiveType?: (ctx: UnannPrimitiveTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.unannPrimitiveType`.
     * @param ctx the parse tree
     */
    exitUnannPrimitiveType?: (ctx: UnannPrimitiveTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.unannReferenceType`.
     * @param ctx the parse tree
     */
    enterUnannReferenceType?: (ctx: UnannReferenceTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.unannReferenceType`.
     * @param ctx the parse tree
     */
    exitUnannReferenceType?: (ctx: UnannReferenceTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.unannClassOrInterfaceType`.
     * @param ctx the parse tree
     */
    enterUnannClassOrInterfaceType?: (ctx: UnannClassOrInterfaceTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.unannClassOrInterfaceType`.
     * @param ctx the parse tree
     */
    exitUnannClassOrInterfaceType?: (ctx: UnannClassOrInterfaceTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.uCOIT`.
     * @param ctx the parse tree
     */
    enterUCOIT?: (ctx: UCOITContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.uCOIT`.
     * @param ctx the parse tree
     */
    exitUCOIT?: (ctx: UCOITContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.unannClassType`.
     * @param ctx the parse tree
     */
    enterUnannClassType?: (ctx: UnannClassTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.unannClassType`.
     * @param ctx the parse tree
     */
    exitUnannClassType?: (ctx: UnannClassTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.unannInterfaceType`.
     * @param ctx the parse tree
     */
    enterUnannInterfaceType?: (ctx: UnannInterfaceTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.unannInterfaceType`.
     * @param ctx the parse tree
     */
    exitUnannInterfaceType?: (ctx: UnannInterfaceTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.unannTypeVariable`.
     * @param ctx the parse tree
     */
    enterUnannTypeVariable?: (ctx: UnannTypeVariableContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.unannTypeVariable`.
     * @param ctx the parse tree
     */
    exitUnannTypeVariable?: (ctx: UnannTypeVariableContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.unannArrayType`.
     * @param ctx the parse tree
     */
    enterUnannArrayType?: (ctx: UnannArrayTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.unannArrayType`.
     * @param ctx the parse tree
     */
    exitUnannArrayType?: (ctx: UnannArrayTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.methodDeclaration`.
     * @param ctx the parse tree
     */
    enterMethodDeclaration?: (ctx: MethodDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.methodDeclaration`.
     * @param ctx the parse tree
     */
    exitMethodDeclaration?: (ctx: MethodDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.methodModifier`.
     * @param ctx the parse tree
     */
    enterMethodModifier?: (ctx: MethodModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.methodModifier`.
     * @param ctx the parse tree
     */
    exitMethodModifier?: (ctx: MethodModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.methodHeader`.
     * @param ctx the parse tree
     */
    enterMethodHeader?: (ctx: MethodHeaderContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.methodHeader`.
     * @param ctx the parse tree
     */
    exitMethodHeader?: (ctx: MethodHeaderContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.result`.
     * @param ctx the parse tree
     */
    enterResult?: (ctx: ResultContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.result`.
     * @param ctx the parse tree
     */
    exitResult?: (ctx: ResultContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.methodDeclarator`.
     * @param ctx the parse tree
     */
    enterMethodDeclarator?: (ctx: MethodDeclaratorContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.methodDeclarator`.
     * @param ctx the parse tree
     */
    exitMethodDeclarator?: (ctx: MethodDeclaratorContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.receiverParameter`.
     * @param ctx the parse tree
     */
    enterReceiverParameter?: (ctx: ReceiverParameterContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.receiverParameter`.
     * @param ctx the parse tree
     */
    exitReceiverParameter?: (ctx: ReceiverParameterContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.formalParameterList`.
     * @param ctx the parse tree
     */
    enterFormalParameterList?: (ctx: FormalParameterListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.formalParameterList`.
     * @param ctx the parse tree
     */
    exitFormalParameterList?: (ctx: FormalParameterListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.formalParameter`.
     * @param ctx the parse tree
     */
    enterFormalParameter?: (ctx: FormalParameterContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.formalParameter`.
     * @param ctx the parse tree
     */
    exitFormalParameter?: (ctx: FormalParameterContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.variableArityParameter`.
     * @param ctx the parse tree
     */
    enterVariableArityParameter?: (ctx: VariableArityParameterContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.variableArityParameter`.
     * @param ctx the parse tree
     */
    exitVariableArityParameter?: (ctx: VariableArityParameterContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.variableModifier`.
     * @param ctx the parse tree
     */
    enterVariableModifier?: (ctx: VariableModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.variableModifier`.
     * @param ctx the parse tree
     */
    exitVariableModifier?: (ctx: VariableModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.throwsT`.
     * @param ctx the parse tree
     */
    enterThrowsT?: (ctx: ThrowsTContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.throwsT`.
     * @param ctx the parse tree
     */
    exitThrowsT?: (ctx: ThrowsTContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.exceptionTypeList`.
     * @param ctx the parse tree
     */
    enterExceptionTypeList?: (ctx: ExceptionTypeListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.exceptionTypeList`.
     * @param ctx the parse tree
     */
    exitExceptionTypeList?: (ctx: ExceptionTypeListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.exceptionType`.
     * @param ctx the parse tree
     */
    enterExceptionType?: (ctx: ExceptionTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.exceptionType`.
     * @param ctx the parse tree
     */
    exitExceptionType?: (ctx: ExceptionTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.methodBody`.
     * @param ctx the parse tree
     */
    enterMethodBody?: (ctx: MethodBodyContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.methodBody`.
     * @param ctx the parse tree
     */
    exitMethodBody?: (ctx: MethodBodyContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.instanceInitializer`.
     * @param ctx the parse tree
     */
    enterInstanceInitializer?: (ctx: InstanceInitializerContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.instanceInitializer`.
     * @param ctx the parse tree
     */
    exitInstanceInitializer?: (ctx: InstanceInitializerContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.staticInitializer`.
     * @param ctx the parse tree
     */
    enterStaticInitializer?: (ctx: StaticInitializerContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.staticInitializer`.
     * @param ctx the parse tree
     */
    exitStaticInitializer?: (ctx: StaticInitializerContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.constructorDeclaration`.
     * @param ctx the parse tree
     */
    enterConstructorDeclaration?: (ctx: ConstructorDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.constructorDeclaration`.
     * @param ctx the parse tree
     */
    exitConstructorDeclaration?: (ctx: ConstructorDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.constructorModifier`.
     * @param ctx the parse tree
     */
    enterConstructorModifier?: (ctx: ConstructorModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.constructorModifier`.
     * @param ctx the parse tree
     */
    exitConstructorModifier?: (ctx: ConstructorModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.constructorDeclarator`.
     * @param ctx the parse tree
     */
    enterConstructorDeclarator?: (ctx: ConstructorDeclaratorContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.constructorDeclarator`.
     * @param ctx the parse tree
     */
    exitConstructorDeclarator?: (ctx: ConstructorDeclaratorContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.simpleTypeName`.
     * @param ctx the parse tree
     */
    enterSimpleTypeName?: (ctx: SimpleTypeNameContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.simpleTypeName`.
     * @param ctx the parse tree
     */
    exitSimpleTypeName?: (ctx: SimpleTypeNameContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.constructorBody`.
     * @param ctx the parse tree
     */
    enterConstructorBody?: (ctx: ConstructorBodyContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.constructorBody`.
     * @param ctx the parse tree
     */
    exitConstructorBody?: (ctx: ConstructorBodyContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.explicitConstructorInvocation`.
     * @param ctx the parse tree
     */
    enterExplicitConstructorInvocation?: (ctx: ExplicitConstructorInvocationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.explicitConstructorInvocation`.
     * @param ctx the parse tree
     */
    exitExplicitConstructorInvocation?: (ctx: ExplicitConstructorInvocationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.enumDeclaration`.
     * @param ctx the parse tree
     */
    enterEnumDeclaration?: (ctx: EnumDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.enumDeclaration`.
     * @param ctx the parse tree
     */
    exitEnumDeclaration?: (ctx: EnumDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.enumBody`.
     * @param ctx the parse tree
     */
    enterEnumBody?: (ctx: EnumBodyContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.enumBody`.
     * @param ctx the parse tree
     */
    exitEnumBody?: (ctx: EnumBodyContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.enumConstantList`.
     * @param ctx the parse tree
     */
    enterEnumConstantList?: (ctx: EnumConstantListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.enumConstantList`.
     * @param ctx the parse tree
     */
    exitEnumConstantList?: (ctx: EnumConstantListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.enumConstant`.
     * @param ctx the parse tree
     */
    enterEnumConstant?: (ctx: EnumConstantContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.enumConstant`.
     * @param ctx the parse tree
     */
    exitEnumConstant?: (ctx: EnumConstantContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.enumConstantModifier`.
     * @param ctx the parse tree
     */
    enterEnumConstantModifier?: (ctx: EnumConstantModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.enumConstantModifier`.
     * @param ctx the parse tree
     */
    exitEnumConstantModifier?: (ctx: EnumConstantModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.enumBodyDeclarations`.
     * @param ctx the parse tree
     */
    enterEnumBodyDeclarations?: (ctx: EnumBodyDeclarationsContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.enumBodyDeclarations`.
     * @param ctx the parse tree
     */
    exitEnumBodyDeclarations?: (ctx: EnumBodyDeclarationsContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.recordDeclaration`.
     * @param ctx the parse tree
     */
    enterRecordDeclaration?: (ctx: RecordDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.recordDeclaration`.
     * @param ctx the parse tree
     */
    exitRecordDeclaration?: (ctx: RecordDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.recordHeader`.
     * @param ctx the parse tree
     */
    enterRecordHeader?: (ctx: RecordHeaderContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.recordHeader`.
     * @param ctx the parse tree
     */
    exitRecordHeader?: (ctx: RecordHeaderContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.recordComponentList`.
     * @param ctx the parse tree
     */
    enterRecordComponentList?: (ctx: RecordComponentListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.recordComponentList`.
     * @param ctx the parse tree
     */
    exitRecordComponentList?: (ctx: RecordComponentListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.recordComponent`.
     * @param ctx the parse tree
     */
    enterRecordComponent?: (ctx: RecordComponentContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.recordComponent`.
     * @param ctx the parse tree
     */
    exitRecordComponent?: (ctx: RecordComponentContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.variableArityRecordComponent`.
     * @param ctx the parse tree
     */
    enterVariableArityRecordComponent?: (ctx: VariableArityRecordComponentContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.variableArityRecordComponent`.
     * @param ctx the parse tree
     */
    exitVariableArityRecordComponent?: (ctx: VariableArityRecordComponentContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.recordComponentModifier`.
     * @param ctx the parse tree
     */
    enterRecordComponentModifier?: (ctx: RecordComponentModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.recordComponentModifier`.
     * @param ctx the parse tree
     */
    exitRecordComponentModifier?: (ctx: RecordComponentModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.recordBody`.
     * @param ctx the parse tree
     */
    enterRecordBody?: (ctx: RecordBodyContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.recordBody`.
     * @param ctx the parse tree
     */
    exitRecordBody?: (ctx: RecordBodyContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.recordBodyDeclaration`.
     * @param ctx the parse tree
     */
    enterRecordBodyDeclaration?: (ctx: RecordBodyDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.recordBodyDeclaration`.
     * @param ctx the parse tree
     */
    exitRecordBodyDeclaration?: (ctx: RecordBodyDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.compactConstructorDeclaration`.
     * @param ctx the parse tree
     */
    enterCompactConstructorDeclaration?: (ctx: CompactConstructorDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.compactConstructorDeclaration`.
     * @param ctx the parse tree
     */
    exitCompactConstructorDeclaration?: (ctx: CompactConstructorDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.interfaceDeclaration`.
     * @param ctx the parse tree
     */
    enterInterfaceDeclaration?: (ctx: InterfaceDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.interfaceDeclaration`.
     * @param ctx the parse tree
     */
    exitInterfaceDeclaration?: (ctx: InterfaceDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.normalInterfaceDeclaration`.
     * @param ctx the parse tree
     */
    enterNormalInterfaceDeclaration?: (ctx: NormalInterfaceDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.normalInterfaceDeclaration`.
     * @param ctx the parse tree
     */
    exitNormalInterfaceDeclaration?: (ctx: NormalInterfaceDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.interfaceModifier`.
     * @param ctx the parse tree
     */
    enterInterfaceModifier?: (ctx: InterfaceModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.interfaceModifier`.
     * @param ctx the parse tree
     */
    exitInterfaceModifier?: (ctx: InterfaceModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.interfaceExtends`.
     * @param ctx the parse tree
     */
    enterInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.interfaceExtends`.
     * @param ctx the parse tree
     */
    exitInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.interfacePermits`.
     * @param ctx the parse tree
     */
    enterInterfacePermits?: (ctx: InterfacePermitsContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.interfacePermits`.
     * @param ctx the parse tree
     */
    exitInterfacePermits?: (ctx: InterfacePermitsContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.interfaceBody`.
     * @param ctx the parse tree
     */
    enterInterfaceBody?: (ctx: InterfaceBodyContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.interfaceBody`.
     * @param ctx the parse tree
     */
    exitInterfaceBody?: (ctx: InterfaceBodyContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.interfaceMemberDeclaration`.
     * @param ctx the parse tree
     */
    enterInterfaceMemberDeclaration?: (ctx: InterfaceMemberDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.interfaceMemberDeclaration`.
     * @param ctx the parse tree
     */
    exitInterfaceMemberDeclaration?: (ctx: InterfaceMemberDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.constantDeclaration`.
     * @param ctx the parse tree
     */
    enterConstantDeclaration?: (ctx: ConstantDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.constantDeclaration`.
     * @param ctx the parse tree
     */
    exitConstantDeclaration?: (ctx: ConstantDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.constantModifier`.
     * @param ctx the parse tree
     */
    enterConstantModifier?: (ctx: ConstantModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.constantModifier`.
     * @param ctx the parse tree
     */
    exitConstantModifier?: (ctx: ConstantModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.interfaceMethodDeclaration`.
     * @param ctx the parse tree
     */
    enterInterfaceMethodDeclaration?: (ctx: InterfaceMethodDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.interfaceMethodDeclaration`.
     * @param ctx the parse tree
     */
    exitInterfaceMethodDeclaration?: (ctx: InterfaceMethodDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.interfaceMethodModifier`.
     * @param ctx the parse tree
     */
    enterInterfaceMethodModifier?: (ctx: InterfaceMethodModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.interfaceMethodModifier`.
     * @param ctx the parse tree
     */
    exitInterfaceMethodModifier?: (ctx: InterfaceMethodModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.annotationInterfaceDeclaration`.
     * @param ctx the parse tree
     */
    enterAnnotationInterfaceDeclaration?: (ctx: AnnotationInterfaceDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.annotationInterfaceDeclaration`.
     * @param ctx the parse tree
     */
    exitAnnotationInterfaceDeclaration?: (ctx: AnnotationInterfaceDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.annotationInterfaceBody`.
     * @param ctx the parse tree
     */
    enterAnnotationInterfaceBody?: (ctx: AnnotationInterfaceBodyContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.annotationInterfaceBody`.
     * @param ctx the parse tree
     */
    exitAnnotationInterfaceBody?: (ctx: AnnotationInterfaceBodyContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.annotationInterfaceMemberDeclaration`.
     * @param ctx the parse tree
     */
    enterAnnotationInterfaceMemberDeclaration?: (ctx: AnnotationInterfaceMemberDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.annotationInterfaceMemberDeclaration`.
     * @param ctx the parse tree
     */
    exitAnnotationInterfaceMemberDeclaration?: (ctx: AnnotationInterfaceMemberDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.annotationInterfaceElementDeclaration`.
     * @param ctx the parse tree
     */
    enterAnnotationInterfaceElementDeclaration?: (ctx: AnnotationInterfaceElementDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.annotationInterfaceElementDeclaration`.
     * @param ctx the parse tree
     */
    exitAnnotationInterfaceElementDeclaration?: (ctx: AnnotationInterfaceElementDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.annotationInterfaceElementModifier`.
     * @param ctx the parse tree
     */
    enterAnnotationInterfaceElementModifier?: (ctx: AnnotationInterfaceElementModifierContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.annotationInterfaceElementModifier`.
     * @param ctx the parse tree
     */
    exitAnnotationInterfaceElementModifier?: (ctx: AnnotationInterfaceElementModifierContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.defaultValue`.
     * @param ctx the parse tree
     */
    enterDefaultValue?: (ctx: DefaultValueContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.defaultValue`.
     * @param ctx the parse tree
     */
    exitDefaultValue?: (ctx: DefaultValueContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.annotation`.
     * @param ctx the parse tree
     */
    enterAnnotation?: (ctx: AnnotationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.annotation`.
     * @param ctx the parse tree
     */
    exitAnnotation?: (ctx: AnnotationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.normalAnnotation`.
     * @param ctx the parse tree
     */
    enterNormalAnnotation?: (ctx: NormalAnnotationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.normalAnnotation`.
     * @param ctx the parse tree
     */
    exitNormalAnnotation?: (ctx: NormalAnnotationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.elementValuePairList`.
     * @param ctx the parse tree
     */
    enterElementValuePairList?: (ctx: ElementValuePairListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.elementValuePairList`.
     * @param ctx the parse tree
     */
    exitElementValuePairList?: (ctx: ElementValuePairListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.elementValuePair`.
     * @param ctx the parse tree
     */
    enterElementValuePair?: (ctx: ElementValuePairContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.elementValuePair`.
     * @param ctx the parse tree
     */
    exitElementValuePair?: (ctx: ElementValuePairContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.elementValue`.
     * @param ctx the parse tree
     */
    enterElementValue?: (ctx: ElementValueContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.elementValue`.
     * @param ctx the parse tree
     */
    exitElementValue?: (ctx: ElementValueContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.elementValueArrayInitializer`.
     * @param ctx the parse tree
     */
    enterElementValueArrayInitializer?: (ctx: ElementValueArrayInitializerContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.elementValueArrayInitializer`.
     * @param ctx the parse tree
     */
    exitElementValueArrayInitializer?: (ctx: ElementValueArrayInitializerContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.elementValueList`.
     * @param ctx the parse tree
     */
    enterElementValueList?: (ctx: ElementValueListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.elementValueList`.
     * @param ctx the parse tree
     */
    exitElementValueList?: (ctx: ElementValueListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.markerAnnotation`.
     * @param ctx the parse tree
     */
    enterMarkerAnnotation?: (ctx: MarkerAnnotationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.markerAnnotation`.
     * @param ctx the parse tree
     */
    exitMarkerAnnotation?: (ctx: MarkerAnnotationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.singleElementAnnotation`.
     * @param ctx the parse tree
     */
    enterSingleElementAnnotation?: (ctx: SingleElementAnnotationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.singleElementAnnotation`.
     * @param ctx the parse tree
     */
    exitSingleElementAnnotation?: (ctx: SingleElementAnnotationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.arrayInitializer`.
     * @param ctx the parse tree
     */
    enterArrayInitializer?: (ctx: ArrayInitializerContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.arrayInitializer`.
     * @param ctx the parse tree
     */
    exitArrayInitializer?: (ctx: ArrayInitializerContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.variableInitializerList`.
     * @param ctx the parse tree
     */
    enterVariableInitializerList?: (ctx: VariableInitializerListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.variableInitializerList`.
     * @param ctx the parse tree
     */
    exitVariableInitializerList?: (ctx: VariableInitializerListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.blockStatements`.
     * @param ctx the parse tree
     */
    enterBlockStatements?: (ctx: BlockStatementsContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.blockStatements`.
     * @param ctx the parse tree
     */
    exitBlockStatements?: (ctx: BlockStatementsContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.blockStatement`.
     * @param ctx the parse tree
     */
    enterBlockStatement?: (ctx: BlockStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.blockStatement`.
     * @param ctx the parse tree
     */
    exitBlockStatement?: (ctx: BlockStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.localClassOrInterfaceDeclaration`.
     * @param ctx the parse tree
     */
    enterLocalClassOrInterfaceDeclaration?: (ctx: LocalClassOrInterfaceDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.localClassOrInterfaceDeclaration`.
     * @param ctx the parse tree
     */
    exitLocalClassOrInterfaceDeclaration?: (ctx: LocalClassOrInterfaceDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.localVariableDeclaration`.
     * @param ctx the parse tree
     */
    enterLocalVariableDeclaration?: (ctx: LocalVariableDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.localVariableDeclaration`.
     * @param ctx the parse tree
     */
    exitLocalVariableDeclaration?: (ctx: LocalVariableDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.localVariableType`.
     * @param ctx the parse tree
     */
    enterLocalVariableType?: (ctx: LocalVariableTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.localVariableType`.
     * @param ctx the parse tree
     */
    exitLocalVariableType?: (ctx: LocalVariableTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.localVariableDeclarationStatement`.
     * @param ctx the parse tree
     */
    enterLocalVariableDeclarationStatement?: (ctx: LocalVariableDeclarationStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.localVariableDeclarationStatement`.
     * @param ctx the parse tree
     */
    exitLocalVariableDeclarationStatement?: (ctx: LocalVariableDeclarationStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.statementNoShortIf`.
     * @param ctx the parse tree
     */
    enterStatementNoShortIf?: (ctx: StatementNoShortIfContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.statementNoShortIf`.
     * @param ctx the parse tree
     */
    exitStatementNoShortIf?: (ctx: StatementNoShortIfContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.statementWithoutTrailingSubstatement`.
     * @param ctx the parse tree
     */
    enterStatementWithoutTrailingSubstatement?: (ctx: StatementWithoutTrailingSubstatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.statementWithoutTrailingSubstatement`.
     * @param ctx the parse tree
     */
    exitStatementWithoutTrailingSubstatement?: (ctx: StatementWithoutTrailingSubstatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.emptyStatement_`.
     * @param ctx the parse tree
     */
    enterEmptyStatement_?: (ctx: EmptyStatement_Context) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.emptyStatement_`.
     * @param ctx the parse tree
     */
    exitEmptyStatement_?: (ctx: EmptyStatement_Context) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.labeledStatement`.
     * @param ctx the parse tree
     */
    enterLabeledStatement?: (ctx: LabeledStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.labeledStatement`.
     * @param ctx the parse tree
     */
    exitLabeledStatement?: (ctx: LabeledStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.labeledStatementNoShortIf`.
     * @param ctx the parse tree
     */
    enterLabeledStatementNoShortIf?: (ctx: LabeledStatementNoShortIfContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.labeledStatementNoShortIf`.
     * @param ctx the parse tree
     */
    exitLabeledStatementNoShortIf?: (ctx: LabeledStatementNoShortIfContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.expressionStatement`.
     * @param ctx the parse tree
     */
    enterExpressionStatement?: (ctx: ExpressionStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.expressionStatement`.
     * @param ctx the parse tree
     */
    exitExpressionStatement?: (ctx: ExpressionStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.statementExpression`.
     * @param ctx the parse tree
     */
    enterStatementExpression?: (ctx: StatementExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.statementExpression`.
     * @param ctx the parse tree
     */
    exitStatementExpression?: (ctx: StatementExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.ifThenStatement`.
     * @param ctx the parse tree
     */
    enterIfThenStatement?: (ctx: IfThenStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.ifThenStatement`.
     * @param ctx the parse tree
     */
    exitIfThenStatement?: (ctx: IfThenStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.ifThenElseStatement`.
     * @param ctx the parse tree
     */
    enterIfThenElseStatement?: (ctx: IfThenElseStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.ifThenElseStatement`.
     * @param ctx the parse tree
     */
    exitIfThenElseStatement?: (ctx: IfThenElseStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.ifThenElseStatementNoShortIf`.
     * @param ctx the parse tree
     */
    enterIfThenElseStatementNoShortIf?: (ctx: IfThenElseStatementNoShortIfContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.ifThenElseStatementNoShortIf`.
     * @param ctx the parse tree
     */
    exitIfThenElseStatementNoShortIf?: (ctx: IfThenElseStatementNoShortIfContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.assertStatement`.
     * @param ctx the parse tree
     */
    enterAssertStatement?: (ctx: AssertStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.assertStatement`.
     * @param ctx the parse tree
     */
    exitAssertStatement?: (ctx: AssertStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.switchStatement`.
     * @param ctx the parse tree
     */
    enterSwitchStatement?: (ctx: SwitchStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.switchStatement`.
     * @param ctx the parse tree
     */
    exitSwitchStatement?: (ctx: SwitchStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.switchBlock`.
     * @param ctx the parse tree
     */
    enterSwitchBlock?: (ctx: SwitchBlockContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.switchBlock`.
     * @param ctx the parse tree
     */
    exitSwitchBlock?: (ctx: SwitchBlockContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.switchRule`.
     * @param ctx the parse tree
     */
    enterSwitchRule?: (ctx: SwitchRuleContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.switchRule`.
     * @param ctx the parse tree
     */
    exitSwitchRule?: (ctx: SwitchRuleContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.switchBlockStatementGroup`.
     * @param ctx the parse tree
     */
    enterSwitchBlockStatementGroup?: (ctx: SwitchBlockStatementGroupContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.switchBlockStatementGroup`.
     * @param ctx the parse tree
     */
    exitSwitchBlockStatementGroup?: (ctx: SwitchBlockStatementGroupContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.switchLabel`.
     * @param ctx the parse tree
     */
    enterSwitchLabel?: (ctx: SwitchLabelContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.switchLabel`.
     * @param ctx the parse tree
     */
    exitSwitchLabel?: (ctx: SwitchLabelContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.caseConstant`.
     * @param ctx the parse tree
     */
    enterCaseConstant?: (ctx: CaseConstantContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.caseConstant`.
     * @param ctx the parse tree
     */
    exitCaseConstant?: (ctx: CaseConstantContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.whileStatement`.
     * @param ctx the parse tree
     */
    enterWhileStatement?: (ctx: WhileStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.whileStatement`.
     * @param ctx the parse tree
     */
    exitWhileStatement?: (ctx: WhileStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.whileStatementNoShortIf`.
     * @param ctx the parse tree
     */
    enterWhileStatementNoShortIf?: (ctx: WhileStatementNoShortIfContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.whileStatementNoShortIf`.
     * @param ctx the parse tree
     */
    exitWhileStatementNoShortIf?: (ctx: WhileStatementNoShortIfContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.doStatement`.
     * @param ctx the parse tree
     */
    enterDoStatement?: (ctx: DoStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.doStatement`.
     * @param ctx the parse tree
     */
    exitDoStatement?: (ctx: DoStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.forStatement`.
     * @param ctx the parse tree
     */
    enterForStatement?: (ctx: ForStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.forStatement`.
     * @param ctx the parse tree
     */
    exitForStatement?: (ctx: ForStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.forStatementNoShortIf`.
     * @param ctx the parse tree
     */
    enterForStatementNoShortIf?: (ctx: ForStatementNoShortIfContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.forStatementNoShortIf`.
     * @param ctx the parse tree
     */
    exitForStatementNoShortIf?: (ctx: ForStatementNoShortIfContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.basicForStatement`.
     * @param ctx the parse tree
     */
    enterBasicForStatement?: (ctx: BasicForStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.basicForStatement`.
     * @param ctx the parse tree
     */
    exitBasicForStatement?: (ctx: BasicForStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.basicForStatementNoShortIf`.
     * @param ctx the parse tree
     */
    enterBasicForStatementNoShortIf?: (ctx: BasicForStatementNoShortIfContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.basicForStatementNoShortIf`.
     * @param ctx the parse tree
     */
    exitBasicForStatementNoShortIf?: (ctx: BasicForStatementNoShortIfContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.forInit`.
     * @param ctx the parse tree
     */
    enterForInit?: (ctx: ForInitContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.forInit`.
     * @param ctx the parse tree
     */
    exitForInit?: (ctx: ForInitContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.forUpdate`.
     * @param ctx the parse tree
     */
    enterForUpdate?: (ctx: ForUpdateContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.forUpdate`.
     * @param ctx the parse tree
     */
    exitForUpdate?: (ctx: ForUpdateContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.statementExpressionList`.
     * @param ctx the parse tree
     */
    enterStatementExpressionList?: (ctx: StatementExpressionListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.statementExpressionList`.
     * @param ctx the parse tree
     */
    exitStatementExpressionList?: (ctx: StatementExpressionListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.enhancedForStatement`.
     * @param ctx the parse tree
     */
    enterEnhancedForStatement?: (ctx: EnhancedForStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.enhancedForStatement`.
     * @param ctx the parse tree
     */
    exitEnhancedForStatement?: (ctx: EnhancedForStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.enhancedForStatementNoShortIf`.
     * @param ctx the parse tree
     */
    enterEnhancedForStatementNoShortIf?: (ctx: EnhancedForStatementNoShortIfContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.enhancedForStatementNoShortIf`.
     * @param ctx the parse tree
     */
    exitEnhancedForStatementNoShortIf?: (ctx: EnhancedForStatementNoShortIfContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.breakStatement`.
     * @param ctx the parse tree
     */
    enterBreakStatement?: (ctx: BreakStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.breakStatement`.
     * @param ctx the parse tree
     */
    exitBreakStatement?: (ctx: BreakStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.continueStatement`.
     * @param ctx the parse tree
     */
    enterContinueStatement?: (ctx: ContinueStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.continueStatement`.
     * @param ctx the parse tree
     */
    exitContinueStatement?: (ctx: ContinueStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.returnStatement`.
     * @param ctx the parse tree
     */
    enterReturnStatement?: (ctx: ReturnStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.returnStatement`.
     * @param ctx the parse tree
     */
    exitReturnStatement?: (ctx: ReturnStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.throwStatement`.
     * @param ctx the parse tree
     */
    enterThrowStatement?: (ctx: ThrowStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.throwStatement`.
     * @param ctx the parse tree
     */
    exitThrowStatement?: (ctx: ThrowStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.synchronizedStatement`.
     * @param ctx the parse tree
     */
    enterSynchronizedStatement?: (ctx: SynchronizedStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.synchronizedStatement`.
     * @param ctx the parse tree
     */
    exitSynchronizedStatement?: (ctx: SynchronizedStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.tryStatement`.
     * @param ctx the parse tree
     */
    enterTryStatement?: (ctx: TryStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.tryStatement`.
     * @param ctx the parse tree
     */
    exitTryStatement?: (ctx: TryStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.catches`.
     * @param ctx the parse tree
     */
    enterCatches?: (ctx: CatchesContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.catches`.
     * @param ctx the parse tree
     */
    exitCatches?: (ctx: CatchesContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.catchClause`.
     * @param ctx the parse tree
     */
    enterCatchClause?: (ctx: CatchClauseContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.catchClause`.
     * @param ctx the parse tree
     */
    exitCatchClause?: (ctx: CatchClauseContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.catchFormalParameter`.
     * @param ctx the parse tree
     */
    enterCatchFormalParameter?: (ctx: CatchFormalParameterContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.catchFormalParameter`.
     * @param ctx the parse tree
     */
    exitCatchFormalParameter?: (ctx: CatchFormalParameterContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.catchType`.
     * @param ctx the parse tree
     */
    enterCatchType?: (ctx: CatchTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.catchType`.
     * @param ctx the parse tree
     */
    exitCatchType?: (ctx: CatchTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.finallyBlock`.
     * @param ctx the parse tree
     */
    enterFinallyBlock?: (ctx: FinallyBlockContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.finallyBlock`.
     * @param ctx the parse tree
     */
    exitFinallyBlock?: (ctx: FinallyBlockContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.tryWithResourcesStatement`.
     * @param ctx the parse tree
     */
    enterTryWithResourcesStatement?: (ctx: TryWithResourcesStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.tryWithResourcesStatement`.
     * @param ctx the parse tree
     */
    exitTryWithResourcesStatement?: (ctx: TryWithResourcesStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.resourceSpecification`.
     * @param ctx the parse tree
     */
    enterResourceSpecification?: (ctx: ResourceSpecificationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.resourceSpecification`.
     * @param ctx the parse tree
     */
    exitResourceSpecification?: (ctx: ResourceSpecificationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.resourceList`.
     * @param ctx the parse tree
     */
    enterResourceList?: (ctx: ResourceListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.resourceList`.
     * @param ctx the parse tree
     */
    exitResourceList?: (ctx: ResourceListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.resource`.
     * @param ctx the parse tree
     */
    enterResource?: (ctx: ResourceContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.resource`.
     * @param ctx the parse tree
     */
    exitResource?: (ctx: ResourceContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.variableAccess`.
     * @param ctx the parse tree
     */
    enterVariableAccess?: (ctx: VariableAccessContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.variableAccess`.
     * @param ctx the parse tree
     */
    exitVariableAccess?: (ctx: VariableAccessContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.yieldStatement`.
     * @param ctx the parse tree
     */
    enterYieldStatement?: (ctx: YieldStatementContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.yieldStatement`.
     * @param ctx the parse tree
     */
    exitYieldStatement?: (ctx: YieldStatementContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.pattern`.
     * @param ctx the parse tree
     */
    enterPattern?: (ctx: PatternContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.pattern`.
     * @param ctx the parse tree
     */
    exitPattern?: (ctx: PatternContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typePattern`.
     * @param ctx the parse tree
     */
    enterTypePattern?: (ctx: TypePatternContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typePattern`.
     * @param ctx the parse tree
     */
    exitTypePattern?: (ctx: TypePatternContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.primary`.
     * @param ctx the parse tree
     */
    enterPrimary?: (ctx: PrimaryContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.primary`.
     * @param ctx the parse tree
     */
    exitPrimary?: (ctx: PrimaryContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.primaryNoNewArray`.
     * @param ctx the parse tree
     */
    enterPrimaryNoNewArray?: (ctx: PrimaryNoNewArrayContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.primaryNoNewArray`.
     * @param ctx the parse tree
     */
    exitPrimaryNoNewArray?: (ctx: PrimaryNoNewArrayContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.pNNA`.
     * @param ctx the parse tree
     */
    enterPNNA?: (ctx: PNNAContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.pNNA`.
     * @param ctx the parse tree
     */
    exitPNNA?: (ctx: PNNAContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classLiteral`.
     * @param ctx the parse tree
     */
    enterClassLiteral?: (ctx: ClassLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classLiteral`.
     * @param ctx the parse tree
     */
    exitClassLiteral?: (ctx: ClassLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classInstanceCreationExpression`.
     * @param ctx the parse tree
     */
    enterClassInstanceCreationExpression?: (ctx: ClassInstanceCreationExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classInstanceCreationExpression`.
     * @param ctx the parse tree
     */
    exitClassInstanceCreationExpression?: (ctx: ClassInstanceCreationExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.unqualifiedClassInstanceCreationExpression`.
     * @param ctx the parse tree
     */
    enterUnqualifiedClassInstanceCreationExpression?: (ctx: UnqualifiedClassInstanceCreationExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.unqualifiedClassInstanceCreationExpression`.
     * @param ctx the parse tree
     */
    exitUnqualifiedClassInstanceCreationExpression?: (ctx: UnqualifiedClassInstanceCreationExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.classOrInterfaceTypeToInstantiate`.
     * @param ctx the parse tree
     */
    enterClassOrInterfaceTypeToInstantiate?: (ctx: ClassOrInterfaceTypeToInstantiateContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.classOrInterfaceTypeToInstantiate`.
     * @param ctx the parse tree
     */
    exitClassOrInterfaceTypeToInstantiate?: (ctx: ClassOrInterfaceTypeToInstantiateContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.typeArgumentsOrDiamond`.
     * @param ctx the parse tree
     */
    enterTypeArgumentsOrDiamond?: (ctx: TypeArgumentsOrDiamondContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.typeArgumentsOrDiamond`.
     * @param ctx the parse tree
     */
    exitTypeArgumentsOrDiamond?: (ctx: TypeArgumentsOrDiamondContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.arrayCreationExpression`.
     * @param ctx the parse tree
     */
    enterArrayCreationExpression?: (ctx: ArrayCreationExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.arrayCreationExpression`.
     * @param ctx the parse tree
     */
    exitArrayCreationExpression?: (ctx: ArrayCreationExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.arrayCreationExpressionWithoutInitializer`.
     * @param ctx the parse tree
     */
    enterArrayCreationExpressionWithoutInitializer?: (ctx: ArrayCreationExpressionWithoutInitializerContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.arrayCreationExpressionWithoutInitializer`.
     * @param ctx the parse tree
     */
    exitArrayCreationExpressionWithoutInitializer?: (ctx: ArrayCreationExpressionWithoutInitializerContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.arrayCreationExpressionWithInitializer`.
     * @param ctx the parse tree
     */
    enterArrayCreationExpressionWithInitializer?: (ctx: ArrayCreationExpressionWithInitializerContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.arrayCreationExpressionWithInitializer`.
     * @param ctx the parse tree
     */
    exitArrayCreationExpressionWithInitializer?: (ctx: ArrayCreationExpressionWithInitializerContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.dimExprs`.
     * @param ctx the parse tree
     */
    enterDimExprs?: (ctx: DimExprsContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.dimExprs`.
     * @param ctx the parse tree
     */
    exitDimExprs?: (ctx: DimExprsContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.dimExpr`.
     * @param ctx the parse tree
     */
    enterDimExpr?: (ctx: DimExprContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.dimExpr`.
     * @param ctx the parse tree
     */
    exitDimExpr?: (ctx: DimExprContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.arrayAccess`.
     * @param ctx the parse tree
     */
    enterArrayAccess?: (ctx: ArrayAccessContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.arrayAccess`.
     * @param ctx the parse tree
     */
    exitArrayAccess?: (ctx: ArrayAccessContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.fieldAccess`.
     * @param ctx the parse tree
     */
    enterFieldAccess?: (ctx: FieldAccessContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.fieldAccess`.
     * @param ctx the parse tree
     */
    exitFieldAccess?: (ctx: FieldAccessContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.methodInvocation`.
     * @param ctx the parse tree
     */
    enterMethodInvocation?: (ctx: MethodInvocationContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.methodInvocation`.
     * @param ctx the parse tree
     */
    exitMethodInvocation?: (ctx: MethodInvocationContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.argumentList`.
     * @param ctx the parse tree
     */
    enterArgumentList?: (ctx: ArgumentListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.argumentList`.
     * @param ctx the parse tree
     */
    exitArgumentList?: (ctx: ArgumentListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.methodReference`.
     * @param ctx the parse tree
     */
    enterMethodReference?: (ctx: MethodReferenceContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.methodReference`.
     * @param ctx the parse tree
     */
    exitMethodReference?: (ctx: MethodReferenceContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.postfixExpression`.
     * @param ctx the parse tree
     */
    enterPostfixExpression?: (ctx: PostfixExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.postfixExpression`.
     * @param ctx the parse tree
     */
    exitPostfixExpression?: (ctx: PostfixExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.pfE`.
     * @param ctx the parse tree
     */
    enterPfE?: (ctx: PfEContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.pfE`.
     * @param ctx the parse tree
     */
    exitPfE?: (ctx: PfEContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.postIncrementExpression`.
     * @param ctx the parse tree
     */
    enterPostIncrementExpression?: (ctx: PostIncrementExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.postIncrementExpression`.
     * @param ctx the parse tree
     */
    exitPostIncrementExpression?: (ctx: PostIncrementExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.postDecrementExpression`.
     * @param ctx the parse tree
     */
    enterPostDecrementExpression?: (ctx: PostDecrementExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.postDecrementExpression`.
     * @param ctx the parse tree
     */
    exitPostDecrementExpression?: (ctx: PostDecrementExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.unaryExpression`.
     * @param ctx the parse tree
     */
    enterUnaryExpression?: (ctx: UnaryExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.unaryExpression`.
     * @param ctx the parse tree
     */
    exitUnaryExpression?: (ctx: UnaryExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.preIncrementExpression`.
     * @param ctx the parse tree
     */
    enterPreIncrementExpression?: (ctx: PreIncrementExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.preIncrementExpression`.
     * @param ctx the parse tree
     */
    exitPreIncrementExpression?: (ctx: PreIncrementExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.preDecrementExpression`.
     * @param ctx the parse tree
     */
    enterPreDecrementExpression?: (ctx: PreDecrementExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.preDecrementExpression`.
     * @param ctx the parse tree
     */
    exitPreDecrementExpression?: (ctx: PreDecrementExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.unaryExpressionNotPlusMinus`.
     * @param ctx the parse tree
     */
    enterUnaryExpressionNotPlusMinus?: (ctx: UnaryExpressionNotPlusMinusContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.unaryExpressionNotPlusMinus`.
     * @param ctx the parse tree
     */
    exitUnaryExpressionNotPlusMinus?: (ctx: UnaryExpressionNotPlusMinusContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.castExpression`.
     * @param ctx the parse tree
     */
    enterCastExpression?: (ctx: CastExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.castExpression`.
     * @param ctx the parse tree
     */
    exitCastExpression?: (ctx: CastExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.multiplicativeExpression`.
     * @param ctx the parse tree
     */
    enterMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.multiplicativeExpression`.
     * @param ctx the parse tree
     */
    exitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.additiveExpression`.
     * @param ctx the parse tree
     */
    enterAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.additiveExpression`.
     * @param ctx the parse tree
     */
    exitAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.shiftExpression`.
     * @param ctx the parse tree
     */
    enterShiftExpression?: (ctx: ShiftExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.shiftExpression`.
     * @param ctx the parse tree
     */
    exitShiftExpression?: (ctx: ShiftExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.relationalExpression`.
     * @param ctx the parse tree
     */
    enterRelationalExpression?: (ctx: RelationalExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.relationalExpression`.
     * @param ctx the parse tree
     */
    exitRelationalExpression?: (ctx: RelationalExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.equalityExpression`.
     * @param ctx the parse tree
     */
    enterEqualityExpression?: (ctx: EqualityExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.equalityExpression`.
     * @param ctx the parse tree
     */
    exitEqualityExpression?: (ctx: EqualityExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.andExpression`.
     * @param ctx the parse tree
     */
    enterAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.andExpression`.
     * @param ctx the parse tree
     */
    exitAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.exclusiveOrExpression`.
     * @param ctx the parse tree
     */
    enterExclusiveOrExpression?: (ctx: ExclusiveOrExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.exclusiveOrExpression`.
     * @param ctx the parse tree
     */
    exitExclusiveOrExpression?: (ctx: ExclusiveOrExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.inclusiveOrExpression`.
     * @param ctx the parse tree
     */
    enterInclusiveOrExpression?: (ctx: InclusiveOrExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.inclusiveOrExpression`.
     * @param ctx the parse tree
     */
    exitInclusiveOrExpression?: (ctx: InclusiveOrExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.conditionalAndExpression`.
     * @param ctx the parse tree
     */
    enterConditionalAndExpression?: (ctx: ConditionalAndExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.conditionalAndExpression`.
     * @param ctx the parse tree
     */
    exitConditionalAndExpression?: (ctx: ConditionalAndExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.conditionalOrExpression`.
     * @param ctx the parse tree
     */
    enterConditionalOrExpression?: (ctx: ConditionalOrExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.conditionalOrExpression`.
     * @param ctx the parse tree
     */
    exitConditionalOrExpression?: (ctx: ConditionalOrExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.conditionalExpression`.
     * @param ctx the parse tree
     */
    enterConditionalExpression?: (ctx: ConditionalExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.conditionalExpression`.
     * @param ctx the parse tree
     */
    exitConditionalExpression?: (ctx: ConditionalExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.assignmentExpression`.
     * @param ctx the parse tree
     */
    enterAssignmentExpression?: (ctx: AssignmentExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.assignmentExpression`.
     * @param ctx the parse tree
     */
    exitAssignmentExpression?: (ctx: AssignmentExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.assignment`.
     * @param ctx the parse tree
     */
    enterAssignment?: (ctx: AssignmentContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.assignment`.
     * @param ctx the parse tree
     */
    exitAssignment?: (ctx: AssignmentContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.leftHandSide`.
     * @param ctx the parse tree
     */
    enterLeftHandSide?: (ctx: LeftHandSideContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.leftHandSide`.
     * @param ctx the parse tree
     */
    exitLeftHandSide?: (ctx: LeftHandSideContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.assignmentOperator`.
     * @param ctx the parse tree
     */
    enterAssignmentOperator?: (ctx: AssignmentOperatorContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.assignmentOperator`.
     * @param ctx the parse tree
     */
    exitAssignmentOperator?: (ctx: AssignmentOperatorContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.lambdaExpression`.
     * @param ctx the parse tree
     */
    enterLambdaExpression?: (ctx: LambdaExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.lambdaExpression`.
     * @param ctx the parse tree
     */
    exitLambdaExpression?: (ctx: LambdaExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.lambdaParameters`.
     * @param ctx the parse tree
     */
    enterLambdaParameters?: (ctx: LambdaParametersContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.lambdaParameters`.
     * @param ctx the parse tree
     */
    exitLambdaParameters?: (ctx: LambdaParametersContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.lambdaParameterList`.
     * @param ctx the parse tree
     */
    enterLambdaParameterList?: (ctx: LambdaParameterListContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.lambdaParameterList`.
     * @param ctx the parse tree
     */
    exitLambdaParameterList?: (ctx: LambdaParameterListContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.lambdaParameter`.
     * @param ctx the parse tree
     */
    enterLambdaParameter?: (ctx: LambdaParameterContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.lambdaParameter`.
     * @param ctx the parse tree
     */
    exitLambdaParameter?: (ctx: LambdaParameterContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.lambdaParameterType`.
     * @param ctx the parse tree
     */
    enterLambdaParameterType?: (ctx: LambdaParameterTypeContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.lambdaParameterType`.
     * @param ctx the parse tree
     */
    exitLambdaParameterType?: (ctx: LambdaParameterTypeContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.lambdaBody`.
     * @param ctx the parse tree
     */
    enterLambdaBody?: (ctx: LambdaBodyContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.lambdaBody`.
     * @param ctx the parse tree
     */
    exitLambdaBody?: (ctx: LambdaBodyContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.switchExpression`.
     * @param ctx the parse tree
     */
    enterSwitchExpression?: (ctx: SwitchExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.switchExpression`.
     * @param ctx the parse tree
     */
    exitSwitchExpression?: (ctx: SwitchExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Java20Parser.constantExpression`.
     * @param ctx the parse tree
     */
    enterConstantExpression?: (ctx: ConstantExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Java20Parser.constantExpression`.
     * @param ctx the parse tree
     */
    exitConstantExpression?: (ctx: ConstantExpressionContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

