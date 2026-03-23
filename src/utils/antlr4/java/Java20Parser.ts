
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Java20ParserListener } from "./Java20ParserListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Java20Parser extends antlr.Parser {
    public static readonly EXPORTS = 1;
    public static readonly MODULE = 2;
    public static readonly NONSEALED = 3;
    public static readonly OACA = 4;
    public static readonly OPEN = 5;
    public static readonly OPENS = 6;
    public static readonly PERMITS = 7;
    public static readonly PROVIDES = 8;
    public static readonly RECORD = 9;
    public static readonly REQUIRES = 10;
    public static readonly SEALED = 11;
    public static readonly TO = 12;
    public static readonly TRANSITIVE = 13;
    public static readonly USES = 14;
    public static readonly VAR = 15;
    public static readonly WITH = 16;
    public static readonly YIELD = 17;
    public static readonly ABSTRACT = 18;
    public static readonly ASSERT = 19;
    public static readonly BOOLEAN = 20;
    public static readonly BREAK = 21;
    public static readonly BYTE = 22;
    public static readonly CASE = 23;
    public static readonly CATCH = 24;
    public static readonly CHAR = 25;
    public static readonly CLASS = 26;
    public static readonly CONST = 27;
    public static readonly CONTINUE = 28;
    public static readonly DEFAULT = 29;
    public static readonly DO = 30;
    public static readonly DOUBLE = 31;
    public static readonly ELSE = 32;
    public static readonly ENUM = 33;
    public static readonly EXTENDS = 34;
    public static readonly FINAL = 35;
    public static readonly FINALLY = 36;
    public static readonly FLOAT = 37;
    public static readonly FOR = 38;
    public static readonly IF = 39;
    public static readonly GOTO = 40;
    public static readonly IMPLEMENTS = 41;
    public static readonly IMPORT = 42;
    public static readonly INSTANCEOF = 43;
    public static readonly INT = 44;
    public static readonly INTERFACE = 45;
    public static readonly LONG = 46;
    public static readonly NATIVE = 47;
    public static readonly NEW = 48;
    public static readonly PACKAGE = 49;
    public static readonly PRIVATE = 50;
    public static readonly PROTECTED = 51;
    public static readonly PUBLIC = 52;
    public static readonly RETURN = 53;
    public static readonly SHORT = 54;
    public static readonly STATIC = 55;
    public static readonly STRICTFP = 56;
    public static readonly SUPER = 57;
    public static readonly SWITCH = 58;
    public static readonly SYNCHRONIZED = 59;
    public static readonly THIS = 60;
    public static readonly THROW = 61;
    public static readonly THROWS = 62;
    public static readonly TRANSIENT = 63;
    public static readonly TRY = 64;
    public static readonly VOID = 65;
    public static readonly VOLATILE = 66;
    public static readonly WHILE = 67;
    public static readonly UNDER_SCORE = 68;
    public static readonly IntegerLiteral = 69;
    public static readonly FloatingPointLiteral = 70;
    public static readonly BooleanLiteral = 71;
    public static readonly CharacterLiteral = 72;
    public static readonly StringLiteral = 73;
    public static readonly TextBlock = 74;
    public static readonly NullLiteral = 75;
    public static readonly LPAREN = 76;
    public static readonly RPAREN = 77;
    public static readonly LBRACE = 78;
    public static readonly RBRACE = 79;
    public static readonly LBRACK = 80;
    public static readonly RBRACK = 81;
    public static readonly SEMI = 82;
    public static readonly COMMA = 83;
    public static readonly DOT = 84;
    public static readonly ELLIPSIS = 85;
    public static readonly AT = 86;
    public static readonly COLONCOLON = 87;
    public static readonly ASSIGN = 88;
    public static readonly GT = 89;
    public static readonly LT = 90;
    public static readonly BANG = 91;
    public static readonly TILDE = 92;
    public static readonly QUESTION = 93;
    public static readonly COLON = 94;
    public static readonly ARROW = 95;
    public static readonly EQUAL = 96;
    public static readonly LE = 97;
    public static readonly GE = 98;
    public static readonly NOTEQUAL = 99;
    public static readonly AND = 100;
    public static readonly OR = 101;
    public static readonly INC = 102;
    public static readonly DEC = 103;
    public static readonly ADD = 104;
    public static readonly SUB = 105;
    public static readonly MUL = 106;
    public static readonly DIV = 107;
    public static readonly BITAND = 108;
    public static readonly BITOR = 109;
    public static readonly CARET = 110;
    public static readonly MOD = 111;
    public static readonly ADD_ASSIGN = 112;
    public static readonly SUB_ASSIGN = 113;
    public static readonly MUL_ASSIGN = 114;
    public static readonly DIV_ASSIGN = 115;
    public static readonly AND_ASSIGN = 116;
    public static readonly OR_ASSIGN = 117;
    public static readonly XOR_ASSIGN = 118;
    public static readonly MOD_ASSIGN = 119;
    public static readonly LSHIFT_ASSIGN = 120;
    public static readonly RSHIFT_ASSIGN = 121;
    public static readonly URSHIFT_ASSIGN = 122;
    public static readonly Identifier = 123;
    public static readonly WS = 124;
    public static readonly COMMENT = 125;
    public static readonly LINE_COMMENT = 126;
    public static readonly RULE_start_ = 0;
    public static readonly RULE_identifier = 1;
    public static readonly RULE_typeIdentifier = 2;
    public static readonly RULE_unqualifiedMethodIdentifier = 3;
    public static readonly RULE_contextualKeyword = 4;
    public static readonly RULE_contextualKeywordMinusForTypeIdentifier = 5;
    public static readonly RULE_contextualKeywordMinusForUnqualifiedMethodIdentifier = 6;
    public static readonly RULE_literal = 7;
    public static readonly RULE_primitiveType = 8;
    public static readonly RULE_numericType = 9;
    public static readonly RULE_integralType = 10;
    public static readonly RULE_floatingPointType = 11;
    public static readonly RULE_referenceType = 12;
    public static readonly RULE_coit = 13;
    public static readonly RULE_classOrInterfaceType = 14;
    public static readonly RULE_classType = 15;
    public static readonly RULE_interfaceType = 16;
    public static readonly RULE_typeVariable = 17;
    public static readonly RULE_arrayType = 18;
    public static readonly RULE_dims = 19;
    public static readonly RULE_typeParameter = 20;
    public static readonly RULE_typeParameterModifier = 21;
    public static readonly RULE_typeBound = 22;
    public static readonly RULE_additionalBound = 23;
    public static readonly RULE_typeArguments = 24;
    public static readonly RULE_typeArgumentList = 25;
    public static readonly RULE_typeArgument = 26;
    public static readonly RULE_wildcard = 27;
    public static readonly RULE_wildcardBounds = 28;
    public static readonly RULE_moduleName = 29;
    public static readonly RULE_packageName = 30;
    public static readonly RULE_typeName = 31;
    public static readonly RULE_packageOrTypeName = 32;
    public static readonly RULE_expressionName = 33;
    public static readonly RULE_methodName = 34;
    public static readonly RULE_ambiguousName = 35;
    public static readonly RULE_compilationUnit = 36;
    public static readonly RULE_ordinaryCompilationUnit = 37;
    public static readonly RULE_modularCompilationUnit = 38;
    public static readonly RULE_packageDeclaration = 39;
    public static readonly RULE_packageModifier = 40;
    public static readonly RULE_importDeclaration = 41;
    public static readonly RULE_singleTypeImportDeclaration = 42;
    public static readonly RULE_typeImportOnDemandDeclaration = 43;
    public static readonly RULE_singleStaticImportDeclaration = 44;
    public static readonly RULE_staticImportOnDemandDeclaration = 45;
    public static readonly RULE_topLevelClassOrInterfaceDeclaration = 46;
    public static readonly RULE_moduleDeclaration = 47;
    public static readonly RULE_moduleDirective = 48;
    public static readonly RULE_requiresModifier = 49;
    public static readonly RULE_classDeclaration = 50;
    public static readonly RULE_normalClassDeclaration = 51;
    public static readonly RULE_classModifier = 52;
    public static readonly RULE_typeParameters = 53;
    public static readonly RULE_typeParameterList = 54;
    public static readonly RULE_classExtends = 55;
    public static readonly RULE_classImplements = 56;
    public static readonly RULE_interfaceTypeList = 57;
    public static readonly RULE_classPermits = 58;
    public static readonly RULE_classBody = 59;
    public static readonly RULE_classBodyDeclaration = 60;
    public static readonly RULE_classMemberDeclaration = 61;
    public static readonly RULE_fieldDeclaration = 62;
    public static readonly RULE_fieldModifier = 63;
    public static readonly RULE_variableDeclaratorList = 64;
    public static readonly RULE_variableDeclarator = 65;
    public static readonly RULE_variableDeclaratorId = 66;
    public static readonly RULE_variableInitializer = 67;
    public static readonly RULE_unannType = 68;
    public static readonly RULE_unannPrimitiveType = 69;
    public static readonly RULE_unannReferenceType = 70;
    public static readonly RULE_unannClassOrInterfaceType = 71;
    public static readonly RULE_uCOIT = 72;
    public static readonly RULE_unannClassType = 73;
    public static readonly RULE_unannInterfaceType = 74;
    public static readonly RULE_unannTypeVariable = 75;
    public static readonly RULE_unannArrayType = 76;
    public static readonly RULE_methodDeclaration = 77;
    public static readonly RULE_methodModifier = 78;
    public static readonly RULE_methodHeader = 79;
    public static readonly RULE_result = 80;
    public static readonly RULE_methodDeclarator = 81;
    public static readonly RULE_receiverParameter = 82;
    public static readonly RULE_formalParameterList = 83;
    public static readonly RULE_formalParameter = 84;
    public static readonly RULE_variableArityParameter = 85;
    public static readonly RULE_variableModifier = 86;
    public static readonly RULE_throwsT = 87;
    public static readonly RULE_exceptionTypeList = 88;
    public static readonly RULE_exceptionType = 89;
    public static readonly RULE_methodBody = 90;
    public static readonly RULE_instanceInitializer = 91;
    public static readonly RULE_staticInitializer = 92;
    public static readonly RULE_constructorDeclaration = 93;
    public static readonly RULE_constructorModifier = 94;
    public static readonly RULE_constructorDeclarator = 95;
    public static readonly RULE_simpleTypeName = 96;
    public static readonly RULE_constructorBody = 97;
    public static readonly RULE_explicitConstructorInvocation = 98;
    public static readonly RULE_enumDeclaration = 99;
    public static readonly RULE_enumBody = 100;
    public static readonly RULE_enumConstantList = 101;
    public static readonly RULE_enumConstant = 102;
    public static readonly RULE_enumConstantModifier = 103;
    public static readonly RULE_enumBodyDeclarations = 104;
    public static readonly RULE_recordDeclaration = 105;
    public static readonly RULE_recordHeader = 106;
    public static readonly RULE_recordComponentList = 107;
    public static readonly RULE_recordComponent = 108;
    public static readonly RULE_variableArityRecordComponent = 109;
    public static readonly RULE_recordComponentModifier = 110;
    public static readonly RULE_recordBody = 111;
    public static readonly RULE_recordBodyDeclaration = 112;
    public static readonly RULE_compactConstructorDeclaration = 113;
    public static readonly RULE_interfaceDeclaration = 114;
    public static readonly RULE_normalInterfaceDeclaration = 115;
    public static readonly RULE_interfaceModifier = 116;
    public static readonly RULE_interfaceExtends = 117;
    public static readonly RULE_interfacePermits = 118;
    public static readonly RULE_interfaceBody = 119;
    public static readonly RULE_interfaceMemberDeclaration = 120;
    public static readonly RULE_constantDeclaration = 121;
    public static readonly RULE_constantModifier = 122;
    public static readonly RULE_interfaceMethodDeclaration = 123;
    public static readonly RULE_interfaceMethodModifier = 124;
    public static readonly RULE_annotationInterfaceDeclaration = 125;
    public static readonly RULE_annotationInterfaceBody = 126;
    public static readonly RULE_annotationInterfaceMemberDeclaration = 127;
    public static readonly RULE_annotationInterfaceElementDeclaration = 128;
    public static readonly RULE_annotationInterfaceElementModifier = 129;
    public static readonly RULE_defaultValue = 130;
    public static readonly RULE_annotation = 131;
    public static readonly RULE_normalAnnotation = 132;
    public static readonly RULE_elementValuePairList = 133;
    public static readonly RULE_elementValuePair = 134;
    public static readonly RULE_elementValue = 135;
    public static readonly RULE_elementValueArrayInitializer = 136;
    public static readonly RULE_elementValueList = 137;
    public static readonly RULE_markerAnnotation = 138;
    public static readonly RULE_singleElementAnnotation = 139;
    public static readonly RULE_arrayInitializer = 140;
    public static readonly RULE_variableInitializerList = 141;
    public static readonly RULE_block = 142;
    public static readonly RULE_blockStatements = 143;
    public static readonly RULE_blockStatement = 144;
    public static readonly RULE_localClassOrInterfaceDeclaration = 145;
    public static readonly RULE_localVariableDeclaration = 146;
    public static readonly RULE_localVariableType = 147;
    public static readonly RULE_localVariableDeclarationStatement = 148;
    public static readonly RULE_statement = 149;
    public static readonly RULE_statementNoShortIf = 150;
    public static readonly RULE_statementWithoutTrailingSubstatement = 151;
    public static readonly RULE_emptyStatement_ = 152;
    public static readonly RULE_labeledStatement = 153;
    public static readonly RULE_labeledStatementNoShortIf = 154;
    public static readonly RULE_expressionStatement = 155;
    public static readonly RULE_statementExpression = 156;
    public static readonly RULE_ifThenStatement = 157;
    public static readonly RULE_ifThenElseStatement = 158;
    public static readonly RULE_ifThenElseStatementNoShortIf = 159;
    public static readonly RULE_assertStatement = 160;
    public static readonly RULE_switchStatement = 161;
    public static readonly RULE_switchBlock = 162;
    public static readonly RULE_switchRule = 163;
    public static readonly RULE_switchBlockStatementGroup = 164;
    public static readonly RULE_switchLabel = 165;
    public static readonly RULE_caseConstant = 166;
    public static readonly RULE_whileStatement = 167;
    public static readonly RULE_whileStatementNoShortIf = 168;
    public static readonly RULE_doStatement = 169;
    public static readonly RULE_forStatement = 170;
    public static readonly RULE_forStatementNoShortIf = 171;
    public static readonly RULE_basicForStatement = 172;
    public static readonly RULE_basicForStatementNoShortIf = 173;
    public static readonly RULE_forInit = 174;
    public static readonly RULE_forUpdate = 175;
    public static readonly RULE_statementExpressionList = 176;
    public static readonly RULE_enhancedForStatement = 177;
    public static readonly RULE_enhancedForStatementNoShortIf = 178;
    public static readonly RULE_breakStatement = 179;
    public static readonly RULE_continueStatement = 180;
    public static readonly RULE_returnStatement = 181;
    public static readonly RULE_throwStatement = 182;
    public static readonly RULE_synchronizedStatement = 183;
    public static readonly RULE_tryStatement = 184;
    public static readonly RULE_catches = 185;
    public static readonly RULE_catchClause = 186;
    public static readonly RULE_catchFormalParameter = 187;
    public static readonly RULE_catchType = 188;
    public static readonly RULE_finallyBlock = 189;
    public static readonly RULE_tryWithResourcesStatement = 190;
    public static readonly RULE_resourceSpecification = 191;
    public static readonly RULE_resourceList = 192;
    public static readonly RULE_resource = 193;
    public static readonly RULE_variableAccess = 194;
    public static readonly RULE_yieldStatement = 195;
    public static readonly RULE_pattern = 196;
    public static readonly RULE_typePattern = 197;
    public static readonly RULE_expression = 198;
    public static readonly RULE_primary = 199;
    public static readonly RULE_primaryNoNewArray = 200;
    public static readonly RULE_pNNA = 201;
    public static readonly RULE_classLiteral = 202;
    public static readonly RULE_classInstanceCreationExpression = 203;
    public static readonly RULE_unqualifiedClassInstanceCreationExpression = 204;
    public static readonly RULE_classOrInterfaceTypeToInstantiate = 205;
    public static readonly RULE_typeArgumentsOrDiamond = 206;
    public static readonly RULE_arrayCreationExpression = 207;
    public static readonly RULE_arrayCreationExpressionWithoutInitializer = 208;
    public static readonly RULE_arrayCreationExpressionWithInitializer = 209;
    public static readonly RULE_dimExprs = 210;
    public static readonly RULE_dimExpr = 211;
    public static readonly RULE_arrayAccess = 212;
    public static readonly RULE_fieldAccess = 213;
    public static readonly RULE_methodInvocation = 214;
    public static readonly RULE_argumentList = 215;
    public static readonly RULE_methodReference = 216;
    public static readonly RULE_postfixExpression = 217;
    public static readonly RULE_pfE = 218;
    public static readonly RULE_postIncrementExpression = 219;
    public static readonly RULE_postDecrementExpression = 220;
    public static readonly RULE_unaryExpression = 221;
    public static readonly RULE_preIncrementExpression = 222;
    public static readonly RULE_preDecrementExpression = 223;
    public static readonly RULE_unaryExpressionNotPlusMinus = 224;
    public static readonly RULE_castExpression = 225;
    public static readonly RULE_multiplicativeExpression = 226;
    public static readonly RULE_additiveExpression = 227;
    public static readonly RULE_shiftExpression = 228;
    public static readonly RULE_relationalExpression = 229;
    public static readonly RULE_equalityExpression = 230;
    public static readonly RULE_andExpression = 231;
    public static readonly RULE_exclusiveOrExpression = 232;
    public static readonly RULE_inclusiveOrExpression = 233;
    public static readonly RULE_conditionalAndExpression = 234;
    public static readonly RULE_conditionalOrExpression = 235;
    public static readonly RULE_conditionalExpression = 236;
    public static readonly RULE_assignmentExpression = 237;
    public static readonly RULE_assignment = 238;
    public static readonly RULE_leftHandSide = 239;
    public static readonly RULE_assignmentOperator = 240;
    public static readonly RULE_lambdaExpression = 241;
    public static readonly RULE_lambdaParameters = 242;
    public static readonly RULE_lambdaParameterList = 243;
    public static readonly RULE_lambdaParameter = 244;
    public static readonly RULE_lambdaParameterType = 245;
    public static readonly RULE_lambdaBody = 246;
    public static readonly RULE_switchExpression = 247;
    public static readonly RULE_constantExpression = 248;

    public static readonly literalNames = [
        null, "'exports'", "'module'", "'non-sealed'", "'<>'", "'open'", 
        "'opens'", "'permits'", "'provides'", "'record'", "'requires'", 
        "'sealed'", "'to'", "'transitive'", "'uses'", "'var'", "'with'", 
        "'yield'", "'abstract'", "'assert'", "'boolean'", "'break'", "'byte'", 
        "'case'", "'catch'", "'char'", "'class'", "'const'", "'continue'", 
        "'default'", "'do'", "'double'", "'else'", "'enum'", "'extends'", 
        "'final'", "'finally'", "'float'", "'for'", "'if'", "'goto'", "'implements'", 
        "'import'", "'instanceof'", "'int'", "'interface'", "'long'", "'native'", 
        "'new'", "'package'", "'private'", "'protected'", "'public'", "'return'", 
        "'short'", "'static'", "'strictfp'", "'super'", "'switch'", "'synchronized'", 
        "'this'", "'throw'", "'throws'", "'transient'", "'try'", "'void'", 
        "'volatile'", "'while'", "'_'", null, null, null, null, null, null, 
        "'null'", "'('", "')'", "'{'", "'}'", "'['", "']'", "';'", "','", 
        "'.'", "'...'", "'@'", "'::'", "'='", "'>'", "'<'", "'!'", "'~'", 
        "'?'", "':'", "'->'", "'=='", "'<='", "'>='", "'!='", "'&&'", "'||'", 
        "'++'", "'--'", "'+'", "'-'", "'*'", "'/'", "'&'", "'|'", "'^'", 
        "'%'", "'+='", "'-='", "'*='", "'/='", "'&='", "'|='", "'^='", "'%='", 
        "'<<='", "'>>='", "'>>>='"
    ];

    public static readonly symbolicNames = [
        null, "EXPORTS", "MODULE", "NONSEALED", "OACA", "OPEN", "OPENS", 
        "PERMITS", "PROVIDES", "RECORD", "REQUIRES", "SEALED", "TO", "TRANSITIVE", 
        "USES", "VAR", "WITH", "YIELD", "ABSTRACT", "ASSERT", "BOOLEAN", 
        "BREAK", "BYTE", "CASE", "CATCH", "CHAR", "CLASS", "CONST", "CONTINUE", 
        "DEFAULT", "DO", "DOUBLE", "ELSE", "ENUM", "EXTENDS", "FINAL", "FINALLY", 
        "FLOAT", "FOR", "IF", "GOTO", "IMPLEMENTS", "IMPORT", "INSTANCEOF", 
        "INT", "INTERFACE", "LONG", "NATIVE", "NEW", "PACKAGE", "PRIVATE", 
        "PROTECTED", "PUBLIC", "RETURN", "SHORT", "STATIC", "STRICTFP", 
        "SUPER", "SWITCH", "SYNCHRONIZED", "THIS", "THROW", "THROWS", "TRANSIENT", 
        "TRY", "VOID", "VOLATILE", "WHILE", "UNDER_SCORE", "IntegerLiteral", 
        "FloatingPointLiteral", "BooleanLiteral", "CharacterLiteral", "StringLiteral", 
        "TextBlock", "NullLiteral", "LPAREN", "RPAREN", "LBRACE", "RBRACE", 
        "LBRACK", "RBRACK", "SEMI", "COMMA", "DOT", "ELLIPSIS", "AT", "COLONCOLON", 
        "ASSIGN", "GT", "LT", "BANG", "TILDE", "QUESTION", "COLON", "ARROW", 
        "EQUAL", "LE", "GE", "NOTEQUAL", "AND", "OR", "INC", "DEC", "ADD", 
        "SUB", "MUL", "DIV", "BITAND", "BITOR", "CARET", "MOD", "ADD_ASSIGN", 
        "SUB_ASSIGN", "MUL_ASSIGN", "DIV_ASSIGN", "AND_ASSIGN", "OR_ASSIGN", 
        "XOR_ASSIGN", "MOD_ASSIGN", "LSHIFT_ASSIGN", "RSHIFT_ASSIGN", "URSHIFT_ASSIGN", 
        "Identifier", "WS", "COMMENT", "LINE_COMMENT"
    ];
    public static readonly ruleNames = [
        "start_", "identifier", "typeIdentifier", "unqualifiedMethodIdentifier", 
        "contextualKeyword", "contextualKeywordMinusForTypeIdentifier", 
        "contextualKeywordMinusForUnqualifiedMethodIdentifier", "literal", 
        "primitiveType", "numericType", "integralType", "floatingPointType", 
        "referenceType", "coit", "classOrInterfaceType", "classType", "interfaceType", 
        "typeVariable", "arrayType", "dims", "typeParameter", "typeParameterModifier", 
        "typeBound", "additionalBound", "typeArguments", "typeArgumentList", 
        "typeArgument", "wildcard", "wildcardBounds", "moduleName", "packageName", 
        "typeName", "packageOrTypeName", "expressionName", "methodName", 
        "ambiguousName", "compilationUnit", "ordinaryCompilationUnit", "modularCompilationUnit", 
        "packageDeclaration", "packageModifier", "importDeclaration", "singleTypeImportDeclaration", 
        "typeImportOnDemandDeclaration", "singleStaticImportDeclaration", 
        "staticImportOnDemandDeclaration", "topLevelClassOrInterfaceDeclaration", 
        "moduleDeclaration", "moduleDirective", "requiresModifier", "classDeclaration", 
        "normalClassDeclaration", "classModifier", "typeParameters", "typeParameterList", 
        "classExtends", "classImplements", "interfaceTypeList", "classPermits", 
        "classBody", "classBodyDeclaration", "classMemberDeclaration", "fieldDeclaration", 
        "fieldModifier", "variableDeclaratorList", "variableDeclarator", 
        "variableDeclaratorId", "variableInitializer", "unannType", "unannPrimitiveType", 
        "unannReferenceType", "unannClassOrInterfaceType", "uCOIT", "unannClassType", 
        "unannInterfaceType", "unannTypeVariable", "unannArrayType", "methodDeclaration", 
        "methodModifier", "methodHeader", "result", "methodDeclarator", 
        "receiverParameter", "formalParameterList", "formalParameter", "variableArityParameter", 
        "variableModifier", "throwsT", "exceptionTypeList", "exceptionType", 
        "methodBody", "instanceInitializer", "staticInitializer", "constructorDeclaration", 
        "constructorModifier", "constructorDeclarator", "simpleTypeName", 
        "constructorBody", "explicitConstructorInvocation", "enumDeclaration", 
        "enumBody", "enumConstantList", "enumConstant", "enumConstantModifier", 
        "enumBodyDeclarations", "recordDeclaration", "recordHeader", "recordComponentList", 
        "recordComponent", "variableArityRecordComponent", "recordComponentModifier", 
        "recordBody", "recordBodyDeclaration", "compactConstructorDeclaration", 
        "interfaceDeclaration", "normalInterfaceDeclaration", "interfaceModifier", 
        "interfaceExtends", "interfacePermits", "interfaceBody", "interfaceMemberDeclaration", 
        "constantDeclaration", "constantModifier", "interfaceMethodDeclaration", 
        "interfaceMethodModifier", "annotationInterfaceDeclaration", "annotationInterfaceBody", 
        "annotationInterfaceMemberDeclaration", "annotationInterfaceElementDeclaration", 
        "annotationInterfaceElementModifier", "defaultValue", "annotation", 
        "normalAnnotation", "elementValuePairList", "elementValuePair", 
        "elementValue", "elementValueArrayInitializer", "elementValueList", 
        "markerAnnotation", "singleElementAnnotation", "arrayInitializer", 
        "variableInitializerList", "block", "blockStatements", "blockStatement", 
        "localClassOrInterfaceDeclaration", "localVariableDeclaration", 
        "localVariableType", "localVariableDeclarationStatement", "statement", 
        "statementNoShortIf", "statementWithoutTrailingSubstatement", "emptyStatement_", 
        "labeledStatement", "labeledStatementNoShortIf", "expressionStatement", 
        "statementExpression", "ifThenStatement", "ifThenElseStatement", 
        "ifThenElseStatementNoShortIf", "assertStatement", "switchStatement", 
        "switchBlock", "switchRule", "switchBlockStatementGroup", "switchLabel", 
        "caseConstant", "whileStatement", "whileStatementNoShortIf", "doStatement", 
        "forStatement", "forStatementNoShortIf", "basicForStatement", "basicForStatementNoShortIf", 
        "forInit", "forUpdate", "statementExpressionList", "enhancedForStatement", 
        "enhancedForStatementNoShortIf", "breakStatement", "continueStatement", 
        "returnStatement", "throwStatement", "synchronizedStatement", "tryStatement", 
        "catches", "catchClause", "catchFormalParameter", "catchType", "finallyBlock", 
        "tryWithResourcesStatement", "resourceSpecification", "resourceList", 
        "resource", "variableAccess", "yieldStatement", "pattern", "typePattern", 
        "expression", "primary", "primaryNoNewArray", "pNNA", "classLiteral", 
        "classInstanceCreationExpression", "unqualifiedClassInstanceCreationExpression", 
        "classOrInterfaceTypeToInstantiate", "typeArgumentsOrDiamond", "arrayCreationExpression", 
        "arrayCreationExpressionWithoutInitializer", "arrayCreationExpressionWithInitializer", 
        "dimExprs", "dimExpr", "arrayAccess", "fieldAccess", "methodInvocation", 
        "argumentList", "methodReference", "postfixExpression", "pfE", "postIncrementExpression", 
        "postDecrementExpression", "unaryExpression", "preIncrementExpression", 
        "preDecrementExpression", "unaryExpressionNotPlusMinus", "castExpression", 
        "multiplicativeExpression", "additiveExpression", "shiftExpression", 
        "relationalExpression", "equalityExpression", "andExpression", "exclusiveOrExpression", 
        "inclusiveOrExpression", "conditionalAndExpression", "conditionalOrExpression", 
        "conditionalExpression", "assignmentExpression", "assignment", "leftHandSide", 
        "assignmentOperator", "lambdaExpression", "lambdaParameters", "lambdaParameterList", 
        "lambdaParameter", "lambdaParameterType", "lambdaBody", "switchExpression", 
        "constantExpression",
    ];

    public get grammarFileName(): string { return "Java20Parser.g4"; }
    public get literalNames(): (string | null)[] { return Java20Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Java20Parser.symbolicNames; }
    public get ruleNames(): string[] { return Java20Parser.ruleNames; }
    public get serializedATN(): number[] { return Java20Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Java20Parser._ATN, Java20Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public start_(): Start_Context {
        let localContext = new Start_Context(this.context, this.state);
        this.enterRule(localContext, 0, Java20Parser.RULE_start_);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 498;
            this.compilationUnit();
            this.state = 499;
            this.match(Java20Parser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public identifier(): IdentifierContext {
        let localContext = new IdentifierContext(this.context, this.state);
        this.enterRule(localContext, 2, Java20Parser.RULE_identifier);
        try {
            this.state = 503;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 501;
                this.match(Java20Parser.Identifier);
                }
                break;
            case Java20Parser.EXPORTS:
            case Java20Parser.MODULE:
            case Java20Parser.NONSEALED:
            case Java20Parser.OPEN:
            case Java20Parser.OPENS:
            case Java20Parser.PERMITS:
            case Java20Parser.PROVIDES:
            case Java20Parser.RECORD:
            case Java20Parser.REQUIRES:
            case Java20Parser.SEALED:
            case Java20Parser.TO:
            case Java20Parser.TRANSITIVE:
            case Java20Parser.USES:
            case Java20Parser.VAR:
            case Java20Parser.WITH:
            case Java20Parser.YIELD:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 502;
                this.contextualKeyword();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeIdentifier(): TypeIdentifierContext {
        let localContext = new TypeIdentifierContext(this.context, this.state);
        this.enterRule(localContext, 4, Java20Parser.RULE_typeIdentifier);
        try {
            this.state = 507;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 505;
                this.match(Java20Parser.Identifier);
                }
                break;
            case Java20Parser.EXPORTS:
            case Java20Parser.MODULE:
            case Java20Parser.NONSEALED:
            case Java20Parser.OPEN:
            case Java20Parser.OPENS:
            case Java20Parser.PROVIDES:
            case Java20Parser.REQUIRES:
            case Java20Parser.TO:
            case Java20Parser.TRANSITIVE:
            case Java20Parser.USES:
            case Java20Parser.WITH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 506;
                this.contextualKeywordMinusForTypeIdentifier();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unqualifiedMethodIdentifier(): UnqualifiedMethodIdentifierContext {
        let localContext = new UnqualifiedMethodIdentifierContext(this.context, this.state);
        this.enterRule(localContext, 6, Java20Parser.RULE_unqualifiedMethodIdentifier);
        try {
            this.state = 511;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 509;
                this.match(Java20Parser.Identifier);
                }
                break;
            case Java20Parser.EXPORTS:
            case Java20Parser.MODULE:
            case Java20Parser.NONSEALED:
            case Java20Parser.OPEN:
            case Java20Parser.OPENS:
            case Java20Parser.PERMITS:
            case Java20Parser.PROVIDES:
            case Java20Parser.RECORD:
            case Java20Parser.REQUIRES:
            case Java20Parser.SEALED:
            case Java20Parser.TO:
            case Java20Parser.TRANSITIVE:
            case Java20Parser.USES:
            case Java20Parser.VAR:
            case Java20Parser.WITH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 510;
                this.contextualKeywordMinusForUnqualifiedMethodIdentifier();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public contextualKeyword(): ContextualKeywordContext {
        let localContext = new ContextualKeywordContext(this.context, this.state);
        this.enterRule(localContext, 8, Java20Parser.RULE_contextualKeyword);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 513;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 262126) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public contextualKeywordMinusForTypeIdentifier(): ContextualKeywordMinusForTypeIdentifierContext {
        let localContext = new ContextualKeywordMinusForTypeIdentifierContext(this.context, this.state);
        this.enterRule(localContext, 10, Java20Parser.RULE_contextualKeywordMinusForTypeIdentifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 515;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 95598) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public contextualKeywordMinusForUnqualifiedMethodIdentifier(): ContextualKeywordMinusForUnqualifiedMethodIdentifierContext {
        let localContext = new ContextualKeywordMinusForUnqualifiedMethodIdentifierContext(this.context, this.state);
        this.enterRule(localContext, 12, Java20Parser.RULE_contextualKeywordMinusForUnqualifiedMethodIdentifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 517;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 131054) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public literal(): LiteralContext {
        let localContext = new LiteralContext(this.context, this.state);
        this.enterRule(localContext, 14, Java20Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 519;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 127) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public primitiveType(): PrimitiveTypeContext {
        let localContext = new PrimitiveTypeContext(this.context, this.state);
        this.enterRule(localContext, 16, Java20Parser.RULE_primitiveType);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 524;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 521;
                this.annotation();
                }
                }
                this.state = 526;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 529;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.BYTE:
            case Java20Parser.CHAR:
            case Java20Parser.DOUBLE:
            case Java20Parser.FLOAT:
            case Java20Parser.INT:
            case Java20Parser.LONG:
            case Java20Parser.SHORT:
                {
                this.state = 527;
                this.numericType();
                }
                break;
            case Java20Parser.BOOLEAN:
                {
                this.state = 528;
                this.match(Java20Parser.BOOLEAN);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public numericType(): NumericTypeContext {
        let localContext = new NumericTypeContext(this.context, this.state);
        this.enterRule(localContext, 18, Java20Parser.RULE_numericType);
        try {
            this.state = 533;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.BYTE:
            case Java20Parser.CHAR:
            case Java20Parser.INT:
            case Java20Parser.LONG:
            case Java20Parser.SHORT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 531;
                this.integralType();
                }
                break;
            case Java20Parser.DOUBLE:
            case Java20Parser.FLOAT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 532;
                this.floatingPointType();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public integralType(): IntegralTypeContext {
        let localContext = new IntegralTypeContext(this.context, this.state);
        this.enterRule(localContext, 20, Java20Parser.RULE_integralType);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 535;
            _la = this.tokenStream.LA(1);
            if(!(_la === 22 || _la === 25 || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1029) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public floatingPointType(): FloatingPointTypeContext {
        let localContext = new FloatingPointTypeContext(this.context, this.state);
        this.enterRule(localContext, 22, Java20Parser.RULE_floatingPointType);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 537;
            _la = this.tokenStream.LA(1);
            if(!(_la === 31 || _la === 37)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public referenceType(): ReferenceTypeContext {
        let localContext = new ReferenceTypeContext(this.context, this.state);
        this.enterRule(localContext, 24, Java20Parser.RULE_referenceType);
        try {
            this.state = 542;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 539;
                this.classOrInterfaceType();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 540;
                this.typeVariable();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 541;
                this.arrayType();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public coit(): CoitContext {
        let localContext = new CoitContext(this.context, this.state);
        this.enterRule(localContext, 26, Java20Parser.RULE_coit);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 544;
            this.match(Java20Parser.DOT);
            this.state = 548;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 545;
                this.annotation();
                }
                }
                this.state = 550;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 551;
            this.typeIdentifier();
            this.state = 553;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                {
                this.state = 552;
                this.typeArguments();
                }
                break;
            }
            this.state = 556;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 555;
                this.coit();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classOrInterfaceType(): ClassOrInterfaceTypeContext {
        let localContext = new ClassOrInterfaceTypeContext(this.context, this.state);
        this.enterRule(localContext, 28, Java20Parser.RULE_classOrInterfaceType);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 561;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 558;
                this.packageName();
                this.state = 559;
                this.match(Java20Parser.DOT);
                }
                break;
            }
            this.state = 566;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 563;
                this.annotation();
                }
                }
                this.state = 568;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 569;
            this.typeIdentifier();
            this.state = 571;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
            case 1:
                {
                this.state = 570;
                this.typeArguments();
                }
                break;
            }
            this.state = 574;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                {
                this.state = 573;
                this.coit();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classType(): ClassTypeContext {
        let localContext = new ClassTypeContext(this.context, this.state);
        this.enterRule(localContext, 30, Java20Parser.RULE_classType);
        let _la: number;
        try {
            this.state = 610;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 579;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 576;
                    this.annotation();
                    }
                    }
                    this.state = 581;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 582;
                this.typeIdentifier();
                this.state = 584;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 583;
                    this.typeArguments();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 586;
                this.packageName();
                this.state = 587;
                this.match(Java20Parser.DOT);
                this.state = 591;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 588;
                    this.annotation();
                    }
                    }
                    this.state = 593;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 594;
                this.typeIdentifier();
                this.state = 596;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 595;
                    this.typeArguments();
                    }
                }

                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 598;
                this.classOrInterfaceType();
                this.state = 599;
                this.match(Java20Parser.DOT);
                this.state = 603;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 600;
                    this.annotation();
                    }
                    }
                    this.state = 605;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 606;
                this.typeIdentifier();
                this.state = 608;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 607;
                    this.typeArguments();
                    }
                }

                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interfaceType(): InterfaceTypeContext {
        let localContext = new InterfaceTypeContext(this.context, this.state);
        this.enterRule(localContext, 32, Java20Parser.RULE_interfaceType);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 612;
            this.classType();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeVariable(): TypeVariableContext {
        let localContext = new TypeVariableContext(this.context, this.state);
        this.enterRule(localContext, 34, Java20Parser.RULE_typeVariable);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 617;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 614;
                this.annotation();
                }
                }
                this.state = 619;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 620;
            this.typeIdentifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arrayType(): ArrayTypeContext {
        let localContext = new ArrayTypeContext(this.context, this.state);
        this.enterRule(localContext, 36, Java20Parser.RULE_arrayType);
        try {
            this.state = 631;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 22, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 622;
                this.primitiveType();
                this.state = 623;
                this.dims();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 625;
                this.classType();
                this.state = 626;
                this.dims();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 628;
                this.typeVariable();
                this.state = 629;
                this.dims();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dims(): DimsContext {
        let localContext = new DimsContext(this.context, this.state);
        this.enterRule(localContext, 38, Java20Parser.RULE_dims);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 636;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 633;
                this.annotation();
                }
                }
                this.state = 638;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 639;
            this.match(Java20Parser.LBRACK);
            this.state = 640;
            this.match(Java20Parser.RBRACK);
            this.state = 651;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 644;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 86) {
                        {
                        {
                        this.state = 641;
                        this.annotation();
                        }
                        }
                        this.state = 646;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 647;
                    this.match(Java20Parser.LBRACK);
                    this.state = 648;
                    this.match(Java20Parser.RBRACK);
                    }
                    }
                }
                this.state = 653;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeParameter(): TypeParameterContext {
        let localContext = new TypeParameterContext(this.context, this.state);
        this.enterRule(localContext, 40, Java20Parser.RULE_typeParameter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 657;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 654;
                this.typeParameterModifier();
                }
                }
                this.state = 659;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 660;
            this.typeIdentifier();
            this.state = 662;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 34) {
                {
                this.state = 661;
                this.typeBound();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeParameterModifier(): TypeParameterModifierContext {
        let localContext = new TypeParameterModifierContext(this.context, this.state);
        this.enterRule(localContext, 42, Java20Parser.RULE_typeParameterModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 664;
            this.annotation();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeBound(): TypeBoundContext {
        let localContext = new TypeBoundContext(this.context, this.state);
        this.enterRule(localContext, 44, Java20Parser.RULE_typeBound);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 666;
            this.match(Java20Parser.EXTENDS);
            this.state = 675;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                {
                this.state = 667;
                this.typeVariable();
                }
                break;
            case 2:
                {
                this.state = 668;
                this.classOrInterfaceType();
                this.state = 672;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 108) {
                    {
                    {
                    this.state = 669;
                    this.additionalBound();
                    }
                    }
                    this.state = 674;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public additionalBound(): AdditionalBoundContext {
        let localContext = new AdditionalBoundContext(this.context, this.state);
        this.enterRule(localContext, 46, Java20Parser.RULE_additionalBound);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 677;
            this.match(Java20Parser.BITAND);
            this.state = 678;
            this.interfaceType();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeArguments(): TypeArgumentsContext {
        let localContext = new TypeArgumentsContext(this.context, this.state);
        this.enterRule(localContext, 48, Java20Parser.RULE_typeArguments);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 680;
            this.match(Java20Parser.LT);
            this.state = 681;
            this.typeArgumentList();
            this.state = 682;
            this.match(Java20Parser.GT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeArgumentList(): TypeArgumentListContext {
        let localContext = new TypeArgumentListContext(this.context, this.state);
        this.enterRule(localContext, 50, Java20Parser.RULE_typeArgumentList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 684;
            this.typeArgument();
            this.state = 689;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 685;
                this.match(Java20Parser.COMMA);
                this.state = 686;
                this.typeArgument();
                }
                }
                this.state = 691;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeArgument(): TypeArgumentContext {
        let localContext = new TypeArgumentContext(this.context, this.state);
        this.enterRule(localContext, 52, Java20Parser.RULE_typeArgument);
        try {
            this.state = 694;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 692;
                this.referenceType();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 693;
                this.wildcard();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public wildcard(): WildcardContext {
        let localContext = new WildcardContext(this.context, this.state);
        this.enterRule(localContext, 54, Java20Parser.RULE_wildcard);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 699;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 696;
                this.annotation();
                }
                }
                this.state = 701;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 702;
            this.match(Java20Parser.QUESTION);
            this.state = 704;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 34 || _la === 57) {
                {
                this.state = 703;
                this.wildcardBounds();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public wildcardBounds(): WildcardBoundsContext {
        let localContext = new WildcardBoundsContext(this.context, this.state);
        this.enterRule(localContext, 56, Java20Parser.RULE_wildcardBounds);
        try {
            this.state = 710;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.EXTENDS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 706;
                this.match(Java20Parser.EXTENDS);
                this.state = 707;
                this.referenceType();
                }
                break;
            case Java20Parser.SUPER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 708;
                this.match(Java20Parser.SUPER);
                this.state = 709;
                this.referenceType();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public moduleName(): ModuleNameContext {
        let localContext = new ModuleNameContext(this.context, this.state);
        this.enterRule(localContext, 58, Java20Parser.RULE_moduleName);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 712;
            this.identifier();
            this.state = 715;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 84) {
                {
                this.state = 713;
                this.match(Java20Parser.DOT);
                this.state = 714;
                this.moduleName();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public packageName(): PackageNameContext {
        let localContext = new PackageNameContext(this.context, this.state);
        this.enterRule(localContext, 60, Java20Parser.RULE_packageName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 717;
            this.identifier();
            this.state = 720;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                {
                this.state = 718;
                this.match(Java20Parser.DOT);
                this.state = 719;
                this.packageName();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeName(): TypeNameContext {
        let localContext = new TypeNameContext(this.context, this.state);
        this.enterRule(localContext, 62, Java20Parser.RULE_typeName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 722;
            this.packageName();
            this.state = 725;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 37, this.context) ) {
            case 1:
                {
                this.state = 723;
                this.match(Java20Parser.DOT);
                this.state = 724;
                this.typeIdentifier();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public packageOrTypeName(): PackageOrTypeNameContext {
        let localContext = new PackageOrTypeNameContext(this.context, this.state);
        this.enterRule(localContext, 64, Java20Parser.RULE_packageOrTypeName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 727;
            this.identifier();
            this.state = 730;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context) ) {
            case 1:
                {
                this.state = 728;
                this.match(Java20Parser.DOT);
                this.state = 729;
                this.packageOrTypeName();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expressionName(): ExpressionNameContext {
        let localContext = new ExpressionNameContext(this.context, this.state);
        this.enterRule(localContext, 66, Java20Parser.RULE_expressionName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 735;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 39, this.context) ) {
            case 1:
                {
                this.state = 732;
                this.ambiguousName();
                this.state = 733;
                this.match(Java20Parser.DOT);
                }
                break;
            }
            this.state = 737;
            this.identifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodName(): MethodNameContext {
        let localContext = new MethodNameContext(this.context, this.state);
        this.enterRule(localContext, 68, Java20Parser.RULE_methodName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 739;
            this.unqualifiedMethodIdentifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ambiguousName(): AmbiguousNameContext {
        let localContext = new AmbiguousNameContext(this.context, this.state);
        this.enterRule(localContext, 70, Java20Parser.RULE_ambiguousName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 741;
            this.identifier();
            this.state = 744;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
            case 1:
                {
                this.state = 742;
                this.match(Java20Parser.DOT);
                this.state = 743;
                this.ambiguousName();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public compilationUnit(): CompilationUnitContext {
        let localContext = new CompilationUnitContext(this.context, this.state);
        this.enterRule(localContext, 72, Java20Parser.RULE_compilationUnit);
        try {
            this.state = 748;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 746;
                this.ordinaryCompilationUnit();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 747;
                this.modularCompilationUnit();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ordinaryCompilationUnit(): OrdinaryCompilationUnitContext {
        let localContext = new OrdinaryCompilationUnitContext(this.context, this.state);
        this.enterRule(localContext, 74, Java20Parser.RULE_ordinaryCompilationUnit);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 751;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 42, this.context) ) {
            case 1:
                {
                this.state = 750;
                this.packageDeclaration();
                }
                break;
            }
            this.state = 756;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 42) {
                {
                {
                this.state = 753;
                this.importDeclaration();
                }
                }
                this.state = 758;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 762;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 67373576) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 13504517) !== 0) || _la === 82 || _la === 86) {
                {
                {
                this.state = 759;
                this.topLevelClassOrInterfaceDeclaration();
                }
                }
                this.state = 764;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public modularCompilationUnit(): ModularCompilationUnitContext {
        let localContext = new ModularCompilationUnitContext(this.context, this.state);
        this.enterRule(localContext, 76, Java20Parser.RULE_modularCompilationUnit);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 768;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 42) {
                {
                {
                this.state = 765;
                this.importDeclaration();
                }
                }
                this.state = 770;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 771;
            this.moduleDeclaration();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public packageDeclaration(): PackageDeclarationContext {
        let localContext = new PackageDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 78, Java20Parser.RULE_packageDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 776;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 773;
                this.packageModifier();
                }
                }
                this.state = 778;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 779;
            this.match(Java20Parser.PACKAGE);
            this.state = 780;
            this.identifier();
            this.state = 785;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 84) {
                {
                {
                this.state = 781;
                this.match(Java20Parser.DOT);
                this.state = 782;
                this.identifier();
                }
                }
                this.state = 787;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 788;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public packageModifier(): PackageModifierContext {
        let localContext = new PackageModifierContext(this.context, this.state);
        this.enterRule(localContext, 80, Java20Parser.RULE_packageModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 790;
            this.annotation();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public importDeclaration(): ImportDeclarationContext {
        let localContext = new ImportDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 82, Java20Parser.RULE_importDeclaration);
        try {
            this.state = 796;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 792;
                this.singleTypeImportDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 793;
                this.typeImportOnDemandDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 794;
                this.singleStaticImportDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 795;
                this.staticImportOnDemandDeclaration();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public singleTypeImportDeclaration(): SingleTypeImportDeclarationContext {
        let localContext = new SingleTypeImportDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 84, Java20Parser.RULE_singleTypeImportDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 798;
            this.match(Java20Parser.IMPORT);
            this.state = 799;
            this.typeName();
            this.state = 800;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeImportOnDemandDeclaration(): TypeImportOnDemandDeclarationContext {
        let localContext = new TypeImportOnDemandDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 86, Java20Parser.RULE_typeImportOnDemandDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 802;
            this.match(Java20Parser.IMPORT);
            this.state = 803;
            this.packageOrTypeName();
            this.state = 804;
            this.match(Java20Parser.DOT);
            this.state = 805;
            this.match(Java20Parser.MUL);
            this.state = 806;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public singleStaticImportDeclaration(): SingleStaticImportDeclarationContext {
        let localContext = new SingleStaticImportDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 88, Java20Parser.RULE_singleStaticImportDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 808;
            this.match(Java20Parser.IMPORT);
            this.state = 809;
            this.match(Java20Parser.STATIC);
            this.state = 810;
            this.typeName();
            this.state = 811;
            this.match(Java20Parser.DOT);
            this.state = 812;
            this.identifier();
            this.state = 813;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public staticImportOnDemandDeclaration(): StaticImportOnDemandDeclarationContext {
        let localContext = new StaticImportOnDemandDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 90, Java20Parser.RULE_staticImportOnDemandDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 815;
            this.match(Java20Parser.IMPORT);
            this.state = 816;
            this.match(Java20Parser.STATIC);
            this.state = 817;
            this.typeName();
            this.state = 818;
            this.match(Java20Parser.DOT);
            this.state = 819;
            this.match(Java20Parser.MUL);
            this.state = 820;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public topLevelClassOrInterfaceDeclaration(): TopLevelClassOrInterfaceDeclarationContext {
        let localContext = new TopLevelClassOrInterfaceDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 92, Java20Parser.RULE_topLevelClassOrInterfaceDeclaration);
        try {
            this.state = 825;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 822;
                this.classDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 823;
                this.interfaceDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 824;
                this.match(Java20Parser.SEMI);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public moduleDeclaration(): ModuleDeclarationContext {
        let localContext = new ModuleDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 94, Java20Parser.RULE_moduleDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 830;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 827;
                this.annotation();
                }
                }
                this.state = 832;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 834;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 5) {
                {
                this.state = 833;
                this.match(Java20Parser.OPEN);
                }
            }

            this.state = 836;
            this.match(Java20Parser.MODULE);
            this.state = 837;
            this.identifier();
            this.state = 842;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 84) {
                {
                {
                this.state = 838;
                this.match(Java20Parser.DOT);
                this.state = 839;
                this.identifier();
                }
                }
                this.state = 844;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 845;
            this.match(Java20Parser.LBRACE);
            this.state = 849;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 17730) !== 0)) {
                {
                {
                this.state = 846;
                this.moduleDirective();
                }
                }
                this.state = 851;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 852;
            this.match(Java20Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public moduleDirective(): ModuleDirectiveContext {
        let localContext = new ModuleDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 96, Java20Parser.RULE_moduleDirective);
        let _la: number;
        try {
            let alternative: number;
            this.state = 911;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.REQUIRES:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 854;
                this.match(Java20Parser.REQUIRES);
                this.state = 858;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 54, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 855;
                        this.requiresModifier();
                        }
                        }
                    }
                    this.state = 860;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 54, this.context);
                }
                this.state = 861;
                this.moduleName();
                this.state = 862;
                this.match(Java20Parser.SEMI);
                }
                break;
            case Java20Parser.EXPORTS:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 864;
                this.match(Java20Parser.EXPORTS);
                this.state = 865;
                this.packageName();
                this.state = 875;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 12) {
                    {
                    this.state = 866;
                    this.match(Java20Parser.TO);
                    this.state = 867;
                    this.moduleName();
                    this.state = 872;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 83) {
                        {
                        {
                        this.state = 868;
                        this.match(Java20Parser.COMMA);
                        this.state = 869;
                        this.moduleName();
                        }
                        }
                        this.state = 874;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                }

                this.state = 877;
                this.match(Java20Parser.SEMI);
                }
                break;
            case Java20Parser.OPENS:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 879;
                this.match(Java20Parser.OPENS);
                this.state = 880;
                this.packageName();
                this.state = 890;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 12) {
                    {
                    this.state = 881;
                    this.match(Java20Parser.TO);
                    this.state = 882;
                    this.moduleName();
                    this.state = 887;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 83) {
                        {
                        {
                        this.state = 883;
                        this.match(Java20Parser.COMMA);
                        this.state = 884;
                        this.moduleName();
                        }
                        }
                        this.state = 889;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                }

                this.state = 892;
                this.match(Java20Parser.SEMI);
                }
                break;
            case Java20Parser.USES:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 894;
                this.match(Java20Parser.USES);
                this.state = 895;
                this.typeName();
                this.state = 896;
                this.match(Java20Parser.SEMI);
                }
                break;
            case Java20Parser.PROVIDES:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 898;
                this.match(Java20Parser.PROVIDES);
                this.state = 899;
                this.typeName();
                this.state = 900;
                this.match(Java20Parser.WITH);
                this.state = 901;
                this.typeName();
                this.state = 906;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 83) {
                    {
                    {
                    this.state = 902;
                    this.match(Java20Parser.COMMA);
                    this.state = 903;
                    this.typeName();
                    }
                    }
                    this.state = 908;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 909;
                this.match(Java20Parser.SEMI);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public requiresModifier(): RequiresModifierContext {
        let localContext = new RequiresModifierContext(this.context, this.state);
        this.enterRule(localContext, 98, Java20Parser.RULE_requiresModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 913;
            _la = this.tokenStream.LA(1);
            if(!(_la === 13 || _la === 55)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classDeclaration(): ClassDeclarationContext {
        let localContext = new ClassDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 100, Java20Parser.RULE_classDeclaration);
        try {
            this.state = 918;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 915;
                this.normalClassDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 916;
                this.enumDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 917;
                this.recordDeclaration();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public normalClassDeclaration(): NormalClassDeclarationContext {
        let localContext = new NormalClassDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 102, Java20Parser.RULE_normalClassDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 923;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 264200) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 3375105) !== 0) || _la === 86) {
                {
                {
                this.state = 920;
                this.classModifier();
                }
                }
                this.state = 925;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 926;
            this.match(Java20Parser.CLASS);
            this.state = 927;
            this.typeIdentifier();
            this.state = 929;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 90) {
                {
                this.state = 928;
                this.typeParameters();
                }
            }

            this.state = 932;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 34) {
                {
                this.state = 931;
                this.classExtends();
                }
            }

            this.state = 935;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 41) {
                {
                this.state = 934;
                this.classImplements();
                }
            }

            this.state = 938;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 7) {
                {
                this.state = 937;
                this.classPermits();
                }
            }

            this.state = 940;
            this.classBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classModifier(): ClassModifierContext {
        let localContext = new ClassModifierContext(this.context, this.state);
        this.enterRule(localContext, 104, Java20Parser.RULE_classModifier);
        try {
            this.state = 952;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.AT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 942;
                this.annotation();
                }
                break;
            case Java20Parser.PUBLIC:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 943;
                this.match(Java20Parser.PUBLIC);
                }
                break;
            case Java20Parser.PROTECTED:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 944;
                this.match(Java20Parser.PROTECTED);
                }
                break;
            case Java20Parser.PRIVATE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 945;
                this.match(Java20Parser.PRIVATE);
                }
                break;
            case Java20Parser.ABSTRACT:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 946;
                this.match(Java20Parser.ABSTRACT);
                }
                break;
            case Java20Parser.STATIC:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 947;
                this.match(Java20Parser.STATIC);
                }
                break;
            case Java20Parser.FINAL:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 948;
                this.match(Java20Parser.FINAL);
                }
                break;
            case Java20Parser.SEALED:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 949;
                this.match(Java20Parser.SEALED);
                }
                break;
            case Java20Parser.NONSEALED:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 950;
                this.match(Java20Parser.NONSEALED);
                }
                break;
            case Java20Parser.STRICTFP:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 951;
                this.match(Java20Parser.STRICTFP);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeParameters(): TypeParametersContext {
        let localContext = new TypeParametersContext(this.context, this.state);
        this.enterRule(localContext, 106, Java20Parser.RULE_typeParameters);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 954;
            this.match(Java20Parser.LT);
            this.state = 955;
            this.typeParameterList();
            this.state = 956;
            this.match(Java20Parser.GT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeParameterList(): TypeParameterListContext {
        let localContext = new TypeParameterListContext(this.context, this.state);
        this.enterRule(localContext, 108, Java20Parser.RULE_typeParameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 958;
            this.typeParameter();
            this.state = 963;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 959;
                this.match(Java20Parser.COMMA);
                this.state = 960;
                this.typeParameter();
                }
                }
                this.state = 965;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classExtends(): ClassExtendsContext {
        let localContext = new ClassExtendsContext(this.context, this.state);
        this.enterRule(localContext, 110, Java20Parser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 966;
            this.match(Java20Parser.EXTENDS);
            this.state = 967;
            this.classType();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classImplements(): ClassImplementsContext {
        let localContext = new ClassImplementsContext(this.context, this.state);
        this.enterRule(localContext, 112, Java20Parser.RULE_classImplements);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 969;
            this.match(Java20Parser.IMPLEMENTS);
            this.state = 970;
            this.interfaceTypeList();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interfaceTypeList(): InterfaceTypeListContext {
        let localContext = new InterfaceTypeListContext(this.context, this.state);
        this.enterRule(localContext, 114, Java20Parser.RULE_interfaceTypeList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 972;
            this.interfaceType();
            this.state = 977;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 973;
                this.match(Java20Parser.COMMA);
                this.state = 974;
                this.interfaceType();
                }
                }
                this.state = 979;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classPermits(): ClassPermitsContext {
        let localContext = new ClassPermitsContext(this.context, this.state);
        this.enterRule(localContext, 116, Java20Parser.RULE_classPermits);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 980;
            this.match(Java20Parser.PERMITS);
            this.state = 981;
            this.typeName();
            this.state = 986;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 982;
                this.match(Java20Parser.COMMA);
                this.state = 983;
                this.typeName();
                }
                }
                this.state = 988;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classBody(): ClassBodyContext {
        let localContext = new ClassBodyContext(this.context, this.state);
        this.enterRule(localContext, 118, Java20Parser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 989;
            this.match(Java20Parser.LBRACE);
            this.state = 993;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2253914094) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1156478997) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 35790851) !== 0) || _la === 123) {
                {
                {
                this.state = 990;
                this.classBodyDeclaration();
                }
                }
                this.state = 995;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 996;
            this.match(Java20Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classBodyDeclaration(): ClassBodyDeclarationContext {
        let localContext = new ClassBodyDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 120, Java20Parser.RULE_classBodyDeclaration);
        try {
            this.state = 1002;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 998;
                this.classMemberDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 999;
                this.instanceInitializer();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1000;
                this.staticInitializer();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1001;
                this.constructorDeclaration();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classMemberDeclaration(): ClassMemberDeclarationContext {
        let localContext = new ClassMemberDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 122, Java20Parser.RULE_classMemberDeclaration);
        try {
            this.state = 1009;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 73, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1004;
                this.fieldDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1005;
                this.methodDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1006;
                this.classDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1007;
                this.interfaceDeclaration();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1008;
                this.match(Java20Parser.SEMI);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fieldDeclaration(): FieldDeclarationContext {
        let localContext = new FieldDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 124, Java20Parser.RULE_fieldDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1014;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 2417197057) !== 0) || _la === 86) {
                {
                {
                this.state = 1011;
                this.fieldModifier();
                }
                }
                this.state = 1016;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1017;
            this.unannType();
            this.state = 1018;
            this.variableDeclaratorList();
            this.state = 1019;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fieldModifier(): FieldModifierContext {
        let localContext = new FieldModifierContext(this.context, this.state);
        this.enterRule(localContext, 126, Java20Parser.RULE_fieldModifier);
        try {
            this.state = 1029;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.AT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1021;
                this.annotation();
                }
                break;
            case Java20Parser.PUBLIC:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1022;
                this.match(Java20Parser.PUBLIC);
                }
                break;
            case Java20Parser.PROTECTED:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1023;
                this.match(Java20Parser.PROTECTED);
                }
                break;
            case Java20Parser.PRIVATE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1024;
                this.match(Java20Parser.PRIVATE);
                }
                break;
            case Java20Parser.STATIC:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1025;
                this.match(Java20Parser.STATIC);
                }
                break;
            case Java20Parser.FINAL:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1026;
                this.match(Java20Parser.FINAL);
                }
                break;
            case Java20Parser.TRANSIENT:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1027;
                this.match(Java20Parser.TRANSIENT);
                }
                break;
            case Java20Parser.VOLATILE:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1028;
                this.match(Java20Parser.VOLATILE);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public variableDeclaratorList(): VariableDeclaratorListContext {
        let localContext = new VariableDeclaratorListContext(this.context, this.state);
        this.enterRule(localContext, 128, Java20Parser.RULE_variableDeclaratorList);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1031;
            this.variableDeclarator();
            this.state = 1036;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1032;
                    this.match(Java20Parser.COMMA);
                    this.state = 1033;
                    this.variableDeclarator();
                    }
                    }
                }
                this.state = 1038;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public variableDeclarator(): VariableDeclaratorContext {
        let localContext = new VariableDeclaratorContext(this.context, this.state);
        this.enterRule(localContext, 130, Java20Parser.RULE_variableDeclarator);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1039;
            this.variableDeclaratorId();
            this.state = 1042;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 77, this.context) ) {
            case 1:
                {
                this.state = 1040;
                this.match(Java20Parser.ASSIGN);
                this.state = 1041;
                this.variableInitializer();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public variableDeclaratorId(): VariableDeclaratorIdContext {
        let localContext = new VariableDeclaratorIdContext(this.context, this.state);
        this.enterRule(localContext, 132, Java20Parser.RULE_variableDeclaratorId);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1044;
            this.identifier();
            this.state = 1046;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context) ) {
            case 1:
                {
                this.state = 1045;
                this.dims();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public variableInitializer(): VariableInitializerContext {
        let localContext = new VariableInitializerContext(this.context, this.state);
        this.enterRule(localContext, 134, Java20Parser.RULE_variableInitializer);
        try {
            this.state = 1050;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.EXPORTS:
            case Java20Parser.MODULE:
            case Java20Parser.NONSEALED:
            case Java20Parser.OPEN:
            case Java20Parser.OPENS:
            case Java20Parser.PERMITS:
            case Java20Parser.PROVIDES:
            case Java20Parser.RECORD:
            case Java20Parser.REQUIRES:
            case Java20Parser.SEALED:
            case Java20Parser.TO:
            case Java20Parser.TRANSITIVE:
            case Java20Parser.USES:
            case Java20Parser.VAR:
            case Java20Parser.WITH:
            case Java20Parser.YIELD:
            case Java20Parser.BOOLEAN:
            case Java20Parser.BYTE:
            case Java20Parser.CHAR:
            case Java20Parser.DOUBLE:
            case Java20Parser.FLOAT:
            case Java20Parser.INT:
            case Java20Parser.LONG:
            case Java20Parser.NEW:
            case Java20Parser.SHORT:
            case Java20Parser.SUPER:
            case Java20Parser.SWITCH:
            case Java20Parser.THIS:
            case Java20Parser.VOID:
            case Java20Parser.IntegerLiteral:
            case Java20Parser.FloatingPointLiteral:
            case Java20Parser.BooleanLiteral:
            case Java20Parser.CharacterLiteral:
            case Java20Parser.StringLiteral:
            case Java20Parser.TextBlock:
            case Java20Parser.NullLiteral:
            case Java20Parser.LPAREN:
            case Java20Parser.AT:
            case Java20Parser.BANG:
            case Java20Parser.TILDE:
            case Java20Parser.INC:
            case Java20Parser.DEC:
            case Java20Parser.ADD:
            case Java20Parser.SUB:
            case Java20Parser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1048;
                this.expression();
                }
                break;
            case Java20Parser.LBRACE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1049;
                this.arrayInitializer();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unannType(): UnannTypeContext {
        let localContext = new UnannTypeContext(this.context, this.state);
        this.enterRule(localContext, 136, Java20Parser.RULE_unannType);
        try {
            this.state = 1054;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1052;
                this.unannPrimitiveType();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1053;
                this.unannReferenceType();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unannPrimitiveType(): UnannPrimitiveTypeContext {
        let localContext = new UnannPrimitiveTypeContext(this.context, this.state);
        this.enterRule(localContext, 138, Java20Parser.RULE_unannPrimitiveType);
        try {
            this.state = 1058;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.BYTE:
            case Java20Parser.CHAR:
            case Java20Parser.DOUBLE:
            case Java20Parser.FLOAT:
            case Java20Parser.INT:
            case Java20Parser.LONG:
            case Java20Parser.SHORT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1056;
                this.numericType();
                }
                break;
            case Java20Parser.BOOLEAN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1057;
                this.match(Java20Parser.BOOLEAN);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unannReferenceType(): UnannReferenceTypeContext {
        let localContext = new UnannReferenceTypeContext(this.context, this.state);
        this.enterRule(localContext, 140, Java20Parser.RULE_unannReferenceType);
        try {
            this.state = 1063;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1060;
                this.unannClassOrInterfaceType();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1061;
                this.unannTypeVariable();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1062;
                this.unannArrayType();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unannClassOrInterfaceType(): UnannClassOrInterfaceTypeContext {
        let localContext = new UnannClassOrInterfaceTypeContext(this.context, this.state);
        this.enterRule(localContext, 142, Java20Parser.RULE_unannClassOrInterfaceType);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1073;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
            case 1:
                {
                this.state = 1065;
                this.packageName();
                this.state = 1066;
                this.match(Java20Parser.DOT);
                this.state = 1070;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 1067;
                    this.annotation();
                    }
                    }
                    this.state = 1072;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 1075;
            this.typeIdentifier();
            this.state = 1077;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 90) {
                {
                this.state = 1076;
                this.typeArguments();
                }
            }

            this.state = 1080;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 86, this.context) ) {
            case 1:
                {
                this.state = 1079;
                this.uCOIT();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public uCOIT(): UCOITContext {
        let localContext = new UCOITContext(this.context, this.state);
        this.enterRule(localContext, 144, Java20Parser.RULE_uCOIT);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1082;
            this.match(Java20Parser.DOT);
            this.state = 1086;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 1083;
                this.annotation();
                }
                }
                this.state = 1088;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1089;
            this.typeIdentifier();
            this.state = 1091;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 90) {
                {
                this.state = 1090;
                this.typeArguments();
                }
            }

            this.state = 1094;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 89, this.context) ) {
            case 1:
                {
                this.state = 1093;
                this.uCOIT();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unannClassType(): UnannClassTypeContext {
        let localContext = new UnannClassTypeContext(this.context, this.state);
        this.enterRule(localContext, 146, Java20Parser.RULE_unannClassType);
        let _la: number;
        try {
            this.state = 1115;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 94, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1096;
                this.typeIdentifier();
                this.state = 1098;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 1097;
                    this.typeArguments();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1102;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 91, this.context) ) {
                case 1:
                    {
                    this.state = 1100;
                    this.packageName();
                    }
                    break;
                case 2:
                    {
                    this.state = 1101;
                    this.unannClassOrInterfaceType();
                    }
                    break;
                }
                this.state = 1104;
                this.match(Java20Parser.DOT);
                this.state = 1108;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 1105;
                    this.annotation();
                    }
                    }
                    this.state = 1110;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1111;
                this.typeIdentifier();
                this.state = 1113;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 1112;
                    this.typeArguments();
                    }
                }

                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unannInterfaceType(): UnannInterfaceTypeContext {
        let localContext = new UnannInterfaceTypeContext(this.context, this.state);
        this.enterRule(localContext, 148, Java20Parser.RULE_unannInterfaceType);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1117;
            this.unannClassType();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unannTypeVariable(): UnannTypeVariableContext {
        let localContext = new UnannTypeVariableContext(this.context, this.state);
        this.enterRule(localContext, 150, Java20Parser.RULE_unannTypeVariable);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1119;
            this.typeIdentifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unannArrayType(): UnannArrayTypeContext {
        let localContext = new UnannArrayTypeContext(this.context, this.state);
        this.enterRule(localContext, 152, Java20Parser.RULE_unannArrayType);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1124;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                {
                this.state = 1121;
                this.unannPrimitiveType();
                }
                break;
            case 2:
                {
                this.state = 1122;
                this.unannClassOrInterfaceType();
                }
                break;
            case 3:
                {
                this.state = 1123;
                this.unannTypeVariable();
                }
                break;
            }
            this.state = 1126;
            this.dims();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodDeclaration(): MethodDeclarationContext {
        let localContext = new MethodDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 154, Java20Parser.RULE_methodDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1131;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 18 || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 20156417) !== 0) || _la === 86) {
                {
                {
                this.state = 1128;
                this.methodModifier();
                }
                }
                this.state = 1133;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1134;
            this.methodHeader();
            this.state = 1135;
            this.methodBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodModifier(): MethodModifierContext {
        let localContext = new MethodModifierContext(this.context, this.state);
        this.enterRule(localContext, 156, Java20Parser.RULE_methodModifier);
        try {
            this.state = 1147;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.AT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1137;
                this.annotation();
                }
                break;
            case Java20Parser.PUBLIC:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1138;
                this.match(Java20Parser.PUBLIC);
                }
                break;
            case Java20Parser.PROTECTED:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1139;
                this.match(Java20Parser.PROTECTED);
                }
                break;
            case Java20Parser.PRIVATE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1140;
                this.match(Java20Parser.PRIVATE);
                }
                break;
            case Java20Parser.ABSTRACT:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1141;
                this.match(Java20Parser.ABSTRACT);
                }
                break;
            case Java20Parser.STATIC:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1142;
                this.match(Java20Parser.STATIC);
                }
                break;
            case Java20Parser.FINAL:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1143;
                this.match(Java20Parser.FINAL);
                }
                break;
            case Java20Parser.SYNCHRONIZED:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1144;
                this.match(Java20Parser.SYNCHRONIZED);
                }
                break;
            case Java20Parser.NATIVE:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1145;
                this.match(Java20Parser.NATIVE);
                }
                break;
            case Java20Parser.STRICTFP:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1146;
                this.match(Java20Parser.STRICTFP);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodHeader(): MethodHeaderContext {
        let localContext = new MethodHeaderContext(this.context, this.state);
        this.enterRule(localContext, 158, Java20Parser.RULE_methodHeader);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1156;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 90) {
                {
                this.state = 1149;
                this.typeParameters();
                this.state = 1153;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 1150;
                    this.annotation();
                    }
                    }
                    this.state = 1155;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1158;
            this.result();
            this.state = 1159;
            this.methodDeclarator();
            this.state = 1161;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 62) {
                {
                this.state = 1160;
                this.throwsT();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public result(): ResultContext {
        let localContext = new ResultContext(this.context, this.state);
        this.enterRule(localContext, 160, Java20Parser.RULE_result);
        try {
            this.state = 1165;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.EXPORTS:
            case Java20Parser.MODULE:
            case Java20Parser.NONSEALED:
            case Java20Parser.OPEN:
            case Java20Parser.OPENS:
            case Java20Parser.PERMITS:
            case Java20Parser.PROVIDES:
            case Java20Parser.RECORD:
            case Java20Parser.REQUIRES:
            case Java20Parser.SEALED:
            case Java20Parser.TO:
            case Java20Parser.TRANSITIVE:
            case Java20Parser.USES:
            case Java20Parser.VAR:
            case Java20Parser.WITH:
            case Java20Parser.YIELD:
            case Java20Parser.BOOLEAN:
            case Java20Parser.BYTE:
            case Java20Parser.CHAR:
            case Java20Parser.DOUBLE:
            case Java20Parser.FLOAT:
            case Java20Parser.INT:
            case Java20Parser.LONG:
            case Java20Parser.SHORT:
            case Java20Parser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1163;
                this.unannType();
                }
                break;
            case Java20Parser.VOID:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1164;
                this.match(Java20Parser.VOID);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodDeclarator(): MethodDeclaratorContext {
        let localContext = new MethodDeclaratorContext(this.context, this.state);
        this.enterRule(localContext, 162, Java20Parser.RULE_methodDeclarator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1167;
            this.identifier();
            this.state = 1168;
            this.match(Java20Parser.LPAREN);
            this.state = 1172;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 102, this.context) ) {
            case 1:
                {
                this.state = 1169;
                this.receiverParameter();
                this.state = 1170;
                this.match(Java20Parser.COMMA);
                }
                break;
            }
            this.state = 1175;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 526853) !== 0) || _la === 86 || _la === 123) {
                {
                this.state = 1174;
                this.formalParameterList();
                }
            }

            this.state = 1177;
            this.match(Java20Parser.RPAREN);
            this.state = 1179;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 80 || _la === 86) {
                {
                this.state = 1178;
                this.dims();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public receiverParameter(): ReceiverParameterContext {
        let localContext = new ReceiverParameterContext(this.context, this.state);
        this.enterRule(localContext, 164, Java20Parser.RULE_receiverParameter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1184;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 1181;
                this.annotation();
                }
                }
                this.state = 1186;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1187;
            this.unannType();
            this.state = 1191;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 262126) !== 0) || _la === 123) {
                {
                this.state = 1188;
                this.identifier();
                this.state = 1189;
                this.match(Java20Parser.DOT);
                }
            }

            this.state = 1193;
            this.match(Java20Parser.THIS);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public formalParameterList(): FormalParameterListContext {
        let localContext = new FormalParameterListContext(this.context, this.state);
        this.enterRule(localContext, 166, Java20Parser.RULE_formalParameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1195;
            this.formalParameter();
            this.state = 1200;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 1196;
                this.match(Java20Parser.COMMA);
                this.state = 1197;
                this.formalParameter();
                }
                }
                this.state = 1202;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public formalParameter(): FormalParameterContext {
        let localContext = new FormalParameterContext(this.context, this.state);
        this.enterRule(localContext, 168, Java20Parser.RULE_formalParameter);
        let _la: number;
        try {
            this.state = 1213;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 109, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1206;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 35 || _la === 86) {
                    {
                    {
                    this.state = 1203;
                    this.variableModifier();
                    }
                    }
                    this.state = 1208;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1209;
                this.unannType();
                this.state = 1210;
                this.variableDeclaratorId();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1212;
                this.variableArityParameter();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public variableArityParameter(): VariableArityParameterContext {
        let localContext = new VariableArityParameterContext(this.context, this.state);
        this.enterRule(localContext, 170, Java20Parser.RULE_variableArityParameter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1218;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 35 || _la === 86) {
                {
                {
                this.state = 1215;
                this.variableModifier();
                }
                }
                this.state = 1220;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1221;
            this.unannType();
            this.state = 1225;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 1222;
                this.annotation();
                }
                }
                this.state = 1227;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1228;
            this.match(Java20Parser.ELLIPSIS);
            this.state = 1229;
            this.identifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public variableModifier(): VariableModifierContext {
        let localContext = new VariableModifierContext(this.context, this.state);
        this.enterRule(localContext, 172, Java20Parser.RULE_variableModifier);
        try {
            this.state = 1233;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.AT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1231;
                this.annotation();
                }
                break;
            case Java20Parser.FINAL:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1232;
                this.match(Java20Parser.FINAL);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public throwsT(): ThrowsTContext {
        let localContext = new ThrowsTContext(this.context, this.state);
        this.enterRule(localContext, 174, Java20Parser.RULE_throwsT);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1235;
            this.match(Java20Parser.THROWS);
            this.state = 1236;
            this.exceptionTypeList();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exceptionTypeList(): ExceptionTypeListContext {
        let localContext = new ExceptionTypeListContext(this.context, this.state);
        this.enterRule(localContext, 176, Java20Parser.RULE_exceptionTypeList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1238;
            this.exceptionType();
            this.state = 1243;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 1239;
                this.match(Java20Parser.COMMA);
                this.state = 1240;
                this.exceptionType();
                }
                }
                this.state = 1245;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exceptionType(): ExceptionTypeContext {
        let localContext = new ExceptionTypeContext(this.context, this.state);
        this.enterRule(localContext, 178, Java20Parser.RULE_exceptionType);
        try {
            this.state = 1248;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 114, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1246;
                this.classType();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1247;
                this.typeVariable();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodBody(): MethodBodyContext {
        let localContext = new MethodBodyContext(this.context, this.state);
        this.enterRule(localContext, 180, Java20Parser.RULE_methodBody);
        try {
            this.state = 1252;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.LBRACE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1250;
                this.block();
                }
                break;
            case Java20Parser.SEMI:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1251;
                this.match(Java20Parser.SEMI);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public instanceInitializer(): InstanceInitializerContext {
        let localContext = new InstanceInitializerContext(this.context, this.state);
        this.enterRule(localContext, 182, Java20Parser.RULE_instanceInitializer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1254;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public staticInitializer(): StaticInitializerContext {
        let localContext = new StaticInitializerContext(this.context, this.state);
        this.enterRule(localContext, 184, Java20Parser.RULE_staticInitializer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1256;
            this.match(Java20Parser.STATIC);
            this.state = 1257;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constructorDeclaration(): ConstructorDeclarationContext {
        let localContext = new ConstructorDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 186, Java20Parser.RULE_constructorDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1262;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 7) !== 0) || _la === 86) {
                {
                {
                this.state = 1259;
                this.constructorModifier();
                }
                }
                this.state = 1264;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1265;
            this.constructorDeclarator();
            this.state = 1267;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 62) {
                {
                this.state = 1266;
                this.throwsT();
                }
            }

            this.state = 1269;
            this.constructorBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constructorModifier(): ConstructorModifierContext {
        let localContext = new ConstructorModifierContext(this.context, this.state);
        this.enterRule(localContext, 188, Java20Parser.RULE_constructorModifier);
        try {
            this.state = 1275;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.AT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1271;
                this.annotation();
                }
                break;
            case Java20Parser.PUBLIC:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1272;
                this.match(Java20Parser.PUBLIC);
                }
                break;
            case Java20Parser.PROTECTED:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1273;
                this.match(Java20Parser.PROTECTED);
                }
                break;
            case Java20Parser.PRIVATE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1274;
                this.match(Java20Parser.PRIVATE);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constructorDeclarator(): ConstructorDeclaratorContext {
        let localContext = new ConstructorDeclaratorContext(this.context, this.state);
        this.enterRule(localContext, 190, Java20Parser.RULE_constructorDeclarator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1278;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 90) {
                {
                this.state = 1277;
                this.typeParameters();
                }
            }

            this.state = 1280;
            this.simpleTypeName();
            this.state = 1281;
            this.match(Java20Parser.LPAREN);
            this.state = 1285;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 120, this.context) ) {
            case 1:
                {
                this.state = 1282;
                this.receiverParameter();
                this.state = 1283;
                this.match(Java20Parser.COMMA);
                }
                break;
            }
            this.state = 1288;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 526853) !== 0) || _la === 86 || _la === 123) {
                {
                this.state = 1287;
                this.formalParameterList();
                }
            }

            this.state = 1290;
            this.match(Java20Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public simpleTypeName(): SimpleTypeNameContext {
        let localContext = new SimpleTypeNameContext(this.context, this.state);
        this.enterRule(localContext, 192, Java20Parser.RULE_simpleTypeName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1292;
            this.typeIdentifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constructorBody(): ConstructorBodyContext {
        let localContext = new ConstructorBodyContext(this.context, this.state);
        this.enterRule(localContext, 194, Java20Parser.RULE_constructorBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1294;
            this.match(Java20Parser.LBRACE);
            this.state = 1296;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 122, this.context) ) {
            case 1:
                {
                this.state = 1295;
                this.explicitConstructorInvocation();
                }
                break;
            }
            this.state = 1299;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3598712814) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2684270709) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 2240501) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097155) !== 0)) {
                {
                this.state = 1298;
                this.blockStatements();
                }
            }

            this.state = 1301;
            this.match(Java20Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public explicitConstructorInvocation(): ExplicitConstructorInvocationContext {
        let localContext = new ExplicitConstructorInvocationContext(this.context, this.state);
        this.enterRule(localContext, 196, Java20Parser.RULE_explicitConstructorInvocation);
        let _la: number;
        try {
            this.state = 1329;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 129, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1304;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 1303;
                    this.typeArguments();
                    }
                }

                this.state = 1306;
                _la = this.tokenStream.LA(1);
                if(!(_la === 57 || _la === 60)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 1307;
                this.match(Java20Parser.LPAREN);
                this.state = 1309;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 1308;
                    this.argumentList();
                    }
                }

                this.state = 1311;
                this.match(Java20Parser.RPAREN);
                this.state = 1312;
                this.match(Java20Parser.SEMI);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1315;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 126, this.context) ) {
                case 1:
                    {
                    this.state = 1313;
                    this.expressionName();
                    }
                    break;
                case 2:
                    {
                    this.state = 1314;
                    this.primary();
                    }
                    break;
                }
                this.state = 1317;
                this.match(Java20Parser.DOT);
                this.state = 1319;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 1318;
                    this.typeArguments();
                    }
                }

                this.state = 1321;
                this.match(Java20Parser.SUPER);
                this.state = 1322;
                this.match(Java20Parser.LPAREN);
                this.state = 1324;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 1323;
                    this.argumentList();
                    }
                }

                this.state = 1326;
                this.match(Java20Parser.RPAREN);
                this.state = 1327;
                this.match(Java20Parser.SEMI);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public enumDeclaration(): EnumDeclarationContext {
        let localContext = new EnumDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 198, Java20Parser.RULE_enumDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1334;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 264200) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 3375105) !== 0) || _la === 86) {
                {
                {
                this.state = 1331;
                this.classModifier();
                }
                }
                this.state = 1336;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1337;
            this.match(Java20Parser.ENUM);
            this.state = 1338;
            this.typeIdentifier();
            this.state = 1340;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 41) {
                {
                this.state = 1339;
                this.classImplements();
                }
            }

            this.state = 1342;
            this.enumBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public enumBody(): EnumBodyContext {
        let localContext = new EnumBodyContext(this.context, this.state);
        this.enterRule(localContext, 200, Java20Parser.RULE_enumBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1344;
            this.match(Java20Parser.LBRACE);
            this.state = 1346;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 262126) !== 0) || _la === 86 || _la === 123) {
                {
                this.state = 1345;
                this.enumConstantList();
                }
            }

            this.state = 1349;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 83) {
                {
                this.state = 1348;
                this.match(Java20Parser.COMMA);
                }
            }

            this.state = 1352;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 82) {
                {
                this.state = 1351;
                this.enumBodyDeclarations();
                }
            }

            this.state = 1354;
            this.match(Java20Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public enumConstantList(): EnumConstantListContext {
        let localContext = new EnumConstantListContext(this.context, this.state);
        this.enterRule(localContext, 202, Java20Parser.RULE_enumConstantList);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1356;
            this.enumConstant();
            this.state = 1361;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 135, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1357;
                    this.match(Java20Parser.COMMA);
                    this.state = 1358;
                    this.enumConstant();
                    }
                    }
                }
                this.state = 1363;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 135, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public enumConstant(): EnumConstantContext {
        let localContext = new EnumConstantContext(this.context, this.state);
        this.enterRule(localContext, 204, Java20Parser.RULE_enumConstant);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1367;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 1364;
                this.enumConstantModifier();
                }
                }
                this.state = 1369;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1370;
            this.identifier();
            this.state = 1376;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 76) {
                {
                this.state = 1371;
                this.match(Java20Parser.LPAREN);
                this.state = 1373;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 1372;
                    this.argumentList();
                    }
                }

                this.state = 1375;
                this.match(Java20Parser.RPAREN);
                }
            }

            this.state = 1379;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 1378;
                this.classBody();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public enumConstantModifier(): EnumConstantModifierContext {
        let localContext = new EnumConstantModifierContext(this.context, this.state);
        this.enterRule(localContext, 206, Java20Parser.RULE_enumConstantModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1381;
            this.annotation();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public enumBodyDeclarations(): EnumBodyDeclarationsContext {
        let localContext = new EnumBodyDeclarationsContext(this.context, this.state);
        this.enterRule(localContext, 208, Java20Parser.RULE_enumBodyDeclarations);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1383;
            this.match(Java20Parser.SEMI);
            this.state = 1387;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2253914094) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1156478997) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 35790851) !== 0) || _la === 123) {
                {
                {
                this.state = 1384;
                this.classBodyDeclaration();
                }
                }
                this.state = 1389;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public recordDeclaration(): RecordDeclarationContext {
        let localContext = new RecordDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 210, Java20Parser.RULE_recordDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1393;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 264200) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 3375105) !== 0) || _la === 86) {
                {
                {
                this.state = 1390;
                this.classModifier();
                }
                }
                this.state = 1395;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1396;
            this.match(Java20Parser.RECORD);
            this.state = 1397;
            this.typeIdentifier();
            this.state = 1399;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 90) {
                {
                this.state = 1398;
                this.typeParameters();
                }
            }

            this.state = 1401;
            this.recordHeader();
            this.state = 1403;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 41) {
                {
                this.state = 1402;
                this.classImplements();
                }
            }

            this.state = 1405;
            this.recordBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public recordHeader(): RecordHeaderContext {
        let localContext = new RecordHeaderContext(this.context, this.state);
        this.enterRule(localContext, 212, Java20Parser.RULE_recordHeader);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1407;
            this.match(Java20Parser.LPAREN);
            this.state = 1409;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 131713) !== 0) || _la === 86 || _la === 123) {
                {
                this.state = 1408;
                this.recordComponentList();
                }
            }

            this.state = 1411;
            this.match(Java20Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public recordComponentList(): RecordComponentListContext {
        let localContext = new RecordComponentListContext(this.context, this.state);
        this.enterRule(localContext, 214, Java20Parser.RULE_recordComponentList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1413;
            this.recordComponent();
            this.state = 1418;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 1414;
                this.match(Java20Parser.COMMA);
                this.state = 1415;
                this.recordComponent();
                }
                }
                this.state = 1420;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public recordComponent(): RecordComponentContext {
        let localContext = new RecordComponentContext(this.context, this.state);
        this.enterRule(localContext, 216, Java20Parser.RULE_recordComponent);
        let _la: number;
        try {
            this.state = 1431;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 147, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1424;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 1421;
                    this.recordComponentModifier();
                    }
                    }
                    this.state = 1426;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1427;
                this.unannType();
                this.state = 1428;
                this.identifier();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1430;
                this.variableArityRecordComponent();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public variableArityRecordComponent(): VariableArityRecordComponentContext {
        let localContext = new VariableArityRecordComponentContext(this.context, this.state);
        this.enterRule(localContext, 218, Java20Parser.RULE_variableArityRecordComponent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1436;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 1433;
                this.recordComponentModifier();
                }
                }
                this.state = 1438;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1439;
            this.unannType();
            this.state = 1443;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 1440;
                this.annotation();
                }
                }
                this.state = 1445;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1446;
            this.match(Java20Parser.ELLIPSIS);
            this.state = 1447;
            this.identifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public recordComponentModifier(): RecordComponentModifierContext {
        let localContext = new RecordComponentModifierContext(this.context, this.state);
        this.enterRule(localContext, 220, Java20Parser.RULE_recordComponentModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1449;
            this.annotation();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public recordBody(): RecordBodyContext {
        let localContext = new RecordBodyContext(this.context, this.state);
        this.enterRule(localContext, 222, Java20Parser.RULE_recordBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1451;
            this.match(Java20Parser.LBRACE);
            this.state = 1455;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2253914094) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1156478997) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 35790851) !== 0) || _la === 123) {
                {
                {
                this.state = 1452;
                this.recordBodyDeclaration();
                }
                }
                this.state = 1457;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1458;
            this.match(Java20Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public recordBodyDeclaration(): RecordBodyDeclarationContext {
        let localContext = new RecordBodyDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 224, Java20Parser.RULE_recordBodyDeclaration);
        try {
            this.state = 1462;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 151, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1460;
                this.classBodyDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1461;
                this.compactConstructorDeclaration();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public compactConstructorDeclaration(): CompactConstructorDeclarationContext {
        let localContext = new CompactConstructorDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 226, Java20Parser.RULE_compactConstructorDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1467;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 7) !== 0) || _la === 86) {
                {
                {
                this.state = 1464;
                this.constructorModifier();
                }
                }
                this.state = 1469;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1470;
            this.simpleTypeName();
            this.state = 1471;
            this.constructorBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interfaceDeclaration(): InterfaceDeclarationContext {
        let localContext = new InterfaceDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 228, Java20Parser.RULE_interfaceDeclaration);
        try {
            this.state = 1475;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 153, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1473;
                this.normalInterfaceDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1474;
                this.annotationInterfaceDeclaration();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public normalInterfaceDeclaration(): NormalInterfaceDeclarationContext {
        let localContext = new NormalInterfaceDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 230, Java20Parser.RULE_normalInterfaceDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1480;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 264200) !== 0) || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 103) !== 0) || _la === 86) {
                {
                {
                this.state = 1477;
                this.interfaceModifier();
                }
                }
                this.state = 1482;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1483;
            this.match(Java20Parser.INTERFACE);
            this.state = 1484;
            this.typeIdentifier();
            this.state = 1486;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 90) {
                {
                this.state = 1485;
                this.typeParameters();
                }
            }

            this.state = 1489;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 34) {
                {
                this.state = 1488;
                this.interfaceExtends();
                }
            }

            this.state = 1492;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 7) {
                {
                this.state = 1491;
                this.interfacePermits();
                }
            }

            this.state = 1494;
            this.interfaceBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interfaceModifier(): InterfaceModifierContext {
        let localContext = new InterfaceModifierContext(this.context, this.state);
        this.enterRule(localContext, 232, Java20Parser.RULE_interfaceModifier);
        try {
            this.state = 1505;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.AT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1496;
                this.annotation();
                }
                break;
            case Java20Parser.PUBLIC:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1497;
                this.match(Java20Parser.PUBLIC);
                }
                break;
            case Java20Parser.PROTECTED:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1498;
                this.match(Java20Parser.PROTECTED);
                }
                break;
            case Java20Parser.PRIVATE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1499;
                this.match(Java20Parser.PRIVATE);
                }
                break;
            case Java20Parser.ABSTRACT:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1500;
                this.match(Java20Parser.ABSTRACT);
                }
                break;
            case Java20Parser.STATIC:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1501;
                this.match(Java20Parser.STATIC);
                }
                break;
            case Java20Parser.SEALED:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1502;
                this.match(Java20Parser.SEALED);
                }
                break;
            case Java20Parser.NONSEALED:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1503;
                this.match(Java20Parser.NONSEALED);
                }
                break;
            case Java20Parser.STRICTFP:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1504;
                this.match(Java20Parser.STRICTFP);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interfaceExtends(): InterfaceExtendsContext {
        let localContext = new InterfaceExtendsContext(this.context, this.state);
        this.enterRule(localContext, 234, Java20Parser.RULE_interfaceExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1507;
            this.match(Java20Parser.EXTENDS);
            this.state = 1508;
            this.interfaceTypeList();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interfacePermits(): InterfacePermitsContext {
        let localContext = new InterfacePermitsContext(this.context, this.state);
        this.enterRule(localContext, 236, Java20Parser.RULE_interfacePermits);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1510;
            this.match(Java20Parser.PERMITS);
            this.state = 1511;
            this.typeName();
            this.state = 1516;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 1512;
                this.match(Java20Parser.COMMA);
                this.state = 1513;
                this.typeName();
                }
                }
                this.state = 1518;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interfaceBody(): InterfaceBodyContext {
        let localContext = new InterfaceBodyContext(this.context, this.state);
        this.enterRule(localContext, 238, Java20Parser.RULE_interfaceBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1519;
            this.match(Java20Parser.LBRACE);
            this.state = 1523;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2790785006) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 15611925) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 35782657) !== 0) || _la === 123) {
                {
                {
                this.state = 1520;
                this.interfaceMemberDeclaration();
                }
                }
                this.state = 1525;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1526;
            this.match(Java20Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interfaceMemberDeclaration(): InterfaceMemberDeclarationContext {
        let localContext = new InterfaceMemberDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 240, Java20Parser.RULE_interfaceMemberDeclaration);
        try {
            this.state = 1533;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 161, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1528;
                this.constantDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1529;
                this.interfaceMethodDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1530;
                this.classDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1531;
                this.interfaceDeclaration();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1532;
                this.match(Java20Parser.SEMI);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constantDeclaration(): ConstantDeclarationContext {
        let localContext = new ConstantDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 242, Java20Parser.RULE_constantDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1538;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 1179649) !== 0) || _la === 86) {
                {
                {
                this.state = 1535;
                this.constantModifier();
                }
                }
                this.state = 1540;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1541;
            this.unannType();
            this.state = 1542;
            this.variableDeclaratorList();
            this.state = 1543;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constantModifier(): ConstantModifierContext {
        let localContext = new ConstantModifierContext(this.context, this.state);
        this.enterRule(localContext, 244, Java20Parser.RULE_constantModifier);
        try {
            this.state = 1549;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.AT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1545;
                this.annotation();
                }
                break;
            case Java20Parser.PUBLIC:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1546;
                this.match(Java20Parser.PUBLIC);
                }
                break;
            case Java20Parser.STATIC:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1547;
                this.match(Java20Parser.STATIC);
                }
                break;
            case Java20Parser.FINAL:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1548;
                this.match(Java20Parser.FINAL);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interfaceMethodDeclaration(): InterfaceMethodDeclarationContext {
        let localContext = new InterfaceMethodDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 246, Java20Parser.RULE_interfaceMethodDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1554;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 18 || _la === 29 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 101) !== 0) || _la === 86) {
                {
                {
                this.state = 1551;
                this.interfaceMethodModifier();
                }
                }
                this.state = 1556;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1557;
            this.methodHeader();
            this.state = 1558;
            this.methodBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interfaceMethodModifier(): InterfaceMethodModifierContext {
        let localContext = new InterfaceMethodModifierContext(this.context, this.state);
        this.enterRule(localContext, 248, Java20Parser.RULE_interfaceMethodModifier);
        try {
            this.state = 1567;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.AT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1560;
                this.annotation();
                }
                break;
            case Java20Parser.PUBLIC:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1561;
                this.match(Java20Parser.PUBLIC);
                }
                break;
            case Java20Parser.PRIVATE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1562;
                this.match(Java20Parser.PRIVATE);
                }
                break;
            case Java20Parser.ABSTRACT:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1563;
                this.match(Java20Parser.ABSTRACT);
                }
                break;
            case Java20Parser.DEFAULT:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1564;
                this.match(Java20Parser.DEFAULT);
                }
                break;
            case Java20Parser.STATIC:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1565;
                this.match(Java20Parser.STATIC);
                }
                break;
            case Java20Parser.STRICTFP:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1566;
                this.match(Java20Parser.STRICTFP);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public annotationInterfaceDeclaration(): AnnotationInterfaceDeclarationContext {
        let localContext = new AnnotationInterfaceDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 250, Java20Parser.RULE_annotationInterfaceDeclaration);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1572;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 166, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1569;
                    this.interfaceModifier();
                    }
                    }
                }
                this.state = 1574;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 166, this.context);
            }
            this.state = 1575;
            this.match(Java20Parser.AT);
            this.state = 1576;
            this.match(Java20Parser.INTERFACE);
            this.state = 1577;
            this.typeIdentifier();
            this.state = 1578;
            this.annotationInterfaceBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public annotationInterfaceBody(): AnnotationInterfaceBodyContext {
        let localContext = new AnnotationInterfaceBodyContext(this.context, this.state);
        this.enterRule(localContext, 252, Java20Parser.RULE_annotationInterfaceBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1580;
            this.match(Java20Parser.LBRACE);
            this.state = 1584;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2253914094) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 15611925) !== 0) || _la === 82 || _la === 86 || _la === 123) {
                {
                {
                this.state = 1581;
                this.annotationInterfaceMemberDeclaration();
                }
                }
                this.state = 1586;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1587;
            this.match(Java20Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public annotationInterfaceMemberDeclaration(): AnnotationInterfaceMemberDeclarationContext {
        let localContext = new AnnotationInterfaceMemberDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 254, Java20Parser.RULE_annotationInterfaceMemberDeclaration);
        try {
            this.state = 1594;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 168, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1589;
                this.annotationInterfaceElementDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1590;
                this.constantDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1591;
                this.classDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1592;
                this.interfaceDeclaration();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1593;
                this.match(Java20Parser.SEMI);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public annotationInterfaceElementDeclaration(): AnnotationInterfaceElementDeclarationContext {
        let localContext = new AnnotationInterfaceElementDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 256, Java20Parser.RULE_annotationInterfaceElementDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1599;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 18 || _la === 52 || _la === 86) {
                {
                {
                this.state = 1596;
                this.annotationInterfaceElementModifier();
                }
                }
                this.state = 1601;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1602;
            this.unannType();
            this.state = 1603;
            this.identifier();
            this.state = 1604;
            this.match(Java20Parser.LPAREN);
            this.state = 1605;
            this.match(Java20Parser.RPAREN);
            this.state = 1607;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 80 || _la === 86) {
                {
                this.state = 1606;
                this.dims();
                }
            }

            this.state = 1610;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 29) {
                {
                this.state = 1609;
                this.defaultValue();
                }
            }

            this.state = 1612;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public annotationInterfaceElementModifier(): AnnotationInterfaceElementModifierContext {
        let localContext = new AnnotationInterfaceElementModifierContext(this.context, this.state);
        this.enterRule(localContext, 258, Java20Parser.RULE_annotationInterfaceElementModifier);
        try {
            this.state = 1617;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.AT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1614;
                this.annotation();
                }
                break;
            case Java20Parser.PUBLIC:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1615;
                this.match(Java20Parser.PUBLIC);
                }
                break;
            case Java20Parser.ABSTRACT:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1616;
                this.match(Java20Parser.ABSTRACT);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public defaultValue(): DefaultValueContext {
        let localContext = new DefaultValueContext(this.context, this.state);
        this.enterRule(localContext, 260, Java20Parser.RULE_defaultValue);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1619;
            this.match(Java20Parser.DEFAULT);
            this.state = 1620;
            this.elementValue();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public annotation(): AnnotationContext {
        let localContext = new AnnotationContext(this.context, this.state);
        this.enterRule(localContext, 262, Java20Parser.RULE_annotation);
        try {
            this.state = 1625;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 173, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1622;
                this.normalAnnotation();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1623;
                this.markerAnnotation();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1624;
                this.singleElementAnnotation();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public normalAnnotation(): NormalAnnotationContext {
        let localContext = new NormalAnnotationContext(this.context, this.state);
        this.enterRule(localContext, 264, Java20Parser.RULE_normalAnnotation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1627;
            this.match(Java20Parser.AT);
            this.state = 1628;
            this.typeName();
            this.state = 1629;
            this.match(Java20Parser.LPAREN);
            this.state = 1631;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 262126) !== 0) || _la === 123) {
                {
                this.state = 1630;
                this.elementValuePairList();
                }
            }

            this.state = 1633;
            this.match(Java20Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public elementValuePairList(): ElementValuePairListContext {
        let localContext = new ElementValuePairListContext(this.context, this.state);
        this.enterRule(localContext, 266, Java20Parser.RULE_elementValuePairList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1635;
            this.elementValuePair();
            this.state = 1640;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 1636;
                this.match(Java20Parser.COMMA);
                this.state = 1637;
                this.elementValuePair();
                }
                }
                this.state = 1642;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public elementValuePair(): ElementValuePairContext {
        let localContext = new ElementValuePairContext(this.context, this.state);
        this.enterRule(localContext, 268, Java20Parser.RULE_elementValuePair);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1643;
            this.identifier();
            this.state = 1644;
            this.match(Java20Parser.ASSIGN);
            this.state = 1645;
            this.elementValue();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public elementValue(): ElementValueContext {
        let localContext = new ElementValueContext(this.context, this.state);
        this.enterRule(localContext, 270, Java20Parser.RULE_elementValue);
        try {
            this.state = 1650;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 176, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1647;
                this.conditionalExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1648;
                this.elementValueArrayInitializer();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1649;
                this.annotation();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public elementValueArrayInitializer(): ElementValueArrayInitializerContext {
        let localContext = new ElementValueArrayInitializerContext(this.context, this.state);
        this.enterRule(localContext, 272, Java20Parser.RULE_elementValueArrayInitializer);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1652;
            this.match(Java20Parser.LBRACE);
            this.state = 1654;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714751) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                {
                this.state = 1653;
                this.elementValueList();
                }
            }

            this.state = 1657;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 83) {
                {
                this.state = 1656;
                this.match(Java20Parser.COMMA);
                }
            }

            this.state = 1659;
            this.match(Java20Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public elementValueList(): ElementValueListContext {
        let localContext = new ElementValueListContext(this.context, this.state);
        this.enterRule(localContext, 274, Java20Parser.RULE_elementValueList);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1661;
            this.elementValue();
            this.state = 1666;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 179, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1662;
                    this.match(Java20Parser.COMMA);
                    this.state = 1663;
                    this.elementValue();
                    }
                    }
                }
                this.state = 1668;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 179, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public markerAnnotation(): MarkerAnnotationContext {
        let localContext = new MarkerAnnotationContext(this.context, this.state);
        this.enterRule(localContext, 276, Java20Parser.RULE_markerAnnotation);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1669;
            this.match(Java20Parser.AT);
            this.state = 1670;
            this.typeName();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public singleElementAnnotation(): SingleElementAnnotationContext {
        let localContext = new SingleElementAnnotationContext(this.context, this.state);
        this.enterRule(localContext, 278, Java20Parser.RULE_singleElementAnnotation);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1672;
            this.match(Java20Parser.AT);
            this.state = 1673;
            this.typeName();
            this.state = 1674;
            this.match(Java20Parser.LPAREN);
            this.state = 1675;
            this.elementValue();
            this.state = 1676;
            this.match(Java20Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arrayInitializer(): ArrayInitializerContext {
        let localContext = new ArrayInitializerContext(this.context, this.state);
        this.enterRule(localContext, 280, Java20Parser.RULE_arrayInitializer);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1678;
            this.match(Java20Parser.LBRACE);
            this.state = 1680;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714751) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                {
                this.state = 1679;
                this.variableInitializerList();
                }
            }

            this.state = 1683;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 83) {
                {
                this.state = 1682;
                this.match(Java20Parser.COMMA);
                }
            }

            this.state = 1685;
            this.match(Java20Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public variableInitializerList(): VariableInitializerListContext {
        let localContext = new VariableInitializerListContext(this.context, this.state);
        this.enterRule(localContext, 282, Java20Parser.RULE_variableInitializerList);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1687;
            this.variableInitializer();
            this.state = 1692;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 182, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1688;
                    this.match(Java20Parser.COMMA);
                    this.state = 1689;
                    this.variableInitializer();
                    }
                    }
                }
                this.state = 1694;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 182, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 284, Java20Parser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1695;
            this.match(Java20Parser.LBRACE);
            this.state = 1697;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3598712814) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2684270709) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 2240501) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097155) !== 0)) {
                {
                this.state = 1696;
                this.blockStatements();
                }
            }

            this.state = 1699;
            this.match(Java20Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public blockStatements(): BlockStatementsContext {
        let localContext = new BlockStatementsContext(this.context, this.state);
        this.enterRule(localContext, 286, Java20Parser.RULE_blockStatements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1701;
            this.blockStatement();
            this.state = 1705;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3598712814) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2684270709) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 2240501) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097155) !== 0)) {
                {
                {
                this.state = 1702;
                this.blockStatement();
                }
                }
                this.state = 1707;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public blockStatement(): BlockStatementContext {
        let localContext = new BlockStatementContext(this.context, this.state);
        this.enterRule(localContext, 288, Java20Parser.RULE_blockStatement);
        try {
            this.state = 1711;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 185, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1708;
                this.localClassOrInterfaceDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1709;
                this.localVariableDeclarationStatement();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1710;
                this.statement();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public localClassOrInterfaceDeclaration(): LocalClassOrInterfaceDeclarationContext {
        let localContext = new LocalClassOrInterfaceDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 290, Java20Parser.RULE_localClassOrInterfaceDeclaration);
        try {
            this.state = 1715;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 186, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1713;
                this.classDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1714;
                this.normalInterfaceDeclaration();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public localVariableDeclaration(): LocalVariableDeclarationContext {
        let localContext = new LocalVariableDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 292, Java20Parser.RULE_localVariableDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1720;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 35 || _la === 86) {
                {
                {
                this.state = 1717;
                this.variableModifier();
                }
                }
                this.state = 1722;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1723;
            this.localVariableType();
            this.state = 1724;
            this.variableDeclaratorList();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public localVariableType(): LocalVariableTypeContext {
        let localContext = new LocalVariableTypeContext(this.context, this.state);
        this.enterRule(localContext, 294, Java20Parser.RULE_localVariableType);
        try {
            this.state = 1728;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 188, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1726;
                this.unannType();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1727;
                this.match(Java20Parser.VAR);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public localVariableDeclarationStatement(): LocalVariableDeclarationStatementContext {
        let localContext = new LocalVariableDeclarationStatementContext(this.context, this.state);
        this.enterRule(localContext, 296, Java20Parser.RULE_localVariableDeclarationStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1730;
            this.localVariableDeclaration();
            this.state = 1731;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 298, Java20Parser.RULE_statement);
        try {
            this.state = 1739;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 189, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1733;
                this.statementWithoutTrailingSubstatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1734;
                this.labeledStatement();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1735;
                this.ifThenStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1736;
                this.ifThenElseStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1737;
                this.whileStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1738;
                this.forStatement();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statementNoShortIf(): StatementNoShortIfContext {
        let localContext = new StatementNoShortIfContext(this.context, this.state);
        this.enterRule(localContext, 300, Java20Parser.RULE_statementNoShortIf);
        try {
            this.state = 1746;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 190, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1741;
                this.statementWithoutTrailingSubstatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1742;
                this.labeledStatementNoShortIf();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1743;
                this.ifThenElseStatementNoShortIf();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1744;
                this.whileStatementNoShortIf();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1745;
                this.forStatementNoShortIf();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statementWithoutTrailingSubstatement(): StatementWithoutTrailingSubstatementContext {
        let localContext = new StatementWithoutTrailingSubstatementContext(this.context, this.state);
        this.enterRule(localContext, 302, Java20Parser.RULE_statementWithoutTrailingSubstatement);
        try {
            this.state = 1761;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 191, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1748;
                this.block();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1749;
                this.emptyStatement_();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1750;
                this.expressionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1751;
                this.assertStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1752;
                this.switchStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1753;
                this.doStatement();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1754;
                this.breakStatement();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1755;
                this.continueStatement();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1756;
                this.returnStatement();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1757;
                this.synchronizedStatement();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1758;
                this.throwStatement();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1759;
                this.tryStatement();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1760;
                this.yieldStatement();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public emptyStatement_(): EmptyStatement_Context {
        let localContext = new EmptyStatement_Context(this.context, this.state);
        this.enterRule(localContext, 304, Java20Parser.RULE_emptyStatement_);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1763;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public labeledStatement(): LabeledStatementContext {
        let localContext = new LabeledStatementContext(this.context, this.state);
        this.enterRule(localContext, 306, Java20Parser.RULE_labeledStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1765;
            this.identifier();
            this.state = 1766;
            this.match(Java20Parser.COLON);
            this.state = 1767;
            this.statement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public labeledStatementNoShortIf(): LabeledStatementNoShortIfContext {
        let localContext = new LabeledStatementNoShortIfContext(this.context, this.state);
        this.enterRule(localContext, 308, Java20Parser.RULE_labeledStatementNoShortIf);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1769;
            this.identifier();
            this.state = 1770;
            this.match(Java20Parser.COLON);
            this.state = 1771;
            this.statementNoShortIf();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expressionStatement(): ExpressionStatementContext {
        let localContext = new ExpressionStatementContext(this.context, this.state);
        this.enterRule(localContext, 310, Java20Parser.RULE_expressionStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1773;
            this.statementExpression();
            this.state = 1774;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statementExpression(): StatementExpressionContext {
        let localContext = new StatementExpressionContext(this.context, this.state);
        this.enterRule(localContext, 312, Java20Parser.RULE_statementExpression);
        try {
            this.state = 1783;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 192, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1776;
                this.assignment();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1777;
                this.preIncrementExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1778;
                this.preDecrementExpression();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1779;
                this.postIncrementExpression();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1780;
                this.postDecrementExpression();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1781;
                this.methodInvocation();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1782;
                this.classInstanceCreationExpression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ifThenStatement(): IfThenStatementContext {
        let localContext = new IfThenStatementContext(this.context, this.state);
        this.enterRule(localContext, 314, Java20Parser.RULE_ifThenStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1785;
            this.match(Java20Parser.IF);
            this.state = 1786;
            this.match(Java20Parser.LPAREN);
            this.state = 1787;
            this.expression();
            this.state = 1788;
            this.match(Java20Parser.RPAREN);
            this.state = 1789;
            this.statement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ifThenElseStatement(): IfThenElseStatementContext {
        let localContext = new IfThenElseStatementContext(this.context, this.state);
        this.enterRule(localContext, 316, Java20Parser.RULE_ifThenElseStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1791;
            this.match(Java20Parser.IF);
            this.state = 1792;
            this.match(Java20Parser.LPAREN);
            this.state = 1793;
            this.expression();
            this.state = 1794;
            this.match(Java20Parser.RPAREN);
            this.state = 1795;
            this.statementNoShortIf();
            this.state = 1796;
            this.match(Java20Parser.ELSE);
            this.state = 1797;
            this.statement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ifThenElseStatementNoShortIf(): IfThenElseStatementNoShortIfContext {
        let localContext = new IfThenElseStatementNoShortIfContext(this.context, this.state);
        this.enterRule(localContext, 318, Java20Parser.RULE_ifThenElseStatementNoShortIf);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1799;
            this.match(Java20Parser.IF);
            this.state = 1800;
            this.match(Java20Parser.LPAREN);
            this.state = 1801;
            this.expression();
            this.state = 1802;
            this.match(Java20Parser.RPAREN);
            this.state = 1803;
            this.statementNoShortIf();
            this.state = 1804;
            this.match(Java20Parser.ELSE);
            this.state = 1805;
            this.statementNoShortIf();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assertStatement(): AssertStatementContext {
        let localContext = new AssertStatementContext(this.context, this.state);
        this.enterRule(localContext, 320, Java20Parser.RULE_assertStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1807;
            this.match(Java20Parser.ASSERT);
            this.state = 1808;
            this.expression();
            this.state = 1811;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 94) {
                {
                this.state = 1809;
                this.match(Java20Parser.COLON);
                this.state = 1810;
                this.expression();
                }
            }

            this.state = 1813;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public switchStatement(): SwitchStatementContext {
        let localContext = new SwitchStatementContext(this.context, this.state);
        this.enterRule(localContext, 322, Java20Parser.RULE_switchStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1815;
            this.match(Java20Parser.SWITCH);
            this.state = 1816;
            this.match(Java20Parser.LPAREN);
            this.state = 1817;
            this.expression();
            this.state = 1818;
            this.match(Java20Parser.RPAREN);
            this.state = 1819;
            this.switchBlock();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public switchBlock(): SwitchBlockContext {
        let localContext = new SwitchBlockContext(this.context, this.state);
        this.enterRule(localContext, 324, Java20Parser.RULE_switchBlock);
        let _la: number;
        try {
            let alternative: number;
            this.state = 1847;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 197, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1821;
                this.match(Java20Parser.LBRACE);
                this.state = 1822;
                this.switchRule();
                this.state = 1826;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 23 || _la === 29) {
                    {
                    {
                    this.state = 1823;
                    this.switchRule();
                    }
                    }
                    this.state = 1828;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1829;
                this.match(Java20Parser.RBRACE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1831;
                this.match(Java20Parser.LBRACE);
                this.state = 1835;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 195, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 1832;
                        this.switchBlockStatementGroup();
                        }
                        }
                    }
                    this.state = 1837;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 195, this.context);
                }
                this.state = 1843;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 23 || _la === 29) {
                    {
                    {
                    this.state = 1838;
                    this.switchLabel();
                    this.state = 1839;
                    this.match(Java20Parser.COLON);
                    }
                    }
                    this.state = 1845;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1846;
                this.match(Java20Parser.RBRACE);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public switchRule(): SwitchRuleContext {
        let localContext = new SwitchRuleContext(this.context, this.state);
        this.enterRule(localContext, 326, Java20Parser.RULE_switchRule);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1849;
            this.switchLabel();
            this.state = 1850;
            this.match(Java20Parser.ARROW);
            this.state = 1856;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.EXPORTS:
            case Java20Parser.MODULE:
            case Java20Parser.NONSEALED:
            case Java20Parser.OPEN:
            case Java20Parser.OPENS:
            case Java20Parser.PERMITS:
            case Java20Parser.PROVIDES:
            case Java20Parser.RECORD:
            case Java20Parser.REQUIRES:
            case Java20Parser.SEALED:
            case Java20Parser.TO:
            case Java20Parser.TRANSITIVE:
            case Java20Parser.USES:
            case Java20Parser.VAR:
            case Java20Parser.WITH:
            case Java20Parser.YIELD:
            case Java20Parser.BOOLEAN:
            case Java20Parser.BYTE:
            case Java20Parser.CHAR:
            case Java20Parser.DOUBLE:
            case Java20Parser.FLOAT:
            case Java20Parser.INT:
            case Java20Parser.LONG:
            case Java20Parser.NEW:
            case Java20Parser.SHORT:
            case Java20Parser.SUPER:
            case Java20Parser.SWITCH:
            case Java20Parser.THIS:
            case Java20Parser.VOID:
            case Java20Parser.IntegerLiteral:
            case Java20Parser.FloatingPointLiteral:
            case Java20Parser.BooleanLiteral:
            case Java20Parser.CharacterLiteral:
            case Java20Parser.StringLiteral:
            case Java20Parser.TextBlock:
            case Java20Parser.NullLiteral:
            case Java20Parser.LPAREN:
            case Java20Parser.AT:
            case Java20Parser.BANG:
            case Java20Parser.TILDE:
            case Java20Parser.INC:
            case Java20Parser.DEC:
            case Java20Parser.ADD:
            case Java20Parser.SUB:
            case Java20Parser.Identifier:
                {
                this.state = 1851;
                this.expression();
                this.state = 1852;
                this.match(Java20Parser.SEMI);
                }
                break;
            case Java20Parser.LBRACE:
                {
                this.state = 1854;
                this.block();
                }
                break;
            case Java20Parser.THROW:
                {
                this.state = 1855;
                this.throwStatement();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public switchBlockStatementGroup(): SwitchBlockStatementGroupContext {
        let localContext = new SwitchBlockStatementGroupContext(this.context, this.state);
        this.enterRule(localContext, 328, Java20Parser.RULE_switchBlockStatementGroup);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1858;
            this.switchLabel();
            this.state = 1859;
            this.match(Java20Parser.COLON);
            this.state = 1865;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 23 || _la === 29) {
                {
                {
                this.state = 1860;
                this.switchLabel();
                this.state = 1861;
                this.match(Java20Parser.COLON);
                }
                }
                this.state = 1867;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1868;
            this.blockStatements();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public switchLabel(): SwitchLabelContext {
        let localContext = new SwitchLabelContext(this.context, this.state);
        this.enterRule(localContext, 330, Java20Parser.RULE_switchLabel);
        let _la: number;
        try {
            this.state = 1880;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.CASE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1870;
                this.match(Java20Parser.CASE);
                this.state = 1871;
                this.caseConstant();
                this.state = 1876;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 83) {
                    {
                    {
                    this.state = 1872;
                    this.match(Java20Parser.COMMA);
                    this.state = 1873;
                    this.caseConstant();
                    }
                    }
                    this.state = 1878;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case Java20Parser.DEFAULT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1879;
                this.match(Java20Parser.DEFAULT);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseConstant(): CaseConstantContext {
        let localContext = new CaseConstantContext(this.context, this.state);
        this.enterRule(localContext, 332, Java20Parser.RULE_caseConstant);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1882;
            this.conditionalExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public whileStatement(): WhileStatementContext {
        let localContext = new WhileStatementContext(this.context, this.state);
        this.enterRule(localContext, 334, Java20Parser.RULE_whileStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1884;
            this.match(Java20Parser.WHILE);
            this.state = 1885;
            this.match(Java20Parser.LPAREN);
            this.state = 1886;
            this.expression();
            this.state = 1887;
            this.match(Java20Parser.RPAREN);
            this.state = 1888;
            this.statement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public whileStatementNoShortIf(): WhileStatementNoShortIfContext {
        let localContext = new WhileStatementNoShortIfContext(this.context, this.state);
        this.enterRule(localContext, 336, Java20Parser.RULE_whileStatementNoShortIf);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1890;
            this.match(Java20Parser.WHILE);
            this.state = 1891;
            this.match(Java20Parser.LPAREN);
            this.state = 1892;
            this.expression();
            this.state = 1893;
            this.match(Java20Parser.RPAREN);
            this.state = 1894;
            this.statementNoShortIf();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public doStatement(): DoStatementContext {
        let localContext = new DoStatementContext(this.context, this.state);
        this.enterRule(localContext, 338, Java20Parser.RULE_doStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1896;
            this.match(Java20Parser.DO);
            this.state = 1897;
            this.statement();
            this.state = 1898;
            this.match(Java20Parser.WHILE);
            this.state = 1899;
            this.match(Java20Parser.LPAREN);
            this.state = 1900;
            this.expression();
            this.state = 1901;
            this.match(Java20Parser.RPAREN);
            this.state = 1902;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public forStatement(): ForStatementContext {
        let localContext = new ForStatementContext(this.context, this.state);
        this.enterRule(localContext, 340, Java20Parser.RULE_forStatement);
        try {
            this.state = 1906;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 202, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1904;
                this.basicForStatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1905;
                this.enhancedForStatement();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public forStatementNoShortIf(): ForStatementNoShortIfContext {
        let localContext = new ForStatementNoShortIfContext(this.context, this.state);
        this.enterRule(localContext, 342, Java20Parser.RULE_forStatementNoShortIf);
        try {
            this.state = 1910;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 203, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1908;
                this.basicForStatementNoShortIf();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1909;
                this.enhancedForStatementNoShortIf();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public basicForStatement(): BasicForStatementContext {
        let localContext = new BasicForStatementContext(this.context, this.state);
        this.enterRule(localContext, 344, Java20Parser.RULE_basicForStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1912;
            this.match(Java20Parser.FOR);
            this.state = 1913;
            this.match(Java20Parser.LPAREN);
            this.state = 1915;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 1112025605) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 131327) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097155) !== 0)) {
                {
                this.state = 1914;
                this.forInit();
                }
            }

            this.state = 1917;
            this.match(Java20Parser.SEMI);
            this.state = 1919;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                {
                this.state = 1918;
                this.expression();
                }
            }

            this.state = 1921;
            this.match(Java20Parser.SEMI);
            this.state = 1923;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 278006401) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 131327) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097155) !== 0)) {
                {
                this.state = 1922;
                this.forUpdate();
                }
            }

            this.state = 1925;
            this.match(Java20Parser.RPAREN);
            this.state = 1926;
            this.statement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public basicForStatementNoShortIf(): BasicForStatementNoShortIfContext {
        let localContext = new BasicForStatementNoShortIfContext(this.context, this.state);
        this.enterRule(localContext, 346, Java20Parser.RULE_basicForStatementNoShortIf);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1928;
            this.match(Java20Parser.FOR);
            this.state = 1929;
            this.match(Java20Parser.LPAREN);
            this.state = 1931;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 1112025605) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 131327) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097155) !== 0)) {
                {
                this.state = 1930;
                this.forInit();
                }
            }

            this.state = 1933;
            this.match(Java20Parser.SEMI);
            this.state = 1935;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                {
                this.state = 1934;
                this.expression();
                }
            }

            this.state = 1937;
            this.match(Java20Parser.SEMI);
            this.state = 1939;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 278006401) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 131327) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097155) !== 0)) {
                {
                this.state = 1938;
                this.forUpdate();
                }
            }

            this.state = 1941;
            this.match(Java20Parser.RPAREN);
            this.state = 1942;
            this.statementNoShortIf();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public forInit(): ForInitContext {
        let localContext = new ForInitContext(this.context, this.state);
        this.enterRule(localContext, 348, Java20Parser.RULE_forInit);
        try {
            this.state = 1946;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 210, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1944;
                this.statementExpressionList();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1945;
                this.localVariableDeclaration();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public forUpdate(): ForUpdateContext {
        let localContext = new ForUpdateContext(this.context, this.state);
        this.enterRule(localContext, 350, Java20Parser.RULE_forUpdate);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1948;
            this.statementExpressionList();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statementExpressionList(): StatementExpressionListContext {
        let localContext = new StatementExpressionListContext(this.context, this.state);
        this.enterRule(localContext, 352, Java20Parser.RULE_statementExpressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1950;
            this.statementExpression();
            this.state = 1955;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 1951;
                this.match(Java20Parser.COMMA);
                this.state = 1952;
                this.statementExpression();
                }
                }
                this.state = 1957;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public enhancedForStatement(): EnhancedForStatementContext {
        let localContext = new EnhancedForStatementContext(this.context, this.state);
        this.enterRule(localContext, 354, Java20Parser.RULE_enhancedForStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1958;
            this.match(Java20Parser.FOR);
            this.state = 1959;
            this.match(Java20Parser.LPAREN);
            this.state = 1960;
            this.localVariableDeclaration();
            this.state = 1961;
            this.match(Java20Parser.COLON);
            this.state = 1962;
            this.expression();
            this.state = 1963;
            this.match(Java20Parser.RPAREN);
            this.state = 1964;
            this.statement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public enhancedForStatementNoShortIf(): EnhancedForStatementNoShortIfContext {
        let localContext = new EnhancedForStatementNoShortIfContext(this.context, this.state);
        this.enterRule(localContext, 356, Java20Parser.RULE_enhancedForStatementNoShortIf);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1966;
            this.match(Java20Parser.FOR);
            this.state = 1967;
            this.match(Java20Parser.LPAREN);
            this.state = 1968;
            this.localVariableDeclaration();
            this.state = 1969;
            this.match(Java20Parser.COLON);
            this.state = 1970;
            this.expression();
            this.state = 1971;
            this.match(Java20Parser.RPAREN);
            this.state = 1972;
            this.statementNoShortIf();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public breakStatement(): BreakStatementContext {
        let localContext = new BreakStatementContext(this.context, this.state);
        this.enterRule(localContext, 358, Java20Parser.RULE_breakStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1974;
            this.match(Java20Parser.BREAK);
            this.state = 1976;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 262126) !== 0) || _la === 123) {
                {
                this.state = 1975;
                this.identifier();
                }
            }

            this.state = 1978;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public continueStatement(): ContinueStatementContext {
        let localContext = new ContinueStatementContext(this.context, this.state);
        this.enterRule(localContext, 360, Java20Parser.RULE_continueStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1980;
            this.match(Java20Parser.CONTINUE);
            this.state = 1982;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 262126) !== 0) || _la === 123) {
                {
                this.state = 1981;
                this.identifier();
                }
            }

            this.state = 1984;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public returnStatement(): ReturnStatementContext {
        let localContext = new ReturnStatementContext(this.context, this.state);
        this.enterRule(localContext, 362, Java20Parser.RULE_returnStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1986;
            this.match(Java20Parser.RETURN);
            this.state = 1988;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                {
                this.state = 1987;
                this.expression();
                }
            }

            this.state = 1990;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public throwStatement(): ThrowStatementContext {
        let localContext = new ThrowStatementContext(this.context, this.state);
        this.enterRule(localContext, 364, Java20Parser.RULE_throwStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1992;
            this.match(Java20Parser.THROW);
            this.state = 1993;
            this.expression();
            this.state = 1994;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public synchronizedStatement(): SynchronizedStatementContext {
        let localContext = new SynchronizedStatementContext(this.context, this.state);
        this.enterRule(localContext, 366, Java20Parser.RULE_synchronizedStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1996;
            this.match(Java20Parser.SYNCHRONIZED);
            this.state = 1997;
            this.match(Java20Parser.LPAREN);
            this.state = 1998;
            this.expression();
            this.state = 1999;
            this.match(Java20Parser.RPAREN);
            this.state = 2000;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tryStatement(): TryStatementContext {
        let localContext = new TryStatementContext(this.context, this.state);
        this.enterRule(localContext, 368, Java20Parser.RULE_tryStatement);
        let _la: number;
        try {
            this.state = 2018;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 216, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2002;
                this.match(Java20Parser.TRY);
                this.state = 2003;
                this.block();
                this.state = 2004;
                this.catches();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2006;
                this.match(Java20Parser.TRY);
                this.state = 2007;
                this.block();
                this.state = 2008;
                this.finallyBlock();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2010;
                this.match(Java20Parser.TRY);
                this.state = 2011;
                this.block();
                this.state = 2013;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 24) {
                    {
                    this.state = 2012;
                    this.catches();
                    }
                }

                this.state = 2015;
                this.finallyBlock();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2017;
                this.tryWithResourcesStatement();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public catches(): CatchesContext {
        let localContext = new CatchesContext(this.context, this.state);
        this.enterRule(localContext, 370, Java20Parser.RULE_catches);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2020;
            this.catchClause();
            this.state = 2024;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 24) {
                {
                {
                this.state = 2021;
                this.catchClause();
                }
                }
                this.state = 2026;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public catchClause(): CatchClauseContext {
        let localContext = new CatchClauseContext(this.context, this.state);
        this.enterRule(localContext, 372, Java20Parser.RULE_catchClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2027;
            this.match(Java20Parser.CATCH);
            this.state = 2028;
            this.match(Java20Parser.LPAREN);
            this.state = 2029;
            this.catchFormalParameter();
            this.state = 2030;
            this.match(Java20Parser.RPAREN);
            this.state = 2031;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public catchFormalParameter(): CatchFormalParameterContext {
        let localContext = new CatchFormalParameterContext(this.context, this.state);
        this.enterRule(localContext, 374, Java20Parser.RULE_catchFormalParameter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2036;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 35 || _la === 86) {
                {
                {
                this.state = 2033;
                this.variableModifier();
                }
                }
                this.state = 2038;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2039;
            this.catchType();
            this.state = 2040;
            this.variableDeclaratorId();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public catchType(): CatchTypeContext {
        let localContext = new CatchTypeContext(this.context, this.state);
        this.enterRule(localContext, 376, Java20Parser.RULE_catchType);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2042;
            this.unannClassType();
            this.state = 2047;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 109) {
                {
                {
                this.state = 2043;
                this.match(Java20Parser.BITOR);
                this.state = 2044;
                this.classType();
                }
                }
                this.state = 2049;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public finallyBlock(): FinallyBlockContext {
        let localContext = new FinallyBlockContext(this.context, this.state);
        this.enterRule(localContext, 378, Java20Parser.RULE_finallyBlock);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2050;
            this.match(Java20Parser.FINALLY);
            this.state = 2051;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tryWithResourcesStatement(): TryWithResourcesStatementContext {
        let localContext = new TryWithResourcesStatementContext(this.context, this.state);
        this.enterRule(localContext, 380, Java20Parser.RULE_tryWithResourcesStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2053;
            this.match(Java20Parser.TRY);
            this.state = 2054;
            this.resourceSpecification();
            this.state = 2055;
            this.block();
            this.state = 2057;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 24) {
                {
                this.state = 2056;
                this.catches();
                }
            }

            this.state = 2060;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 36) {
                {
                this.state = 2059;
                this.finallyBlock();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceSpecification(): ResourceSpecificationContext {
        let localContext = new ResourceSpecificationContext(this.context, this.state);
        this.enterRule(localContext, 382, Java20Parser.RULE_resourceSpecification);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2062;
            this.match(Java20Parser.LPAREN);
            this.state = 2063;
            this.resourceList();
            this.state = 2065;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 82) {
                {
                this.state = 2064;
                this.match(Java20Parser.SEMI);
                }
            }

            this.state = 2067;
            this.match(Java20Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceList(): ResourceListContext {
        let localContext = new ResourceListContext(this.context, this.state);
        this.enterRule(localContext, 384, Java20Parser.RULE_resourceList);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2069;
            this.resource();
            this.state = 2074;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 223, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2070;
                    this.match(Java20Parser.SEMI);
                    this.state = 2071;
                    this.resource();
                    }
                    }
                }
                this.state = 2076;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 223, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resource(): ResourceContext {
        let localContext = new ResourceContext(this.context, this.state);
        this.enterRule(localContext, 386, Java20Parser.RULE_resource);
        try {
            this.state = 2079;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 224, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2077;
                this.localVariableDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2078;
                this.variableAccess();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public variableAccess(): VariableAccessContext {
        let localContext = new VariableAccessContext(this.context, this.state);
        this.enterRule(localContext, 388, Java20Parser.RULE_variableAccess);
        try {
            this.state = 2083;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 225, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2081;
                this.expressionName();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2082;
                this.fieldAccess();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public yieldStatement(): YieldStatementContext {
        let localContext = new YieldStatementContext(this.context, this.state);
        this.enterRule(localContext, 390, Java20Parser.RULE_yieldStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2085;
            this.match(Java20Parser.YIELD);
            this.state = 2086;
            this.expression();
            this.state = 2087;
            this.match(Java20Parser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pattern(): PatternContext {
        let localContext = new PatternContext(this.context, this.state);
        this.enterRule(localContext, 392, Java20Parser.RULE_pattern);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2089;
            this.typePattern();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typePattern(): TypePatternContext {
        let localContext = new TypePatternContext(this.context, this.state);
        this.enterRule(localContext, 394, Java20Parser.RULE_typePattern);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2091;
            this.localVariableDeclaration();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 396, Java20Parser.RULE_expression);
        try {
            this.state = 2095;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 226, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2093;
                this.lambdaExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2094;
                this.assignmentExpression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public primary(): PrimaryContext {
        let localContext = new PrimaryContext(this.context, this.state);
        this.enterRule(localContext, 398, Java20Parser.RULE_primary);
        try {
            this.state = 2099;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 227, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2097;
                this.primaryNoNewArray();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2098;
                this.arrayCreationExpression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public primaryNoNewArray(): PrimaryNoNewArrayContext {
        let localContext = new PrimaryNoNewArrayContext(this.context, this.state);
        this.enterRule(localContext, 400, Java20Parser.RULE_primaryNoNewArray);
        let _la: number;
        try {
            this.state = 2318;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 271, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2101;
                this.literal();
                this.state = 2103;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 228, this.context) ) {
                case 1:
                    {
                    this.state = 2102;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2105;
                this.classLiteral();
                this.state = 2107;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 229, this.context) ) {
                case 1:
                    {
                    this.state = 2106;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2109;
                this.match(Java20Parser.THIS);
                this.state = 2111;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 230, this.context) ) {
                case 1:
                    {
                    this.state = 2110;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2113;
                this.typeName();
                this.state = 2114;
                this.match(Java20Parser.DOT);
                this.state = 2115;
                this.match(Java20Parser.THIS);
                this.state = 2117;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 231, this.context) ) {
                case 1:
                    {
                    this.state = 2116;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2119;
                this.match(Java20Parser.LPAREN);
                this.state = 2120;
                this.expression();
                this.state = 2121;
                this.match(Java20Parser.RPAREN);
                this.state = 2123;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 232, this.context) ) {
                case 1:
                    {
                    this.state = 2122;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 2125;
                this.unqualifiedClassInstanceCreationExpression();
                this.state = 2127;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 233, this.context) ) {
                case 1:
                    {
                    this.state = 2126;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 2129;
                this.expressionName();
                this.state = 2130;
                this.match(Java20Parser.DOT);
                this.state = 2131;
                this.unqualifiedClassInstanceCreationExpression();
                this.state = 2133;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 234, this.context) ) {
                case 1:
                    {
                    this.state = 2132;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 2135;
                this.arrayCreationExpression();
                this.state = 2136;
                this.match(Java20Parser.DOT);
                this.state = 2137;
                this.unqualifiedClassInstanceCreationExpression();
                this.state = 2139;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 235, this.context) ) {
                case 1:
                    {
                    this.state = 2138;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 2141;
                this.arrayCreationExpression();
                this.state = 2142;
                this.match(Java20Parser.DOT);
                this.state = 2143;
                this.identifier();
                this.state = 2145;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 236, this.context) ) {
                case 1:
                    {
                    this.state = 2144;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 2147;
                this.match(Java20Parser.SUPER);
                this.state = 2148;
                this.match(Java20Parser.DOT);
                this.state = 2149;
                this.identifier();
                this.state = 2151;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 237, this.context) ) {
                case 1:
                    {
                    this.state = 2150;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 2153;
                this.typeName();
                this.state = 2154;
                this.match(Java20Parser.DOT);
                this.state = 2155;
                this.match(Java20Parser.SUPER);
                this.state = 2156;
                this.match(Java20Parser.DOT);
                this.state = 2157;
                this.identifier();
                this.state = 2159;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 238, this.context) ) {
                case 1:
                    {
                    this.state = 2158;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 2161;
                this.expressionName();
                this.state = 2162;
                this.match(Java20Parser.LBRACK);
                this.state = 2163;
                this.expression();
                this.state = 2164;
                this.match(Java20Parser.RBRACK);
                this.state = 2166;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 239, this.context) ) {
                case 1:
                    {
                    this.state = 2165;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 2168;
                this.arrayCreationExpressionWithInitializer();
                this.state = 2169;
                this.match(Java20Parser.LBRACK);
                this.state = 2170;
                this.expression();
                this.state = 2171;
                this.match(Java20Parser.RBRACK);
                this.state = 2173;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 240, this.context) ) {
                case 1:
                    {
                    this.state = 2172;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 2175;
                this.methodName();
                this.state = 2176;
                this.match(Java20Parser.LPAREN);
                this.state = 2178;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2177;
                    this.argumentList();
                    }
                }

                this.state = 2180;
                this.match(Java20Parser.RPAREN);
                this.state = 2182;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 242, this.context) ) {
                case 1:
                    {
                    this.state = 2181;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 2184;
                this.typeName();
                this.state = 2185;
                this.match(Java20Parser.DOT);
                this.state = 2187;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2186;
                    this.typeArguments();
                    }
                }

                this.state = 2189;
                this.identifier();
                this.state = 2190;
                this.match(Java20Parser.LPAREN);
                this.state = 2192;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2191;
                    this.argumentList();
                    }
                }

                this.state = 2194;
                this.match(Java20Parser.RPAREN);
                this.state = 2196;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 245, this.context) ) {
                case 1:
                    {
                    this.state = 2195;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 2198;
                this.expressionName();
                this.state = 2199;
                this.match(Java20Parser.DOT);
                this.state = 2201;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2200;
                    this.typeArguments();
                    }
                }

                this.state = 2203;
                this.identifier();
                this.state = 2204;
                this.match(Java20Parser.LPAREN);
                this.state = 2206;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2205;
                    this.argumentList();
                    }
                }

                this.state = 2208;
                this.match(Java20Parser.RPAREN);
                this.state = 2210;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 248, this.context) ) {
                case 1:
                    {
                    this.state = 2209;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 2212;
                this.arrayCreationExpression();
                this.state = 2213;
                this.match(Java20Parser.DOT);
                this.state = 2215;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2214;
                    this.typeArguments();
                    }
                }

                this.state = 2217;
                this.identifier();
                this.state = 2218;
                this.match(Java20Parser.LPAREN);
                this.state = 2220;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2219;
                    this.argumentList();
                    }
                }

                this.state = 2222;
                this.match(Java20Parser.RPAREN);
                this.state = 2224;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 251, this.context) ) {
                case 1:
                    {
                    this.state = 2223;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 2226;
                this.match(Java20Parser.SUPER);
                this.state = 2227;
                this.match(Java20Parser.DOT);
                this.state = 2229;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2228;
                    this.typeArguments();
                    }
                }

                this.state = 2231;
                this.identifier();
                this.state = 2232;
                this.match(Java20Parser.LPAREN);
                this.state = 2234;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2233;
                    this.argumentList();
                    }
                }

                this.state = 2236;
                this.match(Java20Parser.RPAREN);
                this.state = 2238;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 254, this.context) ) {
                case 1:
                    {
                    this.state = 2237;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 2240;
                this.typeName();
                this.state = 2241;
                this.match(Java20Parser.DOT);
                this.state = 2242;
                this.match(Java20Parser.SUPER);
                this.state = 2243;
                this.match(Java20Parser.DOT);
                this.state = 2245;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2244;
                    this.typeArguments();
                    }
                }

                this.state = 2247;
                this.identifier();
                this.state = 2248;
                this.match(Java20Parser.LPAREN);
                this.state = 2250;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2249;
                    this.argumentList();
                    }
                }

                this.state = 2252;
                this.match(Java20Parser.RPAREN);
                this.state = 2254;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 257, this.context) ) {
                case 1:
                    {
                    this.state = 2253;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 2256;
                this.expressionName();
                this.state = 2257;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2259;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2258;
                    this.typeArguments();
                    }
                }

                this.state = 2261;
                this.identifier();
                this.state = 2263;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 259, this.context) ) {
                case 1:
                    {
                    this.state = 2262;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 2265;
                this.arrayCreationExpression();
                this.state = 2266;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2268;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2267;
                    this.typeArguments();
                    }
                }

                this.state = 2270;
                this.identifier();
                this.state = 2272;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 261, this.context) ) {
                case 1:
                    {
                    this.state = 2271;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 2274;
                this.referenceType();
                this.state = 2275;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2277;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2276;
                    this.typeArguments();
                    }
                }

                this.state = 2279;
                this.identifier();
                this.state = 2281;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 263, this.context) ) {
                case 1:
                    {
                    this.state = 2280;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 2283;
                this.match(Java20Parser.SUPER);
                this.state = 2284;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2286;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2285;
                    this.typeArguments();
                    }
                }

                this.state = 2288;
                this.identifier();
                this.state = 2290;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 265, this.context) ) {
                case 1:
                    {
                    this.state = 2289;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 2292;
                this.typeName();
                this.state = 2293;
                this.match(Java20Parser.DOT);
                this.state = 2294;
                this.match(Java20Parser.SUPER);
                this.state = 2295;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2297;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2296;
                    this.typeArguments();
                    }
                }

                this.state = 2299;
                this.identifier();
                this.state = 2301;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 267, this.context) ) {
                case 1:
                    {
                    this.state = 2300;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 2303;
                this.classType();
                this.state = 2304;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2306;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2305;
                    this.typeArguments();
                    }
                }

                this.state = 2308;
                this.match(Java20Parser.NEW);
                this.state = 2310;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 269, this.context) ) {
                case 1:
                    {
                    this.state = 2309;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 2312;
                this.arrayType();
                this.state = 2313;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2314;
                this.match(Java20Parser.NEW);
                this.state = 2316;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 270, this.context) ) {
                case 1:
                    {
                    this.state = 2315;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pNNA(): PNNAContext {
        let localContext = new PNNAContext(this.context, this.state);
        this.enterRule(localContext, 402, Java20Parser.RULE_pNNA);
        let _la: number;
        try {
            this.state = 2357;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 280, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2320;
                this.match(Java20Parser.DOT);
                this.state = 2321;
                this.unqualifiedClassInstanceCreationExpression();
                this.state = 2323;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 272, this.context) ) {
                case 1:
                    {
                    this.state = 2322;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2325;
                this.match(Java20Parser.DOT);
                this.state = 2326;
                this.identifier();
                this.state = 2328;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 273, this.context) ) {
                case 1:
                    {
                    this.state = 2327;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2330;
                this.match(Java20Parser.LBRACK);
                this.state = 2331;
                this.expression();
                this.state = 2332;
                this.match(Java20Parser.RBRACK);
                this.state = 2334;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 274, this.context) ) {
                case 1:
                    {
                    this.state = 2333;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2336;
                this.match(Java20Parser.DOT);
                this.state = 2338;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2337;
                    this.typeArguments();
                    }
                }

                this.state = 2340;
                this.identifier();
                this.state = 2341;
                this.match(Java20Parser.LPAREN);
                this.state = 2343;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2342;
                    this.argumentList();
                    }
                }

                this.state = 2345;
                this.match(Java20Parser.RPAREN);
                this.state = 2347;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 277, this.context) ) {
                case 1:
                    {
                    this.state = 2346;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2349;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2351;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2350;
                    this.typeArguments();
                    }
                }

                this.state = 2353;
                this.identifier();
                this.state = 2355;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 279, this.context) ) {
                case 1:
                    {
                    this.state = 2354;
                    this.pNNA();
                    }
                    break;
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classLiteral(): ClassLiteralContext {
        let localContext = new ClassLiteralContext(this.context, this.state);
        this.enterRule(localContext, 404, Java20Parser.RULE_classLiteral);
        let _la: number;
        try {
            this.state = 2394;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.EXPORTS:
            case Java20Parser.MODULE:
            case Java20Parser.NONSEALED:
            case Java20Parser.OPEN:
            case Java20Parser.OPENS:
            case Java20Parser.PERMITS:
            case Java20Parser.PROVIDES:
            case Java20Parser.RECORD:
            case Java20Parser.REQUIRES:
            case Java20Parser.SEALED:
            case Java20Parser.TO:
            case Java20Parser.TRANSITIVE:
            case Java20Parser.USES:
            case Java20Parser.VAR:
            case Java20Parser.WITH:
            case Java20Parser.YIELD:
            case Java20Parser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2359;
                this.typeName();
                this.state = 2364;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 2360;
                    this.match(Java20Parser.LBRACK);
                    this.state = 2361;
                    this.match(Java20Parser.RBRACK);
                    }
                    }
                    this.state = 2366;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2367;
                this.match(Java20Parser.DOT);
                this.state = 2368;
                this.match(Java20Parser.CLASS);
                }
                break;
            case Java20Parser.BYTE:
            case Java20Parser.CHAR:
            case Java20Parser.DOUBLE:
            case Java20Parser.FLOAT:
            case Java20Parser.INT:
            case Java20Parser.LONG:
            case Java20Parser.SHORT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2370;
                this.numericType();
                this.state = 2375;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 2371;
                    this.match(Java20Parser.LBRACK);
                    this.state = 2372;
                    this.match(Java20Parser.RBRACK);
                    }
                    }
                    this.state = 2377;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2378;
                this.match(Java20Parser.DOT);
                this.state = 2379;
                this.match(Java20Parser.CLASS);
                }
                break;
            case Java20Parser.BOOLEAN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2381;
                this.match(Java20Parser.BOOLEAN);
                this.state = 2386;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 2382;
                    this.match(Java20Parser.LBRACK);
                    this.state = 2383;
                    this.match(Java20Parser.RBRACK);
                    }
                    }
                    this.state = 2388;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2389;
                this.match(Java20Parser.DOT);
                this.state = 2390;
                this.match(Java20Parser.CLASS);
                }
                break;
            case Java20Parser.VOID:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2391;
                this.match(Java20Parser.VOID);
                this.state = 2392;
                this.match(Java20Parser.DOT);
                this.state = 2393;
                this.match(Java20Parser.CLASS);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classInstanceCreationExpression(): ClassInstanceCreationExpressionContext {
        let localContext = new ClassInstanceCreationExpressionContext(this.context, this.state);
        this.enterRule(localContext, 406, Java20Parser.RULE_classInstanceCreationExpression);
        try {
            this.state = 2405;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 285, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2396;
                this.unqualifiedClassInstanceCreationExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2397;
                this.expressionName();
                this.state = 2398;
                this.match(Java20Parser.DOT);
                this.state = 2399;
                this.unqualifiedClassInstanceCreationExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2401;
                this.primary();
                this.state = 2402;
                this.match(Java20Parser.DOT);
                this.state = 2403;
                this.unqualifiedClassInstanceCreationExpression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unqualifiedClassInstanceCreationExpression(): UnqualifiedClassInstanceCreationExpressionContext {
        let localContext = new UnqualifiedClassInstanceCreationExpressionContext(this.context, this.state);
        this.enterRule(localContext, 408, Java20Parser.RULE_unqualifiedClassInstanceCreationExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2407;
            this.match(Java20Parser.NEW);
            this.state = 2409;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 90) {
                {
                this.state = 2408;
                this.typeArguments();
                }
            }

            this.state = 2411;
            this.classOrInterfaceTypeToInstantiate();
            this.state = 2412;
            this.match(Java20Parser.LPAREN);
            this.state = 2414;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                {
                this.state = 2413;
                this.argumentList();
                }
            }

            this.state = 2416;
            this.match(Java20Parser.RPAREN);
            this.state = 2418;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 288, this.context) ) {
            case 1:
                {
                this.state = 2417;
                this.classBody();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classOrInterfaceTypeToInstantiate(): ClassOrInterfaceTypeToInstantiateContext {
        let localContext = new ClassOrInterfaceTypeToInstantiateContext(this.context, this.state);
        this.enterRule(localContext, 410, Java20Parser.RULE_classOrInterfaceTypeToInstantiate);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2423;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 2420;
                this.annotation();
                }
                }
                this.state = 2425;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2426;
            this.identifier();
            this.state = 2437;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 84) {
                {
                {
                this.state = 2427;
                this.match(Java20Parser.DOT);
                this.state = 2431;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 2428;
                    this.annotation();
                    }
                    }
                    this.state = 2433;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2434;
                this.identifier();
                }
                }
                this.state = 2439;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2441;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4 || _la === 90) {
                {
                this.state = 2440;
                this.typeArgumentsOrDiamond();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeArgumentsOrDiamond(): TypeArgumentsOrDiamondContext {
        let localContext = new TypeArgumentsOrDiamondContext(this.context, this.state);
        this.enterRule(localContext, 412, Java20Parser.RULE_typeArgumentsOrDiamond);
        try {
            this.state = 2445;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.LT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2443;
                this.typeArguments();
                }
                break;
            case Java20Parser.OACA:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2444;
                this.match(Java20Parser.OACA);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arrayCreationExpression(): ArrayCreationExpressionContext {
        let localContext = new ArrayCreationExpressionContext(this.context, this.state);
        this.enterRule(localContext, 414, Java20Parser.RULE_arrayCreationExpression);
        try {
            this.state = 2449;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 294, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2447;
                this.arrayCreationExpressionWithoutInitializer();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2448;
                this.arrayCreationExpressionWithInitializer();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arrayCreationExpressionWithoutInitializer(): ArrayCreationExpressionWithoutInitializerContext {
        let localContext = new ArrayCreationExpressionWithoutInitializerContext(this.context, this.state);
        this.enterRule(localContext, 416, Java20Parser.RULE_arrayCreationExpressionWithoutInitializer);
        try {
            this.state = 2463;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 297, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2451;
                this.match(Java20Parser.NEW);
                this.state = 2452;
                this.primitiveType();
                this.state = 2453;
                this.dimExprs();
                this.state = 2455;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 295, this.context) ) {
                case 1:
                    {
                    this.state = 2454;
                    this.dims();
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2457;
                this.match(Java20Parser.NEW);
                this.state = 2458;
                this.classType();
                this.state = 2459;
                this.dimExprs();
                this.state = 2461;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 296, this.context) ) {
                case 1:
                    {
                    this.state = 2460;
                    this.dims();
                    }
                    break;
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arrayCreationExpressionWithInitializer(): ArrayCreationExpressionWithInitializerContext {
        let localContext = new ArrayCreationExpressionWithInitializerContext(this.context, this.state);
        this.enterRule(localContext, 418, Java20Parser.RULE_arrayCreationExpressionWithInitializer);
        try {
            this.state = 2475;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 298, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2465;
                this.match(Java20Parser.NEW);
                this.state = 2466;
                this.primitiveType();
                this.state = 2467;
                this.dims();
                this.state = 2468;
                this.arrayInitializer();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2470;
                this.match(Java20Parser.NEW);
                this.state = 2471;
                this.classOrInterfaceType();
                this.state = 2472;
                this.dims();
                this.state = 2473;
                this.arrayInitializer();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dimExprs(): DimExprsContext {
        let localContext = new DimExprsContext(this.context, this.state);
        this.enterRule(localContext, 420, Java20Parser.RULE_dimExprs);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2477;
            this.dimExpr();
            this.state = 2481;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 299, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2478;
                    this.dimExpr();
                    }
                    }
                }
                this.state = 2483;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 299, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dimExpr(): DimExprContext {
        let localContext = new DimExprContext(this.context, this.state);
        this.enterRule(localContext, 422, Java20Parser.RULE_dimExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2487;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 2484;
                this.annotation();
                }
                }
                this.state = 2489;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2490;
            this.match(Java20Parser.LBRACK);
            this.state = 2491;
            this.expression();
            this.state = 2492;
            this.match(Java20Parser.RBRACK);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arrayAccess(): ArrayAccessContext {
        let localContext = new ArrayAccessContext(this.context, this.state);
        this.enterRule(localContext, 424, Java20Parser.RULE_arrayAccess);
        try {
            this.state = 2509;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 301, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2494;
                this.expressionName();
                this.state = 2495;
                this.match(Java20Parser.LBRACK);
                this.state = 2496;
                this.expression();
                this.state = 2497;
                this.match(Java20Parser.RBRACK);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2499;
                this.primaryNoNewArray();
                this.state = 2500;
                this.match(Java20Parser.LBRACK);
                this.state = 2501;
                this.expression();
                this.state = 2502;
                this.match(Java20Parser.RBRACK);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2504;
                this.arrayCreationExpressionWithInitializer();
                this.state = 2505;
                this.match(Java20Parser.LBRACK);
                this.state = 2506;
                this.expression();
                this.state = 2507;
                this.match(Java20Parser.RBRACK);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fieldAccess(): FieldAccessContext {
        let localContext = new FieldAccessContext(this.context, this.state);
        this.enterRule(localContext, 426, Java20Parser.RULE_fieldAccess);
        try {
            this.state = 2524;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 302, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2511;
                this.primary();
                this.state = 2512;
                this.match(Java20Parser.DOT);
                this.state = 2513;
                this.identifier();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2515;
                this.match(Java20Parser.SUPER);
                this.state = 2516;
                this.match(Java20Parser.DOT);
                this.state = 2517;
                this.identifier();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2518;
                this.typeName();
                this.state = 2519;
                this.match(Java20Parser.DOT);
                this.state = 2520;
                this.match(Java20Parser.SUPER);
                this.state = 2521;
                this.match(Java20Parser.DOT);
                this.state = 2522;
                this.identifier();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodInvocation(): MethodInvocationContext {
        let localContext = new MethodInvocationContext(this.context, this.state);
        this.enterRule(localContext, 428, Java20Parser.RULE_methodInvocation);
        let _la: number;
        try {
            this.state = 2595;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 314, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2526;
                this.methodName();
                this.state = 2527;
                this.match(Java20Parser.LPAREN);
                this.state = 2529;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2528;
                    this.argumentList();
                    }
                }

                this.state = 2531;
                this.match(Java20Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2533;
                this.typeName();
                this.state = 2534;
                this.match(Java20Parser.DOT);
                this.state = 2536;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2535;
                    this.typeArguments();
                    }
                }

                this.state = 2538;
                this.identifier();
                this.state = 2539;
                this.match(Java20Parser.LPAREN);
                this.state = 2541;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2540;
                    this.argumentList();
                    }
                }

                this.state = 2543;
                this.match(Java20Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2545;
                this.expressionName();
                this.state = 2546;
                this.match(Java20Parser.DOT);
                this.state = 2548;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2547;
                    this.typeArguments();
                    }
                }

                this.state = 2550;
                this.identifier();
                this.state = 2551;
                this.match(Java20Parser.LPAREN);
                this.state = 2553;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2552;
                    this.argumentList();
                    }
                }

                this.state = 2555;
                this.match(Java20Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2557;
                this.primary();
                this.state = 2558;
                this.match(Java20Parser.DOT);
                this.state = 2560;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2559;
                    this.typeArguments();
                    }
                }

                this.state = 2562;
                this.identifier();
                this.state = 2563;
                this.match(Java20Parser.LPAREN);
                this.state = 2565;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2564;
                    this.argumentList();
                    }
                }

                this.state = 2567;
                this.match(Java20Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2569;
                this.match(Java20Parser.SUPER);
                this.state = 2570;
                this.match(Java20Parser.DOT);
                this.state = 2572;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2571;
                    this.typeArguments();
                    }
                }

                this.state = 2574;
                this.identifier();
                this.state = 2575;
                this.match(Java20Parser.LPAREN);
                this.state = 2577;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2576;
                    this.argumentList();
                    }
                }

                this.state = 2579;
                this.match(Java20Parser.RPAREN);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 2581;
                this.typeName();
                this.state = 2582;
                this.match(Java20Parser.DOT);
                this.state = 2583;
                this.match(Java20Parser.SUPER);
                this.state = 2584;
                this.match(Java20Parser.DOT);
                this.state = 2586;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2585;
                    this.typeArguments();
                    }
                }

                this.state = 2588;
                this.identifier();
                this.state = 2589;
                this.match(Java20Parser.LPAREN);
                this.state = 2591;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 280103553) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 12714239) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 2097167) !== 0)) {
                    {
                    this.state = 2590;
                    this.argumentList();
                    }
                }

                this.state = 2593;
                this.match(Java20Parser.RPAREN);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public argumentList(): ArgumentListContext {
        let localContext = new ArgumentListContext(this.context, this.state);
        this.enterRule(localContext, 430, Java20Parser.RULE_argumentList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2597;
            this.expression();
            this.state = 2602;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 2598;
                this.match(Java20Parser.COMMA);
                this.state = 2599;
                this.expression();
                }
                }
                this.state = 2604;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodReference(): MethodReferenceContext {
        let localContext = new MethodReferenceContext(this.context, this.state);
        this.enterRule(localContext, 432, Java20Parser.RULE_methodReference);
        let _la: number;
        try {
            this.state = 2652;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 322, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2605;
                this.expressionName();
                this.state = 2606;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2608;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2607;
                    this.typeArguments();
                    }
                }

                this.state = 2610;
                this.identifier();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2612;
                this.primary();
                this.state = 2613;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2615;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2614;
                    this.typeArguments();
                    }
                }

                this.state = 2617;
                this.identifier();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2619;
                this.referenceType();
                this.state = 2620;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2622;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2621;
                    this.typeArguments();
                    }
                }

                this.state = 2624;
                this.identifier();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2626;
                this.match(Java20Parser.SUPER);
                this.state = 2627;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2629;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2628;
                    this.typeArguments();
                    }
                }

                this.state = 2631;
                this.identifier();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2632;
                this.typeName();
                this.state = 2633;
                this.match(Java20Parser.DOT);
                this.state = 2634;
                this.match(Java20Parser.SUPER);
                this.state = 2635;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2637;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2636;
                    this.typeArguments();
                    }
                }

                this.state = 2639;
                this.identifier();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 2641;
                this.classType();
                this.state = 2642;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2644;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 2643;
                    this.typeArguments();
                    }
                }

                this.state = 2646;
                this.match(Java20Parser.NEW);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 2648;
                this.arrayType();
                this.state = 2649;
                this.match(Java20Parser.COLONCOLON);
                this.state = 2650;
                this.match(Java20Parser.NEW);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public postfixExpression(): PostfixExpressionContext {
        let localContext = new PostfixExpressionContext(this.context, this.state);
        this.enterRule(localContext, 434, Java20Parser.RULE_postfixExpression);
        try {
            this.state = 2662;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 325, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2654;
                this.primary();
                this.state = 2656;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 323, this.context) ) {
                case 1:
                    {
                    this.state = 2655;
                    this.pfE();
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2658;
                this.expressionName();
                this.state = 2660;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 324, this.context) ) {
                case 1:
                    {
                    this.state = 2659;
                    this.pfE();
                    }
                    break;
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pfE(): PfEContext {
        let localContext = new PfEContext(this.context, this.state);
        this.enterRule(localContext, 436, Java20Parser.RULE_pfE);
        try {
            this.state = 2672;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.INC:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2664;
                this.match(Java20Parser.INC);
                this.state = 2666;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 326, this.context) ) {
                case 1:
                    {
                    this.state = 2665;
                    this.pfE();
                    }
                    break;
                }
                }
                break;
            case Java20Parser.DEC:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2668;
                this.match(Java20Parser.DEC);
                this.state = 2670;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 327, this.context) ) {
                case 1:
                    {
                    this.state = 2669;
                    this.pfE();
                    }
                    break;
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public postIncrementExpression(): PostIncrementExpressionContext {
        let localContext = new PostIncrementExpressionContext(this.context, this.state);
        this.enterRule(localContext, 438, Java20Parser.RULE_postIncrementExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2674;
            this.postfixExpression();
            this.state = 2675;
            this.match(Java20Parser.INC);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public postDecrementExpression(): PostDecrementExpressionContext {
        let localContext = new PostDecrementExpressionContext(this.context, this.state);
        this.enterRule(localContext, 440, Java20Parser.RULE_postDecrementExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2677;
            this.postfixExpression();
            this.state = 2678;
            this.match(Java20Parser.DEC);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unaryExpression(): UnaryExpressionContext {
        let localContext = new UnaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 442, Java20Parser.RULE_unaryExpression);
        try {
            this.state = 2687;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.INC:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2680;
                this.preIncrementExpression();
                }
                break;
            case Java20Parser.DEC:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2681;
                this.preDecrementExpression();
                }
                break;
            case Java20Parser.ADD:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2682;
                this.match(Java20Parser.ADD);
                this.state = 2683;
                this.unaryExpression();
                }
                break;
            case Java20Parser.SUB:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2684;
                this.match(Java20Parser.SUB);
                this.state = 2685;
                this.unaryExpression();
                }
                break;
            case Java20Parser.EXPORTS:
            case Java20Parser.MODULE:
            case Java20Parser.NONSEALED:
            case Java20Parser.OPEN:
            case Java20Parser.OPENS:
            case Java20Parser.PERMITS:
            case Java20Parser.PROVIDES:
            case Java20Parser.RECORD:
            case Java20Parser.REQUIRES:
            case Java20Parser.SEALED:
            case Java20Parser.TO:
            case Java20Parser.TRANSITIVE:
            case Java20Parser.USES:
            case Java20Parser.VAR:
            case Java20Parser.WITH:
            case Java20Parser.YIELD:
            case Java20Parser.BOOLEAN:
            case Java20Parser.BYTE:
            case Java20Parser.CHAR:
            case Java20Parser.DOUBLE:
            case Java20Parser.FLOAT:
            case Java20Parser.INT:
            case Java20Parser.LONG:
            case Java20Parser.NEW:
            case Java20Parser.SHORT:
            case Java20Parser.SUPER:
            case Java20Parser.SWITCH:
            case Java20Parser.THIS:
            case Java20Parser.VOID:
            case Java20Parser.IntegerLiteral:
            case Java20Parser.FloatingPointLiteral:
            case Java20Parser.BooleanLiteral:
            case Java20Parser.CharacterLiteral:
            case Java20Parser.StringLiteral:
            case Java20Parser.TextBlock:
            case Java20Parser.NullLiteral:
            case Java20Parser.LPAREN:
            case Java20Parser.AT:
            case Java20Parser.BANG:
            case Java20Parser.TILDE:
            case Java20Parser.Identifier:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2686;
                this.unaryExpressionNotPlusMinus();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public preIncrementExpression(): PreIncrementExpressionContext {
        let localContext = new PreIncrementExpressionContext(this.context, this.state);
        this.enterRule(localContext, 444, Java20Parser.RULE_preIncrementExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2689;
            this.match(Java20Parser.INC);
            this.state = 2690;
            this.unaryExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public preDecrementExpression(): PreDecrementExpressionContext {
        let localContext = new PreDecrementExpressionContext(this.context, this.state);
        this.enterRule(localContext, 446, Java20Parser.RULE_preDecrementExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2692;
            this.match(Java20Parser.DEC);
            this.state = 2693;
            this.unaryExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unaryExpressionNotPlusMinus(): UnaryExpressionNotPlusMinusContext {
        let localContext = new UnaryExpressionNotPlusMinusContext(this.context, this.state);
        this.enterRule(localContext, 448, Java20Parser.RULE_unaryExpressionNotPlusMinus);
        try {
            this.state = 2702;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 330, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2695;
                this.postfixExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2696;
                this.match(Java20Parser.TILDE);
                this.state = 2697;
                this.unaryExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2698;
                this.match(Java20Parser.BANG);
                this.state = 2699;
                this.unaryExpression();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2700;
                this.castExpression();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2701;
                this.switchExpression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public castExpression(): CastExpressionContext {
        let localContext = new CastExpressionContext(this.context, this.state);
        this.enterRule(localContext, 450, Java20Parser.RULE_castExpression);
        let _la: number;
        try {
            this.state = 2731;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 333, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2704;
                this.match(Java20Parser.LPAREN);
                this.state = 2705;
                this.primitiveType();
                this.state = 2706;
                this.match(Java20Parser.RPAREN);
                this.state = 2707;
                this.unaryExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2709;
                this.match(Java20Parser.LPAREN);
                this.state = 2710;
                this.referenceType();
                this.state = 2714;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 108) {
                    {
                    {
                    this.state = 2711;
                    this.additionalBound();
                    }
                    }
                    this.state = 2716;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2717;
                this.match(Java20Parser.RPAREN);
                this.state = 2718;
                this.unaryExpressionNotPlusMinus();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2720;
                this.match(Java20Parser.LPAREN);
                this.state = 2721;
                this.referenceType();
                this.state = 2725;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 108) {
                    {
                    {
                    this.state = 2722;
                    this.additionalBound();
                    }
                    }
                    this.state = 2727;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2728;
                this.match(Java20Parser.RPAREN);
                this.state = 2729;
                this.lambdaExpression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public multiplicativeExpression(): MultiplicativeExpressionContext;
    public multiplicativeExpression(_p: number): MultiplicativeExpressionContext;
    public multiplicativeExpression(_p?: number): MultiplicativeExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new MultiplicativeExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 452;
        this.enterRecursionRule(localContext, 452, Java20Parser.RULE_multiplicativeExpression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 2734;
            this.unaryExpression();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2747;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 335, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 2745;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 334, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplicativeExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_multiplicativeExpression);
                        this.state = 2736;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 2737;
                        this.match(Java20Parser.MUL);
                        this.state = 2738;
                        this.unaryExpression();
                        }
                        break;
                    case 2:
                        {
                        localContext = new MultiplicativeExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_multiplicativeExpression);
                        this.state = 2739;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 2740;
                        this.match(Java20Parser.DIV);
                        this.state = 2741;
                        this.unaryExpression();
                        }
                        break;
                    case 3:
                        {
                        localContext = new MultiplicativeExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_multiplicativeExpression);
                        this.state = 2742;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 2743;
                        this.match(Java20Parser.MOD);
                        this.state = 2744;
                        this.unaryExpression();
                        }
                        break;
                    }
                    }
                }
                this.state = 2749;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 335, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public additiveExpression(): AdditiveExpressionContext;
    public additiveExpression(_p: number): AdditiveExpressionContext;
    public additiveExpression(_p?: number): AdditiveExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new AdditiveExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 454;
        this.enterRecursionRule(localContext, 454, Java20Parser.RULE_additiveExpression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 2751;
            this.multiplicativeExpression(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2761;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 337, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 2759;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 336, this.context) ) {
                    case 1:
                        {
                        localContext = new AdditiveExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_additiveExpression);
                        this.state = 2753;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 2754;
                        this.match(Java20Parser.ADD);
                        this.state = 2755;
                        this.multiplicativeExpression(0);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditiveExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_additiveExpression);
                        this.state = 2756;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 2757;
                        this.match(Java20Parser.SUB);
                        this.state = 2758;
                        this.multiplicativeExpression(0);
                        }
                        break;
                    }
                    }
                }
                this.state = 2763;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 337, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public shiftExpression(): ShiftExpressionContext;
    public shiftExpression(_p: number): ShiftExpressionContext;
    public shiftExpression(_p?: number): ShiftExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ShiftExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 456;
        this.enterRecursionRule(localContext, 456, Java20Parser.RULE_shiftExpression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 2765;
            this.additiveExpression(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2782;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 339, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 2780;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 338, this.context) ) {
                    case 1:
                        {
                        localContext = new ShiftExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_shiftExpression);
                        this.state = 2767;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 2768;
                        this.match(Java20Parser.LT);
                        this.state = 2769;
                        this.match(Java20Parser.LT);
                        this.state = 2770;
                        this.additiveExpression(0);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ShiftExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_shiftExpression);
                        this.state = 2771;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 2772;
                        this.match(Java20Parser.GT);
                        this.state = 2773;
                        this.match(Java20Parser.GT);
                        this.state = 2774;
                        this.additiveExpression(0);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ShiftExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_shiftExpression);
                        this.state = 2775;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 2776;
                        this.match(Java20Parser.GT);
                        this.state = 2777;
                        this.match(Java20Parser.GT);
                        this.state = 2778;
                        this.match(Java20Parser.GT);
                        this.state = 2779;
                        this.additiveExpression(0);
                        }
                        break;
                    }
                    }
                }
                this.state = 2784;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 339, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public relationalExpression(): RelationalExpressionContext;
    public relationalExpression(_p: number): RelationalExpressionContext;
    public relationalExpression(_p?: number): RelationalExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new RelationalExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 458;
        this.enterRecursionRule(localContext, 458, Java20Parser.RULE_relationalExpression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 2786;
            this.shiftExpression(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2808;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 342, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 2806;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 341, this.context) ) {
                    case 1:
                        {
                        localContext = new RelationalExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_relationalExpression);
                        this.state = 2788;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 2789;
                        this.match(Java20Parser.LT);
                        this.state = 2790;
                        this.shiftExpression(0);
                        }
                        break;
                    case 2:
                        {
                        localContext = new RelationalExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_relationalExpression);
                        this.state = 2791;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 2792;
                        this.match(Java20Parser.GT);
                        this.state = 2793;
                        this.shiftExpression(0);
                        }
                        break;
                    case 3:
                        {
                        localContext = new RelationalExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_relationalExpression);
                        this.state = 2794;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 2795;
                        this.match(Java20Parser.LE);
                        this.state = 2796;
                        this.shiftExpression(0);
                        }
                        break;
                    case 4:
                        {
                        localContext = new RelationalExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_relationalExpression);
                        this.state = 2797;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 2798;
                        this.match(Java20Parser.GE);
                        this.state = 2799;
                        this.shiftExpression(0);
                        }
                        break;
                    case 5:
                        {
                        localContext = new RelationalExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_relationalExpression);
                        this.state = 2800;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 2801;
                        this.match(Java20Parser.INSTANCEOF);
                        this.state = 2804;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 340, this.context) ) {
                        case 1:
                            {
                            this.state = 2802;
                            this.referenceType();
                            }
                            break;
                        case 2:
                            {
                            this.state = 2803;
                            this.pattern();
                            }
                            break;
                        }
                        }
                        break;
                    }
                    }
                }
                this.state = 2810;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 342, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public equalityExpression(): EqualityExpressionContext;
    public equalityExpression(_p: number): EqualityExpressionContext;
    public equalityExpression(_p?: number): EqualityExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new EqualityExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 460;
        this.enterRecursionRule(localContext, 460, Java20Parser.RULE_equalityExpression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 2812;
            this.relationalExpression(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2822;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 344, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 2820;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 343, this.context) ) {
                    case 1:
                        {
                        localContext = new EqualityExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_equalityExpression);
                        this.state = 2814;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 2815;
                        this.match(Java20Parser.EQUAL);
                        this.state = 2816;
                        this.relationalExpression(0);
                        }
                        break;
                    case 2:
                        {
                        localContext = new EqualityExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_equalityExpression);
                        this.state = 2817;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 2818;
                        this.match(Java20Parser.NOTEQUAL);
                        this.state = 2819;
                        this.relationalExpression(0);
                        }
                        break;
                    }
                    }
                }
                this.state = 2824;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 344, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public andExpression(): AndExpressionContext;
    public andExpression(_p: number): AndExpressionContext;
    public andExpression(_p?: number): AndExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new AndExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 462;
        this.enterRecursionRule(localContext, 462, Java20Parser.RULE_andExpression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 2826;
            this.equalityExpression(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2833;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 345, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new AndExpressionContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_andExpression);
                    this.state = 2828;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 2829;
                    this.match(Java20Parser.BITAND);
                    this.state = 2830;
                    this.equalityExpression(0);
                    }
                    }
                }
                this.state = 2835;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 345, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public exclusiveOrExpression(): ExclusiveOrExpressionContext;
    public exclusiveOrExpression(_p: number): ExclusiveOrExpressionContext;
    public exclusiveOrExpression(_p?: number): ExclusiveOrExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ExclusiveOrExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 464;
        this.enterRecursionRule(localContext, 464, Java20Parser.RULE_exclusiveOrExpression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 2837;
            this.andExpression(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2844;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 346, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new ExclusiveOrExpressionContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_exclusiveOrExpression);
                    this.state = 2839;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 2840;
                    this.match(Java20Parser.CARET);
                    this.state = 2841;
                    this.andExpression(0);
                    }
                    }
                }
                this.state = 2846;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 346, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public inclusiveOrExpression(): InclusiveOrExpressionContext;
    public inclusiveOrExpression(_p: number): InclusiveOrExpressionContext;
    public inclusiveOrExpression(_p?: number): InclusiveOrExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new InclusiveOrExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 466;
        this.enterRecursionRule(localContext, 466, Java20Parser.RULE_inclusiveOrExpression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 2848;
            this.exclusiveOrExpression(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2855;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 347, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new InclusiveOrExpressionContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_inclusiveOrExpression);
                    this.state = 2850;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 2851;
                    this.match(Java20Parser.BITOR);
                    this.state = 2852;
                    this.exclusiveOrExpression(0);
                    }
                    }
                }
                this.state = 2857;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 347, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public conditionalAndExpression(): ConditionalAndExpressionContext;
    public conditionalAndExpression(_p: number): ConditionalAndExpressionContext;
    public conditionalAndExpression(_p?: number): ConditionalAndExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ConditionalAndExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 468;
        this.enterRecursionRule(localContext, 468, Java20Parser.RULE_conditionalAndExpression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 2859;
            this.inclusiveOrExpression(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2866;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 348, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new ConditionalAndExpressionContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_conditionalAndExpression);
                    this.state = 2861;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 2862;
                    this.match(Java20Parser.AND);
                    this.state = 2863;
                    this.inclusiveOrExpression(0);
                    }
                    }
                }
                this.state = 2868;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 348, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public conditionalOrExpression(): ConditionalOrExpressionContext;
    public conditionalOrExpression(_p: number): ConditionalOrExpressionContext;
    public conditionalOrExpression(_p?: number): ConditionalOrExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ConditionalOrExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 470;
        this.enterRecursionRule(localContext, 470, Java20Parser.RULE_conditionalOrExpression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 2870;
            this.conditionalAndExpression(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2877;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 349, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new ConditionalOrExpressionContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, Java20Parser.RULE_conditionalOrExpression);
                    this.state = 2872;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 2873;
                    this.match(Java20Parser.OR);
                    this.state = 2874;
                    this.conditionalAndExpression(0);
                    }
                    }
                }
                this.state = 2879;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 349, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public conditionalExpression(): ConditionalExpressionContext {
        let localContext = new ConditionalExpressionContext(this.context, this.state);
        this.enterRule(localContext, 472, Java20Parser.RULE_conditionalExpression);
        try {
            this.state = 2893;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 350, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2880;
                this.conditionalOrExpression(0);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2881;
                this.conditionalOrExpression(0);
                this.state = 2882;
                this.match(Java20Parser.QUESTION);
                this.state = 2883;
                this.expression();
                this.state = 2884;
                this.match(Java20Parser.COLON);
                this.state = 2885;
                this.conditionalExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2887;
                this.conditionalOrExpression(0);
                this.state = 2888;
                this.match(Java20Parser.QUESTION);
                this.state = 2889;
                this.expression();
                this.state = 2890;
                this.match(Java20Parser.COLON);
                this.state = 2891;
                this.lambdaExpression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assignmentExpression(): AssignmentExpressionContext {
        let localContext = new AssignmentExpressionContext(this.context, this.state);
        this.enterRule(localContext, 474, Java20Parser.RULE_assignmentExpression);
        try {
            this.state = 2897;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 351, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2895;
                this.conditionalExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2896;
                this.assignment();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assignment(): AssignmentContext {
        let localContext = new AssignmentContext(this.context, this.state);
        this.enterRule(localContext, 476, Java20Parser.RULE_assignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2899;
            this.leftHandSide();
            this.state = 2900;
            this.assignmentOperator();
            this.state = 2901;
            this.expression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public leftHandSide(): LeftHandSideContext {
        let localContext = new LeftHandSideContext(this.context, this.state);
        this.enterRule(localContext, 478, Java20Parser.RULE_leftHandSide);
        try {
            this.state = 2906;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 352, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2903;
                this.expressionName();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2904;
                this.fieldAccess();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2905;
                this.arrayAccess();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assignmentOperator(): AssignmentOperatorContext {
        let localContext = new AssignmentOperatorContext(this.context, this.state);
        this.enterRule(localContext, 480, Java20Parser.RULE_assignmentOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2908;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 88)) & ~0x1F) === 0 && ((1 << (_la - 88)) & 4278190081) !== 0) || ((((_la - 120)) & ~0x1F) === 0 && ((1 << (_la - 120)) & 7) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public lambdaExpression(): LambdaExpressionContext {
        let localContext = new LambdaExpressionContext(this.context, this.state);
        this.enterRule(localContext, 482, Java20Parser.RULE_lambdaExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2910;
            this.lambdaParameters();
            this.state = 2911;
            this.match(Java20Parser.ARROW);
            this.state = 2912;
            this.lambdaBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public lambdaParameters(): LambdaParametersContext {
        let localContext = new LambdaParametersContext(this.context, this.state);
        this.enterRule(localContext, 484, Java20Parser.RULE_lambdaParameters);
        let _la: number;
        try {
            this.state = 2920;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2914;
                this.match(Java20Parser.LPAREN);
                this.state = 2916;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2186543086) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 526853) !== 0) || _la === 86 || _la === 123) {
                    {
                    this.state = 2915;
                    this.lambdaParameterList();
                    }
                }

                this.state = 2918;
                this.match(Java20Parser.RPAREN);
                }
                break;
            case Java20Parser.EXPORTS:
            case Java20Parser.MODULE:
            case Java20Parser.NONSEALED:
            case Java20Parser.OPEN:
            case Java20Parser.OPENS:
            case Java20Parser.PERMITS:
            case Java20Parser.PROVIDES:
            case Java20Parser.RECORD:
            case Java20Parser.REQUIRES:
            case Java20Parser.SEALED:
            case Java20Parser.TO:
            case Java20Parser.TRANSITIVE:
            case Java20Parser.USES:
            case Java20Parser.VAR:
            case Java20Parser.WITH:
            case Java20Parser.YIELD:
            case Java20Parser.Identifier:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2919;
                this.identifier();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public lambdaParameterList(): LambdaParameterListContext {
        let localContext = new LambdaParameterListContext(this.context, this.state);
        this.enterRule(localContext, 486, Java20Parser.RULE_lambdaParameterList);
        let _la: number;
        try {
            this.state = 2938;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 357, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2922;
                this.lambdaParameter();
                this.state = 2927;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 83) {
                    {
                    {
                    this.state = 2923;
                    this.match(Java20Parser.COMMA);
                    this.state = 2924;
                    this.lambdaParameter();
                    }
                    }
                    this.state = 2929;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2930;
                this.identifier();
                this.state = 2935;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 83) {
                    {
                    {
                    this.state = 2931;
                    this.match(Java20Parser.COMMA);
                    this.state = 2932;
                    this.identifier();
                    }
                    }
                    this.state = 2937;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public lambdaParameter(): LambdaParameterContext {
        let localContext = new LambdaParameterContext(this.context, this.state);
        this.enterRule(localContext, 488, Java20Parser.RULE_lambdaParameter);
        let _la: number;
        try {
            this.state = 2950;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 359, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2943;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 35 || _la === 86) {
                    {
                    {
                    this.state = 2940;
                    this.variableModifier();
                    }
                    }
                    this.state = 2945;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2946;
                this.lambdaParameterType();
                this.state = 2947;
                this.variableDeclaratorId();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2949;
                this.variableArityParameter();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public lambdaParameterType(): LambdaParameterTypeContext {
        let localContext = new LambdaParameterTypeContext(this.context, this.state);
        this.enterRule(localContext, 490, Java20Parser.RULE_lambdaParameterType);
        try {
            this.state = 2954;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 360, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2952;
                this.unannType();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2953;
                this.match(Java20Parser.VAR);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public lambdaBody(): LambdaBodyContext {
        let localContext = new LambdaBodyContext(this.context, this.state);
        this.enterRule(localContext, 492, Java20Parser.RULE_lambdaBody);
        try {
            this.state = 2958;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Java20Parser.EXPORTS:
            case Java20Parser.MODULE:
            case Java20Parser.NONSEALED:
            case Java20Parser.OPEN:
            case Java20Parser.OPENS:
            case Java20Parser.PERMITS:
            case Java20Parser.PROVIDES:
            case Java20Parser.RECORD:
            case Java20Parser.REQUIRES:
            case Java20Parser.SEALED:
            case Java20Parser.TO:
            case Java20Parser.TRANSITIVE:
            case Java20Parser.USES:
            case Java20Parser.VAR:
            case Java20Parser.WITH:
            case Java20Parser.YIELD:
            case Java20Parser.BOOLEAN:
            case Java20Parser.BYTE:
            case Java20Parser.CHAR:
            case Java20Parser.DOUBLE:
            case Java20Parser.FLOAT:
            case Java20Parser.INT:
            case Java20Parser.LONG:
            case Java20Parser.NEW:
            case Java20Parser.SHORT:
            case Java20Parser.SUPER:
            case Java20Parser.SWITCH:
            case Java20Parser.THIS:
            case Java20Parser.VOID:
            case Java20Parser.IntegerLiteral:
            case Java20Parser.FloatingPointLiteral:
            case Java20Parser.BooleanLiteral:
            case Java20Parser.CharacterLiteral:
            case Java20Parser.StringLiteral:
            case Java20Parser.TextBlock:
            case Java20Parser.NullLiteral:
            case Java20Parser.LPAREN:
            case Java20Parser.AT:
            case Java20Parser.BANG:
            case Java20Parser.TILDE:
            case Java20Parser.INC:
            case Java20Parser.DEC:
            case Java20Parser.ADD:
            case Java20Parser.SUB:
            case Java20Parser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2956;
                this.expression();
                }
                break;
            case Java20Parser.LBRACE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2957;
                this.block();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public switchExpression(): SwitchExpressionContext {
        let localContext = new SwitchExpressionContext(this.context, this.state);
        this.enterRule(localContext, 494, Java20Parser.RULE_switchExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2960;
            this.match(Java20Parser.SWITCH);
            this.state = 2961;
            this.match(Java20Parser.LPAREN);
            this.state = 2962;
            this.expression();
            this.state = 2963;
            this.match(Java20Parser.RPAREN);
            this.state = 2964;
            this.switchBlock();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constantExpression(): ConstantExpressionContext {
        let localContext = new ConstantExpressionContext(this.context, this.state);
        this.enterRule(localContext, 496, Java20Parser.RULE_constantExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2966;
            this.expression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 226:
            return this.multiplicativeExpression_sempred(localContext as MultiplicativeExpressionContext, predIndex);
        case 227:
            return this.additiveExpression_sempred(localContext as AdditiveExpressionContext, predIndex);
        case 228:
            return this.shiftExpression_sempred(localContext as ShiftExpressionContext, predIndex);
        case 229:
            return this.relationalExpression_sempred(localContext as RelationalExpressionContext, predIndex);
        case 230:
            return this.equalityExpression_sempred(localContext as EqualityExpressionContext, predIndex);
        case 231:
            return this.andExpression_sempred(localContext as AndExpressionContext, predIndex);
        case 232:
            return this.exclusiveOrExpression_sempred(localContext as ExclusiveOrExpressionContext, predIndex);
        case 233:
            return this.inclusiveOrExpression_sempred(localContext as InclusiveOrExpressionContext, predIndex);
        case 234:
            return this.conditionalAndExpression_sempred(localContext as ConditionalAndExpressionContext, predIndex);
        case 235:
            return this.conditionalOrExpression_sempred(localContext as ConditionalOrExpressionContext, predIndex);
        }
        return true;
    }
    private multiplicativeExpression_sempred(localContext: MultiplicativeExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 3);
        case 1:
            return this.precpred(this.context, 2);
        case 2:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private additiveExpression_sempred(localContext: AdditiveExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 3:
            return this.precpred(this.context, 2);
        case 4:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private shiftExpression_sempred(localContext: ShiftExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 5:
            return this.precpred(this.context, 3);
        case 6:
            return this.precpred(this.context, 2);
        case 7:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private relationalExpression_sempred(localContext: RelationalExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 8:
            return this.precpred(this.context, 5);
        case 9:
            return this.precpred(this.context, 4);
        case 10:
            return this.precpred(this.context, 3);
        case 11:
            return this.precpred(this.context, 2);
        case 12:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private equalityExpression_sempred(localContext: EqualityExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 13:
            return this.precpred(this.context, 2);
        case 14:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private andExpression_sempred(localContext: AndExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 15:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private exclusiveOrExpression_sempred(localContext: ExclusiveOrExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 16:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private inclusiveOrExpression_sempred(localContext: InclusiveOrExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 17:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private conditionalAndExpression_sempred(localContext: ConditionalAndExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 18:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private conditionalOrExpression_sempred(localContext: ConditionalOrExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 19:
            return this.precpred(this.context, 1);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,126,2969,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,
        52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,
        59,7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,
        65,2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,
        72,7,72,2,73,7,73,2,74,7,74,2,75,7,75,2,76,7,76,2,77,7,77,2,78,7,
        78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,7,82,2,83,7,83,2,84,7,84,2,
        85,7,85,2,86,7,86,2,87,7,87,2,88,7,88,2,89,7,89,2,90,7,90,2,91,7,
        91,2,92,7,92,2,93,7,93,2,94,7,94,2,95,7,95,2,96,7,96,2,97,7,97,2,
        98,7,98,2,99,7,99,2,100,7,100,2,101,7,101,2,102,7,102,2,103,7,103,
        2,104,7,104,2,105,7,105,2,106,7,106,2,107,7,107,2,108,7,108,2,109,
        7,109,2,110,7,110,2,111,7,111,2,112,7,112,2,113,7,113,2,114,7,114,
        2,115,7,115,2,116,7,116,2,117,7,117,2,118,7,118,2,119,7,119,2,120,
        7,120,2,121,7,121,2,122,7,122,2,123,7,123,2,124,7,124,2,125,7,125,
        2,126,7,126,2,127,7,127,2,128,7,128,2,129,7,129,2,130,7,130,2,131,
        7,131,2,132,7,132,2,133,7,133,2,134,7,134,2,135,7,135,2,136,7,136,
        2,137,7,137,2,138,7,138,2,139,7,139,2,140,7,140,2,141,7,141,2,142,
        7,142,2,143,7,143,2,144,7,144,2,145,7,145,2,146,7,146,2,147,7,147,
        2,148,7,148,2,149,7,149,2,150,7,150,2,151,7,151,2,152,7,152,2,153,
        7,153,2,154,7,154,2,155,7,155,2,156,7,156,2,157,7,157,2,158,7,158,
        2,159,7,159,2,160,7,160,2,161,7,161,2,162,7,162,2,163,7,163,2,164,
        7,164,2,165,7,165,2,166,7,166,2,167,7,167,2,168,7,168,2,169,7,169,
        2,170,7,170,2,171,7,171,2,172,7,172,2,173,7,173,2,174,7,174,2,175,
        7,175,2,176,7,176,2,177,7,177,2,178,7,178,2,179,7,179,2,180,7,180,
        2,181,7,181,2,182,7,182,2,183,7,183,2,184,7,184,2,185,7,185,2,186,
        7,186,2,187,7,187,2,188,7,188,2,189,7,189,2,190,7,190,2,191,7,191,
        2,192,7,192,2,193,7,193,2,194,7,194,2,195,7,195,2,196,7,196,2,197,
        7,197,2,198,7,198,2,199,7,199,2,200,7,200,2,201,7,201,2,202,7,202,
        2,203,7,203,2,204,7,204,2,205,7,205,2,206,7,206,2,207,7,207,2,208,
        7,208,2,209,7,209,2,210,7,210,2,211,7,211,2,212,7,212,2,213,7,213,
        2,214,7,214,2,215,7,215,2,216,7,216,2,217,7,217,2,218,7,218,2,219,
        7,219,2,220,7,220,2,221,7,221,2,222,7,222,2,223,7,223,2,224,7,224,
        2,225,7,225,2,226,7,226,2,227,7,227,2,228,7,228,2,229,7,229,2,230,
        7,230,2,231,7,231,2,232,7,232,2,233,7,233,2,234,7,234,2,235,7,235,
        2,236,7,236,2,237,7,237,2,238,7,238,2,239,7,239,2,240,7,240,2,241,
        7,241,2,242,7,242,2,243,7,243,2,244,7,244,2,245,7,245,2,246,7,246,
        2,247,7,247,2,248,7,248,1,0,1,0,1,0,1,1,1,1,3,1,504,8,1,1,2,1,2,
        3,2,508,8,2,1,3,1,3,3,3,512,8,3,1,4,1,4,1,5,1,5,1,6,1,6,1,7,1,7,
        1,8,5,8,523,8,8,10,8,12,8,526,9,8,1,8,1,8,3,8,530,8,8,1,9,1,9,3,
        9,534,8,9,1,10,1,10,1,11,1,11,1,12,1,12,1,12,3,12,543,8,12,1,13,
        1,13,5,13,547,8,13,10,13,12,13,550,9,13,1,13,1,13,3,13,554,8,13,
        1,13,3,13,557,8,13,1,14,1,14,1,14,3,14,562,8,14,1,14,5,14,565,8,
        14,10,14,12,14,568,9,14,1,14,1,14,3,14,572,8,14,1,14,3,14,575,8,
        14,1,15,5,15,578,8,15,10,15,12,15,581,9,15,1,15,1,15,3,15,585,8,
        15,1,15,1,15,1,15,5,15,590,8,15,10,15,12,15,593,9,15,1,15,1,15,3,
        15,597,8,15,1,15,1,15,1,15,5,15,602,8,15,10,15,12,15,605,9,15,1,
        15,1,15,3,15,609,8,15,3,15,611,8,15,1,16,1,16,1,17,5,17,616,8,17,
        10,17,12,17,619,9,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,18,
        1,18,1,18,3,18,632,8,18,1,19,5,19,635,8,19,10,19,12,19,638,9,19,
        1,19,1,19,1,19,5,19,643,8,19,10,19,12,19,646,9,19,1,19,1,19,5,19,
        650,8,19,10,19,12,19,653,9,19,1,20,5,20,656,8,20,10,20,12,20,659,
        9,20,1,20,1,20,3,20,663,8,20,1,21,1,21,1,22,1,22,1,22,1,22,5,22,
        671,8,22,10,22,12,22,674,9,22,3,22,676,8,22,1,23,1,23,1,23,1,24,
        1,24,1,24,1,24,1,25,1,25,1,25,5,25,688,8,25,10,25,12,25,691,9,25,
        1,26,1,26,3,26,695,8,26,1,27,5,27,698,8,27,10,27,12,27,701,9,27,
        1,27,1,27,3,27,705,8,27,1,28,1,28,1,28,1,28,3,28,711,8,28,1,29,1,
        29,1,29,3,29,716,8,29,1,30,1,30,1,30,3,30,721,8,30,1,31,1,31,1,31,
        3,31,726,8,31,1,32,1,32,1,32,3,32,731,8,32,1,33,1,33,1,33,3,33,736,
        8,33,1,33,1,33,1,34,1,34,1,35,1,35,1,35,3,35,745,8,35,1,36,1,36,
        3,36,749,8,36,1,37,3,37,752,8,37,1,37,5,37,755,8,37,10,37,12,37,
        758,9,37,1,37,5,37,761,8,37,10,37,12,37,764,9,37,1,38,5,38,767,8,
        38,10,38,12,38,770,9,38,1,38,1,38,1,39,5,39,775,8,39,10,39,12,39,
        778,9,39,1,39,1,39,1,39,1,39,5,39,784,8,39,10,39,12,39,787,9,39,
        1,39,1,39,1,40,1,40,1,41,1,41,1,41,1,41,3,41,797,8,41,1,42,1,42,
        1,42,1,42,1,43,1,43,1,43,1,43,1,43,1,43,1,44,1,44,1,44,1,44,1,44,
        1,44,1,44,1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,46,1,46,1,46,3,46,
        826,8,46,1,47,5,47,829,8,47,10,47,12,47,832,9,47,1,47,3,47,835,8,
        47,1,47,1,47,1,47,1,47,5,47,841,8,47,10,47,12,47,844,9,47,1,47,1,
        47,5,47,848,8,47,10,47,12,47,851,9,47,1,47,1,47,1,48,1,48,5,48,857,
        8,48,10,48,12,48,860,9,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,
        1,48,5,48,871,8,48,10,48,12,48,874,9,48,3,48,876,8,48,1,48,1,48,
        1,48,1,48,1,48,1,48,1,48,1,48,5,48,886,8,48,10,48,12,48,889,9,48,
        3,48,891,8,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,
        1,48,1,48,5,48,905,8,48,10,48,12,48,908,9,48,1,48,1,48,3,48,912,
        8,48,1,49,1,49,1,50,1,50,1,50,3,50,919,8,50,1,51,5,51,922,8,51,10,
        51,12,51,925,9,51,1,51,1,51,1,51,3,51,930,8,51,1,51,3,51,933,8,51,
        1,51,3,51,936,8,51,1,51,3,51,939,8,51,1,51,1,51,1,52,1,52,1,52,1,
        52,1,52,1,52,1,52,1,52,1,52,1,52,3,52,953,8,52,1,53,1,53,1,53,1,
        53,1,54,1,54,1,54,5,54,962,8,54,10,54,12,54,965,9,54,1,55,1,55,1,
        55,1,56,1,56,1,56,1,57,1,57,1,57,5,57,976,8,57,10,57,12,57,979,9,
        57,1,58,1,58,1,58,1,58,5,58,985,8,58,10,58,12,58,988,9,58,1,59,1,
        59,5,59,992,8,59,10,59,12,59,995,9,59,1,59,1,59,1,60,1,60,1,60,1,
        60,3,60,1003,8,60,1,61,1,61,1,61,1,61,1,61,3,61,1010,8,61,1,62,5,
        62,1013,8,62,10,62,12,62,1016,9,62,1,62,1,62,1,62,1,62,1,63,1,63,
        1,63,1,63,1,63,1,63,1,63,1,63,3,63,1030,8,63,1,64,1,64,1,64,5,64,
        1035,8,64,10,64,12,64,1038,9,64,1,65,1,65,1,65,3,65,1043,8,65,1,
        66,1,66,3,66,1047,8,66,1,67,1,67,3,67,1051,8,67,1,68,1,68,3,68,1055,
        8,68,1,69,1,69,3,69,1059,8,69,1,70,1,70,1,70,3,70,1064,8,70,1,71,
        1,71,1,71,5,71,1069,8,71,10,71,12,71,1072,9,71,3,71,1074,8,71,1,
        71,1,71,3,71,1078,8,71,1,71,3,71,1081,8,71,1,72,1,72,5,72,1085,8,
        72,10,72,12,72,1088,9,72,1,72,1,72,3,72,1092,8,72,1,72,3,72,1095,
        8,72,1,73,1,73,3,73,1099,8,73,1,73,1,73,3,73,1103,8,73,1,73,1,73,
        5,73,1107,8,73,10,73,12,73,1110,9,73,1,73,1,73,3,73,1114,8,73,3,
        73,1116,8,73,1,74,1,74,1,75,1,75,1,76,1,76,1,76,3,76,1125,8,76,1,
        76,1,76,1,77,5,77,1130,8,77,10,77,12,77,1133,9,77,1,77,1,77,1,77,
        1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,3,78,1148,8,78,
        1,79,1,79,5,79,1152,8,79,10,79,12,79,1155,9,79,3,79,1157,8,79,1,
        79,1,79,1,79,3,79,1162,8,79,1,80,1,80,3,80,1166,8,80,1,81,1,81,1,
        81,1,81,1,81,3,81,1173,8,81,1,81,3,81,1176,8,81,1,81,1,81,3,81,1180,
        8,81,1,82,5,82,1183,8,82,10,82,12,82,1186,9,82,1,82,1,82,1,82,1,
        82,3,82,1192,8,82,1,82,1,82,1,83,1,83,1,83,5,83,1199,8,83,10,83,
        12,83,1202,9,83,1,84,5,84,1205,8,84,10,84,12,84,1208,9,84,1,84,1,
        84,1,84,1,84,3,84,1214,8,84,1,85,5,85,1217,8,85,10,85,12,85,1220,
        9,85,1,85,1,85,5,85,1224,8,85,10,85,12,85,1227,9,85,1,85,1,85,1,
        85,1,86,1,86,3,86,1234,8,86,1,87,1,87,1,87,1,88,1,88,1,88,5,88,1242,
        8,88,10,88,12,88,1245,9,88,1,89,1,89,3,89,1249,8,89,1,90,1,90,3,
        90,1253,8,90,1,91,1,91,1,92,1,92,1,92,1,93,5,93,1261,8,93,10,93,
        12,93,1264,9,93,1,93,1,93,3,93,1268,8,93,1,93,1,93,1,94,1,94,1,94,
        1,94,3,94,1276,8,94,1,95,3,95,1279,8,95,1,95,1,95,1,95,1,95,1,95,
        3,95,1286,8,95,1,95,3,95,1289,8,95,1,95,1,95,1,96,1,96,1,97,1,97,
        3,97,1297,8,97,1,97,3,97,1300,8,97,1,97,1,97,1,98,3,98,1305,8,98,
        1,98,1,98,1,98,3,98,1310,8,98,1,98,1,98,1,98,1,98,3,98,1316,8,98,
        1,98,1,98,3,98,1320,8,98,1,98,1,98,1,98,3,98,1325,8,98,1,98,1,98,
        1,98,3,98,1330,8,98,1,99,5,99,1333,8,99,10,99,12,99,1336,9,99,1,
        99,1,99,1,99,3,99,1341,8,99,1,99,1,99,1,100,1,100,3,100,1347,8,100,
        1,100,3,100,1350,8,100,1,100,3,100,1353,8,100,1,100,1,100,1,101,
        1,101,1,101,5,101,1360,8,101,10,101,12,101,1363,9,101,1,102,5,102,
        1366,8,102,10,102,12,102,1369,9,102,1,102,1,102,1,102,3,102,1374,
        8,102,1,102,3,102,1377,8,102,1,102,3,102,1380,8,102,1,103,1,103,
        1,104,1,104,5,104,1386,8,104,10,104,12,104,1389,9,104,1,105,5,105,
        1392,8,105,10,105,12,105,1395,9,105,1,105,1,105,1,105,3,105,1400,
        8,105,1,105,1,105,3,105,1404,8,105,1,105,1,105,1,106,1,106,3,106,
        1410,8,106,1,106,1,106,1,107,1,107,1,107,5,107,1417,8,107,10,107,
        12,107,1420,9,107,1,108,5,108,1423,8,108,10,108,12,108,1426,9,108,
        1,108,1,108,1,108,1,108,3,108,1432,8,108,1,109,5,109,1435,8,109,
        10,109,12,109,1438,9,109,1,109,1,109,5,109,1442,8,109,10,109,12,
        109,1445,9,109,1,109,1,109,1,109,1,110,1,110,1,111,1,111,5,111,1454,
        8,111,10,111,12,111,1457,9,111,1,111,1,111,1,112,1,112,3,112,1463,
        8,112,1,113,5,113,1466,8,113,10,113,12,113,1469,9,113,1,113,1,113,
        1,113,1,114,1,114,3,114,1476,8,114,1,115,5,115,1479,8,115,10,115,
        12,115,1482,9,115,1,115,1,115,1,115,3,115,1487,8,115,1,115,3,115,
        1490,8,115,1,115,3,115,1493,8,115,1,115,1,115,1,116,1,116,1,116,
        1,116,1,116,1,116,1,116,1,116,1,116,3,116,1506,8,116,1,117,1,117,
        1,117,1,118,1,118,1,118,1,118,5,118,1515,8,118,10,118,12,118,1518,
        9,118,1,119,1,119,5,119,1522,8,119,10,119,12,119,1525,9,119,1,119,
        1,119,1,120,1,120,1,120,1,120,1,120,3,120,1534,8,120,1,121,5,121,
        1537,8,121,10,121,12,121,1540,9,121,1,121,1,121,1,121,1,121,1,122,
        1,122,1,122,1,122,3,122,1550,8,122,1,123,5,123,1553,8,123,10,123,
        12,123,1556,9,123,1,123,1,123,1,123,1,124,1,124,1,124,1,124,1,124,
        1,124,1,124,3,124,1568,8,124,1,125,5,125,1571,8,125,10,125,12,125,
        1574,9,125,1,125,1,125,1,125,1,125,1,125,1,126,1,126,5,126,1583,
        8,126,10,126,12,126,1586,9,126,1,126,1,126,1,127,1,127,1,127,1,127,
        1,127,3,127,1595,8,127,1,128,5,128,1598,8,128,10,128,12,128,1601,
        9,128,1,128,1,128,1,128,1,128,1,128,3,128,1608,8,128,1,128,3,128,
        1611,8,128,1,128,1,128,1,129,1,129,1,129,3,129,1618,8,129,1,130,
        1,130,1,130,1,131,1,131,1,131,3,131,1626,8,131,1,132,1,132,1,132,
        1,132,3,132,1632,8,132,1,132,1,132,1,133,1,133,1,133,5,133,1639,
        8,133,10,133,12,133,1642,9,133,1,134,1,134,1,134,1,134,1,135,1,135,
        1,135,3,135,1651,8,135,1,136,1,136,3,136,1655,8,136,1,136,3,136,
        1658,8,136,1,136,1,136,1,137,1,137,1,137,5,137,1665,8,137,10,137,
        12,137,1668,9,137,1,138,1,138,1,138,1,139,1,139,1,139,1,139,1,139,
        1,139,1,140,1,140,3,140,1681,8,140,1,140,3,140,1684,8,140,1,140,
        1,140,1,141,1,141,1,141,5,141,1691,8,141,10,141,12,141,1694,9,141,
        1,142,1,142,3,142,1698,8,142,1,142,1,142,1,143,1,143,5,143,1704,
        8,143,10,143,12,143,1707,9,143,1,144,1,144,1,144,3,144,1712,8,144,
        1,145,1,145,3,145,1716,8,145,1,146,5,146,1719,8,146,10,146,12,146,
        1722,9,146,1,146,1,146,1,146,1,147,1,147,3,147,1729,8,147,1,148,
        1,148,1,148,1,149,1,149,1,149,1,149,1,149,1,149,3,149,1740,8,149,
        1,150,1,150,1,150,1,150,1,150,3,150,1747,8,150,1,151,1,151,1,151,
        1,151,1,151,1,151,1,151,1,151,1,151,1,151,1,151,1,151,1,151,3,151,
        1762,8,151,1,152,1,152,1,153,1,153,1,153,1,153,1,154,1,154,1,154,
        1,154,1,155,1,155,1,155,1,156,1,156,1,156,1,156,1,156,1,156,1,156,
        3,156,1784,8,156,1,157,1,157,1,157,1,157,1,157,1,157,1,158,1,158,
        1,158,1,158,1,158,1,158,1,158,1,158,1,159,1,159,1,159,1,159,1,159,
        1,159,1,159,1,159,1,160,1,160,1,160,1,160,3,160,1812,8,160,1,160,
        1,160,1,161,1,161,1,161,1,161,1,161,1,161,1,162,1,162,1,162,5,162,
        1825,8,162,10,162,12,162,1828,9,162,1,162,1,162,1,162,1,162,5,162,
        1834,8,162,10,162,12,162,1837,9,162,1,162,1,162,1,162,5,162,1842,
        8,162,10,162,12,162,1845,9,162,1,162,3,162,1848,8,162,1,163,1,163,
        1,163,1,163,1,163,1,163,1,163,3,163,1857,8,163,1,164,1,164,1,164,
        1,164,1,164,5,164,1864,8,164,10,164,12,164,1867,9,164,1,164,1,164,
        1,165,1,165,1,165,1,165,5,165,1875,8,165,10,165,12,165,1878,9,165,
        1,165,3,165,1881,8,165,1,166,1,166,1,167,1,167,1,167,1,167,1,167,
        1,167,1,168,1,168,1,168,1,168,1,168,1,168,1,169,1,169,1,169,1,169,
        1,169,1,169,1,169,1,169,1,170,1,170,3,170,1907,8,170,1,171,1,171,
        3,171,1911,8,171,1,172,1,172,1,172,3,172,1916,8,172,1,172,1,172,
        3,172,1920,8,172,1,172,1,172,3,172,1924,8,172,1,172,1,172,1,172,
        1,173,1,173,1,173,3,173,1932,8,173,1,173,1,173,3,173,1936,8,173,
        1,173,1,173,3,173,1940,8,173,1,173,1,173,1,173,1,174,1,174,3,174,
        1947,8,174,1,175,1,175,1,176,1,176,1,176,5,176,1954,8,176,10,176,
        12,176,1957,9,176,1,177,1,177,1,177,1,177,1,177,1,177,1,177,1,177,
        1,178,1,178,1,178,1,178,1,178,1,178,1,178,1,178,1,179,1,179,3,179,
        1977,8,179,1,179,1,179,1,180,1,180,3,180,1983,8,180,1,180,1,180,
        1,181,1,181,3,181,1989,8,181,1,181,1,181,1,182,1,182,1,182,1,182,
        1,183,1,183,1,183,1,183,1,183,1,183,1,184,1,184,1,184,1,184,1,184,
        1,184,1,184,1,184,1,184,1,184,1,184,3,184,2014,8,184,1,184,1,184,
        1,184,3,184,2019,8,184,1,185,1,185,5,185,2023,8,185,10,185,12,185,
        2026,9,185,1,186,1,186,1,186,1,186,1,186,1,186,1,187,5,187,2035,
        8,187,10,187,12,187,2038,9,187,1,187,1,187,1,187,1,188,1,188,1,188,
        5,188,2046,8,188,10,188,12,188,2049,9,188,1,189,1,189,1,189,1,190,
        1,190,1,190,1,190,3,190,2058,8,190,1,190,3,190,2061,8,190,1,191,
        1,191,1,191,3,191,2066,8,191,1,191,1,191,1,192,1,192,1,192,5,192,
        2073,8,192,10,192,12,192,2076,9,192,1,193,1,193,3,193,2080,8,193,
        1,194,1,194,3,194,2084,8,194,1,195,1,195,1,195,1,195,1,196,1,196,
        1,197,1,197,1,198,1,198,3,198,2096,8,198,1,199,1,199,3,199,2100,
        8,199,1,200,1,200,3,200,2104,8,200,1,200,1,200,3,200,2108,8,200,
        1,200,1,200,3,200,2112,8,200,1,200,1,200,1,200,1,200,3,200,2118,
        8,200,1,200,1,200,1,200,1,200,3,200,2124,8,200,1,200,1,200,3,200,
        2128,8,200,1,200,1,200,1,200,1,200,3,200,2134,8,200,1,200,1,200,
        1,200,1,200,3,200,2140,8,200,1,200,1,200,1,200,1,200,3,200,2146,
        8,200,1,200,1,200,1,200,1,200,3,200,2152,8,200,1,200,1,200,1,200,
        1,200,1,200,1,200,3,200,2160,8,200,1,200,1,200,1,200,1,200,1,200,
        3,200,2167,8,200,1,200,1,200,1,200,1,200,1,200,3,200,2174,8,200,
        1,200,1,200,1,200,3,200,2179,8,200,1,200,1,200,3,200,2183,8,200,
        1,200,1,200,1,200,3,200,2188,8,200,1,200,1,200,1,200,3,200,2193,
        8,200,1,200,1,200,3,200,2197,8,200,1,200,1,200,1,200,3,200,2202,
        8,200,1,200,1,200,1,200,3,200,2207,8,200,1,200,1,200,3,200,2211,
        8,200,1,200,1,200,1,200,3,200,2216,8,200,1,200,1,200,1,200,3,200,
        2221,8,200,1,200,1,200,3,200,2225,8,200,1,200,1,200,1,200,3,200,
        2230,8,200,1,200,1,200,1,200,3,200,2235,8,200,1,200,1,200,3,200,
        2239,8,200,1,200,1,200,1,200,1,200,1,200,3,200,2246,8,200,1,200,
        1,200,1,200,3,200,2251,8,200,1,200,1,200,3,200,2255,8,200,1,200,
        1,200,1,200,3,200,2260,8,200,1,200,1,200,3,200,2264,8,200,1,200,
        1,200,1,200,3,200,2269,8,200,1,200,1,200,3,200,2273,8,200,1,200,
        1,200,1,200,3,200,2278,8,200,1,200,1,200,3,200,2282,8,200,1,200,
        1,200,1,200,3,200,2287,8,200,1,200,1,200,3,200,2291,8,200,1,200,
        1,200,1,200,1,200,1,200,3,200,2298,8,200,1,200,1,200,3,200,2302,
        8,200,1,200,1,200,1,200,3,200,2307,8,200,1,200,1,200,3,200,2311,
        8,200,1,200,1,200,1,200,1,200,3,200,2317,8,200,3,200,2319,8,200,
        1,201,1,201,1,201,3,201,2324,8,201,1,201,1,201,1,201,3,201,2329,
        8,201,1,201,1,201,1,201,1,201,3,201,2335,8,201,1,201,1,201,3,201,
        2339,8,201,1,201,1,201,1,201,3,201,2344,8,201,1,201,1,201,3,201,
        2348,8,201,1,201,1,201,3,201,2352,8,201,1,201,1,201,3,201,2356,8,
        201,3,201,2358,8,201,1,202,1,202,1,202,5,202,2363,8,202,10,202,12,
        202,2366,9,202,1,202,1,202,1,202,1,202,1,202,1,202,5,202,2374,8,
        202,10,202,12,202,2377,9,202,1,202,1,202,1,202,1,202,1,202,1,202,
        5,202,2385,8,202,10,202,12,202,2388,9,202,1,202,1,202,1,202,1,202,
        1,202,3,202,2395,8,202,1,203,1,203,1,203,1,203,1,203,1,203,1,203,
        1,203,1,203,3,203,2406,8,203,1,204,1,204,3,204,2410,8,204,1,204,
        1,204,1,204,3,204,2415,8,204,1,204,1,204,3,204,2419,8,204,1,205,
        5,205,2422,8,205,10,205,12,205,2425,9,205,1,205,1,205,1,205,5,205,
        2430,8,205,10,205,12,205,2433,9,205,1,205,5,205,2436,8,205,10,205,
        12,205,2439,9,205,1,205,3,205,2442,8,205,1,206,1,206,3,206,2446,
        8,206,1,207,1,207,3,207,2450,8,207,1,208,1,208,1,208,1,208,3,208,
        2456,8,208,1,208,1,208,1,208,1,208,3,208,2462,8,208,3,208,2464,8,
        208,1,209,1,209,1,209,1,209,1,209,1,209,1,209,1,209,1,209,1,209,
        3,209,2476,8,209,1,210,1,210,5,210,2480,8,210,10,210,12,210,2483,
        9,210,1,211,5,211,2486,8,211,10,211,12,211,2489,9,211,1,211,1,211,
        1,211,1,211,1,212,1,212,1,212,1,212,1,212,1,212,1,212,1,212,1,212,
        1,212,1,212,1,212,1,212,1,212,1,212,3,212,2510,8,212,1,213,1,213,
        1,213,1,213,1,213,1,213,1,213,1,213,1,213,1,213,1,213,1,213,1,213,
        3,213,2525,8,213,1,214,1,214,1,214,3,214,2530,8,214,1,214,1,214,
        1,214,1,214,1,214,3,214,2537,8,214,1,214,1,214,1,214,3,214,2542,
        8,214,1,214,1,214,1,214,1,214,1,214,3,214,2549,8,214,1,214,1,214,
        1,214,3,214,2554,8,214,1,214,1,214,1,214,1,214,1,214,3,214,2561,
        8,214,1,214,1,214,1,214,3,214,2566,8,214,1,214,1,214,1,214,1,214,
        1,214,3,214,2573,8,214,1,214,1,214,1,214,3,214,2578,8,214,1,214,
        1,214,1,214,1,214,1,214,1,214,1,214,3,214,2587,8,214,1,214,1,214,
        1,214,3,214,2592,8,214,1,214,1,214,3,214,2596,8,214,1,215,1,215,
        1,215,5,215,2601,8,215,10,215,12,215,2604,9,215,1,216,1,216,1,216,
        3,216,2609,8,216,1,216,1,216,1,216,1,216,1,216,3,216,2616,8,216,
        1,216,1,216,1,216,1,216,1,216,3,216,2623,8,216,1,216,1,216,1,216,
        1,216,1,216,3,216,2630,8,216,1,216,1,216,1,216,1,216,1,216,1,216,
        3,216,2638,8,216,1,216,1,216,1,216,1,216,1,216,3,216,2645,8,216,
        1,216,1,216,1,216,1,216,1,216,1,216,3,216,2653,8,216,1,217,1,217,
        3,217,2657,8,217,1,217,1,217,3,217,2661,8,217,3,217,2663,8,217,1,
        218,1,218,3,218,2667,8,218,1,218,1,218,3,218,2671,8,218,3,218,2673,
        8,218,1,219,1,219,1,219,1,220,1,220,1,220,1,221,1,221,1,221,1,221,
        1,221,1,221,1,221,3,221,2688,8,221,1,222,1,222,1,222,1,223,1,223,
        1,223,1,224,1,224,1,224,1,224,1,224,1,224,1,224,3,224,2703,8,224,
        1,225,1,225,1,225,1,225,1,225,1,225,1,225,1,225,5,225,2713,8,225,
        10,225,12,225,2716,9,225,1,225,1,225,1,225,1,225,1,225,1,225,5,225,
        2724,8,225,10,225,12,225,2727,9,225,1,225,1,225,1,225,3,225,2732,
        8,225,1,226,1,226,1,226,1,226,1,226,1,226,1,226,1,226,1,226,1,226,
        1,226,1,226,5,226,2746,8,226,10,226,12,226,2749,9,226,1,227,1,227,
        1,227,1,227,1,227,1,227,1,227,1,227,1,227,5,227,2760,8,227,10,227,
        12,227,2763,9,227,1,228,1,228,1,228,1,228,1,228,1,228,1,228,1,228,
        1,228,1,228,1,228,1,228,1,228,1,228,1,228,1,228,5,228,2781,8,228,
        10,228,12,228,2784,9,228,1,229,1,229,1,229,1,229,1,229,1,229,1,229,
        1,229,1,229,1,229,1,229,1,229,1,229,1,229,1,229,1,229,1,229,1,229,
        1,229,3,229,2805,8,229,5,229,2807,8,229,10,229,12,229,2810,9,229,
        1,230,1,230,1,230,1,230,1,230,1,230,1,230,1,230,1,230,5,230,2821,
        8,230,10,230,12,230,2824,9,230,1,231,1,231,1,231,1,231,1,231,1,231,
        5,231,2832,8,231,10,231,12,231,2835,9,231,1,232,1,232,1,232,1,232,
        1,232,1,232,5,232,2843,8,232,10,232,12,232,2846,9,232,1,233,1,233,
        1,233,1,233,1,233,1,233,5,233,2854,8,233,10,233,12,233,2857,9,233,
        1,234,1,234,1,234,1,234,1,234,1,234,5,234,2865,8,234,10,234,12,234,
        2868,9,234,1,235,1,235,1,235,1,235,1,235,1,235,5,235,2876,8,235,
        10,235,12,235,2879,9,235,1,236,1,236,1,236,1,236,1,236,1,236,1,236,
        1,236,1,236,1,236,1,236,1,236,1,236,3,236,2894,8,236,1,237,1,237,
        3,237,2898,8,237,1,238,1,238,1,238,1,238,1,239,1,239,1,239,3,239,
        2907,8,239,1,240,1,240,1,241,1,241,1,241,1,241,1,242,1,242,3,242,
        2917,8,242,1,242,1,242,3,242,2921,8,242,1,243,1,243,1,243,5,243,
        2926,8,243,10,243,12,243,2929,9,243,1,243,1,243,1,243,5,243,2934,
        8,243,10,243,12,243,2937,9,243,3,243,2939,8,243,1,244,5,244,2942,
        8,244,10,244,12,244,2945,9,244,1,244,1,244,1,244,1,244,3,244,2951,
        8,244,1,245,1,245,3,245,2955,8,245,1,246,1,246,3,246,2959,8,246,
        1,247,1,247,1,247,1,247,1,247,1,247,1,248,1,248,1,248,0,10,452,454,
        456,458,460,462,464,466,468,470,249,0,2,4,6,8,10,12,14,16,18,20,
        22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,
        66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,
        108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,
        140,142,144,146,148,150,152,154,156,158,160,162,164,166,168,170,
        172,174,176,178,180,182,184,186,188,190,192,194,196,198,200,202,
        204,206,208,210,212,214,216,218,220,222,224,226,228,230,232,234,
        236,238,240,242,244,246,248,250,252,254,256,258,260,262,264,266,
        268,270,272,274,276,278,280,282,284,286,288,290,292,294,296,298,
        300,302,304,306,308,310,312,314,316,318,320,322,324,326,328,330,
        332,334,336,338,340,342,344,346,348,350,352,354,356,358,360,362,
        364,366,368,370,372,374,376,378,380,382,384,386,388,390,392,394,
        396,398,400,402,404,406,408,410,412,414,416,418,420,422,424,426,
        428,430,432,434,436,438,440,442,444,446,448,450,452,454,456,458,
        460,462,464,466,468,470,472,474,476,478,480,482,484,486,488,490,
        492,494,496,0,9,2,0,1,3,5,17,6,0,1,3,5,6,8,8,10,10,12,14,16,16,2,
        0,1,3,5,16,1,0,69,75,5,0,22,22,25,25,44,44,46,46,54,54,2,0,31,31,
        37,37,2,0,13,13,55,55,2,0,57,57,60,60,2,0,88,88,112,122,3227,0,498,
        1,0,0,0,2,503,1,0,0,0,4,507,1,0,0,0,6,511,1,0,0,0,8,513,1,0,0,0,
        10,515,1,0,0,0,12,517,1,0,0,0,14,519,1,0,0,0,16,524,1,0,0,0,18,533,
        1,0,0,0,20,535,1,0,0,0,22,537,1,0,0,0,24,542,1,0,0,0,26,544,1,0,
        0,0,28,561,1,0,0,0,30,610,1,0,0,0,32,612,1,0,0,0,34,617,1,0,0,0,
        36,631,1,0,0,0,38,636,1,0,0,0,40,657,1,0,0,0,42,664,1,0,0,0,44,666,
        1,0,0,0,46,677,1,0,0,0,48,680,1,0,0,0,50,684,1,0,0,0,52,694,1,0,
        0,0,54,699,1,0,0,0,56,710,1,0,0,0,58,712,1,0,0,0,60,717,1,0,0,0,
        62,722,1,0,0,0,64,727,1,0,0,0,66,735,1,0,0,0,68,739,1,0,0,0,70,741,
        1,0,0,0,72,748,1,0,0,0,74,751,1,0,0,0,76,768,1,0,0,0,78,776,1,0,
        0,0,80,790,1,0,0,0,82,796,1,0,0,0,84,798,1,0,0,0,86,802,1,0,0,0,
        88,808,1,0,0,0,90,815,1,0,0,0,92,825,1,0,0,0,94,830,1,0,0,0,96,911,
        1,0,0,0,98,913,1,0,0,0,100,918,1,0,0,0,102,923,1,0,0,0,104,952,1,
        0,0,0,106,954,1,0,0,0,108,958,1,0,0,0,110,966,1,0,0,0,112,969,1,
        0,0,0,114,972,1,0,0,0,116,980,1,0,0,0,118,989,1,0,0,0,120,1002,1,
        0,0,0,122,1009,1,0,0,0,124,1014,1,0,0,0,126,1029,1,0,0,0,128,1031,
        1,0,0,0,130,1039,1,0,0,0,132,1044,1,0,0,0,134,1050,1,0,0,0,136,1054,
        1,0,0,0,138,1058,1,0,0,0,140,1063,1,0,0,0,142,1073,1,0,0,0,144,1082,
        1,0,0,0,146,1115,1,0,0,0,148,1117,1,0,0,0,150,1119,1,0,0,0,152,1124,
        1,0,0,0,154,1131,1,0,0,0,156,1147,1,0,0,0,158,1156,1,0,0,0,160,1165,
        1,0,0,0,162,1167,1,0,0,0,164,1184,1,0,0,0,166,1195,1,0,0,0,168,1213,
        1,0,0,0,170,1218,1,0,0,0,172,1233,1,0,0,0,174,1235,1,0,0,0,176,1238,
        1,0,0,0,178,1248,1,0,0,0,180,1252,1,0,0,0,182,1254,1,0,0,0,184,1256,
        1,0,0,0,186,1262,1,0,0,0,188,1275,1,0,0,0,190,1278,1,0,0,0,192,1292,
        1,0,0,0,194,1294,1,0,0,0,196,1329,1,0,0,0,198,1334,1,0,0,0,200,1344,
        1,0,0,0,202,1356,1,0,0,0,204,1367,1,0,0,0,206,1381,1,0,0,0,208,1383,
        1,0,0,0,210,1393,1,0,0,0,212,1407,1,0,0,0,214,1413,1,0,0,0,216,1431,
        1,0,0,0,218,1436,1,0,0,0,220,1449,1,0,0,0,222,1451,1,0,0,0,224,1462,
        1,0,0,0,226,1467,1,0,0,0,228,1475,1,0,0,0,230,1480,1,0,0,0,232,1505,
        1,0,0,0,234,1507,1,0,0,0,236,1510,1,0,0,0,238,1519,1,0,0,0,240,1533,
        1,0,0,0,242,1538,1,0,0,0,244,1549,1,0,0,0,246,1554,1,0,0,0,248,1567,
        1,0,0,0,250,1572,1,0,0,0,252,1580,1,0,0,0,254,1594,1,0,0,0,256,1599,
        1,0,0,0,258,1617,1,0,0,0,260,1619,1,0,0,0,262,1625,1,0,0,0,264,1627,
        1,0,0,0,266,1635,1,0,0,0,268,1643,1,0,0,0,270,1650,1,0,0,0,272,1652,
        1,0,0,0,274,1661,1,0,0,0,276,1669,1,0,0,0,278,1672,1,0,0,0,280,1678,
        1,0,0,0,282,1687,1,0,0,0,284,1695,1,0,0,0,286,1701,1,0,0,0,288,1711,
        1,0,0,0,290,1715,1,0,0,0,292,1720,1,0,0,0,294,1728,1,0,0,0,296,1730,
        1,0,0,0,298,1739,1,0,0,0,300,1746,1,0,0,0,302,1761,1,0,0,0,304,1763,
        1,0,0,0,306,1765,1,0,0,0,308,1769,1,0,0,0,310,1773,1,0,0,0,312,1783,
        1,0,0,0,314,1785,1,0,0,0,316,1791,1,0,0,0,318,1799,1,0,0,0,320,1807,
        1,0,0,0,322,1815,1,0,0,0,324,1847,1,0,0,0,326,1849,1,0,0,0,328,1858,
        1,0,0,0,330,1880,1,0,0,0,332,1882,1,0,0,0,334,1884,1,0,0,0,336,1890,
        1,0,0,0,338,1896,1,0,0,0,340,1906,1,0,0,0,342,1910,1,0,0,0,344,1912,
        1,0,0,0,346,1928,1,0,0,0,348,1946,1,0,0,0,350,1948,1,0,0,0,352,1950,
        1,0,0,0,354,1958,1,0,0,0,356,1966,1,0,0,0,358,1974,1,0,0,0,360,1980,
        1,0,0,0,362,1986,1,0,0,0,364,1992,1,0,0,0,366,1996,1,0,0,0,368,2018,
        1,0,0,0,370,2020,1,0,0,0,372,2027,1,0,0,0,374,2036,1,0,0,0,376,2042,
        1,0,0,0,378,2050,1,0,0,0,380,2053,1,0,0,0,382,2062,1,0,0,0,384,2069,
        1,0,0,0,386,2079,1,0,0,0,388,2083,1,0,0,0,390,2085,1,0,0,0,392,2089,
        1,0,0,0,394,2091,1,0,0,0,396,2095,1,0,0,0,398,2099,1,0,0,0,400,2318,
        1,0,0,0,402,2357,1,0,0,0,404,2394,1,0,0,0,406,2405,1,0,0,0,408,2407,
        1,0,0,0,410,2423,1,0,0,0,412,2445,1,0,0,0,414,2449,1,0,0,0,416,2463,
        1,0,0,0,418,2475,1,0,0,0,420,2477,1,0,0,0,422,2487,1,0,0,0,424,2509,
        1,0,0,0,426,2524,1,0,0,0,428,2595,1,0,0,0,430,2597,1,0,0,0,432,2652,
        1,0,0,0,434,2662,1,0,0,0,436,2672,1,0,0,0,438,2674,1,0,0,0,440,2677,
        1,0,0,0,442,2687,1,0,0,0,444,2689,1,0,0,0,446,2692,1,0,0,0,448,2702,
        1,0,0,0,450,2731,1,0,0,0,452,2733,1,0,0,0,454,2750,1,0,0,0,456,2764,
        1,0,0,0,458,2785,1,0,0,0,460,2811,1,0,0,0,462,2825,1,0,0,0,464,2836,
        1,0,0,0,466,2847,1,0,0,0,468,2858,1,0,0,0,470,2869,1,0,0,0,472,2893,
        1,0,0,0,474,2897,1,0,0,0,476,2899,1,0,0,0,478,2906,1,0,0,0,480,2908,
        1,0,0,0,482,2910,1,0,0,0,484,2920,1,0,0,0,486,2938,1,0,0,0,488,2950,
        1,0,0,0,490,2954,1,0,0,0,492,2958,1,0,0,0,494,2960,1,0,0,0,496,2966,
        1,0,0,0,498,499,3,72,36,0,499,500,5,0,0,1,500,1,1,0,0,0,501,504,
        5,123,0,0,502,504,3,8,4,0,503,501,1,0,0,0,503,502,1,0,0,0,504,3,
        1,0,0,0,505,508,5,123,0,0,506,508,3,10,5,0,507,505,1,0,0,0,507,506,
        1,0,0,0,508,5,1,0,0,0,509,512,5,123,0,0,510,512,3,12,6,0,511,509,
        1,0,0,0,511,510,1,0,0,0,512,7,1,0,0,0,513,514,7,0,0,0,514,9,1,0,
        0,0,515,516,7,1,0,0,516,11,1,0,0,0,517,518,7,2,0,0,518,13,1,0,0,
        0,519,520,7,3,0,0,520,15,1,0,0,0,521,523,3,262,131,0,522,521,1,0,
        0,0,523,526,1,0,0,0,524,522,1,0,0,0,524,525,1,0,0,0,525,529,1,0,
        0,0,526,524,1,0,0,0,527,530,3,18,9,0,528,530,5,20,0,0,529,527,1,
        0,0,0,529,528,1,0,0,0,530,17,1,0,0,0,531,534,3,20,10,0,532,534,3,
        22,11,0,533,531,1,0,0,0,533,532,1,0,0,0,534,19,1,0,0,0,535,536,7,
        4,0,0,536,21,1,0,0,0,537,538,7,5,0,0,538,23,1,0,0,0,539,543,3,28,
        14,0,540,543,3,34,17,0,541,543,3,36,18,0,542,539,1,0,0,0,542,540,
        1,0,0,0,542,541,1,0,0,0,543,25,1,0,0,0,544,548,5,84,0,0,545,547,
        3,262,131,0,546,545,1,0,0,0,547,550,1,0,0,0,548,546,1,0,0,0,548,
        549,1,0,0,0,549,551,1,0,0,0,550,548,1,0,0,0,551,553,3,4,2,0,552,
        554,3,48,24,0,553,552,1,0,0,0,553,554,1,0,0,0,554,556,1,0,0,0,555,
        557,3,26,13,0,556,555,1,0,0,0,556,557,1,0,0,0,557,27,1,0,0,0,558,
        559,3,60,30,0,559,560,5,84,0,0,560,562,1,0,0,0,561,558,1,0,0,0,561,
        562,1,0,0,0,562,566,1,0,0,0,563,565,3,262,131,0,564,563,1,0,0,0,
        565,568,1,0,0,0,566,564,1,0,0,0,566,567,1,0,0,0,567,569,1,0,0,0,
        568,566,1,0,0,0,569,571,3,4,2,0,570,572,3,48,24,0,571,570,1,0,0,
        0,571,572,1,0,0,0,572,574,1,0,0,0,573,575,3,26,13,0,574,573,1,0,
        0,0,574,575,1,0,0,0,575,29,1,0,0,0,576,578,3,262,131,0,577,576,1,
        0,0,0,578,581,1,0,0,0,579,577,1,0,0,0,579,580,1,0,0,0,580,582,1,
        0,0,0,581,579,1,0,0,0,582,584,3,4,2,0,583,585,3,48,24,0,584,583,
        1,0,0,0,584,585,1,0,0,0,585,611,1,0,0,0,586,587,3,60,30,0,587,591,
        5,84,0,0,588,590,3,262,131,0,589,588,1,0,0,0,590,593,1,0,0,0,591,
        589,1,0,0,0,591,592,1,0,0,0,592,594,1,0,0,0,593,591,1,0,0,0,594,
        596,3,4,2,0,595,597,3,48,24,0,596,595,1,0,0,0,596,597,1,0,0,0,597,
        611,1,0,0,0,598,599,3,28,14,0,599,603,5,84,0,0,600,602,3,262,131,
        0,601,600,1,0,0,0,602,605,1,0,0,0,603,601,1,0,0,0,603,604,1,0,0,
        0,604,606,1,0,0,0,605,603,1,0,0,0,606,608,3,4,2,0,607,609,3,48,24,
        0,608,607,1,0,0,0,608,609,1,0,0,0,609,611,1,0,0,0,610,579,1,0,0,
        0,610,586,1,0,0,0,610,598,1,0,0,0,611,31,1,0,0,0,612,613,3,30,15,
        0,613,33,1,0,0,0,614,616,3,262,131,0,615,614,1,0,0,0,616,619,1,0,
        0,0,617,615,1,0,0,0,617,618,1,0,0,0,618,620,1,0,0,0,619,617,1,0,
        0,0,620,621,3,4,2,0,621,35,1,0,0,0,622,623,3,16,8,0,623,624,3,38,
        19,0,624,632,1,0,0,0,625,626,3,30,15,0,626,627,3,38,19,0,627,632,
        1,0,0,0,628,629,3,34,17,0,629,630,3,38,19,0,630,632,1,0,0,0,631,
        622,1,0,0,0,631,625,1,0,0,0,631,628,1,0,0,0,632,37,1,0,0,0,633,635,
        3,262,131,0,634,633,1,0,0,0,635,638,1,0,0,0,636,634,1,0,0,0,636,
        637,1,0,0,0,637,639,1,0,0,0,638,636,1,0,0,0,639,640,5,80,0,0,640,
        651,5,81,0,0,641,643,3,262,131,0,642,641,1,0,0,0,643,646,1,0,0,0,
        644,642,1,0,0,0,644,645,1,0,0,0,645,647,1,0,0,0,646,644,1,0,0,0,
        647,648,5,80,0,0,648,650,5,81,0,0,649,644,1,0,0,0,650,653,1,0,0,
        0,651,649,1,0,0,0,651,652,1,0,0,0,652,39,1,0,0,0,653,651,1,0,0,0,
        654,656,3,42,21,0,655,654,1,0,0,0,656,659,1,0,0,0,657,655,1,0,0,
        0,657,658,1,0,0,0,658,660,1,0,0,0,659,657,1,0,0,0,660,662,3,4,2,
        0,661,663,3,44,22,0,662,661,1,0,0,0,662,663,1,0,0,0,663,41,1,0,0,
        0,664,665,3,262,131,0,665,43,1,0,0,0,666,675,5,34,0,0,667,676,3,
        34,17,0,668,672,3,28,14,0,669,671,3,46,23,0,670,669,1,0,0,0,671,
        674,1,0,0,0,672,670,1,0,0,0,672,673,1,0,0,0,673,676,1,0,0,0,674,
        672,1,0,0,0,675,667,1,0,0,0,675,668,1,0,0,0,676,45,1,0,0,0,677,678,
        5,108,0,0,678,679,3,32,16,0,679,47,1,0,0,0,680,681,5,90,0,0,681,
        682,3,50,25,0,682,683,5,89,0,0,683,49,1,0,0,0,684,689,3,52,26,0,
        685,686,5,83,0,0,686,688,3,52,26,0,687,685,1,0,0,0,688,691,1,0,0,
        0,689,687,1,0,0,0,689,690,1,0,0,0,690,51,1,0,0,0,691,689,1,0,0,0,
        692,695,3,24,12,0,693,695,3,54,27,0,694,692,1,0,0,0,694,693,1,0,
        0,0,695,53,1,0,0,0,696,698,3,262,131,0,697,696,1,0,0,0,698,701,1,
        0,0,0,699,697,1,0,0,0,699,700,1,0,0,0,700,702,1,0,0,0,701,699,1,
        0,0,0,702,704,5,93,0,0,703,705,3,56,28,0,704,703,1,0,0,0,704,705,
        1,0,0,0,705,55,1,0,0,0,706,707,5,34,0,0,707,711,3,24,12,0,708,709,
        5,57,0,0,709,711,3,24,12,0,710,706,1,0,0,0,710,708,1,0,0,0,711,57,
        1,0,0,0,712,715,3,2,1,0,713,714,5,84,0,0,714,716,3,58,29,0,715,713,
        1,0,0,0,715,716,1,0,0,0,716,59,1,0,0,0,717,720,3,2,1,0,718,719,5,
        84,0,0,719,721,3,60,30,0,720,718,1,0,0,0,720,721,1,0,0,0,721,61,
        1,0,0,0,722,725,3,60,30,0,723,724,5,84,0,0,724,726,3,4,2,0,725,723,
        1,0,0,0,725,726,1,0,0,0,726,63,1,0,0,0,727,730,3,2,1,0,728,729,5,
        84,0,0,729,731,3,64,32,0,730,728,1,0,0,0,730,731,1,0,0,0,731,65,
        1,0,0,0,732,733,3,70,35,0,733,734,5,84,0,0,734,736,1,0,0,0,735,732,
        1,0,0,0,735,736,1,0,0,0,736,737,1,0,0,0,737,738,3,2,1,0,738,67,1,
        0,0,0,739,740,3,6,3,0,740,69,1,0,0,0,741,744,3,2,1,0,742,743,5,84,
        0,0,743,745,3,70,35,0,744,742,1,0,0,0,744,745,1,0,0,0,745,71,1,0,
        0,0,746,749,3,74,37,0,747,749,3,76,38,0,748,746,1,0,0,0,748,747,
        1,0,0,0,749,73,1,0,0,0,750,752,3,78,39,0,751,750,1,0,0,0,751,752,
        1,0,0,0,752,756,1,0,0,0,753,755,3,82,41,0,754,753,1,0,0,0,755,758,
        1,0,0,0,756,754,1,0,0,0,756,757,1,0,0,0,757,762,1,0,0,0,758,756,
        1,0,0,0,759,761,3,92,46,0,760,759,1,0,0,0,761,764,1,0,0,0,762,760,
        1,0,0,0,762,763,1,0,0,0,763,75,1,0,0,0,764,762,1,0,0,0,765,767,3,
        82,41,0,766,765,1,0,0,0,767,770,1,0,0,0,768,766,1,0,0,0,768,769,
        1,0,0,0,769,771,1,0,0,0,770,768,1,0,0,0,771,772,3,94,47,0,772,77,
        1,0,0,0,773,775,3,80,40,0,774,773,1,0,0,0,775,778,1,0,0,0,776,774,
        1,0,0,0,776,777,1,0,0,0,777,779,1,0,0,0,778,776,1,0,0,0,779,780,
        5,49,0,0,780,785,3,2,1,0,781,782,5,84,0,0,782,784,3,2,1,0,783,781,
        1,0,0,0,784,787,1,0,0,0,785,783,1,0,0,0,785,786,1,0,0,0,786,788,
        1,0,0,0,787,785,1,0,0,0,788,789,5,82,0,0,789,79,1,0,0,0,790,791,
        3,262,131,0,791,81,1,0,0,0,792,797,3,84,42,0,793,797,3,86,43,0,794,
        797,3,88,44,0,795,797,3,90,45,0,796,792,1,0,0,0,796,793,1,0,0,0,
        796,794,1,0,0,0,796,795,1,0,0,0,797,83,1,0,0,0,798,799,5,42,0,0,
        799,800,3,62,31,0,800,801,5,82,0,0,801,85,1,0,0,0,802,803,5,42,0,
        0,803,804,3,64,32,0,804,805,5,84,0,0,805,806,5,106,0,0,806,807,5,
        82,0,0,807,87,1,0,0,0,808,809,5,42,0,0,809,810,5,55,0,0,810,811,
        3,62,31,0,811,812,5,84,0,0,812,813,3,2,1,0,813,814,5,82,0,0,814,
        89,1,0,0,0,815,816,5,42,0,0,816,817,5,55,0,0,817,818,3,62,31,0,818,
        819,5,84,0,0,819,820,5,106,0,0,820,821,5,82,0,0,821,91,1,0,0,0,822,
        826,3,100,50,0,823,826,3,228,114,0,824,826,5,82,0,0,825,822,1,0,
        0,0,825,823,1,0,0,0,825,824,1,0,0,0,826,93,1,0,0,0,827,829,3,262,
        131,0,828,827,1,0,0,0,829,832,1,0,0,0,830,828,1,0,0,0,830,831,1,
        0,0,0,831,834,1,0,0,0,832,830,1,0,0,0,833,835,5,5,0,0,834,833,1,
        0,0,0,834,835,1,0,0,0,835,836,1,0,0,0,836,837,5,2,0,0,837,842,3,
        2,1,0,838,839,5,84,0,0,839,841,3,2,1,0,840,838,1,0,0,0,841,844,1,
        0,0,0,842,840,1,0,0,0,842,843,1,0,0,0,843,845,1,0,0,0,844,842,1,
        0,0,0,845,849,5,78,0,0,846,848,3,96,48,0,847,846,1,0,0,0,848,851,
        1,0,0,0,849,847,1,0,0,0,849,850,1,0,0,0,850,852,1,0,0,0,851,849,
        1,0,0,0,852,853,5,79,0,0,853,95,1,0,0,0,854,858,5,10,0,0,855,857,
        3,98,49,0,856,855,1,0,0,0,857,860,1,0,0,0,858,856,1,0,0,0,858,859,
        1,0,0,0,859,861,1,0,0,0,860,858,1,0,0,0,861,862,3,58,29,0,862,863,
        5,82,0,0,863,912,1,0,0,0,864,865,5,1,0,0,865,875,3,60,30,0,866,867,
        5,12,0,0,867,872,3,58,29,0,868,869,5,83,0,0,869,871,3,58,29,0,870,
        868,1,0,0,0,871,874,1,0,0,0,872,870,1,0,0,0,872,873,1,0,0,0,873,
        876,1,0,0,0,874,872,1,0,0,0,875,866,1,0,0,0,875,876,1,0,0,0,876,
        877,1,0,0,0,877,878,5,82,0,0,878,912,1,0,0,0,879,880,5,6,0,0,880,
        890,3,60,30,0,881,882,5,12,0,0,882,887,3,58,29,0,883,884,5,83,0,
        0,884,886,3,58,29,0,885,883,1,0,0,0,886,889,1,0,0,0,887,885,1,0,
        0,0,887,888,1,0,0,0,888,891,1,0,0,0,889,887,1,0,0,0,890,881,1,0,
        0,0,890,891,1,0,0,0,891,892,1,0,0,0,892,893,5,82,0,0,893,912,1,0,
        0,0,894,895,5,14,0,0,895,896,3,62,31,0,896,897,5,82,0,0,897,912,
        1,0,0,0,898,899,5,8,0,0,899,900,3,62,31,0,900,901,5,16,0,0,901,906,
        3,62,31,0,902,903,5,83,0,0,903,905,3,62,31,0,904,902,1,0,0,0,905,
        908,1,0,0,0,906,904,1,0,0,0,906,907,1,0,0,0,907,909,1,0,0,0,908,
        906,1,0,0,0,909,910,5,82,0,0,910,912,1,0,0,0,911,854,1,0,0,0,911,
        864,1,0,0,0,911,879,1,0,0,0,911,894,1,0,0,0,911,898,1,0,0,0,912,
        97,1,0,0,0,913,914,7,6,0,0,914,99,1,0,0,0,915,919,3,102,51,0,916,
        919,3,198,99,0,917,919,3,210,105,0,918,915,1,0,0,0,918,916,1,0,0,
        0,918,917,1,0,0,0,919,101,1,0,0,0,920,922,3,104,52,0,921,920,1,0,
        0,0,922,925,1,0,0,0,923,921,1,0,0,0,923,924,1,0,0,0,924,926,1,0,
        0,0,925,923,1,0,0,0,926,927,5,26,0,0,927,929,3,4,2,0,928,930,3,106,
        53,0,929,928,1,0,0,0,929,930,1,0,0,0,930,932,1,0,0,0,931,933,3,110,
        55,0,932,931,1,0,0,0,932,933,1,0,0,0,933,935,1,0,0,0,934,936,3,112,
        56,0,935,934,1,0,0,0,935,936,1,0,0,0,936,938,1,0,0,0,937,939,3,116,
        58,0,938,937,1,0,0,0,938,939,1,0,0,0,939,940,1,0,0,0,940,941,3,118,
        59,0,941,103,1,0,0,0,942,953,3,262,131,0,943,953,5,52,0,0,944,953,
        5,51,0,0,945,953,5,50,0,0,946,953,5,18,0,0,947,953,5,55,0,0,948,
        953,5,35,0,0,949,953,5,11,0,0,950,953,5,3,0,0,951,953,5,56,0,0,952,
        942,1,0,0,0,952,943,1,0,0,0,952,944,1,0,0,0,952,945,1,0,0,0,952,
        946,1,0,0,0,952,947,1,0,0,0,952,948,1,0,0,0,952,949,1,0,0,0,952,
        950,1,0,0,0,952,951,1,0,0,0,953,105,1,0,0,0,954,955,5,90,0,0,955,
        956,3,108,54,0,956,957,5,89,0,0,957,107,1,0,0,0,958,963,3,40,20,
        0,959,960,5,83,0,0,960,962,3,40,20,0,961,959,1,0,0,0,962,965,1,0,
        0,0,963,961,1,0,0,0,963,964,1,0,0,0,964,109,1,0,0,0,965,963,1,0,
        0,0,966,967,5,34,0,0,967,968,3,30,15,0,968,111,1,0,0,0,969,970,5,
        41,0,0,970,971,3,114,57,0,971,113,1,0,0,0,972,977,3,32,16,0,973,
        974,5,83,0,0,974,976,3,32,16,0,975,973,1,0,0,0,976,979,1,0,0,0,977,
        975,1,0,0,0,977,978,1,0,0,0,978,115,1,0,0,0,979,977,1,0,0,0,980,
        981,5,7,0,0,981,986,3,62,31,0,982,983,5,83,0,0,983,985,3,62,31,0,
        984,982,1,0,0,0,985,988,1,0,0,0,986,984,1,0,0,0,986,987,1,0,0,0,
        987,117,1,0,0,0,988,986,1,0,0,0,989,993,5,78,0,0,990,992,3,120,60,
        0,991,990,1,0,0,0,992,995,1,0,0,0,993,991,1,0,0,0,993,994,1,0,0,
        0,994,996,1,0,0,0,995,993,1,0,0,0,996,997,5,79,0,0,997,119,1,0,0,
        0,998,1003,3,122,61,0,999,1003,3,182,91,0,1000,1003,3,184,92,0,1001,
        1003,3,186,93,0,1002,998,1,0,0,0,1002,999,1,0,0,0,1002,1000,1,0,
        0,0,1002,1001,1,0,0,0,1003,121,1,0,0,0,1004,1010,3,124,62,0,1005,
        1010,3,154,77,0,1006,1010,3,100,50,0,1007,1010,3,228,114,0,1008,
        1010,5,82,0,0,1009,1004,1,0,0,0,1009,1005,1,0,0,0,1009,1006,1,0,
        0,0,1009,1007,1,0,0,0,1009,1008,1,0,0,0,1010,123,1,0,0,0,1011,1013,
        3,126,63,0,1012,1011,1,0,0,0,1013,1016,1,0,0,0,1014,1012,1,0,0,0,
        1014,1015,1,0,0,0,1015,1017,1,0,0,0,1016,1014,1,0,0,0,1017,1018,
        3,136,68,0,1018,1019,3,128,64,0,1019,1020,5,82,0,0,1020,125,1,0,
        0,0,1021,1030,3,262,131,0,1022,1030,5,52,0,0,1023,1030,5,51,0,0,
        1024,1030,5,50,0,0,1025,1030,5,55,0,0,1026,1030,5,35,0,0,1027,1030,
        5,63,0,0,1028,1030,5,66,0,0,1029,1021,1,0,0,0,1029,1022,1,0,0,0,
        1029,1023,1,0,0,0,1029,1024,1,0,0,0,1029,1025,1,0,0,0,1029,1026,
        1,0,0,0,1029,1027,1,0,0,0,1029,1028,1,0,0,0,1030,127,1,0,0,0,1031,
        1036,3,130,65,0,1032,1033,5,83,0,0,1033,1035,3,130,65,0,1034,1032,
        1,0,0,0,1035,1038,1,0,0,0,1036,1034,1,0,0,0,1036,1037,1,0,0,0,1037,
        129,1,0,0,0,1038,1036,1,0,0,0,1039,1042,3,132,66,0,1040,1041,5,88,
        0,0,1041,1043,3,134,67,0,1042,1040,1,0,0,0,1042,1043,1,0,0,0,1043,
        131,1,0,0,0,1044,1046,3,2,1,0,1045,1047,3,38,19,0,1046,1045,1,0,
        0,0,1046,1047,1,0,0,0,1047,133,1,0,0,0,1048,1051,3,396,198,0,1049,
        1051,3,280,140,0,1050,1048,1,0,0,0,1050,1049,1,0,0,0,1051,135,1,
        0,0,0,1052,1055,3,138,69,0,1053,1055,3,140,70,0,1054,1052,1,0,0,
        0,1054,1053,1,0,0,0,1055,137,1,0,0,0,1056,1059,3,18,9,0,1057,1059,
        5,20,0,0,1058,1056,1,0,0,0,1058,1057,1,0,0,0,1059,139,1,0,0,0,1060,
        1064,3,142,71,0,1061,1064,3,150,75,0,1062,1064,3,152,76,0,1063,1060,
        1,0,0,0,1063,1061,1,0,0,0,1063,1062,1,0,0,0,1064,141,1,0,0,0,1065,
        1066,3,60,30,0,1066,1070,5,84,0,0,1067,1069,3,262,131,0,1068,1067,
        1,0,0,0,1069,1072,1,0,0,0,1070,1068,1,0,0,0,1070,1071,1,0,0,0,1071,
        1074,1,0,0,0,1072,1070,1,0,0,0,1073,1065,1,0,0,0,1073,1074,1,0,0,
        0,1074,1075,1,0,0,0,1075,1077,3,4,2,0,1076,1078,3,48,24,0,1077,1076,
        1,0,0,0,1077,1078,1,0,0,0,1078,1080,1,0,0,0,1079,1081,3,144,72,0,
        1080,1079,1,0,0,0,1080,1081,1,0,0,0,1081,143,1,0,0,0,1082,1086,5,
        84,0,0,1083,1085,3,262,131,0,1084,1083,1,0,0,0,1085,1088,1,0,0,0,
        1086,1084,1,0,0,0,1086,1087,1,0,0,0,1087,1089,1,0,0,0,1088,1086,
        1,0,0,0,1089,1091,3,4,2,0,1090,1092,3,48,24,0,1091,1090,1,0,0,0,
        1091,1092,1,0,0,0,1092,1094,1,0,0,0,1093,1095,3,144,72,0,1094,1093,
        1,0,0,0,1094,1095,1,0,0,0,1095,145,1,0,0,0,1096,1098,3,4,2,0,1097,
        1099,3,48,24,0,1098,1097,1,0,0,0,1098,1099,1,0,0,0,1099,1116,1,0,
        0,0,1100,1103,3,60,30,0,1101,1103,3,142,71,0,1102,1100,1,0,0,0,1102,
        1101,1,0,0,0,1103,1104,1,0,0,0,1104,1108,5,84,0,0,1105,1107,3,262,
        131,0,1106,1105,1,0,0,0,1107,1110,1,0,0,0,1108,1106,1,0,0,0,1108,
        1109,1,0,0,0,1109,1111,1,0,0,0,1110,1108,1,0,0,0,1111,1113,3,4,2,
        0,1112,1114,3,48,24,0,1113,1112,1,0,0,0,1113,1114,1,0,0,0,1114,1116,
        1,0,0,0,1115,1096,1,0,0,0,1115,1102,1,0,0,0,1116,147,1,0,0,0,1117,
        1118,3,146,73,0,1118,149,1,0,0,0,1119,1120,3,4,2,0,1120,151,1,0,
        0,0,1121,1125,3,138,69,0,1122,1125,3,142,71,0,1123,1125,3,150,75,
        0,1124,1121,1,0,0,0,1124,1122,1,0,0,0,1124,1123,1,0,0,0,1125,1126,
        1,0,0,0,1126,1127,3,38,19,0,1127,153,1,0,0,0,1128,1130,3,156,78,
        0,1129,1128,1,0,0,0,1130,1133,1,0,0,0,1131,1129,1,0,0,0,1131,1132,
        1,0,0,0,1132,1134,1,0,0,0,1133,1131,1,0,0,0,1134,1135,3,158,79,0,
        1135,1136,3,180,90,0,1136,155,1,0,0,0,1137,1148,3,262,131,0,1138,
        1148,5,52,0,0,1139,1148,5,51,0,0,1140,1148,5,50,0,0,1141,1148,5,
        18,0,0,1142,1148,5,55,0,0,1143,1148,5,35,0,0,1144,1148,5,59,0,0,
        1145,1148,5,47,0,0,1146,1148,5,56,0,0,1147,1137,1,0,0,0,1147,1138,
        1,0,0,0,1147,1139,1,0,0,0,1147,1140,1,0,0,0,1147,1141,1,0,0,0,1147,
        1142,1,0,0,0,1147,1143,1,0,0,0,1147,1144,1,0,0,0,1147,1145,1,0,0,
        0,1147,1146,1,0,0,0,1148,157,1,0,0,0,1149,1153,3,106,53,0,1150,1152,
        3,262,131,0,1151,1150,1,0,0,0,1152,1155,1,0,0,0,1153,1151,1,0,0,
        0,1153,1154,1,0,0,0,1154,1157,1,0,0,0,1155,1153,1,0,0,0,1156,1149,
        1,0,0,0,1156,1157,1,0,0,0,1157,1158,1,0,0,0,1158,1159,3,160,80,0,
        1159,1161,3,162,81,0,1160,1162,3,174,87,0,1161,1160,1,0,0,0,1161,
        1162,1,0,0,0,1162,159,1,0,0,0,1163,1166,3,136,68,0,1164,1166,5,65,
        0,0,1165,1163,1,0,0,0,1165,1164,1,0,0,0,1166,161,1,0,0,0,1167,1168,
        3,2,1,0,1168,1172,5,76,0,0,1169,1170,3,164,82,0,1170,1171,5,83,0,
        0,1171,1173,1,0,0,0,1172,1169,1,0,0,0,1172,1173,1,0,0,0,1173,1175,
        1,0,0,0,1174,1176,3,166,83,0,1175,1174,1,0,0,0,1175,1176,1,0,0,0,
        1176,1177,1,0,0,0,1177,1179,5,77,0,0,1178,1180,3,38,19,0,1179,1178,
        1,0,0,0,1179,1180,1,0,0,0,1180,163,1,0,0,0,1181,1183,3,262,131,0,
        1182,1181,1,0,0,0,1183,1186,1,0,0,0,1184,1182,1,0,0,0,1184,1185,
        1,0,0,0,1185,1187,1,0,0,0,1186,1184,1,0,0,0,1187,1191,3,136,68,0,
        1188,1189,3,2,1,0,1189,1190,5,84,0,0,1190,1192,1,0,0,0,1191,1188,
        1,0,0,0,1191,1192,1,0,0,0,1192,1193,1,0,0,0,1193,1194,5,60,0,0,1194,
        165,1,0,0,0,1195,1200,3,168,84,0,1196,1197,5,83,0,0,1197,1199,3,
        168,84,0,1198,1196,1,0,0,0,1199,1202,1,0,0,0,1200,1198,1,0,0,0,1200,
        1201,1,0,0,0,1201,167,1,0,0,0,1202,1200,1,0,0,0,1203,1205,3,172,
        86,0,1204,1203,1,0,0,0,1205,1208,1,0,0,0,1206,1204,1,0,0,0,1206,
        1207,1,0,0,0,1207,1209,1,0,0,0,1208,1206,1,0,0,0,1209,1210,3,136,
        68,0,1210,1211,3,132,66,0,1211,1214,1,0,0,0,1212,1214,3,170,85,0,
        1213,1206,1,0,0,0,1213,1212,1,0,0,0,1214,169,1,0,0,0,1215,1217,3,
        172,86,0,1216,1215,1,0,0,0,1217,1220,1,0,0,0,1218,1216,1,0,0,0,1218,
        1219,1,0,0,0,1219,1221,1,0,0,0,1220,1218,1,0,0,0,1221,1225,3,136,
        68,0,1222,1224,3,262,131,0,1223,1222,1,0,0,0,1224,1227,1,0,0,0,1225,
        1223,1,0,0,0,1225,1226,1,0,0,0,1226,1228,1,0,0,0,1227,1225,1,0,0,
        0,1228,1229,5,85,0,0,1229,1230,3,2,1,0,1230,171,1,0,0,0,1231,1234,
        3,262,131,0,1232,1234,5,35,0,0,1233,1231,1,0,0,0,1233,1232,1,0,0,
        0,1234,173,1,0,0,0,1235,1236,5,62,0,0,1236,1237,3,176,88,0,1237,
        175,1,0,0,0,1238,1243,3,178,89,0,1239,1240,5,83,0,0,1240,1242,3,
        178,89,0,1241,1239,1,0,0,0,1242,1245,1,0,0,0,1243,1241,1,0,0,0,1243,
        1244,1,0,0,0,1244,177,1,0,0,0,1245,1243,1,0,0,0,1246,1249,3,30,15,
        0,1247,1249,3,34,17,0,1248,1246,1,0,0,0,1248,1247,1,0,0,0,1249,179,
        1,0,0,0,1250,1253,3,284,142,0,1251,1253,5,82,0,0,1252,1250,1,0,0,
        0,1252,1251,1,0,0,0,1253,181,1,0,0,0,1254,1255,3,284,142,0,1255,
        183,1,0,0,0,1256,1257,5,55,0,0,1257,1258,3,284,142,0,1258,185,1,
        0,0,0,1259,1261,3,188,94,0,1260,1259,1,0,0,0,1261,1264,1,0,0,0,1262,
        1260,1,0,0,0,1262,1263,1,0,0,0,1263,1265,1,0,0,0,1264,1262,1,0,0,
        0,1265,1267,3,190,95,0,1266,1268,3,174,87,0,1267,1266,1,0,0,0,1267,
        1268,1,0,0,0,1268,1269,1,0,0,0,1269,1270,3,194,97,0,1270,187,1,0,
        0,0,1271,1276,3,262,131,0,1272,1276,5,52,0,0,1273,1276,5,51,0,0,
        1274,1276,5,50,0,0,1275,1271,1,0,0,0,1275,1272,1,0,0,0,1275,1273,
        1,0,0,0,1275,1274,1,0,0,0,1276,189,1,0,0,0,1277,1279,3,106,53,0,
        1278,1277,1,0,0,0,1278,1279,1,0,0,0,1279,1280,1,0,0,0,1280,1281,
        3,192,96,0,1281,1285,5,76,0,0,1282,1283,3,164,82,0,1283,1284,5,83,
        0,0,1284,1286,1,0,0,0,1285,1282,1,0,0,0,1285,1286,1,0,0,0,1286,1288,
        1,0,0,0,1287,1289,3,166,83,0,1288,1287,1,0,0,0,1288,1289,1,0,0,0,
        1289,1290,1,0,0,0,1290,1291,5,77,0,0,1291,191,1,0,0,0,1292,1293,
        3,4,2,0,1293,193,1,0,0,0,1294,1296,5,78,0,0,1295,1297,3,196,98,0,
        1296,1295,1,0,0,0,1296,1297,1,0,0,0,1297,1299,1,0,0,0,1298,1300,
        3,286,143,0,1299,1298,1,0,0,0,1299,1300,1,0,0,0,1300,1301,1,0,0,
        0,1301,1302,5,79,0,0,1302,195,1,0,0,0,1303,1305,3,48,24,0,1304,1303,
        1,0,0,0,1304,1305,1,0,0,0,1305,1306,1,0,0,0,1306,1307,7,7,0,0,1307,
        1309,5,76,0,0,1308,1310,3,430,215,0,1309,1308,1,0,0,0,1309,1310,
        1,0,0,0,1310,1311,1,0,0,0,1311,1312,5,77,0,0,1312,1330,5,82,0,0,
        1313,1316,3,66,33,0,1314,1316,3,398,199,0,1315,1313,1,0,0,0,1315,
        1314,1,0,0,0,1316,1317,1,0,0,0,1317,1319,5,84,0,0,1318,1320,3,48,
        24,0,1319,1318,1,0,0,0,1319,1320,1,0,0,0,1320,1321,1,0,0,0,1321,
        1322,5,57,0,0,1322,1324,5,76,0,0,1323,1325,3,430,215,0,1324,1323,
        1,0,0,0,1324,1325,1,0,0,0,1325,1326,1,0,0,0,1326,1327,5,77,0,0,1327,
        1328,5,82,0,0,1328,1330,1,0,0,0,1329,1304,1,0,0,0,1329,1315,1,0,
        0,0,1330,197,1,0,0,0,1331,1333,3,104,52,0,1332,1331,1,0,0,0,1333,
        1336,1,0,0,0,1334,1332,1,0,0,0,1334,1335,1,0,0,0,1335,1337,1,0,0,
        0,1336,1334,1,0,0,0,1337,1338,5,33,0,0,1338,1340,3,4,2,0,1339,1341,
        3,112,56,0,1340,1339,1,0,0,0,1340,1341,1,0,0,0,1341,1342,1,0,0,0,
        1342,1343,3,200,100,0,1343,199,1,0,0,0,1344,1346,5,78,0,0,1345,1347,
        3,202,101,0,1346,1345,1,0,0,0,1346,1347,1,0,0,0,1347,1349,1,0,0,
        0,1348,1350,5,83,0,0,1349,1348,1,0,0,0,1349,1350,1,0,0,0,1350,1352,
        1,0,0,0,1351,1353,3,208,104,0,1352,1351,1,0,0,0,1352,1353,1,0,0,
        0,1353,1354,1,0,0,0,1354,1355,5,79,0,0,1355,201,1,0,0,0,1356,1361,
        3,204,102,0,1357,1358,5,83,0,0,1358,1360,3,204,102,0,1359,1357,1,
        0,0,0,1360,1363,1,0,0,0,1361,1359,1,0,0,0,1361,1362,1,0,0,0,1362,
        203,1,0,0,0,1363,1361,1,0,0,0,1364,1366,3,206,103,0,1365,1364,1,
        0,0,0,1366,1369,1,0,0,0,1367,1365,1,0,0,0,1367,1368,1,0,0,0,1368,
        1370,1,0,0,0,1369,1367,1,0,0,0,1370,1376,3,2,1,0,1371,1373,5,76,
        0,0,1372,1374,3,430,215,0,1373,1372,1,0,0,0,1373,1374,1,0,0,0,1374,
        1375,1,0,0,0,1375,1377,5,77,0,0,1376,1371,1,0,0,0,1376,1377,1,0,
        0,0,1377,1379,1,0,0,0,1378,1380,3,118,59,0,1379,1378,1,0,0,0,1379,
        1380,1,0,0,0,1380,205,1,0,0,0,1381,1382,3,262,131,0,1382,207,1,0,
        0,0,1383,1387,5,82,0,0,1384,1386,3,120,60,0,1385,1384,1,0,0,0,1386,
        1389,1,0,0,0,1387,1385,1,0,0,0,1387,1388,1,0,0,0,1388,209,1,0,0,
        0,1389,1387,1,0,0,0,1390,1392,3,104,52,0,1391,1390,1,0,0,0,1392,
        1395,1,0,0,0,1393,1391,1,0,0,0,1393,1394,1,0,0,0,1394,1396,1,0,0,
        0,1395,1393,1,0,0,0,1396,1397,5,9,0,0,1397,1399,3,4,2,0,1398,1400,
        3,106,53,0,1399,1398,1,0,0,0,1399,1400,1,0,0,0,1400,1401,1,0,0,0,
        1401,1403,3,212,106,0,1402,1404,3,112,56,0,1403,1402,1,0,0,0,1403,
        1404,1,0,0,0,1404,1405,1,0,0,0,1405,1406,3,222,111,0,1406,211,1,
        0,0,0,1407,1409,5,76,0,0,1408,1410,3,214,107,0,1409,1408,1,0,0,0,
        1409,1410,1,0,0,0,1410,1411,1,0,0,0,1411,1412,5,77,0,0,1412,213,
        1,0,0,0,1413,1418,3,216,108,0,1414,1415,5,83,0,0,1415,1417,3,216,
        108,0,1416,1414,1,0,0,0,1417,1420,1,0,0,0,1418,1416,1,0,0,0,1418,
        1419,1,0,0,0,1419,215,1,0,0,0,1420,1418,1,0,0,0,1421,1423,3,220,
        110,0,1422,1421,1,0,0,0,1423,1426,1,0,0,0,1424,1422,1,0,0,0,1424,
        1425,1,0,0,0,1425,1427,1,0,0,0,1426,1424,1,0,0,0,1427,1428,3,136,
        68,0,1428,1429,3,2,1,0,1429,1432,1,0,0,0,1430,1432,3,218,109,0,1431,
        1424,1,0,0,0,1431,1430,1,0,0,0,1432,217,1,0,0,0,1433,1435,3,220,
        110,0,1434,1433,1,0,0,0,1435,1438,1,0,0,0,1436,1434,1,0,0,0,1436,
        1437,1,0,0,0,1437,1439,1,0,0,0,1438,1436,1,0,0,0,1439,1443,3,136,
        68,0,1440,1442,3,262,131,0,1441,1440,1,0,0,0,1442,1445,1,0,0,0,1443,
        1441,1,0,0,0,1443,1444,1,0,0,0,1444,1446,1,0,0,0,1445,1443,1,0,0,
        0,1446,1447,5,85,0,0,1447,1448,3,2,1,0,1448,219,1,0,0,0,1449,1450,
        3,262,131,0,1450,221,1,0,0,0,1451,1455,5,78,0,0,1452,1454,3,224,
        112,0,1453,1452,1,0,0,0,1454,1457,1,0,0,0,1455,1453,1,0,0,0,1455,
        1456,1,0,0,0,1456,1458,1,0,0,0,1457,1455,1,0,0,0,1458,1459,5,79,
        0,0,1459,223,1,0,0,0,1460,1463,3,120,60,0,1461,1463,3,226,113,0,
        1462,1460,1,0,0,0,1462,1461,1,0,0,0,1463,225,1,0,0,0,1464,1466,3,
        188,94,0,1465,1464,1,0,0,0,1466,1469,1,0,0,0,1467,1465,1,0,0,0,1467,
        1468,1,0,0,0,1468,1470,1,0,0,0,1469,1467,1,0,0,0,1470,1471,3,192,
        96,0,1471,1472,3,194,97,0,1472,227,1,0,0,0,1473,1476,3,230,115,0,
        1474,1476,3,250,125,0,1475,1473,1,0,0,0,1475,1474,1,0,0,0,1476,229,
        1,0,0,0,1477,1479,3,232,116,0,1478,1477,1,0,0,0,1479,1482,1,0,0,
        0,1480,1478,1,0,0,0,1480,1481,1,0,0,0,1481,1483,1,0,0,0,1482,1480,
        1,0,0,0,1483,1484,5,45,0,0,1484,1486,3,4,2,0,1485,1487,3,106,53,
        0,1486,1485,1,0,0,0,1486,1487,1,0,0,0,1487,1489,1,0,0,0,1488,1490,
        3,234,117,0,1489,1488,1,0,0,0,1489,1490,1,0,0,0,1490,1492,1,0,0,
        0,1491,1493,3,236,118,0,1492,1491,1,0,0,0,1492,1493,1,0,0,0,1493,
        1494,1,0,0,0,1494,1495,3,238,119,0,1495,231,1,0,0,0,1496,1506,3,
        262,131,0,1497,1506,5,52,0,0,1498,1506,5,51,0,0,1499,1506,5,50,0,
        0,1500,1506,5,18,0,0,1501,1506,5,55,0,0,1502,1506,5,11,0,0,1503,
        1506,5,3,0,0,1504,1506,5,56,0,0,1505,1496,1,0,0,0,1505,1497,1,0,
        0,0,1505,1498,1,0,0,0,1505,1499,1,0,0,0,1505,1500,1,0,0,0,1505,1501,
        1,0,0,0,1505,1502,1,0,0,0,1505,1503,1,0,0,0,1505,1504,1,0,0,0,1506,
        233,1,0,0,0,1507,1508,5,34,0,0,1508,1509,3,114,57,0,1509,235,1,0,
        0,0,1510,1511,5,7,0,0,1511,1516,3,62,31,0,1512,1513,5,83,0,0,1513,
        1515,3,62,31,0,1514,1512,1,0,0,0,1515,1518,1,0,0,0,1516,1514,1,0,
        0,0,1516,1517,1,0,0,0,1517,237,1,0,0,0,1518,1516,1,0,0,0,1519,1523,
        5,78,0,0,1520,1522,3,240,120,0,1521,1520,1,0,0,0,1522,1525,1,0,0,
        0,1523,1521,1,0,0,0,1523,1524,1,0,0,0,1524,1526,1,0,0,0,1525,1523,
        1,0,0,0,1526,1527,5,79,0,0,1527,239,1,0,0,0,1528,1534,3,242,121,
        0,1529,1534,3,246,123,0,1530,1534,3,100,50,0,1531,1534,3,228,114,
        0,1532,1534,5,82,0,0,1533,1528,1,0,0,0,1533,1529,1,0,0,0,1533,1530,
        1,0,0,0,1533,1531,1,0,0,0,1533,1532,1,0,0,0,1534,241,1,0,0,0,1535,
        1537,3,244,122,0,1536,1535,1,0,0,0,1537,1540,1,0,0,0,1538,1536,1,
        0,0,0,1538,1539,1,0,0,0,1539,1541,1,0,0,0,1540,1538,1,0,0,0,1541,
        1542,3,136,68,0,1542,1543,3,128,64,0,1543,1544,5,82,0,0,1544,243,
        1,0,0,0,1545,1550,3,262,131,0,1546,1550,5,52,0,0,1547,1550,5,55,
        0,0,1548,1550,5,35,0,0,1549,1545,1,0,0,0,1549,1546,1,0,0,0,1549,
        1547,1,0,0,0,1549,1548,1,0,0,0,1550,245,1,0,0,0,1551,1553,3,248,
        124,0,1552,1551,1,0,0,0,1553,1556,1,0,0,0,1554,1552,1,0,0,0,1554,
        1555,1,0,0,0,1555,1557,1,0,0,0,1556,1554,1,0,0,0,1557,1558,3,158,
        79,0,1558,1559,3,180,90,0,1559,247,1,0,0,0,1560,1568,3,262,131,0,
        1561,1568,5,52,0,0,1562,1568,5,50,0,0,1563,1568,5,18,0,0,1564,1568,
        5,29,0,0,1565,1568,5,55,0,0,1566,1568,5,56,0,0,1567,1560,1,0,0,0,
        1567,1561,1,0,0,0,1567,1562,1,0,0,0,1567,1563,1,0,0,0,1567,1564,
        1,0,0,0,1567,1565,1,0,0,0,1567,1566,1,0,0,0,1568,249,1,0,0,0,1569,
        1571,3,232,116,0,1570,1569,1,0,0,0,1571,1574,1,0,0,0,1572,1570,1,
        0,0,0,1572,1573,1,0,0,0,1573,1575,1,0,0,0,1574,1572,1,0,0,0,1575,
        1576,5,86,0,0,1576,1577,5,45,0,0,1577,1578,3,4,2,0,1578,1579,3,252,
        126,0,1579,251,1,0,0,0,1580,1584,5,78,0,0,1581,1583,3,254,127,0,
        1582,1581,1,0,0,0,1583,1586,1,0,0,0,1584,1582,1,0,0,0,1584,1585,
        1,0,0,0,1585,1587,1,0,0,0,1586,1584,1,0,0,0,1587,1588,5,79,0,0,1588,
        253,1,0,0,0,1589,1595,3,256,128,0,1590,1595,3,242,121,0,1591,1595,
        3,100,50,0,1592,1595,3,228,114,0,1593,1595,5,82,0,0,1594,1589,1,
        0,0,0,1594,1590,1,0,0,0,1594,1591,1,0,0,0,1594,1592,1,0,0,0,1594,
        1593,1,0,0,0,1595,255,1,0,0,0,1596,1598,3,258,129,0,1597,1596,1,
        0,0,0,1598,1601,1,0,0,0,1599,1597,1,0,0,0,1599,1600,1,0,0,0,1600,
        1602,1,0,0,0,1601,1599,1,0,0,0,1602,1603,3,136,68,0,1603,1604,3,
        2,1,0,1604,1605,5,76,0,0,1605,1607,5,77,0,0,1606,1608,3,38,19,0,
        1607,1606,1,0,0,0,1607,1608,1,0,0,0,1608,1610,1,0,0,0,1609,1611,
        3,260,130,0,1610,1609,1,0,0,0,1610,1611,1,0,0,0,1611,1612,1,0,0,
        0,1612,1613,5,82,0,0,1613,257,1,0,0,0,1614,1618,3,262,131,0,1615,
        1618,5,52,0,0,1616,1618,5,18,0,0,1617,1614,1,0,0,0,1617,1615,1,0,
        0,0,1617,1616,1,0,0,0,1618,259,1,0,0,0,1619,1620,5,29,0,0,1620,1621,
        3,270,135,0,1621,261,1,0,0,0,1622,1626,3,264,132,0,1623,1626,3,276,
        138,0,1624,1626,3,278,139,0,1625,1622,1,0,0,0,1625,1623,1,0,0,0,
        1625,1624,1,0,0,0,1626,263,1,0,0,0,1627,1628,5,86,0,0,1628,1629,
        3,62,31,0,1629,1631,5,76,0,0,1630,1632,3,266,133,0,1631,1630,1,0,
        0,0,1631,1632,1,0,0,0,1632,1633,1,0,0,0,1633,1634,5,77,0,0,1634,
        265,1,0,0,0,1635,1640,3,268,134,0,1636,1637,5,83,0,0,1637,1639,3,
        268,134,0,1638,1636,1,0,0,0,1639,1642,1,0,0,0,1640,1638,1,0,0,0,
        1640,1641,1,0,0,0,1641,267,1,0,0,0,1642,1640,1,0,0,0,1643,1644,3,
        2,1,0,1644,1645,5,88,0,0,1645,1646,3,270,135,0,1646,269,1,0,0,0,
        1647,1651,3,472,236,0,1648,1651,3,272,136,0,1649,1651,3,262,131,
        0,1650,1647,1,0,0,0,1650,1648,1,0,0,0,1650,1649,1,0,0,0,1651,271,
        1,0,0,0,1652,1654,5,78,0,0,1653,1655,3,274,137,0,1654,1653,1,0,0,
        0,1654,1655,1,0,0,0,1655,1657,1,0,0,0,1656,1658,5,83,0,0,1657,1656,
        1,0,0,0,1657,1658,1,0,0,0,1658,1659,1,0,0,0,1659,1660,5,79,0,0,1660,
        273,1,0,0,0,1661,1666,3,270,135,0,1662,1663,5,83,0,0,1663,1665,3,
        270,135,0,1664,1662,1,0,0,0,1665,1668,1,0,0,0,1666,1664,1,0,0,0,
        1666,1667,1,0,0,0,1667,275,1,0,0,0,1668,1666,1,0,0,0,1669,1670,5,
        86,0,0,1670,1671,3,62,31,0,1671,277,1,0,0,0,1672,1673,5,86,0,0,1673,
        1674,3,62,31,0,1674,1675,5,76,0,0,1675,1676,3,270,135,0,1676,1677,
        5,77,0,0,1677,279,1,0,0,0,1678,1680,5,78,0,0,1679,1681,3,282,141,
        0,1680,1679,1,0,0,0,1680,1681,1,0,0,0,1681,1683,1,0,0,0,1682,1684,
        5,83,0,0,1683,1682,1,0,0,0,1683,1684,1,0,0,0,1684,1685,1,0,0,0,1685,
        1686,5,79,0,0,1686,281,1,0,0,0,1687,1692,3,134,67,0,1688,1689,5,
        83,0,0,1689,1691,3,134,67,0,1690,1688,1,0,0,0,1691,1694,1,0,0,0,
        1692,1690,1,0,0,0,1692,1693,1,0,0,0,1693,283,1,0,0,0,1694,1692,1,
        0,0,0,1695,1697,5,78,0,0,1696,1698,3,286,143,0,1697,1696,1,0,0,0,
        1697,1698,1,0,0,0,1698,1699,1,0,0,0,1699,1700,5,79,0,0,1700,285,
        1,0,0,0,1701,1705,3,288,144,0,1702,1704,3,288,144,0,1703,1702,1,
        0,0,0,1704,1707,1,0,0,0,1705,1703,1,0,0,0,1705,1706,1,0,0,0,1706,
        287,1,0,0,0,1707,1705,1,0,0,0,1708,1712,3,290,145,0,1709,1712,3,
        296,148,0,1710,1712,3,298,149,0,1711,1708,1,0,0,0,1711,1709,1,0,
        0,0,1711,1710,1,0,0,0,1712,289,1,0,0,0,1713,1716,3,100,50,0,1714,
        1716,3,230,115,0,1715,1713,1,0,0,0,1715,1714,1,0,0,0,1716,291,1,
        0,0,0,1717,1719,3,172,86,0,1718,1717,1,0,0,0,1719,1722,1,0,0,0,1720,
        1718,1,0,0,0,1720,1721,1,0,0,0,1721,1723,1,0,0,0,1722,1720,1,0,0,
        0,1723,1724,3,294,147,0,1724,1725,3,128,64,0,1725,293,1,0,0,0,1726,
        1729,3,136,68,0,1727,1729,5,15,0,0,1728,1726,1,0,0,0,1728,1727,1,
        0,0,0,1729,295,1,0,0,0,1730,1731,3,292,146,0,1731,1732,5,82,0,0,
        1732,297,1,0,0,0,1733,1740,3,302,151,0,1734,1740,3,306,153,0,1735,
        1740,3,314,157,0,1736,1740,3,316,158,0,1737,1740,3,334,167,0,1738,
        1740,3,340,170,0,1739,1733,1,0,0,0,1739,1734,1,0,0,0,1739,1735,1,
        0,0,0,1739,1736,1,0,0,0,1739,1737,1,0,0,0,1739,1738,1,0,0,0,1740,
        299,1,0,0,0,1741,1747,3,302,151,0,1742,1747,3,308,154,0,1743,1747,
        3,318,159,0,1744,1747,3,336,168,0,1745,1747,3,342,171,0,1746,1741,
        1,0,0,0,1746,1742,1,0,0,0,1746,1743,1,0,0,0,1746,1744,1,0,0,0,1746,
        1745,1,0,0,0,1747,301,1,0,0,0,1748,1762,3,284,142,0,1749,1762,3,
        304,152,0,1750,1762,3,310,155,0,1751,1762,3,320,160,0,1752,1762,
        3,322,161,0,1753,1762,3,338,169,0,1754,1762,3,358,179,0,1755,1762,
        3,360,180,0,1756,1762,3,362,181,0,1757,1762,3,366,183,0,1758,1762,
        3,364,182,0,1759,1762,3,368,184,0,1760,1762,3,390,195,0,1761,1748,
        1,0,0,0,1761,1749,1,0,0,0,1761,1750,1,0,0,0,1761,1751,1,0,0,0,1761,
        1752,1,0,0,0,1761,1753,1,0,0,0,1761,1754,1,0,0,0,1761,1755,1,0,0,
        0,1761,1756,1,0,0,0,1761,1757,1,0,0,0,1761,1758,1,0,0,0,1761,1759,
        1,0,0,0,1761,1760,1,0,0,0,1762,303,1,0,0,0,1763,1764,5,82,0,0,1764,
        305,1,0,0,0,1765,1766,3,2,1,0,1766,1767,5,94,0,0,1767,1768,3,298,
        149,0,1768,307,1,0,0,0,1769,1770,3,2,1,0,1770,1771,5,94,0,0,1771,
        1772,3,300,150,0,1772,309,1,0,0,0,1773,1774,3,312,156,0,1774,1775,
        5,82,0,0,1775,311,1,0,0,0,1776,1784,3,476,238,0,1777,1784,3,444,
        222,0,1778,1784,3,446,223,0,1779,1784,3,438,219,0,1780,1784,3,440,
        220,0,1781,1784,3,428,214,0,1782,1784,3,406,203,0,1783,1776,1,0,
        0,0,1783,1777,1,0,0,0,1783,1778,1,0,0,0,1783,1779,1,0,0,0,1783,1780,
        1,0,0,0,1783,1781,1,0,0,0,1783,1782,1,0,0,0,1784,313,1,0,0,0,1785,
        1786,5,39,0,0,1786,1787,5,76,0,0,1787,1788,3,396,198,0,1788,1789,
        5,77,0,0,1789,1790,3,298,149,0,1790,315,1,0,0,0,1791,1792,5,39,0,
        0,1792,1793,5,76,0,0,1793,1794,3,396,198,0,1794,1795,5,77,0,0,1795,
        1796,3,300,150,0,1796,1797,5,32,0,0,1797,1798,3,298,149,0,1798,317,
        1,0,0,0,1799,1800,5,39,0,0,1800,1801,5,76,0,0,1801,1802,3,396,198,
        0,1802,1803,5,77,0,0,1803,1804,3,300,150,0,1804,1805,5,32,0,0,1805,
        1806,3,300,150,0,1806,319,1,0,0,0,1807,1808,5,19,0,0,1808,1811,3,
        396,198,0,1809,1810,5,94,0,0,1810,1812,3,396,198,0,1811,1809,1,0,
        0,0,1811,1812,1,0,0,0,1812,1813,1,0,0,0,1813,1814,5,82,0,0,1814,
        321,1,0,0,0,1815,1816,5,58,0,0,1816,1817,5,76,0,0,1817,1818,3,396,
        198,0,1818,1819,5,77,0,0,1819,1820,3,324,162,0,1820,323,1,0,0,0,
        1821,1822,5,78,0,0,1822,1826,3,326,163,0,1823,1825,3,326,163,0,1824,
        1823,1,0,0,0,1825,1828,1,0,0,0,1826,1824,1,0,0,0,1826,1827,1,0,0,
        0,1827,1829,1,0,0,0,1828,1826,1,0,0,0,1829,1830,5,79,0,0,1830,1848,
        1,0,0,0,1831,1835,5,78,0,0,1832,1834,3,328,164,0,1833,1832,1,0,0,
        0,1834,1837,1,0,0,0,1835,1833,1,0,0,0,1835,1836,1,0,0,0,1836,1843,
        1,0,0,0,1837,1835,1,0,0,0,1838,1839,3,330,165,0,1839,1840,5,94,0,
        0,1840,1842,1,0,0,0,1841,1838,1,0,0,0,1842,1845,1,0,0,0,1843,1841,
        1,0,0,0,1843,1844,1,0,0,0,1844,1846,1,0,0,0,1845,1843,1,0,0,0,1846,
        1848,5,79,0,0,1847,1821,1,0,0,0,1847,1831,1,0,0,0,1848,325,1,0,0,
        0,1849,1850,3,330,165,0,1850,1856,5,95,0,0,1851,1852,3,396,198,0,
        1852,1853,5,82,0,0,1853,1857,1,0,0,0,1854,1857,3,284,142,0,1855,
        1857,3,364,182,0,1856,1851,1,0,0,0,1856,1854,1,0,0,0,1856,1855,1,
        0,0,0,1857,327,1,0,0,0,1858,1859,3,330,165,0,1859,1865,5,94,0,0,
        1860,1861,3,330,165,0,1861,1862,5,94,0,0,1862,1864,1,0,0,0,1863,
        1860,1,0,0,0,1864,1867,1,0,0,0,1865,1863,1,0,0,0,1865,1866,1,0,0,
        0,1866,1868,1,0,0,0,1867,1865,1,0,0,0,1868,1869,3,286,143,0,1869,
        329,1,0,0,0,1870,1871,5,23,0,0,1871,1876,3,332,166,0,1872,1873,5,
        83,0,0,1873,1875,3,332,166,0,1874,1872,1,0,0,0,1875,1878,1,0,0,0,
        1876,1874,1,0,0,0,1876,1877,1,0,0,0,1877,1881,1,0,0,0,1878,1876,
        1,0,0,0,1879,1881,5,29,0,0,1880,1870,1,0,0,0,1880,1879,1,0,0,0,1881,
        331,1,0,0,0,1882,1883,3,472,236,0,1883,333,1,0,0,0,1884,1885,5,67,
        0,0,1885,1886,5,76,0,0,1886,1887,3,396,198,0,1887,1888,5,77,0,0,
        1888,1889,3,298,149,0,1889,335,1,0,0,0,1890,1891,5,67,0,0,1891,1892,
        5,76,0,0,1892,1893,3,396,198,0,1893,1894,5,77,0,0,1894,1895,3,300,
        150,0,1895,337,1,0,0,0,1896,1897,5,30,0,0,1897,1898,3,298,149,0,
        1898,1899,5,67,0,0,1899,1900,5,76,0,0,1900,1901,3,396,198,0,1901,
        1902,5,77,0,0,1902,1903,5,82,0,0,1903,339,1,0,0,0,1904,1907,3,344,
        172,0,1905,1907,3,354,177,0,1906,1904,1,0,0,0,1906,1905,1,0,0,0,
        1907,341,1,0,0,0,1908,1911,3,346,173,0,1909,1911,3,356,178,0,1910,
        1908,1,0,0,0,1910,1909,1,0,0,0,1911,343,1,0,0,0,1912,1913,5,38,0,
        0,1913,1915,5,76,0,0,1914,1916,3,348,174,0,1915,1914,1,0,0,0,1915,
        1916,1,0,0,0,1916,1917,1,0,0,0,1917,1919,5,82,0,0,1918,1920,3,396,
        198,0,1919,1918,1,0,0,0,1919,1920,1,0,0,0,1920,1921,1,0,0,0,1921,
        1923,5,82,0,0,1922,1924,3,350,175,0,1923,1922,1,0,0,0,1923,1924,
        1,0,0,0,1924,1925,1,0,0,0,1925,1926,5,77,0,0,1926,1927,3,298,149,
        0,1927,345,1,0,0,0,1928,1929,5,38,0,0,1929,1931,5,76,0,0,1930,1932,
        3,348,174,0,1931,1930,1,0,0,0,1931,1932,1,0,0,0,1932,1933,1,0,0,
        0,1933,1935,5,82,0,0,1934,1936,3,396,198,0,1935,1934,1,0,0,0,1935,
        1936,1,0,0,0,1936,1937,1,0,0,0,1937,1939,5,82,0,0,1938,1940,3,350,
        175,0,1939,1938,1,0,0,0,1939,1940,1,0,0,0,1940,1941,1,0,0,0,1941,
        1942,5,77,0,0,1942,1943,3,300,150,0,1943,347,1,0,0,0,1944,1947,3,
        352,176,0,1945,1947,3,292,146,0,1946,1944,1,0,0,0,1946,1945,1,0,
        0,0,1947,349,1,0,0,0,1948,1949,3,352,176,0,1949,351,1,0,0,0,1950,
        1955,3,312,156,0,1951,1952,5,83,0,0,1952,1954,3,312,156,0,1953,1951,
        1,0,0,0,1954,1957,1,0,0,0,1955,1953,1,0,0,0,1955,1956,1,0,0,0,1956,
        353,1,0,0,0,1957,1955,1,0,0,0,1958,1959,5,38,0,0,1959,1960,5,76,
        0,0,1960,1961,3,292,146,0,1961,1962,5,94,0,0,1962,1963,3,396,198,
        0,1963,1964,5,77,0,0,1964,1965,3,298,149,0,1965,355,1,0,0,0,1966,
        1967,5,38,0,0,1967,1968,5,76,0,0,1968,1969,3,292,146,0,1969,1970,
        5,94,0,0,1970,1971,3,396,198,0,1971,1972,5,77,0,0,1972,1973,3,300,
        150,0,1973,357,1,0,0,0,1974,1976,5,21,0,0,1975,1977,3,2,1,0,1976,
        1975,1,0,0,0,1976,1977,1,0,0,0,1977,1978,1,0,0,0,1978,1979,5,82,
        0,0,1979,359,1,0,0,0,1980,1982,5,28,0,0,1981,1983,3,2,1,0,1982,1981,
        1,0,0,0,1982,1983,1,0,0,0,1983,1984,1,0,0,0,1984,1985,5,82,0,0,1985,
        361,1,0,0,0,1986,1988,5,53,0,0,1987,1989,3,396,198,0,1988,1987,1,
        0,0,0,1988,1989,1,0,0,0,1989,1990,1,0,0,0,1990,1991,5,82,0,0,1991,
        363,1,0,0,0,1992,1993,5,61,0,0,1993,1994,3,396,198,0,1994,1995,5,
        82,0,0,1995,365,1,0,0,0,1996,1997,5,59,0,0,1997,1998,5,76,0,0,1998,
        1999,3,396,198,0,1999,2000,5,77,0,0,2000,2001,3,284,142,0,2001,367,
        1,0,0,0,2002,2003,5,64,0,0,2003,2004,3,284,142,0,2004,2005,3,370,
        185,0,2005,2019,1,0,0,0,2006,2007,5,64,0,0,2007,2008,3,284,142,0,
        2008,2009,3,378,189,0,2009,2019,1,0,0,0,2010,2011,5,64,0,0,2011,
        2013,3,284,142,0,2012,2014,3,370,185,0,2013,2012,1,0,0,0,2013,2014,
        1,0,0,0,2014,2015,1,0,0,0,2015,2016,3,378,189,0,2016,2019,1,0,0,
        0,2017,2019,3,380,190,0,2018,2002,1,0,0,0,2018,2006,1,0,0,0,2018,
        2010,1,0,0,0,2018,2017,1,0,0,0,2019,369,1,0,0,0,2020,2024,3,372,
        186,0,2021,2023,3,372,186,0,2022,2021,1,0,0,0,2023,2026,1,0,0,0,
        2024,2022,1,0,0,0,2024,2025,1,0,0,0,2025,371,1,0,0,0,2026,2024,1,
        0,0,0,2027,2028,5,24,0,0,2028,2029,5,76,0,0,2029,2030,3,374,187,
        0,2030,2031,5,77,0,0,2031,2032,3,284,142,0,2032,373,1,0,0,0,2033,
        2035,3,172,86,0,2034,2033,1,0,0,0,2035,2038,1,0,0,0,2036,2034,1,
        0,0,0,2036,2037,1,0,0,0,2037,2039,1,0,0,0,2038,2036,1,0,0,0,2039,
        2040,3,376,188,0,2040,2041,3,132,66,0,2041,375,1,0,0,0,2042,2047,
        3,146,73,0,2043,2044,5,109,0,0,2044,2046,3,30,15,0,2045,2043,1,0,
        0,0,2046,2049,1,0,0,0,2047,2045,1,0,0,0,2047,2048,1,0,0,0,2048,377,
        1,0,0,0,2049,2047,1,0,0,0,2050,2051,5,36,0,0,2051,2052,3,284,142,
        0,2052,379,1,0,0,0,2053,2054,5,64,0,0,2054,2055,3,382,191,0,2055,
        2057,3,284,142,0,2056,2058,3,370,185,0,2057,2056,1,0,0,0,2057,2058,
        1,0,0,0,2058,2060,1,0,0,0,2059,2061,3,378,189,0,2060,2059,1,0,0,
        0,2060,2061,1,0,0,0,2061,381,1,0,0,0,2062,2063,5,76,0,0,2063,2065,
        3,384,192,0,2064,2066,5,82,0,0,2065,2064,1,0,0,0,2065,2066,1,0,0,
        0,2066,2067,1,0,0,0,2067,2068,5,77,0,0,2068,383,1,0,0,0,2069,2074,
        3,386,193,0,2070,2071,5,82,0,0,2071,2073,3,386,193,0,2072,2070,1,
        0,0,0,2073,2076,1,0,0,0,2074,2072,1,0,0,0,2074,2075,1,0,0,0,2075,
        385,1,0,0,0,2076,2074,1,0,0,0,2077,2080,3,292,146,0,2078,2080,3,
        388,194,0,2079,2077,1,0,0,0,2079,2078,1,0,0,0,2080,387,1,0,0,0,2081,
        2084,3,66,33,0,2082,2084,3,426,213,0,2083,2081,1,0,0,0,2083,2082,
        1,0,0,0,2084,389,1,0,0,0,2085,2086,5,17,0,0,2086,2087,3,396,198,
        0,2087,2088,5,82,0,0,2088,391,1,0,0,0,2089,2090,3,394,197,0,2090,
        393,1,0,0,0,2091,2092,3,292,146,0,2092,395,1,0,0,0,2093,2096,3,482,
        241,0,2094,2096,3,474,237,0,2095,2093,1,0,0,0,2095,2094,1,0,0,0,
        2096,397,1,0,0,0,2097,2100,3,400,200,0,2098,2100,3,414,207,0,2099,
        2097,1,0,0,0,2099,2098,1,0,0,0,2100,399,1,0,0,0,2101,2103,3,14,7,
        0,2102,2104,3,402,201,0,2103,2102,1,0,0,0,2103,2104,1,0,0,0,2104,
        2319,1,0,0,0,2105,2107,3,404,202,0,2106,2108,3,402,201,0,2107,2106,
        1,0,0,0,2107,2108,1,0,0,0,2108,2319,1,0,0,0,2109,2111,5,60,0,0,2110,
        2112,3,402,201,0,2111,2110,1,0,0,0,2111,2112,1,0,0,0,2112,2319,1,
        0,0,0,2113,2114,3,62,31,0,2114,2115,5,84,0,0,2115,2117,5,60,0,0,
        2116,2118,3,402,201,0,2117,2116,1,0,0,0,2117,2118,1,0,0,0,2118,2319,
        1,0,0,0,2119,2120,5,76,0,0,2120,2121,3,396,198,0,2121,2123,5,77,
        0,0,2122,2124,3,402,201,0,2123,2122,1,0,0,0,2123,2124,1,0,0,0,2124,
        2319,1,0,0,0,2125,2127,3,408,204,0,2126,2128,3,402,201,0,2127,2126,
        1,0,0,0,2127,2128,1,0,0,0,2128,2319,1,0,0,0,2129,2130,3,66,33,0,
        2130,2131,5,84,0,0,2131,2133,3,408,204,0,2132,2134,3,402,201,0,2133,
        2132,1,0,0,0,2133,2134,1,0,0,0,2134,2319,1,0,0,0,2135,2136,3,414,
        207,0,2136,2137,5,84,0,0,2137,2139,3,408,204,0,2138,2140,3,402,201,
        0,2139,2138,1,0,0,0,2139,2140,1,0,0,0,2140,2319,1,0,0,0,2141,2142,
        3,414,207,0,2142,2143,5,84,0,0,2143,2145,3,2,1,0,2144,2146,3,402,
        201,0,2145,2144,1,0,0,0,2145,2146,1,0,0,0,2146,2319,1,0,0,0,2147,
        2148,5,57,0,0,2148,2149,5,84,0,0,2149,2151,3,2,1,0,2150,2152,3,402,
        201,0,2151,2150,1,0,0,0,2151,2152,1,0,0,0,2152,2319,1,0,0,0,2153,
        2154,3,62,31,0,2154,2155,5,84,0,0,2155,2156,5,57,0,0,2156,2157,5,
        84,0,0,2157,2159,3,2,1,0,2158,2160,3,402,201,0,2159,2158,1,0,0,0,
        2159,2160,1,0,0,0,2160,2319,1,0,0,0,2161,2162,3,66,33,0,2162,2163,
        5,80,0,0,2163,2164,3,396,198,0,2164,2166,5,81,0,0,2165,2167,3,402,
        201,0,2166,2165,1,0,0,0,2166,2167,1,0,0,0,2167,2319,1,0,0,0,2168,
        2169,3,418,209,0,2169,2170,5,80,0,0,2170,2171,3,396,198,0,2171,2173,
        5,81,0,0,2172,2174,3,402,201,0,2173,2172,1,0,0,0,2173,2174,1,0,0,
        0,2174,2319,1,0,0,0,2175,2176,3,68,34,0,2176,2178,5,76,0,0,2177,
        2179,3,430,215,0,2178,2177,1,0,0,0,2178,2179,1,0,0,0,2179,2180,1,
        0,0,0,2180,2182,5,77,0,0,2181,2183,3,402,201,0,2182,2181,1,0,0,0,
        2182,2183,1,0,0,0,2183,2319,1,0,0,0,2184,2185,3,62,31,0,2185,2187,
        5,84,0,0,2186,2188,3,48,24,0,2187,2186,1,0,0,0,2187,2188,1,0,0,0,
        2188,2189,1,0,0,0,2189,2190,3,2,1,0,2190,2192,5,76,0,0,2191,2193,
        3,430,215,0,2192,2191,1,0,0,0,2192,2193,1,0,0,0,2193,2194,1,0,0,
        0,2194,2196,5,77,0,0,2195,2197,3,402,201,0,2196,2195,1,0,0,0,2196,
        2197,1,0,0,0,2197,2319,1,0,0,0,2198,2199,3,66,33,0,2199,2201,5,84,
        0,0,2200,2202,3,48,24,0,2201,2200,1,0,0,0,2201,2202,1,0,0,0,2202,
        2203,1,0,0,0,2203,2204,3,2,1,0,2204,2206,5,76,0,0,2205,2207,3,430,
        215,0,2206,2205,1,0,0,0,2206,2207,1,0,0,0,2207,2208,1,0,0,0,2208,
        2210,5,77,0,0,2209,2211,3,402,201,0,2210,2209,1,0,0,0,2210,2211,
        1,0,0,0,2211,2319,1,0,0,0,2212,2213,3,414,207,0,2213,2215,5,84,0,
        0,2214,2216,3,48,24,0,2215,2214,1,0,0,0,2215,2216,1,0,0,0,2216,2217,
        1,0,0,0,2217,2218,3,2,1,0,2218,2220,5,76,0,0,2219,2221,3,430,215,
        0,2220,2219,1,0,0,0,2220,2221,1,0,0,0,2221,2222,1,0,0,0,2222,2224,
        5,77,0,0,2223,2225,3,402,201,0,2224,2223,1,0,0,0,2224,2225,1,0,0,
        0,2225,2319,1,0,0,0,2226,2227,5,57,0,0,2227,2229,5,84,0,0,2228,2230,
        3,48,24,0,2229,2228,1,0,0,0,2229,2230,1,0,0,0,2230,2231,1,0,0,0,
        2231,2232,3,2,1,0,2232,2234,5,76,0,0,2233,2235,3,430,215,0,2234,
        2233,1,0,0,0,2234,2235,1,0,0,0,2235,2236,1,0,0,0,2236,2238,5,77,
        0,0,2237,2239,3,402,201,0,2238,2237,1,0,0,0,2238,2239,1,0,0,0,2239,
        2319,1,0,0,0,2240,2241,3,62,31,0,2241,2242,5,84,0,0,2242,2243,5,
        57,0,0,2243,2245,5,84,0,0,2244,2246,3,48,24,0,2245,2244,1,0,0,0,
        2245,2246,1,0,0,0,2246,2247,1,0,0,0,2247,2248,3,2,1,0,2248,2250,
        5,76,0,0,2249,2251,3,430,215,0,2250,2249,1,0,0,0,2250,2251,1,0,0,
        0,2251,2252,1,0,0,0,2252,2254,5,77,0,0,2253,2255,3,402,201,0,2254,
        2253,1,0,0,0,2254,2255,1,0,0,0,2255,2319,1,0,0,0,2256,2257,3,66,
        33,0,2257,2259,5,87,0,0,2258,2260,3,48,24,0,2259,2258,1,0,0,0,2259,
        2260,1,0,0,0,2260,2261,1,0,0,0,2261,2263,3,2,1,0,2262,2264,3,402,
        201,0,2263,2262,1,0,0,0,2263,2264,1,0,0,0,2264,2319,1,0,0,0,2265,
        2266,3,414,207,0,2266,2268,5,87,0,0,2267,2269,3,48,24,0,2268,2267,
        1,0,0,0,2268,2269,1,0,0,0,2269,2270,1,0,0,0,2270,2272,3,2,1,0,2271,
        2273,3,402,201,0,2272,2271,1,0,0,0,2272,2273,1,0,0,0,2273,2319,1,
        0,0,0,2274,2275,3,24,12,0,2275,2277,5,87,0,0,2276,2278,3,48,24,0,
        2277,2276,1,0,0,0,2277,2278,1,0,0,0,2278,2279,1,0,0,0,2279,2281,
        3,2,1,0,2280,2282,3,402,201,0,2281,2280,1,0,0,0,2281,2282,1,0,0,
        0,2282,2319,1,0,0,0,2283,2284,5,57,0,0,2284,2286,5,87,0,0,2285,2287,
        3,48,24,0,2286,2285,1,0,0,0,2286,2287,1,0,0,0,2287,2288,1,0,0,0,
        2288,2290,3,2,1,0,2289,2291,3,402,201,0,2290,2289,1,0,0,0,2290,2291,
        1,0,0,0,2291,2319,1,0,0,0,2292,2293,3,62,31,0,2293,2294,5,84,0,0,
        2294,2295,5,57,0,0,2295,2297,5,87,0,0,2296,2298,3,48,24,0,2297,2296,
        1,0,0,0,2297,2298,1,0,0,0,2298,2299,1,0,0,0,2299,2301,3,2,1,0,2300,
        2302,3,402,201,0,2301,2300,1,0,0,0,2301,2302,1,0,0,0,2302,2319,1,
        0,0,0,2303,2304,3,30,15,0,2304,2306,5,87,0,0,2305,2307,3,48,24,0,
        2306,2305,1,0,0,0,2306,2307,1,0,0,0,2307,2308,1,0,0,0,2308,2310,
        5,48,0,0,2309,2311,3,402,201,0,2310,2309,1,0,0,0,2310,2311,1,0,0,
        0,2311,2319,1,0,0,0,2312,2313,3,36,18,0,2313,2314,5,87,0,0,2314,
        2316,5,48,0,0,2315,2317,3,402,201,0,2316,2315,1,0,0,0,2316,2317,
        1,0,0,0,2317,2319,1,0,0,0,2318,2101,1,0,0,0,2318,2105,1,0,0,0,2318,
        2109,1,0,0,0,2318,2113,1,0,0,0,2318,2119,1,0,0,0,2318,2125,1,0,0,
        0,2318,2129,1,0,0,0,2318,2135,1,0,0,0,2318,2141,1,0,0,0,2318,2147,
        1,0,0,0,2318,2153,1,0,0,0,2318,2161,1,0,0,0,2318,2168,1,0,0,0,2318,
        2175,1,0,0,0,2318,2184,1,0,0,0,2318,2198,1,0,0,0,2318,2212,1,0,0,
        0,2318,2226,1,0,0,0,2318,2240,1,0,0,0,2318,2256,1,0,0,0,2318,2265,
        1,0,0,0,2318,2274,1,0,0,0,2318,2283,1,0,0,0,2318,2292,1,0,0,0,2318,
        2303,1,0,0,0,2318,2312,1,0,0,0,2319,401,1,0,0,0,2320,2321,5,84,0,
        0,2321,2323,3,408,204,0,2322,2324,3,402,201,0,2323,2322,1,0,0,0,
        2323,2324,1,0,0,0,2324,2358,1,0,0,0,2325,2326,5,84,0,0,2326,2328,
        3,2,1,0,2327,2329,3,402,201,0,2328,2327,1,0,0,0,2328,2329,1,0,0,
        0,2329,2358,1,0,0,0,2330,2331,5,80,0,0,2331,2332,3,396,198,0,2332,
        2334,5,81,0,0,2333,2335,3,402,201,0,2334,2333,1,0,0,0,2334,2335,
        1,0,0,0,2335,2358,1,0,0,0,2336,2338,5,84,0,0,2337,2339,3,48,24,0,
        2338,2337,1,0,0,0,2338,2339,1,0,0,0,2339,2340,1,0,0,0,2340,2341,
        3,2,1,0,2341,2343,5,76,0,0,2342,2344,3,430,215,0,2343,2342,1,0,0,
        0,2343,2344,1,0,0,0,2344,2345,1,0,0,0,2345,2347,5,77,0,0,2346,2348,
        3,402,201,0,2347,2346,1,0,0,0,2347,2348,1,0,0,0,2348,2358,1,0,0,
        0,2349,2351,5,87,0,0,2350,2352,3,48,24,0,2351,2350,1,0,0,0,2351,
        2352,1,0,0,0,2352,2353,1,0,0,0,2353,2355,3,2,1,0,2354,2356,3,402,
        201,0,2355,2354,1,0,0,0,2355,2356,1,0,0,0,2356,2358,1,0,0,0,2357,
        2320,1,0,0,0,2357,2325,1,0,0,0,2357,2330,1,0,0,0,2357,2336,1,0,0,
        0,2357,2349,1,0,0,0,2358,403,1,0,0,0,2359,2364,3,62,31,0,2360,2361,
        5,80,0,0,2361,2363,5,81,0,0,2362,2360,1,0,0,0,2363,2366,1,0,0,0,
        2364,2362,1,0,0,0,2364,2365,1,0,0,0,2365,2367,1,0,0,0,2366,2364,
        1,0,0,0,2367,2368,5,84,0,0,2368,2369,5,26,0,0,2369,2395,1,0,0,0,
        2370,2375,3,18,9,0,2371,2372,5,80,0,0,2372,2374,5,81,0,0,2373,2371,
        1,0,0,0,2374,2377,1,0,0,0,2375,2373,1,0,0,0,2375,2376,1,0,0,0,2376,
        2378,1,0,0,0,2377,2375,1,0,0,0,2378,2379,5,84,0,0,2379,2380,5,26,
        0,0,2380,2395,1,0,0,0,2381,2386,5,20,0,0,2382,2383,5,80,0,0,2383,
        2385,5,81,0,0,2384,2382,1,0,0,0,2385,2388,1,0,0,0,2386,2384,1,0,
        0,0,2386,2387,1,0,0,0,2387,2389,1,0,0,0,2388,2386,1,0,0,0,2389,2390,
        5,84,0,0,2390,2395,5,26,0,0,2391,2392,5,65,0,0,2392,2393,5,84,0,
        0,2393,2395,5,26,0,0,2394,2359,1,0,0,0,2394,2370,1,0,0,0,2394,2381,
        1,0,0,0,2394,2391,1,0,0,0,2395,405,1,0,0,0,2396,2406,3,408,204,0,
        2397,2398,3,66,33,0,2398,2399,5,84,0,0,2399,2400,3,408,204,0,2400,
        2406,1,0,0,0,2401,2402,3,398,199,0,2402,2403,5,84,0,0,2403,2404,
        3,408,204,0,2404,2406,1,0,0,0,2405,2396,1,0,0,0,2405,2397,1,0,0,
        0,2405,2401,1,0,0,0,2406,407,1,0,0,0,2407,2409,5,48,0,0,2408,2410,
        3,48,24,0,2409,2408,1,0,0,0,2409,2410,1,0,0,0,2410,2411,1,0,0,0,
        2411,2412,3,410,205,0,2412,2414,5,76,0,0,2413,2415,3,430,215,0,2414,
        2413,1,0,0,0,2414,2415,1,0,0,0,2415,2416,1,0,0,0,2416,2418,5,77,
        0,0,2417,2419,3,118,59,0,2418,2417,1,0,0,0,2418,2419,1,0,0,0,2419,
        409,1,0,0,0,2420,2422,3,262,131,0,2421,2420,1,0,0,0,2422,2425,1,
        0,0,0,2423,2421,1,0,0,0,2423,2424,1,0,0,0,2424,2426,1,0,0,0,2425,
        2423,1,0,0,0,2426,2437,3,2,1,0,2427,2431,5,84,0,0,2428,2430,3,262,
        131,0,2429,2428,1,0,0,0,2430,2433,1,0,0,0,2431,2429,1,0,0,0,2431,
        2432,1,0,0,0,2432,2434,1,0,0,0,2433,2431,1,0,0,0,2434,2436,3,2,1,
        0,2435,2427,1,0,0,0,2436,2439,1,0,0,0,2437,2435,1,0,0,0,2437,2438,
        1,0,0,0,2438,2441,1,0,0,0,2439,2437,1,0,0,0,2440,2442,3,412,206,
        0,2441,2440,1,0,0,0,2441,2442,1,0,0,0,2442,411,1,0,0,0,2443,2446,
        3,48,24,0,2444,2446,5,4,0,0,2445,2443,1,0,0,0,2445,2444,1,0,0,0,
        2446,413,1,0,0,0,2447,2450,3,416,208,0,2448,2450,3,418,209,0,2449,
        2447,1,0,0,0,2449,2448,1,0,0,0,2450,415,1,0,0,0,2451,2452,5,48,0,
        0,2452,2453,3,16,8,0,2453,2455,3,420,210,0,2454,2456,3,38,19,0,2455,
        2454,1,0,0,0,2455,2456,1,0,0,0,2456,2464,1,0,0,0,2457,2458,5,48,
        0,0,2458,2459,3,30,15,0,2459,2461,3,420,210,0,2460,2462,3,38,19,
        0,2461,2460,1,0,0,0,2461,2462,1,0,0,0,2462,2464,1,0,0,0,2463,2451,
        1,0,0,0,2463,2457,1,0,0,0,2464,417,1,0,0,0,2465,2466,5,48,0,0,2466,
        2467,3,16,8,0,2467,2468,3,38,19,0,2468,2469,3,280,140,0,2469,2476,
        1,0,0,0,2470,2471,5,48,0,0,2471,2472,3,28,14,0,2472,2473,3,38,19,
        0,2473,2474,3,280,140,0,2474,2476,1,0,0,0,2475,2465,1,0,0,0,2475,
        2470,1,0,0,0,2476,419,1,0,0,0,2477,2481,3,422,211,0,2478,2480,3,
        422,211,0,2479,2478,1,0,0,0,2480,2483,1,0,0,0,2481,2479,1,0,0,0,
        2481,2482,1,0,0,0,2482,421,1,0,0,0,2483,2481,1,0,0,0,2484,2486,3,
        262,131,0,2485,2484,1,0,0,0,2486,2489,1,0,0,0,2487,2485,1,0,0,0,
        2487,2488,1,0,0,0,2488,2490,1,0,0,0,2489,2487,1,0,0,0,2490,2491,
        5,80,0,0,2491,2492,3,396,198,0,2492,2493,5,81,0,0,2493,423,1,0,0,
        0,2494,2495,3,66,33,0,2495,2496,5,80,0,0,2496,2497,3,396,198,0,2497,
        2498,5,81,0,0,2498,2510,1,0,0,0,2499,2500,3,400,200,0,2500,2501,
        5,80,0,0,2501,2502,3,396,198,0,2502,2503,5,81,0,0,2503,2510,1,0,
        0,0,2504,2505,3,418,209,0,2505,2506,5,80,0,0,2506,2507,3,396,198,
        0,2507,2508,5,81,0,0,2508,2510,1,0,0,0,2509,2494,1,0,0,0,2509,2499,
        1,0,0,0,2509,2504,1,0,0,0,2510,425,1,0,0,0,2511,2512,3,398,199,0,
        2512,2513,5,84,0,0,2513,2514,3,2,1,0,2514,2525,1,0,0,0,2515,2516,
        5,57,0,0,2516,2517,5,84,0,0,2517,2525,3,2,1,0,2518,2519,3,62,31,
        0,2519,2520,5,84,0,0,2520,2521,5,57,0,0,2521,2522,5,84,0,0,2522,
        2523,3,2,1,0,2523,2525,1,0,0,0,2524,2511,1,0,0,0,2524,2515,1,0,0,
        0,2524,2518,1,0,0,0,2525,427,1,0,0,0,2526,2527,3,68,34,0,2527,2529,
        5,76,0,0,2528,2530,3,430,215,0,2529,2528,1,0,0,0,2529,2530,1,0,0,
        0,2530,2531,1,0,0,0,2531,2532,5,77,0,0,2532,2596,1,0,0,0,2533,2534,
        3,62,31,0,2534,2536,5,84,0,0,2535,2537,3,48,24,0,2536,2535,1,0,0,
        0,2536,2537,1,0,0,0,2537,2538,1,0,0,0,2538,2539,3,2,1,0,2539,2541,
        5,76,0,0,2540,2542,3,430,215,0,2541,2540,1,0,0,0,2541,2542,1,0,0,
        0,2542,2543,1,0,0,0,2543,2544,5,77,0,0,2544,2596,1,0,0,0,2545,2546,
        3,66,33,0,2546,2548,5,84,0,0,2547,2549,3,48,24,0,2548,2547,1,0,0,
        0,2548,2549,1,0,0,0,2549,2550,1,0,0,0,2550,2551,3,2,1,0,2551,2553,
        5,76,0,0,2552,2554,3,430,215,0,2553,2552,1,0,0,0,2553,2554,1,0,0,
        0,2554,2555,1,0,0,0,2555,2556,5,77,0,0,2556,2596,1,0,0,0,2557,2558,
        3,398,199,0,2558,2560,5,84,0,0,2559,2561,3,48,24,0,2560,2559,1,0,
        0,0,2560,2561,1,0,0,0,2561,2562,1,0,0,0,2562,2563,3,2,1,0,2563,2565,
        5,76,0,0,2564,2566,3,430,215,0,2565,2564,1,0,0,0,2565,2566,1,0,0,
        0,2566,2567,1,0,0,0,2567,2568,5,77,0,0,2568,2596,1,0,0,0,2569,2570,
        5,57,0,0,2570,2572,5,84,0,0,2571,2573,3,48,24,0,2572,2571,1,0,0,
        0,2572,2573,1,0,0,0,2573,2574,1,0,0,0,2574,2575,3,2,1,0,2575,2577,
        5,76,0,0,2576,2578,3,430,215,0,2577,2576,1,0,0,0,2577,2578,1,0,0,
        0,2578,2579,1,0,0,0,2579,2580,5,77,0,0,2580,2596,1,0,0,0,2581,2582,
        3,62,31,0,2582,2583,5,84,0,0,2583,2584,5,57,0,0,2584,2586,5,84,0,
        0,2585,2587,3,48,24,0,2586,2585,1,0,0,0,2586,2587,1,0,0,0,2587,2588,
        1,0,0,0,2588,2589,3,2,1,0,2589,2591,5,76,0,0,2590,2592,3,430,215,
        0,2591,2590,1,0,0,0,2591,2592,1,0,0,0,2592,2593,1,0,0,0,2593,2594,
        5,77,0,0,2594,2596,1,0,0,0,2595,2526,1,0,0,0,2595,2533,1,0,0,0,2595,
        2545,1,0,0,0,2595,2557,1,0,0,0,2595,2569,1,0,0,0,2595,2581,1,0,0,
        0,2596,429,1,0,0,0,2597,2602,3,396,198,0,2598,2599,5,83,0,0,2599,
        2601,3,396,198,0,2600,2598,1,0,0,0,2601,2604,1,0,0,0,2602,2600,1,
        0,0,0,2602,2603,1,0,0,0,2603,431,1,0,0,0,2604,2602,1,0,0,0,2605,
        2606,3,66,33,0,2606,2608,5,87,0,0,2607,2609,3,48,24,0,2608,2607,
        1,0,0,0,2608,2609,1,0,0,0,2609,2610,1,0,0,0,2610,2611,3,2,1,0,2611,
        2653,1,0,0,0,2612,2613,3,398,199,0,2613,2615,5,87,0,0,2614,2616,
        3,48,24,0,2615,2614,1,0,0,0,2615,2616,1,0,0,0,2616,2617,1,0,0,0,
        2617,2618,3,2,1,0,2618,2653,1,0,0,0,2619,2620,3,24,12,0,2620,2622,
        5,87,0,0,2621,2623,3,48,24,0,2622,2621,1,0,0,0,2622,2623,1,0,0,0,
        2623,2624,1,0,0,0,2624,2625,3,2,1,0,2625,2653,1,0,0,0,2626,2627,
        5,57,0,0,2627,2629,5,87,0,0,2628,2630,3,48,24,0,2629,2628,1,0,0,
        0,2629,2630,1,0,0,0,2630,2631,1,0,0,0,2631,2653,3,2,1,0,2632,2633,
        3,62,31,0,2633,2634,5,84,0,0,2634,2635,5,57,0,0,2635,2637,5,87,0,
        0,2636,2638,3,48,24,0,2637,2636,1,0,0,0,2637,2638,1,0,0,0,2638,2639,
        1,0,0,0,2639,2640,3,2,1,0,2640,2653,1,0,0,0,2641,2642,3,30,15,0,
        2642,2644,5,87,0,0,2643,2645,3,48,24,0,2644,2643,1,0,0,0,2644,2645,
        1,0,0,0,2645,2646,1,0,0,0,2646,2647,5,48,0,0,2647,2653,1,0,0,0,2648,
        2649,3,36,18,0,2649,2650,5,87,0,0,2650,2651,5,48,0,0,2651,2653,1,
        0,0,0,2652,2605,1,0,0,0,2652,2612,1,0,0,0,2652,2619,1,0,0,0,2652,
        2626,1,0,0,0,2652,2632,1,0,0,0,2652,2641,1,0,0,0,2652,2648,1,0,0,
        0,2653,433,1,0,0,0,2654,2656,3,398,199,0,2655,2657,3,436,218,0,2656,
        2655,1,0,0,0,2656,2657,1,0,0,0,2657,2663,1,0,0,0,2658,2660,3,66,
        33,0,2659,2661,3,436,218,0,2660,2659,1,0,0,0,2660,2661,1,0,0,0,2661,
        2663,1,0,0,0,2662,2654,1,0,0,0,2662,2658,1,0,0,0,2663,435,1,0,0,
        0,2664,2666,5,102,0,0,2665,2667,3,436,218,0,2666,2665,1,0,0,0,2666,
        2667,1,0,0,0,2667,2673,1,0,0,0,2668,2670,5,103,0,0,2669,2671,3,436,
        218,0,2670,2669,1,0,0,0,2670,2671,1,0,0,0,2671,2673,1,0,0,0,2672,
        2664,1,0,0,0,2672,2668,1,0,0,0,2673,437,1,0,0,0,2674,2675,3,434,
        217,0,2675,2676,5,102,0,0,2676,439,1,0,0,0,2677,2678,3,434,217,0,
        2678,2679,5,103,0,0,2679,441,1,0,0,0,2680,2688,3,444,222,0,2681,
        2688,3,446,223,0,2682,2683,5,104,0,0,2683,2688,3,442,221,0,2684,
        2685,5,105,0,0,2685,2688,3,442,221,0,2686,2688,3,448,224,0,2687,
        2680,1,0,0,0,2687,2681,1,0,0,0,2687,2682,1,0,0,0,2687,2684,1,0,0,
        0,2687,2686,1,0,0,0,2688,443,1,0,0,0,2689,2690,5,102,0,0,2690,2691,
        3,442,221,0,2691,445,1,0,0,0,2692,2693,5,103,0,0,2693,2694,3,442,
        221,0,2694,447,1,0,0,0,2695,2703,3,434,217,0,2696,2697,5,92,0,0,
        2697,2703,3,442,221,0,2698,2699,5,91,0,0,2699,2703,3,442,221,0,2700,
        2703,3,450,225,0,2701,2703,3,494,247,0,2702,2695,1,0,0,0,2702,2696,
        1,0,0,0,2702,2698,1,0,0,0,2702,2700,1,0,0,0,2702,2701,1,0,0,0,2703,
        449,1,0,0,0,2704,2705,5,76,0,0,2705,2706,3,16,8,0,2706,2707,5,77,
        0,0,2707,2708,3,442,221,0,2708,2732,1,0,0,0,2709,2710,5,76,0,0,2710,
        2714,3,24,12,0,2711,2713,3,46,23,0,2712,2711,1,0,0,0,2713,2716,1,
        0,0,0,2714,2712,1,0,0,0,2714,2715,1,0,0,0,2715,2717,1,0,0,0,2716,
        2714,1,0,0,0,2717,2718,5,77,0,0,2718,2719,3,448,224,0,2719,2732,
        1,0,0,0,2720,2721,5,76,0,0,2721,2725,3,24,12,0,2722,2724,3,46,23,
        0,2723,2722,1,0,0,0,2724,2727,1,0,0,0,2725,2723,1,0,0,0,2725,2726,
        1,0,0,0,2726,2728,1,0,0,0,2727,2725,1,0,0,0,2728,2729,5,77,0,0,2729,
        2730,3,482,241,0,2730,2732,1,0,0,0,2731,2704,1,0,0,0,2731,2709,1,
        0,0,0,2731,2720,1,0,0,0,2732,451,1,0,0,0,2733,2734,6,226,-1,0,2734,
        2735,3,442,221,0,2735,2747,1,0,0,0,2736,2737,10,3,0,0,2737,2738,
        5,106,0,0,2738,2746,3,442,221,0,2739,2740,10,2,0,0,2740,2741,5,107,
        0,0,2741,2746,3,442,221,0,2742,2743,10,1,0,0,2743,2744,5,111,0,0,
        2744,2746,3,442,221,0,2745,2736,1,0,0,0,2745,2739,1,0,0,0,2745,2742,
        1,0,0,0,2746,2749,1,0,0,0,2747,2745,1,0,0,0,2747,2748,1,0,0,0,2748,
        453,1,0,0,0,2749,2747,1,0,0,0,2750,2751,6,227,-1,0,2751,2752,3,452,
        226,0,2752,2761,1,0,0,0,2753,2754,10,2,0,0,2754,2755,5,104,0,0,2755,
        2760,3,452,226,0,2756,2757,10,1,0,0,2757,2758,5,105,0,0,2758,2760,
        3,452,226,0,2759,2753,1,0,0,0,2759,2756,1,0,0,0,2760,2763,1,0,0,
        0,2761,2759,1,0,0,0,2761,2762,1,0,0,0,2762,455,1,0,0,0,2763,2761,
        1,0,0,0,2764,2765,6,228,-1,0,2765,2766,3,454,227,0,2766,2782,1,0,
        0,0,2767,2768,10,3,0,0,2768,2769,5,90,0,0,2769,2770,5,90,0,0,2770,
        2781,3,454,227,0,2771,2772,10,2,0,0,2772,2773,5,89,0,0,2773,2774,
        5,89,0,0,2774,2781,3,454,227,0,2775,2776,10,1,0,0,2776,2777,5,89,
        0,0,2777,2778,5,89,0,0,2778,2779,5,89,0,0,2779,2781,3,454,227,0,
        2780,2767,1,0,0,0,2780,2771,1,0,0,0,2780,2775,1,0,0,0,2781,2784,
        1,0,0,0,2782,2780,1,0,0,0,2782,2783,1,0,0,0,2783,457,1,0,0,0,2784,
        2782,1,0,0,0,2785,2786,6,229,-1,0,2786,2787,3,456,228,0,2787,2808,
        1,0,0,0,2788,2789,10,5,0,0,2789,2790,5,90,0,0,2790,2807,3,456,228,
        0,2791,2792,10,4,0,0,2792,2793,5,89,0,0,2793,2807,3,456,228,0,2794,
        2795,10,3,0,0,2795,2796,5,97,0,0,2796,2807,3,456,228,0,2797,2798,
        10,2,0,0,2798,2799,5,98,0,0,2799,2807,3,456,228,0,2800,2801,10,1,
        0,0,2801,2804,5,43,0,0,2802,2805,3,24,12,0,2803,2805,3,392,196,0,
        2804,2802,1,0,0,0,2804,2803,1,0,0,0,2805,2807,1,0,0,0,2806,2788,
        1,0,0,0,2806,2791,1,0,0,0,2806,2794,1,0,0,0,2806,2797,1,0,0,0,2806,
        2800,1,0,0,0,2807,2810,1,0,0,0,2808,2806,1,0,0,0,2808,2809,1,0,0,
        0,2809,459,1,0,0,0,2810,2808,1,0,0,0,2811,2812,6,230,-1,0,2812,2813,
        3,458,229,0,2813,2822,1,0,0,0,2814,2815,10,2,0,0,2815,2816,5,96,
        0,0,2816,2821,3,458,229,0,2817,2818,10,1,0,0,2818,2819,5,99,0,0,
        2819,2821,3,458,229,0,2820,2814,1,0,0,0,2820,2817,1,0,0,0,2821,2824,
        1,0,0,0,2822,2820,1,0,0,0,2822,2823,1,0,0,0,2823,461,1,0,0,0,2824,
        2822,1,0,0,0,2825,2826,6,231,-1,0,2826,2827,3,460,230,0,2827,2833,
        1,0,0,0,2828,2829,10,1,0,0,2829,2830,5,108,0,0,2830,2832,3,460,230,
        0,2831,2828,1,0,0,0,2832,2835,1,0,0,0,2833,2831,1,0,0,0,2833,2834,
        1,0,0,0,2834,463,1,0,0,0,2835,2833,1,0,0,0,2836,2837,6,232,-1,0,
        2837,2838,3,462,231,0,2838,2844,1,0,0,0,2839,2840,10,1,0,0,2840,
        2841,5,110,0,0,2841,2843,3,462,231,0,2842,2839,1,0,0,0,2843,2846,
        1,0,0,0,2844,2842,1,0,0,0,2844,2845,1,0,0,0,2845,465,1,0,0,0,2846,
        2844,1,0,0,0,2847,2848,6,233,-1,0,2848,2849,3,464,232,0,2849,2855,
        1,0,0,0,2850,2851,10,1,0,0,2851,2852,5,109,0,0,2852,2854,3,464,232,
        0,2853,2850,1,0,0,0,2854,2857,1,0,0,0,2855,2853,1,0,0,0,2855,2856,
        1,0,0,0,2856,467,1,0,0,0,2857,2855,1,0,0,0,2858,2859,6,234,-1,0,
        2859,2860,3,466,233,0,2860,2866,1,0,0,0,2861,2862,10,1,0,0,2862,
        2863,5,100,0,0,2863,2865,3,466,233,0,2864,2861,1,0,0,0,2865,2868,
        1,0,0,0,2866,2864,1,0,0,0,2866,2867,1,0,0,0,2867,469,1,0,0,0,2868,
        2866,1,0,0,0,2869,2870,6,235,-1,0,2870,2871,3,468,234,0,2871,2877,
        1,0,0,0,2872,2873,10,1,0,0,2873,2874,5,101,0,0,2874,2876,3,468,234,
        0,2875,2872,1,0,0,0,2876,2879,1,0,0,0,2877,2875,1,0,0,0,2877,2878,
        1,0,0,0,2878,471,1,0,0,0,2879,2877,1,0,0,0,2880,2894,3,470,235,0,
        2881,2882,3,470,235,0,2882,2883,5,93,0,0,2883,2884,3,396,198,0,2884,
        2885,5,94,0,0,2885,2886,3,472,236,0,2886,2894,1,0,0,0,2887,2888,
        3,470,235,0,2888,2889,5,93,0,0,2889,2890,3,396,198,0,2890,2891,5,
        94,0,0,2891,2892,3,482,241,0,2892,2894,1,0,0,0,2893,2880,1,0,0,0,
        2893,2881,1,0,0,0,2893,2887,1,0,0,0,2894,473,1,0,0,0,2895,2898,3,
        472,236,0,2896,2898,3,476,238,0,2897,2895,1,0,0,0,2897,2896,1,0,
        0,0,2898,475,1,0,0,0,2899,2900,3,478,239,0,2900,2901,3,480,240,0,
        2901,2902,3,396,198,0,2902,477,1,0,0,0,2903,2907,3,66,33,0,2904,
        2907,3,426,213,0,2905,2907,3,424,212,0,2906,2903,1,0,0,0,2906,2904,
        1,0,0,0,2906,2905,1,0,0,0,2907,479,1,0,0,0,2908,2909,7,8,0,0,2909,
        481,1,0,0,0,2910,2911,3,484,242,0,2911,2912,5,95,0,0,2912,2913,3,
        492,246,0,2913,483,1,0,0,0,2914,2916,5,76,0,0,2915,2917,3,486,243,
        0,2916,2915,1,0,0,0,2916,2917,1,0,0,0,2917,2918,1,0,0,0,2918,2921,
        5,77,0,0,2919,2921,3,2,1,0,2920,2914,1,0,0,0,2920,2919,1,0,0,0,2921,
        485,1,0,0,0,2922,2927,3,488,244,0,2923,2924,5,83,0,0,2924,2926,3,
        488,244,0,2925,2923,1,0,0,0,2926,2929,1,0,0,0,2927,2925,1,0,0,0,
        2927,2928,1,0,0,0,2928,2939,1,0,0,0,2929,2927,1,0,0,0,2930,2935,
        3,2,1,0,2931,2932,5,83,0,0,2932,2934,3,2,1,0,2933,2931,1,0,0,0,2934,
        2937,1,0,0,0,2935,2933,1,0,0,0,2935,2936,1,0,0,0,2936,2939,1,0,0,
        0,2937,2935,1,0,0,0,2938,2922,1,0,0,0,2938,2930,1,0,0,0,2939,487,
        1,0,0,0,2940,2942,3,172,86,0,2941,2940,1,0,0,0,2942,2945,1,0,0,0,
        2943,2941,1,0,0,0,2943,2944,1,0,0,0,2944,2946,1,0,0,0,2945,2943,
        1,0,0,0,2946,2947,3,490,245,0,2947,2948,3,132,66,0,2948,2951,1,0,
        0,0,2949,2951,3,170,85,0,2950,2943,1,0,0,0,2950,2949,1,0,0,0,2951,
        489,1,0,0,0,2952,2955,3,136,68,0,2953,2955,5,15,0,0,2954,2952,1,
        0,0,0,2954,2953,1,0,0,0,2955,491,1,0,0,0,2956,2959,3,396,198,0,2957,
        2959,3,284,142,0,2958,2956,1,0,0,0,2958,2957,1,0,0,0,2959,493,1,
        0,0,0,2960,2961,5,58,0,0,2961,2962,5,76,0,0,2962,2963,3,396,198,
        0,2963,2964,5,77,0,0,2964,2965,3,324,162,0,2965,495,1,0,0,0,2966,
        2967,3,396,198,0,2967,497,1,0,0,0,362,503,507,511,524,529,533,542,
        548,553,556,561,566,571,574,579,584,591,596,603,608,610,617,631,
        636,644,651,657,662,672,675,689,694,699,704,710,715,720,725,730,
        735,744,748,751,756,762,768,776,785,796,825,830,834,842,849,858,
        872,875,887,890,906,911,918,923,929,932,935,938,952,963,977,986,
        993,1002,1009,1014,1029,1036,1042,1046,1050,1054,1058,1063,1070,
        1073,1077,1080,1086,1091,1094,1098,1102,1108,1113,1115,1124,1131,
        1147,1153,1156,1161,1165,1172,1175,1179,1184,1191,1200,1206,1213,
        1218,1225,1233,1243,1248,1252,1262,1267,1275,1278,1285,1288,1296,
        1299,1304,1309,1315,1319,1324,1329,1334,1340,1346,1349,1352,1361,
        1367,1373,1376,1379,1387,1393,1399,1403,1409,1418,1424,1431,1436,
        1443,1455,1462,1467,1475,1480,1486,1489,1492,1505,1516,1523,1533,
        1538,1549,1554,1567,1572,1584,1594,1599,1607,1610,1617,1625,1631,
        1640,1650,1654,1657,1666,1680,1683,1692,1697,1705,1711,1715,1720,
        1728,1739,1746,1761,1783,1811,1826,1835,1843,1847,1856,1865,1876,
        1880,1906,1910,1915,1919,1923,1931,1935,1939,1946,1955,1976,1982,
        1988,2013,2018,2024,2036,2047,2057,2060,2065,2074,2079,2083,2095,
        2099,2103,2107,2111,2117,2123,2127,2133,2139,2145,2151,2159,2166,
        2173,2178,2182,2187,2192,2196,2201,2206,2210,2215,2220,2224,2229,
        2234,2238,2245,2250,2254,2259,2263,2268,2272,2277,2281,2286,2290,
        2297,2301,2306,2310,2316,2318,2323,2328,2334,2338,2343,2347,2351,
        2355,2357,2364,2375,2386,2394,2405,2409,2414,2418,2423,2431,2437,
        2441,2445,2449,2455,2461,2463,2475,2481,2487,2509,2524,2529,2536,
        2541,2548,2553,2560,2565,2572,2577,2586,2591,2595,2602,2608,2615,
        2622,2629,2637,2644,2652,2656,2660,2662,2666,2670,2672,2687,2702,
        2714,2725,2731,2745,2747,2759,2761,2780,2782,2804,2806,2808,2820,
        2822,2833,2844,2855,2866,2877,2893,2897,2906,2916,2920,2927,2935,
        2938,2943,2950,2954,2958
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Java20Parser.__ATN) {
            Java20Parser.__ATN = new antlr.ATNDeserializer().deserialize(Java20Parser._serializedATN);
        }

        return Java20Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Java20Parser.literalNames, Java20Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Java20Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Java20Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class Start_Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public compilationUnit(): CompilationUnitContext {
        return this.getRuleContext(0, CompilationUnitContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(Java20Parser.EOF, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_start_;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterStart_) {
             listener.enterStart_(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitStart_) {
             listener.exitStart_(this);
        }
    }
}


export class IdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.Identifier, 0);
    }
    public contextualKeyword(): ContextualKeywordContext | null {
        return this.getRuleContext(0, ContextualKeywordContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_identifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterIdentifier) {
             listener.enterIdentifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitIdentifier) {
             listener.exitIdentifier(this);
        }
    }
}


export class TypeIdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.Identifier, 0);
    }
    public contextualKeywordMinusForTypeIdentifier(): ContextualKeywordMinusForTypeIdentifierContext | null {
        return this.getRuleContext(0, ContextualKeywordMinusForTypeIdentifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeIdentifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeIdentifier) {
             listener.enterTypeIdentifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeIdentifier) {
             listener.exitTypeIdentifier(this);
        }
    }
}


export class UnqualifiedMethodIdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.Identifier, 0);
    }
    public contextualKeywordMinusForUnqualifiedMethodIdentifier(): ContextualKeywordMinusForUnqualifiedMethodIdentifierContext | null {
        return this.getRuleContext(0, ContextualKeywordMinusForUnqualifiedMethodIdentifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_unqualifiedMethodIdentifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUnqualifiedMethodIdentifier) {
             listener.enterUnqualifiedMethodIdentifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUnqualifiedMethodIdentifier) {
             listener.exitUnqualifiedMethodIdentifier(this);
        }
    }
}


export class ContextualKeywordContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EXPORTS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.EXPORTS, 0);
    }
    public MODULE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.MODULE, 0);
    }
    public NONSEALED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.NONSEALED, 0);
    }
    public OPEN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.OPEN, 0);
    }
    public OPENS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.OPENS, 0);
    }
    public PERMITS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PERMITS, 0);
    }
    public PROVIDES(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PROVIDES, 0);
    }
    public RECORD(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.RECORD, 0);
    }
    public REQUIRES(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.REQUIRES, 0);
    }
    public SEALED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SEALED, 0);
    }
    public TO(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.TO, 0);
    }
    public TRANSITIVE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.TRANSITIVE, 0);
    }
    public USES(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.USES, 0);
    }
    public VAR(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.VAR, 0);
    }
    public WITH(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.WITH, 0);
    }
    public YIELD(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.YIELD, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_contextualKeyword;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterContextualKeyword) {
             listener.enterContextualKeyword(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitContextualKeyword) {
             listener.exitContextualKeyword(this);
        }
    }
}


export class ContextualKeywordMinusForTypeIdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EXPORTS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.EXPORTS, 0);
    }
    public MODULE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.MODULE, 0);
    }
    public NONSEALED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.NONSEALED, 0);
    }
    public OPEN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.OPEN, 0);
    }
    public OPENS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.OPENS, 0);
    }
    public PROVIDES(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PROVIDES, 0);
    }
    public REQUIRES(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.REQUIRES, 0);
    }
    public TO(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.TO, 0);
    }
    public TRANSITIVE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.TRANSITIVE, 0);
    }
    public USES(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.USES, 0);
    }
    public WITH(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.WITH, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_contextualKeywordMinusForTypeIdentifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterContextualKeywordMinusForTypeIdentifier) {
             listener.enterContextualKeywordMinusForTypeIdentifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitContextualKeywordMinusForTypeIdentifier) {
             listener.exitContextualKeywordMinusForTypeIdentifier(this);
        }
    }
}


export class ContextualKeywordMinusForUnqualifiedMethodIdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EXPORTS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.EXPORTS, 0);
    }
    public MODULE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.MODULE, 0);
    }
    public NONSEALED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.NONSEALED, 0);
    }
    public OPEN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.OPEN, 0);
    }
    public OPENS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.OPENS, 0);
    }
    public PERMITS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PERMITS, 0);
    }
    public PROVIDES(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PROVIDES, 0);
    }
    public RECORD(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.RECORD, 0);
    }
    public REQUIRES(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.REQUIRES, 0);
    }
    public SEALED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SEALED, 0);
    }
    public TO(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.TO, 0);
    }
    public TRANSITIVE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.TRANSITIVE, 0);
    }
    public USES(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.USES, 0);
    }
    public VAR(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.VAR, 0);
    }
    public WITH(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.WITH, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_contextualKeywordMinusForUnqualifiedMethodIdentifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterContextualKeywordMinusForUnqualifiedMethodIdentifier) {
             listener.enterContextualKeywordMinusForUnqualifiedMethodIdentifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitContextualKeywordMinusForUnqualifiedMethodIdentifier) {
             listener.exitContextualKeywordMinusForUnqualifiedMethodIdentifier(this);
        }
    }
}


export class LiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IntegerLiteral(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.IntegerLiteral, 0);
    }
    public FloatingPointLiteral(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.FloatingPointLiteral, 0);
    }
    public BooleanLiteral(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.BooleanLiteral, 0);
    }
    public CharacterLiteral(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.CharacterLiteral, 0);
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.StringLiteral, 0);
    }
    public TextBlock(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.TextBlock, 0);
    }
    public NullLiteral(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.NullLiteral, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_literal;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}


export class PrimitiveTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public numericType(): NumericTypeContext | null {
        return this.getRuleContext(0, NumericTypeContext);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.BOOLEAN, 0);
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_primitiveType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPrimitiveType) {
             listener.enterPrimitiveType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPrimitiveType) {
             listener.exitPrimitiveType(this);
        }
    }
}


export class NumericTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public integralType(): IntegralTypeContext | null {
        return this.getRuleContext(0, IntegralTypeContext);
    }
    public floatingPointType(): FloatingPointTypeContext | null {
        return this.getRuleContext(0, FloatingPointTypeContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_numericType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterNumericType) {
             listener.enterNumericType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitNumericType) {
             listener.exitNumericType(this);
        }
    }
}


export class IntegralTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BYTE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.BYTE, 0);
    }
    public SHORT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SHORT, 0);
    }
    public INT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.INT, 0);
    }
    public LONG(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.LONG, 0);
    }
    public CHAR(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.CHAR, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_integralType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterIntegralType) {
             listener.enterIntegralType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitIntegralType) {
             listener.exitIntegralType(this);
        }
    }
}


export class FloatingPointTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FLOAT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.FLOAT, 0);
    }
    public DOUBLE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOUBLE, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_floatingPointType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterFloatingPointType) {
             listener.enterFloatingPointType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitFloatingPointType) {
             listener.exitFloatingPointType(this);
        }
    }
}


export class ReferenceTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classOrInterfaceType(): ClassOrInterfaceTypeContext | null {
        return this.getRuleContext(0, ClassOrInterfaceTypeContext);
    }
    public typeVariable(): TypeVariableContext | null {
        return this.getRuleContext(0, TypeVariableContext);
    }
    public arrayType(): ArrayTypeContext | null {
        return this.getRuleContext(0, ArrayTypeContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_referenceType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterReferenceType) {
             listener.enterReferenceType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitReferenceType) {
             listener.exitReferenceType(this);
        }
    }
}


export class CoitContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.DOT, 0)!;
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public coit(): CoitContext | null {
        return this.getRuleContext(0, CoitContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_coit;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterCoit) {
             listener.enterCoit(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitCoit) {
             listener.exitCoit(this);
        }
    }
}


export class ClassOrInterfaceTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public packageName(): PackageNameContext | null {
        return this.getRuleContext(0, PackageNameContext);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public coit(): CoitContext | null {
        return this.getRuleContext(0, CoitContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classOrInterfaceType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassOrInterfaceType) {
             listener.enterClassOrInterfaceType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassOrInterfaceType) {
             listener.exitClassOrInterfaceType(this);
        }
    }
}


export class ClassTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public packageName(): PackageNameContext | null {
        return this.getRuleContext(0, PackageNameContext);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public classOrInterfaceType(): ClassOrInterfaceTypeContext | null {
        return this.getRuleContext(0, ClassOrInterfaceTypeContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassType) {
             listener.enterClassType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassType) {
             listener.exitClassType(this);
        }
    }
}


export class InterfaceTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classType(): ClassTypeContext {
        return this.getRuleContext(0, ClassTypeContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_interfaceType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterInterfaceType) {
             listener.enterInterfaceType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitInterfaceType) {
             listener.exitInterfaceType(this);
        }
    }
}


export class TypeVariableContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeVariable;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeVariable) {
             listener.enterTypeVariable(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeVariable) {
             listener.exitTypeVariable(this);
        }
    }
}


export class ArrayTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public primitiveType(): PrimitiveTypeContext | null {
        return this.getRuleContext(0, PrimitiveTypeContext);
    }
    public dims(): DimsContext {
        return this.getRuleContext(0, DimsContext)!;
    }
    public classType(): ClassTypeContext | null {
        return this.getRuleContext(0, ClassTypeContext);
    }
    public typeVariable(): TypeVariableContext | null {
        return this.getRuleContext(0, TypeVariableContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_arrayType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterArrayType) {
             listener.enterArrayType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitArrayType) {
             listener.exitArrayType(this);
        }
    }
}


export class DimsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACK(): antlr.TerminalNode[];
    public LBRACK(i: number): antlr.TerminalNode | null;
    public LBRACK(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.LBRACK);
    	} else {
    		return this.getToken(Java20Parser.LBRACK, i);
    	}
    }
    public RBRACK(): antlr.TerminalNode[];
    public RBRACK(i: number): antlr.TerminalNode | null;
    public RBRACK(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.RBRACK);
    	} else {
    		return this.getToken(Java20Parser.RBRACK, i);
    	}
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_dims;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterDims) {
             listener.enterDims(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitDims) {
             listener.exitDims(this);
        }
    }
}


export class TypeParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public typeParameterModifier(): TypeParameterModifierContext[];
    public typeParameterModifier(i: number): TypeParameterModifierContext | null;
    public typeParameterModifier(i?: number): TypeParameterModifierContext[] | TypeParameterModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeParameterModifierContext);
        }

        return this.getRuleContext(i, TypeParameterModifierContext);
    }
    public typeBound(): TypeBoundContext | null {
        return this.getRuleContext(0, TypeBoundContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeParameter;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeParameter) {
             listener.enterTypeParameter(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeParameter) {
             listener.exitTypeParameter(this);
        }
    }
}


export class TypeParameterModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext {
        return this.getRuleContext(0, AnnotationContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeParameterModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeParameterModifier) {
             listener.enterTypeParameterModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeParameterModifier) {
             listener.exitTypeParameterModifier(this);
        }
    }
}


export class TypeBoundContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Java20Parser.EXTENDS, 0)!;
    }
    public typeVariable(): TypeVariableContext | null {
        return this.getRuleContext(0, TypeVariableContext);
    }
    public classOrInterfaceType(): ClassOrInterfaceTypeContext | null {
        return this.getRuleContext(0, ClassOrInterfaceTypeContext);
    }
    public additionalBound(): AdditionalBoundContext[];
    public additionalBound(i: number): AdditionalBoundContext | null;
    public additionalBound(i?: number): AdditionalBoundContext[] | AdditionalBoundContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AdditionalBoundContext);
        }

        return this.getRuleContext(i, AdditionalBoundContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeBound;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeBound) {
             listener.enterTypeBound(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeBound) {
             listener.exitTypeBound(this);
        }
    }
}


export class AdditionalBoundContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BITAND(): antlr.TerminalNode {
        return this.getToken(Java20Parser.BITAND, 0)!;
    }
    public interfaceType(): InterfaceTypeContext {
        return this.getRuleContext(0, InterfaceTypeContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_additionalBound;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAdditionalBound) {
             listener.enterAdditionalBound(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAdditionalBound) {
             listener.exitAdditionalBound(this);
        }
    }
}


export class TypeArgumentsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LT, 0)!;
    }
    public typeArgumentList(): TypeArgumentListContext {
        return this.getRuleContext(0, TypeArgumentListContext)!;
    }
    public GT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.GT, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeArguments;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeArguments) {
             listener.enterTypeArguments(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeArguments) {
             listener.exitTypeArguments(this);
        }
    }
}


export class TypeArgumentListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeArgument(): TypeArgumentContext[];
    public typeArgument(i: number): TypeArgumentContext | null;
    public typeArgument(i?: number): TypeArgumentContext[] | TypeArgumentContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeArgumentContext);
        }

        return this.getRuleContext(i, TypeArgumentContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeArgumentList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeArgumentList) {
             listener.enterTypeArgumentList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeArgumentList) {
             listener.exitTypeArgumentList(this);
        }
    }
}


export class TypeArgumentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public referenceType(): ReferenceTypeContext | null {
        return this.getRuleContext(0, ReferenceTypeContext);
    }
    public wildcard(): WildcardContext | null {
        return this.getRuleContext(0, WildcardContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeArgument;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeArgument) {
             listener.enterTypeArgument(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeArgument) {
             listener.exitTypeArgument(this);
        }
    }
}


export class WildcardContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public QUESTION(): antlr.TerminalNode {
        return this.getToken(Java20Parser.QUESTION, 0)!;
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public wildcardBounds(): WildcardBoundsContext | null {
        return this.getRuleContext(0, WildcardBoundsContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_wildcard;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterWildcard) {
             listener.enterWildcard(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitWildcard) {
             listener.exitWildcard(this);
        }
    }
}


export class WildcardBoundsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.EXTENDS, 0);
    }
    public referenceType(): ReferenceTypeContext {
        return this.getRuleContext(0, ReferenceTypeContext)!;
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SUPER, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_wildcardBounds;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterWildcardBounds) {
             listener.enterWildcardBounds(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitWildcardBounds) {
             listener.exitWildcardBounds(this);
        }
    }
}


export class ModuleNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public moduleName(): ModuleNameContext | null {
        return this.getRuleContext(0, ModuleNameContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_moduleName;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterModuleName) {
             listener.enterModuleName(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitModuleName) {
             listener.exitModuleName(this);
        }
    }
}


export class PackageNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public packageName(): PackageNameContext | null {
        return this.getRuleContext(0, PackageNameContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_packageName;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPackageName) {
             listener.enterPackageName(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPackageName) {
             listener.exitPackageName(this);
        }
    }
}


export class TypeNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public packageName(): PackageNameContext {
        return this.getRuleContext(0, PackageNameContext)!;
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public typeIdentifier(): TypeIdentifierContext | null {
        return this.getRuleContext(0, TypeIdentifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeName;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeName) {
             listener.enterTypeName(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeName) {
             listener.exitTypeName(this);
        }
    }
}


export class PackageOrTypeNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public packageOrTypeName(): PackageOrTypeNameContext | null {
        return this.getRuleContext(0, PackageOrTypeNameContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_packageOrTypeName;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPackageOrTypeName) {
             listener.enterPackageOrTypeName(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPackageOrTypeName) {
             listener.exitPackageOrTypeName(this);
        }
    }
}


export class ExpressionNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public ambiguousName(): AmbiguousNameContext | null {
        return this.getRuleContext(0, AmbiguousNameContext);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_expressionName;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterExpressionName) {
             listener.enterExpressionName(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitExpressionName) {
             listener.exitExpressionName(this);
        }
    }
}


export class MethodNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unqualifiedMethodIdentifier(): UnqualifiedMethodIdentifierContext {
        return this.getRuleContext(0, UnqualifiedMethodIdentifierContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_methodName;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterMethodName) {
             listener.enterMethodName(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitMethodName) {
             listener.exitMethodName(this);
        }
    }
}


export class AmbiguousNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public ambiguousName(): AmbiguousNameContext | null {
        return this.getRuleContext(0, AmbiguousNameContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_ambiguousName;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAmbiguousName) {
             listener.enterAmbiguousName(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAmbiguousName) {
             listener.exitAmbiguousName(this);
        }
    }
}


export class CompilationUnitContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ordinaryCompilationUnit(): OrdinaryCompilationUnitContext | null {
        return this.getRuleContext(0, OrdinaryCompilationUnitContext);
    }
    public modularCompilationUnit(): ModularCompilationUnitContext | null {
        return this.getRuleContext(0, ModularCompilationUnitContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_compilationUnit;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterCompilationUnit) {
             listener.enterCompilationUnit(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitCompilationUnit) {
             listener.exitCompilationUnit(this);
        }
    }
}


export class OrdinaryCompilationUnitContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public packageDeclaration(): PackageDeclarationContext | null {
        return this.getRuleContext(0, PackageDeclarationContext);
    }
    public importDeclaration(): ImportDeclarationContext[];
    public importDeclaration(i: number): ImportDeclarationContext | null;
    public importDeclaration(i?: number): ImportDeclarationContext[] | ImportDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ImportDeclarationContext);
        }

        return this.getRuleContext(i, ImportDeclarationContext);
    }
    public topLevelClassOrInterfaceDeclaration(): TopLevelClassOrInterfaceDeclarationContext[];
    public topLevelClassOrInterfaceDeclaration(i: number): TopLevelClassOrInterfaceDeclarationContext | null;
    public topLevelClassOrInterfaceDeclaration(i?: number): TopLevelClassOrInterfaceDeclarationContext[] | TopLevelClassOrInterfaceDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TopLevelClassOrInterfaceDeclarationContext);
        }

        return this.getRuleContext(i, TopLevelClassOrInterfaceDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_ordinaryCompilationUnit;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterOrdinaryCompilationUnit) {
             listener.enterOrdinaryCompilationUnit(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitOrdinaryCompilationUnit) {
             listener.exitOrdinaryCompilationUnit(this);
        }
    }
}


export class ModularCompilationUnitContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public moduleDeclaration(): ModuleDeclarationContext {
        return this.getRuleContext(0, ModuleDeclarationContext)!;
    }
    public importDeclaration(): ImportDeclarationContext[];
    public importDeclaration(i: number): ImportDeclarationContext | null;
    public importDeclaration(i?: number): ImportDeclarationContext[] | ImportDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ImportDeclarationContext);
        }

        return this.getRuleContext(i, ImportDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_modularCompilationUnit;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterModularCompilationUnit) {
             listener.enterModularCompilationUnit(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitModularCompilationUnit) {
             listener.exitModularCompilationUnit(this);
        }
    }
}


export class PackageDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PACKAGE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.PACKAGE, 0)!;
    }
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public packageModifier(): PackageModifierContext[];
    public packageModifier(i: number): PackageModifierContext | null;
    public packageModifier(i?: number): PackageModifierContext[] | PackageModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PackageModifierContext);
        }

        return this.getRuleContext(i, PackageModifierContext);
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.DOT);
    	} else {
    		return this.getToken(Java20Parser.DOT, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_packageDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPackageDeclaration) {
             listener.enterPackageDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPackageDeclaration) {
             listener.exitPackageDeclaration(this);
        }
    }
}


export class PackageModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext {
        return this.getRuleContext(0, AnnotationContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_packageModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPackageModifier) {
             listener.enterPackageModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPackageModifier) {
             listener.exitPackageModifier(this);
        }
    }
}


export class ImportDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public singleTypeImportDeclaration(): SingleTypeImportDeclarationContext | null {
        return this.getRuleContext(0, SingleTypeImportDeclarationContext);
    }
    public typeImportOnDemandDeclaration(): TypeImportOnDemandDeclarationContext | null {
        return this.getRuleContext(0, TypeImportOnDemandDeclarationContext);
    }
    public singleStaticImportDeclaration(): SingleStaticImportDeclarationContext | null {
        return this.getRuleContext(0, SingleStaticImportDeclarationContext);
    }
    public staticImportOnDemandDeclaration(): StaticImportOnDemandDeclarationContext | null {
        return this.getRuleContext(0, StaticImportOnDemandDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_importDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterImportDeclaration) {
             listener.enterImportDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitImportDeclaration) {
             listener.exitImportDeclaration(this);
        }
    }
}


export class SingleTypeImportDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.IMPORT, 0)!;
    }
    public typeName(): TypeNameContext {
        return this.getRuleContext(0, TypeNameContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_singleTypeImportDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterSingleTypeImportDeclaration) {
             listener.enterSingleTypeImportDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitSingleTypeImportDeclaration) {
             listener.exitSingleTypeImportDeclaration(this);
        }
    }
}


export class TypeImportOnDemandDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.IMPORT, 0)!;
    }
    public packageOrTypeName(): PackageOrTypeNameContext {
        return this.getRuleContext(0, PackageOrTypeNameContext)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.DOT, 0)!;
    }
    public MUL(): antlr.TerminalNode {
        return this.getToken(Java20Parser.MUL, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeImportOnDemandDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeImportOnDemandDeclaration) {
             listener.enterTypeImportOnDemandDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeImportOnDemandDeclaration) {
             listener.exitTypeImportOnDemandDeclaration(this);
        }
    }
}


export class SingleStaticImportDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.IMPORT, 0)!;
    }
    public STATIC(): antlr.TerminalNode {
        return this.getToken(Java20Parser.STATIC, 0)!;
    }
    public typeName(): TypeNameContext {
        return this.getRuleContext(0, TypeNameContext)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.DOT, 0)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_singleStaticImportDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterSingleStaticImportDeclaration) {
             listener.enterSingleStaticImportDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitSingleStaticImportDeclaration) {
             listener.exitSingleStaticImportDeclaration(this);
        }
    }
}


export class StaticImportOnDemandDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.IMPORT, 0)!;
    }
    public STATIC(): antlr.TerminalNode {
        return this.getToken(Java20Parser.STATIC, 0)!;
    }
    public typeName(): TypeNameContext {
        return this.getRuleContext(0, TypeNameContext)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.DOT, 0)!;
    }
    public MUL(): antlr.TerminalNode {
        return this.getToken(Java20Parser.MUL, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_staticImportOnDemandDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterStaticImportOnDemandDeclaration) {
             listener.enterStaticImportOnDemandDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitStaticImportOnDemandDeclaration) {
             listener.exitStaticImportOnDemandDeclaration(this);
        }
    }
}


export class TopLevelClassOrInterfaceDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classDeclaration(): ClassDeclarationContext | null {
        return this.getRuleContext(0, ClassDeclarationContext);
    }
    public interfaceDeclaration(): InterfaceDeclarationContext | null {
        return this.getRuleContext(0, InterfaceDeclarationContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SEMI, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_topLevelClassOrInterfaceDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTopLevelClassOrInterfaceDeclaration) {
             listener.enterTopLevelClassOrInterfaceDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTopLevelClassOrInterfaceDeclaration) {
             listener.exitTopLevelClassOrInterfaceDeclaration(this);
        }
    }
}


export class ModuleDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MODULE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.MODULE, 0)!;
    }
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACE, 0)!;
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public OPEN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.OPEN, 0);
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.DOT);
    	} else {
    		return this.getToken(Java20Parser.DOT, i);
    	}
    }
    public moduleDirective(): ModuleDirectiveContext[];
    public moduleDirective(i: number): ModuleDirectiveContext | null;
    public moduleDirective(i?: number): ModuleDirectiveContext[] | ModuleDirectiveContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModuleDirectiveContext);
        }

        return this.getRuleContext(i, ModuleDirectiveContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_moduleDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterModuleDeclaration) {
             listener.enterModuleDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitModuleDeclaration) {
             listener.exitModuleDeclaration(this);
        }
    }
}


export class ModuleDirectiveContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public REQUIRES(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.REQUIRES, 0);
    }
    public moduleName(): ModuleNameContext[];
    public moduleName(i: number): ModuleNameContext | null;
    public moduleName(i?: number): ModuleNameContext[] | ModuleNameContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModuleNameContext);
        }

        return this.getRuleContext(i, ModuleNameContext);
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public requiresModifier(): RequiresModifierContext[];
    public requiresModifier(i: number): RequiresModifierContext | null;
    public requiresModifier(i?: number): RequiresModifierContext[] | RequiresModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RequiresModifierContext);
        }

        return this.getRuleContext(i, RequiresModifierContext);
    }
    public EXPORTS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.EXPORTS, 0);
    }
    public packageName(): PackageNameContext | null {
        return this.getRuleContext(0, PackageNameContext);
    }
    public TO(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.TO, 0);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public OPENS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.OPENS, 0);
    }
    public USES(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.USES, 0);
    }
    public typeName(): TypeNameContext[];
    public typeName(i: number): TypeNameContext | null;
    public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeNameContext);
        }

        return this.getRuleContext(i, TypeNameContext);
    }
    public PROVIDES(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PROVIDES, 0);
    }
    public WITH(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.WITH, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_moduleDirective;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterModuleDirective) {
             listener.enterModuleDirective(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitModuleDirective) {
             listener.exitModuleDirective(this);
        }
    }
}


export class RequiresModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TRANSITIVE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.TRANSITIVE, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.STATIC, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_requiresModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterRequiresModifier) {
             listener.enterRequiresModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitRequiresModifier) {
             listener.exitRequiresModifier(this);
        }
    }
}


export class ClassDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public normalClassDeclaration(): NormalClassDeclarationContext | null {
        return this.getRuleContext(0, NormalClassDeclarationContext);
    }
    public enumDeclaration(): EnumDeclarationContext | null {
        return this.getRuleContext(0, EnumDeclarationContext);
    }
    public recordDeclaration(): RecordDeclarationContext | null {
        return this.getRuleContext(0, RecordDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassDeclaration) {
             listener.enterClassDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassDeclaration) {
             listener.exitClassDeclaration(this);
        }
    }
}


export class NormalClassDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Java20Parser.CLASS, 0)!;
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public classModifier(): ClassModifierContext[];
    public classModifier(i: number): ClassModifierContext | null;
    public classModifier(i?: number): ClassModifierContext[] | ClassModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ClassModifierContext);
        }

        return this.getRuleContext(i, ClassModifierContext);
    }
    public typeParameters(): TypeParametersContext | null {
        return this.getRuleContext(0, TypeParametersContext);
    }
    public classExtends(): ClassExtendsContext | null {
        return this.getRuleContext(0, ClassExtendsContext);
    }
    public classImplements(): ClassImplementsContext | null {
        return this.getRuleContext(0, ClassImplementsContext);
    }
    public classPermits(): ClassPermitsContext | null {
        return this.getRuleContext(0, ClassPermitsContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_normalClassDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterNormalClassDeclaration) {
             listener.enterNormalClassDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitNormalClassDeclaration) {
             listener.exitNormalClassDeclaration(this);
        }
    }
}


export class ClassModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext | null {
        return this.getRuleContext(0, AnnotationContext);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PUBLIC, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PROTECTED, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PRIVATE, 0);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.ABSTRACT, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.STATIC, 0);
    }
    public FINAL(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.FINAL, 0);
    }
    public SEALED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SEALED, 0);
    }
    public NONSEALED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.NONSEALED, 0);
    }
    public STRICTFP(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.STRICTFP, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassModifier) {
             listener.enterClassModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassModifier) {
             listener.exitClassModifier(this);
        }
    }
}


export class TypeParametersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LT, 0)!;
    }
    public typeParameterList(): TypeParameterListContext {
        return this.getRuleContext(0, TypeParameterListContext)!;
    }
    public GT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.GT, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeParameters;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeParameters) {
             listener.enterTypeParameters(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeParameters) {
             listener.exitTypeParameters(this);
        }
    }
}


export class TypeParameterListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeParameter(): TypeParameterContext[];
    public typeParameter(i: number): TypeParameterContext | null;
    public typeParameter(i?: number): TypeParameterContext[] | TypeParameterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeParameterContext);
        }

        return this.getRuleContext(i, TypeParameterContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeParameterList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeParameterList) {
             listener.enterTypeParameterList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeParameterList) {
             listener.exitTypeParameterList(this);
        }
    }
}


export class ClassExtendsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Java20Parser.EXTENDS, 0)!;
    }
    public classType(): ClassTypeContext {
        return this.getRuleContext(0, ClassTypeContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classExtends;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassExtends) {
             listener.enterClassExtends(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassExtends) {
             listener.exitClassExtends(this);
        }
    }
}


export class ClassImplementsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IMPLEMENTS(): antlr.TerminalNode {
        return this.getToken(Java20Parser.IMPLEMENTS, 0)!;
    }
    public interfaceTypeList(): InterfaceTypeListContext {
        return this.getRuleContext(0, InterfaceTypeListContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classImplements;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassImplements) {
             listener.enterClassImplements(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassImplements) {
             listener.exitClassImplements(this);
        }
    }
}


export class InterfaceTypeListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public interfaceType(): InterfaceTypeContext[];
    public interfaceType(i: number): InterfaceTypeContext | null;
    public interfaceType(i?: number): InterfaceTypeContext[] | InterfaceTypeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InterfaceTypeContext);
        }

        return this.getRuleContext(i, InterfaceTypeContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_interfaceTypeList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterInterfaceTypeList) {
             listener.enterInterfaceTypeList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitInterfaceTypeList) {
             listener.exitInterfaceTypeList(this);
        }
    }
}


export class ClassPermitsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PERMITS(): antlr.TerminalNode {
        return this.getToken(Java20Parser.PERMITS, 0)!;
    }
    public typeName(): TypeNameContext[];
    public typeName(i: number): TypeNameContext | null;
    public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeNameContext);
        }

        return this.getRuleContext(i, TypeNameContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classPermits;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassPermits) {
             listener.enterClassPermits(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassPermits) {
             listener.exitClassPermits(this);
        }
    }
}


export class ClassBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACE, 0)!;
    }
    public classBodyDeclaration(): ClassBodyDeclarationContext[];
    public classBodyDeclaration(i: number): ClassBodyDeclarationContext | null;
    public classBodyDeclaration(i?: number): ClassBodyDeclarationContext[] | ClassBodyDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ClassBodyDeclarationContext);
        }

        return this.getRuleContext(i, ClassBodyDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classBody;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassBody) {
             listener.enterClassBody(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassBody) {
             listener.exitClassBody(this);
        }
    }
}


export class ClassBodyDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classMemberDeclaration(): ClassMemberDeclarationContext | null {
        return this.getRuleContext(0, ClassMemberDeclarationContext);
    }
    public instanceInitializer(): InstanceInitializerContext | null {
        return this.getRuleContext(0, InstanceInitializerContext);
    }
    public staticInitializer(): StaticInitializerContext | null {
        return this.getRuleContext(0, StaticInitializerContext);
    }
    public constructorDeclaration(): ConstructorDeclarationContext | null {
        return this.getRuleContext(0, ConstructorDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classBodyDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassBodyDeclaration) {
             listener.enterClassBodyDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassBodyDeclaration) {
             listener.exitClassBodyDeclaration(this);
        }
    }
}


export class ClassMemberDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public fieldDeclaration(): FieldDeclarationContext | null {
        return this.getRuleContext(0, FieldDeclarationContext);
    }
    public methodDeclaration(): MethodDeclarationContext | null {
        return this.getRuleContext(0, MethodDeclarationContext);
    }
    public classDeclaration(): ClassDeclarationContext | null {
        return this.getRuleContext(0, ClassDeclarationContext);
    }
    public interfaceDeclaration(): InterfaceDeclarationContext | null {
        return this.getRuleContext(0, InterfaceDeclarationContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SEMI, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classMemberDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassMemberDeclaration) {
             listener.enterClassMemberDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassMemberDeclaration) {
             listener.exitClassMemberDeclaration(this);
        }
    }
}


export class FieldDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannType(): UnannTypeContext {
        return this.getRuleContext(0, UnannTypeContext)!;
    }
    public variableDeclaratorList(): VariableDeclaratorListContext {
        return this.getRuleContext(0, VariableDeclaratorListContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public fieldModifier(): FieldModifierContext[];
    public fieldModifier(i: number): FieldModifierContext | null;
    public fieldModifier(i?: number): FieldModifierContext[] | FieldModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FieldModifierContext);
        }

        return this.getRuleContext(i, FieldModifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_fieldDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterFieldDeclaration) {
             listener.enterFieldDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitFieldDeclaration) {
             listener.exitFieldDeclaration(this);
        }
    }
}


export class FieldModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext | null {
        return this.getRuleContext(0, AnnotationContext);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PUBLIC, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PROTECTED, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PRIVATE, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.STATIC, 0);
    }
    public FINAL(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.FINAL, 0);
    }
    public TRANSIENT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.TRANSIENT, 0);
    }
    public VOLATILE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.VOLATILE, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_fieldModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterFieldModifier) {
             listener.enterFieldModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitFieldModifier) {
             listener.exitFieldModifier(this);
        }
    }
}


export class VariableDeclaratorListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public variableDeclarator(): VariableDeclaratorContext[];
    public variableDeclarator(i: number): VariableDeclaratorContext | null;
    public variableDeclarator(i?: number): VariableDeclaratorContext[] | VariableDeclaratorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableDeclaratorContext);
        }

        return this.getRuleContext(i, VariableDeclaratorContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_variableDeclaratorList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterVariableDeclaratorList) {
             listener.enterVariableDeclaratorList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitVariableDeclaratorList) {
             listener.exitVariableDeclaratorList(this);
        }
    }
}


export class VariableDeclaratorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public variableDeclaratorId(): VariableDeclaratorIdContext {
        return this.getRuleContext(0, VariableDeclaratorIdContext)!;
    }
    public ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.ASSIGN, 0);
    }
    public variableInitializer(): VariableInitializerContext | null {
        return this.getRuleContext(0, VariableInitializerContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_variableDeclarator;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterVariableDeclarator) {
             listener.enterVariableDeclarator(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitVariableDeclarator) {
             listener.exitVariableDeclarator(this);
        }
    }
}


export class VariableDeclaratorIdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public dims(): DimsContext | null {
        return this.getRuleContext(0, DimsContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_variableDeclaratorId;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterVariableDeclaratorId) {
             listener.enterVariableDeclaratorId(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitVariableDeclaratorId) {
             listener.exitVariableDeclaratorId(this);
        }
    }
}


export class VariableInitializerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public arrayInitializer(): ArrayInitializerContext | null {
        return this.getRuleContext(0, ArrayInitializerContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_variableInitializer;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterVariableInitializer) {
             listener.enterVariableInitializer(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitVariableInitializer) {
             listener.exitVariableInitializer(this);
        }
    }
}


export class UnannTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannPrimitiveType(): UnannPrimitiveTypeContext | null {
        return this.getRuleContext(0, UnannPrimitiveTypeContext);
    }
    public unannReferenceType(): UnannReferenceTypeContext | null {
        return this.getRuleContext(0, UnannReferenceTypeContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_unannType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUnannType) {
             listener.enterUnannType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUnannType) {
             listener.exitUnannType(this);
        }
    }
}


export class UnannPrimitiveTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public numericType(): NumericTypeContext | null {
        return this.getRuleContext(0, NumericTypeContext);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.BOOLEAN, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_unannPrimitiveType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUnannPrimitiveType) {
             listener.enterUnannPrimitiveType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUnannPrimitiveType) {
             listener.exitUnannPrimitiveType(this);
        }
    }
}


export class UnannReferenceTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannClassOrInterfaceType(): UnannClassOrInterfaceTypeContext | null {
        return this.getRuleContext(0, UnannClassOrInterfaceTypeContext);
    }
    public unannTypeVariable(): UnannTypeVariableContext | null {
        return this.getRuleContext(0, UnannTypeVariableContext);
    }
    public unannArrayType(): UnannArrayTypeContext | null {
        return this.getRuleContext(0, UnannArrayTypeContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_unannReferenceType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUnannReferenceType) {
             listener.enterUnannReferenceType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUnannReferenceType) {
             listener.exitUnannReferenceType(this);
        }
    }
}


export class UnannClassOrInterfaceTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public packageName(): PackageNameContext | null {
        return this.getRuleContext(0, PackageNameContext);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public uCOIT(): UCOITContext | null {
        return this.getRuleContext(0, UCOITContext);
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_unannClassOrInterfaceType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUnannClassOrInterfaceType) {
             listener.enterUnannClassOrInterfaceType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUnannClassOrInterfaceType) {
             listener.exitUnannClassOrInterfaceType(this);
        }
    }
}


export class UCOITContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.DOT, 0)!;
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public uCOIT(): UCOITContext | null {
        return this.getRuleContext(0, UCOITContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_uCOIT;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUCOIT) {
             listener.enterUCOIT(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUCOIT) {
             listener.exitUCOIT(this);
        }
    }
}


export class UnannClassTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public packageName(): PackageNameContext | null {
        return this.getRuleContext(0, PackageNameContext);
    }
    public unannClassOrInterfaceType(): UnannClassOrInterfaceTypeContext | null {
        return this.getRuleContext(0, UnannClassOrInterfaceTypeContext);
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_unannClassType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUnannClassType) {
             listener.enterUnannClassType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUnannClassType) {
             listener.exitUnannClassType(this);
        }
    }
}


export class UnannInterfaceTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannClassType(): UnannClassTypeContext {
        return this.getRuleContext(0, UnannClassTypeContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_unannInterfaceType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUnannInterfaceType) {
             listener.enterUnannInterfaceType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUnannInterfaceType) {
             listener.exitUnannInterfaceType(this);
        }
    }
}


export class UnannTypeVariableContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_unannTypeVariable;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUnannTypeVariable) {
             listener.enterUnannTypeVariable(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUnannTypeVariable) {
             listener.exitUnannTypeVariable(this);
        }
    }
}


export class UnannArrayTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public dims(): DimsContext {
        return this.getRuleContext(0, DimsContext)!;
    }
    public unannPrimitiveType(): UnannPrimitiveTypeContext | null {
        return this.getRuleContext(0, UnannPrimitiveTypeContext);
    }
    public unannClassOrInterfaceType(): UnannClassOrInterfaceTypeContext | null {
        return this.getRuleContext(0, UnannClassOrInterfaceTypeContext);
    }
    public unannTypeVariable(): UnannTypeVariableContext | null {
        return this.getRuleContext(0, UnannTypeVariableContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_unannArrayType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUnannArrayType) {
             listener.enterUnannArrayType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUnannArrayType) {
             listener.exitUnannArrayType(this);
        }
    }
}


export class MethodDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public methodHeader(): MethodHeaderContext {
        return this.getRuleContext(0, MethodHeaderContext)!;
    }
    public methodBody(): MethodBodyContext {
        return this.getRuleContext(0, MethodBodyContext)!;
    }
    public methodModifier(): MethodModifierContext[];
    public methodModifier(i: number): MethodModifierContext | null;
    public methodModifier(i?: number): MethodModifierContext[] | MethodModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MethodModifierContext);
        }

        return this.getRuleContext(i, MethodModifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_methodDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterMethodDeclaration) {
             listener.enterMethodDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitMethodDeclaration) {
             listener.exitMethodDeclaration(this);
        }
    }
}


export class MethodModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext | null {
        return this.getRuleContext(0, AnnotationContext);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PUBLIC, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PROTECTED, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PRIVATE, 0);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.ABSTRACT, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.STATIC, 0);
    }
    public FINAL(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.FINAL, 0);
    }
    public SYNCHRONIZED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SYNCHRONIZED, 0);
    }
    public NATIVE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.NATIVE, 0);
    }
    public STRICTFP(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.STRICTFP, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_methodModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterMethodModifier) {
             listener.enterMethodModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitMethodModifier) {
             listener.exitMethodModifier(this);
        }
    }
}


export class MethodHeaderContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public result(): ResultContext {
        return this.getRuleContext(0, ResultContext)!;
    }
    public methodDeclarator(): MethodDeclaratorContext {
        return this.getRuleContext(0, MethodDeclaratorContext)!;
    }
    public typeParameters(): TypeParametersContext | null {
        return this.getRuleContext(0, TypeParametersContext);
    }
    public throwsT(): ThrowsTContext | null {
        return this.getRuleContext(0, ThrowsTContext);
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_methodHeader;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterMethodHeader) {
             listener.enterMethodHeader(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitMethodHeader) {
             listener.exitMethodHeader(this);
        }
    }
}


export class ResultContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannType(): UnannTypeContext | null {
        return this.getRuleContext(0, UnannTypeContext);
    }
    public VOID(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.VOID, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_result;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterResult) {
             listener.enterResult(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitResult) {
             listener.exitResult(this);
        }
    }
}


export class MethodDeclaratorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public receiverParameter(): ReceiverParameterContext | null {
        return this.getRuleContext(0, ReceiverParameterContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.COMMA, 0);
    }
    public formalParameterList(): FormalParameterListContext | null {
        return this.getRuleContext(0, FormalParameterListContext);
    }
    public dims(): DimsContext | null {
        return this.getRuleContext(0, DimsContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_methodDeclarator;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterMethodDeclarator) {
             listener.enterMethodDeclarator(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitMethodDeclarator) {
             listener.exitMethodDeclarator(this);
        }
    }
}


export class ReceiverParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannType(): UnannTypeContext {
        return this.getRuleContext(0, UnannTypeContext)!;
    }
    public THIS(): antlr.TerminalNode {
        return this.getToken(Java20Parser.THIS, 0)!;
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_receiverParameter;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterReceiverParameter) {
             listener.enterReceiverParameter(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitReceiverParameter) {
             listener.exitReceiverParameter(this);
        }
    }
}


export class FormalParameterListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public formalParameter(): FormalParameterContext[];
    public formalParameter(i: number): FormalParameterContext | null;
    public formalParameter(i?: number): FormalParameterContext[] | FormalParameterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FormalParameterContext);
        }

        return this.getRuleContext(i, FormalParameterContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_formalParameterList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterFormalParameterList) {
             listener.enterFormalParameterList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitFormalParameterList) {
             listener.exitFormalParameterList(this);
        }
    }
}


export class FormalParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannType(): UnannTypeContext | null {
        return this.getRuleContext(0, UnannTypeContext);
    }
    public variableDeclaratorId(): VariableDeclaratorIdContext | null {
        return this.getRuleContext(0, VariableDeclaratorIdContext);
    }
    public variableModifier(): VariableModifierContext[];
    public variableModifier(i: number): VariableModifierContext | null;
    public variableModifier(i?: number): VariableModifierContext[] | VariableModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableModifierContext);
        }

        return this.getRuleContext(i, VariableModifierContext);
    }
    public variableArityParameter(): VariableArityParameterContext | null {
        return this.getRuleContext(0, VariableArityParameterContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_formalParameter;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterFormalParameter) {
             listener.enterFormalParameter(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitFormalParameter) {
             listener.exitFormalParameter(this);
        }
    }
}


export class VariableArityParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannType(): UnannTypeContext {
        return this.getRuleContext(0, UnannTypeContext)!;
    }
    public ELLIPSIS(): antlr.TerminalNode {
        return this.getToken(Java20Parser.ELLIPSIS, 0)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public variableModifier(): VariableModifierContext[];
    public variableModifier(i: number): VariableModifierContext | null;
    public variableModifier(i?: number): VariableModifierContext[] | VariableModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableModifierContext);
        }

        return this.getRuleContext(i, VariableModifierContext);
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_variableArityParameter;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterVariableArityParameter) {
             listener.enterVariableArityParameter(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitVariableArityParameter) {
             listener.exitVariableArityParameter(this);
        }
    }
}


export class VariableModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext | null {
        return this.getRuleContext(0, AnnotationContext);
    }
    public FINAL(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.FINAL, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_variableModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterVariableModifier) {
             listener.enterVariableModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitVariableModifier) {
             listener.exitVariableModifier(this);
        }
    }
}


export class ThrowsTContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public THROWS(): antlr.TerminalNode {
        return this.getToken(Java20Parser.THROWS, 0)!;
    }
    public exceptionTypeList(): ExceptionTypeListContext {
        return this.getRuleContext(0, ExceptionTypeListContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_throwsT;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterThrowsT) {
             listener.enterThrowsT(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitThrowsT) {
             listener.exitThrowsT(this);
        }
    }
}


export class ExceptionTypeListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public exceptionType(): ExceptionTypeContext[];
    public exceptionType(i: number): ExceptionTypeContext | null;
    public exceptionType(i?: number): ExceptionTypeContext[] | ExceptionTypeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExceptionTypeContext);
        }

        return this.getRuleContext(i, ExceptionTypeContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_exceptionTypeList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterExceptionTypeList) {
             listener.enterExceptionTypeList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitExceptionTypeList) {
             listener.exitExceptionTypeList(this);
        }
    }
}


export class ExceptionTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classType(): ClassTypeContext | null {
        return this.getRuleContext(0, ClassTypeContext);
    }
    public typeVariable(): TypeVariableContext | null {
        return this.getRuleContext(0, TypeVariableContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_exceptionType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterExceptionType) {
             listener.enterExceptionType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitExceptionType) {
             listener.exitExceptionType(this);
        }
    }
}


export class MethodBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SEMI, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_methodBody;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterMethodBody) {
             listener.enterMethodBody(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitMethodBody) {
             listener.exitMethodBody(this);
        }
    }
}


export class InstanceInitializerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_instanceInitializer;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterInstanceInitializer) {
             listener.enterInstanceInitializer(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitInstanceInitializer) {
             listener.exitInstanceInitializer(this);
        }
    }
}


export class StaticInitializerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STATIC(): antlr.TerminalNode {
        return this.getToken(Java20Parser.STATIC, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_staticInitializer;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterStaticInitializer) {
             listener.enterStaticInitializer(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitStaticInitializer) {
             listener.exitStaticInitializer(this);
        }
    }
}


export class ConstructorDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public constructorDeclarator(): ConstructorDeclaratorContext {
        return this.getRuleContext(0, ConstructorDeclaratorContext)!;
    }
    public constructorBody(): ConstructorBodyContext {
        return this.getRuleContext(0, ConstructorBodyContext)!;
    }
    public constructorModifier(): ConstructorModifierContext[];
    public constructorModifier(i: number): ConstructorModifierContext | null;
    public constructorModifier(i?: number): ConstructorModifierContext[] | ConstructorModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConstructorModifierContext);
        }

        return this.getRuleContext(i, ConstructorModifierContext);
    }
    public throwsT(): ThrowsTContext | null {
        return this.getRuleContext(0, ThrowsTContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_constructorDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterConstructorDeclaration) {
             listener.enterConstructorDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitConstructorDeclaration) {
             listener.exitConstructorDeclaration(this);
        }
    }
}


export class ConstructorModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext | null {
        return this.getRuleContext(0, AnnotationContext);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PUBLIC, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PROTECTED, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PRIVATE, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_constructorModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterConstructorModifier) {
             listener.enterConstructorModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitConstructorModifier) {
             listener.exitConstructorModifier(this);
        }
    }
}


export class ConstructorDeclaratorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public simpleTypeName(): SimpleTypeNameContext {
        return this.getRuleContext(0, SimpleTypeNameContext)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public typeParameters(): TypeParametersContext | null {
        return this.getRuleContext(0, TypeParametersContext);
    }
    public receiverParameter(): ReceiverParameterContext | null {
        return this.getRuleContext(0, ReceiverParameterContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.COMMA, 0);
    }
    public formalParameterList(): FormalParameterListContext | null {
        return this.getRuleContext(0, FormalParameterListContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_constructorDeclarator;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterConstructorDeclarator) {
             listener.enterConstructorDeclarator(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitConstructorDeclarator) {
             listener.exitConstructorDeclarator(this);
        }
    }
}


export class SimpleTypeNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_simpleTypeName;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterSimpleTypeName) {
             listener.enterSimpleTypeName(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitSimpleTypeName) {
             listener.exitSimpleTypeName(this);
        }
    }
}


export class ConstructorBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACE, 0)!;
    }
    public explicitConstructorInvocation(): ExplicitConstructorInvocationContext | null {
        return this.getRuleContext(0, ExplicitConstructorInvocationContext);
    }
    public blockStatements(): BlockStatementsContext | null {
        return this.getRuleContext(0, BlockStatementsContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_constructorBody;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterConstructorBody) {
             listener.enterConstructorBody(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitConstructorBody) {
             listener.exitConstructorBody(this);
        }
    }
}


export class ExplicitConstructorInvocationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.THIS, 0);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SUPER, 0);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public argumentList(): ArgumentListContext | null {
        return this.getRuleContext(0, ArgumentListContext);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public expressionName(): ExpressionNameContext | null {
        return this.getRuleContext(0, ExpressionNameContext);
    }
    public primary(): PrimaryContext | null {
        return this.getRuleContext(0, PrimaryContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_explicitConstructorInvocation;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterExplicitConstructorInvocation) {
             listener.enterExplicitConstructorInvocation(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitExplicitConstructorInvocation) {
             listener.exitExplicitConstructorInvocation(this);
        }
    }
}


export class EnumDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ENUM(): antlr.TerminalNode {
        return this.getToken(Java20Parser.ENUM, 0)!;
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public enumBody(): EnumBodyContext {
        return this.getRuleContext(0, EnumBodyContext)!;
    }
    public classModifier(): ClassModifierContext[];
    public classModifier(i: number): ClassModifierContext | null;
    public classModifier(i?: number): ClassModifierContext[] | ClassModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ClassModifierContext);
        }

        return this.getRuleContext(i, ClassModifierContext);
    }
    public classImplements(): ClassImplementsContext | null {
        return this.getRuleContext(0, ClassImplementsContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_enumDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterEnumDeclaration) {
             listener.enterEnumDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitEnumDeclaration) {
             listener.exitEnumDeclaration(this);
        }
    }
}


export class EnumBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACE, 0)!;
    }
    public enumConstantList(): EnumConstantListContext | null {
        return this.getRuleContext(0, EnumConstantListContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.COMMA, 0);
    }
    public enumBodyDeclarations(): EnumBodyDeclarationsContext | null {
        return this.getRuleContext(0, EnumBodyDeclarationsContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_enumBody;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterEnumBody) {
             listener.enterEnumBody(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitEnumBody) {
             listener.exitEnumBody(this);
        }
    }
}


export class EnumConstantListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public enumConstant(): EnumConstantContext[];
    public enumConstant(i: number): EnumConstantContext | null;
    public enumConstant(i?: number): EnumConstantContext[] | EnumConstantContext | null {
        if (i === undefined) {
            return this.getRuleContexts(EnumConstantContext);
        }

        return this.getRuleContext(i, EnumConstantContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_enumConstantList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterEnumConstantList) {
             listener.enterEnumConstantList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitEnumConstantList) {
             listener.exitEnumConstantList(this);
        }
    }
}


export class EnumConstantContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public enumConstantModifier(): EnumConstantModifierContext[];
    public enumConstantModifier(i: number): EnumConstantModifierContext | null;
    public enumConstantModifier(i?: number): EnumConstantModifierContext[] | EnumConstantModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(EnumConstantModifierContext);
        }

        return this.getRuleContext(i, EnumConstantModifierContext);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.RPAREN, 0);
    }
    public classBody(): ClassBodyContext | null {
        return this.getRuleContext(0, ClassBodyContext);
    }
    public argumentList(): ArgumentListContext | null {
        return this.getRuleContext(0, ArgumentListContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_enumConstant;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterEnumConstant) {
             listener.enterEnumConstant(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitEnumConstant) {
             listener.exitEnumConstant(this);
        }
    }
}


export class EnumConstantModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext {
        return this.getRuleContext(0, AnnotationContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_enumConstantModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterEnumConstantModifier) {
             listener.enterEnumConstantModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitEnumConstantModifier) {
             listener.exitEnumConstantModifier(this);
        }
    }
}


export class EnumBodyDeclarationsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public classBodyDeclaration(): ClassBodyDeclarationContext[];
    public classBodyDeclaration(i: number): ClassBodyDeclarationContext | null;
    public classBodyDeclaration(i?: number): ClassBodyDeclarationContext[] | ClassBodyDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ClassBodyDeclarationContext);
        }

        return this.getRuleContext(i, ClassBodyDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_enumBodyDeclarations;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterEnumBodyDeclarations) {
             listener.enterEnumBodyDeclarations(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitEnumBodyDeclarations) {
             listener.exitEnumBodyDeclarations(this);
        }
    }
}


export class RecordDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public RECORD(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RECORD, 0)!;
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public recordHeader(): RecordHeaderContext {
        return this.getRuleContext(0, RecordHeaderContext)!;
    }
    public recordBody(): RecordBodyContext {
        return this.getRuleContext(0, RecordBodyContext)!;
    }
    public classModifier(): ClassModifierContext[];
    public classModifier(i: number): ClassModifierContext | null;
    public classModifier(i?: number): ClassModifierContext[] | ClassModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ClassModifierContext);
        }

        return this.getRuleContext(i, ClassModifierContext);
    }
    public typeParameters(): TypeParametersContext | null {
        return this.getRuleContext(0, TypeParametersContext);
    }
    public classImplements(): ClassImplementsContext | null {
        return this.getRuleContext(0, ClassImplementsContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_recordDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterRecordDeclaration) {
             listener.enterRecordDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitRecordDeclaration) {
             listener.exitRecordDeclaration(this);
        }
    }
}


export class RecordHeaderContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public recordComponentList(): RecordComponentListContext | null {
        return this.getRuleContext(0, RecordComponentListContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_recordHeader;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterRecordHeader) {
             listener.enterRecordHeader(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitRecordHeader) {
             listener.exitRecordHeader(this);
        }
    }
}


export class RecordComponentListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public recordComponent(): RecordComponentContext[];
    public recordComponent(i: number): RecordComponentContext | null;
    public recordComponent(i?: number): RecordComponentContext[] | RecordComponentContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RecordComponentContext);
        }

        return this.getRuleContext(i, RecordComponentContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_recordComponentList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterRecordComponentList) {
             listener.enterRecordComponentList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitRecordComponentList) {
             listener.exitRecordComponentList(this);
        }
    }
}


export class RecordComponentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannType(): UnannTypeContext | null {
        return this.getRuleContext(0, UnannTypeContext);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public recordComponentModifier(): RecordComponentModifierContext[];
    public recordComponentModifier(i: number): RecordComponentModifierContext | null;
    public recordComponentModifier(i?: number): RecordComponentModifierContext[] | RecordComponentModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RecordComponentModifierContext);
        }

        return this.getRuleContext(i, RecordComponentModifierContext);
    }
    public variableArityRecordComponent(): VariableArityRecordComponentContext | null {
        return this.getRuleContext(0, VariableArityRecordComponentContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_recordComponent;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterRecordComponent) {
             listener.enterRecordComponent(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitRecordComponent) {
             listener.exitRecordComponent(this);
        }
    }
}


export class VariableArityRecordComponentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannType(): UnannTypeContext {
        return this.getRuleContext(0, UnannTypeContext)!;
    }
    public ELLIPSIS(): antlr.TerminalNode {
        return this.getToken(Java20Parser.ELLIPSIS, 0)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public recordComponentModifier(): RecordComponentModifierContext[];
    public recordComponentModifier(i: number): RecordComponentModifierContext | null;
    public recordComponentModifier(i?: number): RecordComponentModifierContext[] | RecordComponentModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RecordComponentModifierContext);
        }

        return this.getRuleContext(i, RecordComponentModifierContext);
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_variableArityRecordComponent;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterVariableArityRecordComponent) {
             listener.enterVariableArityRecordComponent(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitVariableArityRecordComponent) {
             listener.exitVariableArityRecordComponent(this);
        }
    }
}


export class RecordComponentModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext {
        return this.getRuleContext(0, AnnotationContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_recordComponentModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterRecordComponentModifier) {
             listener.enterRecordComponentModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitRecordComponentModifier) {
             listener.exitRecordComponentModifier(this);
        }
    }
}


export class RecordBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACE, 0)!;
    }
    public recordBodyDeclaration(): RecordBodyDeclarationContext[];
    public recordBodyDeclaration(i: number): RecordBodyDeclarationContext | null;
    public recordBodyDeclaration(i?: number): RecordBodyDeclarationContext[] | RecordBodyDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RecordBodyDeclarationContext);
        }

        return this.getRuleContext(i, RecordBodyDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_recordBody;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterRecordBody) {
             listener.enterRecordBody(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitRecordBody) {
             listener.exitRecordBody(this);
        }
    }
}


export class RecordBodyDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classBodyDeclaration(): ClassBodyDeclarationContext | null {
        return this.getRuleContext(0, ClassBodyDeclarationContext);
    }
    public compactConstructorDeclaration(): CompactConstructorDeclarationContext | null {
        return this.getRuleContext(0, CompactConstructorDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_recordBodyDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterRecordBodyDeclaration) {
             listener.enterRecordBodyDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitRecordBodyDeclaration) {
             listener.exitRecordBodyDeclaration(this);
        }
    }
}


export class CompactConstructorDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public simpleTypeName(): SimpleTypeNameContext {
        return this.getRuleContext(0, SimpleTypeNameContext)!;
    }
    public constructorBody(): ConstructorBodyContext {
        return this.getRuleContext(0, ConstructorBodyContext)!;
    }
    public constructorModifier(): ConstructorModifierContext[];
    public constructorModifier(i: number): ConstructorModifierContext | null;
    public constructorModifier(i?: number): ConstructorModifierContext[] | ConstructorModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConstructorModifierContext);
        }

        return this.getRuleContext(i, ConstructorModifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_compactConstructorDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterCompactConstructorDeclaration) {
             listener.enterCompactConstructorDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitCompactConstructorDeclaration) {
             listener.exitCompactConstructorDeclaration(this);
        }
    }
}


export class InterfaceDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public normalInterfaceDeclaration(): NormalInterfaceDeclarationContext | null {
        return this.getRuleContext(0, NormalInterfaceDeclarationContext);
    }
    public annotationInterfaceDeclaration(): AnnotationInterfaceDeclarationContext | null {
        return this.getRuleContext(0, AnnotationInterfaceDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_interfaceDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterInterfaceDeclaration) {
             listener.enterInterfaceDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitInterfaceDeclaration) {
             listener.exitInterfaceDeclaration(this);
        }
    }
}


export class NormalInterfaceDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INTERFACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.INTERFACE, 0)!;
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public interfaceBody(): InterfaceBodyContext {
        return this.getRuleContext(0, InterfaceBodyContext)!;
    }
    public interfaceModifier(): InterfaceModifierContext[];
    public interfaceModifier(i: number): InterfaceModifierContext | null;
    public interfaceModifier(i?: number): InterfaceModifierContext[] | InterfaceModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InterfaceModifierContext);
        }

        return this.getRuleContext(i, InterfaceModifierContext);
    }
    public typeParameters(): TypeParametersContext | null {
        return this.getRuleContext(0, TypeParametersContext);
    }
    public interfaceExtends(): InterfaceExtendsContext | null {
        return this.getRuleContext(0, InterfaceExtendsContext);
    }
    public interfacePermits(): InterfacePermitsContext | null {
        return this.getRuleContext(0, InterfacePermitsContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_normalInterfaceDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterNormalInterfaceDeclaration) {
             listener.enterNormalInterfaceDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitNormalInterfaceDeclaration) {
             listener.exitNormalInterfaceDeclaration(this);
        }
    }
}


export class InterfaceModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext | null {
        return this.getRuleContext(0, AnnotationContext);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PUBLIC, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PROTECTED, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PRIVATE, 0);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.ABSTRACT, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.STATIC, 0);
    }
    public SEALED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SEALED, 0);
    }
    public NONSEALED(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.NONSEALED, 0);
    }
    public STRICTFP(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.STRICTFP, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_interfaceModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterInterfaceModifier) {
             listener.enterInterfaceModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitInterfaceModifier) {
             listener.exitInterfaceModifier(this);
        }
    }
}


export class InterfaceExtendsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Java20Parser.EXTENDS, 0)!;
    }
    public interfaceTypeList(): InterfaceTypeListContext {
        return this.getRuleContext(0, InterfaceTypeListContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_interfaceExtends;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterInterfaceExtends) {
             listener.enterInterfaceExtends(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitInterfaceExtends) {
             listener.exitInterfaceExtends(this);
        }
    }
}


export class InterfacePermitsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PERMITS(): antlr.TerminalNode {
        return this.getToken(Java20Parser.PERMITS, 0)!;
    }
    public typeName(): TypeNameContext[];
    public typeName(i: number): TypeNameContext | null;
    public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeNameContext);
        }

        return this.getRuleContext(i, TypeNameContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_interfacePermits;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterInterfacePermits) {
             listener.enterInterfacePermits(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitInterfacePermits) {
             listener.exitInterfacePermits(this);
        }
    }
}


export class InterfaceBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACE, 0)!;
    }
    public interfaceMemberDeclaration(): InterfaceMemberDeclarationContext[];
    public interfaceMemberDeclaration(i: number): InterfaceMemberDeclarationContext | null;
    public interfaceMemberDeclaration(i?: number): InterfaceMemberDeclarationContext[] | InterfaceMemberDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InterfaceMemberDeclarationContext);
        }

        return this.getRuleContext(i, InterfaceMemberDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_interfaceBody;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterInterfaceBody) {
             listener.enterInterfaceBody(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitInterfaceBody) {
             listener.exitInterfaceBody(this);
        }
    }
}


export class InterfaceMemberDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public constantDeclaration(): ConstantDeclarationContext | null {
        return this.getRuleContext(0, ConstantDeclarationContext);
    }
    public interfaceMethodDeclaration(): InterfaceMethodDeclarationContext | null {
        return this.getRuleContext(0, InterfaceMethodDeclarationContext);
    }
    public classDeclaration(): ClassDeclarationContext | null {
        return this.getRuleContext(0, ClassDeclarationContext);
    }
    public interfaceDeclaration(): InterfaceDeclarationContext | null {
        return this.getRuleContext(0, InterfaceDeclarationContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SEMI, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_interfaceMemberDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterInterfaceMemberDeclaration) {
             listener.enterInterfaceMemberDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitInterfaceMemberDeclaration) {
             listener.exitInterfaceMemberDeclaration(this);
        }
    }
}


export class ConstantDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannType(): UnannTypeContext {
        return this.getRuleContext(0, UnannTypeContext)!;
    }
    public variableDeclaratorList(): VariableDeclaratorListContext {
        return this.getRuleContext(0, VariableDeclaratorListContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public constantModifier(): ConstantModifierContext[];
    public constantModifier(i: number): ConstantModifierContext | null;
    public constantModifier(i?: number): ConstantModifierContext[] | ConstantModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConstantModifierContext);
        }

        return this.getRuleContext(i, ConstantModifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_constantDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterConstantDeclaration) {
             listener.enterConstantDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitConstantDeclaration) {
             listener.exitConstantDeclaration(this);
        }
    }
}


export class ConstantModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext | null {
        return this.getRuleContext(0, AnnotationContext);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PUBLIC, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.STATIC, 0);
    }
    public FINAL(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.FINAL, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_constantModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterConstantModifier) {
             listener.enterConstantModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitConstantModifier) {
             listener.exitConstantModifier(this);
        }
    }
}


export class InterfaceMethodDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public methodHeader(): MethodHeaderContext {
        return this.getRuleContext(0, MethodHeaderContext)!;
    }
    public methodBody(): MethodBodyContext {
        return this.getRuleContext(0, MethodBodyContext)!;
    }
    public interfaceMethodModifier(): InterfaceMethodModifierContext[];
    public interfaceMethodModifier(i: number): InterfaceMethodModifierContext | null;
    public interfaceMethodModifier(i?: number): InterfaceMethodModifierContext[] | InterfaceMethodModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InterfaceMethodModifierContext);
        }

        return this.getRuleContext(i, InterfaceMethodModifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_interfaceMethodDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterInterfaceMethodDeclaration) {
             listener.enterInterfaceMethodDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitInterfaceMethodDeclaration) {
             listener.exitInterfaceMethodDeclaration(this);
        }
    }
}


export class InterfaceMethodModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext | null {
        return this.getRuleContext(0, AnnotationContext);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PUBLIC, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PRIVATE, 0);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.ABSTRACT, 0);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DEFAULT, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.STATIC, 0);
    }
    public STRICTFP(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.STRICTFP, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_interfaceMethodModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterInterfaceMethodModifier) {
             listener.enterInterfaceMethodModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitInterfaceMethodModifier) {
             listener.exitInterfaceMethodModifier(this);
        }
    }
}


export class AnnotationInterfaceDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.AT, 0)!;
    }
    public INTERFACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.INTERFACE, 0)!;
    }
    public typeIdentifier(): TypeIdentifierContext {
        return this.getRuleContext(0, TypeIdentifierContext)!;
    }
    public annotationInterfaceBody(): AnnotationInterfaceBodyContext {
        return this.getRuleContext(0, AnnotationInterfaceBodyContext)!;
    }
    public interfaceModifier(): InterfaceModifierContext[];
    public interfaceModifier(i: number): InterfaceModifierContext | null;
    public interfaceModifier(i?: number): InterfaceModifierContext[] | InterfaceModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InterfaceModifierContext);
        }

        return this.getRuleContext(i, InterfaceModifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_annotationInterfaceDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAnnotationInterfaceDeclaration) {
             listener.enterAnnotationInterfaceDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAnnotationInterfaceDeclaration) {
             listener.exitAnnotationInterfaceDeclaration(this);
        }
    }
}


export class AnnotationInterfaceBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACE, 0)!;
    }
    public annotationInterfaceMemberDeclaration(): AnnotationInterfaceMemberDeclarationContext[];
    public annotationInterfaceMemberDeclaration(i: number): AnnotationInterfaceMemberDeclarationContext | null;
    public annotationInterfaceMemberDeclaration(i?: number): AnnotationInterfaceMemberDeclarationContext[] | AnnotationInterfaceMemberDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationInterfaceMemberDeclarationContext);
        }

        return this.getRuleContext(i, AnnotationInterfaceMemberDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_annotationInterfaceBody;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAnnotationInterfaceBody) {
             listener.enterAnnotationInterfaceBody(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAnnotationInterfaceBody) {
             listener.exitAnnotationInterfaceBody(this);
        }
    }
}


export class AnnotationInterfaceMemberDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotationInterfaceElementDeclaration(): AnnotationInterfaceElementDeclarationContext | null {
        return this.getRuleContext(0, AnnotationInterfaceElementDeclarationContext);
    }
    public constantDeclaration(): ConstantDeclarationContext | null {
        return this.getRuleContext(0, ConstantDeclarationContext);
    }
    public classDeclaration(): ClassDeclarationContext | null {
        return this.getRuleContext(0, ClassDeclarationContext);
    }
    public interfaceDeclaration(): InterfaceDeclarationContext | null {
        return this.getRuleContext(0, InterfaceDeclarationContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SEMI, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_annotationInterfaceMemberDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAnnotationInterfaceMemberDeclaration) {
             listener.enterAnnotationInterfaceMemberDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAnnotationInterfaceMemberDeclaration) {
             listener.exitAnnotationInterfaceMemberDeclaration(this);
        }
    }
}


export class AnnotationInterfaceElementDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannType(): UnannTypeContext {
        return this.getRuleContext(0, UnannTypeContext)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public annotationInterfaceElementModifier(): AnnotationInterfaceElementModifierContext[];
    public annotationInterfaceElementModifier(i: number): AnnotationInterfaceElementModifierContext | null;
    public annotationInterfaceElementModifier(i?: number): AnnotationInterfaceElementModifierContext[] | AnnotationInterfaceElementModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationInterfaceElementModifierContext);
        }

        return this.getRuleContext(i, AnnotationInterfaceElementModifierContext);
    }
    public dims(): DimsContext | null {
        return this.getRuleContext(0, DimsContext);
    }
    public defaultValue(): DefaultValueContext | null {
        return this.getRuleContext(0, DefaultValueContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_annotationInterfaceElementDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAnnotationInterfaceElementDeclaration) {
             listener.enterAnnotationInterfaceElementDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAnnotationInterfaceElementDeclaration) {
             listener.exitAnnotationInterfaceElementDeclaration(this);
        }
    }
}


export class AnnotationInterfaceElementModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext | null {
        return this.getRuleContext(0, AnnotationContext);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.PUBLIC, 0);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.ABSTRACT, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_annotationInterfaceElementModifier;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAnnotationInterfaceElementModifier) {
             listener.enterAnnotationInterfaceElementModifier(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAnnotationInterfaceElementModifier) {
             listener.exitAnnotationInterfaceElementModifier(this);
        }
    }
}


export class DefaultValueContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.DEFAULT, 0)!;
    }
    public elementValue(): ElementValueContext {
        return this.getRuleContext(0, ElementValueContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_defaultValue;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterDefaultValue) {
             listener.enterDefaultValue(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitDefaultValue) {
             listener.exitDefaultValue(this);
        }
    }
}


export class AnnotationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public normalAnnotation(): NormalAnnotationContext | null {
        return this.getRuleContext(0, NormalAnnotationContext);
    }
    public markerAnnotation(): MarkerAnnotationContext | null {
        return this.getRuleContext(0, MarkerAnnotationContext);
    }
    public singleElementAnnotation(): SingleElementAnnotationContext | null {
        return this.getRuleContext(0, SingleElementAnnotationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_annotation;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAnnotation) {
             listener.enterAnnotation(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAnnotation) {
             listener.exitAnnotation(this);
        }
    }
}


export class NormalAnnotationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.AT, 0)!;
    }
    public typeName(): TypeNameContext {
        return this.getRuleContext(0, TypeNameContext)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public elementValuePairList(): ElementValuePairListContext | null {
        return this.getRuleContext(0, ElementValuePairListContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_normalAnnotation;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterNormalAnnotation) {
             listener.enterNormalAnnotation(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitNormalAnnotation) {
             listener.exitNormalAnnotation(this);
        }
    }
}


export class ElementValuePairListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public elementValuePair(): ElementValuePairContext[];
    public elementValuePair(i: number): ElementValuePairContext | null;
    public elementValuePair(i?: number): ElementValuePairContext[] | ElementValuePairContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ElementValuePairContext);
        }

        return this.getRuleContext(i, ElementValuePairContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_elementValuePairList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterElementValuePairList) {
             listener.enterElementValuePairList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitElementValuePairList) {
             listener.exitElementValuePairList(this);
        }
    }
}


export class ElementValuePairContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public ASSIGN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.ASSIGN, 0)!;
    }
    public elementValue(): ElementValueContext {
        return this.getRuleContext(0, ElementValueContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_elementValuePair;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterElementValuePair) {
             listener.enterElementValuePair(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitElementValuePair) {
             listener.exitElementValuePair(this);
        }
    }
}


export class ElementValueContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conditionalExpression(): ConditionalExpressionContext | null {
        return this.getRuleContext(0, ConditionalExpressionContext);
    }
    public elementValueArrayInitializer(): ElementValueArrayInitializerContext | null {
        return this.getRuleContext(0, ElementValueArrayInitializerContext);
    }
    public annotation(): AnnotationContext | null {
        return this.getRuleContext(0, AnnotationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_elementValue;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterElementValue) {
             listener.enterElementValue(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitElementValue) {
             listener.exitElementValue(this);
        }
    }
}


export class ElementValueArrayInitializerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACE, 0)!;
    }
    public elementValueList(): ElementValueListContext | null {
        return this.getRuleContext(0, ElementValueListContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.COMMA, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_elementValueArrayInitializer;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterElementValueArrayInitializer) {
             listener.enterElementValueArrayInitializer(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitElementValueArrayInitializer) {
             listener.exitElementValueArrayInitializer(this);
        }
    }
}


export class ElementValueListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public elementValue(): ElementValueContext[];
    public elementValue(i: number): ElementValueContext | null;
    public elementValue(i?: number): ElementValueContext[] | ElementValueContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ElementValueContext);
        }

        return this.getRuleContext(i, ElementValueContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_elementValueList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterElementValueList) {
             listener.enterElementValueList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitElementValueList) {
             listener.exitElementValueList(this);
        }
    }
}


export class MarkerAnnotationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.AT, 0)!;
    }
    public typeName(): TypeNameContext {
        return this.getRuleContext(0, TypeNameContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_markerAnnotation;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterMarkerAnnotation) {
             listener.enterMarkerAnnotation(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitMarkerAnnotation) {
             listener.exitMarkerAnnotation(this);
        }
    }
}


export class SingleElementAnnotationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.AT, 0)!;
    }
    public typeName(): TypeNameContext {
        return this.getRuleContext(0, TypeNameContext)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public elementValue(): ElementValueContext {
        return this.getRuleContext(0, ElementValueContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_singleElementAnnotation;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterSingleElementAnnotation) {
             listener.enterSingleElementAnnotation(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitSingleElementAnnotation) {
             listener.exitSingleElementAnnotation(this);
        }
    }
}


export class ArrayInitializerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACE, 0)!;
    }
    public variableInitializerList(): VariableInitializerListContext | null {
        return this.getRuleContext(0, VariableInitializerListContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.COMMA, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_arrayInitializer;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterArrayInitializer) {
             listener.enterArrayInitializer(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitArrayInitializer) {
             listener.exitArrayInitializer(this);
        }
    }
}


export class VariableInitializerListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public variableInitializer(): VariableInitializerContext[];
    public variableInitializer(i: number): VariableInitializerContext | null;
    public variableInitializer(i?: number): VariableInitializerContext[] | VariableInitializerContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableInitializerContext);
        }

        return this.getRuleContext(i, VariableInitializerContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_variableInitializerList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterVariableInitializerList) {
             listener.enterVariableInitializerList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitVariableInitializerList) {
             listener.exitVariableInitializerList(this);
        }
    }
}


export class BlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACE, 0)!;
    }
    public blockStatements(): BlockStatementsContext | null {
        return this.getRuleContext(0, BlockStatementsContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_block;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
}


export class BlockStatementsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public blockStatement(): BlockStatementContext[];
    public blockStatement(i: number): BlockStatementContext | null;
    public blockStatement(i?: number): BlockStatementContext[] | BlockStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BlockStatementContext);
        }

        return this.getRuleContext(i, BlockStatementContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_blockStatements;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterBlockStatements) {
             listener.enterBlockStatements(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitBlockStatements) {
             listener.exitBlockStatements(this);
        }
    }
}


export class BlockStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public localClassOrInterfaceDeclaration(): LocalClassOrInterfaceDeclarationContext | null {
        return this.getRuleContext(0, LocalClassOrInterfaceDeclarationContext);
    }
    public localVariableDeclarationStatement(): LocalVariableDeclarationStatementContext | null {
        return this.getRuleContext(0, LocalVariableDeclarationStatementContext);
    }
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_blockStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterBlockStatement) {
             listener.enterBlockStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitBlockStatement) {
             listener.exitBlockStatement(this);
        }
    }
}


export class LocalClassOrInterfaceDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classDeclaration(): ClassDeclarationContext | null {
        return this.getRuleContext(0, ClassDeclarationContext);
    }
    public normalInterfaceDeclaration(): NormalInterfaceDeclarationContext | null {
        return this.getRuleContext(0, NormalInterfaceDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_localClassOrInterfaceDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLocalClassOrInterfaceDeclaration) {
             listener.enterLocalClassOrInterfaceDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLocalClassOrInterfaceDeclaration) {
             listener.exitLocalClassOrInterfaceDeclaration(this);
        }
    }
}


export class LocalVariableDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public localVariableType(): LocalVariableTypeContext {
        return this.getRuleContext(0, LocalVariableTypeContext)!;
    }
    public variableDeclaratorList(): VariableDeclaratorListContext {
        return this.getRuleContext(0, VariableDeclaratorListContext)!;
    }
    public variableModifier(): VariableModifierContext[];
    public variableModifier(i: number): VariableModifierContext | null;
    public variableModifier(i?: number): VariableModifierContext[] | VariableModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableModifierContext);
        }

        return this.getRuleContext(i, VariableModifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_localVariableDeclaration;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLocalVariableDeclaration) {
             listener.enterLocalVariableDeclaration(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLocalVariableDeclaration) {
             listener.exitLocalVariableDeclaration(this);
        }
    }
}


export class LocalVariableTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannType(): UnannTypeContext | null {
        return this.getRuleContext(0, UnannTypeContext);
    }
    public VAR(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.VAR, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_localVariableType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLocalVariableType) {
             listener.enterLocalVariableType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLocalVariableType) {
             listener.exitLocalVariableType(this);
        }
    }
}


export class LocalVariableDeclarationStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public localVariableDeclaration(): LocalVariableDeclarationContext {
        return this.getRuleContext(0, LocalVariableDeclarationContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_localVariableDeclarationStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLocalVariableDeclarationStatement) {
             listener.enterLocalVariableDeclarationStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLocalVariableDeclarationStatement) {
             listener.exitLocalVariableDeclarationStatement(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statementWithoutTrailingSubstatement(): StatementWithoutTrailingSubstatementContext | null {
        return this.getRuleContext(0, StatementWithoutTrailingSubstatementContext);
    }
    public labeledStatement(): LabeledStatementContext | null {
        return this.getRuleContext(0, LabeledStatementContext);
    }
    public ifThenStatement(): IfThenStatementContext | null {
        return this.getRuleContext(0, IfThenStatementContext);
    }
    public ifThenElseStatement(): IfThenElseStatementContext | null {
        return this.getRuleContext(0, IfThenElseStatementContext);
    }
    public whileStatement(): WhileStatementContext | null {
        return this.getRuleContext(0, WhileStatementContext);
    }
    public forStatement(): ForStatementContext | null {
        return this.getRuleContext(0, ForStatementContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_statement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
}


export class StatementNoShortIfContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statementWithoutTrailingSubstatement(): StatementWithoutTrailingSubstatementContext | null {
        return this.getRuleContext(0, StatementWithoutTrailingSubstatementContext);
    }
    public labeledStatementNoShortIf(): LabeledStatementNoShortIfContext | null {
        return this.getRuleContext(0, LabeledStatementNoShortIfContext);
    }
    public ifThenElseStatementNoShortIf(): IfThenElseStatementNoShortIfContext | null {
        return this.getRuleContext(0, IfThenElseStatementNoShortIfContext);
    }
    public whileStatementNoShortIf(): WhileStatementNoShortIfContext | null {
        return this.getRuleContext(0, WhileStatementNoShortIfContext);
    }
    public forStatementNoShortIf(): ForStatementNoShortIfContext | null {
        return this.getRuleContext(0, ForStatementNoShortIfContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_statementNoShortIf;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterStatementNoShortIf) {
             listener.enterStatementNoShortIf(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitStatementNoShortIf) {
             listener.exitStatementNoShortIf(this);
        }
    }
}


export class StatementWithoutTrailingSubstatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public emptyStatement_(): EmptyStatement_Context | null {
        return this.getRuleContext(0, EmptyStatement_Context);
    }
    public expressionStatement(): ExpressionStatementContext | null {
        return this.getRuleContext(0, ExpressionStatementContext);
    }
    public assertStatement(): AssertStatementContext | null {
        return this.getRuleContext(0, AssertStatementContext);
    }
    public switchStatement(): SwitchStatementContext | null {
        return this.getRuleContext(0, SwitchStatementContext);
    }
    public doStatement(): DoStatementContext | null {
        return this.getRuleContext(0, DoStatementContext);
    }
    public breakStatement(): BreakStatementContext | null {
        return this.getRuleContext(0, BreakStatementContext);
    }
    public continueStatement(): ContinueStatementContext | null {
        return this.getRuleContext(0, ContinueStatementContext);
    }
    public returnStatement(): ReturnStatementContext | null {
        return this.getRuleContext(0, ReturnStatementContext);
    }
    public synchronizedStatement(): SynchronizedStatementContext | null {
        return this.getRuleContext(0, SynchronizedStatementContext);
    }
    public throwStatement(): ThrowStatementContext | null {
        return this.getRuleContext(0, ThrowStatementContext);
    }
    public tryStatement(): TryStatementContext | null {
        return this.getRuleContext(0, TryStatementContext);
    }
    public yieldStatement(): YieldStatementContext | null {
        return this.getRuleContext(0, YieldStatementContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_statementWithoutTrailingSubstatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterStatementWithoutTrailingSubstatement) {
             listener.enterStatementWithoutTrailingSubstatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitStatementWithoutTrailingSubstatement) {
             listener.exitStatementWithoutTrailingSubstatement(this);
        }
    }
}


export class EmptyStatement_Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_emptyStatement_;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterEmptyStatement_) {
             listener.enterEmptyStatement_(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitEmptyStatement_) {
             listener.exitEmptyStatement_(this);
        }
    }
}


export class LabeledStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(Java20Parser.COLON, 0)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_labeledStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLabeledStatement) {
             listener.enterLabeledStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLabeledStatement) {
             listener.exitLabeledStatement(this);
        }
    }
}


export class LabeledStatementNoShortIfContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(Java20Parser.COLON, 0)!;
    }
    public statementNoShortIf(): StatementNoShortIfContext {
        return this.getRuleContext(0, StatementNoShortIfContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_labeledStatementNoShortIf;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLabeledStatementNoShortIf) {
             listener.enterLabeledStatementNoShortIf(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLabeledStatementNoShortIf) {
             listener.exitLabeledStatementNoShortIf(this);
        }
    }
}


export class ExpressionStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statementExpression(): StatementExpressionContext {
        return this.getRuleContext(0, StatementExpressionContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_expressionStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterExpressionStatement) {
             listener.enterExpressionStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitExpressionStatement) {
             listener.exitExpressionStatement(this);
        }
    }
}


export class StatementExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public assignment(): AssignmentContext | null {
        return this.getRuleContext(0, AssignmentContext);
    }
    public preIncrementExpression(): PreIncrementExpressionContext | null {
        return this.getRuleContext(0, PreIncrementExpressionContext);
    }
    public preDecrementExpression(): PreDecrementExpressionContext | null {
        return this.getRuleContext(0, PreDecrementExpressionContext);
    }
    public postIncrementExpression(): PostIncrementExpressionContext | null {
        return this.getRuleContext(0, PostIncrementExpressionContext);
    }
    public postDecrementExpression(): PostDecrementExpressionContext | null {
        return this.getRuleContext(0, PostDecrementExpressionContext);
    }
    public methodInvocation(): MethodInvocationContext | null {
        return this.getRuleContext(0, MethodInvocationContext);
    }
    public classInstanceCreationExpression(): ClassInstanceCreationExpressionContext | null {
        return this.getRuleContext(0, ClassInstanceCreationExpressionContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_statementExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterStatementExpression) {
             listener.enterStatementExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitStatementExpression) {
             listener.exitStatementExpression(this);
        }
    }
}


export class IfThenStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Java20Parser.IF, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_ifThenStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterIfThenStatement) {
             listener.enterIfThenStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitIfThenStatement) {
             listener.exitIfThenStatement(this);
        }
    }
}


export class IfThenElseStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Java20Parser.IF, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public statementNoShortIf(): StatementNoShortIfContext {
        return this.getRuleContext(0, StatementNoShortIfContext)!;
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.ELSE, 0)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_ifThenElseStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterIfThenElseStatement) {
             listener.enterIfThenElseStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitIfThenElseStatement) {
             listener.exitIfThenElseStatement(this);
        }
    }
}


export class IfThenElseStatementNoShortIfContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Java20Parser.IF, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public statementNoShortIf(): StatementNoShortIfContext[];
    public statementNoShortIf(i: number): StatementNoShortIfContext | null;
    public statementNoShortIf(i?: number): StatementNoShortIfContext[] | StatementNoShortIfContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementNoShortIfContext);
        }

        return this.getRuleContext(i, StatementNoShortIfContext);
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.ELSE, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_ifThenElseStatementNoShortIf;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterIfThenElseStatementNoShortIf) {
             listener.enterIfThenElseStatementNoShortIf(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitIfThenElseStatementNoShortIf) {
             listener.exitIfThenElseStatementNoShortIf(this);
        }
    }
}


export class AssertStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ASSERT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.ASSERT, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.COLON, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_assertStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAssertStatement) {
             listener.enterAssertStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAssertStatement) {
             listener.exitAssertStatement(this);
        }
    }
}


export class SwitchStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SWITCH, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public switchBlock(): SwitchBlockContext {
        return this.getRuleContext(0, SwitchBlockContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_switchStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterSwitchStatement) {
             listener.enterSwitchStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitSwitchStatement) {
             listener.exitSwitchStatement(this);
        }
    }
}


export class SwitchBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACE, 0)!;
    }
    public switchRule(): SwitchRuleContext[];
    public switchRule(i: number): SwitchRuleContext | null;
    public switchRule(i?: number): SwitchRuleContext[] | SwitchRuleContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SwitchRuleContext);
        }

        return this.getRuleContext(i, SwitchRuleContext);
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACE, 0)!;
    }
    public switchBlockStatementGroup(): SwitchBlockStatementGroupContext[];
    public switchBlockStatementGroup(i: number): SwitchBlockStatementGroupContext | null;
    public switchBlockStatementGroup(i?: number): SwitchBlockStatementGroupContext[] | SwitchBlockStatementGroupContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SwitchBlockStatementGroupContext);
        }

        return this.getRuleContext(i, SwitchBlockStatementGroupContext);
    }
    public switchLabel(): SwitchLabelContext[];
    public switchLabel(i: number): SwitchLabelContext | null;
    public switchLabel(i?: number): SwitchLabelContext[] | SwitchLabelContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SwitchLabelContext);
        }

        return this.getRuleContext(i, SwitchLabelContext);
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COLON);
    	} else {
    		return this.getToken(Java20Parser.COLON, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_switchBlock;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterSwitchBlock) {
             listener.enterSwitchBlock(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitSwitchBlock) {
             listener.exitSwitchBlock(this);
        }
    }
}


export class SwitchRuleContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public switchLabel(): SwitchLabelContext {
        return this.getRuleContext(0, SwitchLabelContext)!;
    }
    public ARROW(): antlr.TerminalNode {
        return this.getToken(Java20Parser.ARROW, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SEMI, 0);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public throwStatement(): ThrowStatementContext | null {
        return this.getRuleContext(0, ThrowStatementContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_switchRule;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterSwitchRule) {
             listener.enterSwitchRule(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitSwitchRule) {
             listener.exitSwitchRule(this);
        }
    }
}


export class SwitchBlockStatementGroupContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public switchLabel(): SwitchLabelContext[];
    public switchLabel(i: number): SwitchLabelContext | null;
    public switchLabel(i?: number): SwitchLabelContext[] | SwitchLabelContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SwitchLabelContext);
        }

        return this.getRuleContext(i, SwitchLabelContext);
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COLON);
    	} else {
    		return this.getToken(Java20Parser.COLON, i);
    	}
    }
    public blockStatements(): BlockStatementsContext {
        return this.getRuleContext(0, BlockStatementsContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_switchBlockStatementGroup;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterSwitchBlockStatementGroup) {
             listener.enterSwitchBlockStatementGroup(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitSwitchBlockStatementGroup) {
             listener.exitSwitchBlockStatementGroup(this);
        }
    }
}


export class SwitchLabelContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CASE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.CASE, 0);
    }
    public caseConstant(): CaseConstantContext[];
    public caseConstant(i: number): CaseConstantContext | null;
    public caseConstant(i?: number): CaseConstantContext[] | CaseConstantContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CaseConstantContext);
        }

        return this.getRuleContext(i, CaseConstantContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DEFAULT, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_switchLabel;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterSwitchLabel) {
             listener.enterSwitchLabel(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitSwitchLabel) {
             listener.exitSwitchLabel(this);
        }
    }
}


export class CaseConstantContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conditionalExpression(): ConditionalExpressionContext {
        return this.getRuleContext(0, ConditionalExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_caseConstant;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterCaseConstant) {
             listener.enterCaseConstant(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitCaseConstant) {
             listener.exitCaseConstant(this);
        }
    }
}


export class WhileStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.WHILE, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_whileStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterWhileStatement) {
             listener.enterWhileStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitWhileStatement) {
             listener.exitWhileStatement(this);
        }
    }
}


export class WhileStatementNoShortIfContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.WHILE, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public statementNoShortIf(): StatementNoShortIfContext {
        return this.getRuleContext(0, StatementNoShortIfContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_whileStatementNoShortIf;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterWhileStatementNoShortIf) {
             listener.enterWhileStatementNoShortIf(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitWhileStatementNoShortIf) {
             listener.exitWhileStatementNoShortIf(this);
        }
    }
}


export class DoStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DO(): antlr.TerminalNode {
        return this.getToken(Java20Parser.DO, 0)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.WHILE, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_doStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterDoStatement) {
             listener.enterDoStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitDoStatement) {
             listener.exitDoStatement(this);
        }
    }
}


export class ForStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public basicForStatement(): BasicForStatementContext | null {
        return this.getRuleContext(0, BasicForStatementContext);
    }
    public enhancedForStatement(): EnhancedForStatementContext | null {
        return this.getRuleContext(0, EnhancedForStatementContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_forStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterForStatement) {
             listener.enterForStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitForStatement) {
             listener.exitForStatement(this);
        }
    }
}


export class ForStatementNoShortIfContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public basicForStatementNoShortIf(): BasicForStatementNoShortIfContext | null {
        return this.getRuleContext(0, BasicForStatementNoShortIfContext);
    }
    public enhancedForStatementNoShortIf(): EnhancedForStatementNoShortIfContext | null {
        return this.getRuleContext(0, EnhancedForStatementNoShortIfContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_forStatementNoShortIf;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterForStatementNoShortIf) {
             listener.enterForStatementNoShortIf(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitForStatementNoShortIf) {
             listener.exitForStatementNoShortIf(this);
        }
    }
}


export class BasicForStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Java20Parser.FOR, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public SEMI(): antlr.TerminalNode[];
    public SEMI(i: number): antlr.TerminalNode | null;
    public SEMI(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.SEMI);
    	} else {
    		return this.getToken(Java20Parser.SEMI, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public forInit(): ForInitContext | null {
        return this.getRuleContext(0, ForInitContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public forUpdate(): ForUpdateContext | null {
        return this.getRuleContext(0, ForUpdateContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_basicForStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterBasicForStatement) {
             listener.enterBasicForStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitBasicForStatement) {
             listener.exitBasicForStatement(this);
        }
    }
}


export class BasicForStatementNoShortIfContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Java20Parser.FOR, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public SEMI(): antlr.TerminalNode[];
    public SEMI(i: number): antlr.TerminalNode | null;
    public SEMI(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.SEMI);
    	} else {
    		return this.getToken(Java20Parser.SEMI, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public statementNoShortIf(): StatementNoShortIfContext {
        return this.getRuleContext(0, StatementNoShortIfContext)!;
    }
    public forInit(): ForInitContext | null {
        return this.getRuleContext(0, ForInitContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public forUpdate(): ForUpdateContext | null {
        return this.getRuleContext(0, ForUpdateContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_basicForStatementNoShortIf;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterBasicForStatementNoShortIf) {
             listener.enterBasicForStatementNoShortIf(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitBasicForStatementNoShortIf) {
             listener.exitBasicForStatementNoShortIf(this);
        }
    }
}


export class ForInitContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statementExpressionList(): StatementExpressionListContext | null {
        return this.getRuleContext(0, StatementExpressionListContext);
    }
    public localVariableDeclaration(): LocalVariableDeclarationContext | null {
        return this.getRuleContext(0, LocalVariableDeclarationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_forInit;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterForInit) {
             listener.enterForInit(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitForInit) {
             listener.exitForInit(this);
        }
    }
}


export class ForUpdateContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statementExpressionList(): StatementExpressionListContext {
        return this.getRuleContext(0, StatementExpressionListContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_forUpdate;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterForUpdate) {
             listener.enterForUpdate(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitForUpdate) {
             listener.exitForUpdate(this);
        }
    }
}


export class StatementExpressionListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statementExpression(): StatementExpressionContext[];
    public statementExpression(i: number): StatementExpressionContext | null;
    public statementExpression(i?: number): StatementExpressionContext[] | StatementExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementExpressionContext);
        }

        return this.getRuleContext(i, StatementExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_statementExpressionList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterStatementExpressionList) {
             listener.enterStatementExpressionList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitStatementExpressionList) {
             listener.exitStatementExpressionList(this);
        }
    }
}


export class EnhancedForStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Java20Parser.FOR, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public localVariableDeclaration(): LocalVariableDeclarationContext {
        return this.getRuleContext(0, LocalVariableDeclarationContext)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(Java20Parser.COLON, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_enhancedForStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterEnhancedForStatement) {
             listener.enterEnhancedForStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitEnhancedForStatement) {
             listener.exitEnhancedForStatement(this);
        }
    }
}


export class EnhancedForStatementNoShortIfContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Java20Parser.FOR, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public localVariableDeclaration(): LocalVariableDeclarationContext {
        return this.getRuleContext(0, LocalVariableDeclarationContext)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(Java20Parser.COLON, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public statementNoShortIf(): StatementNoShortIfContext {
        return this.getRuleContext(0, StatementNoShortIfContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_enhancedForStatementNoShortIf;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterEnhancedForStatementNoShortIf) {
             listener.enterEnhancedForStatementNoShortIf(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitEnhancedForStatementNoShortIf) {
             listener.exitEnhancedForStatementNoShortIf(this);
        }
    }
}


export class BreakStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BREAK(): antlr.TerminalNode {
        return this.getToken(Java20Parser.BREAK, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_breakStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterBreakStatement) {
             listener.enterBreakStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitBreakStatement) {
             listener.exitBreakStatement(this);
        }
    }
}


export class ContinueStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CONTINUE(): antlr.TerminalNode {
        return this.getToken(Java20Parser.CONTINUE, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_continueStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterContinueStatement) {
             listener.enterContinueStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitContinueStatement) {
             listener.exitContinueStatement(this);
        }
    }
}


export class ReturnStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RETURN, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_returnStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterReturnStatement) {
             listener.enterReturnStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitReturnStatement) {
             listener.exitReturnStatement(this);
        }
    }
}


export class ThrowStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public THROW(): antlr.TerminalNode {
        return this.getToken(Java20Parser.THROW, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_throwStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterThrowStatement) {
             listener.enterThrowStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitThrowStatement) {
             listener.exitThrowStatement(this);
        }
    }
}


export class SynchronizedStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SYNCHRONIZED(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SYNCHRONIZED, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_synchronizedStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterSynchronizedStatement) {
             listener.enterSynchronizedStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitSynchronizedStatement) {
             listener.exitSynchronizedStatement(this);
        }
    }
}


export class TryStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TRY(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.TRY, 0);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public catches(): CatchesContext | null {
        return this.getRuleContext(0, CatchesContext);
    }
    public finallyBlock(): FinallyBlockContext | null {
        return this.getRuleContext(0, FinallyBlockContext);
    }
    public tryWithResourcesStatement(): TryWithResourcesStatementContext | null {
        return this.getRuleContext(0, TryWithResourcesStatementContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_tryStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTryStatement) {
             listener.enterTryStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTryStatement) {
             listener.exitTryStatement(this);
        }
    }
}


export class CatchesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public catchClause(): CatchClauseContext[];
    public catchClause(i: number): CatchClauseContext | null;
    public catchClause(i?: number): CatchClauseContext[] | CatchClauseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CatchClauseContext);
        }

        return this.getRuleContext(i, CatchClauseContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_catches;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterCatches) {
             listener.enterCatches(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitCatches) {
             listener.exitCatches(this);
        }
    }
}


export class CatchClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CATCH(): antlr.TerminalNode {
        return this.getToken(Java20Parser.CATCH, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public catchFormalParameter(): CatchFormalParameterContext {
        return this.getRuleContext(0, CatchFormalParameterContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_catchClause;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterCatchClause) {
             listener.enterCatchClause(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitCatchClause) {
             listener.exitCatchClause(this);
        }
    }
}


export class CatchFormalParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public catchType(): CatchTypeContext {
        return this.getRuleContext(0, CatchTypeContext)!;
    }
    public variableDeclaratorId(): VariableDeclaratorIdContext {
        return this.getRuleContext(0, VariableDeclaratorIdContext)!;
    }
    public variableModifier(): VariableModifierContext[];
    public variableModifier(i: number): VariableModifierContext | null;
    public variableModifier(i?: number): VariableModifierContext[] | VariableModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableModifierContext);
        }

        return this.getRuleContext(i, VariableModifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_catchFormalParameter;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterCatchFormalParameter) {
             listener.enterCatchFormalParameter(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitCatchFormalParameter) {
             listener.exitCatchFormalParameter(this);
        }
    }
}


export class CatchTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannClassType(): UnannClassTypeContext {
        return this.getRuleContext(0, UnannClassTypeContext)!;
    }
    public BITOR(): antlr.TerminalNode[];
    public BITOR(i: number): antlr.TerminalNode | null;
    public BITOR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.BITOR);
    	} else {
    		return this.getToken(Java20Parser.BITOR, i);
    	}
    }
    public classType(): ClassTypeContext[];
    public classType(i: number): ClassTypeContext | null;
    public classType(i?: number): ClassTypeContext[] | ClassTypeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ClassTypeContext);
        }

        return this.getRuleContext(i, ClassTypeContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_catchType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterCatchType) {
             listener.enterCatchType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitCatchType) {
             listener.exitCatchType(this);
        }
    }
}


export class FinallyBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FINALLY(): antlr.TerminalNode {
        return this.getToken(Java20Parser.FINALLY, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_finallyBlock;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterFinallyBlock) {
             listener.enterFinallyBlock(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitFinallyBlock) {
             listener.exitFinallyBlock(this);
        }
    }
}


export class TryWithResourcesStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TRY(): antlr.TerminalNode {
        return this.getToken(Java20Parser.TRY, 0)!;
    }
    public resourceSpecification(): ResourceSpecificationContext {
        return this.getRuleContext(0, ResourceSpecificationContext)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public catches(): CatchesContext | null {
        return this.getRuleContext(0, CatchesContext);
    }
    public finallyBlock(): FinallyBlockContext | null {
        return this.getRuleContext(0, FinallyBlockContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_tryWithResourcesStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTryWithResourcesStatement) {
             listener.enterTryWithResourcesStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTryWithResourcesStatement) {
             listener.exitTryWithResourcesStatement(this);
        }
    }
}


export class ResourceSpecificationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public resourceList(): ResourceListContext {
        return this.getRuleContext(0, ResourceListContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SEMI, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_resourceSpecification;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterResourceSpecification) {
             listener.enterResourceSpecification(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitResourceSpecification) {
             listener.exitResourceSpecification(this);
        }
    }
}


export class ResourceListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public resource(): ResourceContext[];
    public resource(i: number): ResourceContext | null;
    public resource(i?: number): ResourceContext[] | ResourceContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ResourceContext);
        }

        return this.getRuleContext(i, ResourceContext);
    }
    public SEMI(): antlr.TerminalNode[];
    public SEMI(i: number): antlr.TerminalNode | null;
    public SEMI(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.SEMI);
    	} else {
    		return this.getToken(Java20Parser.SEMI, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_resourceList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterResourceList) {
             listener.enterResourceList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitResourceList) {
             listener.exitResourceList(this);
        }
    }
}


export class ResourceContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public localVariableDeclaration(): LocalVariableDeclarationContext | null {
        return this.getRuleContext(0, LocalVariableDeclarationContext);
    }
    public variableAccess(): VariableAccessContext | null {
        return this.getRuleContext(0, VariableAccessContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_resource;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterResource) {
             listener.enterResource(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitResource) {
             listener.exitResource(this);
        }
    }
}


export class VariableAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expressionName(): ExpressionNameContext | null {
        return this.getRuleContext(0, ExpressionNameContext);
    }
    public fieldAccess(): FieldAccessContext | null {
        return this.getRuleContext(0, FieldAccessContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_variableAccess;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterVariableAccess) {
             listener.enterVariableAccess(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitVariableAccess) {
             listener.exitVariableAccess(this);
        }
    }
}


export class YieldStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public YIELD(): antlr.TerminalNode {
        return this.getToken(Java20Parser.YIELD, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_yieldStatement;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterYieldStatement) {
             listener.enterYieldStatement(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitYieldStatement) {
             listener.exitYieldStatement(this);
        }
    }
}


export class PatternContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typePattern(): TypePatternContext {
        return this.getRuleContext(0, TypePatternContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_pattern;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPattern) {
             listener.enterPattern(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPattern) {
             listener.exitPattern(this);
        }
    }
}


export class TypePatternContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public localVariableDeclaration(): LocalVariableDeclarationContext {
        return this.getRuleContext(0, LocalVariableDeclarationContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typePattern;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypePattern) {
             listener.enterTypePattern(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypePattern) {
             listener.exitTypePattern(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public lambdaExpression(): LambdaExpressionContext | null {
        return this.getRuleContext(0, LambdaExpressionContext);
    }
    public assignmentExpression(): AssignmentExpressionContext | null {
        return this.getRuleContext(0, AssignmentExpressionContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_expression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
}


export class PrimaryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public primaryNoNewArray(): PrimaryNoNewArrayContext | null {
        return this.getRuleContext(0, PrimaryNoNewArrayContext);
    }
    public arrayCreationExpression(): ArrayCreationExpressionContext | null {
        return this.getRuleContext(0, ArrayCreationExpressionContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_primary;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPrimary) {
             listener.enterPrimary(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPrimary) {
             listener.exitPrimary(this);
        }
    }
}


export class PrimaryNoNewArrayContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public literal(): LiteralContext | null {
        return this.getRuleContext(0, LiteralContext);
    }
    public pNNA(): PNNAContext | null {
        return this.getRuleContext(0, PNNAContext);
    }
    public classLiteral(): ClassLiteralContext | null {
        return this.getRuleContext(0, ClassLiteralContext);
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.THIS, 0);
    }
    public typeName(): TypeNameContext | null {
        return this.getRuleContext(0, TypeNameContext);
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.DOT);
    	} else {
    		return this.getToken(Java20Parser.DOT, i);
    	}
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.LPAREN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.RPAREN, 0);
    }
    public unqualifiedClassInstanceCreationExpression(): UnqualifiedClassInstanceCreationExpressionContext | null {
        return this.getRuleContext(0, UnqualifiedClassInstanceCreationExpressionContext);
    }
    public expressionName(): ExpressionNameContext | null {
        return this.getRuleContext(0, ExpressionNameContext);
    }
    public arrayCreationExpression(): ArrayCreationExpressionContext | null {
        return this.getRuleContext(0, ArrayCreationExpressionContext);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SUPER, 0);
    }
    public LBRACK(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.LBRACK, 0);
    }
    public RBRACK(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.RBRACK, 0);
    }
    public arrayCreationExpressionWithInitializer(): ArrayCreationExpressionWithInitializerContext | null {
        return this.getRuleContext(0, ArrayCreationExpressionWithInitializerContext);
    }
    public methodName(): MethodNameContext | null {
        return this.getRuleContext(0, MethodNameContext);
    }
    public argumentList(): ArgumentListContext | null {
        return this.getRuleContext(0, ArgumentListContext);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public COLONCOLON(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.COLONCOLON, 0);
    }
    public referenceType(): ReferenceTypeContext | null {
        return this.getRuleContext(0, ReferenceTypeContext);
    }
    public classType(): ClassTypeContext | null {
        return this.getRuleContext(0, ClassTypeContext);
    }
    public NEW(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.NEW, 0);
    }
    public arrayType(): ArrayTypeContext | null {
        return this.getRuleContext(0, ArrayTypeContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_primaryNoNewArray;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPrimaryNoNewArray) {
             listener.enterPrimaryNoNewArray(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPrimaryNoNewArray) {
             listener.exitPrimaryNoNewArray(this);
        }
    }
}


export class PNNAContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public unqualifiedClassInstanceCreationExpression(): UnqualifiedClassInstanceCreationExpressionContext | null {
        return this.getRuleContext(0, UnqualifiedClassInstanceCreationExpressionContext);
    }
    public pNNA(): PNNAContext | null {
        return this.getRuleContext(0, PNNAContext);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public LBRACK(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.LBRACK, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RBRACK(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.RBRACK, 0);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.RPAREN, 0);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public argumentList(): ArgumentListContext | null {
        return this.getRuleContext(0, ArgumentListContext);
    }
    public COLONCOLON(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.COLONCOLON, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_pNNA;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPNNA) {
             listener.enterPNNA(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPNNA) {
             listener.exitPNNA(this);
        }
    }
}


export class ClassLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeName(): TypeNameContext | null {
        return this.getRuleContext(0, TypeNameContext);
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Java20Parser.DOT, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Java20Parser.CLASS, 0)!;
    }
    public LBRACK(): antlr.TerminalNode[];
    public LBRACK(i: number): antlr.TerminalNode | null;
    public LBRACK(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.LBRACK);
    	} else {
    		return this.getToken(Java20Parser.LBRACK, i);
    	}
    }
    public RBRACK(): antlr.TerminalNode[];
    public RBRACK(i: number): antlr.TerminalNode | null;
    public RBRACK(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.RBRACK);
    	} else {
    		return this.getToken(Java20Parser.RBRACK, i);
    	}
    }
    public numericType(): NumericTypeContext | null {
        return this.getRuleContext(0, NumericTypeContext);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.BOOLEAN, 0);
    }
    public VOID(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.VOID, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classLiteral;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassLiteral) {
             listener.enterClassLiteral(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassLiteral) {
             listener.exitClassLiteral(this);
        }
    }
}


export class ClassInstanceCreationExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unqualifiedClassInstanceCreationExpression(): UnqualifiedClassInstanceCreationExpressionContext {
        return this.getRuleContext(0, UnqualifiedClassInstanceCreationExpressionContext)!;
    }
    public expressionName(): ExpressionNameContext | null {
        return this.getRuleContext(0, ExpressionNameContext);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public primary(): PrimaryContext | null {
        return this.getRuleContext(0, PrimaryContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classInstanceCreationExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassInstanceCreationExpression) {
             listener.enterClassInstanceCreationExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassInstanceCreationExpression) {
             listener.exitClassInstanceCreationExpression(this);
        }
    }
}


export class UnqualifiedClassInstanceCreationExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Java20Parser.NEW, 0)!;
    }
    public classOrInterfaceTypeToInstantiate(): ClassOrInterfaceTypeToInstantiateContext {
        return this.getRuleContext(0, ClassOrInterfaceTypeToInstantiateContext)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public argumentList(): ArgumentListContext | null {
        return this.getRuleContext(0, ArgumentListContext);
    }
    public classBody(): ClassBodyContext | null {
        return this.getRuleContext(0, ClassBodyContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_unqualifiedClassInstanceCreationExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUnqualifiedClassInstanceCreationExpression) {
             listener.enterUnqualifiedClassInstanceCreationExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUnqualifiedClassInstanceCreationExpression) {
             listener.exitUnqualifiedClassInstanceCreationExpression(this);
        }
    }
}


export class ClassOrInterfaceTypeToInstantiateContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.DOT);
    	} else {
    		return this.getToken(Java20Parser.DOT, i);
    	}
    }
    public typeArgumentsOrDiamond(): TypeArgumentsOrDiamondContext | null {
        return this.getRuleContext(0, TypeArgumentsOrDiamondContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_classOrInterfaceTypeToInstantiate;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterClassOrInterfaceTypeToInstantiate) {
             listener.enterClassOrInterfaceTypeToInstantiate(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitClassOrInterfaceTypeToInstantiate) {
             listener.exitClassOrInterfaceTypeToInstantiate(this);
        }
    }
}


export class TypeArgumentsOrDiamondContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public OACA(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.OACA, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_typeArgumentsOrDiamond;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterTypeArgumentsOrDiamond) {
             listener.enterTypeArgumentsOrDiamond(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitTypeArgumentsOrDiamond) {
             listener.exitTypeArgumentsOrDiamond(this);
        }
    }
}


export class ArrayCreationExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public arrayCreationExpressionWithoutInitializer(): ArrayCreationExpressionWithoutInitializerContext | null {
        return this.getRuleContext(0, ArrayCreationExpressionWithoutInitializerContext);
    }
    public arrayCreationExpressionWithInitializer(): ArrayCreationExpressionWithInitializerContext | null {
        return this.getRuleContext(0, ArrayCreationExpressionWithInitializerContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_arrayCreationExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterArrayCreationExpression) {
             listener.enterArrayCreationExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitArrayCreationExpression) {
             listener.exitArrayCreationExpression(this);
        }
    }
}


export class ArrayCreationExpressionWithoutInitializerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Java20Parser.NEW, 0)!;
    }
    public primitiveType(): PrimitiveTypeContext | null {
        return this.getRuleContext(0, PrimitiveTypeContext);
    }
    public dimExprs(): DimExprsContext {
        return this.getRuleContext(0, DimExprsContext)!;
    }
    public dims(): DimsContext | null {
        return this.getRuleContext(0, DimsContext);
    }
    public classType(): ClassTypeContext | null {
        return this.getRuleContext(0, ClassTypeContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_arrayCreationExpressionWithoutInitializer;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterArrayCreationExpressionWithoutInitializer) {
             listener.enterArrayCreationExpressionWithoutInitializer(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitArrayCreationExpressionWithoutInitializer) {
             listener.exitArrayCreationExpressionWithoutInitializer(this);
        }
    }
}


export class ArrayCreationExpressionWithInitializerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Java20Parser.NEW, 0)!;
    }
    public primitiveType(): PrimitiveTypeContext | null {
        return this.getRuleContext(0, PrimitiveTypeContext);
    }
    public dims(): DimsContext {
        return this.getRuleContext(0, DimsContext)!;
    }
    public arrayInitializer(): ArrayInitializerContext {
        return this.getRuleContext(0, ArrayInitializerContext)!;
    }
    public classOrInterfaceType(): ClassOrInterfaceTypeContext | null {
        return this.getRuleContext(0, ClassOrInterfaceTypeContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_arrayCreationExpressionWithInitializer;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterArrayCreationExpressionWithInitializer) {
             listener.enterArrayCreationExpressionWithInitializer(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitArrayCreationExpressionWithInitializer) {
             listener.exitArrayCreationExpressionWithInitializer(this);
        }
    }
}


export class DimExprsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public dimExpr(): DimExprContext[];
    public dimExpr(i: number): DimExprContext | null;
    public dimExpr(i?: number): DimExprContext[] | DimExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DimExprContext);
        }

        return this.getRuleContext(i, DimExprContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_dimExprs;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterDimExprs) {
             listener.enterDimExprs(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitDimExprs) {
             listener.exitDimExprs(this);
        }
    }
}


export class DimExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACK(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACK, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACK, 0)!;
    }
    public annotation(): AnnotationContext[];
    public annotation(i: number): AnnotationContext | null;
    public annotation(i?: number): AnnotationContext[] | AnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationContext);
        }

        return this.getRuleContext(i, AnnotationContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_dimExpr;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterDimExpr) {
             listener.enterDimExpr(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitDimExpr) {
             listener.exitDimExpr(this);
        }
    }
}


export class ArrayAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expressionName(): ExpressionNameContext | null {
        return this.getRuleContext(0, ExpressionNameContext);
    }
    public LBRACK(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LBRACK, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RBRACK, 0)!;
    }
    public primaryNoNewArray(): PrimaryNoNewArrayContext | null {
        return this.getRuleContext(0, PrimaryNoNewArrayContext);
    }
    public arrayCreationExpressionWithInitializer(): ArrayCreationExpressionWithInitializerContext | null {
        return this.getRuleContext(0, ArrayCreationExpressionWithInitializerContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_arrayAccess;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterArrayAccess) {
             listener.enterArrayAccess(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitArrayAccess) {
             listener.exitArrayAccess(this);
        }
    }
}


export class FieldAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public primary(): PrimaryContext | null {
        return this.getRuleContext(0, PrimaryContext);
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.DOT);
    	} else {
    		return this.getToken(Java20Parser.DOT, i);
    	}
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SUPER, 0);
    }
    public typeName(): TypeNameContext | null {
        return this.getRuleContext(0, TypeNameContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_fieldAccess;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterFieldAccess) {
             listener.enterFieldAccess(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitFieldAccess) {
             listener.exitFieldAccess(this);
        }
    }
}


export class MethodInvocationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public methodName(): MethodNameContext | null {
        return this.getRuleContext(0, MethodNameContext);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public argumentList(): ArgumentListContext | null {
        return this.getRuleContext(0, ArgumentListContext);
    }
    public typeName(): TypeNameContext | null {
        return this.getRuleContext(0, TypeNameContext);
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.DOT);
    	} else {
    		return this.getToken(Java20Parser.DOT, i);
    	}
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public expressionName(): ExpressionNameContext | null {
        return this.getRuleContext(0, ExpressionNameContext);
    }
    public primary(): PrimaryContext | null {
        return this.getRuleContext(0, PrimaryContext);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SUPER, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_methodInvocation;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterMethodInvocation) {
             listener.enterMethodInvocation(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitMethodInvocation) {
             listener.exitMethodInvocation(this);
        }
    }
}


export class ArgumentListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_argumentList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterArgumentList) {
             listener.enterArgumentList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitArgumentList) {
             listener.exitArgumentList(this);
        }
    }
}


export class MethodReferenceContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expressionName(): ExpressionNameContext | null {
        return this.getRuleContext(0, ExpressionNameContext);
    }
    public COLONCOLON(): antlr.TerminalNode {
        return this.getToken(Java20Parser.COLONCOLON, 0)!;
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public primary(): PrimaryContext | null {
        return this.getRuleContext(0, PrimaryContext);
    }
    public referenceType(): ReferenceTypeContext | null {
        return this.getRuleContext(0, ReferenceTypeContext);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SUPER, 0);
    }
    public typeName(): TypeNameContext | null {
        return this.getRuleContext(0, TypeNameContext);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DOT, 0);
    }
    public classType(): ClassTypeContext | null {
        return this.getRuleContext(0, ClassTypeContext);
    }
    public NEW(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.NEW, 0);
    }
    public arrayType(): ArrayTypeContext | null {
        return this.getRuleContext(0, ArrayTypeContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_methodReference;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterMethodReference) {
             listener.enterMethodReference(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitMethodReference) {
             listener.exitMethodReference(this);
        }
    }
}


export class PostfixExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public primary(): PrimaryContext | null {
        return this.getRuleContext(0, PrimaryContext);
    }
    public pfE(): PfEContext | null {
        return this.getRuleContext(0, PfEContext);
    }
    public expressionName(): ExpressionNameContext | null {
        return this.getRuleContext(0, ExpressionNameContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_postfixExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPostfixExpression) {
             listener.enterPostfixExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPostfixExpression) {
             listener.exitPostfixExpression(this);
        }
    }
}


export class PfEContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.INC, 0);
    }
    public pfE(): PfEContext | null {
        return this.getRuleContext(0, PfEContext);
    }
    public DEC(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DEC, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_pfE;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPfE) {
             listener.enterPfE(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPfE) {
             listener.exitPfE(this);
        }
    }
}


export class PostIncrementExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public postfixExpression(): PostfixExpressionContext {
        return this.getRuleContext(0, PostfixExpressionContext)!;
    }
    public INC(): antlr.TerminalNode {
        return this.getToken(Java20Parser.INC, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_postIncrementExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPostIncrementExpression) {
             listener.enterPostIncrementExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPostIncrementExpression) {
             listener.exitPostIncrementExpression(this);
        }
    }
}


export class PostDecrementExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public postfixExpression(): PostfixExpressionContext {
        return this.getRuleContext(0, PostfixExpressionContext)!;
    }
    public DEC(): antlr.TerminalNode {
        return this.getToken(Java20Parser.DEC, 0)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_postDecrementExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPostDecrementExpression) {
             listener.enterPostDecrementExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPostDecrementExpression) {
             listener.exitPostDecrementExpression(this);
        }
    }
}


export class UnaryExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public preIncrementExpression(): PreIncrementExpressionContext | null {
        return this.getRuleContext(0, PreIncrementExpressionContext);
    }
    public preDecrementExpression(): PreDecrementExpressionContext | null {
        return this.getRuleContext(0, PreDecrementExpressionContext);
    }
    public ADD(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.ADD, 0);
    }
    public unaryExpression(): UnaryExpressionContext | null {
        return this.getRuleContext(0, UnaryExpressionContext);
    }
    public SUB(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SUB, 0);
    }
    public unaryExpressionNotPlusMinus(): UnaryExpressionNotPlusMinusContext | null {
        return this.getRuleContext(0, UnaryExpressionNotPlusMinusContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_unaryExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUnaryExpression) {
             listener.enterUnaryExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUnaryExpression) {
             listener.exitUnaryExpression(this);
        }
    }
}


export class PreIncrementExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INC(): antlr.TerminalNode {
        return this.getToken(Java20Parser.INC, 0)!;
    }
    public unaryExpression(): UnaryExpressionContext {
        return this.getRuleContext(0, UnaryExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_preIncrementExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPreIncrementExpression) {
             listener.enterPreIncrementExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPreIncrementExpression) {
             listener.exitPreIncrementExpression(this);
        }
    }
}


export class PreDecrementExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DEC(): antlr.TerminalNode {
        return this.getToken(Java20Parser.DEC, 0)!;
    }
    public unaryExpression(): UnaryExpressionContext {
        return this.getRuleContext(0, UnaryExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_preDecrementExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterPreDecrementExpression) {
             listener.enterPreDecrementExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitPreDecrementExpression) {
             listener.exitPreDecrementExpression(this);
        }
    }
}


export class UnaryExpressionNotPlusMinusContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public postfixExpression(): PostfixExpressionContext | null {
        return this.getRuleContext(0, PostfixExpressionContext);
    }
    public TILDE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.TILDE, 0);
    }
    public unaryExpression(): UnaryExpressionContext | null {
        return this.getRuleContext(0, UnaryExpressionContext);
    }
    public BANG(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.BANG, 0);
    }
    public castExpression(): CastExpressionContext | null {
        return this.getRuleContext(0, CastExpressionContext);
    }
    public switchExpression(): SwitchExpressionContext | null {
        return this.getRuleContext(0, SwitchExpressionContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_unaryExpressionNotPlusMinus;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterUnaryExpressionNotPlusMinus) {
             listener.enterUnaryExpressionNotPlusMinus(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitUnaryExpressionNotPlusMinus) {
             listener.exitUnaryExpressionNotPlusMinus(this);
        }
    }
}


export class CastExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public primitiveType(): PrimitiveTypeContext | null {
        return this.getRuleContext(0, PrimitiveTypeContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public unaryExpression(): UnaryExpressionContext | null {
        return this.getRuleContext(0, UnaryExpressionContext);
    }
    public referenceType(): ReferenceTypeContext | null {
        return this.getRuleContext(0, ReferenceTypeContext);
    }
    public unaryExpressionNotPlusMinus(): UnaryExpressionNotPlusMinusContext | null {
        return this.getRuleContext(0, UnaryExpressionNotPlusMinusContext);
    }
    public additionalBound(): AdditionalBoundContext[];
    public additionalBound(i: number): AdditionalBoundContext | null;
    public additionalBound(i?: number): AdditionalBoundContext[] | AdditionalBoundContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AdditionalBoundContext);
        }

        return this.getRuleContext(i, AdditionalBoundContext);
    }
    public lambdaExpression(): LambdaExpressionContext | null {
        return this.getRuleContext(0, LambdaExpressionContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_castExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterCastExpression) {
             listener.enterCastExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitCastExpression) {
             listener.exitCastExpression(this);
        }
    }
}


export class MultiplicativeExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unaryExpression(): UnaryExpressionContext {
        return this.getRuleContext(0, UnaryExpressionContext)!;
    }
    public multiplicativeExpression(): MultiplicativeExpressionContext | null {
        return this.getRuleContext(0, MultiplicativeExpressionContext);
    }
    public MUL(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.MUL, 0);
    }
    public DIV(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DIV, 0);
    }
    public MOD(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.MOD, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_multiplicativeExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterMultiplicativeExpression) {
             listener.enterMultiplicativeExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitMultiplicativeExpression) {
             listener.exitMultiplicativeExpression(this);
        }
    }
}


export class AdditiveExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public multiplicativeExpression(): MultiplicativeExpressionContext {
        return this.getRuleContext(0, MultiplicativeExpressionContext)!;
    }
    public additiveExpression(): AdditiveExpressionContext | null {
        return this.getRuleContext(0, AdditiveExpressionContext);
    }
    public ADD(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.ADD, 0);
    }
    public SUB(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SUB, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_additiveExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAdditiveExpression) {
             listener.enterAdditiveExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAdditiveExpression) {
             listener.exitAdditiveExpression(this);
        }
    }
}


export class ShiftExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public additiveExpression(): AdditiveExpressionContext {
        return this.getRuleContext(0, AdditiveExpressionContext)!;
    }
    public shiftExpression(): ShiftExpressionContext | null {
        return this.getRuleContext(0, ShiftExpressionContext);
    }
    public LT(): antlr.TerminalNode[];
    public LT(i: number): antlr.TerminalNode | null;
    public LT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.LT);
    	} else {
    		return this.getToken(Java20Parser.LT, i);
    	}
    }
    public GT(): antlr.TerminalNode[];
    public GT(i: number): antlr.TerminalNode | null;
    public GT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.GT);
    	} else {
    		return this.getToken(Java20Parser.GT, i);
    	}
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_shiftExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterShiftExpression) {
             listener.enterShiftExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitShiftExpression) {
             listener.exitShiftExpression(this);
        }
    }
}


export class RelationalExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public shiftExpression(): ShiftExpressionContext | null {
        return this.getRuleContext(0, ShiftExpressionContext);
    }
    public relationalExpression(): RelationalExpressionContext | null {
        return this.getRuleContext(0, RelationalExpressionContext);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.GT, 0);
    }
    public LE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.LE, 0);
    }
    public GE(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.GE, 0);
    }
    public INSTANCEOF(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.INSTANCEOF, 0);
    }
    public referenceType(): ReferenceTypeContext | null {
        return this.getRuleContext(0, ReferenceTypeContext);
    }
    public pattern(): PatternContext | null {
        return this.getRuleContext(0, PatternContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_relationalExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterRelationalExpression) {
             listener.enterRelationalExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitRelationalExpression) {
             listener.exitRelationalExpression(this);
        }
    }
}


export class EqualityExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public relationalExpression(): RelationalExpressionContext {
        return this.getRuleContext(0, RelationalExpressionContext)!;
    }
    public equalityExpression(): EqualityExpressionContext | null {
        return this.getRuleContext(0, EqualityExpressionContext);
    }
    public EQUAL(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.EQUAL, 0);
    }
    public NOTEQUAL(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.NOTEQUAL, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_equalityExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterEqualityExpression) {
             listener.enterEqualityExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitEqualityExpression) {
             listener.exitEqualityExpression(this);
        }
    }
}


export class AndExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public equalityExpression(): EqualityExpressionContext {
        return this.getRuleContext(0, EqualityExpressionContext)!;
    }
    public andExpression(): AndExpressionContext | null {
        return this.getRuleContext(0, AndExpressionContext);
    }
    public BITAND(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.BITAND, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_andExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAndExpression) {
             listener.enterAndExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAndExpression) {
             listener.exitAndExpression(this);
        }
    }
}


export class ExclusiveOrExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public andExpression(): AndExpressionContext {
        return this.getRuleContext(0, AndExpressionContext)!;
    }
    public exclusiveOrExpression(): ExclusiveOrExpressionContext | null {
        return this.getRuleContext(0, ExclusiveOrExpressionContext);
    }
    public CARET(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.CARET, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_exclusiveOrExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterExclusiveOrExpression) {
             listener.enterExclusiveOrExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitExclusiveOrExpression) {
             listener.exitExclusiveOrExpression(this);
        }
    }
}


export class InclusiveOrExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public exclusiveOrExpression(): ExclusiveOrExpressionContext {
        return this.getRuleContext(0, ExclusiveOrExpressionContext)!;
    }
    public inclusiveOrExpression(): InclusiveOrExpressionContext | null {
        return this.getRuleContext(0, InclusiveOrExpressionContext);
    }
    public BITOR(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.BITOR, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_inclusiveOrExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterInclusiveOrExpression) {
             listener.enterInclusiveOrExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitInclusiveOrExpression) {
             listener.exitInclusiveOrExpression(this);
        }
    }
}


export class ConditionalAndExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public inclusiveOrExpression(): InclusiveOrExpressionContext {
        return this.getRuleContext(0, InclusiveOrExpressionContext)!;
    }
    public conditionalAndExpression(): ConditionalAndExpressionContext | null {
        return this.getRuleContext(0, ConditionalAndExpressionContext);
    }
    public AND(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.AND, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_conditionalAndExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterConditionalAndExpression) {
             listener.enterConditionalAndExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitConditionalAndExpression) {
             listener.exitConditionalAndExpression(this);
        }
    }
}


export class ConditionalOrExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conditionalAndExpression(): ConditionalAndExpressionContext {
        return this.getRuleContext(0, ConditionalAndExpressionContext)!;
    }
    public conditionalOrExpression(): ConditionalOrExpressionContext | null {
        return this.getRuleContext(0, ConditionalOrExpressionContext);
    }
    public OR(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.OR, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_conditionalOrExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterConditionalOrExpression) {
             listener.enterConditionalOrExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitConditionalOrExpression) {
             listener.exitConditionalOrExpression(this);
        }
    }
}


export class ConditionalExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conditionalOrExpression(): ConditionalOrExpressionContext {
        return this.getRuleContext(0, ConditionalOrExpressionContext)!;
    }
    public QUESTION(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.QUESTION, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.COLON, 0);
    }
    public conditionalExpression(): ConditionalExpressionContext | null {
        return this.getRuleContext(0, ConditionalExpressionContext);
    }
    public lambdaExpression(): LambdaExpressionContext | null {
        return this.getRuleContext(0, LambdaExpressionContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_conditionalExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterConditionalExpression) {
             listener.enterConditionalExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitConditionalExpression) {
             listener.exitConditionalExpression(this);
        }
    }
}


export class AssignmentExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conditionalExpression(): ConditionalExpressionContext | null {
        return this.getRuleContext(0, ConditionalExpressionContext);
    }
    public assignment(): AssignmentContext | null {
        return this.getRuleContext(0, AssignmentContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_assignmentExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAssignmentExpression) {
             listener.enterAssignmentExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAssignmentExpression) {
             listener.exitAssignmentExpression(this);
        }
    }
}


export class AssignmentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public leftHandSide(): LeftHandSideContext {
        return this.getRuleContext(0, LeftHandSideContext)!;
    }
    public assignmentOperator(): AssignmentOperatorContext {
        return this.getRuleContext(0, AssignmentOperatorContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_assignment;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAssignment) {
             listener.enterAssignment(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAssignment) {
             listener.exitAssignment(this);
        }
    }
}


export class LeftHandSideContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expressionName(): ExpressionNameContext | null {
        return this.getRuleContext(0, ExpressionNameContext);
    }
    public fieldAccess(): FieldAccessContext | null {
        return this.getRuleContext(0, FieldAccessContext);
    }
    public arrayAccess(): ArrayAccessContext | null {
        return this.getRuleContext(0, ArrayAccessContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_leftHandSide;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLeftHandSide) {
             listener.enterLeftHandSide(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLeftHandSide) {
             listener.exitLeftHandSide(this);
        }
    }
}


export class AssignmentOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.ASSIGN, 0);
    }
    public MUL_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.MUL_ASSIGN, 0);
    }
    public DIV_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.DIV_ASSIGN, 0);
    }
    public MOD_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.MOD_ASSIGN, 0);
    }
    public ADD_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.ADD_ASSIGN, 0);
    }
    public SUB_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.SUB_ASSIGN, 0);
    }
    public LSHIFT_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.LSHIFT_ASSIGN, 0);
    }
    public RSHIFT_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.RSHIFT_ASSIGN, 0);
    }
    public URSHIFT_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.URSHIFT_ASSIGN, 0);
    }
    public AND_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.AND_ASSIGN, 0);
    }
    public XOR_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.XOR_ASSIGN, 0);
    }
    public OR_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.OR_ASSIGN, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_assignmentOperator;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterAssignmentOperator) {
             listener.enterAssignmentOperator(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitAssignmentOperator) {
             listener.exitAssignmentOperator(this);
        }
    }
}


export class LambdaExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public lambdaParameters(): LambdaParametersContext {
        return this.getRuleContext(0, LambdaParametersContext)!;
    }
    public ARROW(): antlr.TerminalNode {
        return this.getToken(Java20Parser.ARROW, 0)!;
    }
    public lambdaBody(): LambdaBodyContext {
        return this.getRuleContext(0, LambdaBodyContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_lambdaExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLambdaExpression) {
             listener.enterLambdaExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLambdaExpression) {
             listener.exitLambdaExpression(this);
        }
    }
}


export class LambdaParametersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.RPAREN, 0);
    }
    public lambdaParameterList(): LambdaParameterListContext | null {
        return this.getRuleContext(0, LambdaParameterListContext);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_lambdaParameters;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLambdaParameters) {
             listener.enterLambdaParameters(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLambdaParameters) {
             listener.exitLambdaParameters(this);
        }
    }
}


export class LambdaParameterListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public lambdaParameter(): LambdaParameterContext[];
    public lambdaParameter(i: number): LambdaParameterContext | null;
    public lambdaParameter(i?: number): LambdaParameterContext[] | LambdaParameterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(LambdaParameterContext);
        }

        return this.getRuleContext(i, LambdaParameterContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Java20Parser.COMMA);
    	} else {
    		return this.getToken(Java20Parser.COMMA, i);
    	}
    }
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_lambdaParameterList;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLambdaParameterList) {
             listener.enterLambdaParameterList(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLambdaParameterList) {
             listener.exitLambdaParameterList(this);
        }
    }
}


export class LambdaParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public lambdaParameterType(): LambdaParameterTypeContext | null {
        return this.getRuleContext(0, LambdaParameterTypeContext);
    }
    public variableDeclaratorId(): VariableDeclaratorIdContext | null {
        return this.getRuleContext(0, VariableDeclaratorIdContext);
    }
    public variableModifier(): VariableModifierContext[];
    public variableModifier(i: number): VariableModifierContext | null;
    public variableModifier(i?: number): VariableModifierContext[] | VariableModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableModifierContext);
        }

        return this.getRuleContext(i, VariableModifierContext);
    }
    public variableArityParameter(): VariableArityParameterContext | null {
        return this.getRuleContext(0, VariableArityParameterContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_lambdaParameter;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLambdaParameter) {
             listener.enterLambdaParameter(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLambdaParameter) {
             listener.exitLambdaParameter(this);
        }
    }
}


export class LambdaParameterTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unannType(): UnannTypeContext | null {
        return this.getRuleContext(0, UnannTypeContext);
    }
    public VAR(): antlr.TerminalNode | null {
        return this.getToken(Java20Parser.VAR, 0);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_lambdaParameterType;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLambdaParameterType) {
             listener.enterLambdaParameterType(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLambdaParameterType) {
             listener.exitLambdaParameterType(this);
        }
    }
}


export class LambdaBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_lambdaBody;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterLambdaBody) {
             listener.enterLambdaBody(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitLambdaBody) {
             listener.exitLambdaBody(this);
        }
    }
}


export class SwitchExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(Java20Parser.SWITCH, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Java20Parser.RPAREN, 0)!;
    }
    public switchBlock(): SwitchBlockContext {
        return this.getRuleContext(0, SwitchBlockContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_switchExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterSwitchExpression) {
             listener.enterSwitchExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitSwitchExpression) {
             listener.exitSwitchExpression(this);
        }
    }
}


export class ConstantExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return Java20Parser.RULE_constantExpression;
    }
    public override enterRule(listener: Java20ParserListener): void {
        if(listener.enterConstantExpression) {
             listener.enterConstantExpression(this);
        }
    }
    public override exitRule(listener: Java20ParserListener): void {
        if(listener.exitConstantExpression) {
             listener.exitConstantExpression(this);
        }
    }
}
