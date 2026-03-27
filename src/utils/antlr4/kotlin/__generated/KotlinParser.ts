
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { KotlinParserListener } from "./KotlinParserListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class KotlinParser extends antlr.Parser {
    public static readonly ShebangLine = 1;
    public static readonly DelimitedComment = 2;
    public static readonly LineComment = 3;
    public static readonly WS = 4;
    public static readonly NL = 5;
    public static readonly RESERVED = 6;
    public static readonly DOT = 7;
    public static readonly COMMA = 8;
    public static readonly LPAREN = 9;
    public static readonly RPAREN = 10;
    public static readonly LSQUARE = 11;
    public static readonly RSQUARE = 12;
    public static readonly LCURL = 13;
    public static readonly RCURL = 14;
    public static readonly MULT = 15;
    public static readonly MOD = 16;
    public static readonly DIV = 17;
    public static readonly ADD = 18;
    public static readonly SUB = 19;
    public static readonly INCR = 20;
    public static readonly DECR = 21;
    public static readonly CONJ = 22;
    public static readonly DISJ = 23;
    public static readonly EXCL = 24;
    public static readonly COLON = 25;
    public static readonly SEMICOLON = 26;
    public static readonly ASSIGNMENT = 27;
    public static readonly ADD_ASSIGNMENT = 28;
    public static readonly SUB_ASSIGNMENT = 29;
    public static readonly MULT_ASSIGNMENT = 30;
    public static readonly DIV_ASSIGNMENT = 31;
    public static readonly MOD_ASSIGNMENT = 32;
    public static readonly ARROW = 33;
    public static readonly DOUBLE_ARROW = 34;
    public static readonly RANGE = 35;
    public static readonly COLONCOLON = 36;
    public static readonly Q_COLONCOLON = 37;
    public static readonly DOUBLE_SEMICOLON = 38;
    public static readonly HASH = 39;
    public static readonly AT = 40;
    public static readonly QUEST = 41;
    public static readonly ELVIS = 42;
    public static readonly LANGLE = 43;
    public static readonly RANGLE = 44;
    public static readonly LE = 45;
    public static readonly GE = 46;
    public static readonly EXCL_EQ = 47;
    public static readonly EXCL_EQEQ = 48;
    public static readonly AS_SAFE = 49;
    public static readonly EQEQ = 50;
    public static readonly EQEQEQ = 51;
    public static readonly SINGLE_QUOTE = 52;
    public static readonly RETURN_AT = 53;
    public static readonly CONTINUE_AT = 54;
    public static readonly BREAK_AT = 55;
    public static readonly FILE_SITE = 56;
    public static readonly PACKAGE = 57;
    public static readonly IMPORT = 58;
    public static readonly CLASS = 59;
    public static readonly INTERFACE = 60;
    public static readonly CONTEXT = 61;
    public static readonly FUN = 62;
    public static readonly OBJECT = 63;
    public static readonly VAL = 64;
    public static readonly VAR = 65;
    public static readonly TYPE_ALIAS = 66;
    public static readonly CONSTRUCTOR = 67;
    public static readonly BY = 68;
    public static readonly COMPANION = 69;
    public static readonly INIT = 70;
    public static readonly THIS = 71;
    public static readonly SUPER = 72;
    public static readonly TYPEOF = 73;
    public static readonly WHERE = 74;
    public static readonly IF = 75;
    public static readonly ELSE = 76;
    public static readonly WHEN = 77;
    public static readonly TRY = 78;
    public static readonly CATCH = 79;
    public static readonly FINALLY = 80;
    public static readonly FOR = 81;
    public static readonly DO = 82;
    public static readonly WHILE = 83;
    public static readonly THROW = 84;
    public static readonly RETURN = 85;
    public static readonly CONTINUE = 86;
    public static readonly BREAK = 87;
    public static readonly AS = 88;
    public static readonly IS = 89;
    public static readonly IN = 90;
    public static readonly NOT_IS = 91;
    public static readonly NOT_IN = 92;
    public static readonly OUT = 93;
    public static readonly FIELD_SITE = 94;
    public static readonly FIELD = 95;
    public static readonly PROPERTY_SITE = 96;
    public static readonly GET_SITE = 97;
    public static readonly SET_SITE = 98;
    public static readonly GETTER = 99;
    public static readonly SETTER = 100;
    public static readonly RECEIVER_SITE = 101;
    public static readonly PARAM_SITE = 102;
    public static readonly SETPARAM_SITE = 103;
    public static readonly DELEGATE_SITE = 104;
    public static readonly DYNAMIC = 105;
    public static readonly PUBLIC = 106;
    public static readonly PRIVATE = 107;
    public static readonly PROTECTED = 108;
    public static readonly INTERNAL = 109;
    public static readonly ENUM = 110;
    public static readonly SEALED = 111;
    public static readonly ANNOTATION = 112;
    public static readonly DATA = 113;
    public static readonly INNER = 114;
    public static readonly TAILREC = 115;
    public static readonly OPERATOR = 116;
    public static readonly INLINE = 117;
    public static readonly INFIX = 118;
    public static readonly EXTERNAL = 119;
    public static readonly SUSPEND = 120;
    public static readonly OVERRIDE = 121;
    public static readonly ABSTRACT = 122;
    public static readonly FINAL = 123;
    public static readonly OPEN = 124;
    public static readonly CONST = 125;
    public static readonly LATEINIT = 126;
    public static readonly VARARG = 127;
    public static readonly NOINLINE = 128;
    public static readonly CROSSINLINE = 129;
    public static readonly REIFIED = 130;
    public static readonly QUOTE_OPEN = 131;
    public static readonly TRIPLE_QUOTE_OPEN = 132;
    public static readonly RealLiteral = 133;
    public static readonly FloatLiteral = 134;
    public static readonly DoubleLiteral = 135;
    public static readonly LongLiteral = 136;
    public static readonly IntegerLiteral = 137;
    public static readonly HexLiteral = 138;
    public static readonly BinLiteral = 139;
    public static readonly BooleanLiteral = 140;
    public static readonly NullLiteral = 141;
    public static readonly Identifier = 142;
    public static readonly LabelReference = 143;
    public static readonly LabelDefinition = 144;
    public static readonly FieldIdentifier = 145;
    public static readonly CharacterLiteral = 146;
    public static readonly UNICODE_CLASS_LL = 147;
    public static readonly UNICODE_CLASS_LM = 148;
    public static readonly UNICODE_CLASS_LO = 149;
    public static readonly UNICODE_CLASS_LT = 150;
    public static readonly UNICODE_CLASS_LU = 151;
    public static readonly UNICODE_CLASS_ND = 152;
    public static readonly UNICODE_CLASS_NL = 153;
    public static readonly Inside_Comment = 154;
    public static readonly Inside_WS = 155;
    public static readonly Inside_NL = 156;
    public static readonly QUOTE_CLOSE = 157;
    public static readonly LineStrRef = 158;
    public static readonly LineStrText = 159;
    public static readonly LineStrEscapedChar = 160;
    public static readonly LineStrExprStart = 161;
    public static readonly TRIPLE_QUOTE_CLOSE = 162;
    public static readonly MultiLineStringQuote = 163;
    public static readonly MultiLineStrRef = 164;
    public static readonly MultiLineStrText = 165;
    public static readonly MultiLineStrEscapedChar = 166;
    public static readonly MultiLineStrExprStart = 167;
    public static readonly MultiLineNL = 168;
    public static readonly StrExpr_IN = 169;
    public static readonly StrExpr_Comment = 170;
    public static readonly StrExpr_WS = 171;
    public static readonly StrExpr_NL = 172;
    public static readonly RULE_kotlinFile = 0;
    public static readonly RULE_script = 1;
    public static readonly RULE_preamble = 2;
    public static readonly RULE_fileAnnotations = 3;
    public static readonly RULE_fileAnnotation = 4;
    public static readonly RULE_packageHeader = 5;
    public static readonly RULE_importList = 6;
    public static readonly RULE_importHeader = 7;
    public static readonly RULE_importAlias = 8;
    public static readonly RULE_topLevelObject = 9;
    public static readonly RULE_classDeclaration = 10;
    public static readonly RULE_primaryConstructor = 11;
    public static readonly RULE_classParameters = 12;
    public static readonly RULE_classParameter = 13;
    public static readonly RULE_delegationSpecifiers = 14;
    public static readonly RULE_delegationSpecifier = 15;
    public static readonly RULE_constructorInvocation = 16;
    public static readonly RULE_explicitDelegation = 17;
    public static readonly RULE_explicitDelegationTarget = 18;
    public static readonly RULE_classBody = 19;
    public static readonly RULE_classMemberDeclaration = 20;
    public static readonly RULE_anonymousInitializer = 21;
    public static readonly RULE_secondaryConstructor = 22;
    public static readonly RULE_constructorDelegationCall = 23;
    public static readonly RULE_enumClassBody = 24;
    public static readonly RULE_enumEntries = 25;
    public static readonly RULE_enumEntry = 26;
    public static readonly RULE_functionDeclaration = 27;
    public static readonly RULE_functionValueParameters = 28;
    public static readonly RULE_functionValueParameter = 29;
    public static readonly RULE_parameter = 30;
    public static readonly RULE_receiverType = 31;
    public static readonly RULE_functionBody = 32;
    public static readonly RULE_objectDeclaration = 33;
    public static readonly RULE_companionObject = 34;
    public static readonly RULE_propertyDeclaration = 35;
    public static readonly RULE_explicitBackingField = 36;
    public static readonly RULE_multiVariableDeclaration = 37;
    public static readonly RULE_variableDeclaration = 38;
    public static readonly RULE_getter = 39;
    public static readonly RULE_setter = 40;
    public static readonly RULE_typeAlias = 41;
    public static readonly RULE_typeParameters = 42;
    public static readonly RULE_typeParameter = 43;
    public static readonly RULE_type = 44;
    public static readonly RULE_typeModifierList = 45;
    public static readonly RULE_parenthesizedType = 46;
    public static readonly RULE_nullableType = 47;
    public static readonly RULE_typeReference = 48;
    public static readonly RULE_functionType = 49;
    public static readonly RULE_functionTypeReceiver = 50;
    public static readonly RULE_userType = 51;
    public static readonly RULE_simpleUserType = 52;
    public static readonly RULE_functionTypeParameters = 53;
    public static readonly RULE_typeConstraints = 54;
    public static readonly RULE_typeConstraint = 55;
    public static readonly RULE_block = 56;
    public static readonly RULE_statements = 57;
    public static readonly RULE_statement = 58;
    public static readonly RULE_blockLevelExpression = 59;
    public static readonly RULE_declaration = 60;
    public static readonly RULE_expression = 61;
    public static readonly RULE_disjunction = 62;
    public static readonly RULE_conjunction = 63;
    public static readonly RULE_equalityComparison = 64;
    public static readonly RULE_comparison = 65;
    public static readonly RULE_namedInfix = 66;
    public static readonly RULE_elvisExpression = 67;
    public static readonly RULE_infixFunctionCall = 68;
    public static readonly RULE_rangeExpression = 69;
    public static readonly RULE_additiveExpression = 70;
    public static readonly RULE_multiplicativeExpression = 71;
    public static readonly RULE_typeRHS = 72;
    public static readonly RULE_prefixUnaryExpression = 73;
    public static readonly RULE_postfixUnaryExpression = 74;
    public static readonly RULE_atomicExpression = 75;
    public static readonly RULE_parenthesizedExpression = 76;
    public static readonly RULE_callSuffix = 77;
    public static readonly RULE_annotatedLambda = 78;
    public static readonly RULE_arrayAccess = 79;
    public static readonly RULE_valueArguments = 80;
    public static readonly RULE_typeArguments = 81;
    public static readonly RULE_typeProjection = 82;
    public static readonly RULE_typeProjectionModifierList = 83;
    public static readonly RULE_valueArgument = 84;
    public static readonly RULE_literalConstant = 85;
    public static readonly RULE_stringLiteral = 86;
    public static readonly RULE_lineStringLiteral = 87;
    public static readonly RULE_multiLineStringLiteral = 88;
    public static readonly RULE_lineStringContent = 89;
    public static readonly RULE_lineStringExpression = 90;
    public static readonly RULE_multiLineStringContent = 91;
    public static readonly RULE_multiLineStringExpression = 92;
    public static readonly RULE_functionLiteral = 93;
    public static readonly RULE_lambdaParameters = 94;
    public static readonly RULE_lambdaParameter = 95;
    public static readonly RULE_objectLiteral = 96;
    public static readonly RULE_collectionLiteral = 97;
    public static readonly RULE_thisExpression = 98;
    public static readonly RULE_superExpression = 99;
    public static readonly RULE_conditionalExpression = 100;
    public static readonly RULE_ifExpression = 101;
    public static readonly RULE_controlStructureBody = 102;
    public static readonly RULE_whenExpression = 103;
    public static readonly RULE_whenEntry = 104;
    public static readonly RULE_whenCondition = 105;
    public static readonly RULE_rangeTest = 106;
    public static readonly RULE_typeTest = 107;
    public static readonly RULE_tryExpression = 108;
    public static readonly RULE_catchBlock = 109;
    public static readonly RULE_finallyBlock = 110;
    public static readonly RULE_loopExpression = 111;
    public static readonly RULE_forExpression = 112;
    public static readonly RULE_whileExpression = 113;
    public static readonly RULE_doWhileExpression = 114;
    public static readonly RULE_jumpExpression = 115;
    public static readonly RULE_callableReference = 116;
    public static readonly RULE_assignmentOperator = 117;
    public static readonly RULE_equalityOperation = 118;
    public static readonly RULE_comparisonOperator = 119;
    public static readonly RULE_inOperator = 120;
    public static readonly RULE_isOperator = 121;
    public static readonly RULE_additiveOperator = 122;
    public static readonly RULE_multiplicativeOperation = 123;
    public static readonly RULE_typeOperation = 124;
    public static readonly RULE_prefixUnaryOperation = 125;
    public static readonly RULE_postfixUnaryOperation = 126;
    public static readonly RULE_memberAccessOperator = 127;
    public static readonly RULE_modifierList = 128;
    public static readonly RULE_functionModifierList = 129;
    public static readonly RULE_contextParameters = 130;
    public static readonly RULE_contextModifier = 131;
    public static readonly RULE_modifier = 132;
    public static readonly RULE_classModifier = 133;
    public static readonly RULE_memberModifier = 134;
    public static readonly RULE_visibilityModifier = 135;
    public static readonly RULE_varianceAnnotation = 136;
    public static readonly RULE_functionModifier = 137;
    public static readonly RULE_propertyModifier = 138;
    public static readonly RULE_inheritanceModifier = 139;
    public static readonly RULE_parameterModifier = 140;
    public static readonly RULE_typeParameterModifier = 141;
    public static readonly RULE_labelDefinition = 142;
    public static readonly RULE_annotations = 143;
    public static readonly RULE_annotation = 144;
    public static readonly RULE_annotationList = 145;
    public static readonly RULE_annotationUseSiteTarget = 146;
    public static readonly RULE_unescapedAnnotation = 147;
    public static readonly RULE_identifier = 148;
    public static readonly RULE_simpleIdentifier = 149;
    public static readonly RULE_semi = 150;
    public static readonly RULE_anysemi = 151;

    public static readonly literalNames = [
        null, null, null, null, null, null, "'...'", "'.'", "','", "'('", 
        null, "'['", null, "'{'", "'}'", "'*'", "'%'", "'/'", "'+'", "'-'", 
        "'++'", "'--'", "'&&'", "'||'", "'!'", "':'", "';'", "'='", "'+='", 
        "'-='", "'*='", "'/='", "'%='", "'->'", "'=>'", "'..'", "'::'", 
        "'?::'", "';;'", "'#'", "'@'", "'?'", "'?:'", "'<'", "'>'", "'<='", 
        "'>='", "'!='", "'!=='", "'as?'", "'=='", "'==='", "'''", null, 
        null, null, "'@file'", "'package'", "'import'", "'class'", "'interface'", 
        "'context'", "'fun'", "'object'", "'val'", "'var'", "'typealias'", 
        "'constructor'", "'by'", "'companion'", "'init'", "'this'", "'super'", 
        "'typeof'", "'where'", "'if'", "'else'", "'when'", "'try'", "'catch'", 
        "'finally'", "'for'", "'do'", "'while'", "'throw'", "'return'", 
        "'continue'", "'break'", "'as'", "'is'", "'in'", null, null, "'out'", 
        "'@field'", "'field'", "'@property'", "'@get'", "'@set'", "'get'", 
        "'set'", "'@receiver'", "'@param'", "'@setparam'", "'@delegate'", 
        "'dynamic'", "'public'", "'private'", "'protected'", "'internal'", 
        "'enum'", "'sealed'", "'annotation'", "'data'", "'inner'", "'tailrec'", 
        "'operator'", "'inline'", "'infix'", "'external'", "'suspend'", 
        "'override'", "'abstract'", "'final'", "'open'", "'const'", "'lateinit'", 
        "'vararg'", "'noinline'", "'crossinline'", "'reified'", null, "'\"\"\"'", 
        null, null, null, null, null, null, null, null, "'null'"
    ];

    public static readonly symbolicNames = [
        null, "ShebangLine", "DelimitedComment", "LineComment", "WS", "NL", 
        "RESERVED", "DOT", "COMMA", "LPAREN", "RPAREN", "LSQUARE", "RSQUARE", 
        "LCURL", "RCURL", "MULT", "MOD", "DIV", "ADD", "SUB", "INCR", "DECR", 
        "CONJ", "DISJ", "EXCL", "COLON", "SEMICOLON", "ASSIGNMENT", "ADD_ASSIGNMENT", 
        "SUB_ASSIGNMENT", "MULT_ASSIGNMENT", "DIV_ASSIGNMENT", "MOD_ASSIGNMENT", 
        "ARROW", "DOUBLE_ARROW", "RANGE", "COLONCOLON", "Q_COLONCOLON", 
        "DOUBLE_SEMICOLON", "HASH", "AT", "QUEST", "ELVIS", "LANGLE", "RANGLE", 
        "LE", "GE", "EXCL_EQ", "EXCL_EQEQ", "AS_SAFE", "EQEQ", "EQEQEQ", 
        "SINGLE_QUOTE", "RETURN_AT", "CONTINUE_AT", "BREAK_AT", "FILE_SITE", 
        "PACKAGE", "IMPORT", "CLASS", "INTERFACE", "CONTEXT", "FUN", "OBJECT", 
        "VAL", "VAR", "TYPE_ALIAS", "CONSTRUCTOR", "BY", "COMPANION", "INIT", 
        "THIS", "SUPER", "TYPEOF", "WHERE", "IF", "ELSE", "WHEN", "TRY", 
        "CATCH", "FINALLY", "FOR", "DO", "WHILE", "THROW", "RETURN", "CONTINUE", 
        "BREAK", "AS", "IS", "IN", "NOT_IS", "NOT_IN", "OUT", "FIELD_SITE", 
        "FIELD", "PROPERTY_SITE", "GET_SITE", "SET_SITE", "GETTER", "SETTER", 
        "RECEIVER_SITE", "PARAM_SITE", "SETPARAM_SITE", "DELEGATE_SITE", 
        "DYNAMIC", "PUBLIC", "PRIVATE", "PROTECTED", "INTERNAL", "ENUM", 
        "SEALED", "ANNOTATION", "DATA", "INNER", "TAILREC", "OPERATOR", 
        "INLINE", "INFIX", "EXTERNAL", "SUSPEND", "OVERRIDE", "ABSTRACT", 
        "FINAL", "OPEN", "CONST", "LATEINIT", "VARARG", "NOINLINE", "CROSSINLINE", 
        "REIFIED", "QUOTE_OPEN", "TRIPLE_QUOTE_OPEN", "RealLiteral", "FloatLiteral", 
        "DoubleLiteral", "LongLiteral", "IntegerLiteral", "HexLiteral", 
        "BinLiteral", "BooleanLiteral", "NullLiteral", "Identifier", "LabelReference", 
        "LabelDefinition", "FieldIdentifier", "CharacterLiteral", "UNICODE_CLASS_LL", 
        "UNICODE_CLASS_LM", "UNICODE_CLASS_LO", "UNICODE_CLASS_LT", "UNICODE_CLASS_LU", 
        "UNICODE_CLASS_ND", "UNICODE_CLASS_NL", "Inside_Comment", "Inside_WS", 
        "Inside_NL", "QUOTE_CLOSE", "LineStrRef", "LineStrText", "LineStrEscapedChar", 
        "LineStrExprStart", "TRIPLE_QUOTE_CLOSE", "MultiLineStringQuote", 
        "MultiLineStrRef", "MultiLineStrText", "MultiLineStrEscapedChar", 
        "MultiLineStrExprStart", "MultiLineNL", "StrExpr_IN", "StrExpr_Comment", 
        "StrExpr_WS", "StrExpr_NL"
    ];
    public static readonly ruleNames = [
        "kotlinFile", "script", "preamble", "fileAnnotations", "fileAnnotation", 
        "packageHeader", "importList", "importHeader", "importAlias", "topLevelObject", 
        "classDeclaration", "primaryConstructor", "classParameters", "classParameter", 
        "delegationSpecifiers", "delegationSpecifier", "constructorInvocation", 
        "explicitDelegation", "explicitDelegationTarget", "classBody", "classMemberDeclaration", 
        "anonymousInitializer", "secondaryConstructor", "constructorDelegationCall", 
        "enumClassBody", "enumEntries", "enumEntry", "functionDeclaration", 
        "functionValueParameters", "functionValueParameter", "parameter", 
        "receiverType", "functionBody", "objectDeclaration", "companionObject", 
        "propertyDeclaration", "explicitBackingField", "multiVariableDeclaration", 
        "variableDeclaration", "getter", "setter", "typeAlias", "typeParameters", 
        "typeParameter", "type", "typeModifierList", "parenthesizedType", 
        "nullableType", "typeReference", "functionType", "functionTypeReceiver", 
        "userType", "simpleUserType", "functionTypeParameters", "typeConstraints", 
        "typeConstraint", "block", "statements", "statement", "blockLevelExpression", 
        "declaration", "expression", "disjunction", "conjunction", "equalityComparison", 
        "comparison", "namedInfix", "elvisExpression", "infixFunctionCall", 
        "rangeExpression", "additiveExpression", "multiplicativeExpression", 
        "typeRHS", "prefixUnaryExpression", "postfixUnaryExpression", "atomicExpression", 
        "parenthesizedExpression", "callSuffix", "annotatedLambda", "arrayAccess", 
        "valueArguments", "typeArguments", "typeProjection", "typeProjectionModifierList", 
        "valueArgument", "literalConstant", "stringLiteral", "lineStringLiteral", 
        "multiLineStringLiteral", "lineStringContent", "lineStringExpression", 
        "multiLineStringContent", "multiLineStringExpression", "functionLiteral", 
        "lambdaParameters", "lambdaParameter", "objectLiteral", "collectionLiteral", 
        "thisExpression", "superExpression", "conditionalExpression", "ifExpression", 
        "controlStructureBody", "whenExpression", "whenEntry", "whenCondition", 
        "rangeTest", "typeTest", "tryExpression", "catchBlock", "finallyBlock", 
        "loopExpression", "forExpression", "whileExpression", "doWhileExpression", 
        "jumpExpression", "callableReference", "assignmentOperator", "equalityOperation", 
        "comparisonOperator", "inOperator", "isOperator", "additiveOperator", 
        "multiplicativeOperation", "typeOperation", "prefixUnaryOperation", 
        "postfixUnaryOperation", "memberAccessOperator", "modifierList", 
        "functionModifierList", "contextParameters", "contextModifier", 
        "modifier", "classModifier", "memberModifier", "visibilityModifier", 
        "varianceAnnotation", "functionModifier", "propertyModifier", "inheritanceModifier", 
        "parameterModifier", "typeParameterModifier", "labelDefinition", 
        "annotations", "annotation", "annotationList", "annotationUseSiteTarget", 
        "unescapedAnnotation", "identifier", "simpleIdentifier", "semi", 
        "anysemi",
    ];

    public get grammarFileName(): string { return "KotlinParser.g4"; }
    public get literalNames(): (string | null)[] { return KotlinParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return KotlinParser.symbolicNames; }
    public get ruleNames(): string[] { return KotlinParser.ruleNames; }
    public get serializedATN(): number[] { return KotlinParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, KotlinParser._ATN, KotlinParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public kotlinFile(): KotlinFileContext {
        let localContext = new KotlinFileContext(this.context, this.state);
        this.enterRule(localContext, 0, KotlinParser.RULE_kotlinFile);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 307;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 0, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 304;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 309;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 0, this.context);
            }
            this.state = 310;
            this.preamble();
            this.state = 314;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5 || _la === 26) {
                {
                {
                this.state = 311;
                this.anysemi();
                }
                }
                this.state = 316;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 331;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 133758977) !== 0) || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                {
                this.state = 317;
                this.topLevelObject();
                this.state = 328;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5 || _la === 26) {
                    {
                    {
                    this.state = 319;
                    this.errorHandler.sync(this);
                    alternative = 1;
                    do {
                        switch (alternative) {
                        case 1:
                            {
                            {
                            this.state = 318;
                            this.anysemi();
                            }
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        this.state = 321;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
                    } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                    this.state = 324;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 133758977) !== 0) || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                        {
                        this.state = 323;
                        this.topLevelObject();
                        }
                    }

                    }
                    }
                    this.state = 330;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 333;
            this.match(KotlinParser.EOF);
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
    public script(): ScriptContext {
        let localContext = new ScriptContext(this.context, this.state);
        this.enterRule(localContext, 2, KotlinParser.RULE_script);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 338;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 6, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 335;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 340;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 6, this.context);
            }
            this.state = 341;
            this.preamble();
            this.state = 345;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 342;
                    this.anysemi();
                    }
                    }
                }
                this.state = 347;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            }
            this.state = 362;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 20720160) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 2589851667) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 4262461151) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4294967295) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 24563) !== 0)) {
                {
                this.state = 348;
                this.expression();
                this.state = 359;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5 || _la === 26) {
                    {
                    {
                    this.state = 350;
                    this.errorHandler.sync(this);
                    alternative = 1;
                    do {
                        switch (alternative) {
                        case 1:
                            {
                            {
                            this.state = 349;
                            this.anysemi();
                            }
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        this.state = 352;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
                    } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                    this.state = 355;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
                    case 1:
                        {
                        this.state = 354;
                        this.expression();
                        }
                        break;
                    }
                    }
                    }
                    this.state = 361;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 364;
            this.match(KotlinParser.EOF);
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
    public preamble(): PreambleContext {
        let localContext = new PreambleContext(this.context, this.state);
        this.enterRule(localContext, 4, KotlinParser.RULE_preamble);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 367;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
            case 1:
                {
                this.state = 366;
                this.fileAnnotations();
                }
                break;
            }
            this.state = 369;
            this.packageHeader();
            this.state = 370;
            this.importList();
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
    public fileAnnotations(): FileAnnotationsContext {
        let localContext = new FileAnnotationsContext(this.context, this.state);
        this.enterRule(localContext, 6, KotlinParser.RULE_fileAnnotations);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 373;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 372;
                    this.fileAnnotation();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 375;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
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
    public fileAnnotation(): FileAnnotationContext {
        let localContext = new FileAnnotationContext(this.context, this.state);
        this.enterRule(localContext, 8, KotlinParser.RULE_fileAnnotation);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 393;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 377;
                    this.match(KotlinParser.FILE_SITE);
                    this.state = 378;
                    this.match(KotlinParser.COLON);
                    this.state = 388;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case KotlinParser.LSQUARE:
                        {
                        this.state = 379;
                        this.match(KotlinParser.LSQUARE);
                        this.state = 381;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        do {
                            {
                            {
                            this.state = 380;
                            this.unescapedAnnotation();
                            }
                            }
                            this.state = 383;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                        } while (((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6364681) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 4294963397) !== 0) || ((((_la - 125)) & ~0x1F) === 0 && ((1 << (_la - 125)) & 131135) !== 0));
                        this.state = 385;
                        this.match(KotlinParser.RSQUARE);
                        }
                        break;
                    case KotlinParser.IMPORT:
                    case KotlinParser.CONTEXT:
                    case KotlinParser.CONSTRUCTOR:
                    case KotlinParser.BY:
                    case KotlinParser.COMPANION:
                    case KotlinParser.INIT:
                    case KotlinParser.WHERE:
                    case KotlinParser.CATCH:
                    case KotlinParser.FINALLY:
                    case KotlinParser.OUT:
                    case KotlinParser.FIELD:
                    case KotlinParser.GETTER:
                    case KotlinParser.SETTER:
                    case KotlinParser.DYNAMIC:
                    case KotlinParser.PUBLIC:
                    case KotlinParser.PRIVATE:
                    case KotlinParser.PROTECTED:
                    case KotlinParser.INTERNAL:
                    case KotlinParser.ENUM:
                    case KotlinParser.SEALED:
                    case KotlinParser.ANNOTATION:
                    case KotlinParser.DATA:
                    case KotlinParser.INNER:
                    case KotlinParser.TAILREC:
                    case KotlinParser.OPERATOR:
                    case KotlinParser.INLINE:
                    case KotlinParser.INFIX:
                    case KotlinParser.EXTERNAL:
                    case KotlinParser.SUSPEND:
                    case KotlinParser.OVERRIDE:
                    case KotlinParser.ABSTRACT:
                    case KotlinParser.FINAL:
                    case KotlinParser.OPEN:
                    case KotlinParser.CONST:
                    case KotlinParser.LATEINIT:
                    case KotlinParser.VARARG:
                    case KotlinParser.NOINLINE:
                    case KotlinParser.CROSSINLINE:
                    case KotlinParser.REIFIED:
                    case KotlinParser.Identifier:
                        {
                        this.state = 387;
                        this.unescapedAnnotation();
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 391;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
                    case 1:
                        {
                        this.state = 390;
                        this.semi();
                        }
                        break;
                    }
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 395;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
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
    public packageHeader(): PackageHeaderContext {
        let localContext = new PackageHeaderContext(this.context, this.state);
        this.enterRule(localContext, 10, KotlinParser.RULE_packageHeader);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 405;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context) ) {
            case 1:
                {
                this.state = 398;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                    {
                    this.state = 397;
                    this.modifierList();
                    }
                }

                this.state = 400;
                this.match(KotlinParser.PACKAGE);
                this.state = 401;
                this.identifier();
                this.state = 403;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context) ) {
                case 1:
                    {
                    this.state = 402;
                    this.semi();
                    }
                    break;
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
    public importList(): ImportListContext {
        let localContext = new ImportListContext(this.context, this.state);
        this.enterRule(localContext, 12, KotlinParser.RULE_importList);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 410;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 407;
                    this.importHeader();
                    }
                    }
                }
                this.state = 412;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
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
    public importHeader(): ImportHeaderContext {
        let localContext = new ImportHeaderContext(this.context, this.state);
        this.enterRule(localContext, 14, KotlinParser.RULE_importHeader);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 413;
            this.match(KotlinParser.IMPORT);
            this.state = 414;
            this.identifier();
            this.state = 418;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.DOT:
                {
                this.state = 415;
                this.match(KotlinParser.DOT);
                this.state = 416;
                this.match(KotlinParser.MULT);
                }
                break;
            case KotlinParser.AS:
                {
                this.state = 417;
                this.importAlias();
                }
                break;
            case KotlinParser.EOF:
            case KotlinParser.NL:
            case KotlinParser.LPAREN:
            case KotlinParser.LSQUARE:
            case KotlinParser.LCURL:
            case KotlinParser.ADD:
            case KotlinParser.SUB:
            case KotlinParser.INCR:
            case KotlinParser.DECR:
            case KotlinParser.EXCL:
            case KotlinParser.SEMICOLON:
            case KotlinParser.COLONCOLON:
            case KotlinParser.Q_COLONCOLON:
            case KotlinParser.AT:
            case KotlinParser.RETURN_AT:
            case KotlinParser.CONTINUE_AT:
            case KotlinParser.BREAK_AT:
            case KotlinParser.FILE_SITE:
            case KotlinParser.IMPORT:
            case KotlinParser.CLASS:
            case KotlinParser.INTERFACE:
            case KotlinParser.CONTEXT:
            case KotlinParser.FUN:
            case KotlinParser.OBJECT:
            case KotlinParser.VAL:
            case KotlinParser.VAR:
            case KotlinParser.TYPE_ALIAS:
            case KotlinParser.CONSTRUCTOR:
            case KotlinParser.BY:
            case KotlinParser.COMPANION:
            case KotlinParser.INIT:
            case KotlinParser.THIS:
            case KotlinParser.SUPER:
            case KotlinParser.WHERE:
            case KotlinParser.IF:
            case KotlinParser.WHEN:
            case KotlinParser.TRY:
            case KotlinParser.CATCH:
            case KotlinParser.FINALLY:
            case KotlinParser.FOR:
            case KotlinParser.DO:
            case KotlinParser.WHILE:
            case KotlinParser.THROW:
            case KotlinParser.RETURN:
            case KotlinParser.CONTINUE:
            case KotlinParser.BREAK:
            case KotlinParser.IN:
            case KotlinParser.OUT:
            case KotlinParser.FIELD_SITE:
            case KotlinParser.FIELD:
            case KotlinParser.PROPERTY_SITE:
            case KotlinParser.GET_SITE:
            case KotlinParser.SET_SITE:
            case KotlinParser.GETTER:
            case KotlinParser.SETTER:
            case KotlinParser.RECEIVER_SITE:
            case KotlinParser.PARAM_SITE:
            case KotlinParser.SETPARAM_SITE:
            case KotlinParser.DELEGATE_SITE:
            case KotlinParser.DYNAMIC:
            case KotlinParser.PUBLIC:
            case KotlinParser.PRIVATE:
            case KotlinParser.PROTECTED:
            case KotlinParser.INTERNAL:
            case KotlinParser.ENUM:
            case KotlinParser.SEALED:
            case KotlinParser.ANNOTATION:
            case KotlinParser.DATA:
            case KotlinParser.INNER:
            case KotlinParser.TAILREC:
            case KotlinParser.OPERATOR:
            case KotlinParser.INLINE:
            case KotlinParser.INFIX:
            case KotlinParser.EXTERNAL:
            case KotlinParser.SUSPEND:
            case KotlinParser.OVERRIDE:
            case KotlinParser.ABSTRACT:
            case KotlinParser.FINAL:
            case KotlinParser.OPEN:
            case KotlinParser.CONST:
            case KotlinParser.LATEINIT:
            case KotlinParser.VARARG:
            case KotlinParser.NOINLINE:
            case KotlinParser.CROSSINLINE:
            case KotlinParser.REIFIED:
            case KotlinParser.QUOTE_OPEN:
            case KotlinParser.TRIPLE_QUOTE_OPEN:
            case KotlinParser.RealLiteral:
            case KotlinParser.LongLiteral:
            case KotlinParser.IntegerLiteral:
            case KotlinParser.HexLiteral:
            case KotlinParser.BinLiteral:
            case KotlinParser.BooleanLiteral:
            case KotlinParser.NullLiteral:
            case KotlinParser.Identifier:
            case KotlinParser.LabelReference:
            case KotlinParser.LabelDefinition:
            case KotlinParser.CharacterLiteral:
                break;
            default:
                break;
            }
            this.state = 421;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context) ) {
            case 1:
                {
                this.state = 420;
                this.semi();
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
    public importAlias(): ImportAliasContext {
        let localContext = new ImportAliasContext(this.context, this.state);
        this.enterRule(localContext, 16, KotlinParser.RULE_importAlias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 423;
            this.match(KotlinParser.AS);
            this.state = 424;
            this.simpleIdentifier();
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
    public topLevelObject(): TopLevelObjectContext {
        let localContext = new TopLevelObjectContext(this.context, this.state);
        this.enterRule(localContext, 18, KotlinParser.RULE_topLevelObject);
        try {
            this.state = 431;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 426;
                this.classDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 427;
                this.objectDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 428;
                this.functionDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 429;
                this.propertyDeclaration();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 430;
                this.typeAlias();
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
    public classDeclaration(): ClassDeclarationContext {
        let localContext = new ClassDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 20, KotlinParser.RULE_classDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 434;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                {
                this.state = 433;
                this.modifierList();
                }
            }

            this.state = 436;
            _la = this.tokenStream.LA(1);
            if(!(_la === 59 || _la === 60)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 440;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 437;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 442;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 443;
            this.simpleIdentifier();
            this.state = 451;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                {
                this.state = 447;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 444;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 449;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 450;
                this.typeParameters();
                }
                break;
            }
            this.state = 460;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
            case 1:
                {
                this.state = 456;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 453;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 458;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 459;
                this.primaryConstructor();
                }
                break;
            }
            this.state = 476;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 33, this.context) ) {
            case 1:
                {
                this.state = 465;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 462;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 467;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 468;
                this.match(KotlinParser.COLON);
                this.state = 472;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 469;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 474;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 475;
                this.delegationSpecifiers();
                }
                break;
            }
            this.state = 485;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
            case 1:
                {
                this.state = 481;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 478;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 483;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 484;
                this.typeConstraints();
                }
                break;
            }
            this.state = 501;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context) ) {
            case 1:
                {
                this.state = 490;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 487;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 492;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 493;
                this.classBody();
                }
                break;
            case 2:
                {
                this.state = 497;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 494;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 499;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 500;
                this.enumClassBody();
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
    public primaryConstructor(): PrimaryConstructorContext {
        let localContext = new PrimaryConstructorContext(this.context, this.state);
        this.enterRule(localContext, 22, KotlinParser.RULE_primaryConstructor);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 504;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                {
                this.state = 503;
                this.modifierList();
                }
            }

            this.state = 513;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 506;
                this.match(KotlinParser.CONSTRUCTOR);
                this.state = 510;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 507;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 512;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 515;
            this.classParameters();
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
    public classParameters(): ClassParametersContext {
        let localContext = new ClassParametersContext(this.context, this.state);
        this.enterRule(localContext, 24, KotlinParser.RULE_classParameters);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 517;
            this.match(KotlinParser.LPAREN);
            this.state = 529;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 2066022401) !== 0) || ((((_la - 74)) & ~0x1F) === 0 && ((1 << (_la - 74)) & 4294508641) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 33554431) !== 0) || _la === 142 || _la === 143) {
                {
                this.state = 518;
                this.classParameter();
                this.state = 523;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 519;
                        this.match(KotlinParser.COMMA);
                        this.state = 520;
                        this.classParameter();
                        }
                        }
                    }
                    this.state = 525;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
                }
                this.state = 527;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 8) {
                    {
                    this.state = 526;
                    this.match(KotlinParser.COMMA);
                    }
                }

                }
            }

            this.state = 531;
            this.match(KotlinParser.RPAREN);
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
    public classParameter(): ClassParameterContext {
        let localContext = new ClassParameterContext(this.context, this.state);
        this.enterRule(localContext, 26, KotlinParser.RULE_classParameter);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 534;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context) ) {
            case 1:
                {
                this.state = 533;
                this.modifierList();
                }
                break;
            }
            this.state = 537;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 64 || _la === 65) {
                {
                this.state = 536;
                _la = this.tokenStream.LA(1);
                if(!(_la === 64 || _la === 65)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
            }

            this.state = 539;
            this.simpleIdentifier();
            this.state = 540;
            this.match(KotlinParser.COLON);
            this.state = 541;
            this.type_();
            this.state = 570;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context) ) {
            case 1:
                {
                {
                this.state = 545;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 542;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 547;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 548;
                this.match(KotlinParser.ASSIGNMENT);
                this.state = 552;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 48, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 549;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 554;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 48, this.context);
                }
                this.state = 555;
                this.expression();
                }
                }
                break;
            case 2:
                {
                {
                this.state = 559;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 556;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 561;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 562;
                this.match(KotlinParser.BY);
                this.state = 566;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 563;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 568;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
                }
                this.state = 569;
                this.expression();
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
    public delegationSpecifiers(): DelegationSpecifiersContext {
        let localContext = new DelegationSpecifiersContext(this.context, this.state);
        this.enterRule(localContext, 28, KotlinParser.RULE_delegationSpecifiers);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 575;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 40 || _la === 56 || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 1949) !== 0) || _la === 143) {
                {
                {
                this.state = 572;
                this.annotations();
                }
                }
                this.state = 577;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 578;
            this.delegationSpecifier();
            this.state = 601;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 56, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 582;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 579;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 584;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 585;
                    this.match(KotlinParser.COMMA);
                    this.state = 589;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 586;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 591;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 595;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 40 || _la === 56 || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 1949) !== 0) || _la === 143) {
                        {
                        {
                        this.state = 592;
                        this.annotations();
                        }
                        }
                        this.state = 597;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 598;
                    this.delegationSpecifier();
                    }
                    }
                }
                this.state = 603;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 56, this.context);
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
    public delegationSpecifier(): DelegationSpecifierContext {
        let localContext = new DelegationSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 30, KotlinParser.RULE_delegationSpecifier);
        try {
            this.state = 607;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 57, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 604;
                this.constructorInvocation();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 605;
                this.userType();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 606;
                this.explicitDelegation();
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
    public constructorInvocation(): ConstructorInvocationContext {
        let localContext = new ConstructorInvocationContext(this.context, this.state);
        this.enterRule(localContext, 32, KotlinParser.RULE_constructorInvocation);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 609;
            this.userType();
            this.state = 611;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 58, this.context) ) {
            case 1:
                {
                this.state = 610;
                this.typeArguments();
                }
                break;
            }
            this.state = 614;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 59, this.context) ) {
            case 1:
                {
                this.state = 613;
                this.valueArguments();
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
    public explicitDelegation(): ExplicitDelegationContext {
        let localContext = new ExplicitDelegationContext(this.context, this.state);
        this.enterRule(localContext, 34, KotlinParser.RULE_explicitDelegation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 616;
            this.userType();
            this.state = 620;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 617;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 622;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 623;
            this.match(KotlinParser.BY);
            this.state = 627;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 624;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 629;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 630;
            this.explicitDelegationTarget();
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
    public explicitDelegationTarget(): ExplicitDelegationTargetContext {
        let localContext = new ExplicitDelegationTargetContext(this.context, this.state);
        this.enterRule(localContext, 36, KotlinParser.RULE_explicitDelegationTarget);
        try {
            this.state = 634;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 62, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 632;
                this.userType();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 633;
                this.constructorInvocation();
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
    public classBody(): ClassBodyContext {
        let localContext = new ClassBodyContext(this.context, this.state);
        this.enterRule(localContext, 38, KotlinParser.RULE_classBody);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 636;
            this.match(KotlinParser.LCURL);
            this.state = 640;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 63, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 637;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 642;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 63, this.context);
            }
            this.state = 646;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 1878589441) !== 0) || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                {
                {
                this.state = 643;
                this.classMemberDeclaration();
                }
                }
                this.state = 648;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 652;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 649;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 654;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 655;
            this.match(KotlinParser.RCURL);
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
        this.enterRule(localContext, 40, KotlinParser.RULE_classMemberDeclaration);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 665;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 66, this.context) ) {
            case 1:
                {
                this.state = 657;
                this.classDeclaration();
                }
                break;
            case 2:
                {
                this.state = 658;
                this.functionDeclaration();
                }
                break;
            case 3:
                {
                this.state = 659;
                this.objectDeclaration();
                }
                break;
            case 4:
                {
                this.state = 660;
                this.companionObject();
                }
                break;
            case 5:
                {
                this.state = 661;
                this.propertyDeclaration();
                }
                break;
            case 6:
                {
                this.state = 662;
                this.anonymousInitializer();
                }
                break;
            case 7:
                {
                this.state = 663;
                this.secondaryConstructor();
                }
                break;
            case 8:
                {
                this.state = 664;
                this.typeAlias();
                }
                break;
            }
            this.state = 668;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 667;
                    this.anysemi();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 670;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 67, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
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
    public anonymousInitializer(): AnonymousInitializerContext {
        let localContext = new AnonymousInitializerContext(this.context, this.state);
        this.enterRule(localContext, 42, KotlinParser.RULE_anonymousInitializer);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 672;
            this.match(KotlinParser.INIT);
            this.state = 676;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 673;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 678;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 679;
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
    public secondaryConstructor(): SecondaryConstructorContext {
        let localContext = new SecondaryConstructorContext(this.context, this.state);
        this.enterRule(localContext, 44, KotlinParser.RULE_secondaryConstructor);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 682;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                {
                this.state = 681;
                this.modifierList();
                }
            }

            this.state = 684;
            this.match(KotlinParser.CONSTRUCTOR);
            this.state = 688;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 685;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 690;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 691;
            this.functionValueParameters();
            this.state = 706;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 73, this.context) ) {
            case 1:
                {
                this.state = 695;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 692;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 697;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 698;
                this.match(KotlinParser.COLON);
                this.state = 702;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 699;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 704;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 705;
                this.constructorDelegationCall();
                }
                break;
            }
            this.state = 711;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 74, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 708;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 713;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 74, this.context);
            }
            this.state = 715;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 13) {
                {
                this.state = 714;
                this.block();
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
    public constructorDelegationCall(): ConstructorDelegationCallContext {
        let localContext = new ConstructorDelegationCallContext(this.context, this.state);
        this.enterRule(localContext, 46, KotlinParser.RULE_constructorDelegationCall);
        let _la: number;
        try {
            this.state = 733;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.THIS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 717;
                this.match(KotlinParser.THIS);
                this.state = 721;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 718;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 723;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 724;
                this.valueArguments();
                }
                break;
            case KotlinParser.SUPER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 725;
                this.match(KotlinParser.SUPER);
                this.state = 729;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 726;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 731;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 732;
                this.valueArguments();
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
    public enumClassBody(): EnumClassBodyContext {
        let localContext = new EnumClassBodyContext(this.context, this.state);
        this.enterRule(localContext, 48, KotlinParser.RULE_enumClassBody);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 735;
            this.match(KotlinParser.LCURL);
            this.state = 739;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 736;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 741;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
            }
            this.state = 743;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 2015690753) !== 0) || ((((_la - 74)) & ~0x1F) === 0 && ((1 << (_la - 74)) & 4294443105) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 33554431) !== 0) || _la === 142 || _la === 143) {
                {
                this.state = 742;
                this.enumEntries();
                }
            }

            this.state = 764;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
            case 1:
                {
                this.state = 748;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 745;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 750;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 751;
                this.match(KotlinParser.SEMICOLON);
                this.state = 755;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 752;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 757;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
                }
                this.state = 761;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 1878589441) !== 0) || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                    {
                    {
                    this.state = 758;
                    this.classMemberDeclaration();
                    }
                    }
                    this.state = 763;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 769;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 766;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 771;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 772;
            this.match(KotlinParser.RCURL);
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
    public enumEntries(): EnumEntriesContext {
        let localContext = new EnumEntriesContext(this.context, this.state);
        this.enterRule(localContext, 50, KotlinParser.RULE_enumEntries);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 781;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 774;
                this.enumEntry();
                this.state = 778;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 86, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 775;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 780;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 86, this.context);
                }
                }
                }
                this.state = 783;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 2015690753) !== 0) || ((((_la - 74)) & ~0x1F) === 0 && ((1 << (_la - 74)) & 4294443105) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 33554431) !== 0) || _la === 142 || _la === 143);
            this.state = 786;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context) ) {
            case 1:
                {
                this.state = 785;
                this.match(KotlinParser.SEMICOLON);
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
    public enumEntry(): EnumEntryContext {
        let localContext = new EnumEntryContext(this.context, this.state);
        this.enterRule(localContext, 52, KotlinParser.RULE_enumEntry);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 791;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 40 || _la === 56 || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 1949) !== 0) || _la === 143) {
                {
                {
                this.state = 788;
                this.annotations();
                }
                }
                this.state = 793;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 794;
            this.simpleIdentifier();
            this.state = 802;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 91, this.context) ) {
            case 1:
                {
                this.state = 798;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 795;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 800;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 801;
                this.valueArguments();
                }
                break;
            }
            this.state = 811;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 93, this.context) ) {
            case 1:
                {
                this.state = 807;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 804;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 809;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 810;
                this.classBody();
                }
                break;
            }
            this.state = 820;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                {
                this.state = 816;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 813;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 818;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 819;
                this.match(KotlinParser.COMMA);
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
    public functionDeclaration(): FunctionDeclarationContext {
        let localContext = new FunctionDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 54, KotlinParser.RULE_functionDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 823;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 2162689) !== 0) || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                {
                this.state = 822;
                this.functionModifierList();
                }
            }

            this.state = 825;
            this.match(KotlinParser.FUN);
            this.state = 833;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 98, this.context) ) {
            case 1:
                {
                this.state = 829;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 826;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 831;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 832;
                this.typeParameters();
                }
                break;
            }
            this.state = 850;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 101, this.context) ) {
            case 1:
                {
                this.state = 838;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 835;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 840;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 841;
                this.receiverType();
                this.state = 845;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 842;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 847;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 848;
                this.match(KotlinParser.DOT);
                }
                break;
            }
            this.state = 859;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 103, this.context) ) {
            case 1:
                {
                this.state = 855;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 852;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 857;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 858;
                this.identifier();
                }
                break;
            }
            this.state = 864;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 861;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 866;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 867;
            this.functionValueParameters();
            this.state = 882;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context) ) {
            case 1:
                {
                this.state = 871;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 868;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 873;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 874;
                this.match(KotlinParser.COLON);
                this.state = 878;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 875;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 880;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 881;
                this.type_();
                }
                break;
            }
            this.state = 891;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 109, this.context) ) {
            case 1:
                {
                this.state = 887;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 884;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 889;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 890;
                this.typeConstraints();
                }
                break;
            }
            this.state = 900;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
            case 1:
                {
                this.state = 896;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 893;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 898;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 899;
                this.functionBody();
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
    public functionValueParameters(): FunctionValueParametersContext {
        let localContext = new FunctionValueParametersContext(this.context, this.state);
        this.enterRule(localContext, 56, KotlinParser.RULE_functionValueParameters);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 902;
            this.match(KotlinParser.LPAREN);
            this.state = 914;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 2015690753) !== 0) || ((((_la - 74)) & ~0x1F) === 0 && ((1 << (_la - 74)) & 4294508641) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 33554431) !== 0) || _la === 142 || _la === 143) {
                {
                this.state = 903;
                this.functionValueParameter();
                this.state = 908;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 112, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 904;
                        this.match(KotlinParser.COMMA);
                        this.state = 905;
                        this.functionValueParameter();
                        }
                        }
                    }
                    this.state = 910;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 112, this.context);
                }
                this.state = 912;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 8) {
                    {
                    this.state = 911;
                    this.match(KotlinParser.COMMA);
                    }
                }

                }
            }

            this.state = 916;
            this.match(KotlinParser.RPAREN);
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
    public functionValueParameter(): FunctionValueParameterContext {
        let localContext = new FunctionValueParameterContext(this.context, this.state);
        this.enterRule(localContext, 58, KotlinParser.RULE_functionValueParameter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 919;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 115, this.context) ) {
            case 1:
                {
                this.state = 918;
                this.modifierList();
                }
                break;
            }
            this.state = 921;
            this.parameter();
            this.state = 924;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 27) {
                {
                this.state = 922;
                this.match(KotlinParser.ASSIGNMENT);
                this.state = 923;
                this.expression();
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
    public parameter(): ParameterContext {
        let localContext = new ParameterContext(this.context, this.state);
        this.enterRule(localContext, 60, KotlinParser.RULE_parameter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 926;
            this.simpleIdentifier();
            this.state = 927;
            this.match(KotlinParser.COLON);
            this.state = 928;
            this.type_();
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
    public receiverType(): ReceiverTypeContext {
        let localContext = new ReceiverTypeContext(this.context, this.state);
        this.enterRule(localContext, 62, KotlinParser.RULE_receiverType);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 931;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 117, this.context) ) {
            case 1:
                {
                this.state = 930;
                this.typeModifierList();
                }
                break;
            }
            this.state = 936;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 118, this.context) ) {
            case 1:
                {
                this.state = 933;
                this.parenthesizedType();
                }
                break;
            case 2:
                {
                this.state = 934;
                this.nullableType();
                }
                break;
            case 3:
                {
                this.state = 935;
                this.typeReference();
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
    public functionBody(): FunctionBodyContext {
        let localContext = new FunctionBodyContext(this.context, this.state);
        this.enterRule(localContext, 64, KotlinParser.RULE_functionBody);
        try {
            let alternative: number;
            this.state = 947;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.LCURL:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 938;
                this.block();
                }
                break;
            case KotlinParser.ASSIGNMENT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 939;
                this.match(KotlinParser.ASSIGNMENT);
                this.state = 943;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 119, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 940;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 945;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 119, this.context);
                }
                this.state = 946;
                this.expression();
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
    public objectDeclaration(): ObjectDeclarationContext {
        let localContext = new ObjectDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 66, KotlinParser.RULE_objectDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 950;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                {
                this.state = 949;
                this.modifierList();
                }
            }

            this.state = 952;
            this.match(KotlinParser.OBJECT);
            this.state = 956;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 953;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 958;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 959;
            this.simpleIdentifier();
            this.state = 967;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 124, this.context) ) {
            case 1:
                {
                this.state = 963;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 960;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 965;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 966;
                this.primaryConstructor();
                }
                break;
            }
            this.state = 983;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 127, this.context) ) {
            case 1:
                {
                this.state = 972;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 969;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 974;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 975;
                this.match(KotlinParser.COLON);
                this.state = 979;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 976;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 981;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 982;
                this.delegationSpecifiers();
                }
                break;
            }
            this.state = 992;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 129, this.context) ) {
            case 1:
                {
                this.state = 988;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 985;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 990;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 991;
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
    public companionObject(): CompanionObjectContext {
        let localContext = new CompanionObjectContext(this.context, this.state);
        this.enterRule(localContext, 68, KotlinParser.RULE_companionObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 995;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                {
                this.state = 994;
                this.modifierList();
                }
            }

            this.state = 997;
            this.match(KotlinParser.COMPANION);
            this.state = 1001;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 998;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1003;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1005;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                {
                this.state = 1004;
                this.modifierList();
                }
            }

            this.state = 1007;
            this.match(KotlinParser.OBJECT);
            this.state = 1015;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 134, this.context) ) {
            case 1:
                {
                this.state = 1011;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1008;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1013;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1014;
                this.simpleIdentifier();
                }
                break;
            }
            this.state = 1031;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 137, this.context) ) {
            case 1:
                {
                this.state = 1020;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1017;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1022;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1023;
                this.match(KotlinParser.COLON);
                this.state = 1027;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1024;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1029;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1030;
                this.delegationSpecifiers();
                }
                break;
            }
            this.state = 1040;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 139, this.context) ) {
            case 1:
                {
                this.state = 1036;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1033;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1038;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1039;
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
    public propertyDeclaration(): PropertyDeclarationContext {
        let localContext = new PropertyDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 70, KotlinParser.RULE_propertyDeclaration);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1043;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                {
                this.state = 1042;
                this.modifierList();
                }
            }

            this.state = 1045;
            _la = this.tokenStream.LA(1);
            if(!(_la === 64 || _la === 65)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1053;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 142, this.context) ) {
            case 1:
                {
                this.state = 1049;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1046;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1051;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1052;
                this.typeParameters();
                }
                break;
            }
            this.state = 1070;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 145, this.context) ) {
            case 1:
                {
                this.state = 1058;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1055;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1060;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1061;
                this.type_();
                this.state = 1065;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1062;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1067;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1068;
                this.match(KotlinParser.DOT);
                }
                break;
            }
            {
            this.state = 1075;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1072;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1077;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1080;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.LPAREN:
                {
                this.state = 1078;
                this.multiVariableDeclaration();
                }
                break;
            case KotlinParser.IMPORT:
            case KotlinParser.CONTEXT:
            case KotlinParser.CONSTRUCTOR:
            case KotlinParser.BY:
            case KotlinParser.COMPANION:
            case KotlinParser.INIT:
            case KotlinParser.WHERE:
            case KotlinParser.CATCH:
            case KotlinParser.FINALLY:
            case KotlinParser.OUT:
            case KotlinParser.FIELD:
            case KotlinParser.GETTER:
            case KotlinParser.SETTER:
            case KotlinParser.DYNAMIC:
            case KotlinParser.PUBLIC:
            case KotlinParser.PRIVATE:
            case KotlinParser.PROTECTED:
            case KotlinParser.INTERNAL:
            case KotlinParser.ENUM:
            case KotlinParser.SEALED:
            case KotlinParser.ANNOTATION:
            case KotlinParser.DATA:
            case KotlinParser.INNER:
            case KotlinParser.TAILREC:
            case KotlinParser.OPERATOR:
            case KotlinParser.INLINE:
            case KotlinParser.INFIX:
            case KotlinParser.EXTERNAL:
            case KotlinParser.SUSPEND:
            case KotlinParser.OVERRIDE:
            case KotlinParser.ABSTRACT:
            case KotlinParser.FINAL:
            case KotlinParser.OPEN:
            case KotlinParser.CONST:
            case KotlinParser.LATEINIT:
            case KotlinParser.VARARG:
            case KotlinParser.NOINLINE:
            case KotlinParser.CROSSINLINE:
            case KotlinParser.REIFIED:
            case KotlinParser.Identifier:
                {
                this.state = 1079;
                this.variableDeclaration();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
            this.state = 1089;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 149, this.context) ) {
            case 1:
                {
                this.state = 1085;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1082;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1087;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1088;
                this.typeConstraints();
                }
                break;
            }
            this.state = 1105;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 152, this.context) ) {
            case 1:
                {
                this.state = 1094;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1091;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1096;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1097;
                _la = this.tokenStream.LA(1);
                if(!(_la === 27 || _la === 68)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 1101;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 151, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 1098;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 1103;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 151, this.context);
                }
                this.state = 1104;
                this.expression();
                }
                break;
            }
            this.state = 1140;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 159, this.context) ) {
            case 1:
                {
                this.state = 1131;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 157, this.context) ) {
                case 1:
                    {
                    this.state = 1110;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1107;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1112;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1113;
                    this.getter();
                    this.state = 1117;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 154, this.context) ) {
                    case 1:
                        {
                        this.state = 1114;
                        this.semi();
                        this.state = 1115;
                        this.setter();
                        }
                        break;
                    }
                    }
                    break;
                case 2:
                    {
                    this.state = 1122;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1119;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1124;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1125;
                    this.setter();
                    this.state = 1129;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 156, this.context) ) {
                    case 1:
                        {
                        this.state = 1126;
                        this.semi();
                        this.state = 1127;
                        this.getter();
                        }
                        break;
                    }
                    }
                    break;
                }
                }
                break;
            case 2:
                {
                this.state = 1136;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1133;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1138;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1139;
                this.explicitBackingField();
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
    public explicitBackingField(): ExplicitBackingFieldContext {
        let localContext = new ExplicitBackingFieldContext(this.context, this.state);
        this.enterRule(localContext, 72, KotlinParser.RULE_explicitBackingField);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1142;
            this.match(KotlinParser.FIELD);
            this.state = 1143;
            this.match(KotlinParser.COLON);
            this.state = 1144;
            this.type_();
            this.state = 1145;
            this.match(KotlinParser.ASSIGNMENT);
            this.state = 1149;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 160, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1146;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 1151;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 160, this.context);
            }
            this.state = 1152;
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
    public multiVariableDeclaration(): MultiVariableDeclarationContext {
        let localContext = new MultiVariableDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 74, KotlinParser.RULE_multiVariableDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1154;
            this.match(KotlinParser.LPAREN);
            this.state = 1155;
            this.variableDeclaration();
            this.state = 1160;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 8) {
                {
                {
                this.state = 1156;
                this.match(KotlinParser.COMMA);
                this.state = 1157;
                this.variableDeclaration();
                }
                }
                this.state = 1162;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1163;
            this.match(KotlinParser.RPAREN);
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
    public variableDeclaration(): VariableDeclarationContext {
        let localContext = new VariableDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 76, KotlinParser.RULE_variableDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1165;
            this.simpleIdentifier();
            this.state = 1168;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 25) {
                {
                this.state = 1166;
                this.match(KotlinParser.COLON);
                this.state = 1167;
                this.type_();
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
    public getter(): GetterContext {
        let localContext = new GetterContext(this.context, this.state);
        this.enterRule(localContext, 78, KotlinParser.RULE_getter);
        let _la: number;
        try {
            let alternative: number;
            this.state = 1219;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 172, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1171;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                    {
                    this.state = 1170;
                    this.modifierList();
                    }
                }

                this.state = 1173;
                this.match(KotlinParser.GETTER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1175;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                    {
                    this.state = 1174;
                    this.modifierList();
                    }
                }

                this.state = 1177;
                this.match(KotlinParser.GETTER);
                this.state = 1181;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1178;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1183;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1184;
                this.match(KotlinParser.LPAREN);
                this.state = 1185;
                this.match(KotlinParser.RPAREN);
                this.state = 1200;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 168, this.context) ) {
                case 1:
                    {
                    this.state = 1189;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1186;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1191;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1192;
                    this.match(KotlinParser.COLON);
                    this.state = 1196;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1193;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1198;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1199;
                    this.type_();
                    }
                    break;
                }
                this.state = 1205;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1202;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1207;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1217;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case KotlinParser.LCURL:
                    {
                    this.state = 1208;
                    this.block();
                    }
                    break;
                case KotlinParser.ASSIGNMENT:
                    {
                    this.state = 1209;
                    this.match(KotlinParser.ASSIGNMENT);
                    this.state = 1213;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 170, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1210;
                            this.match(KotlinParser.NL);
                            }
                            }
                        }
                        this.state = 1215;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 170, this.context);
                    }
                    this.state = 1216;
                    this.expression();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
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
    public setter(): SetterContext {
        let localContext = new SetterContext(this.context, this.state);
        this.enterRule(localContext, 80, KotlinParser.RULE_setter);
        let _la: number;
        try {
            let alternative: number;
            this.state = 1256;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 180, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1222;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                    {
                    this.state = 1221;
                    this.modifierList();
                    }
                }

                this.state = 1224;
                this.match(KotlinParser.SETTER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1226;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                    {
                    this.state = 1225;
                    this.modifierList();
                    }
                }

                this.state = 1228;
                this.match(KotlinParser.SETTER);
                this.state = 1232;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1229;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1234;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1235;
                this.match(KotlinParser.LPAREN);
                this.state = 1240;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 177, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        this.state = 1238;
                        this.errorHandler.sync(this);
                        switch (this.tokenStream.LA(1)) {
                        case KotlinParser.AT:
                        case KotlinParser.FILE_SITE:
                        case KotlinParser.FIELD_SITE:
                        case KotlinParser.PROPERTY_SITE:
                        case KotlinParser.GET_SITE:
                        case KotlinParser.SET_SITE:
                        case KotlinParser.RECEIVER_SITE:
                        case KotlinParser.PARAM_SITE:
                        case KotlinParser.SETPARAM_SITE:
                        case KotlinParser.DELEGATE_SITE:
                        case KotlinParser.LabelReference:
                            {
                            this.state = 1236;
                            this.annotations();
                            }
                            break;
                        case KotlinParser.VARARG:
                        case KotlinParser.NOINLINE:
                        case KotlinParser.CROSSINLINE:
                            {
                            this.state = 1237;
                            this.parameterModifier();
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        }
                    }
                    this.state = 1242;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 177, this.context);
                }
                this.state = 1245;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 178, this.context) ) {
                case 1:
                    {
                    this.state = 1243;
                    this.simpleIdentifier();
                    }
                    break;
                case 2:
                    {
                    this.state = 1244;
                    this.parameter();
                    }
                    break;
                }
                this.state = 1247;
                this.match(KotlinParser.RPAREN);
                this.state = 1251;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1248;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1253;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1254;
                this.functionBody();
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
    public typeAlias(): TypeAliasContext {
        let localContext = new TypeAliasContext(this.context, this.state);
        this.enterRule(localContext, 82, KotlinParser.RULE_typeAlias);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1259;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 56 || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0)) {
                {
                this.state = 1258;
                this.modifierList();
                }
            }

            this.state = 1261;
            this.match(KotlinParser.TYPE_ALIAS);
            this.state = 1265;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1262;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1267;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1268;
            this.simpleIdentifier();
            this.state = 1276;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 184, this.context) ) {
            case 1:
                {
                this.state = 1272;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1269;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1274;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1275;
                this.typeParameters();
                }
                break;
            }
            this.state = 1281;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1278;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1283;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1284;
            this.match(KotlinParser.ASSIGNMENT);
            this.state = 1288;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1285;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1290;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1291;
            this.type_();
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
        this.enterRule(localContext, 84, KotlinParser.RULE_typeParameters);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1293;
            this.match(KotlinParser.LANGLE);
            this.state = 1297;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 187, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1294;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 1299;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 187, this.context);
            }
            this.state = 1300;
            this.typeParameter();
            this.state = 1317;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 190, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1304;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1301;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1306;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1307;
                    this.match(KotlinParser.COMMA);
                    this.state = 1311;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 189, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1308;
                            this.match(KotlinParser.NL);
                            }
                            }
                        }
                        this.state = 1313;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 189, this.context);
                    }
                    this.state = 1314;
                    this.typeParameter();
                    }
                    }
                }
                this.state = 1319;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 190, this.context);
            }
            this.state = 1327;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 192, this.context) ) {
            case 1:
                {
                this.state = 1323;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1320;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1325;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1326;
                this.match(KotlinParser.COMMA);
                }
                break;
            }
            this.state = 1332;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1329;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1334;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1335;
            this.match(KotlinParser.RANGLE);
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
        this.enterRule(localContext, 86, KotlinParser.RULE_typeParameter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1338;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 194, this.context) ) {
            case 1:
                {
                this.state = 1337;
                this.modifierList();
                }
                break;
            }
            this.state = 1343;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1340;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1345;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1348;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.IMPORT:
            case KotlinParser.CONTEXT:
            case KotlinParser.CONSTRUCTOR:
            case KotlinParser.BY:
            case KotlinParser.COMPANION:
            case KotlinParser.INIT:
            case KotlinParser.WHERE:
            case KotlinParser.CATCH:
            case KotlinParser.FINALLY:
            case KotlinParser.OUT:
            case KotlinParser.FIELD:
            case KotlinParser.GETTER:
            case KotlinParser.SETTER:
            case KotlinParser.DYNAMIC:
            case KotlinParser.PUBLIC:
            case KotlinParser.PRIVATE:
            case KotlinParser.PROTECTED:
            case KotlinParser.INTERNAL:
            case KotlinParser.ENUM:
            case KotlinParser.SEALED:
            case KotlinParser.ANNOTATION:
            case KotlinParser.DATA:
            case KotlinParser.INNER:
            case KotlinParser.TAILREC:
            case KotlinParser.OPERATOR:
            case KotlinParser.INLINE:
            case KotlinParser.INFIX:
            case KotlinParser.EXTERNAL:
            case KotlinParser.SUSPEND:
            case KotlinParser.OVERRIDE:
            case KotlinParser.ABSTRACT:
            case KotlinParser.FINAL:
            case KotlinParser.OPEN:
            case KotlinParser.CONST:
            case KotlinParser.LATEINIT:
            case KotlinParser.VARARG:
            case KotlinParser.NOINLINE:
            case KotlinParser.CROSSINLINE:
            case KotlinParser.REIFIED:
            case KotlinParser.Identifier:
                {
                this.state = 1346;
                this.simpleIdentifier();
                }
                break;
            case KotlinParser.MULT:
                {
                this.state = 1347;
                this.match(KotlinParser.MULT);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 1364;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 199, this.context) ) {
            case 1:
                {
                this.state = 1353;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1350;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1355;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1356;
                this.match(KotlinParser.COLON);
                this.state = 1360;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1357;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1362;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1363;
                this.type_();
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
    public type_(): TypeContext {
        let localContext = new TypeContext(this.context, this.state);
        this.enterRule(localContext, 88, KotlinParser.RULE_type);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1367;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 200, this.context) ) {
            case 1:
                {
                this.state = 1366;
                this.typeModifierList();
                }
                break;
            }
            this.state = 1373;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 201, this.context) ) {
            case 1:
                {
                this.state = 1369;
                this.functionType();
                }
                break;
            case 2:
                {
                this.state = 1370;
                this.parenthesizedType();
                }
                break;
            case 3:
                {
                this.state = 1371;
                this.nullableType();
                }
                break;
            case 4:
                {
                this.state = 1372;
                this.typeReference();
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
    public typeModifierList(): TypeModifierListContext {
        let localContext = new TypeModifierListContext(this.context, this.state);
        this.enterRule(localContext, 90, KotlinParser.RULE_typeModifierList);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1383;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    this.state = 1383;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case KotlinParser.AT:
                    case KotlinParser.FILE_SITE:
                    case KotlinParser.FIELD_SITE:
                    case KotlinParser.PROPERTY_SITE:
                    case KotlinParser.GET_SITE:
                    case KotlinParser.SET_SITE:
                    case KotlinParser.RECEIVER_SITE:
                    case KotlinParser.PARAM_SITE:
                    case KotlinParser.SETPARAM_SITE:
                    case KotlinParser.DELEGATE_SITE:
                    case KotlinParser.LabelReference:
                        {
                        this.state = 1375;
                        this.annotations();
                        }
                        break;
                    case KotlinParser.SUSPEND:
                        {
                        this.state = 1376;
                        this.match(KotlinParser.SUSPEND);
                        this.state = 1380;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        while (_la === 5) {
                            {
                            {
                            this.state = 1377;
                            this.match(KotlinParser.NL);
                            }
                            }
                            this.state = 1382;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 1385;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 204, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
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
    public parenthesizedType(): ParenthesizedTypeContext {
        let localContext = new ParenthesizedTypeContext(this.context, this.state);
        this.enterRule(localContext, 92, KotlinParser.RULE_parenthesizedType);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1387;
            this.match(KotlinParser.LPAREN);
            this.state = 1388;
            this.type_();
            this.state = 1389;
            this.match(KotlinParser.RPAREN);
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
    public nullableType(): NullableTypeContext {
        let localContext = new NullableTypeContext(this.context, this.state);
        this.enterRule(localContext, 94, KotlinParser.RULE_nullableType);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1393;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 205, this.context) ) {
            case 1:
                {
                this.state = 1391;
                this.typeReference();
                }
                break;
            case 2:
                {
                this.state = 1392;
                this.parenthesizedType();
                }
                break;
            }
            this.state = 1398;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1395;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1400;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1402;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 1401;
                    this.match(KotlinParser.QUEST);
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 1404;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 207, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
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
    public typeReference(): TypeReferenceContext {
        let localContext = new TypeReferenceContext(this.context, this.state);
        this.enterRule(localContext, 96, KotlinParser.RULE_typeReference);
        try {
            this.state = 1412;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 208, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1406;
                this.match(KotlinParser.LPAREN);
                this.state = 1407;
                this.typeReference();
                this.state = 1408;
                this.match(KotlinParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1410;
                this.userType();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1411;
                this.match(KotlinParser.DYNAMIC);
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
    public functionType(): FunctionTypeContext {
        let localContext = new FunctionTypeContext(this.context, this.state);
        this.enterRule(localContext, 98, KotlinParser.RULE_functionType);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1428;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 211, this.context) ) {
            case 1:
                {
                this.state = 1414;
                this.functionTypeReceiver();
                this.state = 1418;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1415;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1420;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1421;
                this.match(KotlinParser.DOT);
                this.state = 1425;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1422;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1427;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 1430;
            this.functionTypeParameters();
            this.state = 1434;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1431;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1436;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1437;
            this.match(KotlinParser.ARROW);
            {
            this.state = 1441;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1438;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1443;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1444;
            this.type_();
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
    public functionTypeReceiver(): FunctionTypeReceiverContext {
        let localContext = new FunctionTypeReceiverContext(this.context, this.state);
        this.enterRule(localContext, 100, KotlinParser.RULE_functionTypeReceiver);
        try {
            this.state = 1449;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 214, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1446;
                this.parenthesizedType();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1447;
                this.nullableType();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1448;
                this.typeReference();
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
    public userType(): UserTypeContext {
        let localContext = new UserTypeContext(this.context, this.state);
        this.enterRule(localContext, 102, KotlinParser.RULE_userType);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1451;
            this.simpleUserType();
            this.state = 1468;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 217, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1455;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1452;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1457;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1458;
                    this.match(KotlinParser.DOT);
                    this.state = 1462;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1459;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1464;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1465;
                    this.simpleUserType();
                    }
                    }
                }
                this.state = 1470;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 217, this.context);
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
    public simpleUserType(): SimpleUserTypeContext {
        let localContext = new SimpleUserTypeContext(this.context, this.state);
        this.enterRule(localContext, 104, KotlinParser.RULE_simpleUserType);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1471;
            this.simpleIdentifier();
            this.state = 1479;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 219, this.context) ) {
            case 1:
                {
                this.state = 1475;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1472;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1477;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1478;
                this.typeArguments();
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
    public functionTypeParameters(): FunctionTypeParametersContext {
        let localContext = new FunctionTypeParametersContext(this.context, this.state);
        this.enterRule(localContext, 106, KotlinParser.RULE_functionTypeParameters);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1481;
            this.match(KotlinParser.LPAREN);
            this.state = 1485;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 220, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1482;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 1487;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 220, this.context);
            }
            this.state = 1490;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 221, this.context) ) {
            case 1:
                {
                this.state = 1488;
                this.parameter();
                }
                break;
            case 2:
                {
                this.state = 1489;
                this.type_();
                }
                break;
            }
            this.state = 1511;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 225, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1495;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1492;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1497;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1498;
                    this.match(KotlinParser.COMMA);
                    this.state = 1502;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1499;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1504;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1507;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 224, this.context) ) {
                    case 1:
                        {
                        this.state = 1505;
                        this.parameter();
                        }
                        break;
                    case 2:
                        {
                        this.state = 1506;
                        this.type_();
                        }
                        break;
                    }
                    }
                    }
                }
                this.state = 1513;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 225, this.context);
            }
            this.state = 1521;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 227, this.context) ) {
            case 1:
                {
                this.state = 1517;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1514;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1519;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1520;
                this.match(KotlinParser.COMMA);
                }
                break;
            }
            this.state = 1526;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1523;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1528;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1529;
            this.match(KotlinParser.RPAREN);
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
    public typeConstraints(): TypeConstraintsContext {
        let localContext = new TypeConstraintsContext(this.context, this.state);
        this.enterRule(localContext, 108, KotlinParser.RULE_typeConstraints);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1531;
            this.match(KotlinParser.WHERE);
            this.state = 1535;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1532;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1537;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1538;
            this.typeConstraint();
            this.state = 1555;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 232, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1542;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1539;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1544;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1545;
                    this.match(KotlinParser.COMMA);
                    this.state = 1549;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1546;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1551;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1552;
                    this.typeConstraint();
                    }
                    }
                }
                this.state = 1557;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 232, this.context);
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
    public typeConstraint(): TypeConstraintContext {
        let localContext = new TypeConstraintContext(this.context, this.state);
        this.enterRule(localContext, 110, KotlinParser.RULE_typeConstraint);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1561;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 40 || _la === 56 || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 1949) !== 0) || _la === 143) {
                {
                {
                this.state = 1558;
                this.annotations();
                }
                }
                this.state = 1563;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1564;
            this.simpleIdentifier();
            this.state = 1568;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1565;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1570;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1571;
            this.match(KotlinParser.COLON);
            this.state = 1575;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1572;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1577;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1578;
            this.type_();
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
        this.enterRule(localContext, 112, KotlinParser.RULE_block);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1580;
            this.match(KotlinParser.LCURL);
            this.state = 1581;
            this.statements();
            this.state = 1582;
            this.match(KotlinParser.RCURL);
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
    public statements(): StatementsContext {
        let localContext = new StatementsContext(this.context, this.state);
        this.enterRule(localContext, 114, KotlinParser.RULE_statements);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1587;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 236, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1584;
                    this.anysemi();
                    }
                    }
                }
                this.state = 1589;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 236, this.context);
            }
            this.state = 1604;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 240, this.context) ) {
            case 1:
                {
                this.state = 1590;
                this.statement();
                this.state = 1601;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 239, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 1592;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 1591;
                                this.anysemi();
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 1594;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 237, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        this.state = 1597;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 238, this.context) ) {
                        case 1:
                            {
                            this.state = 1596;
                            this.statement();
                            }
                            break;
                        }
                        }
                        }
                    }
                    this.state = 1603;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 239, this.context);
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
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 116, KotlinParser.RULE_statement);
        try {
            this.state = 1608;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 241, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1606;
                this.declaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1607;
                this.blockLevelExpression();
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
    public blockLevelExpression(): BlockLevelExpressionContext {
        let localContext = new BlockLevelExpressionContext(this.context, this.state);
        this.enterRule(localContext, 118, KotlinParser.RULE_blockLevelExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1613;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 242, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1610;
                    this.annotations();
                    }
                    }
                }
                this.state = 1615;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 242, this.context);
            }
            this.state = 1619;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 243, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1616;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 1621;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 243, this.context);
            }
            this.state = 1622;
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
    public declaration(): DeclarationContext {
        let localContext = new DeclarationContext(this.context, this.state);
        this.enterRule(localContext, 120, KotlinParser.RULE_declaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1627;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 144) {
                {
                {
                this.state = 1624;
                this.labelDefinition();
                }
                }
                this.state = 1629;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1634;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 245, this.context) ) {
            case 1:
                {
                this.state = 1630;
                this.classDeclaration();
                }
                break;
            case 2:
                {
                this.state = 1631;
                this.functionDeclaration();
                }
                break;
            case 3:
                {
                this.state = 1632;
                this.propertyDeclaration();
                }
                break;
            case 4:
                {
                this.state = 1633;
                this.typeAlias();
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
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 122, KotlinParser.RULE_expression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1636;
            this.disjunction();
            this.state = 1642;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 246, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1637;
                    this.assignmentOperator();
                    this.state = 1638;
                    this.disjunction();
                    }
                    }
                }
                this.state = 1644;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 246, this.context);
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
    public disjunction(): DisjunctionContext {
        let localContext = new DisjunctionContext(this.context, this.state);
        this.enterRule(localContext, 124, KotlinParser.RULE_disjunction);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1645;
            this.conjunction();
            this.state = 1662;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 249, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1649;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1646;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1651;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1652;
                    this.match(KotlinParser.DISJ);
                    this.state = 1656;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 248, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1653;
                            this.match(KotlinParser.NL);
                            }
                            }
                        }
                        this.state = 1658;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 248, this.context);
                    }
                    this.state = 1659;
                    this.conjunction();
                    }
                    }
                }
                this.state = 1664;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 249, this.context);
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
    public conjunction(): ConjunctionContext {
        let localContext = new ConjunctionContext(this.context, this.state);
        this.enterRule(localContext, 126, KotlinParser.RULE_conjunction);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1665;
            this.equalityComparison();
            this.state = 1682;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 252, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1669;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1666;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1671;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1672;
                    this.match(KotlinParser.CONJ);
                    this.state = 1676;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 251, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1673;
                            this.match(KotlinParser.NL);
                            }
                            }
                        }
                        this.state = 1678;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 251, this.context);
                    }
                    this.state = 1679;
                    this.equalityComparison();
                    }
                    }
                }
                this.state = 1684;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 252, this.context);
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
    public equalityComparison(): EqualityComparisonContext {
        let localContext = new EqualityComparisonContext(this.context, this.state);
        this.enterRule(localContext, 128, KotlinParser.RULE_equalityComparison);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1685;
            this.comparison();
            this.state = 1697;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 254, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1686;
                    this.equalityOperation();
                    this.state = 1690;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 253, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1687;
                            this.match(KotlinParser.NL);
                            }
                            }
                        }
                        this.state = 1692;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 253, this.context);
                    }
                    this.state = 1693;
                    this.comparison();
                    }
                    }
                }
                this.state = 1699;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 254, this.context);
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
    public comparison(): ComparisonContext {
        let localContext = new ComparisonContext(this.context, this.state);
        this.enterRule(localContext, 130, KotlinParser.RULE_comparison);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1700;
            this.namedInfix();
            this.state = 1710;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 256, this.context) ) {
            case 1:
                {
                this.state = 1701;
                this.comparisonOperator();
                this.state = 1705;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 255, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 1702;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 1707;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 255, this.context);
                }
                this.state = 1708;
                this.namedInfix();
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
    public namedInfix(): NamedInfixContext {
        let localContext = new NamedInfixContext(this.context, this.state);
        this.enterRule(localContext, 132, KotlinParser.RULE_namedInfix);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1712;
            this.elvisExpression();
            this.state = 1735;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 260, this.context) ) {
            case 1:
                {
                this.state = 1722;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                    case 1:
                        {
                        {
                        this.state = 1713;
                        this.inOperator();
                        this.state = 1717;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 257, this.context);
                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                            if (alternative === 1) {
                                {
                                {
                                this.state = 1714;
                                this.match(KotlinParser.NL);
                                }
                                }
                            }
                            this.state = 1719;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 257, this.context);
                        }
                        this.state = 1720;
                        this.elvisExpression();
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 1724;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 258, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                }
                break;
            case 2:
                {
                {
                this.state = 1726;
                this.isOperator();
                this.state = 1730;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1727;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1732;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1733;
                this.type_();
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
    public elvisExpression(): ElvisExpressionContext {
        let localContext = new ElvisExpressionContext(this.context, this.state);
        this.enterRule(localContext, 134, KotlinParser.RULE_elvisExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1737;
            this.infixFunctionCall();
            this.state = 1754;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 263, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1741;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1738;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1743;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1744;
                    this.match(KotlinParser.ELVIS);
                    this.state = 1748;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 262, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1745;
                            this.match(KotlinParser.NL);
                            }
                            }
                        }
                        this.state = 1750;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 262, this.context);
                    }
                    this.state = 1751;
                    this.infixFunctionCall();
                    }
                    }
                }
                this.state = 1756;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 263, this.context);
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
    public infixFunctionCall(): InfixFunctionCallContext {
        let localContext = new InfixFunctionCallContext(this.context, this.state);
        this.enterRule(localContext, 136, KotlinParser.RULE_infixFunctionCall);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1757;
            this.rangeExpression();
            this.state = 1769;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 265, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1758;
                    this.simpleIdentifier();
                    this.state = 1762;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 264, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1759;
                            this.match(KotlinParser.NL);
                            }
                            }
                        }
                        this.state = 1764;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 264, this.context);
                    }
                    this.state = 1765;
                    this.rangeExpression();
                    }
                    }
                }
                this.state = 1771;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 265, this.context);
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
    public rangeExpression(): RangeExpressionContext {
        let localContext = new RangeExpressionContext(this.context, this.state);
        this.enterRule(localContext, 138, KotlinParser.RULE_rangeExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1772;
            this.additiveExpression();
            this.state = 1783;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 267, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1773;
                    this.match(KotlinParser.RANGE);
                    this.state = 1777;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 266, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1774;
                            this.match(KotlinParser.NL);
                            }
                            }
                        }
                        this.state = 1779;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 266, this.context);
                    }
                    this.state = 1780;
                    this.additiveExpression();
                    }
                    }
                }
                this.state = 1785;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 267, this.context);
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
    public additiveExpression(): AdditiveExpressionContext {
        let localContext = new AdditiveExpressionContext(this.context, this.state);
        this.enterRule(localContext, 140, KotlinParser.RULE_additiveExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1786;
            this.multiplicativeExpression();
            this.state = 1798;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 269, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1787;
                    this.additiveOperator();
                    this.state = 1791;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 268, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1788;
                            this.match(KotlinParser.NL);
                            }
                            }
                        }
                        this.state = 1793;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 268, this.context);
                    }
                    this.state = 1794;
                    this.multiplicativeExpression();
                    }
                    }
                }
                this.state = 1800;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 269, this.context);
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
    public multiplicativeExpression(): MultiplicativeExpressionContext {
        let localContext = new MultiplicativeExpressionContext(this.context, this.state);
        this.enterRule(localContext, 142, KotlinParser.RULE_multiplicativeExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1801;
            this.typeRHS();
            this.state = 1813;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 271, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1802;
                    this.multiplicativeOperation();
                    this.state = 1806;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 270, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1803;
                            this.match(KotlinParser.NL);
                            }
                            }
                        }
                        this.state = 1808;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 270, this.context);
                    }
                    this.state = 1809;
                    this.typeRHS();
                    }
                    }
                }
                this.state = 1815;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 271, this.context);
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
    public typeRHS(): TypeRHSContext {
        let localContext = new TypeRHSContext(this.context, this.state);
        this.enterRule(localContext, 144, KotlinParser.RULE_typeRHS);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1816;
            this.prefixUnaryExpression();
            this.state = 1828;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 273, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1820;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1817;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1822;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1823;
                    this.typeOperation();
                    this.state = 1824;
                    this.prefixUnaryExpression();
                    }
                    }
                }
                this.state = 1830;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 273, this.context);
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
    public prefixUnaryExpression(): PrefixUnaryExpressionContext {
        let localContext = new PrefixUnaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 146, KotlinParser.RULE_prefixUnaryExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1834;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 274, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1831;
                    this.prefixUnaryOperation();
                    }
                    }
                }
                this.state = 1836;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 274, this.context);
            }
            this.state = 1837;
            this.postfixUnaryExpression();
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
    public postfixUnaryExpression(): PostfixUnaryExpressionContext {
        let localContext = new PostfixUnaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 148, KotlinParser.RULE_postfixUnaryExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1841;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 275, this.context) ) {
            case 1:
                {
                this.state = 1839;
                this.atomicExpression();
                }
                break;
            case 2:
                {
                this.state = 1840;
                this.callableReference();
                }
                break;
            }
            this.state = 1846;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 276, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1843;
                    this.postfixUnaryOperation();
                    }
                    }
                }
                this.state = 1848;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 276, this.context);
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
    public atomicExpression(): AtomicExpressionContext {
        let localContext = new AtomicExpressionContext(this.context, this.state);
        this.enterRule(localContext, 150, KotlinParser.RULE_atomicExpression);
        try {
            this.state = 1863;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1849;
                this.parenthesizedExpression();
                }
                break;
            case KotlinParser.QUOTE_OPEN:
            case KotlinParser.TRIPLE_QUOTE_OPEN:
            case KotlinParser.RealLiteral:
            case KotlinParser.LongLiteral:
            case KotlinParser.IntegerLiteral:
            case KotlinParser.HexLiteral:
            case KotlinParser.BinLiteral:
            case KotlinParser.BooleanLiteral:
            case KotlinParser.NullLiteral:
            case KotlinParser.CharacterLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1850;
                this.literalConstant();
                }
                break;
            case KotlinParser.LCURL:
            case KotlinParser.AT:
            case KotlinParser.FILE_SITE:
            case KotlinParser.FIELD_SITE:
            case KotlinParser.PROPERTY_SITE:
            case KotlinParser.GET_SITE:
            case KotlinParser.SET_SITE:
            case KotlinParser.RECEIVER_SITE:
            case KotlinParser.PARAM_SITE:
            case KotlinParser.SETPARAM_SITE:
            case KotlinParser.DELEGATE_SITE:
            case KotlinParser.LabelReference:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1851;
                this.functionLiteral();
                }
                break;
            case KotlinParser.THIS:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1852;
                this.thisExpression();
                }
                break;
            case KotlinParser.SUPER:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1853;
                this.superExpression();
                }
                break;
            case KotlinParser.IF:
            case KotlinParser.WHEN:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1854;
                this.conditionalExpression();
                }
                break;
            case KotlinParser.TRY:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1855;
                this.tryExpression();
                }
                break;
            case KotlinParser.OBJECT:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1856;
                this.objectLiteral();
                }
                break;
            case KotlinParser.RETURN_AT:
            case KotlinParser.CONTINUE_AT:
            case KotlinParser.BREAK_AT:
            case KotlinParser.THROW:
            case KotlinParser.RETURN:
            case KotlinParser.CONTINUE:
            case KotlinParser.BREAK:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1857;
                this.jumpExpression();
                }
                break;
            case KotlinParser.FOR:
            case KotlinParser.DO:
            case KotlinParser.WHILE:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1858;
                this.loopExpression();
                }
                break;
            case KotlinParser.LSQUARE:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1859;
                this.collectionLiteral();
                }
                break;
            case KotlinParser.IMPORT:
            case KotlinParser.CONTEXT:
            case KotlinParser.CONSTRUCTOR:
            case KotlinParser.BY:
            case KotlinParser.COMPANION:
            case KotlinParser.INIT:
            case KotlinParser.WHERE:
            case KotlinParser.CATCH:
            case KotlinParser.FINALLY:
            case KotlinParser.OUT:
            case KotlinParser.FIELD:
            case KotlinParser.GETTER:
            case KotlinParser.SETTER:
            case KotlinParser.DYNAMIC:
            case KotlinParser.PUBLIC:
            case KotlinParser.PRIVATE:
            case KotlinParser.PROTECTED:
            case KotlinParser.INTERNAL:
            case KotlinParser.ENUM:
            case KotlinParser.SEALED:
            case KotlinParser.ANNOTATION:
            case KotlinParser.DATA:
            case KotlinParser.INNER:
            case KotlinParser.TAILREC:
            case KotlinParser.OPERATOR:
            case KotlinParser.INLINE:
            case KotlinParser.INFIX:
            case KotlinParser.EXTERNAL:
            case KotlinParser.SUSPEND:
            case KotlinParser.OVERRIDE:
            case KotlinParser.ABSTRACT:
            case KotlinParser.FINAL:
            case KotlinParser.OPEN:
            case KotlinParser.CONST:
            case KotlinParser.LATEINIT:
            case KotlinParser.VARARG:
            case KotlinParser.NOINLINE:
            case KotlinParser.CROSSINLINE:
            case KotlinParser.REIFIED:
            case KotlinParser.Identifier:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1860;
                this.simpleIdentifier();
                }
                break;
            case KotlinParser.VAL:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1861;
                this.match(KotlinParser.VAL);
                this.state = 1862;
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
    public parenthesizedExpression(): ParenthesizedExpressionContext {
        let localContext = new ParenthesizedExpressionContext(this.context, this.state);
        this.enterRule(localContext, 152, KotlinParser.RULE_parenthesizedExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1865;
            this.match(KotlinParser.LPAREN);
            this.state = 1866;
            this.expression();
            this.state = 1867;
            this.match(KotlinParser.RPAREN);
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
    public callSuffix(): CallSuffixContext {
        let localContext = new CallSuffixContext(this.context, this.state);
        this.enterRule(localContext, 154, KotlinParser.RULE_callSuffix);
        try {
            let alternative: number;
            this.state = 1891;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.LANGLE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1869;
                this.typeArguments();
                this.state = 1871;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 278, this.context) ) {
                case 1:
                    {
                    this.state = 1870;
                    this.valueArguments();
                    }
                    break;
                }
                this.state = 1876;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 279, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 1873;
                        this.annotatedLambda();
                        }
                        }
                    }
                    this.state = 1878;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 279, this.context);
                }
                }
                break;
            case KotlinParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1879;
                this.valueArguments();
                this.state = 1883;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 280, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 1880;
                        this.annotatedLambda();
                        }
                        }
                    }
                    this.state = 1885;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 280, this.context);
                }
                }
                break;
            case KotlinParser.NL:
            case KotlinParser.LCURL:
            case KotlinParser.AT:
            case KotlinParser.FILE_SITE:
            case KotlinParser.IMPORT:
            case KotlinParser.CONTEXT:
            case KotlinParser.CONSTRUCTOR:
            case KotlinParser.BY:
            case KotlinParser.COMPANION:
            case KotlinParser.INIT:
            case KotlinParser.WHERE:
            case KotlinParser.CATCH:
            case KotlinParser.FINALLY:
            case KotlinParser.OUT:
            case KotlinParser.FIELD_SITE:
            case KotlinParser.FIELD:
            case KotlinParser.PROPERTY_SITE:
            case KotlinParser.GET_SITE:
            case KotlinParser.SET_SITE:
            case KotlinParser.GETTER:
            case KotlinParser.SETTER:
            case KotlinParser.RECEIVER_SITE:
            case KotlinParser.PARAM_SITE:
            case KotlinParser.SETPARAM_SITE:
            case KotlinParser.DELEGATE_SITE:
            case KotlinParser.DYNAMIC:
            case KotlinParser.PUBLIC:
            case KotlinParser.PRIVATE:
            case KotlinParser.PROTECTED:
            case KotlinParser.INTERNAL:
            case KotlinParser.ENUM:
            case KotlinParser.SEALED:
            case KotlinParser.ANNOTATION:
            case KotlinParser.DATA:
            case KotlinParser.INNER:
            case KotlinParser.TAILREC:
            case KotlinParser.OPERATOR:
            case KotlinParser.INLINE:
            case KotlinParser.INFIX:
            case KotlinParser.EXTERNAL:
            case KotlinParser.SUSPEND:
            case KotlinParser.OVERRIDE:
            case KotlinParser.ABSTRACT:
            case KotlinParser.FINAL:
            case KotlinParser.OPEN:
            case KotlinParser.CONST:
            case KotlinParser.LATEINIT:
            case KotlinParser.VARARG:
            case KotlinParser.NOINLINE:
            case KotlinParser.CROSSINLINE:
            case KotlinParser.REIFIED:
            case KotlinParser.Identifier:
            case KotlinParser.LabelReference:
            case KotlinParser.LabelDefinition:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1887;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                    case 1:
                        {
                        {
                        this.state = 1886;
                        this.annotatedLambda();
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 1889;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 281, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
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
    public annotatedLambda(): AnnotatedLambdaContext {
        let localContext = new AnnotatedLambdaContext(this.context, this.state);
        this.enterRule(localContext, 156, KotlinParser.RULE_annotatedLambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1896;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6364681) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 4294963397) !== 0) || ((((_la - 125)) & ~0x1F) === 0 && ((1 << (_la - 125)) & 131135) !== 0)) {
                {
                {
                this.state = 1893;
                this.unescapedAnnotation();
                }
                }
                this.state = 1898;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1900;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 144) {
                {
                this.state = 1899;
                this.match(KotlinParser.LabelDefinition);
                }
            }

            this.state = 1905;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1902;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1907;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1908;
            this.functionLiteral();
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
        this.enterRule(localContext, 158, KotlinParser.RULE_arrayAccess);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1910;
            this.match(KotlinParser.LSQUARE);
            this.state = 1919;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 20720160) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 2589851667) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 4262461151) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4294967295) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 24563) !== 0)) {
                {
                this.state = 1911;
                this.expression();
                this.state = 1916;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 8) {
                    {
                    {
                    this.state = 1912;
                    this.match(KotlinParser.COMMA);
                    this.state = 1913;
                    this.expression();
                    }
                    }
                    this.state = 1918;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1921;
            this.match(KotlinParser.RSQUARE);
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
    public valueArguments(): ValueArgumentsContext {
        let localContext = new ValueArgumentsContext(this.context, this.state);
        this.enterRule(localContext, 160, KotlinParser.RULE_valueArguments);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1923;
            this.match(KotlinParser.LPAREN);
            this.state = 1941;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 20752928) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 2589851667) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 4262461151) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4294967295) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 24563) !== 0)) {
                {
                this.state = 1924;
                this.valueArgument();
                this.state = 1929;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 288, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 1925;
                        this.match(KotlinParser.COMMA);
                        this.state = 1926;
                        this.valueArgument();
                        }
                        }
                    }
                    this.state = 1931;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 288, this.context);
                }
                this.state = 1939;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 5 || _la === 8) {
                    {
                    this.state = 1935;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1932;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1937;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1938;
                    this.match(KotlinParser.COMMA);
                    }
                }

                }
            }

            this.state = 1943;
            this.match(KotlinParser.RPAREN);
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
        this.enterRule(localContext, 162, KotlinParser.RULE_typeArguments);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1945;
            this.match(KotlinParser.LANGLE);
            this.state = 1949;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1946;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1951;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1952;
            this.typeProjection();
            this.state = 1963;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 294, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1956;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 1953;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 1958;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1959;
                    this.match(KotlinParser.COMMA);
                    this.state = 1960;
                    this.typeProjection();
                    }
                    }
                }
                this.state = 1965;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 294, this.context);
            }
            this.state = 1973;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 296, this.context) ) {
            case 1:
                {
                this.state = 1969;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1966;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 1971;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1972;
                this.match(KotlinParser.COMMA);
                }
                break;
            }
            this.state = 1978;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 1975;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 1980;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1981;
            this.match(KotlinParser.RANGLE);
            this.state = 1983;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 298, this.context) ) {
            case 1:
                {
                this.state = 1982;
                this.match(KotlinParser.QUEST);
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
    public typeProjection(): TypeProjectionContext {
        let localContext = new TypeProjectionContext(this.context, this.state);
        this.enterRule(localContext, 164, KotlinParser.RULE_typeProjection);
        try {
            this.state = 1990;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.LPAREN:
            case KotlinParser.AT:
            case KotlinParser.FILE_SITE:
            case KotlinParser.IMPORT:
            case KotlinParser.CONTEXT:
            case KotlinParser.CONSTRUCTOR:
            case KotlinParser.BY:
            case KotlinParser.COMPANION:
            case KotlinParser.INIT:
            case KotlinParser.WHERE:
            case KotlinParser.CATCH:
            case KotlinParser.FINALLY:
            case KotlinParser.IN:
            case KotlinParser.OUT:
            case KotlinParser.FIELD_SITE:
            case KotlinParser.FIELD:
            case KotlinParser.PROPERTY_SITE:
            case KotlinParser.GET_SITE:
            case KotlinParser.SET_SITE:
            case KotlinParser.GETTER:
            case KotlinParser.SETTER:
            case KotlinParser.RECEIVER_SITE:
            case KotlinParser.PARAM_SITE:
            case KotlinParser.SETPARAM_SITE:
            case KotlinParser.DELEGATE_SITE:
            case KotlinParser.DYNAMIC:
            case KotlinParser.PUBLIC:
            case KotlinParser.PRIVATE:
            case KotlinParser.PROTECTED:
            case KotlinParser.INTERNAL:
            case KotlinParser.ENUM:
            case KotlinParser.SEALED:
            case KotlinParser.ANNOTATION:
            case KotlinParser.DATA:
            case KotlinParser.INNER:
            case KotlinParser.TAILREC:
            case KotlinParser.OPERATOR:
            case KotlinParser.INLINE:
            case KotlinParser.INFIX:
            case KotlinParser.EXTERNAL:
            case KotlinParser.SUSPEND:
            case KotlinParser.OVERRIDE:
            case KotlinParser.ABSTRACT:
            case KotlinParser.FINAL:
            case KotlinParser.OPEN:
            case KotlinParser.CONST:
            case KotlinParser.LATEINIT:
            case KotlinParser.VARARG:
            case KotlinParser.NOINLINE:
            case KotlinParser.CROSSINLINE:
            case KotlinParser.REIFIED:
            case KotlinParser.Identifier:
            case KotlinParser.LabelReference:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1986;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 299, this.context) ) {
                case 1:
                    {
                    this.state = 1985;
                    this.typeProjectionModifierList();
                    }
                    break;
                }
                this.state = 1988;
                this.type_();
                }
                break;
            case KotlinParser.MULT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1989;
                this.match(KotlinParser.MULT);
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
    public typeProjectionModifierList(): TypeProjectionModifierListContext {
        let localContext = new TypeProjectionModifierListContext(this.context, this.state);
        this.enterRule(localContext, 166, KotlinParser.RULE_typeProjectionModifierList);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1993;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 1992;
                    this.varianceAnnotation();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 1995;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 301, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
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
    public valueArgument(): ValueArgumentContext {
        let localContext = new ValueArgumentContext(this.context, this.state);
        this.enterRule(localContext, 168, KotlinParser.RULE_valueArgument);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2011;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 304, this.context) ) {
            case 1:
                {
                this.state = 1997;
                this.simpleIdentifier();
                this.state = 2001;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 1998;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2003;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2004;
                this.match(KotlinParser.ASSIGNMENT);
                this.state = 2008;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 303, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2005;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 2010;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 303, this.context);
                }
                }
                break;
            }
            this.state = 2014;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 15) {
                {
                this.state = 2013;
                this.match(KotlinParser.MULT);
                }
            }

            this.state = 2019;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 306, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2016;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 2021;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 306, this.context);
            }
            this.state = 2022;
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
    public literalConstant(): LiteralConstantContext {
        let localContext = new LiteralConstantContext(this.context, this.state);
        this.enterRule(localContext, 170, KotlinParser.RULE_literalConstant);
        try {
            this.state = 2033;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.BooleanLiteral:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2024;
                this.match(KotlinParser.BooleanLiteral);
                }
                break;
            case KotlinParser.IntegerLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2025;
                this.match(KotlinParser.IntegerLiteral);
                }
                break;
            case KotlinParser.QUOTE_OPEN:
            case KotlinParser.TRIPLE_QUOTE_OPEN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2026;
                this.stringLiteral();
                }
                break;
            case KotlinParser.HexLiteral:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2027;
                this.match(KotlinParser.HexLiteral);
                }
                break;
            case KotlinParser.BinLiteral:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2028;
                this.match(KotlinParser.BinLiteral);
                }
                break;
            case KotlinParser.CharacterLiteral:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 2029;
                this.match(KotlinParser.CharacterLiteral);
                }
                break;
            case KotlinParser.RealLiteral:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 2030;
                this.match(KotlinParser.RealLiteral);
                }
                break;
            case KotlinParser.NullLiteral:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 2031;
                this.match(KotlinParser.NullLiteral);
                }
                break;
            case KotlinParser.LongLiteral:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 2032;
                this.match(KotlinParser.LongLiteral);
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
    public stringLiteral(): StringLiteralContext {
        let localContext = new StringLiteralContext(this.context, this.state);
        this.enterRule(localContext, 172, KotlinParser.RULE_stringLiteral);
        try {
            this.state = 2037;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.QUOTE_OPEN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2035;
                this.lineStringLiteral();
                }
                break;
            case KotlinParser.TRIPLE_QUOTE_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2036;
                this.multiLineStringLiteral();
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
    public lineStringLiteral(): LineStringLiteralContext {
        let localContext = new LineStringLiteralContext(this.context, this.state);
        this.enterRule(localContext, 174, KotlinParser.RULE_lineStringLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2039;
            this.match(KotlinParser.QUOTE_OPEN);
            this.state = 2044;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 158)) & ~0x1F) === 0 && ((1 << (_la - 158)) & 15) !== 0)) {
                {
                this.state = 2042;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case KotlinParser.LineStrRef:
                case KotlinParser.LineStrText:
                case KotlinParser.LineStrEscapedChar:
                    {
                    this.state = 2040;
                    this.lineStringContent();
                    }
                    break;
                case KotlinParser.LineStrExprStart:
                    {
                    this.state = 2041;
                    this.lineStringExpression();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 2046;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2047;
            this.match(KotlinParser.QUOTE_CLOSE);
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
    public multiLineStringLiteral(): MultiLineStringLiteralContext {
        let localContext = new MultiLineStringLiteralContext(this.context, this.state);
        this.enterRule(localContext, 176, KotlinParser.RULE_multiLineStringLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2049;
            this.match(KotlinParser.TRIPLE_QUOTE_OPEN);
            this.state = 2056;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 131 || ((((_la - 163)) & ~0x1F) === 0 && ((1 << (_la - 163)) & 31) !== 0)) {
                {
                this.state = 2054;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case KotlinParser.MultiLineStrRef:
                case KotlinParser.MultiLineStrText:
                case KotlinParser.MultiLineStrEscapedChar:
                    {
                    this.state = 2050;
                    this.multiLineStringContent();
                    }
                    break;
                case KotlinParser.MultiLineStrExprStart:
                    {
                    this.state = 2051;
                    this.multiLineStringExpression();
                    }
                    break;
                case KotlinParser.QUOTE_OPEN:
                    {
                    this.state = 2052;
                    this.lineStringLiteral();
                    }
                    break;
                case KotlinParser.MultiLineStringQuote:
                    {
                    this.state = 2053;
                    this.match(KotlinParser.MultiLineStringQuote);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 2058;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2059;
            this.match(KotlinParser.TRIPLE_QUOTE_CLOSE);
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
    public lineStringContent(): LineStringContentContext {
        let localContext = new LineStringContentContext(this.context, this.state);
        this.enterRule(localContext, 178, KotlinParser.RULE_lineStringContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2061;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 158)) & ~0x1F) === 0 && ((1 << (_la - 158)) & 7) !== 0))) {
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
    public lineStringExpression(): LineStringExpressionContext {
        let localContext = new LineStringExpressionContext(this.context, this.state);
        this.enterRule(localContext, 180, KotlinParser.RULE_lineStringExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2063;
            this.match(KotlinParser.LineStrExprStart);
            this.state = 2064;
            this.expression();
            this.state = 2065;
            this.match(KotlinParser.RCURL);
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
    public multiLineStringContent(): MultiLineStringContentContext {
        let localContext = new MultiLineStringContentContext(this.context, this.state);
        this.enterRule(localContext, 182, KotlinParser.RULE_multiLineStringContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2067;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 7) !== 0))) {
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
    public multiLineStringExpression(): MultiLineStringExpressionContext {
        let localContext = new MultiLineStringExpressionContext(this.context, this.state);
        this.enterRule(localContext, 184, KotlinParser.RULE_multiLineStringExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2069;
            this.match(KotlinParser.MultiLineStrExprStart);
            this.state = 2070;
            this.expression();
            this.state = 2071;
            this.match(KotlinParser.RCURL);
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
    public functionLiteral(): FunctionLiteralContext {
        let localContext = new FunctionLiteralContext(this.context, this.state);
        this.enterRule(localContext, 186, KotlinParser.RULE_functionLiteral);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2076;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 40 || _la === 56 || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 1949) !== 0) || _la === 143) {
                {
                {
                this.state = 2073;
                this.annotations();
                }
                }
                this.state = 2078;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2125;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 320, this.context) ) {
            case 1:
                {
                this.state = 2079;
                this.match(KotlinParser.LCURL);
                this.state = 2083;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 314, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2080;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 2085;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 314, this.context);
                }
                this.state = 2086;
                this.statements();
                this.state = 2090;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2087;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2092;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2093;
                this.match(KotlinParser.RCURL);
                }
                break;
            case 2:
                {
                this.state = 2095;
                this.match(KotlinParser.LCURL);
                this.state = 2099;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 316, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2096;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 2101;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 316, this.context);
                }
                this.state = 2102;
                this.lambdaParameters();
                this.state = 2106;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2103;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2108;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2109;
                this.match(KotlinParser.ARROW);
                this.state = 2113;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 318, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2110;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 2115;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 318, this.context);
                }
                this.state = 2116;
                this.statements();
                this.state = 2120;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2117;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2122;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2123;
                this.match(KotlinParser.RCURL);
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
    public lambdaParameters(): LambdaParametersContext {
        let localContext = new LambdaParametersContext(this.context, this.state);
        this.enterRule(localContext, 188, KotlinParser.RULE_lambdaParameters);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2128;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 9 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6364681) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 4294963397) !== 0) || ((((_la - 125)) & ~0x1F) === 0 && ((1 << (_la - 125)) & 131135) !== 0)) {
                {
                this.state = 2127;
                this.lambdaParameter();
                }
            }

            this.state = 2146;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 324, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2133;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 2130;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 2135;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 2136;
                    this.match(KotlinParser.COMMA);
                    this.state = 2140;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 2137;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 2142;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 2143;
                    this.lambdaParameter();
                    }
                    }
                }
                this.state = 2148;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 324, this.context);
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
    public lambdaParameter(): LambdaParameterContext {
        let localContext = new LambdaParameterContext(this.context, this.state);
        this.enterRule(localContext, 190, KotlinParser.RULE_lambdaParameter);
        let _la: number;
        try {
            this.state = 2167;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.IMPORT:
            case KotlinParser.CONTEXT:
            case KotlinParser.CONSTRUCTOR:
            case KotlinParser.BY:
            case KotlinParser.COMPANION:
            case KotlinParser.INIT:
            case KotlinParser.WHERE:
            case KotlinParser.CATCH:
            case KotlinParser.FINALLY:
            case KotlinParser.OUT:
            case KotlinParser.FIELD:
            case KotlinParser.GETTER:
            case KotlinParser.SETTER:
            case KotlinParser.DYNAMIC:
            case KotlinParser.PUBLIC:
            case KotlinParser.PRIVATE:
            case KotlinParser.PROTECTED:
            case KotlinParser.INTERNAL:
            case KotlinParser.ENUM:
            case KotlinParser.SEALED:
            case KotlinParser.ANNOTATION:
            case KotlinParser.DATA:
            case KotlinParser.INNER:
            case KotlinParser.TAILREC:
            case KotlinParser.OPERATOR:
            case KotlinParser.INLINE:
            case KotlinParser.INFIX:
            case KotlinParser.EXTERNAL:
            case KotlinParser.SUSPEND:
            case KotlinParser.OVERRIDE:
            case KotlinParser.ABSTRACT:
            case KotlinParser.FINAL:
            case KotlinParser.OPEN:
            case KotlinParser.CONST:
            case KotlinParser.LATEINIT:
            case KotlinParser.VARARG:
            case KotlinParser.NOINLINE:
            case KotlinParser.CROSSINLINE:
            case KotlinParser.REIFIED:
            case KotlinParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2149;
                this.variableDeclaration();
                }
                break;
            case KotlinParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2150;
                this.multiVariableDeclaration();
                this.state = 2165;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 327, this.context) ) {
                case 1:
                    {
                    this.state = 2154;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 2151;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 2156;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 2157;
                    this.match(KotlinParser.COLON);
                    this.state = 2161;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 2158;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 2163;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 2164;
                    this.type_();
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
    public objectLiteral(): ObjectLiteralContext {
        let localContext = new ObjectLiteralContext(this.context, this.state);
        this.enterRule(localContext, 192, KotlinParser.RULE_objectLiteral);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2169;
            this.match(KotlinParser.OBJECT);
            this.state = 2184;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 331, this.context) ) {
            case 1:
                {
                this.state = 2173;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2170;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2175;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2176;
                this.match(KotlinParser.COLON);
                this.state = 2180;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2177;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2182;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2183;
                this.delegationSpecifiers();
                }
                break;
            }
            this.state = 2189;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 332, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2186;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 2191;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 332, this.context);
            }
            this.state = 2193;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 333, this.context) ) {
            case 1:
                {
                this.state = 2192;
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
    public collectionLiteral(): CollectionLiteralContext {
        let localContext = new CollectionLiteralContext(this.context, this.state);
        this.enterRule(localContext, 194, KotlinParser.RULE_collectionLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2195;
            this.match(KotlinParser.LSQUARE);
            this.state = 2197;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 20720160) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 2589851667) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 4262461151) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4294967295) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 24563) !== 0)) {
                {
                this.state = 2196;
                this.expression();
                }
            }

            this.state = 2203;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 8) {
                {
                {
                this.state = 2199;
                this.match(KotlinParser.COMMA);
                this.state = 2200;
                this.expression();
                }
                }
                this.state = 2205;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2206;
            this.match(KotlinParser.RSQUARE);
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
    public thisExpression(): ThisExpressionContext {
        let localContext = new ThisExpressionContext(this.context, this.state);
        this.enterRule(localContext, 196, KotlinParser.RULE_thisExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2208;
            this.match(KotlinParser.THIS);
            this.state = 2210;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 336, this.context) ) {
            case 1:
                {
                this.state = 2209;
                this.match(KotlinParser.LabelReference);
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
    public superExpression(): SuperExpressionContext {
        let localContext = new SuperExpressionContext(this.context, this.state);
        this.enterRule(localContext, 198, KotlinParser.RULE_superExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2212;
            this.match(KotlinParser.SUPER);
            this.state = 2229;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 339, this.context) ) {
            case 1:
                {
                this.state = 2213;
                this.match(KotlinParser.LANGLE);
                this.state = 2217;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2214;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2219;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2220;
                this.type_();
                this.state = 2224;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2221;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2226;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2227;
                this.match(KotlinParser.RANGLE);
                }
                break;
            }
            this.state = 2232;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 340, this.context) ) {
            case 1:
                {
                this.state = 2231;
                this.match(KotlinParser.LabelReference);
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
    public conditionalExpression(): ConditionalExpressionContext {
        let localContext = new ConditionalExpressionContext(this.context, this.state);
        this.enterRule(localContext, 200, KotlinParser.RULE_conditionalExpression);
        try {
            this.state = 2236;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2234;
                this.ifExpression();
                }
                break;
            case KotlinParser.WHEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2235;
                this.whenExpression();
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
    public ifExpression(): IfExpressionContext {
        let localContext = new IfExpressionContext(this.context, this.state);
        this.enterRule(localContext, 202, KotlinParser.RULE_ifExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2238;
            this.match(KotlinParser.IF);
            this.state = 2242;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 2239;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 2244;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2245;
            this.match(KotlinParser.LPAREN);
            this.state = 2246;
            this.expression();
            this.state = 2247;
            this.match(KotlinParser.RPAREN);
            this.state = 2251;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 343, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2248;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 2253;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 343, this.context);
            }
            this.state = 2255;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 344, this.context) ) {
            case 1:
                {
                this.state = 2254;
                this.controlStructureBody();
                }
                break;
            }
            this.state = 2258;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 345, this.context) ) {
            case 1:
                {
                this.state = 2257;
                this.match(KotlinParser.SEMICOLON);
                }
                break;
            }
            this.state = 2276;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 349, this.context) ) {
            case 1:
                {
                this.state = 2263;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2260;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2265;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2266;
                this.match(KotlinParser.ELSE);
                this.state = 2270;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 347, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2267;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 2272;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 347, this.context);
                }
                this.state = 2274;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 348, this.context) ) {
                case 1:
                    {
                    this.state = 2273;
                    this.controlStructureBody();
                    }
                    break;
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
    public controlStructureBody(): ControlStructureBodyContext {
        let localContext = new ControlStructureBodyContext(this.context, this.state);
        this.enterRule(localContext, 204, KotlinParser.RULE_controlStructureBody);
        try {
            this.state = 2280;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 350, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2278;
                this.block();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2279;
                this.expression();
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
    public whenExpression(): WhenExpressionContext {
        let localContext = new WhenExpressionContext(this.context, this.state);
        this.enterRule(localContext, 206, KotlinParser.RULE_whenExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2282;
            this.match(KotlinParser.WHEN);
            this.state = 2286;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 351, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2283;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 2288;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 351, this.context);
            }
            this.state = 2293;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 9) {
                {
                this.state = 2289;
                this.match(KotlinParser.LPAREN);
                this.state = 2290;
                this.expression();
                this.state = 2291;
                this.match(KotlinParser.RPAREN);
                }
            }

            this.state = 2298;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 2295;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 2300;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2301;
            this.match(KotlinParser.LCURL);
            this.state = 2305;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 354, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2302;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 2307;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 354, this.context);
            }
            this.state = 2317;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 356, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2308;
                    this.whenEntry();
                    this.state = 2312;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 355, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 2309;
                            this.match(KotlinParser.NL);
                            }
                            }
                        }
                        this.state = 2314;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 355, this.context);
                    }
                    }
                    }
                }
                this.state = 2319;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 356, this.context);
            }
            this.state = 2323;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 2320;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 2325;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2326;
            this.match(KotlinParser.RCURL);
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
    public whenEntry(): WhenEntryContext {
        let localContext = new WhenEntryContext(this.context, this.state);
        this.enterRule(localContext, 208, KotlinParser.RULE_whenEntry);
        let _la: number;
        try {
            let alternative: number;
            this.state = 2380;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.NL:
            case KotlinParser.LPAREN:
            case KotlinParser.LSQUARE:
            case KotlinParser.LCURL:
            case KotlinParser.ADD:
            case KotlinParser.SUB:
            case KotlinParser.INCR:
            case KotlinParser.DECR:
            case KotlinParser.EXCL:
            case KotlinParser.COLONCOLON:
            case KotlinParser.Q_COLONCOLON:
            case KotlinParser.AT:
            case KotlinParser.RETURN_AT:
            case KotlinParser.CONTINUE_AT:
            case KotlinParser.BREAK_AT:
            case KotlinParser.FILE_SITE:
            case KotlinParser.IMPORT:
            case KotlinParser.CONTEXT:
            case KotlinParser.OBJECT:
            case KotlinParser.VAL:
            case KotlinParser.CONSTRUCTOR:
            case KotlinParser.BY:
            case KotlinParser.COMPANION:
            case KotlinParser.INIT:
            case KotlinParser.THIS:
            case KotlinParser.SUPER:
            case KotlinParser.WHERE:
            case KotlinParser.IF:
            case KotlinParser.WHEN:
            case KotlinParser.TRY:
            case KotlinParser.CATCH:
            case KotlinParser.FINALLY:
            case KotlinParser.FOR:
            case KotlinParser.DO:
            case KotlinParser.WHILE:
            case KotlinParser.THROW:
            case KotlinParser.RETURN:
            case KotlinParser.CONTINUE:
            case KotlinParser.BREAK:
            case KotlinParser.IS:
            case KotlinParser.IN:
            case KotlinParser.NOT_IS:
            case KotlinParser.NOT_IN:
            case KotlinParser.OUT:
            case KotlinParser.FIELD_SITE:
            case KotlinParser.FIELD:
            case KotlinParser.PROPERTY_SITE:
            case KotlinParser.GET_SITE:
            case KotlinParser.SET_SITE:
            case KotlinParser.GETTER:
            case KotlinParser.SETTER:
            case KotlinParser.RECEIVER_SITE:
            case KotlinParser.PARAM_SITE:
            case KotlinParser.SETPARAM_SITE:
            case KotlinParser.DELEGATE_SITE:
            case KotlinParser.DYNAMIC:
            case KotlinParser.PUBLIC:
            case KotlinParser.PRIVATE:
            case KotlinParser.PROTECTED:
            case KotlinParser.INTERNAL:
            case KotlinParser.ENUM:
            case KotlinParser.SEALED:
            case KotlinParser.ANNOTATION:
            case KotlinParser.DATA:
            case KotlinParser.INNER:
            case KotlinParser.TAILREC:
            case KotlinParser.OPERATOR:
            case KotlinParser.INLINE:
            case KotlinParser.INFIX:
            case KotlinParser.EXTERNAL:
            case KotlinParser.SUSPEND:
            case KotlinParser.OVERRIDE:
            case KotlinParser.ABSTRACT:
            case KotlinParser.FINAL:
            case KotlinParser.OPEN:
            case KotlinParser.CONST:
            case KotlinParser.LATEINIT:
            case KotlinParser.VARARG:
            case KotlinParser.NOINLINE:
            case KotlinParser.CROSSINLINE:
            case KotlinParser.REIFIED:
            case KotlinParser.QUOTE_OPEN:
            case KotlinParser.TRIPLE_QUOTE_OPEN:
            case KotlinParser.RealLiteral:
            case KotlinParser.LongLiteral:
            case KotlinParser.IntegerLiteral:
            case KotlinParser.HexLiteral:
            case KotlinParser.BinLiteral:
            case KotlinParser.BooleanLiteral:
            case KotlinParser.NullLiteral:
            case KotlinParser.Identifier:
            case KotlinParser.LabelReference:
            case KotlinParser.LabelDefinition:
            case KotlinParser.CharacterLiteral:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2328;
                this.whenCondition();
                this.state = 2345;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 360, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2332;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        while (_la === 5) {
                            {
                            {
                            this.state = 2329;
                            this.match(KotlinParser.NL);
                            }
                            }
                            this.state = 2334;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                        }
                        this.state = 2335;
                        this.match(KotlinParser.COMMA);
                        this.state = 2339;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 359, this.context);
                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                            if (alternative === 1) {
                                {
                                {
                                this.state = 2336;
                                this.match(KotlinParser.NL);
                                }
                                }
                            }
                            this.state = 2341;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 359, this.context);
                        }
                        this.state = 2342;
                        this.whenCondition();
                        }
                        }
                    }
                    this.state = 2347;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 360, this.context);
                }
                this.state = 2351;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2348;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2353;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2354;
                this.match(KotlinParser.ARROW);
                this.state = 2358;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 362, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2355;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 2360;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 362, this.context);
                }
                this.state = 2361;
                this.controlStructureBody();
                this.state = 2363;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 363, this.context) ) {
                case 1:
                    {
                    this.state = 2362;
                    this.semi();
                    }
                    break;
                }
                }
                break;
            case KotlinParser.ELSE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2365;
                this.match(KotlinParser.ELSE);
                this.state = 2369;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2366;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2371;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2372;
                this.match(KotlinParser.ARROW);
                this.state = 2376;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 365, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2373;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 2378;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 365, this.context);
                }
                this.state = 2379;
                this.controlStructureBody();
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
    public whenCondition(): WhenConditionContext {
        let localContext = new WhenConditionContext(this.context, this.state);
        this.enterRule(localContext, 210, KotlinParser.RULE_whenCondition);
        try {
            this.state = 2385;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.NL:
            case KotlinParser.LPAREN:
            case KotlinParser.LSQUARE:
            case KotlinParser.LCURL:
            case KotlinParser.ADD:
            case KotlinParser.SUB:
            case KotlinParser.INCR:
            case KotlinParser.DECR:
            case KotlinParser.EXCL:
            case KotlinParser.COLONCOLON:
            case KotlinParser.Q_COLONCOLON:
            case KotlinParser.AT:
            case KotlinParser.RETURN_AT:
            case KotlinParser.CONTINUE_AT:
            case KotlinParser.BREAK_AT:
            case KotlinParser.FILE_SITE:
            case KotlinParser.IMPORT:
            case KotlinParser.CONTEXT:
            case KotlinParser.OBJECT:
            case KotlinParser.VAL:
            case KotlinParser.CONSTRUCTOR:
            case KotlinParser.BY:
            case KotlinParser.COMPANION:
            case KotlinParser.INIT:
            case KotlinParser.THIS:
            case KotlinParser.SUPER:
            case KotlinParser.WHERE:
            case KotlinParser.IF:
            case KotlinParser.WHEN:
            case KotlinParser.TRY:
            case KotlinParser.CATCH:
            case KotlinParser.FINALLY:
            case KotlinParser.FOR:
            case KotlinParser.DO:
            case KotlinParser.WHILE:
            case KotlinParser.THROW:
            case KotlinParser.RETURN:
            case KotlinParser.CONTINUE:
            case KotlinParser.BREAK:
            case KotlinParser.OUT:
            case KotlinParser.FIELD_SITE:
            case KotlinParser.FIELD:
            case KotlinParser.PROPERTY_SITE:
            case KotlinParser.GET_SITE:
            case KotlinParser.SET_SITE:
            case KotlinParser.GETTER:
            case KotlinParser.SETTER:
            case KotlinParser.RECEIVER_SITE:
            case KotlinParser.PARAM_SITE:
            case KotlinParser.SETPARAM_SITE:
            case KotlinParser.DELEGATE_SITE:
            case KotlinParser.DYNAMIC:
            case KotlinParser.PUBLIC:
            case KotlinParser.PRIVATE:
            case KotlinParser.PROTECTED:
            case KotlinParser.INTERNAL:
            case KotlinParser.ENUM:
            case KotlinParser.SEALED:
            case KotlinParser.ANNOTATION:
            case KotlinParser.DATA:
            case KotlinParser.INNER:
            case KotlinParser.TAILREC:
            case KotlinParser.OPERATOR:
            case KotlinParser.INLINE:
            case KotlinParser.INFIX:
            case KotlinParser.EXTERNAL:
            case KotlinParser.SUSPEND:
            case KotlinParser.OVERRIDE:
            case KotlinParser.ABSTRACT:
            case KotlinParser.FINAL:
            case KotlinParser.OPEN:
            case KotlinParser.CONST:
            case KotlinParser.LATEINIT:
            case KotlinParser.VARARG:
            case KotlinParser.NOINLINE:
            case KotlinParser.CROSSINLINE:
            case KotlinParser.REIFIED:
            case KotlinParser.QUOTE_OPEN:
            case KotlinParser.TRIPLE_QUOTE_OPEN:
            case KotlinParser.RealLiteral:
            case KotlinParser.LongLiteral:
            case KotlinParser.IntegerLiteral:
            case KotlinParser.HexLiteral:
            case KotlinParser.BinLiteral:
            case KotlinParser.BooleanLiteral:
            case KotlinParser.NullLiteral:
            case KotlinParser.Identifier:
            case KotlinParser.LabelReference:
            case KotlinParser.LabelDefinition:
            case KotlinParser.CharacterLiteral:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2382;
                this.expression();
                }
                break;
            case KotlinParser.IN:
            case KotlinParser.NOT_IN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2383;
                this.rangeTest();
                }
                break;
            case KotlinParser.IS:
            case KotlinParser.NOT_IS:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2384;
                this.typeTest();
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
    public rangeTest(): RangeTestContext {
        let localContext = new RangeTestContext(this.context, this.state);
        this.enterRule(localContext, 212, KotlinParser.RULE_rangeTest);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2387;
            this.inOperator();
            this.state = 2391;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 368, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2388;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 2393;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 368, this.context);
            }
            this.state = 2394;
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
    public typeTest(): TypeTestContext {
        let localContext = new TypeTestContext(this.context, this.state);
        this.enterRule(localContext, 214, KotlinParser.RULE_typeTest);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2396;
            this.isOperator();
            this.state = 2400;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 2397;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 2402;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2403;
            this.type_();
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
    public tryExpression(): TryExpressionContext {
        let localContext = new TryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 216, KotlinParser.RULE_tryExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2405;
            this.match(KotlinParser.TRY);
            this.state = 2409;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 2406;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 2411;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2412;
            this.block();
            this.state = 2422;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 372, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2416;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 2413;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 2418;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 2419;
                    this.catchBlock();
                    }
                    }
                }
                this.state = 2424;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 372, this.context);
            }
            this.state = 2432;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 374, this.context) ) {
            case 1:
                {
                this.state = 2428;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2425;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2430;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2431;
                this.finallyBlock();
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
    public catchBlock(): CatchBlockContext {
        let localContext = new CatchBlockContext(this.context, this.state);
        this.enterRule(localContext, 218, KotlinParser.RULE_catchBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2434;
            this.match(KotlinParser.CATCH);
            this.state = 2438;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 2435;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 2440;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2441;
            this.match(KotlinParser.LPAREN);
            this.state = 2445;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 40 || _la === 56 || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 1949) !== 0) || _la === 143) {
                {
                {
                this.state = 2442;
                this.annotations();
                }
                }
                this.state = 2447;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2448;
            this.simpleIdentifier();
            this.state = 2449;
            this.match(KotlinParser.COLON);
            this.state = 2450;
            this.userType();
            this.state = 2451;
            this.match(KotlinParser.RPAREN);
            this.state = 2455;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 2452;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 2457;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2458;
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
    public finallyBlock(): FinallyBlockContext {
        let localContext = new FinallyBlockContext(this.context, this.state);
        this.enterRule(localContext, 220, KotlinParser.RULE_finallyBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2460;
            this.match(KotlinParser.FINALLY);
            this.state = 2464;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 2461;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 2466;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2467;
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
    public loopExpression(): LoopExpressionContext {
        let localContext = new LoopExpressionContext(this.context, this.state);
        this.enterRule(localContext, 222, KotlinParser.RULE_loopExpression);
        try {
            this.state = 2472;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.FOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2469;
                this.forExpression();
                }
                break;
            case KotlinParser.WHILE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2470;
                this.whileExpression();
                }
                break;
            case KotlinParser.DO:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2471;
                this.doWhileExpression();
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
    public forExpression(): ForExpressionContext {
        let localContext = new ForExpressionContext(this.context, this.state);
        this.enterRule(localContext, 224, KotlinParser.RULE_forExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2474;
            this.match(KotlinParser.FOR);
            this.state = 2478;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 2475;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 2480;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2481;
            this.match(KotlinParser.LPAREN);
            this.state = 2485;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 40 || _la === 56 || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 1949) !== 0) || _la === 143) {
                {
                {
                this.state = 2482;
                this.annotations();
                }
                }
                this.state = 2487;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2490;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.IMPORT:
            case KotlinParser.CONTEXT:
            case KotlinParser.CONSTRUCTOR:
            case KotlinParser.BY:
            case KotlinParser.COMPANION:
            case KotlinParser.INIT:
            case KotlinParser.WHERE:
            case KotlinParser.CATCH:
            case KotlinParser.FINALLY:
            case KotlinParser.OUT:
            case KotlinParser.FIELD:
            case KotlinParser.GETTER:
            case KotlinParser.SETTER:
            case KotlinParser.DYNAMIC:
            case KotlinParser.PUBLIC:
            case KotlinParser.PRIVATE:
            case KotlinParser.PROTECTED:
            case KotlinParser.INTERNAL:
            case KotlinParser.ENUM:
            case KotlinParser.SEALED:
            case KotlinParser.ANNOTATION:
            case KotlinParser.DATA:
            case KotlinParser.INNER:
            case KotlinParser.TAILREC:
            case KotlinParser.OPERATOR:
            case KotlinParser.INLINE:
            case KotlinParser.INFIX:
            case KotlinParser.EXTERNAL:
            case KotlinParser.SUSPEND:
            case KotlinParser.OVERRIDE:
            case KotlinParser.ABSTRACT:
            case KotlinParser.FINAL:
            case KotlinParser.OPEN:
            case KotlinParser.CONST:
            case KotlinParser.LATEINIT:
            case KotlinParser.VARARG:
            case KotlinParser.NOINLINE:
            case KotlinParser.CROSSINLINE:
            case KotlinParser.REIFIED:
            case KotlinParser.Identifier:
                {
                this.state = 2488;
                this.variableDeclaration();
                }
                break;
            case KotlinParser.LPAREN:
                {
                this.state = 2489;
                this.multiVariableDeclaration();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 2492;
            this.match(KotlinParser.IN);
            this.state = 2493;
            this.expression();
            this.state = 2494;
            this.match(KotlinParser.RPAREN);
            this.state = 2498;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 383, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2495;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 2500;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 383, this.context);
            }
            this.state = 2502;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 384, this.context) ) {
            case 1:
                {
                this.state = 2501;
                this.controlStructureBody();
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
    public whileExpression(): WhileExpressionContext {
        let localContext = new WhileExpressionContext(this.context, this.state);
        this.enterRule(localContext, 226, KotlinParser.RULE_whileExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2504;
            this.match(KotlinParser.WHILE);
            this.state = 2508;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 2505;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 2510;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2511;
            this.match(KotlinParser.LPAREN);
            this.state = 2512;
            this.expression();
            this.state = 2513;
            this.match(KotlinParser.RPAREN);
            this.state = 2517;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 386, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2514;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 2519;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 386, this.context);
            }
            this.state = 2521;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 387, this.context) ) {
            case 1:
                {
                this.state = 2520;
                this.controlStructureBody();
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
    public doWhileExpression(): DoWhileExpressionContext {
        let localContext = new DoWhileExpressionContext(this.context, this.state);
        this.enterRule(localContext, 228, KotlinParser.RULE_doWhileExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2523;
            this.match(KotlinParser.DO);
            this.state = 2527;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 388, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2524;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 2529;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 388, this.context);
            }
            this.state = 2531;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 389, this.context) ) {
            case 1:
                {
                this.state = 2530;
                this.controlStructureBody();
                }
                break;
            }
            this.state = 2536;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 2533;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 2538;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2539;
            this.match(KotlinParser.WHILE);
            this.state = 2543;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 2540;
                this.match(KotlinParser.NL);
                }
                }
                this.state = 2545;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2546;
            this.match(KotlinParser.LPAREN);
            this.state = 2547;
            this.expression();
            this.state = 2548;
            this.match(KotlinParser.RPAREN);
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
    public jumpExpression(): JumpExpressionContext {
        let localContext = new JumpExpressionContext(this.context, this.state);
        this.enterRule(localContext, 230, KotlinParser.RULE_jumpExpression);
        let _la: number;
        try {
            let alternative: number;
            this.state = 2566;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.THROW:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2550;
                this.match(KotlinParser.THROW);
                this.state = 2554;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 392, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2551;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 2556;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 392, this.context);
                }
                this.state = 2557;
                this.expression();
                }
                break;
            case KotlinParser.RETURN_AT:
            case KotlinParser.RETURN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2558;
                _la = this.tokenStream.LA(1);
                if(!(_la === 53 || _la === 85)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 2560;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 393, this.context) ) {
                case 1:
                    {
                    this.state = 2559;
                    this.expression();
                    }
                    break;
                }
                }
                break;
            case KotlinParser.CONTINUE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2562;
                this.match(KotlinParser.CONTINUE);
                }
                break;
            case KotlinParser.CONTINUE_AT:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2563;
                this.match(KotlinParser.CONTINUE_AT);
                }
                break;
            case KotlinParser.BREAK:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2564;
                this.match(KotlinParser.BREAK);
                }
                break;
            case KotlinParser.BREAK_AT:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 2565;
                this.match(KotlinParser.BREAK_AT);
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
    public callableReference(): CallableReferenceContext {
        let localContext = new CallableReferenceContext(this.context, this.state);
        this.enterRule(localContext, 232, KotlinParser.RULE_callableReference);
        let _la: number;
        try {
            let alternative: number;
            this.state = 2615;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.NL:
            case KotlinParser.COLONCOLON:
            case KotlinParser.Q_COLONCOLON:
            case KotlinParser.IMPORT:
            case KotlinParser.CONTEXT:
            case KotlinParser.CONSTRUCTOR:
            case KotlinParser.BY:
            case KotlinParser.COMPANION:
            case KotlinParser.INIT:
            case KotlinParser.WHERE:
            case KotlinParser.CATCH:
            case KotlinParser.FINALLY:
            case KotlinParser.OUT:
            case KotlinParser.FIELD:
            case KotlinParser.GETTER:
            case KotlinParser.SETTER:
            case KotlinParser.DYNAMIC:
            case KotlinParser.PUBLIC:
            case KotlinParser.PRIVATE:
            case KotlinParser.PROTECTED:
            case KotlinParser.INTERNAL:
            case KotlinParser.ENUM:
            case KotlinParser.SEALED:
            case KotlinParser.ANNOTATION:
            case KotlinParser.DATA:
            case KotlinParser.INNER:
            case KotlinParser.TAILREC:
            case KotlinParser.OPERATOR:
            case KotlinParser.INLINE:
            case KotlinParser.INFIX:
            case KotlinParser.EXTERNAL:
            case KotlinParser.SUSPEND:
            case KotlinParser.OVERRIDE:
            case KotlinParser.ABSTRACT:
            case KotlinParser.FINAL:
            case KotlinParser.OPEN:
            case KotlinParser.CONST:
            case KotlinParser.LATEINIT:
            case KotlinParser.VARARG:
            case KotlinParser.NOINLINE:
            case KotlinParser.CROSSINLINE:
            case KotlinParser.REIFIED:
            case KotlinParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2581;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6364681) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 4294963397) !== 0) || ((((_la - 125)) & ~0x1F) === 0 && ((1 << (_la - 125)) & 131135) !== 0)) {
                    {
                    this.state = 2568;
                    this.userType();
                    this.state = 2578;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 41) {
                        {
                        {
                        this.state = 2569;
                        this.match(KotlinParser.QUEST);
                        this.state = 2573;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 395, this.context);
                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                            if (alternative === 1) {
                                {
                                {
                                this.state = 2570;
                                this.match(KotlinParser.NL);
                                }
                                }
                            }
                            this.state = 2575;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 395, this.context);
                        }
                        }
                        }
                        this.state = 2580;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                }

                this.state = 2586;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2583;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2588;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2589;
                _la = this.tokenStream.LA(1);
                if(!(_la === 36 || _la === 37)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 2593;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2590;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2595;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2598;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case KotlinParser.IMPORT:
                case KotlinParser.CONTEXT:
                case KotlinParser.CONSTRUCTOR:
                case KotlinParser.BY:
                case KotlinParser.COMPANION:
                case KotlinParser.INIT:
                case KotlinParser.WHERE:
                case KotlinParser.CATCH:
                case KotlinParser.FINALLY:
                case KotlinParser.OUT:
                case KotlinParser.FIELD:
                case KotlinParser.GETTER:
                case KotlinParser.SETTER:
                case KotlinParser.DYNAMIC:
                case KotlinParser.PUBLIC:
                case KotlinParser.PRIVATE:
                case KotlinParser.PROTECTED:
                case KotlinParser.INTERNAL:
                case KotlinParser.ENUM:
                case KotlinParser.SEALED:
                case KotlinParser.ANNOTATION:
                case KotlinParser.DATA:
                case KotlinParser.INNER:
                case KotlinParser.TAILREC:
                case KotlinParser.OPERATOR:
                case KotlinParser.INLINE:
                case KotlinParser.INFIX:
                case KotlinParser.EXTERNAL:
                case KotlinParser.SUSPEND:
                case KotlinParser.OVERRIDE:
                case KotlinParser.ABSTRACT:
                case KotlinParser.FINAL:
                case KotlinParser.OPEN:
                case KotlinParser.CONST:
                case KotlinParser.LATEINIT:
                case KotlinParser.VARARG:
                case KotlinParser.NOINLINE:
                case KotlinParser.CROSSINLINE:
                case KotlinParser.REIFIED:
                case KotlinParser.Identifier:
                    {
                    this.state = 2596;
                    this.identifier();
                    }
                    break;
                case KotlinParser.CLASS:
                    {
                    this.state = 2597;
                    this.match(KotlinParser.CLASS);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                break;
            case KotlinParser.THIS:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2600;
                this.match(KotlinParser.THIS);
                this.state = 2604;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2601;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2606;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2607;
                this.match(KotlinParser.COLONCOLON);
                this.state = 2611;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2608;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2613;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2614;
                this.match(KotlinParser.CLASS);
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
    public assignmentOperator(): AssignmentOperatorContext {
        let localContext = new AssignmentOperatorContext(this.context, this.state);
        this.enterRule(localContext, 234, KotlinParser.RULE_assignmentOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2617;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 27)) & ~0x1F) === 0 && ((1 << (_la - 27)) & 63) !== 0))) {
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
    public equalityOperation(): EqualityOperationContext {
        let localContext = new EqualityOperationContext(this.context, this.state);
        this.enterRule(localContext, 236, KotlinParser.RULE_equalityOperation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2619;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 27) !== 0))) {
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
    public comparisonOperator(): ComparisonOperatorContext {
        let localContext = new ComparisonOperatorContext(this.context, this.state);
        this.enterRule(localContext, 238, KotlinParser.RULE_comparisonOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2621;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & 15) !== 0))) {
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
    public inOperator(): InOperatorContext {
        let localContext = new InOperatorContext(this.context, this.state);
        this.enterRule(localContext, 240, KotlinParser.RULE_inOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2623;
            _la = this.tokenStream.LA(1);
            if(!(_la === 90 || _la === 92)) {
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
    public isOperator(): IsOperatorContext {
        let localContext = new IsOperatorContext(this.context, this.state);
        this.enterRule(localContext, 242, KotlinParser.RULE_isOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2625;
            _la = this.tokenStream.LA(1);
            if(!(_la === 89 || _la === 91)) {
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
    public additiveOperator(): AdditiveOperatorContext {
        let localContext = new AdditiveOperatorContext(this.context, this.state);
        this.enterRule(localContext, 244, KotlinParser.RULE_additiveOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2627;
            _la = this.tokenStream.LA(1);
            if(!(_la === 18 || _la === 19)) {
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
    public multiplicativeOperation(): MultiplicativeOperationContext {
        let localContext = new MultiplicativeOperationContext(this.context, this.state);
        this.enterRule(localContext, 246, KotlinParser.RULE_multiplicativeOperation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2629;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 229376) !== 0))) {
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
    public typeOperation(): TypeOperationContext {
        let localContext = new TypeOperationContext(this.context, this.state);
        this.enterRule(localContext, 248, KotlinParser.RULE_typeOperation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2631;
            _la = this.tokenStream.LA(1);
            if(!(_la === 25 || _la === 49 || _la === 88)) {
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
    public prefixUnaryOperation(): PrefixUnaryOperationContext {
        let localContext = new PrefixUnaryOperationContext(this.context, this.state);
        this.enterRule(localContext, 250, KotlinParser.RULE_prefixUnaryOperation);
        try {
            this.state = 2640;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.INCR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2633;
                this.match(KotlinParser.INCR);
                }
                break;
            case KotlinParser.DECR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2634;
                this.match(KotlinParser.DECR);
                }
                break;
            case KotlinParser.ADD:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2635;
                this.match(KotlinParser.ADD);
                }
                break;
            case KotlinParser.SUB:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2636;
                this.match(KotlinParser.SUB);
                }
                break;
            case KotlinParser.EXCL:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2637;
                this.match(KotlinParser.EXCL);
                }
                break;
            case KotlinParser.AT:
            case KotlinParser.FILE_SITE:
            case KotlinParser.FIELD_SITE:
            case KotlinParser.PROPERTY_SITE:
            case KotlinParser.GET_SITE:
            case KotlinParser.SET_SITE:
            case KotlinParser.RECEIVER_SITE:
            case KotlinParser.PARAM_SITE:
            case KotlinParser.SETPARAM_SITE:
            case KotlinParser.DELEGATE_SITE:
            case KotlinParser.LabelReference:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 2638;
                this.annotations();
                }
                break;
            case KotlinParser.LabelDefinition:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 2639;
                this.labelDefinition();
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
    public postfixUnaryOperation(): PostfixUnaryOperationContext {
        let localContext = new PostfixUnaryOperationContext(this.context, this.state);
        this.enterRule(localContext, 252, KotlinParser.RULE_postfixUnaryOperation);
        let _la: number;
        try {
            this.state = 2657;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 406, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2642;
                this.match(KotlinParser.INCR);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2643;
                this.match(KotlinParser.DECR);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2644;
                this.match(KotlinParser.EXCL);
                this.state = 2645;
                this.match(KotlinParser.EXCL);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2646;
                this.callSuffix();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2647;
                this.arrayAccess();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 2651;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2648;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2653;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2654;
                this.memberAccessOperator();
                this.state = 2655;
                this.postfixUnaryExpression();
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
    public memberAccessOperator(): MemberAccessOperatorContext {
        let localContext = new MemberAccessOperatorContext(this.context, this.state);
        this.enterRule(localContext, 254, KotlinParser.RULE_memberAccessOperator);
        try {
            this.state = 2662;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.DOT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2659;
                this.match(KotlinParser.DOT);
                }
                break;
            case KotlinParser.QUEST:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2660;
                this.match(KotlinParser.QUEST);
                this.state = 2661;
                this.match(KotlinParser.DOT);
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
    public modifierList(): ModifierListContext {
        let localContext = new ModifierListContext(this.context, this.state);
        this.enterRule(localContext, 256, KotlinParser.RULE_modifierList);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2666;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    this.state = 2666;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case KotlinParser.AT:
                    case KotlinParser.FILE_SITE:
                    case KotlinParser.FIELD_SITE:
                    case KotlinParser.PROPERTY_SITE:
                    case KotlinParser.GET_SITE:
                    case KotlinParser.SET_SITE:
                    case KotlinParser.RECEIVER_SITE:
                    case KotlinParser.PARAM_SITE:
                    case KotlinParser.SETPARAM_SITE:
                    case KotlinParser.DELEGATE_SITE:
                    case KotlinParser.LabelReference:
                        {
                        this.state = 2664;
                        this.annotations();
                        }
                        break;
                    case KotlinParser.IN:
                    case KotlinParser.OUT:
                    case KotlinParser.PUBLIC:
                    case KotlinParser.PRIVATE:
                    case KotlinParser.PROTECTED:
                    case KotlinParser.INTERNAL:
                    case KotlinParser.ENUM:
                    case KotlinParser.SEALED:
                    case KotlinParser.ANNOTATION:
                    case KotlinParser.DATA:
                    case KotlinParser.INNER:
                    case KotlinParser.TAILREC:
                    case KotlinParser.OPERATOR:
                    case KotlinParser.INLINE:
                    case KotlinParser.INFIX:
                    case KotlinParser.EXTERNAL:
                    case KotlinParser.SUSPEND:
                    case KotlinParser.OVERRIDE:
                    case KotlinParser.ABSTRACT:
                    case KotlinParser.FINAL:
                    case KotlinParser.OPEN:
                    case KotlinParser.CONST:
                    case KotlinParser.LATEINIT:
                    case KotlinParser.VARARG:
                    case KotlinParser.NOINLINE:
                    case KotlinParser.CROSSINLINE:
                    case KotlinParser.REIFIED:
                        {
                        this.state = 2665;
                        this.modifier();
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 2668;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 409, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
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
    public functionModifierList(): FunctionModifierListContext {
        let localContext = new FunctionModifierListContext(this.context, this.state);
        this.enterRule(localContext, 258, KotlinParser.RULE_functionModifierList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2673;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 2673;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case KotlinParser.AT:
                case KotlinParser.FILE_SITE:
                case KotlinParser.FIELD_SITE:
                case KotlinParser.PROPERTY_SITE:
                case KotlinParser.GET_SITE:
                case KotlinParser.SET_SITE:
                case KotlinParser.RECEIVER_SITE:
                case KotlinParser.PARAM_SITE:
                case KotlinParser.SETPARAM_SITE:
                case KotlinParser.DELEGATE_SITE:
                case KotlinParser.LabelReference:
                    {
                    this.state = 2670;
                    this.annotations();
                    }
                    break;
                case KotlinParser.IN:
                case KotlinParser.OUT:
                case KotlinParser.PUBLIC:
                case KotlinParser.PRIVATE:
                case KotlinParser.PROTECTED:
                case KotlinParser.INTERNAL:
                case KotlinParser.ENUM:
                case KotlinParser.SEALED:
                case KotlinParser.ANNOTATION:
                case KotlinParser.DATA:
                case KotlinParser.INNER:
                case KotlinParser.TAILREC:
                case KotlinParser.OPERATOR:
                case KotlinParser.INLINE:
                case KotlinParser.INFIX:
                case KotlinParser.EXTERNAL:
                case KotlinParser.SUSPEND:
                case KotlinParser.OVERRIDE:
                case KotlinParser.ABSTRACT:
                case KotlinParser.FINAL:
                case KotlinParser.OPEN:
                case KotlinParser.CONST:
                case KotlinParser.LATEINIT:
                case KotlinParser.VARARG:
                case KotlinParser.NOINLINE:
                case KotlinParser.CROSSINLINE:
                case KotlinParser.REIFIED:
                    {
                    this.state = 2671;
                    this.modifier();
                    }
                    break;
                case KotlinParser.CONTEXT:
                    {
                    this.state = 2672;
                    this.contextModifier();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 2675;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 2162689) !== 0) || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 4294932953) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 2097663) !== 0));
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
    public contextParameters(): ContextParametersContext {
        let localContext = new ContextParametersContext(this.context, this.state);
        this.enterRule(localContext, 260, KotlinParser.RULE_contextParameters);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2677;
            this.match(KotlinParser.LPAREN);
            this.state = 2689;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6364681) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 4294963397) !== 0) || ((((_la - 125)) & ~0x1F) === 0 && ((1 << (_la - 125)) & 131135) !== 0)) {
                {
                this.state = 2678;
                this.parameter();
                this.state = 2683;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 412, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2679;
                        this.match(KotlinParser.COMMA);
                        this.state = 2680;
                        this.parameter();
                        }
                        }
                    }
                    this.state = 2685;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 412, this.context);
                }
                this.state = 2687;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 8) {
                    {
                    this.state = 2686;
                    this.match(KotlinParser.COMMA);
                    }
                }

                }
            }

            this.state = 2691;
            this.match(KotlinParser.RPAREN);
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
    public contextModifier(): ContextModifierContext {
        let localContext = new ContextModifierContext(this.context, this.state);
        this.enterRule(localContext, 262, KotlinParser.RULE_contextModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2693;
            this.match(KotlinParser.CONTEXT);
            this.state = 2694;
            this.contextParameters();
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
    public modifier(): ModifierContext {
        let localContext = new ModifierContext(this.context, this.state);
        this.enterRule(localContext, 264, KotlinParser.RULE_modifier);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2705;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.ENUM:
            case KotlinParser.SEALED:
            case KotlinParser.ANNOTATION:
            case KotlinParser.DATA:
            case KotlinParser.INNER:
                {
                this.state = 2696;
                this.classModifier();
                }
                break;
            case KotlinParser.OVERRIDE:
            case KotlinParser.LATEINIT:
                {
                this.state = 2697;
                this.memberModifier();
                }
                break;
            case KotlinParser.PUBLIC:
            case KotlinParser.PRIVATE:
            case KotlinParser.PROTECTED:
            case KotlinParser.INTERNAL:
                {
                this.state = 2698;
                this.visibilityModifier();
                }
                break;
            case KotlinParser.IN:
            case KotlinParser.OUT:
                {
                this.state = 2699;
                this.varianceAnnotation();
                }
                break;
            case KotlinParser.TAILREC:
            case KotlinParser.OPERATOR:
            case KotlinParser.INLINE:
            case KotlinParser.INFIX:
            case KotlinParser.EXTERNAL:
            case KotlinParser.SUSPEND:
                {
                this.state = 2700;
                this.functionModifier();
                }
                break;
            case KotlinParser.CONST:
                {
                this.state = 2701;
                this.propertyModifier();
                }
                break;
            case KotlinParser.ABSTRACT:
            case KotlinParser.FINAL:
            case KotlinParser.OPEN:
                {
                this.state = 2702;
                this.inheritanceModifier();
                }
                break;
            case KotlinParser.VARARG:
            case KotlinParser.NOINLINE:
            case KotlinParser.CROSSINLINE:
                {
                this.state = 2703;
                this.parameterModifier();
                }
                break;
            case KotlinParser.REIFIED:
                {
                this.state = 2704;
                this.typeParameterModifier();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 2710;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 416, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2707;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 2712;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 416, this.context);
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
    public classModifier(): ClassModifierContext {
        let localContext = new ClassModifierContext(this.context, this.state);
        this.enterRule(localContext, 266, KotlinParser.RULE_classModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2713;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 31) !== 0))) {
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
    public memberModifier(): MemberModifierContext {
        let localContext = new MemberModifierContext(this.context, this.state);
        this.enterRule(localContext, 268, KotlinParser.RULE_memberModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2715;
            _la = this.tokenStream.LA(1);
            if(!(_la === 121 || _la === 126)) {
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
    public visibilityModifier(): VisibilityModifierContext {
        let localContext = new VisibilityModifierContext(this.context, this.state);
        this.enterRule(localContext, 270, KotlinParser.RULE_visibilityModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2717;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 15) !== 0))) {
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
    public varianceAnnotation(): VarianceAnnotationContext {
        let localContext = new VarianceAnnotationContext(this.context, this.state);
        this.enterRule(localContext, 272, KotlinParser.RULE_varianceAnnotation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2719;
            _la = this.tokenStream.LA(1);
            if(!(_la === 90 || _la === 93)) {
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
    public functionModifier(): FunctionModifierContext {
        let localContext = new FunctionModifierContext(this.context, this.state);
        this.enterRule(localContext, 274, KotlinParser.RULE_functionModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2721;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 115)) & ~0x1F) === 0 && ((1 << (_la - 115)) & 63) !== 0))) {
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
    public propertyModifier(): PropertyModifierContext {
        let localContext = new PropertyModifierContext(this.context, this.state);
        this.enterRule(localContext, 276, KotlinParser.RULE_propertyModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2723;
            this.match(KotlinParser.CONST);
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
    public inheritanceModifier(): InheritanceModifierContext {
        let localContext = new InheritanceModifierContext(this.context, this.state);
        this.enterRule(localContext, 278, KotlinParser.RULE_inheritanceModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2725;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & 7) !== 0))) {
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
    public parameterModifier(): ParameterModifierContext {
        let localContext = new ParameterModifierContext(this.context, this.state);
        this.enterRule(localContext, 280, KotlinParser.RULE_parameterModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2727;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 127)) & ~0x1F) === 0 && ((1 << (_la - 127)) & 7) !== 0))) {
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
    public typeParameterModifier(): TypeParameterModifierContext {
        let localContext = new TypeParameterModifierContext(this.context, this.state);
        this.enterRule(localContext, 282, KotlinParser.RULE_typeParameterModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2729;
            this.match(KotlinParser.REIFIED);
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
    public labelDefinition(): LabelDefinitionContext {
        let localContext = new LabelDefinitionContext(this.context, this.state);
        this.enterRule(localContext, 284, KotlinParser.RULE_labelDefinition);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2731;
            this.match(KotlinParser.LabelDefinition);
            this.state = 2735;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 417, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2732;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 2737;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 417, this.context);
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
    public annotations(): AnnotationsContext {
        let localContext = new AnnotationsContext(this.context, this.state);
        this.enterRule(localContext, 286, KotlinParser.RULE_annotations);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2740;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 418, this.context) ) {
            case 1:
                {
                this.state = 2738;
                this.annotation();
                }
                break;
            case 2:
                {
                this.state = 2739;
                this.annotationList();
                }
                break;
            }
            this.state = 2745;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 419, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2742;
                    this.match(KotlinParser.NL);
                    }
                    }
                }
                this.state = 2747;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 419, this.context);
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
    public annotation(): AnnotationContext {
        let localContext = new AnnotationContext(this.context, this.state);
        this.enterRule(localContext, 288, KotlinParser.RULE_annotation);
        let _la: number;
        try {
            let alternative: number;
            this.state = 2802;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.FILE_SITE:
            case KotlinParser.FIELD_SITE:
            case KotlinParser.PROPERTY_SITE:
            case KotlinParser.GET_SITE:
            case KotlinParser.SET_SITE:
            case KotlinParser.RECEIVER_SITE:
            case KotlinParser.PARAM_SITE:
            case KotlinParser.SETPARAM_SITE:
            case KotlinParser.DELEGATE_SITE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2748;
                this.annotationUseSiteTarget();
                this.state = 2752;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2749;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2754;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2755;
                this.match(KotlinParser.COLON);
                this.state = 2759;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2756;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2761;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2762;
                this.unescapedAnnotation();
                }
                break;
            case KotlinParser.LabelReference:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2764;
                this.match(KotlinParser.LabelReference);
                this.state = 2781;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 424, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2768;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        while (_la === 5) {
                            {
                            {
                            this.state = 2765;
                            this.match(KotlinParser.NL);
                            }
                            }
                            this.state = 2770;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                        }
                        this.state = 2771;
                        this.match(KotlinParser.DOT);
                        this.state = 2775;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        while (_la === 5) {
                            {
                            {
                            this.state = 2772;
                            this.match(KotlinParser.NL);
                            }
                            }
                            this.state = 2777;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                        }
                        this.state = 2778;
                        this.simpleIdentifier();
                        }
                        }
                    }
                    this.state = 2783;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 424, this.context);
                }
                this.state = 2791;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 426, this.context) ) {
                case 1:
                    {
                    this.state = 2787;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 2784;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 2789;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 2790;
                    this.typeArguments();
                    }
                    break;
                }
                this.state = 2800;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 428, this.context) ) {
                case 1:
                    {
                    this.state = 2796;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 2793;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 2798;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 2799;
                    this.valueArguments();
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
    public annotationList(): AnnotationListContext {
        let localContext = new AnnotationListContext(this.context, this.state);
        this.enterRule(localContext, 290, KotlinParser.RULE_annotationList);
        let _la: number;
        try {
            this.state = 2823;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case KotlinParser.FILE_SITE:
            case KotlinParser.FIELD_SITE:
            case KotlinParser.PROPERTY_SITE:
            case KotlinParser.GET_SITE:
            case KotlinParser.SET_SITE:
            case KotlinParser.RECEIVER_SITE:
            case KotlinParser.PARAM_SITE:
            case KotlinParser.SETPARAM_SITE:
            case KotlinParser.DELEGATE_SITE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2804;
                this.annotationUseSiteTarget();
                this.state = 2805;
                this.match(KotlinParser.COLON);
                this.state = 2806;
                this.match(KotlinParser.LSQUARE);
                this.state = 2808;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    {
                    this.state = 2807;
                    this.unescapedAnnotation();
                    }
                    }
                    this.state = 2810;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6364681) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 4294963397) !== 0) || ((((_la - 125)) & ~0x1F) === 0 && ((1 << (_la - 125)) & 131135) !== 0));
                this.state = 2812;
                this.match(KotlinParser.RSQUARE);
                }
                break;
            case KotlinParser.AT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2814;
                this.match(KotlinParser.AT);
                this.state = 2815;
                this.match(KotlinParser.LSQUARE);
                this.state = 2817;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    {
                    this.state = 2816;
                    this.unescapedAnnotation();
                    }
                    }
                    this.state = 2819;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6364681) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 4294963397) !== 0) || ((((_la - 125)) & ~0x1F) === 0 && ((1 << (_la - 125)) & 131135) !== 0));
                this.state = 2821;
                this.match(KotlinParser.RSQUARE);
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
    public annotationUseSiteTarget(): AnnotationUseSiteTargetContext {
        let localContext = new AnnotationUseSiteTargetContext(this.context, this.state);
        this.enterRule(localContext, 292, KotlinParser.RULE_annotationUseSiteTarget);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2825;
            _la = this.tokenStream.LA(1);
            if(!(_la === 56 || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 1949) !== 0))) {
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
    public unescapedAnnotation(): UnescapedAnnotationContext {
        let localContext = new UnescapedAnnotationContext(this.context, this.state);
        this.enterRule(localContext, 294, KotlinParser.RULE_unescapedAnnotation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2827;
            this.identifier();
            this.state = 2829;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 43) {
                {
                this.state = 2828;
                this.typeArguments();
                }
            }

            this.state = 2832;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 434, this.context) ) {
            case 1:
                {
                this.state = 2831;
                this.valueArguments();
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
    public identifier(): IdentifierContext {
        let localContext = new IdentifierContext(this.context, this.state);
        this.enterRule(localContext, 296, KotlinParser.RULE_identifier);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2834;
            this.simpleIdentifier();
            this.state = 2845;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 436, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 2838;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 5) {
                        {
                        {
                        this.state = 2835;
                        this.match(KotlinParser.NL);
                        }
                        }
                        this.state = 2840;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 2841;
                    this.match(KotlinParser.DOT);
                    this.state = 2842;
                    this.simpleIdentifier();
                    }
                    }
                }
                this.state = 2847;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 436, this.context);
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
    public simpleIdentifier(): SimpleIdentifierContext {
        let localContext = new SimpleIdentifierContext(this.context, this.state);
        this.enterRule(localContext, 298, KotlinParser.RULE_simpleIdentifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2848;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6364681) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 4294963397) !== 0) || ((((_la - 125)) & ~0x1F) === 0 && ((1 << (_la - 125)) & 131135) !== 0))) {
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
    public semi(): SemiContext {
        let localContext = new SemiContext(this.context, this.state);
        this.enterRule(localContext, 300, KotlinParser.RULE_semi);
        let _la: number;
        try {
            let alternative: number;
            this.state = 2868;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 440, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2851;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                    case 1:
                        {
                        {
                        this.state = 2850;
                        this.match(KotlinParser.NL);
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 2853;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 437, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2858;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 2855;
                    this.match(KotlinParser.NL);
                    }
                    }
                    this.state = 2860;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2861;
                this.match(KotlinParser.SEMICOLON);
                this.state = 2865;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 439, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2862;
                        this.match(KotlinParser.NL);
                        }
                        }
                    }
                    this.state = 2867;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 439, this.context);
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
    public anysemi(): AnysemiContext {
        let localContext = new AnysemiContext(this.context, this.state);
        this.enterRule(localContext, 302, KotlinParser.RULE_anysemi);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2870;
            _la = this.tokenStream.LA(1);
            if(!(_la === 5 || _la === 26)) {
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

    public static readonly _serializedATN: number[] = [
        4,1,172,2873,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        2,148,7,148,2,149,7,149,2,150,7,150,2,151,7,151,1,0,5,0,306,8,0,
        10,0,12,0,309,9,0,1,0,1,0,5,0,313,8,0,10,0,12,0,316,9,0,1,0,1,0,
        4,0,320,8,0,11,0,12,0,321,1,0,3,0,325,8,0,5,0,327,8,0,10,0,12,0,
        330,9,0,3,0,332,8,0,1,0,1,0,1,1,5,1,337,8,1,10,1,12,1,340,9,1,1,
        1,1,1,5,1,344,8,1,10,1,12,1,347,9,1,1,1,1,1,4,1,351,8,1,11,1,12,
        1,352,1,1,3,1,356,8,1,5,1,358,8,1,10,1,12,1,361,9,1,3,1,363,8,1,
        1,1,1,1,1,2,3,2,368,8,2,1,2,1,2,1,2,1,3,4,3,374,8,3,11,3,12,3,375,
        1,4,1,4,1,4,1,4,4,4,382,8,4,11,4,12,4,383,1,4,1,4,1,4,3,4,389,8,
        4,1,4,3,4,392,8,4,4,4,394,8,4,11,4,12,4,395,1,5,3,5,399,8,5,1,5,
        1,5,1,5,3,5,404,8,5,3,5,406,8,5,1,6,5,6,409,8,6,10,6,12,6,412,9,
        6,1,7,1,7,1,7,1,7,1,7,3,7,419,8,7,1,7,3,7,422,8,7,1,8,1,8,1,8,1,
        9,1,9,1,9,1,9,1,9,3,9,432,8,9,1,10,3,10,435,8,10,1,10,1,10,5,10,
        439,8,10,10,10,12,10,442,9,10,1,10,1,10,5,10,446,8,10,10,10,12,10,
        449,9,10,1,10,3,10,452,8,10,1,10,5,10,455,8,10,10,10,12,10,458,9,
        10,1,10,3,10,461,8,10,1,10,5,10,464,8,10,10,10,12,10,467,9,10,1,
        10,1,10,5,10,471,8,10,10,10,12,10,474,9,10,1,10,3,10,477,8,10,1,
        10,5,10,480,8,10,10,10,12,10,483,9,10,1,10,3,10,486,8,10,1,10,5,
        10,489,8,10,10,10,12,10,492,9,10,1,10,1,10,5,10,496,8,10,10,10,12,
        10,499,9,10,1,10,3,10,502,8,10,1,11,3,11,505,8,11,1,11,1,11,5,11,
        509,8,11,10,11,12,11,512,9,11,3,11,514,8,11,1,11,1,11,1,12,1,12,
        1,12,1,12,5,12,522,8,12,10,12,12,12,525,9,12,1,12,3,12,528,8,12,
        3,12,530,8,12,1,12,1,12,1,13,3,13,535,8,13,1,13,3,13,538,8,13,1,
        13,1,13,1,13,1,13,5,13,544,8,13,10,13,12,13,547,9,13,1,13,1,13,5,
        13,551,8,13,10,13,12,13,554,9,13,1,13,1,13,5,13,558,8,13,10,13,12,
        13,561,9,13,1,13,1,13,5,13,565,8,13,10,13,12,13,568,9,13,1,13,3,
        13,571,8,13,1,14,5,14,574,8,14,10,14,12,14,577,9,14,1,14,1,14,5,
        14,581,8,14,10,14,12,14,584,9,14,1,14,1,14,5,14,588,8,14,10,14,12,
        14,591,9,14,1,14,5,14,594,8,14,10,14,12,14,597,9,14,1,14,5,14,600,
        8,14,10,14,12,14,603,9,14,1,15,1,15,1,15,3,15,608,8,15,1,16,1,16,
        3,16,612,8,16,1,16,3,16,615,8,16,1,17,1,17,5,17,619,8,17,10,17,12,
        17,622,9,17,1,17,1,17,5,17,626,8,17,10,17,12,17,629,9,17,1,17,1,
        17,1,18,1,18,3,18,635,8,18,1,19,1,19,5,19,639,8,19,10,19,12,19,642,
        9,19,1,19,5,19,645,8,19,10,19,12,19,648,9,19,1,19,5,19,651,8,19,
        10,19,12,19,654,9,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,20,1,20,
        1,20,3,20,666,8,20,1,20,4,20,669,8,20,11,20,12,20,670,1,21,1,21,
        5,21,675,8,21,10,21,12,21,678,9,21,1,21,1,21,1,22,3,22,683,8,22,
        1,22,1,22,5,22,687,8,22,10,22,12,22,690,9,22,1,22,1,22,5,22,694,
        8,22,10,22,12,22,697,9,22,1,22,1,22,5,22,701,8,22,10,22,12,22,704,
        9,22,1,22,3,22,707,8,22,1,22,5,22,710,8,22,10,22,12,22,713,9,22,
        1,22,3,22,716,8,22,1,23,1,23,5,23,720,8,23,10,23,12,23,723,9,23,
        1,23,1,23,1,23,5,23,728,8,23,10,23,12,23,731,9,23,1,23,3,23,734,
        8,23,1,24,1,24,5,24,738,8,24,10,24,12,24,741,9,24,1,24,3,24,744,
        8,24,1,24,5,24,747,8,24,10,24,12,24,750,9,24,1,24,1,24,5,24,754,
        8,24,10,24,12,24,757,9,24,1,24,5,24,760,8,24,10,24,12,24,763,9,24,
        3,24,765,8,24,1,24,5,24,768,8,24,10,24,12,24,771,9,24,1,24,1,24,
        1,25,1,25,5,25,777,8,25,10,25,12,25,780,9,25,4,25,782,8,25,11,25,
        12,25,783,1,25,3,25,787,8,25,1,26,5,26,790,8,26,10,26,12,26,793,
        9,26,1,26,1,26,5,26,797,8,26,10,26,12,26,800,9,26,1,26,3,26,803,
        8,26,1,26,5,26,806,8,26,10,26,12,26,809,9,26,1,26,3,26,812,8,26,
        1,26,5,26,815,8,26,10,26,12,26,818,9,26,1,26,3,26,821,8,26,1,27,
        3,27,824,8,27,1,27,1,27,5,27,828,8,27,10,27,12,27,831,9,27,1,27,
        3,27,834,8,27,1,27,5,27,837,8,27,10,27,12,27,840,9,27,1,27,1,27,
        5,27,844,8,27,10,27,12,27,847,9,27,1,27,1,27,3,27,851,8,27,1,27,
        5,27,854,8,27,10,27,12,27,857,9,27,1,27,3,27,860,8,27,1,27,5,27,
        863,8,27,10,27,12,27,866,9,27,1,27,1,27,5,27,870,8,27,10,27,12,27,
        873,9,27,1,27,1,27,5,27,877,8,27,10,27,12,27,880,9,27,1,27,3,27,
        883,8,27,1,27,5,27,886,8,27,10,27,12,27,889,9,27,1,27,3,27,892,8,
        27,1,27,5,27,895,8,27,10,27,12,27,898,9,27,1,27,3,27,901,8,27,1,
        28,1,28,1,28,1,28,5,28,907,8,28,10,28,12,28,910,9,28,1,28,3,28,913,
        8,28,3,28,915,8,28,1,28,1,28,1,29,3,29,920,8,29,1,29,1,29,1,29,3,
        29,925,8,29,1,30,1,30,1,30,1,30,1,31,3,31,932,8,31,1,31,1,31,1,31,
        3,31,937,8,31,1,32,1,32,1,32,5,32,942,8,32,10,32,12,32,945,9,32,
        1,32,3,32,948,8,32,1,33,3,33,951,8,33,1,33,1,33,5,33,955,8,33,10,
        33,12,33,958,9,33,1,33,1,33,5,33,962,8,33,10,33,12,33,965,9,33,1,
        33,3,33,968,8,33,1,33,5,33,971,8,33,10,33,12,33,974,9,33,1,33,1,
        33,5,33,978,8,33,10,33,12,33,981,9,33,1,33,3,33,984,8,33,1,33,5,
        33,987,8,33,10,33,12,33,990,9,33,1,33,3,33,993,8,33,1,34,3,34,996,
        8,34,1,34,1,34,5,34,1000,8,34,10,34,12,34,1003,9,34,1,34,3,34,1006,
        8,34,1,34,1,34,5,34,1010,8,34,10,34,12,34,1013,9,34,1,34,3,34,1016,
        8,34,1,34,5,34,1019,8,34,10,34,12,34,1022,9,34,1,34,1,34,5,34,1026,
        8,34,10,34,12,34,1029,9,34,1,34,3,34,1032,8,34,1,34,5,34,1035,8,
        34,10,34,12,34,1038,9,34,1,34,3,34,1041,8,34,1,35,3,35,1044,8,35,
        1,35,1,35,5,35,1048,8,35,10,35,12,35,1051,9,35,1,35,3,35,1054,8,
        35,1,35,5,35,1057,8,35,10,35,12,35,1060,9,35,1,35,1,35,5,35,1064,
        8,35,10,35,12,35,1067,9,35,1,35,1,35,3,35,1071,8,35,1,35,5,35,1074,
        8,35,10,35,12,35,1077,9,35,1,35,1,35,3,35,1081,8,35,1,35,5,35,1084,
        8,35,10,35,12,35,1087,9,35,1,35,3,35,1090,8,35,1,35,5,35,1093,8,
        35,10,35,12,35,1096,9,35,1,35,1,35,5,35,1100,8,35,10,35,12,35,1103,
        9,35,1,35,3,35,1106,8,35,1,35,5,35,1109,8,35,10,35,12,35,1112,9,
        35,1,35,1,35,1,35,1,35,3,35,1118,8,35,1,35,5,35,1121,8,35,10,35,
        12,35,1124,9,35,1,35,1,35,1,35,1,35,3,35,1130,8,35,3,35,1132,8,35,
        1,35,5,35,1135,8,35,10,35,12,35,1138,9,35,1,35,3,35,1141,8,35,1,
        36,1,36,1,36,1,36,1,36,5,36,1148,8,36,10,36,12,36,1151,9,36,1,36,
        1,36,1,37,1,37,1,37,1,37,5,37,1159,8,37,10,37,12,37,1162,9,37,1,
        37,1,37,1,38,1,38,1,38,3,38,1169,8,38,1,39,3,39,1172,8,39,1,39,1,
        39,3,39,1176,8,39,1,39,1,39,5,39,1180,8,39,10,39,12,39,1183,9,39,
        1,39,1,39,1,39,5,39,1188,8,39,10,39,12,39,1191,9,39,1,39,1,39,5,
        39,1195,8,39,10,39,12,39,1198,9,39,1,39,3,39,1201,8,39,1,39,5,39,
        1204,8,39,10,39,12,39,1207,9,39,1,39,1,39,1,39,5,39,1212,8,39,10,
        39,12,39,1215,9,39,1,39,3,39,1218,8,39,3,39,1220,8,39,1,40,3,40,
        1223,8,40,1,40,1,40,3,40,1227,8,40,1,40,1,40,5,40,1231,8,40,10,40,
        12,40,1234,9,40,1,40,1,40,1,40,5,40,1239,8,40,10,40,12,40,1242,9,
        40,1,40,1,40,3,40,1246,8,40,1,40,1,40,5,40,1250,8,40,10,40,12,40,
        1253,9,40,1,40,1,40,3,40,1257,8,40,1,41,3,41,1260,8,41,1,41,1,41,
        5,41,1264,8,41,10,41,12,41,1267,9,41,1,41,1,41,5,41,1271,8,41,10,
        41,12,41,1274,9,41,1,41,3,41,1277,8,41,1,41,5,41,1280,8,41,10,41,
        12,41,1283,9,41,1,41,1,41,5,41,1287,8,41,10,41,12,41,1290,9,41,1,
        41,1,41,1,42,1,42,5,42,1296,8,42,10,42,12,42,1299,9,42,1,42,1,42,
        5,42,1303,8,42,10,42,12,42,1306,9,42,1,42,1,42,5,42,1310,8,42,10,
        42,12,42,1313,9,42,1,42,5,42,1316,8,42,10,42,12,42,1319,9,42,1,42,
        5,42,1322,8,42,10,42,12,42,1325,9,42,1,42,3,42,1328,8,42,1,42,5,
        42,1331,8,42,10,42,12,42,1334,9,42,1,42,1,42,1,43,3,43,1339,8,43,
        1,43,5,43,1342,8,43,10,43,12,43,1345,9,43,1,43,1,43,3,43,1349,8,
        43,1,43,5,43,1352,8,43,10,43,12,43,1355,9,43,1,43,1,43,5,43,1359,
        8,43,10,43,12,43,1362,9,43,1,43,3,43,1365,8,43,1,44,3,44,1368,8,
        44,1,44,1,44,1,44,1,44,3,44,1374,8,44,1,45,1,45,1,45,5,45,1379,8,
        45,10,45,12,45,1382,9,45,4,45,1384,8,45,11,45,12,45,1385,1,46,1,
        46,1,46,1,46,1,47,1,47,3,47,1394,8,47,1,47,5,47,1397,8,47,10,47,
        12,47,1400,9,47,1,47,4,47,1403,8,47,11,47,12,47,1404,1,48,1,48,1,
        48,1,48,1,48,1,48,3,48,1413,8,48,1,49,1,49,5,49,1417,8,49,10,49,
        12,49,1420,9,49,1,49,1,49,5,49,1424,8,49,10,49,12,49,1427,9,49,3,
        49,1429,8,49,1,49,1,49,5,49,1433,8,49,10,49,12,49,1436,9,49,1,49,
        1,49,5,49,1440,8,49,10,49,12,49,1443,9,49,1,49,1,49,1,50,1,50,1,
        50,3,50,1450,8,50,1,51,1,51,5,51,1454,8,51,10,51,12,51,1457,9,51,
        1,51,1,51,5,51,1461,8,51,10,51,12,51,1464,9,51,1,51,5,51,1467,8,
        51,10,51,12,51,1470,9,51,1,52,1,52,5,52,1474,8,52,10,52,12,52,1477,
        9,52,1,52,3,52,1480,8,52,1,53,1,53,5,53,1484,8,53,10,53,12,53,1487,
        9,53,1,53,1,53,3,53,1491,8,53,1,53,5,53,1494,8,53,10,53,12,53,1497,
        9,53,1,53,1,53,5,53,1501,8,53,10,53,12,53,1504,9,53,1,53,1,53,3,
        53,1508,8,53,5,53,1510,8,53,10,53,12,53,1513,9,53,1,53,5,53,1516,
        8,53,10,53,12,53,1519,9,53,1,53,3,53,1522,8,53,1,53,5,53,1525,8,
        53,10,53,12,53,1528,9,53,1,53,1,53,1,54,1,54,5,54,1534,8,54,10,54,
        12,54,1537,9,54,1,54,1,54,5,54,1541,8,54,10,54,12,54,1544,9,54,1,
        54,1,54,5,54,1548,8,54,10,54,12,54,1551,9,54,1,54,5,54,1554,8,54,
        10,54,12,54,1557,9,54,1,55,5,55,1560,8,55,10,55,12,55,1563,9,55,
        1,55,1,55,5,55,1567,8,55,10,55,12,55,1570,9,55,1,55,1,55,5,55,1574,
        8,55,10,55,12,55,1577,9,55,1,55,1,55,1,56,1,56,1,56,1,56,1,57,5,
        57,1586,8,57,10,57,12,57,1589,9,57,1,57,1,57,4,57,1593,8,57,11,57,
        12,57,1594,1,57,3,57,1598,8,57,5,57,1600,8,57,10,57,12,57,1603,9,
        57,3,57,1605,8,57,1,58,1,58,3,58,1609,8,58,1,59,5,59,1612,8,59,10,
        59,12,59,1615,9,59,1,59,5,59,1618,8,59,10,59,12,59,1621,9,59,1,59,
        1,59,1,60,5,60,1626,8,60,10,60,12,60,1629,9,60,1,60,1,60,1,60,1,
        60,3,60,1635,8,60,1,61,1,61,1,61,1,61,5,61,1641,8,61,10,61,12,61,
        1644,9,61,1,62,1,62,5,62,1648,8,62,10,62,12,62,1651,9,62,1,62,1,
        62,5,62,1655,8,62,10,62,12,62,1658,9,62,1,62,5,62,1661,8,62,10,62,
        12,62,1664,9,62,1,63,1,63,5,63,1668,8,63,10,63,12,63,1671,9,63,1,
        63,1,63,5,63,1675,8,63,10,63,12,63,1678,9,63,1,63,5,63,1681,8,63,
        10,63,12,63,1684,9,63,1,64,1,64,1,64,5,64,1689,8,64,10,64,12,64,
        1692,9,64,1,64,1,64,5,64,1696,8,64,10,64,12,64,1699,9,64,1,65,1,
        65,1,65,5,65,1704,8,65,10,65,12,65,1707,9,65,1,65,1,65,3,65,1711,
        8,65,1,66,1,66,1,66,5,66,1716,8,66,10,66,12,66,1719,9,66,1,66,1,
        66,4,66,1723,8,66,11,66,12,66,1724,1,66,1,66,5,66,1729,8,66,10,66,
        12,66,1732,9,66,1,66,1,66,3,66,1736,8,66,1,67,1,67,5,67,1740,8,67,
        10,67,12,67,1743,9,67,1,67,1,67,5,67,1747,8,67,10,67,12,67,1750,
        9,67,1,67,5,67,1753,8,67,10,67,12,67,1756,9,67,1,68,1,68,1,68,5,
        68,1761,8,68,10,68,12,68,1764,9,68,1,68,1,68,5,68,1768,8,68,10,68,
        12,68,1771,9,68,1,69,1,69,1,69,5,69,1776,8,69,10,69,12,69,1779,9,
        69,1,69,5,69,1782,8,69,10,69,12,69,1785,9,69,1,70,1,70,1,70,5,70,
        1790,8,70,10,70,12,70,1793,9,70,1,70,1,70,5,70,1797,8,70,10,70,12,
        70,1800,9,70,1,71,1,71,1,71,5,71,1805,8,71,10,71,12,71,1808,9,71,
        1,71,1,71,5,71,1812,8,71,10,71,12,71,1815,9,71,1,72,1,72,5,72,1819,
        8,72,10,72,12,72,1822,9,72,1,72,1,72,1,72,5,72,1827,8,72,10,72,12,
        72,1830,9,72,1,73,5,73,1833,8,73,10,73,12,73,1836,9,73,1,73,1,73,
        1,74,1,74,3,74,1842,8,74,1,74,5,74,1845,8,74,10,74,12,74,1848,9,
        74,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,
        75,1,75,3,75,1864,8,75,1,76,1,76,1,76,1,76,1,77,1,77,3,77,1872,8,
        77,1,77,5,77,1875,8,77,10,77,12,77,1878,9,77,1,77,1,77,5,77,1882,
        8,77,10,77,12,77,1885,9,77,1,77,4,77,1888,8,77,11,77,12,77,1889,
        3,77,1892,8,77,1,78,5,78,1895,8,78,10,78,12,78,1898,9,78,1,78,3,
        78,1901,8,78,1,78,5,78,1904,8,78,10,78,12,78,1907,9,78,1,78,1,78,
        1,79,1,79,1,79,1,79,5,79,1915,8,79,10,79,12,79,1918,9,79,3,79,1920,
        8,79,1,79,1,79,1,80,1,80,1,80,1,80,5,80,1928,8,80,10,80,12,80,1931,
        9,80,1,80,5,80,1934,8,80,10,80,12,80,1937,9,80,1,80,3,80,1940,8,
        80,3,80,1942,8,80,1,80,1,80,1,81,1,81,5,81,1948,8,81,10,81,12,81,
        1951,9,81,1,81,1,81,5,81,1955,8,81,10,81,12,81,1958,9,81,1,81,1,
        81,5,81,1962,8,81,10,81,12,81,1965,9,81,1,81,5,81,1968,8,81,10,81,
        12,81,1971,9,81,1,81,3,81,1974,8,81,1,81,5,81,1977,8,81,10,81,12,
        81,1980,9,81,1,81,1,81,3,81,1984,8,81,1,82,3,82,1987,8,82,1,82,1,
        82,3,82,1991,8,82,1,83,4,83,1994,8,83,11,83,12,83,1995,1,84,1,84,
        5,84,2000,8,84,10,84,12,84,2003,9,84,1,84,1,84,5,84,2007,8,84,10,
        84,12,84,2010,9,84,3,84,2012,8,84,1,84,3,84,2015,8,84,1,84,5,84,
        2018,8,84,10,84,12,84,2021,9,84,1,84,1,84,1,85,1,85,1,85,1,85,1,
        85,1,85,1,85,1,85,1,85,3,85,2034,8,85,1,86,1,86,3,86,2038,8,86,1,
        87,1,87,1,87,5,87,2043,8,87,10,87,12,87,2046,9,87,1,87,1,87,1,88,
        1,88,1,88,1,88,1,88,5,88,2055,8,88,10,88,12,88,2058,9,88,1,88,1,
        88,1,89,1,89,1,90,1,90,1,90,1,90,1,91,1,91,1,92,1,92,1,92,1,92,1,
        93,5,93,2075,8,93,10,93,12,93,2078,9,93,1,93,1,93,5,93,2082,8,93,
        10,93,12,93,2085,9,93,1,93,1,93,5,93,2089,8,93,10,93,12,93,2092,
        9,93,1,93,1,93,1,93,1,93,5,93,2098,8,93,10,93,12,93,2101,9,93,1,
        93,1,93,5,93,2105,8,93,10,93,12,93,2108,9,93,1,93,1,93,5,93,2112,
        8,93,10,93,12,93,2115,9,93,1,93,1,93,5,93,2119,8,93,10,93,12,93,
        2122,9,93,1,93,1,93,3,93,2126,8,93,1,94,3,94,2129,8,94,1,94,5,94,
        2132,8,94,10,94,12,94,2135,9,94,1,94,1,94,5,94,2139,8,94,10,94,12,
        94,2142,9,94,1,94,5,94,2145,8,94,10,94,12,94,2148,9,94,1,95,1,95,
        1,95,5,95,2153,8,95,10,95,12,95,2156,9,95,1,95,1,95,5,95,2160,8,
        95,10,95,12,95,2163,9,95,1,95,3,95,2166,8,95,3,95,2168,8,95,1,96,
        1,96,5,96,2172,8,96,10,96,12,96,2175,9,96,1,96,1,96,5,96,2179,8,
        96,10,96,12,96,2182,9,96,1,96,3,96,2185,8,96,1,96,5,96,2188,8,96,
        10,96,12,96,2191,9,96,1,96,3,96,2194,8,96,1,97,1,97,3,97,2198,8,
        97,1,97,1,97,5,97,2202,8,97,10,97,12,97,2205,9,97,1,97,1,97,1,98,
        1,98,3,98,2211,8,98,1,99,1,99,1,99,5,99,2216,8,99,10,99,12,99,2219,
        9,99,1,99,1,99,5,99,2223,8,99,10,99,12,99,2226,9,99,1,99,1,99,3,
        99,2230,8,99,1,99,3,99,2233,8,99,1,100,1,100,3,100,2237,8,100,1,
        101,1,101,5,101,2241,8,101,10,101,12,101,2244,9,101,1,101,1,101,
        1,101,1,101,5,101,2250,8,101,10,101,12,101,2253,9,101,1,101,3,101,
        2256,8,101,1,101,3,101,2259,8,101,1,101,5,101,2262,8,101,10,101,
        12,101,2265,9,101,1,101,1,101,5,101,2269,8,101,10,101,12,101,2272,
        9,101,1,101,3,101,2275,8,101,3,101,2277,8,101,1,102,1,102,3,102,
        2281,8,102,1,103,1,103,5,103,2285,8,103,10,103,12,103,2288,9,103,
        1,103,1,103,1,103,1,103,3,103,2294,8,103,1,103,5,103,2297,8,103,
        10,103,12,103,2300,9,103,1,103,1,103,5,103,2304,8,103,10,103,12,
        103,2307,9,103,1,103,1,103,5,103,2311,8,103,10,103,12,103,2314,9,
        103,5,103,2316,8,103,10,103,12,103,2319,9,103,1,103,5,103,2322,8,
        103,10,103,12,103,2325,9,103,1,103,1,103,1,104,1,104,5,104,2331,
        8,104,10,104,12,104,2334,9,104,1,104,1,104,5,104,2338,8,104,10,104,
        12,104,2341,9,104,1,104,5,104,2344,8,104,10,104,12,104,2347,9,104,
        1,104,5,104,2350,8,104,10,104,12,104,2353,9,104,1,104,1,104,5,104,
        2357,8,104,10,104,12,104,2360,9,104,1,104,1,104,3,104,2364,8,104,
        1,104,1,104,5,104,2368,8,104,10,104,12,104,2371,9,104,1,104,1,104,
        5,104,2375,8,104,10,104,12,104,2378,9,104,1,104,3,104,2381,8,104,
        1,105,1,105,1,105,3,105,2386,8,105,1,106,1,106,5,106,2390,8,106,
        10,106,12,106,2393,9,106,1,106,1,106,1,107,1,107,5,107,2399,8,107,
        10,107,12,107,2402,9,107,1,107,1,107,1,108,1,108,5,108,2408,8,108,
        10,108,12,108,2411,9,108,1,108,1,108,5,108,2415,8,108,10,108,12,
        108,2418,9,108,1,108,5,108,2421,8,108,10,108,12,108,2424,9,108,1,
        108,5,108,2427,8,108,10,108,12,108,2430,9,108,1,108,3,108,2433,8,
        108,1,109,1,109,5,109,2437,8,109,10,109,12,109,2440,9,109,1,109,
        1,109,5,109,2444,8,109,10,109,12,109,2447,9,109,1,109,1,109,1,109,
        1,109,1,109,5,109,2454,8,109,10,109,12,109,2457,9,109,1,109,1,109,
        1,110,1,110,5,110,2463,8,110,10,110,12,110,2466,9,110,1,110,1,110,
        1,111,1,111,1,111,3,111,2473,8,111,1,112,1,112,5,112,2477,8,112,
        10,112,12,112,2480,9,112,1,112,1,112,5,112,2484,8,112,10,112,12,
        112,2487,9,112,1,112,1,112,3,112,2491,8,112,1,112,1,112,1,112,1,
        112,5,112,2497,8,112,10,112,12,112,2500,9,112,1,112,3,112,2503,8,
        112,1,113,1,113,5,113,2507,8,113,10,113,12,113,2510,9,113,1,113,
        1,113,1,113,1,113,5,113,2516,8,113,10,113,12,113,2519,9,113,1,113,
        3,113,2522,8,113,1,114,1,114,5,114,2526,8,114,10,114,12,114,2529,
        9,114,1,114,3,114,2532,8,114,1,114,5,114,2535,8,114,10,114,12,114,
        2538,9,114,1,114,1,114,5,114,2542,8,114,10,114,12,114,2545,9,114,
        1,114,1,114,1,114,1,114,1,115,1,115,5,115,2553,8,115,10,115,12,115,
        2556,9,115,1,115,1,115,1,115,3,115,2561,8,115,1,115,1,115,1,115,
        1,115,3,115,2567,8,115,1,116,1,116,1,116,5,116,2572,8,116,10,116,
        12,116,2575,9,116,5,116,2577,8,116,10,116,12,116,2580,9,116,3,116,
        2582,8,116,1,116,5,116,2585,8,116,10,116,12,116,2588,9,116,1,116,
        1,116,5,116,2592,8,116,10,116,12,116,2595,9,116,1,116,1,116,3,116,
        2599,8,116,1,116,1,116,5,116,2603,8,116,10,116,12,116,2606,9,116,
        1,116,1,116,5,116,2610,8,116,10,116,12,116,2613,9,116,1,116,3,116,
        2616,8,116,1,117,1,117,1,118,1,118,1,119,1,119,1,120,1,120,1,121,
        1,121,1,122,1,122,1,123,1,123,1,124,1,124,1,125,1,125,1,125,1,125,
        1,125,1,125,1,125,3,125,2641,8,125,1,126,1,126,1,126,1,126,1,126,
        1,126,1,126,5,126,2650,8,126,10,126,12,126,2653,9,126,1,126,1,126,
        1,126,3,126,2658,8,126,1,127,1,127,1,127,3,127,2663,8,127,1,128,
        1,128,4,128,2667,8,128,11,128,12,128,2668,1,129,1,129,1,129,4,129,
        2674,8,129,11,129,12,129,2675,1,130,1,130,1,130,1,130,5,130,2682,
        8,130,10,130,12,130,2685,9,130,1,130,3,130,2688,8,130,3,130,2690,
        8,130,1,130,1,130,1,131,1,131,1,131,1,132,1,132,1,132,1,132,1,132,
        1,132,1,132,1,132,1,132,3,132,2706,8,132,1,132,5,132,2709,8,132,
        10,132,12,132,2712,9,132,1,133,1,133,1,134,1,134,1,135,1,135,1,136,
        1,136,1,137,1,137,1,138,1,138,1,139,1,139,1,140,1,140,1,141,1,141,
        1,142,1,142,5,142,2734,8,142,10,142,12,142,2737,9,142,1,143,1,143,
        3,143,2741,8,143,1,143,5,143,2744,8,143,10,143,12,143,2747,9,143,
        1,144,1,144,5,144,2751,8,144,10,144,12,144,2754,9,144,1,144,1,144,
        5,144,2758,8,144,10,144,12,144,2761,9,144,1,144,1,144,1,144,1,144,
        5,144,2767,8,144,10,144,12,144,2770,9,144,1,144,1,144,5,144,2774,
        8,144,10,144,12,144,2777,9,144,1,144,5,144,2780,8,144,10,144,12,
        144,2783,9,144,1,144,5,144,2786,8,144,10,144,12,144,2789,9,144,1,
        144,3,144,2792,8,144,1,144,5,144,2795,8,144,10,144,12,144,2798,9,
        144,1,144,3,144,2801,8,144,3,144,2803,8,144,1,145,1,145,1,145,1,
        145,4,145,2809,8,145,11,145,12,145,2810,1,145,1,145,1,145,1,145,
        1,145,4,145,2818,8,145,11,145,12,145,2819,1,145,1,145,3,145,2824,
        8,145,1,146,1,146,1,147,1,147,3,147,2830,8,147,1,147,3,147,2833,
        8,147,1,148,1,148,5,148,2837,8,148,10,148,12,148,2840,9,148,1,148,
        1,148,5,148,2844,8,148,10,148,12,148,2847,9,148,1,149,1,149,1,150,
        4,150,2852,8,150,11,150,12,150,2853,1,150,5,150,2857,8,150,10,150,
        12,150,2860,9,150,1,150,1,150,5,150,2864,8,150,10,150,12,150,2867,
        9,150,3,150,2869,8,150,1,151,1,151,1,151,0,0,152,0,2,4,6,8,10,12,
        14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,
        58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,
        102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,
        134,136,138,140,142,144,146,148,150,152,154,156,158,160,162,164,
        166,168,170,172,174,176,178,180,182,184,186,188,190,192,194,196,
        198,200,202,204,206,208,210,212,214,216,218,220,222,224,226,228,
        230,232,234,236,238,240,242,244,246,248,250,252,254,256,258,260,
        262,264,266,268,270,272,274,276,278,280,282,284,286,288,290,292,
        294,296,298,300,302,0,25,1,0,59,60,1,0,64,65,2,0,27,27,68,68,1,0,
        158,160,1,0,164,166,2,0,53,53,85,85,1,0,36,37,1,0,27,32,2,0,47,48,
        50,51,1,0,43,46,2,0,90,90,92,92,2,0,89,89,91,91,1,0,18,19,1,0,15,
        17,3,0,25,25,49,49,88,88,1,0,110,114,2,0,121,121,126,126,1,0,106,
        109,2,0,90,90,93,93,1,0,115,120,1,0,122,124,1,0,127,129,4,0,56,56,
        94,94,96,98,101,104,10,0,58,58,61,61,67,70,74,74,79,80,93,93,95,
        95,99,100,105,130,142,142,2,0,5,5,26,26,3228,0,307,1,0,0,0,2,338,
        1,0,0,0,4,367,1,0,0,0,6,373,1,0,0,0,8,393,1,0,0,0,10,405,1,0,0,0,
        12,410,1,0,0,0,14,413,1,0,0,0,16,423,1,0,0,0,18,431,1,0,0,0,20,434,
        1,0,0,0,22,504,1,0,0,0,24,517,1,0,0,0,26,534,1,0,0,0,28,575,1,0,
        0,0,30,607,1,0,0,0,32,609,1,0,0,0,34,616,1,0,0,0,36,634,1,0,0,0,
        38,636,1,0,0,0,40,665,1,0,0,0,42,672,1,0,0,0,44,682,1,0,0,0,46,733,
        1,0,0,0,48,735,1,0,0,0,50,781,1,0,0,0,52,791,1,0,0,0,54,823,1,0,
        0,0,56,902,1,0,0,0,58,919,1,0,0,0,60,926,1,0,0,0,62,931,1,0,0,0,
        64,947,1,0,0,0,66,950,1,0,0,0,68,995,1,0,0,0,70,1043,1,0,0,0,72,
        1142,1,0,0,0,74,1154,1,0,0,0,76,1165,1,0,0,0,78,1219,1,0,0,0,80,
        1256,1,0,0,0,82,1259,1,0,0,0,84,1293,1,0,0,0,86,1338,1,0,0,0,88,
        1367,1,0,0,0,90,1383,1,0,0,0,92,1387,1,0,0,0,94,1393,1,0,0,0,96,
        1412,1,0,0,0,98,1428,1,0,0,0,100,1449,1,0,0,0,102,1451,1,0,0,0,104,
        1471,1,0,0,0,106,1481,1,0,0,0,108,1531,1,0,0,0,110,1561,1,0,0,0,
        112,1580,1,0,0,0,114,1587,1,0,0,0,116,1608,1,0,0,0,118,1613,1,0,
        0,0,120,1627,1,0,0,0,122,1636,1,0,0,0,124,1645,1,0,0,0,126,1665,
        1,0,0,0,128,1685,1,0,0,0,130,1700,1,0,0,0,132,1712,1,0,0,0,134,1737,
        1,0,0,0,136,1757,1,0,0,0,138,1772,1,0,0,0,140,1786,1,0,0,0,142,1801,
        1,0,0,0,144,1816,1,0,0,0,146,1834,1,0,0,0,148,1841,1,0,0,0,150,1863,
        1,0,0,0,152,1865,1,0,0,0,154,1891,1,0,0,0,156,1896,1,0,0,0,158,1910,
        1,0,0,0,160,1923,1,0,0,0,162,1945,1,0,0,0,164,1990,1,0,0,0,166,1993,
        1,0,0,0,168,2011,1,0,0,0,170,2033,1,0,0,0,172,2037,1,0,0,0,174,2039,
        1,0,0,0,176,2049,1,0,0,0,178,2061,1,0,0,0,180,2063,1,0,0,0,182,2067,
        1,0,0,0,184,2069,1,0,0,0,186,2076,1,0,0,0,188,2128,1,0,0,0,190,2167,
        1,0,0,0,192,2169,1,0,0,0,194,2195,1,0,0,0,196,2208,1,0,0,0,198,2212,
        1,0,0,0,200,2236,1,0,0,0,202,2238,1,0,0,0,204,2280,1,0,0,0,206,2282,
        1,0,0,0,208,2380,1,0,0,0,210,2385,1,0,0,0,212,2387,1,0,0,0,214,2396,
        1,0,0,0,216,2405,1,0,0,0,218,2434,1,0,0,0,220,2460,1,0,0,0,222,2472,
        1,0,0,0,224,2474,1,0,0,0,226,2504,1,0,0,0,228,2523,1,0,0,0,230,2566,
        1,0,0,0,232,2615,1,0,0,0,234,2617,1,0,0,0,236,2619,1,0,0,0,238,2621,
        1,0,0,0,240,2623,1,0,0,0,242,2625,1,0,0,0,244,2627,1,0,0,0,246,2629,
        1,0,0,0,248,2631,1,0,0,0,250,2640,1,0,0,0,252,2657,1,0,0,0,254,2662,
        1,0,0,0,256,2666,1,0,0,0,258,2673,1,0,0,0,260,2677,1,0,0,0,262,2693,
        1,0,0,0,264,2705,1,0,0,0,266,2713,1,0,0,0,268,2715,1,0,0,0,270,2717,
        1,0,0,0,272,2719,1,0,0,0,274,2721,1,0,0,0,276,2723,1,0,0,0,278,2725,
        1,0,0,0,280,2727,1,0,0,0,282,2729,1,0,0,0,284,2731,1,0,0,0,286,2740,
        1,0,0,0,288,2802,1,0,0,0,290,2823,1,0,0,0,292,2825,1,0,0,0,294,2827,
        1,0,0,0,296,2834,1,0,0,0,298,2848,1,0,0,0,300,2868,1,0,0,0,302,2870,
        1,0,0,0,304,306,5,5,0,0,305,304,1,0,0,0,306,309,1,0,0,0,307,305,
        1,0,0,0,307,308,1,0,0,0,308,310,1,0,0,0,309,307,1,0,0,0,310,314,
        3,4,2,0,311,313,3,302,151,0,312,311,1,0,0,0,313,316,1,0,0,0,314,
        312,1,0,0,0,314,315,1,0,0,0,315,331,1,0,0,0,316,314,1,0,0,0,317,
        328,3,18,9,0,318,320,3,302,151,0,319,318,1,0,0,0,320,321,1,0,0,0,
        321,319,1,0,0,0,321,322,1,0,0,0,322,324,1,0,0,0,323,325,3,18,9,0,
        324,323,1,0,0,0,324,325,1,0,0,0,325,327,1,0,0,0,326,319,1,0,0,0,
        327,330,1,0,0,0,328,326,1,0,0,0,328,329,1,0,0,0,329,332,1,0,0,0,
        330,328,1,0,0,0,331,317,1,0,0,0,331,332,1,0,0,0,332,333,1,0,0,0,
        333,334,5,0,0,1,334,1,1,0,0,0,335,337,5,5,0,0,336,335,1,0,0,0,337,
        340,1,0,0,0,338,336,1,0,0,0,338,339,1,0,0,0,339,341,1,0,0,0,340,
        338,1,0,0,0,341,345,3,4,2,0,342,344,3,302,151,0,343,342,1,0,0,0,
        344,347,1,0,0,0,345,343,1,0,0,0,345,346,1,0,0,0,346,362,1,0,0,0,
        347,345,1,0,0,0,348,359,3,122,61,0,349,351,3,302,151,0,350,349,1,
        0,0,0,351,352,1,0,0,0,352,350,1,0,0,0,352,353,1,0,0,0,353,355,1,
        0,0,0,354,356,3,122,61,0,355,354,1,0,0,0,355,356,1,0,0,0,356,358,
        1,0,0,0,357,350,1,0,0,0,358,361,1,0,0,0,359,357,1,0,0,0,359,360,
        1,0,0,0,360,363,1,0,0,0,361,359,1,0,0,0,362,348,1,0,0,0,362,363,
        1,0,0,0,363,364,1,0,0,0,364,365,5,0,0,1,365,3,1,0,0,0,366,368,3,
        6,3,0,367,366,1,0,0,0,367,368,1,0,0,0,368,369,1,0,0,0,369,370,3,
        10,5,0,370,371,3,12,6,0,371,5,1,0,0,0,372,374,3,8,4,0,373,372,1,
        0,0,0,374,375,1,0,0,0,375,373,1,0,0,0,375,376,1,0,0,0,376,7,1,0,
        0,0,377,378,5,56,0,0,378,388,5,25,0,0,379,381,5,11,0,0,380,382,3,
        294,147,0,381,380,1,0,0,0,382,383,1,0,0,0,383,381,1,0,0,0,383,384,
        1,0,0,0,384,385,1,0,0,0,385,386,5,12,0,0,386,389,1,0,0,0,387,389,
        3,294,147,0,388,379,1,0,0,0,388,387,1,0,0,0,389,391,1,0,0,0,390,
        392,3,300,150,0,391,390,1,0,0,0,391,392,1,0,0,0,392,394,1,0,0,0,
        393,377,1,0,0,0,394,395,1,0,0,0,395,393,1,0,0,0,395,396,1,0,0,0,
        396,9,1,0,0,0,397,399,3,256,128,0,398,397,1,0,0,0,398,399,1,0,0,
        0,399,400,1,0,0,0,400,401,5,57,0,0,401,403,3,296,148,0,402,404,3,
        300,150,0,403,402,1,0,0,0,403,404,1,0,0,0,404,406,1,0,0,0,405,398,
        1,0,0,0,405,406,1,0,0,0,406,11,1,0,0,0,407,409,3,14,7,0,408,407,
        1,0,0,0,409,412,1,0,0,0,410,408,1,0,0,0,410,411,1,0,0,0,411,13,1,
        0,0,0,412,410,1,0,0,0,413,414,5,58,0,0,414,418,3,296,148,0,415,416,
        5,7,0,0,416,419,5,15,0,0,417,419,3,16,8,0,418,415,1,0,0,0,418,417,
        1,0,0,0,418,419,1,0,0,0,419,421,1,0,0,0,420,422,3,300,150,0,421,
        420,1,0,0,0,421,422,1,0,0,0,422,15,1,0,0,0,423,424,5,88,0,0,424,
        425,3,298,149,0,425,17,1,0,0,0,426,432,3,20,10,0,427,432,3,66,33,
        0,428,432,3,54,27,0,429,432,3,70,35,0,430,432,3,82,41,0,431,426,
        1,0,0,0,431,427,1,0,0,0,431,428,1,0,0,0,431,429,1,0,0,0,431,430,
        1,0,0,0,432,19,1,0,0,0,433,435,3,256,128,0,434,433,1,0,0,0,434,435,
        1,0,0,0,435,436,1,0,0,0,436,440,7,0,0,0,437,439,5,5,0,0,438,437,
        1,0,0,0,439,442,1,0,0,0,440,438,1,0,0,0,440,441,1,0,0,0,441,443,
        1,0,0,0,442,440,1,0,0,0,443,451,3,298,149,0,444,446,5,5,0,0,445,
        444,1,0,0,0,446,449,1,0,0,0,447,445,1,0,0,0,447,448,1,0,0,0,448,
        450,1,0,0,0,449,447,1,0,0,0,450,452,3,84,42,0,451,447,1,0,0,0,451,
        452,1,0,0,0,452,460,1,0,0,0,453,455,5,5,0,0,454,453,1,0,0,0,455,
        458,1,0,0,0,456,454,1,0,0,0,456,457,1,0,0,0,457,459,1,0,0,0,458,
        456,1,0,0,0,459,461,3,22,11,0,460,456,1,0,0,0,460,461,1,0,0,0,461,
        476,1,0,0,0,462,464,5,5,0,0,463,462,1,0,0,0,464,467,1,0,0,0,465,
        463,1,0,0,0,465,466,1,0,0,0,466,468,1,0,0,0,467,465,1,0,0,0,468,
        472,5,25,0,0,469,471,5,5,0,0,470,469,1,0,0,0,471,474,1,0,0,0,472,
        470,1,0,0,0,472,473,1,0,0,0,473,475,1,0,0,0,474,472,1,0,0,0,475,
        477,3,28,14,0,476,465,1,0,0,0,476,477,1,0,0,0,477,485,1,0,0,0,478,
        480,5,5,0,0,479,478,1,0,0,0,480,483,1,0,0,0,481,479,1,0,0,0,481,
        482,1,0,0,0,482,484,1,0,0,0,483,481,1,0,0,0,484,486,3,108,54,0,485,
        481,1,0,0,0,485,486,1,0,0,0,486,501,1,0,0,0,487,489,5,5,0,0,488,
        487,1,0,0,0,489,492,1,0,0,0,490,488,1,0,0,0,490,491,1,0,0,0,491,
        493,1,0,0,0,492,490,1,0,0,0,493,502,3,38,19,0,494,496,5,5,0,0,495,
        494,1,0,0,0,496,499,1,0,0,0,497,495,1,0,0,0,497,498,1,0,0,0,498,
        500,1,0,0,0,499,497,1,0,0,0,500,502,3,48,24,0,501,490,1,0,0,0,501,
        497,1,0,0,0,501,502,1,0,0,0,502,21,1,0,0,0,503,505,3,256,128,0,504,
        503,1,0,0,0,504,505,1,0,0,0,505,513,1,0,0,0,506,510,5,67,0,0,507,
        509,5,5,0,0,508,507,1,0,0,0,509,512,1,0,0,0,510,508,1,0,0,0,510,
        511,1,0,0,0,511,514,1,0,0,0,512,510,1,0,0,0,513,506,1,0,0,0,513,
        514,1,0,0,0,514,515,1,0,0,0,515,516,3,24,12,0,516,23,1,0,0,0,517,
        529,5,9,0,0,518,523,3,26,13,0,519,520,5,8,0,0,520,522,3,26,13,0,
        521,519,1,0,0,0,522,525,1,0,0,0,523,521,1,0,0,0,523,524,1,0,0,0,
        524,527,1,0,0,0,525,523,1,0,0,0,526,528,5,8,0,0,527,526,1,0,0,0,
        527,528,1,0,0,0,528,530,1,0,0,0,529,518,1,0,0,0,529,530,1,0,0,0,
        530,531,1,0,0,0,531,532,5,10,0,0,532,25,1,0,0,0,533,535,3,256,128,
        0,534,533,1,0,0,0,534,535,1,0,0,0,535,537,1,0,0,0,536,538,7,1,0,
        0,537,536,1,0,0,0,537,538,1,0,0,0,538,539,1,0,0,0,539,540,3,298,
        149,0,540,541,5,25,0,0,541,570,3,88,44,0,542,544,5,5,0,0,543,542,
        1,0,0,0,544,547,1,0,0,0,545,543,1,0,0,0,545,546,1,0,0,0,546,548,
        1,0,0,0,547,545,1,0,0,0,548,552,5,27,0,0,549,551,5,5,0,0,550,549,
        1,0,0,0,551,554,1,0,0,0,552,550,1,0,0,0,552,553,1,0,0,0,553,555,
        1,0,0,0,554,552,1,0,0,0,555,571,3,122,61,0,556,558,5,5,0,0,557,556,
        1,0,0,0,558,561,1,0,0,0,559,557,1,0,0,0,559,560,1,0,0,0,560,562,
        1,0,0,0,561,559,1,0,0,0,562,566,5,68,0,0,563,565,5,5,0,0,564,563,
        1,0,0,0,565,568,1,0,0,0,566,564,1,0,0,0,566,567,1,0,0,0,567,569,
        1,0,0,0,568,566,1,0,0,0,569,571,3,122,61,0,570,545,1,0,0,0,570,559,
        1,0,0,0,570,571,1,0,0,0,571,27,1,0,0,0,572,574,3,286,143,0,573,572,
        1,0,0,0,574,577,1,0,0,0,575,573,1,0,0,0,575,576,1,0,0,0,576,578,
        1,0,0,0,577,575,1,0,0,0,578,601,3,30,15,0,579,581,5,5,0,0,580,579,
        1,0,0,0,581,584,1,0,0,0,582,580,1,0,0,0,582,583,1,0,0,0,583,585,
        1,0,0,0,584,582,1,0,0,0,585,589,5,8,0,0,586,588,5,5,0,0,587,586,
        1,0,0,0,588,591,1,0,0,0,589,587,1,0,0,0,589,590,1,0,0,0,590,595,
        1,0,0,0,591,589,1,0,0,0,592,594,3,286,143,0,593,592,1,0,0,0,594,
        597,1,0,0,0,595,593,1,0,0,0,595,596,1,0,0,0,596,598,1,0,0,0,597,
        595,1,0,0,0,598,600,3,30,15,0,599,582,1,0,0,0,600,603,1,0,0,0,601,
        599,1,0,0,0,601,602,1,0,0,0,602,29,1,0,0,0,603,601,1,0,0,0,604,608,
        3,32,16,0,605,608,3,102,51,0,606,608,3,34,17,0,607,604,1,0,0,0,607,
        605,1,0,0,0,607,606,1,0,0,0,608,31,1,0,0,0,609,611,3,102,51,0,610,
        612,3,162,81,0,611,610,1,0,0,0,611,612,1,0,0,0,612,614,1,0,0,0,613,
        615,3,160,80,0,614,613,1,0,0,0,614,615,1,0,0,0,615,33,1,0,0,0,616,
        620,3,102,51,0,617,619,5,5,0,0,618,617,1,0,0,0,619,622,1,0,0,0,620,
        618,1,0,0,0,620,621,1,0,0,0,621,623,1,0,0,0,622,620,1,0,0,0,623,
        627,5,68,0,0,624,626,5,5,0,0,625,624,1,0,0,0,626,629,1,0,0,0,627,
        625,1,0,0,0,627,628,1,0,0,0,628,630,1,0,0,0,629,627,1,0,0,0,630,
        631,3,36,18,0,631,35,1,0,0,0,632,635,3,102,51,0,633,635,3,32,16,
        0,634,632,1,0,0,0,634,633,1,0,0,0,635,37,1,0,0,0,636,640,5,13,0,
        0,637,639,5,5,0,0,638,637,1,0,0,0,639,642,1,0,0,0,640,638,1,0,0,
        0,640,641,1,0,0,0,641,646,1,0,0,0,642,640,1,0,0,0,643,645,3,40,20,
        0,644,643,1,0,0,0,645,648,1,0,0,0,646,644,1,0,0,0,646,647,1,0,0,
        0,647,652,1,0,0,0,648,646,1,0,0,0,649,651,5,5,0,0,650,649,1,0,0,
        0,651,654,1,0,0,0,652,650,1,0,0,0,652,653,1,0,0,0,653,655,1,0,0,
        0,654,652,1,0,0,0,655,656,5,14,0,0,656,39,1,0,0,0,657,666,3,20,10,
        0,658,666,3,54,27,0,659,666,3,66,33,0,660,666,3,68,34,0,661,666,
        3,70,35,0,662,666,3,42,21,0,663,666,3,44,22,0,664,666,3,82,41,0,
        665,657,1,0,0,0,665,658,1,0,0,0,665,659,1,0,0,0,665,660,1,0,0,0,
        665,661,1,0,0,0,665,662,1,0,0,0,665,663,1,0,0,0,665,664,1,0,0,0,
        666,668,1,0,0,0,667,669,3,302,151,0,668,667,1,0,0,0,669,670,1,0,
        0,0,670,668,1,0,0,0,670,671,1,0,0,0,671,41,1,0,0,0,672,676,5,70,
        0,0,673,675,5,5,0,0,674,673,1,0,0,0,675,678,1,0,0,0,676,674,1,0,
        0,0,676,677,1,0,0,0,677,679,1,0,0,0,678,676,1,0,0,0,679,680,3,112,
        56,0,680,43,1,0,0,0,681,683,3,256,128,0,682,681,1,0,0,0,682,683,
        1,0,0,0,683,684,1,0,0,0,684,688,5,67,0,0,685,687,5,5,0,0,686,685,
        1,0,0,0,687,690,1,0,0,0,688,686,1,0,0,0,688,689,1,0,0,0,689,691,
        1,0,0,0,690,688,1,0,0,0,691,706,3,56,28,0,692,694,5,5,0,0,693,692,
        1,0,0,0,694,697,1,0,0,0,695,693,1,0,0,0,695,696,1,0,0,0,696,698,
        1,0,0,0,697,695,1,0,0,0,698,702,5,25,0,0,699,701,5,5,0,0,700,699,
        1,0,0,0,701,704,1,0,0,0,702,700,1,0,0,0,702,703,1,0,0,0,703,705,
        1,0,0,0,704,702,1,0,0,0,705,707,3,46,23,0,706,695,1,0,0,0,706,707,
        1,0,0,0,707,711,1,0,0,0,708,710,5,5,0,0,709,708,1,0,0,0,710,713,
        1,0,0,0,711,709,1,0,0,0,711,712,1,0,0,0,712,715,1,0,0,0,713,711,
        1,0,0,0,714,716,3,112,56,0,715,714,1,0,0,0,715,716,1,0,0,0,716,45,
        1,0,0,0,717,721,5,71,0,0,718,720,5,5,0,0,719,718,1,0,0,0,720,723,
        1,0,0,0,721,719,1,0,0,0,721,722,1,0,0,0,722,724,1,0,0,0,723,721,
        1,0,0,0,724,734,3,160,80,0,725,729,5,72,0,0,726,728,5,5,0,0,727,
        726,1,0,0,0,728,731,1,0,0,0,729,727,1,0,0,0,729,730,1,0,0,0,730,
        732,1,0,0,0,731,729,1,0,0,0,732,734,3,160,80,0,733,717,1,0,0,0,733,
        725,1,0,0,0,734,47,1,0,0,0,735,739,5,13,0,0,736,738,5,5,0,0,737,
        736,1,0,0,0,738,741,1,0,0,0,739,737,1,0,0,0,739,740,1,0,0,0,740,
        743,1,0,0,0,741,739,1,0,0,0,742,744,3,50,25,0,743,742,1,0,0,0,743,
        744,1,0,0,0,744,764,1,0,0,0,745,747,5,5,0,0,746,745,1,0,0,0,747,
        750,1,0,0,0,748,746,1,0,0,0,748,749,1,0,0,0,749,751,1,0,0,0,750,
        748,1,0,0,0,751,755,5,26,0,0,752,754,5,5,0,0,753,752,1,0,0,0,754,
        757,1,0,0,0,755,753,1,0,0,0,755,756,1,0,0,0,756,761,1,0,0,0,757,
        755,1,0,0,0,758,760,3,40,20,0,759,758,1,0,0,0,760,763,1,0,0,0,761,
        759,1,0,0,0,761,762,1,0,0,0,762,765,1,0,0,0,763,761,1,0,0,0,764,
        748,1,0,0,0,764,765,1,0,0,0,765,769,1,0,0,0,766,768,5,5,0,0,767,
        766,1,0,0,0,768,771,1,0,0,0,769,767,1,0,0,0,769,770,1,0,0,0,770,
        772,1,0,0,0,771,769,1,0,0,0,772,773,5,14,0,0,773,49,1,0,0,0,774,
        778,3,52,26,0,775,777,5,5,0,0,776,775,1,0,0,0,777,780,1,0,0,0,778,
        776,1,0,0,0,778,779,1,0,0,0,779,782,1,0,0,0,780,778,1,0,0,0,781,
        774,1,0,0,0,782,783,1,0,0,0,783,781,1,0,0,0,783,784,1,0,0,0,784,
        786,1,0,0,0,785,787,5,26,0,0,786,785,1,0,0,0,786,787,1,0,0,0,787,
        51,1,0,0,0,788,790,3,286,143,0,789,788,1,0,0,0,790,793,1,0,0,0,791,
        789,1,0,0,0,791,792,1,0,0,0,792,794,1,0,0,0,793,791,1,0,0,0,794,
        802,3,298,149,0,795,797,5,5,0,0,796,795,1,0,0,0,797,800,1,0,0,0,
        798,796,1,0,0,0,798,799,1,0,0,0,799,801,1,0,0,0,800,798,1,0,0,0,
        801,803,3,160,80,0,802,798,1,0,0,0,802,803,1,0,0,0,803,811,1,0,0,
        0,804,806,5,5,0,0,805,804,1,0,0,0,806,809,1,0,0,0,807,805,1,0,0,
        0,807,808,1,0,0,0,808,810,1,0,0,0,809,807,1,0,0,0,810,812,3,38,19,
        0,811,807,1,0,0,0,811,812,1,0,0,0,812,820,1,0,0,0,813,815,5,5,0,
        0,814,813,1,0,0,0,815,818,1,0,0,0,816,814,1,0,0,0,816,817,1,0,0,
        0,817,819,1,0,0,0,818,816,1,0,0,0,819,821,5,8,0,0,820,816,1,0,0,
        0,820,821,1,0,0,0,821,53,1,0,0,0,822,824,3,258,129,0,823,822,1,0,
        0,0,823,824,1,0,0,0,824,825,1,0,0,0,825,833,5,62,0,0,826,828,5,5,
        0,0,827,826,1,0,0,0,828,831,1,0,0,0,829,827,1,0,0,0,829,830,1,0,
        0,0,830,832,1,0,0,0,831,829,1,0,0,0,832,834,3,84,42,0,833,829,1,
        0,0,0,833,834,1,0,0,0,834,850,1,0,0,0,835,837,5,5,0,0,836,835,1,
        0,0,0,837,840,1,0,0,0,838,836,1,0,0,0,838,839,1,0,0,0,839,841,1,
        0,0,0,840,838,1,0,0,0,841,845,3,62,31,0,842,844,5,5,0,0,843,842,
        1,0,0,0,844,847,1,0,0,0,845,843,1,0,0,0,845,846,1,0,0,0,846,848,
        1,0,0,0,847,845,1,0,0,0,848,849,5,7,0,0,849,851,1,0,0,0,850,838,
        1,0,0,0,850,851,1,0,0,0,851,859,1,0,0,0,852,854,5,5,0,0,853,852,
        1,0,0,0,854,857,1,0,0,0,855,853,1,0,0,0,855,856,1,0,0,0,856,858,
        1,0,0,0,857,855,1,0,0,0,858,860,3,296,148,0,859,855,1,0,0,0,859,
        860,1,0,0,0,860,864,1,0,0,0,861,863,5,5,0,0,862,861,1,0,0,0,863,
        866,1,0,0,0,864,862,1,0,0,0,864,865,1,0,0,0,865,867,1,0,0,0,866,
        864,1,0,0,0,867,882,3,56,28,0,868,870,5,5,0,0,869,868,1,0,0,0,870,
        873,1,0,0,0,871,869,1,0,0,0,871,872,1,0,0,0,872,874,1,0,0,0,873,
        871,1,0,0,0,874,878,5,25,0,0,875,877,5,5,0,0,876,875,1,0,0,0,877,
        880,1,0,0,0,878,876,1,0,0,0,878,879,1,0,0,0,879,881,1,0,0,0,880,
        878,1,0,0,0,881,883,3,88,44,0,882,871,1,0,0,0,882,883,1,0,0,0,883,
        891,1,0,0,0,884,886,5,5,0,0,885,884,1,0,0,0,886,889,1,0,0,0,887,
        885,1,0,0,0,887,888,1,0,0,0,888,890,1,0,0,0,889,887,1,0,0,0,890,
        892,3,108,54,0,891,887,1,0,0,0,891,892,1,0,0,0,892,900,1,0,0,0,893,
        895,5,5,0,0,894,893,1,0,0,0,895,898,1,0,0,0,896,894,1,0,0,0,896,
        897,1,0,0,0,897,899,1,0,0,0,898,896,1,0,0,0,899,901,3,64,32,0,900,
        896,1,0,0,0,900,901,1,0,0,0,901,55,1,0,0,0,902,914,5,9,0,0,903,908,
        3,58,29,0,904,905,5,8,0,0,905,907,3,58,29,0,906,904,1,0,0,0,907,
        910,1,0,0,0,908,906,1,0,0,0,908,909,1,0,0,0,909,912,1,0,0,0,910,
        908,1,0,0,0,911,913,5,8,0,0,912,911,1,0,0,0,912,913,1,0,0,0,913,
        915,1,0,0,0,914,903,1,0,0,0,914,915,1,0,0,0,915,916,1,0,0,0,916,
        917,5,10,0,0,917,57,1,0,0,0,918,920,3,256,128,0,919,918,1,0,0,0,
        919,920,1,0,0,0,920,921,1,0,0,0,921,924,3,60,30,0,922,923,5,27,0,
        0,923,925,3,122,61,0,924,922,1,0,0,0,924,925,1,0,0,0,925,59,1,0,
        0,0,926,927,3,298,149,0,927,928,5,25,0,0,928,929,3,88,44,0,929,61,
        1,0,0,0,930,932,3,90,45,0,931,930,1,0,0,0,931,932,1,0,0,0,932,936,
        1,0,0,0,933,937,3,92,46,0,934,937,3,94,47,0,935,937,3,96,48,0,936,
        933,1,0,0,0,936,934,1,0,0,0,936,935,1,0,0,0,937,63,1,0,0,0,938,948,
        3,112,56,0,939,943,5,27,0,0,940,942,5,5,0,0,941,940,1,0,0,0,942,
        945,1,0,0,0,943,941,1,0,0,0,943,944,1,0,0,0,944,946,1,0,0,0,945,
        943,1,0,0,0,946,948,3,122,61,0,947,938,1,0,0,0,947,939,1,0,0,0,948,
        65,1,0,0,0,949,951,3,256,128,0,950,949,1,0,0,0,950,951,1,0,0,0,951,
        952,1,0,0,0,952,956,5,63,0,0,953,955,5,5,0,0,954,953,1,0,0,0,955,
        958,1,0,0,0,956,954,1,0,0,0,956,957,1,0,0,0,957,959,1,0,0,0,958,
        956,1,0,0,0,959,967,3,298,149,0,960,962,5,5,0,0,961,960,1,0,0,0,
        962,965,1,0,0,0,963,961,1,0,0,0,963,964,1,0,0,0,964,966,1,0,0,0,
        965,963,1,0,0,0,966,968,3,22,11,0,967,963,1,0,0,0,967,968,1,0,0,
        0,968,983,1,0,0,0,969,971,5,5,0,0,970,969,1,0,0,0,971,974,1,0,0,
        0,972,970,1,0,0,0,972,973,1,0,0,0,973,975,1,0,0,0,974,972,1,0,0,
        0,975,979,5,25,0,0,976,978,5,5,0,0,977,976,1,0,0,0,978,981,1,0,0,
        0,979,977,1,0,0,0,979,980,1,0,0,0,980,982,1,0,0,0,981,979,1,0,0,
        0,982,984,3,28,14,0,983,972,1,0,0,0,983,984,1,0,0,0,984,992,1,0,
        0,0,985,987,5,5,0,0,986,985,1,0,0,0,987,990,1,0,0,0,988,986,1,0,
        0,0,988,989,1,0,0,0,989,991,1,0,0,0,990,988,1,0,0,0,991,993,3,38,
        19,0,992,988,1,0,0,0,992,993,1,0,0,0,993,67,1,0,0,0,994,996,3,256,
        128,0,995,994,1,0,0,0,995,996,1,0,0,0,996,997,1,0,0,0,997,1001,5,
        69,0,0,998,1000,5,5,0,0,999,998,1,0,0,0,1000,1003,1,0,0,0,1001,999,
        1,0,0,0,1001,1002,1,0,0,0,1002,1005,1,0,0,0,1003,1001,1,0,0,0,1004,
        1006,3,256,128,0,1005,1004,1,0,0,0,1005,1006,1,0,0,0,1006,1007,1,
        0,0,0,1007,1015,5,63,0,0,1008,1010,5,5,0,0,1009,1008,1,0,0,0,1010,
        1013,1,0,0,0,1011,1009,1,0,0,0,1011,1012,1,0,0,0,1012,1014,1,0,0,
        0,1013,1011,1,0,0,0,1014,1016,3,298,149,0,1015,1011,1,0,0,0,1015,
        1016,1,0,0,0,1016,1031,1,0,0,0,1017,1019,5,5,0,0,1018,1017,1,0,0,
        0,1019,1022,1,0,0,0,1020,1018,1,0,0,0,1020,1021,1,0,0,0,1021,1023,
        1,0,0,0,1022,1020,1,0,0,0,1023,1027,5,25,0,0,1024,1026,5,5,0,0,1025,
        1024,1,0,0,0,1026,1029,1,0,0,0,1027,1025,1,0,0,0,1027,1028,1,0,0,
        0,1028,1030,1,0,0,0,1029,1027,1,0,0,0,1030,1032,3,28,14,0,1031,1020,
        1,0,0,0,1031,1032,1,0,0,0,1032,1040,1,0,0,0,1033,1035,5,5,0,0,1034,
        1033,1,0,0,0,1035,1038,1,0,0,0,1036,1034,1,0,0,0,1036,1037,1,0,0,
        0,1037,1039,1,0,0,0,1038,1036,1,0,0,0,1039,1041,3,38,19,0,1040,1036,
        1,0,0,0,1040,1041,1,0,0,0,1041,69,1,0,0,0,1042,1044,3,256,128,0,
        1043,1042,1,0,0,0,1043,1044,1,0,0,0,1044,1045,1,0,0,0,1045,1053,
        7,1,0,0,1046,1048,5,5,0,0,1047,1046,1,0,0,0,1048,1051,1,0,0,0,1049,
        1047,1,0,0,0,1049,1050,1,0,0,0,1050,1052,1,0,0,0,1051,1049,1,0,0,
        0,1052,1054,3,84,42,0,1053,1049,1,0,0,0,1053,1054,1,0,0,0,1054,1070,
        1,0,0,0,1055,1057,5,5,0,0,1056,1055,1,0,0,0,1057,1060,1,0,0,0,1058,
        1056,1,0,0,0,1058,1059,1,0,0,0,1059,1061,1,0,0,0,1060,1058,1,0,0,
        0,1061,1065,3,88,44,0,1062,1064,5,5,0,0,1063,1062,1,0,0,0,1064,1067,
        1,0,0,0,1065,1063,1,0,0,0,1065,1066,1,0,0,0,1066,1068,1,0,0,0,1067,
        1065,1,0,0,0,1068,1069,5,7,0,0,1069,1071,1,0,0,0,1070,1058,1,0,0,
        0,1070,1071,1,0,0,0,1071,1075,1,0,0,0,1072,1074,5,5,0,0,1073,1072,
        1,0,0,0,1074,1077,1,0,0,0,1075,1073,1,0,0,0,1075,1076,1,0,0,0,1076,
        1080,1,0,0,0,1077,1075,1,0,0,0,1078,1081,3,74,37,0,1079,1081,3,76,
        38,0,1080,1078,1,0,0,0,1080,1079,1,0,0,0,1081,1089,1,0,0,0,1082,
        1084,5,5,0,0,1083,1082,1,0,0,0,1084,1087,1,0,0,0,1085,1083,1,0,0,
        0,1085,1086,1,0,0,0,1086,1088,1,0,0,0,1087,1085,1,0,0,0,1088,1090,
        3,108,54,0,1089,1085,1,0,0,0,1089,1090,1,0,0,0,1090,1105,1,0,0,0,
        1091,1093,5,5,0,0,1092,1091,1,0,0,0,1093,1096,1,0,0,0,1094,1092,
        1,0,0,0,1094,1095,1,0,0,0,1095,1097,1,0,0,0,1096,1094,1,0,0,0,1097,
        1101,7,2,0,0,1098,1100,5,5,0,0,1099,1098,1,0,0,0,1100,1103,1,0,0,
        0,1101,1099,1,0,0,0,1101,1102,1,0,0,0,1102,1104,1,0,0,0,1103,1101,
        1,0,0,0,1104,1106,3,122,61,0,1105,1094,1,0,0,0,1105,1106,1,0,0,0,
        1106,1140,1,0,0,0,1107,1109,5,5,0,0,1108,1107,1,0,0,0,1109,1112,
        1,0,0,0,1110,1108,1,0,0,0,1110,1111,1,0,0,0,1111,1113,1,0,0,0,1112,
        1110,1,0,0,0,1113,1117,3,78,39,0,1114,1115,3,300,150,0,1115,1116,
        3,80,40,0,1116,1118,1,0,0,0,1117,1114,1,0,0,0,1117,1118,1,0,0,0,
        1118,1132,1,0,0,0,1119,1121,5,5,0,0,1120,1119,1,0,0,0,1121,1124,
        1,0,0,0,1122,1120,1,0,0,0,1122,1123,1,0,0,0,1123,1125,1,0,0,0,1124,
        1122,1,0,0,0,1125,1129,3,80,40,0,1126,1127,3,300,150,0,1127,1128,
        3,78,39,0,1128,1130,1,0,0,0,1129,1126,1,0,0,0,1129,1130,1,0,0,0,
        1130,1132,1,0,0,0,1131,1110,1,0,0,0,1131,1122,1,0,0,0,1132,1141,
        1,0,0,0,1133,1135,5,5,0,0,1134,1133,1,0,0,0,1135,1138,1,0,0,0,1136,
        1134,1,0,0,0,1136,1137,1,0,0,0,1137,1139,1,0,0,0,1138,1136,1,0,0,
        0,1139,1141,3,72,36,0,1140,1131,1,0,0,0,1140,1136,1,0,0,0,1140,1141,
        1,0,0,0,1141,71,1,0,0,0,1142,1143,5,95,0,0,1143,1144,5,25,0,0,1144,
        1145,3,88,44,0,1145,1149,5,27,0,0,1146,1148,5,5,0,0,1147,1146,1,
        0,0,0,1148,1151,1,0,0,0,1149,1147,1,0,0,0,1149,1150,1,0,0,0,1150,
        1152,1,0,0,0,1151,1149,1,0,0,0,1152,1153,3,122,61,0,1153,73,1,0,
        0,0,1154,1155,5,9,0,0,1155,1160,3,76,38,0,1156,1157,5,8,0,0,1157,
        1159,3,76,38,0,1158,1156,1,0,0,0,1159,1162,1,0,0,0,1160,1158,1,0,
        0,0,1160,1161,1,0,0,0,1161,1163,1,0,0,0,1162,1160,1,0,0,0,1163,1164,
        5,10,0,0,1164,75,1,0,0,0,1165,1168,3,298,149,0,1166,1167,5,25,0,
        0,1167,1169,3,88,44,0,1168,1166,1,0,0,0,1168,1169,1,0,0,0,1169,77,
        1,0,0,0,1170,1172,3,256,128,0,1171,1170,1,0,0,0,1171,1172,1,0,0,
        0,1172,1173,1,0,0,0,1173,1220,5,99,0,0,1174,1176,3,256,128,0,1175,
        1174,1,0,0,0,1175,1176,1,0,0,0,1176,1177,1,0,0,0,1177,1181,5,99,
        0,0,1178,1180,5,5,0,0,1179,1178,1,0,0,0,1180,1183,1,0,0,0,1181,1179,
        1,0,0,0,1181,1182,1,0,0,0,1182,1184,1,0,0,0,1183,1181,1,0,0,0,1184,
        1185,5,9,0,0,1185,1200,5,10,0,0,1186,1188,5,5,0,0,1187,1186,1,0,
        0,0,1188,1191,1,0,0,0,1189,1187,1,0,0,0,1189,1190,1,0,0,0,1190,1192,
        1,0,0,0,1191,1189,1,0,0,0,1192,1196,5,25,0,0,1193,1195,5,5,0,0,1194,
        1193,1,0,0,0,1195,1198,1,0,0,0,1196,1194,1,0,0,0,1196,1197,1,0,0,
        0,1197,1199,1,0,0,0,1198,1196,1,0,0,0,1199,1201,3,88,44,0,1200,1189,
        1,0,0,0,1200,1201,1,0,0,0,1201,1205,1,0,0,0,1202,1204,5,5,0,0,1203,
        1202,1,0,0,0,1204,1207,1,0,0,0,1205,1203,1,0,0,0,1205,1206,1,0,0,
        0,1206,1217,1,0,0,0,1207,1205,1,0,0,0,1208,1218,3,112,56,0,1209,
        1213,5,27,0,0,1210,1212,5,5,0,0,1211,1210,1,0,0,0,1212,1215,1,0,
        0,0,1213,1211,1,0,0,0,1213,1214,1,0,0,0,1214,1216,1,0,0,0,1215,1213,
        1,0,0,0,1216,1218,3,122,61,0,1217,1208,1,0,0,0,1217,1209,1,0,0,0,
        1218,1220,1,0,0,0,1219,1171,1,0,0,0,1219,1175,1,0,0,0,1220,79,1,
        0,0,0,1221,1223,3,256,128,0,1222,1221,1,0,0,0,1222,1223,1,0,0,0,
        1223,1224,1,0,0,0,1224,1257,5,100,0,0,1225,1227,3,256,128,0,1226,
        1225,1,0,0,0,1226,1227,1,0,0,0,1227,1228,1,0,0,0,1228,1232,5,100,
        0,0,1229,1231,5,5,0,0,1230,1229,1,0,0,0,1231,1234,1,0,0,0,1232,1230,
        1,0,0,0,1232,1233,1,0,0,0,1233,1235,1,0,0,0,1234,1232,1,0,0,0,1235,
        1240,5,9,0,0,1236,1239,3,286,143,0,1237,1239,3,280,140,0,1238,1236,
        1,0,0,0,1238,1237,1,0,0,0,1239,1242,1,0,0,0,1240,1238,1,0,0,0,1240,
        1241,1,0,0,0,1241,1245,1,0,0,0,1242,1240,1,0,0,0,1243,1246,3,298,
        149,0,1244,1246,3,60,30,0,1245,1243,1,0,0,0,1245,1244,1,0,0,0,1246,
        1247,1,0,0,0,1247,1251,5,10,0,0,1248,1250,5,5,0,0,1249,1248,1,0,
        0,0,1250,1253,1,0,0,0,1251,1249,1,0,0,0,1251,1252,1,0,0,0,1252,1254,
        1,0,0,0,1253,1251,1,0,0,0,1254,1255,3,64,32,0,1255,1257,1,0,0,0,
        1256,1222,1,0,0,0,1256,1226,1,0,0,0,1257,81,1,0,0,0,1258,1260,3,
        256,128,0,1259,1258,1,0,0,0,1259,1260,1,0,0,0,1260,1261,1,0,0,0,
        1261,1265,5,66,0,0,1262,1264,5,5,0,0,1263,1262,1,0,0,0,1264,1267,
        1,0,0,0,1265,1263,1,0,0,0,1265,1266,1,0,0,0,1266,1268,1,0,0,0,1267,
        1265,1,0,0,0,1268,1276,3,298,149,0,1269,1271,5,5,0,0,1270,1269,1,
        0,0,0,1271,1274,1,0,0,0,1272,1270,1,0,0,0,1272,1273,1,0,0,0,1273,
        1275,1,0,0,0,1274,1272,1,0,0,0,1275,1277,3,84,42,0,1276,1272,1,0,
        0,0,1276,1277,1,0,0,0,1277,1281,1,0,0,0,1278,1280,5,5,0,0,1279,1278,
        1,0,0,0,1280,1283,1,0,0,0,1281,1279,1,0,0,0,1281,1282,1,0,0,0,1282,
        1284,1,0,0,0,1283,1281,1,0,0,0,1284,1288,5,27,0,0,1285,1287,5,5,
        0,0,1286,1285,1,0,0,0,1287,1290,1,0,0,0,1288,1286,1,0,0,0,1288,1289,
        1,0,0,0,1289,1291,1,0,0,0,1290,1288,1,0,0,0,1291,1292,3,88,44,0,
        1292,83,1,0,0,0,1293,1297,5,43,0,0,1294,1296,5,5,0,0,1295,1294,1,
        0,0,0,1296,1299,1,0,0,0,1297,1295,1,0,0,0,1297,1298,1,0,0,0,1298,
        1300,1,0,0,0,1299,1297,1,0,0,0,1300,1317,3,86,43,0,1301,1303,5,5,
        0,0,1302,1301,1,0,0,0,1303,1306,1,0,0,0,1304,1302,1,0,0,0,1304,1305,
        1,0,0,0,1305,1307,1,0,0,0,1306,1304,1,0,0,0,1307,1311,5,8,0,0,1308,
        1310,5,5,0,0,1309,1308,1,0,0,0,1310,1313,1,0,0,0,1311,1309,1,0,0,
        0,1311,1312,1,0,0,0,1312,1314,1,0,0,0,1313,1311,1,0,0,0,1314,1316,
        3,86,43,0,1315,1304,1,0,0,0,1316,1319,1,0,0,0,1317,1315,1,0,0,0,
        1317,1318,1,0,0,0,1318,1327,1,0,0,0,1319,1317,1,0,0,0,1320,1322,
        5,5,0,0,1321,1320,1,0,0,0,1322,1325,1,0,0,0,1323,1321,1,0,0,0,1323,
        1324,1,0,0,0,1324,1326,1,0,0,0,1325,1323,1,0,0,0,1326,1328,5,8,0,
        0,1327,1323,1,0,0,0,1327,1328,1,0,0,0,1328,1332,1,0,0,0,1329,1331,
        5,5,0,0,1330,1329,1,0,0,0,1331,1334,1,0,0,0,1332,1330,1,0,0,0,1332,
        1333,1,0,0,0,1333,1335,1,0,0,0,1334,1332,1,0,0,0,1335,1336,5,44,
        0,0,1336,85,1,0,0,0,1337,1339,3,256,128,0,1338,1337,1,0,0,0,1338,
        1339,1,0,0,0,1339,1343,1,0,0,0,1340,1342,5,5,0,0,1341,1340,1,0,0,
        0,1342,1345,1,0,0,0,1343,1341,1,0,0,0,1343,1344,1,0,0,0,1344,1348,
        1,0,0,0,1345,1343,1,0,0,0,1346,1349,3,298,149,0,1347,1349,5,15,0,
        0,1348,1346,1,0,0,0,1348,1347,1,0,0,0,1349,1364,1,0,0,0,1350,1352,
        5,5,0,0,1351,1350,1,0,0,0,1352,1355,1,0,0,0,1353,1351,1,0,0,0,1353,
        1354,1,0,0,0,1354,1356,1,0,0,0,1355,1353,1,0,0,0,1356,1360,5,25,
        0,0,1357,1359,5,5,0,0,1358,1357,1,0,0,0,1359,1362,1,0,0,0,1360,1358,
        1,0,0,0,1360,1361,1,0,0,0,1361,1363,1,0,0,0,1362,1360,1,0,0,0,1363,
        1365,3,88,44,0,1364,1353,1,0,0,0,1364,1365,1,0,0,0,1365,87,1,0,0,
        0,1366,1368,3,90,45,0,1367,1366,1,0,0,0,1367,1368,1,0,0,0,1368,1373,
        1,0,0,0,1369,1374,3,98,49,0,1370,1374,3,92,46,0,1371,1374,3,94,47,
        0,1372,1374,3,96,48,0,1373,1369,1,0,0,0,1373,1370,1,0,0,0,1373,1371,
        1,0,0,0,1373,1372,1,0,0,0,1374,89,1,0,0,0,1375,1384,3,286,143,0,
        1376,1380,5,120,0,0,1377,1379,5,5,0,0,1378,1377,1,0,0,0,1379,1382,
        1,0,0,0,1380,1378,1,0,0,0,1380,1381,1,0,0,0,1381,1384,1,0,0,0,1382,
        1380,1,0,0,0,1383,1375,1,0,0,0,1383,1376,1,0,0,0,1384,1385,1,0,0,
        0,1385,1383,1,0,0,0,1385,1386,1,0,0,0,1386,91,1,0,0,0,1387,1388,
        5,9,0,0,1388,1389,3,88,44,0,1389,1390,5,10,0,0,1390,93,1,0,0,0,1391,
        1394,3,96,48,0,1392,1394,3,92,46,0,1393,1391,1,0,0,0,1393,1392,1,
        0,0,0,1394,1398,1,0,0,0,1395,1397,5,5,0,0,1396,1395,1,0,0,0,1397,
        1400,1,0,0,0,1398,1396,1,0,0,0,1398,1399,1,0,0,0,1399,1402,1,0,0,
        0,1400,1398,1,0,0,0,1401,1403,5,41,0,0,1402,1401,1,0,0,0,1403,1404,
        1,0,0,0,1404,1402,1,0,0,0,1404,1405,1,0,0,0,1405,95,1,0,0,0,1406,
        1407,5,9,0,0,1407,1408,3,96,48,0,1408,1409,5,10,0,0,1409,1413,1,
        0,0,0,1410,1413,3,102,51,0,1411,1413,5,105,0,0,1412,1406,1,0,0,0,
        1412,1410,1,0,0,0,1412,1411,1,0,0,0,1413,97,1,0,0,0,1414,1418,3,
        100,50,0,1415,1417,5,5,0,0,1416,1415,1,0,0,0,1417,1420,1,0,0,0,1418,
        1416,1,0,0,0,1418,1419,1,0,0,0,1419,1421,1,0,0,0,1420,1418,1,0,0,
        0,1421,1425,5,7,0,0,1422,1424,5,5,0,0,1423,1422,1,0,0,0,1424,1427,
        1,0,0,0,1425,1423,1,0,0,0,1425,1426,1,0,0,0,1426,1429,1,0,0,0,1427,
        1425,1,0,0,0,1428,1414,1,0,0,0,1428,1429,1,0,0,0,1429,1430,1,0,0,
        0,1430,1434,3,106,53,0,1431,1433,5,5,0,0,1432,1431,1,0,0,0,1433,
        1436,1,0,0,0,1434,1432,1,0,0,0,1434,1435,1,0,0,0,1435,1437,1,0,0,
        0,1436,1434,1,0,0,0,1437,1441,5,33,0,0,1438,1440,5,5,0,0,1439,1438,
        1,0,0,0,1440,1443,1,0,0,0,1441,1439,1,0,0,0,1441,1442,1,0,0,0,1442,
        1444,1,0,0,0,1443,1441,1,0,0,0,1444,1445,3,88,44,0,1445,99,1,0,0,
        0,1446,1450,3,92,46,0,1447,1450,3,94,47,0,1448,1450,3,96,48,0,1449,
        1446,1,0,0,0,1449,1447,1,0,0,0,1449,1448,1,0,0,0,1450,101,1,0,0,
        0,1451,1468,3,104,52,0,1452,1454,5,5,0,0,1453,1452,1,0,0,0,1454,
        1457,1,0,0,0,1455,1453,1,0,0,0,1455,1456,1,0,0,0,1456,1458,1,0,0,
        0,1457,1455,1,0,0,0,1458,1462,5,7,0,0,1459,1461,5,5,0,0,1460,1459,
        1,0,0,0,1461,1464,1,0,0,0,1462,1460,1,0,0,0,1462,1463,1,0,0,0,1463,
        1465,1,0,0,0,1464,1462,1,0,0,0,1465,1467,3,104,52,0,1466,1455,1,
        0,0,0,1467,1470,1,0,0,0,1468,1466,1,0,0,0,1468,1469,1,0,0,0,1469,
        103,1,0,0,0,1470,1468,1,0,0,0,1471,1479,3,298,149,0,1472,1474,5,
        5,0,0,1473,1472,1,0,0,0,1474,1477,1,0,0,0,1475,1473,1,0,0,0,1475,
        1476,1,0,0,0,1476,1478,1,0,0,0,1477,1475,1,0,0,0,1478,1480,3,162,
        81,0,1479,1475,1,0,0,0,1479,1480,1,0,0,0,1480,105,1,0,0,0,1481,1485,
        5,9,0,0,1482,1484,5,5,0,0,1483,1482,1,0,0,0,1484,1487,1,0,0,0,1485,
        1483,1,0,0,0,1485,1486,1,0,0,0,1486,1490,1,0,0,0,1487,1485,1,0,0,
        0,1488,1491,3,60,30,0,1489,1491,3,88,44,0,1490,1488,1,0,0,0,1490,
        1489,1,0,0,0,1490,1491,1,0,0,0,1491,1511,1,0,0,0,1492,1494,5,5,0,
        0,1493,1492,1,0,0,0,1494,1497,1,0,0,0,1495,1493,1,0,0,0,1495,1496,
        1,0,0,0,1496,1498,1,0,0,0,1497,1495,1,0,0,0,1498,1502,5,8,0,0,1499,
        1501,5,5,0,0,1500,1499,1,0,0,0,1501,1504,1,0,0,0,1502,1500,1,0,0,
        0,1502,1503,1,0,0,0,1503,1507,1,0,0,0,1504,1502,1,0,0,0,1505,1508,
        3,60,30,0,1506,1508,3,88,44,0,1507,1505,1,0,0,0,1507,1506,1,0,0,
        0,1508,1510,1,0,0,0,1509,1495,1,0,0,0,1510,1513,1,0,0,0,1511,1509,
        1,0,0,0,1511,1512,1,0,0,0,1512,1521,1,0,0,0,1513,1511,1,0,0,0,1514,
        1516,5,5,0,0,1515,1514,1,0,0,0,1516,1519,1,0,0,0,1517,1515,1,0,0,
        0,1517,1518,1,0,0,0,1518,1520,1,0,0,0,1519,1517,1,0,0,0,1520,1522,
        5,8,0,0,1521,1517,1,0,0,0,1521,1522,1,0,0,0,1522,1526,1,0,0,0,1523,
        1525,5,5,0,0,1524,1523,1,0,0,0,1525,1528,1,0,0,0,1526,1524,1,0,0,
        0,1526,1527,1,0,0,0,1527,1529,1,0,0,0,1528,1526,1,0,0,0,1529,1530,
        5,10,0,0,1530,107,1,0,0,0,1531,1535,5,74,0,0,1532,1534,5,5,0,0,1533,
        1532,1,0,0,0,1534,1537,1,0,0,0,1535,1533,1,0,0,0,1535,1536,1,0,0,
        0,1536,1538,1,0,0,0,1537,1535,1,0,0,0,1538,1555,3,110,55,0,1539,
        1541,5,5,0,0,1540,1539,1,0,0,0,1541,1544,1,0,0,0,1542,1540,1,0,0,
        0,1542,1543,1,0,0,0,1543,1545,1,0,0,0,1544,1542,1,0,0,0,1545,1549,
        5,8,0,0,1546,1548,5,5,0,0,1547,1546,1,0,0,0,1548,1551,1,0,0,0,1549,
        1547,1,0,0,0,1549,1550,1,0,0,0,1550,1552,1,0,0,0,1551,1549,1,0,0,
        0,1552,1554,3,110,55,0,1553,1542,1,0,0,0,1554,1557,1,0,0,0,1555,
        1553,1,0,0,0,1555,1556,1,0,0,0,1556,109,1,0,0,0,1557,1555,1,0,0,
        0,1558,1560,3,286,143,0,1559,1558,1,0,0,0,1560,1563,1,0,0,0,1561,
        1559,1,0,0,0,1561,1562,1,0,0,0,1562,1564,1,0,0,0,1563,1561,1,0,0,
        0,1564,1568,3,298,149,0,1565,1567,5,5,0,0,1566,1565,1,0,0,0,1567,
        1570,1,0,0,0,1568,1566,1,0,0,0,1568,1569,1,0,0,0,1569,1571,1,0,0,
        0,1570,1568,1,0,0,0,1571,1575,5,25,0,0,1572,1574,5,5,0,0,1573,1572,
        1,0,0,0,1574,1577,1,0,0,0,1575,1573,1,0,0,0,1575,1576,1,0,0,0,1576,
        1578,1,0,0,0,1577,1575,1,0,0,0,1578,1579,3,88,44,0,1579,111,1,0,
        0,0,1580,1581,5,13,0,0,1581,1582,3,114,57,0,1582,1583,5,14,0,0,1583,
        113,1,0,0,0,1584,1586,3,302,151,0,1585,1584,1,0,0,0,1586,1589,1,
        0,0,0,1587,1585,1,0,0,0,1587,1588,1,0,0,0,1588,1604,1,0,0,0,1589,
        1587,1,0,0,0,1590,1601,3,116,58,0,1591,1593,3,302,151,0,1592,1591,
        1,0,0,0,1593,1594,1,0,0,0,1594,1592,1,0,0,0,1594,1595,1,0,0,0,1595,
        1597,1,0,0,0,1596,1598,3,116,58,0,1597,1596,1,0,0,0,1597,1598,1,
        0,0,0,1598,1600,1,0,0,0,1599,1592,1,0,0,0,1600,1603,1,0,0,0,1601,
        1599,1,0,0,0,1601,1602,1,0,0,0,1602,1605,1,0,0,0,1603,1601,1,0,0,
        0,1604,1590,1,0,0,0,1604,1605,1,0,0,0,1605,115,1,0,0,0,1606,1609,
        3,120,60,0,1607,1609,3,118,59,0,1608,1606,1,0,0,0,1608,1607,1,0,
        0,0,1609,117,1,0,0,0,1610,1612,3,286,143,0,1611,1610,1,0,0,0,1612,
        1615,1,0,0,0,1613,1611,1,0,0,0,1613,1614,1,0,0,0,1614,1619,1,0,0,
        0,1615,1613,1,0,0,0,1616,1618,5,5,0,0,1617,1616,1,0,0,0,1618,1621,
        1,0,0,0,1619,1617,1,0,0,0,1619,1620,1,0,0,0,1620,1622,1,0,0,0,1621,
        1619,1,0,0,0,1622,1623,3,122,61,0,1623,119,1,0,0,0,1624,1626,3,284,
        142,0,1625,1624,1,0,0,0,1626,1629,1,0,0,0,1627,1625,1,0,0,0,1627,
        1628,1,0,0,0,1628,1634,1,0,0,0,1629,1627,1,0,0,0,1630,1635,3,20,
        10,0,1631,1635,3,54,27,0,1632,1635,3,70,35,0,1633,1635,3,82,41,0,
        1634,1630,1,0,0,0,1634,1631,1,0,0,0,1634,1632,1,0,0,0,1634,1633,
        1,0,0,0,1635,121,1,0,0,0,1636,1642,3,124,62,0,1637,1638,3,234,117,
        0,1638,1639,3,124,62,0,1639,1641,1,0,0,0,1640,1637,1,0,0,0,1641,
        1644,1,0,0,0,1642,1640,1,0,0,0,1642,1643,1,0,0,0,1643,123,1,0,0,
        0,1644,1642,1,0,0,0,1645,1662,3,126,63,0,1646,1648,5,5,0,0,1647,
        1646,1,0,0,0,1648,1651,1,0,0,0,1649,1647,1,0,0,0,1649,1650,1,0,0,
        0,1650,1652,1,0,0,0,1651,1649,1,0,0,0,1652,1656,5,23,0,0,1653,1655,
        5,5,0,0,1654,1653,1,0,0,0,1655,1658,1,0,0,0,1656,1654,1,0,0,0,1656,
        1657,1,0,0,0,1657,1659,1,0,0,0,1658,1656,1,0,0,0,1659,1661,3,126,
        63,0,1660,1649,1,0,0,0,1661,1664,1,0,0,0,1662,1660,1,0,0,0,1662,
        1663,1,0,0,0,1663,125,1,0,0,0,1664,1662,1,0,0,0,1665,1682,3,128,
        64,0,1666,1668,5,5,0,0,1667,1666,1,0,0,0,1668,1671,1,0,0,0,1669,
        1667,1,0,0,0,1669,1670,1,0,0,0,1670,1672,1,0,0,0,1671,1669,1,0,0,
        0,1672,1676,5,22,0,0,1673,1675,5,5,0,0,1674,1673,1,0,0,0,1675,1678,
        1,0,0,0,1676,1674,1,0,0,0,1676,1677,1,0,0,0,1677,1679,1,0,0,0,1678,
        1676,1,0,0,0,1679,1681,3,128,64,0,1680,1669,1,0,0,0,1681,1684,1,
        0,0,0,1682,1680,1,0,0,0,1682,1683,1,0,0,0,1683,127,1,0,0,0,1684,
        1682,1,0,0,0,1685,1697,3,130,65,0,1686,1690,3,236,118,0,1687,1689,
        5,5,0,0,1688,1687,1,0,0,0,1689,1692,1,0,0,0,1690,1688,1,0,0,0,1690,
        1691,1,0,0,0,1691,1693,1,0,0,0,1692,1690,1,0,0,0,1693,1694,3,130,
        65,0,1694,1696,1,0,0,0,1695,1686,1,0,0,0,1696,1699,1,0,0,0,1697,
        1695,1,0,0,0,1697,1698,1,0,0,0,1698,129,1,0,0,0,1699,1697,1,0,0,
        0,1700,1710,3,132,66,0,1701,1705,3,238,119,0,1702,1704,5,5,0,0,1703,
        1702,1,0,0,0,1704,1707,1,0,0,0,1705,1703,1,0,0,0,1705,1706,1,0,0,
        0,1706,1708,1,0,0,0,1707,1705,1,0,0,0,1708,1709,3,132,66,0,1709,
        1711,1,0,0,0,1710,1701,1,0,0,0,1710,1711,1,0,0,0,1711,131,1,0,0,
        0,1712,1735,3,134,67,0,1713,1717,3,240,120,0,1714,1716,5,5,0,0,1715,
        1714,1,0,0,0,1716,1719,1,0,0,0,1717,1715,1,0,0,0,1717,1718,1,0,0,
        0,1718,1720,1,0,0,0,1719,1717,1,0,0,0,1720,1721,3,134,67,0,1721,
        1723,1,0,0,0,1722,1713,1,0,0,0,1723,1724,1,0,0,0,1724,1722,1,0,0,
        0,1724,1725,1,0,0,0,1725,1736,1,0,0,0,1726,1730,3,242,121,0,1727,
        1729,5,5,0,0,1728,1727,1,0,0,0,1729,1732,1,0,0,0,1730,1728,1,0,0,
        0,1730,1731,1,0,0,0,1731,1733,1,0,0,0,1732,1730,1,0,0,0,1733,1734,
        3,88,44,0,1734,1736,1,0,0,0,1735,1722,1,0,0,0,1735,1726,1,0,0,0,
        1735,1736,1,0,0,0,1736,133,1,0,0,0,1737,1754,3,136,68,0,1738,1740,
        5,5,0,0,1739,1738,1,0,0,0,1740,1743,1,0,0,0,1741,1739,1,0,0,0,1741,
        1742,1,0,0,0,1742,1744,1,0,0,0,1743,1741,1,0,0,0,1744,1748,5,42,
        0,0,1745,1747,5,5,0,0,1746,1745,1,0,0,0,1747,1750,1,0,0,0,1748,1746,
        1,0,0,0,1748,1749,1,0,0,0,1749,1751,1,0,0,0,1750,1748,1,0,0,0,1751,
        1753,3,136,68,0,1752,1741,1,0,0,0,1753,1756,1,0,0,0,1754,1752,1,
        0,0,0,1754,1755,1,0,0,0,1755,135,1,0,0,0,1756,1754,1,0,0,0,1757,
        1769,3,138,69,0,1758,1762,3,298,149,0,1759,1761,5,5,0,0,1760,1759,
        1,0,0,0,1761,1764,1,0,0,0,1762,1760,1,0,0,0,1762,1763,1,0,0,0,1763,
        1765,1,0,0,0,1764,1762,1,0,0,0,1765,1766,3,138,69,0,1766,1768,1,
        0,0,0,1767,1758,1,0,0,0,1768,1771,1,0,0,0,1769,1767,1,0,0,0,1769,
        1770,1,0,0,0,1770,137,1,0,0,0,1771,1769,1,0,0,0,1772,1783,3,140,
        70,0,1773,1777,5,35,0,0,1774,1776,5,5,0,0,1775,1774,1,0,0,0,1776,
        1779,1,0,0,0,1777,1775,1,0,0,0,1777,1778,1,0,0,0,1778,1780,1,0,0,
        0,1779,1777,1,0,0,0,1780,1782,3,140,70,0,1781,1773,1,0,0,0,1782,
        1785,1,0,0,0,1783,1781,1,0,0,0,1783,1784,1,0,0,0,1784,139,1,0,0,
        0,1785,1783,1,0,0,0,1786,1798,3,142,71,0,1787,1791,3,244,122,0,1788,
        1790,5,5,0,0,1789,1788,1,0,0,0,1790,1793,1,0,0,0,1791,1789,1,0,0,
        0,1791,1792,1,0,0,0,1792,1794,1,0,0,0,1793,1791,1,0,0,0,1794,1795,
        3,142,71,0,1795,1797,1,0,0,0,1796,1787,1,0,0,0,1797,1800,1,0,0,0,
        1798,1796,1,0,0,0,1798,1799,1,0,0,0,1799,141,1,0,0,0,1800,1798,1,
        0,0,0,1801,1813,3,144,72,0,1802,1806,3,246,123,0,1803,1805,5,5,0,
        0,1804,1803,1,0,0,0,1805,1808,1,0,0,0,1806,1804,1,0,0,0,1806,1807,
        1,0,0,0,1807,1809,1,0,0,0,1808,1806,1,0,0,0,1809,1810,3,144,72,0,
        1810,1812,1,0,0,0,1811,1802,1,0,0,0,1812,1815,1,0,0,0,1813,1811,
        1,0,0,0,1813,1814,1,0,0,0,1814,143,1,0,0,0,1815,1813,1,0,0,0,1816,
        1828,3,146,73,0,1817,1819,5,5,0,0,1818,1817,1,0,0,0,1819,1822,1,
        0,0,0,1820,1818,1,0,0,0,1820,1821,1,0,0,0,1821,1823,1,0,0,0,1822,
        1820,1,0,0,0,1823,1824,3,248,124,0,1824,1825,3,146,73,0,1825,1827,
        1,0,0,0,1826,1820,1,0,0,0,1827,1830,1,0,0,0,1828,1826,1,0,0,0,1828,
        1829,1,0,0,0,1829,145,1,0,0,0,1830,1828,1,0,0,0,1831,1833,3,250,
        125,0,1832,1831,1,0,0,0,1833,1836,1,0,0,0,1834,1832,1,0,0,0,1834,
        1835,1,0,0,0,1835,1837,1,0,0,0,1836,1834,1,0,0,0,1837,1838,3,148,
        74,0,1838,147,1,0,0,0,1839,1842,3,150,75,0,1840,1842,3,232,116,0,
        1841,1839,1,0,0,0,1841,1840,1,0,0,0,1842,1846,1,0,0,0,1843,1845,
        3,252,126,0,1844,1843,1,0,0,0,1845,1848,1,0,0,0,1846,1844,1,0,0,
        0,1846,1847,1,0,0,0,1847,149,1,0,0,0,1848,1846,1,0,0,0,1849,1864,
        3,152,76,0,1850,1864,3,170,85,0,1851,1864,3,186,93,0,1852,1864,3,
        196,98,0,1853,1864,3,198,99,0,1854,1864,3,200,100,0,1855,1864,3,
        216,108,0,1856,1864,3,192,96,0,1857,1864,3,230,115,0,1858,1864,3,
        222,111,0,1859,1864,3,194,97,0,1860,1864,3,298,149,0,1861,1862,5,
        64,0,0,1862,1864,3,296,148,0,1863,1849,1,0,0,0,1863,1850,1,0,0,0,
        1863,1851,1,0,0,0,1863,1852,1,0,0,0,1863,1853,1,0,0,0,1863,1854,
        1,0,0,0,1863,1855,1,0,0,0,1863,1856,1,0,0,0,1863,1857,1,0,0,0,1863,
        1858,1,0,0,0,1863,1859,1,0,0,0,1863,1860,1,0,0,0,1863,1861,1,0,0,
        0,1864,151,1,0,0,0,1865,1866,5,9,0,0,1866,1867,3,122,61,0,1867,1868,
        5,10,0,0,1868,153,1,0,0,0,1869,1871,3,162,81,0,1870,1872,3,160,80,
        0,1871,1870,1,0,0,0,1871,1872,1,0,0,0,1872,1876,1,0,0,0,1873,1875,
        3,156,78,0,1874,1873,1,0,0,0,1875,1878,1,0,0,0,1876,1874,1,0,0,0,
        1876,1877,1,0,0,0,1877,1892,1,0,0,0,1878,1876,1,0,0,0,1879,1883,
        3,160,80,0,1880,1882,3,156,78,0,1881,1880,1,0,0,0,1882,1885,1,0,
        0,0,1883,1881,1,0,0,0,1883,1884,1,0,0,0,1884,1892,1,0,0,0,1885,1883,
        1,0,0,0,1886,1888,3,156,78,0,1887,1886,1,0,0,0,1888,1889,1,0,0,0,
        1889,1887,1,0,0,0,1889,1890,1,0,0,0,1890,1892,1,0,0,0,1891,1869,
        1,0,0,0,1891,1879,1,0,0,0,1891,1887,1,0,0,0,1892,155,1,0,0,0,1893,
        1895,3,294,147,0,1894,1893,1,0,0,0,1895,1898,1,0,0,0,1896,1894,1,
        0,0,0,1896,1897,1,0,0,0,1897,1900,1,0,0,0,1898,1896,1,0,0,0,1899,
        1901,5,144,0,0,1900,1899,1,0,0,0,1900,1901,1,0,0,0,1901,1905,1,0,
        0,0,1902,1904,5,5,0,0,1903,1902,1,0,0,0,1904,1907,1,0,0,0,1905,1903,
        1,0,0,0,1905,1906,1,0,0,0,1906,1908,1,0,0,0,1907,1905,1,0,0,0,1908,
        1909,3,186,93,0,1909,157,1,0,0,0,1910,1919,5,11,0,0,1911,1916,3,
        122,61,0,1912,1913,5,8,0,0,1913,1915,3,122,61,0,1914,1912,1,0,0,
        0,1915,1918,1,0,0,0,1916,1914,1,0,0,0,1916,1917,1,0,0,0,1917,1920,
        1,0,0,0,1918,1916,1,0,0,0,1919,1911,1,0,0,0,1919,1920,1,0,0,0,1920,
        1921,1,0,0,0,1921,1922,5,12,0,0,1922,159,1,0,0,0,1923,1941,5,9,0,
        0,1924,1929,3,168,84,0,1925,1926,5,8,0,0,1926,1928,3,168,84,0,1927,
        1925,1,0,0,0,1928,1931,1,0,0,0,1929,1927,1,0,0,0,1929,1930,1,0,0,
        0,1930,1939,1,0,0,0,1931,1929,1,0,0,0,1932,1934,5,5,0,0,1933,1932,
        1,0,0,0,1934,1937,1,0,0,0,1935,1933,1,0,0,0,1935,1936,1,0,0,0,1936,
        1938,1,0,0,0,1937,1935,1,0,0,0,1938,1940,5,8,0,0,1939,1935,1,0,0,
        0,1939,1940,1,0,0,0,1940,1942,1,0,0,0,1941,1924,1,0,0,0,1941,1942,
        1,0,0,0,1942,1943,1,0,0,0,1943,1944,5,10,0,0,1944,161,1,0,0,0,1945,
        1949,5,43,0,0,1946,1948,5,5,0,0,1947,1946,1,0,0,0,1948,1951,1,0,
        0,0,1949,1947,1,0,0,0,1949,1950,1,0,0,0,1950,1952,1,0,0,0,1951,1949,
        1,0,0,0,1952,1963,3,164,82,0,1953,1955,5,5,0,0,1954,1953,1,0,0,0,
        1955,1958,1,0,0,0,1956,1954,1,0,0,0,1956,1957,1,0,0,0,1957,1959,
        1,0,0,0,1958,1956,1,0,0,0,1959,1960,5,8,0,0,1960,1962,3,164,82,0,
        1961,1956,1,0,0,0,1962,1965,1,0,0,0,1963,1961,1,0,0,0,1963,1964,
        1,0,0,0,1964,1973,1,0,0,0,1965,1963,1,0,0,0,1966,1968,5,5,0,0,1967,
        1966,1,0,0,0,1968,1971,1,0,0,0,1969,1967,1,0,0,0,1969,1970,1,0,0,
        0,1970,1972,1,0,0,0,1971,1969,1,0,0,0,1972,1974,5,8,0,0,1973,1969,
        1,0,0,0,1973,1974,1,0,0,0,1974,1978,1,0,0,0,1975,1977,5,5,0,0,1976,
        1975,1,0,0,0,1977,1980,1,0,0,0,1978,1976,1,0,0,0,1978,1979,1,0,0,
        0,1979,1981,1,0,0,0,1980,1978,1,0,0,0,1981,1983,5,44,0,0,1982,1984,
        5,41,0,0,1983,1982,1,0,0,0,1983,1984,1,0,0,0,1984,163,1,0,0,0,1985,
        1987,3,166,83,0,1986,1985,1,0,0,0,1986,1987,1,0,0,0,1987,1988,1,
        0,0,0,1988,1991,3,88,44,0,1989,1991,5,15,0,0,1990,1986,1,0,0,0,1990,
        1989,1,0,0,0,1991,165,1,0,0,0,1992,1994,3,272,136,0,1993,1992,1,
        0,0,0,1994,1995,1,0,0,0,1995,1993,1,0,0,0,1995,1996,1,0,0,0,1996,
        167,1,0,0,0,1997,2001,3,298,149,0,1998,2000,5,5,0,0,1999,1998,1,
        0,0,0,2000,2003,1,0,0,0,2001,1999,1,0,0,0,2001,2002,1,0,0,0,2002,
        2004,1,0,0,0,2003,2001,1,0,0,0,2004,2008,5,27,0,0,2005,2007,5,5,
        0,0,2006,2005,1,0,0,0,2007,2010,1,0,0,0,2008,2006,1,0,0,0,2008,2009,
        1,0,0,0,2009,2012,1,0,0,0,2010,2008,1,0,0,0,2011,1997,1,0,0,0,2011,
        2012,1,0,0,0,2012,2014,1,0,0,0,2013,2015,5,15,0,0,2014,2013,1,0,
        0,0,2014,2015,1,0,0,0,2015,2019,1,0,0,0,2016,2018,5,5,0,0,2017,2016,
        1,0,0,0,2018,2021,1,0,0,0,2019,2017,1,0,0,0,2019,2020,1,0,0,0,2020,
        2022,1,0,0,0,2021,2019,1,0,0,0,2022,2023,3,122,61,0,2023,169,1,0,
        0,0,2024,2034,5,140,0,0,2025,2034,5,137,0,0,2026,2034,3,172,86,0,
        2027,2034,5,138,0,0,2028,2034,5,139,0,0,2029,2034,5,146,0,0,2030,
        2034,5,133,0,0,2031,2034,5,141,0,0,2032,2034,5,136,0,0,2033,2024,
        1,0,0,0,2033,2025,1,0,0,0,2033,2026,1,0,0,0,2033,2027,1,0,0,0,2033,
        2028,1,0,0,0,2033,2029,1,0,0,0,2033,2030,1,0,0,0,2033,2031,1,0,0,
        0,2033,2032,1,0,0,0,2034,171,1,0,0,0,2035,2038,3,174,87,0,2036,2038,
        3,176,88,0,2037,2035,1,0,0,0,2037,2036,1,0,0,0,2038,173,1,0,0,0,
        2039,2044,5,131,0,0,2040,2043,3,178,89,0,2041,2043,3,180,90,0,2042,
        2040,1,0,0,0,2042,2041,1,0,0,0,2043,2046,1,0,0,0,2044,2042,1,0,0,
        0,2044,2045,1,0,0,0,2045,2047,1,0,0,0,2046,2044,1,0,0,0,2047,2048,
        5,157,0,0,2048,175,1,0,0,0,2049,2056,5,132,0,0,2050,2055,3,182,91,
        0,2051,2055,3,184,92,0,2052,2055,3,174,87,0,2053,2055,5,163,0,0,
        2054,2050,1,0,0,0,2054,2051,1,0,0,0,2054,2052,1,0,0,0,2054,2053,
        1,0,0,0,2055,2058,1,0,0,0,2056,2054,1,0,0,0,2056,2057,1,0,0,0,2057,
        2059,1,0,0,0,2058,2056,1,0,0,0,2059,2060,5,162,0,0,2060,177,1,0,
        0,0,2061,2062,7,3,0,0,2062,179,1,0,0,0,2063,2064,5,161,0,0,2064,
        2065,3,122,61,0,2065,2066,5,14,0,0,2066,181,1,0,0,0,2067,2068,7,
        4,0,0,2068,183,1,0,0,0,2069,2070,5,167,0,0,2070,2071,3,122,61,0,
        2071,2072,5,14,0,0,2072,185,1,0,0,0,2073,2075,3,286,143,0,2074,2073,
        1,0,0,0,2075,2078,1,0,0,0,2076,2074,1,0,0,0,2076,2077,1,0,0,0,2077,
        2125,1,0,0,0,2078,2076,1,0,0,0,2079,2083,5,13,0,0,2080,2082,5,5,
        0,0,2081,2080,1,0,0,0,2082,2085,1,0,0,0,2083,2081,1,0,0,0,2083,2084,
        1,0,0,0,2084,2086,1,0,0,0,2085,2083,1,0,0,0,2086,2090,3,114,57,0,
        2087,2089,5,5,0,0,2088,2087,1,0,0,0,2089,2092,1,0,0,0,2090,2088,
        1,0,0,0,2090,2091,1,0,0,0,2091,2093,1,0,0,0,2092,2090,1,0,0,0,2093,
        2094,5,14,0,0,2094,2126,1,0,0,0,2095,2099,5,13,0,0,2096,2098,5,5,
        0,0,2097,2096,1,0,0,0,2098,2101,1,0,0,0,2099,2097,1,0,0,0,2099,2100,
        1,0,0,0,2100,2102,1,0,0,0,2101,2099,1,0,0,0,2102,2106,3,188,94,0,
        2103,2105,5,5,0,0,2104,2103,1,0,0,0,2105,2108,1,0,0,0,2106,2104,
        1,0,0,0,2106,2107,1,0,0,0,2107,2109,1,0,0,0,2108,2106,1,0,0,0,2109,
        2113,5,33,0,0,2110,2112,5,5,0,0,2111,2110,1,0,0,0,2112,2115,1,0,
        0,0,2113,2111,1,0,0,0,2113,2114,1,0,0,0,2114,2116,1,0,0,0,2115,2113,
        1,0,0,0,2116,2120,3,114,57,0,2117,2119,5,5,0,0,2118,2117,1,0,0,0,
        2119,2122,1,0,0,0,2120,2118,1,0,0,0,2120,2121,1,0,0,0,2121,2123,
        1,0,0,0,2122,2120,1,0,0,0,2123,2124,5,14,0,0,2124,2126,1,0,0,0,2125,
        2079,1,0,0,0,2125,2095,1,0,0,0,2126,187,1,0,0,0,2127,2129,3,190,
        95,0,2128,2127,1,0,0,0,2128,2129,1,0,0,0,2129,2146,1,0,0,0,2130,
        2132,5,5,0,0,2131,2130,1,0,0,0,2132,2135,1,0,0,0,2133,2131,1,0,0,
        0,2133,2134,1,0,0,0,2134,2136,1,0,0,0,2135,2133,1,0,0,0,2136,2140,
        5,8,0,0,2137,2139,5,5,0,0,2138,2137,1,0,0,0,2139,2142,1,0,0,0,2140,
        2138,1,0,0,0,2140,2141,1,0,0,0,2141,2143,1,0,0,0,2142,2140,1,0,0,
        0,2143,2145,3,190,95,0,2144,2133,1,0,0,0,2145,2148,1,0,0,0,2146,
        2144,1,0,0,0,2146,2147,1,0,0,0,2147,189,1,0,0,0,2148,2146,1,0,0,
        0,2149,2168,3,76,38,0,2150,2165,3,74,37,0,2151,2153,5,5,0,0,2152,
        2151,1,0,0,0,2153,2156,1,0,0,0,2154,2152,1,0,0,0,2154,2155,1,0,0,
        0,2155,2157,1,0,0,0,2156,2154,1,0,0,0,2157,2161,5,25,0,0,2158,2160,
        5,5,0,0,2159,2158,1,0,0,0,2160,2163,1,0,0,0,2161,2159,1,0,0,0,2161,
        2162,1,0,0,0,2162,2164,1,0,0,0,2163,2161,1,0,0,0,2164,2166,3,88,
        44,0,2165,2154,1,0,0,0,2165,2166,1,0,0,0,2166,2168,1,0,0,0,2167,
        2149,1,0,0,0,2167,2150,1,0,0,0,2168,191,1,0,0,0,2169,2184,5,63,0,
        0,2170,2172,5,5,0,0,2171,2170,1,0,0,0,2172,2175,1,0,0,0,2173,2171,
        1,0,0,0,2173,2174,1,0,0,0,2174,2176,1,0,0,0,2175,2173,1,0,0,0,2176,
        2180,5,25,0,0,2177,2179,5,5,0,0,2178,2177,1,0,0,0,2179,2182,1,0,
        0,0,2180,2178,1,0,0,0,2180,2181,1,0,0,0,2181,2183,1,0,0,0,2182,2180,
        1,0,0,0,2183,2185,3,28,14,0,2184,2173,1,0,0,0,2184,2185,1,0,0,0,
        2185,2189,1,0,0,0,2186,2188,5,5,0,0,2187,2186,1,0,0,0,2188,2191,
        1,0,0,0,2189,2187,1,0,0,0,2189,2190,1,0,0,0,2190,2193,1,0,0,0,2191,
        2189,1,0,0,0,2192,2194,3,38,19,0,2193,2192,1,0,0,0,2193,2194,1,0,
        0,0,2194,193,1,0,0,0,2195,2197,5,11,0,0,2196,2198,3,122,61,0,2197,
        2196,1,0,0,0,2197,2198,1,0,0,0,2198,2203,1,0,0,0,2199,2200,5,8,0,
        0,2200,2202,3,122,61,0,2201,2199,1,0,0,0,2202,2205,1,0,0,0,2203,
        2201,1,0,0,0,2203,2204,1,0,0,0,2204,2206,1,0,0,0,2205,2203,1,0,0,
        0,2206,2207,5,12,0,0,2207,195,1,0,0,0,2208,2210,5,71,0,0,2209,2211,
        5,143,0,0,2210,2209,1,0,0,0,2210,2211,1,0,0,0,2211,197,1,0,0,0,2212,
        2229,5,72,0,0,2213,2217,5,43,0,0,2214,2216,5,5,0,0,2215,2214,1,0,
        0,0,2216,2219,1,0,0,0,2217,2215,1,0,0,0,2217,2218,1,0,0,0,2218,2220,
        1,0,0,0,2219,2217,1,0,0,0,2220,2224,3,88,44,0,2221,2223,5,5,0,0,
        2222,2221,1,0,0,0,2223,2226,1,0,0,0,2224,2222,1,0,0,0,2224,2225,
        1,0,0,0,2225,2227,1,0,0,0,2226,2224,1,0,0,0,2227,2228,5,44,0,0,2228,
        2230,1,0,0,0,2229,2213,1,0,0,0,2229,2230,1,0,0,0,2230,2232,1,0,0,
        0,2231,2233,5,143,0,0,2232,2231,1,0,0,0,2232,2233,1,0,0,0,2233,199,
        1,0,0,0,2234,2237,3,202,101,0,2235,2237,3,206,103,0,2236,2234,1,
        0,0,0,2236,2235,1,0,0,0,2237,201,1,0,0,0,2238,2242,5,75,0,0,2239,
        2241,5,5,0,0,2240,2239,1,0,0,0,2241,2244,1,0,0,0,2242,2240,1,0,0,
        0,2242,2243,1,0,0,0,2243,2245,1,0,0,0,2244,2242,1,0,0,0,2245,2246,
        5,9,0,0,2246,2247,3,122,61,0,2247,2251,5,10,0,0,2248,2250,5,5,0,
        0,2249,2248,1,0,0,0,2250,2253,1,0,0,0,2251,2249,1,0,0,0,2251,2252,
        1,0,0,0,2252,2255,1,0,0,0,2253,2251,1,0,0,0,2254,2256,3,204,102,
        0,2255,2254,1,0,0,0,2255,2256,1,0,0,0,2256,2258,1,0,0,0,2257,2259,
        5,26,0,0,2258,2257,1,0,0,0,2258,2259,1,0,0,0,2259,2276,1,0,0,0,2260,
        2262,5,5,0,0,2261,2260,1,0,0,0,2262,2265,1,0,0,0,2263,2261,1,0,0,
        0,2263,2264,1,0,0,0,2264,2266,1,0,0,0,2265,2263,1,0,0,0,2266,2270,
        5,76,0,0,2267,2269,5,5,0,0,2268,2267,1,0,0,0,2269,2272,1,0,0,0,2270,
        2268,1,0,0,0,2270,2271,1,0,0,0,2271,2274,1,0,0,0,2272,2270,1,0,0,
        0,2273,2275,3,204,102,0,2274,2273,1,0,0,0,2274,2275,1,0,0,0,2275,
        2277,1,0,0,0,2276,2263,1,0,0,0,2276,2277,1,0,0,0,2277,203,1,0,0,
        0,2278,2281,3,112,56,0,2279,2281,3,122,61,0,2280,2278,1,0,0,0,2280,
        2279,1,0,0,0,2281,205,1,0,0,0,2282,2286,5,77,0,0,2283,2285,5,5,0,
        0,2284,2283,1,0,0,0,2285,2288,1,0,0,0,2286,2284,1,0,0,0,2286,2287,
        1,0,0,0,2287,2293,1,0,0,0,2288,2286,1,0,0,0,2289,2290,5,9,0,0,2290,
        2291,3,122,61,0,2291,2292,5,10,0,0,2292,2294,1,0,0,0,2293,2289,1,
        0,0,0,2293,2294,1,0,0,0,2294,2298,1,0,0,0,2295,2297,5,5,0,0,2296,
        2295,1,0,0,0,2297,2300,1,0,0,0,2298,2296,1,0,0,0,2298,2299,1,0,0,
        0,2299,2301,1,0,0,0,2300,2298,1,0,0,0,2301,2305,5,13,0,0,2302,2304,
        5,5,0,0,2303,2302,1,0,0,0,2304,2307,1,0,0,0,2305,2303,1,0,0,0,2305,
        2306,1,0,0,0,2306,2317,1,0,0,0,2307,2305,1,0,0,0,2308,2312,3,208,
        104,0,2309,2311,5,5,0,0,2310,2309,1,0,0,0,2311,2314,1,0,0,0,2312,
        2310,1,0,0,0,2312,2313,1,0,0,0,2313,2316,1,0,0,0,2314,2312,1,0,0,
        0,2315,2308,1,0,0,0,2316,2319,1,0,0,0,2317,2315,1,0,0,0,2317,2318,
        1,0,0,0,2318,2323,1,0,0,0,2319,2317,1,0,0,0,2320,2322,5,5,0,0,2321,
        2320,1,0,0,0,2322,2325,1,0,0,0,2323,2321,1,0,0,0,2323,2324,1,0,0,
        0,2324,2326,1,0,0,0,2325,2323,1,0,0,0,2326,2327,5,14,0,0,2327,207,
        1,0,0,0,2328,2345,3,210,105,0,2329,2331,5,5,0,0,2330,2329,1,0,0,
        0,2331,2334,1,0,0,0,2332,2330,1,0,0,0,2332,2333,1,0,0,0,2333,2335,
        1,0,0,0,2334,2332,1,0,0,0,2335,2339,5,8,0,0,2336,2338,5,5,0,0,2337,
        2336,1,0,0,0,2338,2341,1,0,0,0,2339,2337,1,0,0,0,2339,2340,1,0,0,
        0,2340,2342,1,0,0,0,2341,2339,1,0,0,0,2342,2344,3,210,105,0,2343,
        2332,1,0,0,0,2344,2347,1,0,0,0,2345,2343,1,0,0,0,2345,2346,1,0,0,
        0,2346,2351,1,0,0,0,2347,2345,1,0,0,0,2348,2350,5,5,0,0,2349,2348,
        1,0,0,0,2350,2353,1,0,0,0,2351,2349,1,0,0,0,2351,2352,1,0,0,0,2352,
        2354,1,0,0,0,2353,2351,1,0,0,0,2354,2358,5,33,0,0,2355,2357,5,5,
        0,0,2356,2355,1,0,0,0,2357,2360,1,0,0,0,2358,2356,1,0,0,0,2358,2359,
        1,0,0,0,2359,2361,1,0,0,0,2360,2358,1,0,0,0,2361,2363,3,204,102,
        0,2362,2364,3,300,150,0,2363,2362,1,0,0,0,2363,2364,1,0,0,0,2364,
        2381,1,0,0,0,2365,2369,5,76,0,0,2366,2368,5,5,0,0,2367,2366,1,0,
        0,0,2368,2371,1,0,0,0,2369,2367,1,0,0,0,2369,2370,1,0,0,0,2370,2372,
        1,0,0,0,2371,2369,1,0,0,0,2372,2376,5,33,0,0,2373,2375,5,5,0,0,2374,
        2373,1,0,0,0,2375,2378,1,0,0,0,2376,2374,1,0,0,0,2376,2377,1,0,0,
        0,2377,2379,1,0,0,0,2378,2376,1,0,0,0,2379,2381,3,204,102,0,2380,
        2328,1,0,0,0,2380,2365,1,0,0,0,2381,209,1,0,0,0,2382,2386,3,122,
        61,0,2383,2386,3,212,106,0,2384,2386,3,214,107,0,2385,2382,1,0,0,
        0,2385,2383,1,0,0,0,2385,2384,1,0,0,0,2386,211,1,0,0,0,2387,2391,
        3,240,120,0,2388,2390,5,5,0,0,2389,2388,1,0,0,0,2390,2393,1,0,0,
        0,2391,2389,1,0,0,0,2391,2392,1,0,0,0,2392,2394,1,0,0,0,2393,2391,
        1,0,0,0,2394,2395,3,122,61,0,2395,213,1,0,0,0,2396,2400,3,242,121,
        0,2397,2399,5,5,0,0,2398,2397,1,0,0,0,2399,2402,1,0,0,0,2400,2398,
        1,0,0,0,2400,2401,1,0,0,0,2401,2403,1,0,0,0,2402,2400,1,0,0,0,2403,
        2404,3,88,44,0,2404,215,1,0,0,0,2405,2409,5,78,0,0,2406,2408,5,5,
        0,0,2407,2406,1,0,0,0,2408,2411,1,0,0,0,2409,2407,1,0,0,0,2409,2410,
        1,0,0,0,2410,2412,1,0,0,0,2411,2409,1,0,0,0,2412,2422,3,112,56,0,
        2413,2415,5,5,0,0,2414,2413,1,0,0,0,2415,2418,1,0,0,0,2416,2414,
        1,0,0,0,2416,2417,1,0,0,0,2417,2419,1,0,0,0,2418,2416,1,0,0,0,2419,
        2421,3,218,109,0,2420,2416,1,0,0,0,2421,2424,1,0,0,0,2422,2420,1,
        0,0,0,2422,2423,1,0,0,0,2423,2432,1,0,0,0,2424,2422,1,0,0,0,2425,
        2427,5,5,0,0,2426,2425,1,0,0,0,2427,2430,1,0,0,0,2428,2426,1,0,0,
        0,2428,2429,1,0,0,0,2429,2431,1,0,0,0,2430,2428,1,0,0,0,2431,2433,
        3,220,110,0,2432,2428,1,0,0,0,2432,2433,1,0,0,0,2433,217,1,0,0,0,
        2434,2438,5,79,0,0,2435,2437,5,5,0,0,2436,2435,1,0,0,0,2437,2440,
        1,0,0,0,2438,2436,1,0,0,0,2438,2439,1,0,0,0,2439,2441,1,0,0,0,2440,
        2438,1,0,0,0,2441,2445,5,9,0,0,2442,2444,3,286,143,0,2443,2442,1,
        0,0,0,2444,2447,1,0,0,0,2445,2443,1,0,0,0,2445,2446,1,0,0,0,2446,
        2448,1,0,0,0,2447,2445,1,0,0,0,2448,2449,3,298,149,0,2449,2450,5,
        25,0,0,2450,2451,3,102,51,0,2451,2455,5,10,0,0,2452,2454,5,5,0,0,
        2453,2452,1,0,0,0,2454,2457,1,0,0,0,2455,2453,1,0,0,0,2455,2456,
        1,0,0,0,2456,2458,1,0,0,0,2457,2455,1,0,0,0,2458,2459,3,112,56,0,
        2459,219,1,0,0,0,2460,2464,5,80,0,0,2461,2463,5,5,0,0,2462,2461,
        1,0,0,0,2463,2466,1,0,0,0,2464,2462,1,0,0,0,2464,2465,1,0,0,0,2465,
        2467,1,0,0,0,2466,2464,1,0,0,0,2467,2468,3,112,56,0,2468,221,1,0,
        0,0,2469,2473,3,224,112,0,2470,2473,3,226,113,0,2471,2473,3,228,
        114,0,2472,2469,1,0,0,0,2472,2470,1,0,0,0,2472,2471,1,0,0,0,2473,
        223,1,0,0,0,2474,2478,5,81,0,0,2475,2477,5,5,0,0,2476,2475,1,0,0,
        0,2477,2480,1,0,0,0,2478,2476,1,0,0,0,2478,2479,1,0,0,0,2479,2481,
        1,0,0,0,2480,2478,1,0,0,0,2481,2485,5,9,0,0,2482,2484,3,286,143,
        0,2483,2482,1,0,0,0,2484,2487,1,0,0,0,2485,2483,1,0,0,0,2485,2486,
        1,0,0,0,2486,2490,1,0,0,0,2487,2485,1,0,0,0,2488,2491,3,76,38,0,
        2489,2491,3,74,37,0,2490,2488,1,0,0,0,2490,2489,1,0,0,0,2491,2492,
        1,0,0,0,2492,2493,5,90,0,0,2493,2494,3,122,61,0,2494,2498,5,10,0,
        0,2495,2497,5,5,0,0,2496,2495,1,0,0,0,2497,2500,1,0,0,0,2498,2496,
        1,0,0,0,2498,2499,1,0,0,0,2499,2502,1,0,0,0,2500,2498,1,0,0,0,2501,
        2503,3,204,102,0,2502,2501,1,0,0,0,2502,2503,1,0,0,0,2503,225,1,
        0,0,0,2504,2508,5,83,0,0,2505,2507,5,5,0,0,2506,2505,1,0,0,0,2507,
        2510,1,0,0,0,2508,2506,1,0,0,0,2508,2509,1,0,0,0,2509,2511,1,0,0,
        0,2510,2508,1,0,0,0,2511,2512,5,9,0,0,2512,2513,3,122,61,0,2513,
        2517,5,10,0,0,2514,2516,5,5,0,0,2515,2514,1,0,0,0,2516,2519,1,0,
        0,0,2517,2515,1,0,0,0,2517,2518,1,0,0,0,2518,2521,1,0,0,0,2519,2517,
        1,0,0,0,2520,2522,3,204,102,0,2521,2520,1,0,0,0,2521,2522,1,0,0,
        0,2522,227,1,0,0,0,2523,2527,5,82,0,0,2524,2526,5,5,0,0,2525,2524,
        1,0,0,0,2526,2529,1,0,0,0,2527,2525,1,0,0,0,2527,2528,1,0,0,0,2528,
        2531,1,0,0,0,2529,2527,1,0,0,0,2530,2532,3,204,102,0,2531,2530,1,
        0,0,0,2531,2532,1,0,0,0,2532,2536,1,0,0,0,2533,2535,5,5,0,0,2534,
        2533,1,0,0,0,2535,2538,1,0,0,0,2536,2534,1,0,0,0,2536,2537,1,0,0,
        0,2537,2539,1,0,0,0,2538,2536,1,0,0,0,2539,2543,5,83,0,0,2540,2542,
        5,5,0,0,2541,2540,1,0,0,0,2542,2545,1,0,0,0,2543,2541,1,0,0,0,2543,
        2544,1,0,0,0,2544,2546,1,0,0,0,2545,2543,1,0,0,0,2546,2547,5,9,0,
        0,2547,2548,3,122,61,0,2548,2549,5,10,0,0,2549,229,1,0,0,0,2550,
        2554,5,84,0,0,2551,2553,5,5,0,0,2552,2551,1,0,0,0,2553,2556,1,0,
        0,0,2554,2552,1,0,0,0,2554,2555,1,0,0,0,2555,2557,1,0,0,0,2556,2554,
        1,0,0,0,2557,2567,3,122,61,0,2558,2560,7,5,0,0,2559,2561,3,122,61,
        0,2560,2559,1,0,0,0,2560,2561,1,0,0,0,2561,2567,1,0,0,0,2562,2567,
        5,86,0,0,2563,2567,5,54,0,0,2564,2567,5,87,0,0,2565,2567,5,55,0,
        0,2566,2550,1,0,0,0,2566,2558,1,0,0,0,2566,2562,1,0,0,0,2566,2563,
        1,0,0,0,2566,2564,1,0,0,0,2566,2565,1,0,0,0,2567,231,1,0,0,0,2568,
        2578,3,102,51,0,2569,2573,5,41,0,0,2570,2572,5,5,0,0,2571,2570,1,
        0,0,0,2572,2575,1,0,0,0,2573,2571,1,0,0,0,2573,2574,1,0,0,0,2574,
        2577,1,0,0,0,2575,2573,1,0,0,0,2576,2569,1,0,0,0,2577,2580,1,0,0,
        0,2578,2576,1,0,0,0,2578,2579,1,0,0,0,2579,2582,1,0,0,0,2580,2578,
        1,0,0,0,2581,2568,1,0,0,0,2581,2582,1,0,0,0,2582,2586,1,0,0,0,2583,
        2585,5,5,0,0,2584,2583,1,0,0,0,2585,2588,1,0,0,0,2586,2584,1,0,0,
        0,2586,2587,1,0,0,0,2587,2589,1,0,0,0,2588,2586,1,0,0,0,2589,2593,
        7,6,0,0,2590,2592,5,5,0,0,2591,2590,1,0,0,0,2592,2595,1,0,0,0,2593,
        2591,1,0,0,0,2593,2594,1,0,0,0,2594,2598,1,0,0,0,2595,2593,1,0,0,
        0,2596,2599,3,296,148,0,2597,2599,5,59,0,0,2598,2596,1,0,0,0,2598,
        2597,1,0,0,0,2599,2616,1,0,0,0,2600,2604,5,71,0,0,2601,2603,5,5,
        0,0,2602,2601,1,0,0,0,2603,2606,1,0,0,0,2604,2602,1,0,0,0,2604,2605,
        1,0,0,0,2605,2607,1,0,0,0,2606,2604,1,0,0,0,2607,2611,5,36,0,0,2608,
        2610,5,5,0,0,2609,2608,1,0,0,0,2610,2613,1,0,0,0,2611,2609,1,0,0,
        0,2611,2612,1,0,0,0,2612,2614,1,0,0,0,2613,2611,1,0,0,0,2614,2616,
        5,59,0,0,2615,2581,1,0,0,0,2615,2600,1,0,0,0,2616,233,1,0,0,0,2617,
        2618,7,7,0,0,2618,235,1,0,0,0,2619,2620,7,8,0,0,2620,237,1,0,0,0,
        2621,2622,7,9,0,0,2622,239,1,0,0,0,2623,2624,7,10,0,0,2624,241,1,
        0,0,0,2625,2626,7,11,0,0,2626,243,1,0,0,0,2627,2628,7,12,0,0,2628,
        245,1,0,0,0,2629,2630,7,13,0,0,2630,247,1,0,0,0,2631,2632,7,14,0,
        0,2632,249,1,0,0,0,2633,2641,5,20,0,0,2634,2641,5,21,0,0,2635,2641,
        5,18,0,0,2636,2641,5,19,0,0,2637,2641,5,24,0,0,2638,2641,3,286,143,
        0,2639,2641,3,284,142,0,2640,2633,1,0,0,0,2640,2634,1,0,0,0,2640,
        2635,1,0,0,0,2640,2636,1,0,0,0,2640,2637,1,0,0,0,2640,2638,1,0,0,
        0,2640,2639,1,0,0,0,2641,251,1,0,0,0,2642,2658,5,20,0,0,2643,2658,
        5,21,0,0,2644,2645,5,24,0,0,2645,2658,5,24,0,0,2646,2658,3,154,77,
        0,2647,2658,3,158,79,0,2648,2650,5,5,0,0,2649,2648,1,0,0,0,2650,
        2653,1,0,0,0,2651,2649,1,0,0,0,2651,2652,1,0,0,0,2652,2654,1,0,0,
        0,2653,2651,1,0,0,0,2654,2655,3,254,127,0,2655,2656,3,148,74,0,2656,
        2658,1,0,0,0,2657,2642,1,0,0,0,2657,2643,1,0,0,0,2657,2644,1,0,0,
        0,2657,2646,1,0,0,0,2657,2647,1,0,0,0,2657,2651,1,0,0,0,2658,253,
        1,0,0,0,2659,2663,5,7,0,0,2660,2661,5,41,0,0,2661,2663,5,7,0,0,2662,
        2659,1,0,0,0,2662,2660,1,0,0,0,2663,255,1,0,0,0,2664,2667,3,286,
        143,0,2665,2667,3,264,132,0,2666,2664,1,0,0,0,2666,2665,1,0,0,0,
        2667,2668,1,0,0,0,2668,2666,1,0,0,0,2668,2669,1,0,0,0,2669,257,1,
        0,0,0,2670,2674,3,286,143,0,2671,2674,3,264,132,0,2672,2674,3,262,
        131,0,2673,2670,1,0,0,0,2673,2671,1,0,0,0,2673,2672,1,0,0,0,2674,
        2675,1,0,0,0,2675,2673,1,0,0,0,2675,2676,1,0,0,0,2676,259,1,0,0,
        0,2677,2689,5,9,0,0,2678,2683,3,60,30,0,2679,2680,5,8,0,0,2680,2682,
        3,60,30,0,2681,2679,1,0,0,0,2682,2685,1,0,0,0,2683,2681,1,0,0,0,
        2683,2684,1,0,0,0,2684,2687,1,0,0,0,2685,2683,1,0,0,0,2686,2688,
        5,8,0,0,2687,2686,1,0,0,0,2687,2688,1,0,0,0,2688,2690,1,0,0,0,2689,
        2678,1,0,0,0,2689,2690,1,0,0,0,2690,2691,1,0,0,0,2691,2692,5,10,
        0,0,2692,261,1,0,0,0,2693,2694,5,61,0,0,2694,2695,3,260,130,0,2695,
        263,1,0,0,0,2696,2706,3,266,133,0,2697,2706,3,268,134,0,2698,2706,
        3,270,135,0,2699,2706,3,272,136,0,2700,2706,3,274,137,0,2701,2706,
        3,276,138,0,2702,2706,3,278,139,0,2703,2706,3,280,140,0,2704,2706,
        3,282,141,0,2705,2696,1,0,0,0,2705,2697,1,0,0,0,2705,2698,1,0,0,
        0,2705,2699,1,0,0,0,2705,2700,1,0,0,0,2705,2701,1,0,0,0,2705,2702,
        1,0,0,0,2705,2703,1,0,0,0,2705,2704,1,0,0,0,2706,2710,1,0,0,0,2707,
        2709,5,5,0,0,2708,2707,1,0,0,0,2709,2712,1,0,0,0,2710,2708,1,0,0,
        0,2710,2711,1,0,0,0,2711,265,1,0,0,0,2712,2710,1,0,0,0,2713,2714,
        7,15,0,0,2714,267,1,0,0,0,2715,2716,7,16,0,0,2716,269,1,0,0,0,2717,
        2718,7,17,0,0,2718,271,1,0,0,0,2719,2720,7,18,0,0,2720,273,1,0,0,
        0,2721,2722,7,19,0,0,2722,275,1,0,0,0,2723,2724,5,125,0,0,2724,277,
        1,0,0,0,2725,2726,7,20,0,0,2726,279,1,0,0,0,2727,2728,7,21,0,0,2728,
        281,1,0,0,0,2729,2730,5,130,0,0,2730,283,1,0,0,0,2731,2735,5,144,
        0,0,2732,2734,5,5,0,0,2733,2732,1,0,0,0,2734,2737,1,0,0,0,2735,2733,
        1,0,0,0,2735,2736,1,0,0,0,2736,285,1,0,0,0,2737,2735,1,0,0,0,2738,
        2741,3,288,144,0,2739,2741,3,290,145,0,2740,2738,1,0,0,0,2740,2739,
        1,0,0,0,2741,2745,1,0,0,0,2742,2744,5,5,0,0,2743,2742,1,0,0,0,2744,
        2747,1,0,0,0,2745,2743,1,0,0,0,2745,2746,1,0,0,0,2746,287,1,0,0,
        0,2747,2745,1,0,0,0,2748,2752,3,292,146,0,2749,2751,5,5,0,0,2750,
        2749,1,0,0,0,2751,2754,1,0,0,0,2752,2750,1,0,0,0,2752,2753,1,0,0,
        0,2753,2755,1,0,0,0,2754,2752,1,0,0,0,2755,2759,5,25,0,0,2756,2758,
        5,5,0,0,2757,2756,1,0,0,0,2758,2761,1,0,0,0,2759,2757,1,0,0,0,2759,
        2760,1,0,0,0,2760,2762,1,0,0,0,2761,2759,1,0,0,0,2762,2763,3,294,
        147,0,2763,2803,1,0,0,0,2764,2781,5,143,0,0,2765,2767,5,5,0,0,2766,
        2765,1,0,0,0,2767,2770,1,0,0,0,2768,2766,1,0,0,0,2768,2769,1,0,0,
        0,2769,2771,1,0,0,0,2770,2768,1,0,0,0,2771,2775,5,7,0,0,2772,2774,
        5,5,0,0,2773,2772,1,0,0,0,2774,2777,1,0,0,0,2775,2773,1,0,0,0,2775,
        2776,1,0,0,0,2776,2778,1,0,0,0,2777,2775,1,0,0,0,2778,2780,3,298,
        149,0,2779,2768,1,0,0,0,2780,2783,1,0,0,0,2781,2779,1,0,0,0,2781,
        2782,1,0,0,0,2782,2791,1,0,0,0,2783,2781,1,0,0,0,2784,2786,5,5,0,
        0,2785,2784,1,0,0,0,2786,2789,1,0,0,0,2787,2785,1,0,0,0,2787,2788,
        1,0,0,0,2788,2790,1,0,0,0,2789,2787,1,0,0,0,2790,2792,3,162,81,0,
        2791,2787,1,0,0,0,2791,2792,1,0,0,0,2792,2800,1,0,0,0,2793,2795,
        5,5,0,0,2794,2793,1,0,0,0,2795,2798,1,0,0,0,2796,2794,1,0,0,0,2796,
        2797,1,0,0,0,2797,2799,1,0,0,0,2798,2796,1,0,0,0,2799,2801,3,160,
        80,0,2800,2796,1,0,0,0,2800,2801,1,0,0,0,2801,2803,1,0,0,0,2802,
        2748,1,0,0,0,2802,2764,1,0,0,0,2803,289,1,0,0,0,2804,2805,3,292,
        146,0,2805,2806,5,25,0,0,2806,2808,5,11,0,0,2807,2809,3,294,147,
        0,2808,2807,1,0,0,0,2809,2810,1,0,0,0,2810,2808,1,0,0,0,2810,2811,
        1,0,0,0,2811,2812,1,0,0,0,2812,2813,5,12,0,0,2813,2824,1,0,0,0,2814,
        2815,5,40,0,0,2815,2817,5,11,0,0,2816,2818,3,294,147,0,2817,2816,
        1,0,0,0,2818,2819,1,0,0,0,2819,2817,1,0,0,0,2819,2820,1,0,0,0,2820,
        2821,1,0,0,0,2821,2822,5,12,0,0,2822,2824,1,0,0,0,2823,2804,1,0,
        0,0,2823,2814,1,0,0,0,2824,291,1,0,0,0,2825,2826,7,22,0,0,2826,293,
        1,0,0,0,2827,2829,3,296,148,0,2828,2830,3,162,81,0,2829,2828,1,0,
        0,0,2829,2830,1,0,0,0,2830,2832,1,0,0,0,2831,2833,3,160,80,0,2832,
        2831,1,0,0,0,2832,2833,1,0,0,0,2833,295,1,0,0,0,2834,2845,3,298,
        149,0,2835,2837,5,5,0,0,2836,2835,1,0,0,0,2837,2840,1,0,0,0,2838,
        2836,1,0,0,0,2838,2839,1,0,0,0,2839,2841,1,0,0,0,2840,2838,1,0,0,
        0,2841,2842,5,7,0,0,2842,2844,3,298,149,0,2843,2838,1,0,0,0,2844,
        2847,1,0,0,0,2845,2843,1,0,0,0,2845,2846,1,0,0,0,2846,297,1,0,0,
        0,2847,2845,1,0,0,0,2848,2849,7,23,0,0,2849,299,1,0,0,0,2850,2852,
        5,5,0,0,2851,2850,1,0,0,0,2852,2853,1,0,0,0,2853,2851,1,0,0,0,2853,
        2854,1,0,0,0,2854,2869,1,0,0,0,2855,2857,5,5,0,0,2856,2855,1,0,0,
        0,2857,2860,1,0,0,0,2858,2856,1,0,0,0,2858,2859,1,0,0,0,2859,2861,
        1,0,0,0,2860,2858,1,0,0,0,2861,2865,5,26,0,0,2862,2864,5,5,0,0,2863,
        2862,1,0,0,0,2864,2867,1,0,0,0,2865,2863,1,0,0,0,2865,2866,1,0,0,
        0,2866,2869,1,0,0,0,2867,2865,1,0,0,0,2868,2851,1,0,0,0,2868,2858,
        1,0,0,0,2869,301,1,0,0,0,2870,2871,7,24,0,0,2871,303,1,0,0,0,441,
        307,314,321,324,328,331,338,345,352,355,359,362,367,375,383,388,
        391,395,398,403,405,410,418,421,431,434,440,447,451,456,460,465,
        472,476,481,485,490,497,501,504,510,513,523,527,529,534,537,545,
        552,559,566,570,575,582,589,595,601,607,611,614,620,627,634,640,
        646,652,665,670,676,682,688,695,702,706,711,715,721,729,733,739,
        743,748,755,761,764,769,778,783,786,791,798,802,807,811,816,820,
        823,829,833,838,845,850,855,859,864,871,878,882,887,891,896,900,
        908,912,914,919,924,931,936,943,947,950,956,963,967,972,979,983,
        988,992,995,1001,1005,1011,1015,1020,1027,1031,1036,1040,1043,1049,
        1053,1058,1065,1070,1075,1080,1085,1089,1094,1101,1105,1110,1117,
        1122,1129,1131,1136,1140,1149,1160,1168,1171,1175,1181,1189,1196,
        1200,1205,1213,1217,1219,1222,1226,1232,1238,1240,1245,1251,1256,
        1259,1265,1272,1276,1281,1288,1297,1304,1311,1317,1323,1327,1332,
        1338,1343,1348,1353,1360,1364,1367,1373,1380,1383,1385,1393,1398,
        1404,1412,1418,1425,1428,1434,1441,1449,1455,1462,1468,1475,1479,
        1485,1490,1495,1502,1507,1511,1517,1521,1526,1535,1542,1549,1555,
        1561,1568,1575,1587,1594,1597,1601,1604,1608,1613,1619,1627,1634,
        1642,1649,1656,1662,1669,1676,1682,1690,1697,1705,1710,1717,1724,
        1730,1735,1741,1748,1754,1762,1769,1777,1783,1791,1798,1806,1813,
        1820,1828,1834,1841,1846,1863,1871,1876,1883,1889,1891,1896,1900,
        1905,1916,1919,1929,1935,1939,1941,1949,1956,1963,1969,1973,1978,
        1983,1986,1990,1995,2001,2008,2011,2014,2019,2033,2037,2042,2044,
        2054,2056,2076,2083,2090,2099,2106,2113,2120,2125,2128,2133,2140,
        2146,2154,2161,2165,2167,2173,2180,2184,2189,2193,2197,2203,2210,
        2217,2224,2229,2232,2236,2242,2251,2255,2258,2263,2270,2274,2276,
        2280,2286,2293,2298,2305,2312,2317,2323,2332,2339,2345,2351,2358,
        2363,2369,2376,2380,2385,2391,2400,2409,2416,2422,2428,2432,2438,
        2445,2455,2464,2472,2478,2485,2490,2498,2502,2508,2517,2521,2527,
        2531,2536,2543,2554,2560,2566,2573,2578,2581,2586,2593,2598,2604,
        2611,2615,2640,2651,2657,2662,2666,2668,2673,2675,2683,2687,2689,
        2705,2710,2735,2740,2745,2752,2759,2768,2775,2781,2787,2791,2796,
        2800,2802,2810,2819,2823,2829,2832,2838,2845,2853,2858,2865,2868
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!KotlinParser.__ATN) {
            KotlinParser.__ATN = new antlr.ATNDeserializer().deserialize(KotlinParser._serializedATN);
        }

        return KotlinParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(KotlinParser.literalNames, KotlinParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return KotlinParser.vocabulary;
    }

    private static readonly decisionsToDFA = KotlinParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class KotlinFileContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public preamble(): PreambleContext {
        return this.getRuleContext(0, PreambleContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(KotlinParser.EOF, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public anysemi(): AnysemiContext[];
    public anysemi(i: number): AnysemiContext | null;
    public anysemi(i?: number): AnysemiContext[] | AnysemiContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnysemiContext);
        }

        return this.getRuleContext(i, AnysemiContext);
    }
    public topLevelObject(): TopLevelObjectContext[];
    public topLevelObject(i: number): TopLevelObjectContext | null;
    public topLevelObject(i?: number): TopLevelObjectContext[] | TopLevelObjectContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TopLevelObjectContext);
        }

        return this.getRuleContext(i, TopLevelObjectContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_kotlinFile;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterKotlinFile) {
             listener.enterKotlinFile(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitKotlinFile) {
             listener.exitKotlinFile(this);
        }
    }
}


export class ScriptContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public preamble(): PreambleContext {
        return this.getRuleContext(0, PreambleContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(KotlinParser.EOF, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public anysemi(): AnysemiContext[];
    public anysemi(i: number): AnysemiContext | null;
    public anysemi(i?: number): AnysemiContext[] | AnysemiContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnysemiContext);
        }

        return this.getRuleContext(i, AnysemiContext);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_script;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterScript) {
             listener.enterScript(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitScript) {
             listener.exitScript(this);
        }
    }
}


export class PreambleContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public packageHeader(): PackageHeaderContext {
        return this.getRuleContext(0, PackageHeaderContext)!;
    }
    public importList(): ImportListContext {
        return this.getRuleContext(0, ImportListContext)!;
    }
    public fileAnnotations(): FileAnnotationsContext | null {
        return this.getRuleContext(0, FileAnnotationsContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_preamble;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterPreamble) {
             listener.enterPreamble(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitPreamble) {
             listener.exitPreamble(this);
        }
    }
}


export class FileAnnotationsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public fileAnnotation(): FileAnnotationContext[];
    public fileAnnotation(i: number): FileAnnotationContext | null;
    public fileAnnotation(i?: number): FileAnnotationContext[] | FileAnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FileAnnotationContext);
        }

        return this.getRuleContext(i, FileAnnotationContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_fileAnnotations;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFileAnnotations) {
             listener.enterFileAnnotations(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFileAnnotations) {
             listener.exitFileAnnotations(this);
        }
    }
}


export class FileAnnotationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FILE_SITE(): antlr.TerminalNode[];
    public FILE_SITE(i: number): antlr.TerminalNode | null;
    public FILE_SITE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.FILE_SITE);
    	} else {
    		return this.getToken(KotlinParser.FILE_SITE, i);
    	}
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.COLON);
    	} else {
    		return this.getToken(KotlinParser.COLON, i);
    	}
    }
    public LSQUARE(): antlr.TerminalNode[];
    public LSQUARE(i: number): antlr.TerminalNode | null;
    public LSQUARE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.LSQUARE);
    	} else {
    		return this.getToken(KotlinParser.LSQUARE, i);
    	}
    }
    public RSQUARE(): antlr.TerminalNode[];
    public RSQUARE(i: number): antlr.TerminalNode | null;
    public RSQUARE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.RSQUARE);
    	} else {
    		return this.getToken(KotlinParser.RSQUARE, i);
    	}
    }
    public unescapedAnnotation(): UnescapedAnnotationContext[];
    public unescapedAnnotation(i: number): UnescapedAnnotationContext | null;
    public unescapedAnnotation(i?: number): UnescapedAnnotationContext[] | UnescapedAnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UnescapedAnnotationContext);
        }

        return this.getRuleContext(i, UnescapedAnnotationContext);
    }
    public semi(): SemiContext[];
    public semi(i: number): SemiContext | null;
    public semi(i?: number): SemiContext[] | SemiContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SemiContext);
        }

        return this.getRuleContext(i, SemiContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_fileAnnotation;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFileAnnotation) {
             listener.enterFileAnnotation(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFileAnnotation) {
             listener.exitFileAnnotation(this);
        }
    }
}


export class PackageHeaderContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PACKAGE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.PACKAGE, 0);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public modifierList(): ModifierListContext | null {
        return this.getRuleContext(0, ModifierListContext);
    }
    public semi(): SemiContext | null {
        return this.getRuleContext(0, SemiContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_packageHeader;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterPackageHeader) {
             listener.enterPackageHeader(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitPackageHeader) {
             listener.exitPackageHeader(this);
        }
    }
}


export class ImportListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public importHeader(): ImportHeaderContext[];
    public importHeader(i: number): ImportHeaderContext | null;
    public importHeader(i?: number): ImportHeaderContext[] | ImportHeaderContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ImportHeaderContext);
        }

        return this.getRuleContext(i, ImportHeaderContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_importList;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterImportList) {
             listener.enterImportList(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitImportList) {
             listener.exitImportList(this);
        }
    }
}


export class ImportHeaderContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(KotlinParser.IMPORT, 0)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DOT, 0);
    }
    public MULT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.MULT, 0);
    }
    public importAlias(): ImportAliasContext | null {
        return this.getRuleContext(0, ImportAliasContext);
    }
    public semi(): SemiContext | null {
        return this.getRuleContext(0, SemiContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_importHeader;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterImportHeader) {
             listener.enterImportHeader(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitImportHeader) {
             listener.exitImportHeader(this);
        }
    }
}


export class ImportAliasContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AS(): antlr.TerminalNode {
        return this.getToken(KotlinParser.AS, 0)!;
    }
    public simpleIdentifier(): SimpleIdentifierContext {
        return this.getRuleContext(0, SimpleIdentifierContext)!;
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_importAlias;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterImportAlias) {
             listener.enterImportAlias(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitImportAlias) {
             listener.exitImportAlias(this);
        }
    }
}


export class TopLevelObjectContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classDeclaration(): ClassDeclarationContext | null {
        return this.getRuleContext(0, ClassDeclarationContext);
    }
    public objectDeclaration(): ObjectDeclarationContext | null {
        return this.getRuleContext(0, ObjectDeclarationContext);
    }
    public functionDeclaration(): FunctionDeclarationContext | null {
        return this.getRuleContext(0, FunctionDeclarationContext);
    }
    public propertyDeclaration(): PropertyDeclarationContext | null {
        return this.getRuleContext(0, PropertyDeclarationContext);
    }
    public typeAlias(): TypeAliasContext | null {
        return this.getRuleContext(0, TypeAliasContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_topLevelObject;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTopLevelObject) {
             listener.enterTopLevelObject(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTopLevelObject) {
             listener.exitTopLevelObject(this);
        }
    }
}


export class ClassDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public simpleIdentifier(): SimpleIdentifierContext {
        return this.getRuleContext(0, SimpleIdentifierContext)!;
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.CLASS, 0);
    }
    public INTERFACE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.INTERFACE, 0);
    }
    public modifierList(): ModifierListContext | null {
        return this.getRuleContext(0, ModifierListContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public typeParameters(): TypeParametersContext | null {
        return this.getRuleContext(0, TypeParametersContext);
    }
    public primaryConstructor(): PrimaryConstructorContext | null {
        return this.getRuleContext(0, PrimaryConstructorContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public delegationSpecifiers(): DelegationSpecifiersContext | null {
        return this.getRuleContext(0, DelegationSpecifiersContext);
    }
    public typeConstraints(): TypeConstraintsContext | null {
        return this.getRuleContext(0, TypeConstraintsContext);
    }
    public classBody(): ClassBodyContext | null {
        return this.getRuleContext(0, ClassBodyContext);
    }
    public enumClassBody(): EnumClassBodyContext | null {
        return this.getRuleContext(0, EnumClassBodyContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_classDeclaration;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterClassDeclaration) {
             listener.enterClassDeclaration(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitClassDeclaration) {
             listener.exitClassDeclaration(this);
        }
    }
}


export class PrimaryConstructorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classParameters(): ClassParametersContext {
        return this.getRuleContext(0, ClassParametersContext)!;
    }
    public modifierList(): ModifierListContext | null {
        return this.getRuleContext(0, ModifierListContext);
    }
    public CONSTRUCTOR(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.CONSTRUCTOR, 0);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_primaryConstructor;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterPrimaryConstructor) {
             listener.enterPrimaryConstructor(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitPrimaryConstructor) {
             listener.exitPrimaryConstructor(this);
        }
    }
}


export class ClassParametersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public classParameter(): ClassParameterContext[];
    public classParameter(i: number): ClassParameterContext | null;
    public classParameter(i?: number): ClassParameterContext[] | ClassParameterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ClassParameterContext);
        }

        return this.getRuleContext(i, ClassParameterContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_classParameters;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterClassParameters) {
             listener.enterClassParameters(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitClassParameters) {
             listener.exitClassParameters(this);
        }
    }
}


export class ClassParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public simpleIdentifier(): SimpleIdentifierContext {
        return this.getRuleContext(0, SimpleIdentifierContext)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(KotlinParser.COLON, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public modifierList(): ModifierListContext | null {
        return this.getRuleContext(0, ModifierListContext);
    }
    public VAL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.VAL, 0);
    }
    public VAR(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.VAR, 0);
    }
    public ASSIGNMENT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ASSIGNMENT, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public BY(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.BY, 0);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_classParameter;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterClassParameter) {
             listener.enterClassParameter(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitClassParameter) {
             listener.exitClassParameter(this);
        }
    }
}


export class DelegationSpecifiersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public delegationSpecifier(): DelegationSpecifierContext[];
    public delegationSpecifier(i: number): DelegationSpecifierContext | null;
    public delegationSpecifier(i?: number): DelegationSpecifierContext[] | DelegationSpecifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DelegationSpecifierContext);
        }

        return this.getRuleContext(i, DelegationSpecifierContext);
    }
    public annotations(): AnnotationsContext[];
    public annotations(i: number): AnnotationsContext | null;
    public annotations(i?: number): AnnotationsContext[] | AnnotationsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationsContext);
        }

        return this.getRuleContext(i, AnnotationsContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_delegationSpecifiers;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterDelegationSpecifiers) {
             listener.enterDelegationSpecifiers(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitDelegationSpecifiers) {
             listener.exitDelegationSpecifiers(this);
        }
    }
}


export class DelegationSpecifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public constructorInvocation(): ConstructorInvocationContext | null {
        return this.getRuleContext(0, ConstructorInvocationContext);
    }
    public userType(): UserTypeContext | null {
        return this.getRuleContext(0, UserTypeContext);
    }
    public explicitDelegation(): ExplicitDelegationContext | null {
        return this.getRuleContext(0, ExplicitDelegationContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_delegationSpecifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterDelegationSpecifier) {
             listener.enterDelegationSpecifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitDelegationSpecifier) {
             listener.exitDelegationSpecifier(this);
        }
    }
}


export class ConstructorInvocationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public userType(): UserTypeContext {
        return this.getRuleContext(0, UserTypeContext)!;
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public valueArguments(): ValueArgumentsContext | null {
        return this.getRuleContext(0, ValueArgumentsContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_constructorInvocation;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterConstructorInvocation) {
             listener.enterConstructorInvocation(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitConstructorInvocation) {
             listener.exitConstructorInvocation(this);
        }
    }
}


export class ExplicitDelegationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public userType(): UserTypeContext {
        return this.getRuleContext(0, UserTypeContext)!;
    }
    public BY(): antlr.TerminalNode {
        return this.getToken(KotlinParser.BY, 0)!;
    }
    public explicitDelegationTarget(): ExplicitDelegationTargetContext {
        return this.getRuleContext(0, ExplicitDelegationTargetContext)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_explicitDelegation;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterExplicitDelegation) {
             listener.enterExplicitDelegation(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitExplicitDelegation) {
             listener.exitExplicitDelegation(this);
        }
    }
}


export class ExplicitDelegationTargetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public userType(): UserTypeContext | null {
        return this.getRuleContext(0, UserTypeContext);
    }
    public constructorInvocation(): ConstructorInvocationContext | null {
        return this.getRuleContext(0, ConstructorInvocationContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_explicitDelegationTarget;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterExplicitDelegationTarget) {
             listener.enterExplicitDelegationTarget(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitExplicitDelegationTarget) {
             listener.exitExplicitDelegationTarget(this);
        }
    }
}


export class ClassBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LCURL(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LCURL, 0)!;
    }
    public RCURL(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RCURL, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public classMemberDeclaration(): ClassMemberDeclarationContext[];
    public classMemberDeclaration(i: number): ClassMemberDeclarationContext | null;
    public classMemberDeclaration(i?: number): ClassMemberDeclarationContext[] | ClassMemberDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ClassMemberDeclarationContext);
        }

        return this.getRuleContext(i, ClassMemberDeclarationContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_classBody;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterClassBody) {
             listener.enterClassBody(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitClassBody) {
             listener.exitClassBody(this);
        }
    }
}


export class ClassMemberDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classDeclaration(): ClassDeclarationContext | null {
        return this.getRuleContext(0, ClassDeclarationContext);
    }
    public functionDeclaration(): FunctionDeclarationContext | null {
        return this.getRuleContext(0, FunctionDeclarationContext);
    }
    public objectDeclaration(): ObjectDeclarationContext | null {
        return this.getRuleContext(0, ObjectDeclarationContext);
    }
    public companionObject(): CompanionObjectContext | null {
        return this.getRuleContext(0, CompanionObjectContext);
    }
    public propertyDeclaration(): PropertyDeclarationContext | null {
        return this.getRuleContext(0, PropertyDeclarationContext);
    }
    public anonymousInitializer(): AnonymousInitializerContext | null {
        return this.getRuleContext(0, AnonymousInitializerContext);
    }
    public secondaryConstructor(): SecondaryConstructorContext | null {
        return this.getRuleContext(0, SecondaryConstructorContext);
    }
    public typeAlias(): TypeAliasContext | null {
        return this.getRuleContext(0, TypeAliasContext);
    }
    public anysemi(): AnysemiContext[];
    public anysemi(i: number): AnysemiContext | null;
    public anysemi(i?: number): AnysemiContext[] | AnysemiContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnysemiContext);
        }

        return this.getRuleContext(i, AnysemiContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_classMemberDeclaration;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterClassMemberDeclaration) {
             listener.enterClassMemberDeclaration(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitClassMemberDeclaration) {
             listener.exitClassMemberDeclaration(this);
        }
    }
}


export class AnonymousInitializerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INIT(): antlr.TerminalNode {
        return this.getToken(KotlinParser.INIT, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_anonymousInitializer;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterAnonymousInitializer) {
             listener.enterAnonymousInitializer(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitAnonymousInitializer) {
             listener.exitAnonymousInitializer(this);
        }
    }
}


export class SecondaryConstructorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CONSTRUCTOR(): antlr.TerminalNode {
        return this.getToken(KotlinParser.CONSTRUCTOR, 0)!;
    }
    public functionValueParameters(): FunctionValueParametersContext {
        return this.getRuleContext(0, FunctionValueParametersContext)!;
    }
    public modifierList(): ModifierListContext | null {
        return this.getRuleContext(0, ModifierListContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public constructorDelegationCall(): ConstructorDelegationCallContext | null {
        return this.getRuleContext(0, ConstructorDelegationCallContext);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_secondaryConstructor;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterSecondaryConstructor) {
             listener.enterSecondaryConstructor(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitSecondaryConstructor) {
             listener.exitSecondaryConstructor(this);
        }
    }
}


export class ConstructorDelegationCallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.THIS, 0);
    }
    public valueArguments(): ValueArgumentsContext {
        return this.getRuleContext(0, ValueArgumentsContext)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SUPER, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_constructorDelegationCall;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterConstructorDelegationCall) {
             listener.enterConstructorDelegationCall(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitConstructorDelegationCall) {
             listener.exitConstructorDelegationCall(this);
        }
    }
}


export class EnumClassBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LCURL(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LCURL, 0)!;
    }
    public RCURL(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RCURL, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public enumEntries(): EnumEntriesContext | null {
        return this.getRuleContext(0, EnumEntriesContext);
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SEMICOLON, 0);
    }
    public classMemberDeclaration(): ClassMemberDeclarationContext[];
    public classMemberDeclaration(i: number): ClassMemberDeclarationContext | null;
    public classMemberDeclaration(i?: number): ClassMemberDeclarationContext[] | ClassMemberDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ClassMemberDeclarationContext);
        }

        return this.getRuleContext(i, ClassMemberDeclarationContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_enumClassBody;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterEnumClassBody) {
             listener.enterEnumClassBody(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitEnumClassBody) {
             listener.exitEnumClassBody(this);
        }
    }
}


export class EnumEntriesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public enumEntry(): EnumEntryContext[];
    public enumEntry(i: number): EnumEntryContext | null;
    public enumEntry(i?: number): EnumEntryContext[] | EnumEntryContext | null {
        if (i === undefined) {
            return this.getRuleContexts(EnumEntryContext);
        }

        return this.getRuleContext(i, EnumEntryContext);
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SEMICOLON, 0);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_enumEntries;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterEnumEntries) {
             listener.enterEnumEntries(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitEnumEntries) {
             listener.exitEnumEntries(this);
        }
    }
}


export class EnumEntryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public simpleIdentifier(): SimpleIdentifierContext {
        return this.getRuleContext(0, SimpleIdentifierContext)!;
    }
    public annotations(): AnnotationsContext[];
    public annotations(i: number): AnnotationsContext | null;
    public annotations(i?: number): AnnotationsContext[] | AnnotationsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationsContext);
        }

        return this.getRuleContext(i, AnnotationsContext);
    }
    public valueArguments(): ValueArgumentsContext | null {
        return this.getRuleContext(0, ValueArgumentsContext);
    }
    public classBody(): ClassBodyContext | null {
        return this.getRuleContext(0, ClassBodyContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COMMA, 0);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_enumEntry;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterEnumEntry) {
             listener.enterEnumEntry(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitEnumEntry) {
             listener.exitEnumEntry(this);
        }
    }
}


export class FunctionDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FUN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.FUN, 0)!;
    }
    public functionValueParameters(): FunctionValueParametersContext {
        return this.getRuleContext(0, FunctionValueParametersContext)!;
    }
    public functionModifierList(): FunctionModifierListContext | null {
        return this.getRuleContext(0, FunctionModifierListContext);
    }
    public typeParameters(): TypeParametersContext | null {
        return this.getRuleContext(0, TypeParametersContext);
    }
    public receiverType(): ReceiverTypeContext | null {
        return this.getRuleContext(0, ReceiverTypeContext);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DOT, 0);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public typeConstraints(): TypeConstraintsContext | null {
        return this.getRuleContext(0, TypeConstraintsContext);
    }
    public functionBody(): FunctionBodyContext | null {
        return this.getRuleContext(0, FunctionBodyContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_functionDeclaration;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFunctionDeclaration) {
             listener.enterFunctionDeclaration(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFunctionDeclaration) {
             listener.exitFunctionDeclaration(this);
        }
    }
}


export class FunctionValueParametersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public functionValueParameter(): FunctionValueParameterContext[];
    public functionValueParameter(i: number): FunctionValueParameterContext | null;
    public functionValueParameter(i?: number): FunctionValueParameterContext[] | FunctionValueParameterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FunctionValueParameterContext);
        }

        return this.getRuleContext(i, FunctionValueParameterContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_functionValueParameters;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFunctionValueParameters) {
             listener.enterFunctionValueParameters(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFunctionValueParameters) {
             listener.exitFunctionValueParameters(this);
        }
    }
}


export class FunctionValueParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public parameter(): ParameterContext {
        return this.getRuleContext(0, ParameterContext)!;
    }
    public modifierList(): ModifierListContext | null {
        return this.getRuleContext(0, ModifierListContext);
    }
    public ASSIGNMENT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ASSIGNMENT, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_functionValueParameter;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFunctionValueParameter) {
             listener.enterFunctionValueParameter(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFunctionValueParameter) {
             listener.exitFunctionValueParameter(this);
        }
    }
}


export class ParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public simpleIdentifier(): SimpleIdentifierContext {
        return this.getRuleContext(0, SimpleIdentifierContext)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(KotlinParser.COLON, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_parameter;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterParameter) {
             listener.enterParameter(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitParameter) {
             listener.exitParameter(this);
        }
    }
}


export class ReceiverTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public parenthesizedType(): ParenthesizedTypeContext | null {
        return this.getRuleContext(0, ParenthesizedTypeContext);
    }
    public nullableType(): NullableTypeContext | null {
        return this.getRuleContext(0, NullableTypeContext);
    }
    public typeReference(): TypeReferenceContext | null {
        return this.getRuleContext(0, TypeReferenceContext);
    }
    public typeModifierList(): TypeModifierListContext | null {
        return this.getRuleContext(0, TypeModifierListContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_receiverType;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterReceiverType) {
             listener.enterReceiverType(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitReceiverType) {
             listener.exitReceiverType(this);
        }
    }
}


export class FunctionBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public ASSIGNMENT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ASSIGNMENT, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_functionBody;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFunctionBody) {
             listener.enterFunctionBody(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFunctionBody) {
             listener.exitFunctionBody(this);
        }
    }
}


export class ObjectDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(KotlinParser.OBJECT, 0)!;
    }
    public simpleIdentifier(): SimpleIdentifierContext {
        return this.getRuleContext(0, SimpleIdentifierContext)!;
    }
    public modifierList(): ModifierListContext | null {
        return this.getRuleContext(0, ModifierListContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public primaryConstructor(): PrimaryConstructorContext | null {
        return this.getRuleContext(0, PrimaryConstructorContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public delegationSpecifiers(): DelegationSpecifiersContext | null {
        return this.getRuleContext(0, DelegationSpecifiersContext);
    }
    public classBody(): ClassBodyContext | null {
        return this.getRuleContext(0, ClassBodyContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_objectDeclaration;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterObjectDeclaration) {
             listener.enterObjectDeclaration(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitObjectDeclaration) {
             listener.exitObjectDeclaration(this);
        }
    }
}


export class CompanionObjectContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COMPANION(): antlr.TerminalNode {
        return this.getToken(KotlinParser.COMPANION, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(KotlinParser.OBJECT, 0)!;
    }
    public modifierList(): ModifierListContext[];
    public modifierList(i: number): ModifierListContext | null;
    public modifierList(i?: number): ModifierListContext[] | ModifierListContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierListContext);
        }

        return this.getRuleContext(i, ModifierListContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public simpleIdentifier(): SimpleIdentifierContext | null {
        return this.getRuleContext(0, SimpleIdentifierContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public delegationSpecifiers(): DelegationSpecifiersContext | null {
        return this.getRuleContext(0, DelegationSpecifiersContext);
    }
    public classBody(): ClassBodyContext | null {
        return this.getRuleContext(0, ClassBodyContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_companionObject;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterCompanionObject) {
             listener.enterCompanionObject(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitCompanionObject) {
             listener.exitCompanionObject(this);
        }
    }
}


export class PropertyDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VAL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.VAL, 0);
    }
    public VAR(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.VAR, 0);
    }
    public modifierList(): ModifierListContext | null {
        return this.getRuleContext(0, ModifierListContext);
    }
    public typeParameters(): TypeParametersContext | null {
        return this.getRuleContext(0, TypeParametersContext);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DOT, 0);
    }
    public typeConstraints(): TypeConstraintsContext | null {
        return this.getRuleContext(0, TypeConstraintsContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public explicitBackingField(): ExplicitBackingFieldContext | null {
        return this.getRuleContext(0, ExplicitBackingFieldContext);
    }
    public multiVariableDeclaration(): MultiVariableDeclarationContext | null {
        return this.getRuleContext(0, MultiVariableDeclarationContext);
    }
    public variableDeclaration(): VariableDeclarationContext | null {
        return this.getRuleContext(0, VariableDeclarationContext);
    }
    public BY(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.BY, 0);
    }
    public ASSIGNMENT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ASSIGNMENT, 0);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public getter(): GetterContext | null {
        return this.getRuleContext(0, GetterContext);
    }
    public setter(): SetterContext | null {
        return this.getRuleContext(0, SetterContext);
    }
    public semi(): SemiContext | null {
        return this.getRuleContext(0, SemiContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_propertyDeclaration;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterPropertyDeclaration) {
             listener.enterPropertyDeclaration(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitPropertyDeclaration) {
             listener.exitPropertyDeclaration(this);
        }
    }
}


export class ExplicitBackingFieldContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FIELD(): antlr.TerminalNode {
        return this.getToken(KotlinParser.FIELD, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(KotlinParser.COLON, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public ASSIGNMENT(): antlr.TerminalNode {
        return this.getToken(KotlinParser.ASSIGNMENT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_explicitBackingField;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterExplicitBackingField) {
             listener.enterExplicitBackingField(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitExplicitBackingField) {
             listener.exitExplicitBackingField(this);
        }
    }
}


export class MultiVariableDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public variableDeclaration(): VariableDeclarationContext[];
    public variableDeclaration(i: number): VariableDeclarationContext | null;
    public variableDeclaration(i?: number): VariableDeclarationContext[] | VariableDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableDeclarationContext);
        }

        return this.getRuleContext(i, VariableDeclarationContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_multiVariableDeclaration;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterMultiVariableDeclaration) {
             listener.enterMultiVariableDeclaration(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitMultiVariableDeclaration) {
             listener.exitMultiVariableDeclaration(this);
        }
    }
}


export class VariableDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public simpleIdentifier(): SimpleIdentifierContext {
        return this.getRuleContext(0, SimpleIdentifierContext)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_variableDeclaration;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterVariableDeclaration) {
             listener.enterVariableDeclaration(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitVariableDeclaration) {
             listener.exitVariableDeclaration(this);
        }
    }
}


export class GetterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public GETTER(): antlr.TerminalNode {
        return this.getToken(KotlinParser.GETTER, 0)!;
    }
    public modifierList(): ModifierListContext | null {
        return this.getRuleContext(0, ModifierListContext);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.RPAREN, 0);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public ASSIGNMENT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ASSIGNMENT, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_getter;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterGetter) {
             listener.enterGetter(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitGetter) {
             listener.exitGetter(this);
        }
    }
}


export class SetterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SETTER(): antlr.TerminalNode {
        return this.getToken(KotlinParser.SETTER, 0)!;
    }
    public modifierList(): ModifierListContext | null {
        return this.getRuleContext(0, ModifierListContext);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.RPAREN, 0);
    }
    public functionBody(): FunctionBodyContext | null {
        return this.getRuleContext(0, FunctionBodyContext);
    }
    public simpleIdentifier(): SimpleIdentifierContext | null {
        return this.getRuleContext(0, SimpleIdentifierContext);
    }
    public parameter(): ParameterContext | null {
        return this.getRuleContext(0, ParameterContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public annotations(): AnnotationsContext[];
    public annotations(i: number): AnnotationsContext | null;
    public annotations(i?: number): AnnotationsContext[] | AnnotationsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationsContext);
        }

        return this.getRuleContext(i, AnnotationsContext);
    }
    public parameterModifier(): ParameterModifierContext[];
    public parameterModifier(i: number): ParameterModifierContext | null;
    public parameterModifier(i?: number): ParameterModifierContext[] | ParameterModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParameterModifierContext);
        }

        return this.getRuleContext(i, ParameterModifierContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_setter;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterSetter) {
             listener.enterSetter(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitSetter) {
             listener.exitSetter(this);
        }
    }
}


export class TypeAliasContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TYPE_ALIAS(): antlr.TerminalNode {
        return this.getToken(KotlinParser.TYPE_ALIAS, 0)!;
    }
    public simpleIdentifier(): SimpleIdentifierContext {
        return this.getRuleContext(0, SimpleIdentifierContext)!;
    }
    public ASSIGNMENT(): antlr.TerminalNode {
        return this.getToken(KotlinParser.ASSIGNMENT, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public modifierList(): ModifierListContext | null {
        return this.getRuleContext(0, ModifierListContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public typeParameters(): TypeParametersContext | null {
        return this.getRuleContext(0, TypeParametersContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeAlias;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeAlias) {
             listener.enterTypeAlias(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeAlias) {
             listener.exitTypeAlias(this);
        }
    }
}


export class TypeParametersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LANGLE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LANGLE, 0)!;
    }
    public typeParameter(): TypeParameterContext[];
    public typeParameter(i: number): TypeParameterContext | null;
    public typeParameter(i?: number): TypeParameterContext[] | TypeParameterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeParameterContext);
        }

        return this.getRuleContext(i, TypeParameterContext);
    }
    public RANGLE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RANGLE, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeParameters;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeParameters) {
             listener.enterTypeParameters(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeParameters) {
             listener.exitTypeParameters(this);
        }
    }
}


export class TypeParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public simpleIdentifier(): SimpleIdentifierContext | null {
        return this.getRuleContext(0, SimpleIdentifierContext);
    }
    public MULT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.MULT, 0);
    }
    public modifierList(): ModifierListContext | null {
        return this.getRuleContext(0, ModifierListContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeParameter;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeParameter) {
             listener.enterTypeParameter(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeParameter) {
             listener.exitTypeParameter(this);
        }
    }
}


export class TypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public functionType(): FunctionTypeContext | null {
        return this.getRuleContext(0, FunctionTypeContext);
    }
    public parenthesizedType(): ParenthesizedTypeContext | null {
        return this.getRuleContext(0, ParenthesizedTypeContext);
    }
    public nullableType(): NullableTypeContext | null {
        return this.getRuleContext(0, NullableTypeContext);
    }
    public typeReference(): TypeReferenceContext | null {
        return this.getRuleContext(0, TypeReferenceContext);
    }
    public typeModifierList(): TypeModifierListContext | null {
        return this.getRuleContext(0, TypeModifierListContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_type;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterType) {
             listener.enterType(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitType) {
             listener.exitType(this);
        }
    }
}


export class TypeModifierListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotations(): AnnotationsContext[];
    public annotations(i: number): AnnotationsContext | null;
    public annotations(i?: number): AnnotationsContext[] | AnnotationsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationsContext);
        }

        return this.getRuleContext(i, AnnotationsContext);
    }
    public SUSPEND(): antlr.TerminalNode[];
    public SUSPEND(i: number): antlr.TerminalNode | null;
    public SUSPEND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.SUSPEND);
    	} else {
    		return this.getToken(KotlinParser.SUSPEND, i);
    	}
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeModifierList;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeModifierList) {
             listener.enterTypeModifierList(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeModifierList) {
             listener.exitTypeModifierList(this);
        }
    }
}


export class ParenthesizedTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_parenthesizedType;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterParenthesizedType) {
             listener.enterParenthesizedType(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitParenthesizedType) {
             listener.exitParenthesizedType(this);
        }
    }
}


export class NullableTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeReference(): TypeReferenceContext | null {
        return this.getRuleContext(0, TypeReferenceContext);
    }
    public parenthesizedType(): ParenthesizedTypeContext | null {
        return this.getRuleContext(0, ParenthesizedTypeContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public QUEST(): antlr.TerminalNode[];
    public QUEST(i: number): antlr.TerminalNode | null;
    public QUEST(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.QUEST);
    	} else {
    		return this.getToken(KotlinParser.QUEST, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_nullableType;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterNullableType) {
             listener.enterNullableType(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitNullableType) {
             listener.exitNullableType(this);
        }
    }
}


export class TypeReferenceContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LPAREN, 0);
    }
    public typeReference(): TypeReferenceContext | null {
        return this.getRuleContext(0, TypeReferenceContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.RPAREN, 0);
    }
    public userType(): UserTypeContext | null {
        return this.getRuleContext(0, UserTypeContext);
    }
    public DYNAMIC(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DYNAMIC, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeReference;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeReference) {
             listener.enterTypeReference(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeReference) {
             listener.exitTypeReference(this);
        }
    }
}


export class FunctionTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public functionTypeParameters(): FunctionTypeParametersContext {
        return this.getRuleContext(0, FunctionTypeParametersContext)!;
    }
    public ARROW(): antlr.TerminalNode {
        return this.getToken(KotlinParser.ARROW, 0)!;
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public functionTypeReceiver(): FunctionTypeReceiverContext | null {
        return this.getRuleContext(0, FunctionTypeReceiverContext);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DOT, 0);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_functionType;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFunctionType) {
             listener.enterFunctionType(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFunctionType) {
             listener.exitFunctionType(this);
        }
    }
}


export class FunctionTypeReceiverContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public parenthesizedType(): ParenthesizedTypeContext | null {
        return this.getRuleContext(0, ParenthesizedTypeContext);
    }
    public nullableType(): NullableTypeContext | null {
        return this.getRuleContext(0, NullableTypeContext);
    }
    public typeReference(): TypeReferenceContext | null {
        return this.getRuleContext(0, TypeReferenceContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_functionTypeReceiver;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFunctionTypeReceiver) {
             listener.enterFunctionTypeReceiver(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFunctionTypeReceiver) {
             listener.exitFunctionTypeReceiver(this);
        }
    }
}


export class UserTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public simpleUserType(): SimpleUserTypeContext[];
    public simpleUserType(i: number): SimpleUserTypeContext | null;
    public simpleUserType(i?: number): SimpleUserTypeContext[] | SimpleUserTypeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SimpleUserTypeContext);
        }

        return this.getRuleContext(i, SimpleUserTypeContext);
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.DOT);
    	} else {
    		return this.getToken(KotlinParser.DOT, i);
    	}
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_userType;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterUserType) {
             listener.enterUserType(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitUserType) {
             listener.exitUserType(this);
        }
    }
}


export class SimpleUserTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public simpleIdentifier(): SimpleIdentifierContext {
        return this.getRuleContext(0, SimpleIdentifierContext)!;
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_simpleUserType;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterSimpleUserType) {
             listener.enterSimpleUserType(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitSimpleUserType) {
             listener.exitSimpleUserType(this);
        }
    }
}


export class FunctionTypeParametersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public parameter(): ParameterContext[];
    public parameter(i: number): ParameterContext | null;
    public parameter(i?: number): ParameterContext[] | ParameterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParameterContext);
        }

        return this.getRuleContext(i, ParameterContext);
    }
    public type_(): TypeContext[];
    public type_(i: number): TypeContext | null;
    public type_(i?: number): TypeContext[] | TypeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeContext);
        }

        return this.getRuleContext(i, TypeContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_functionTypeParameters;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFunctionTypeParameters) {
             listener.enterFunctionTypeParameters(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFunctionTypeParameters) {
             listener.exitFunctionTypeParameters(this);
        }
    }
}


export class TypeConstraintsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WHERE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.WHERE, 0)!;
    }
    public typeConstraint(): TypeConstraintContext[];
    public typeConstraint(i: number): TypeConstraintContext | null;
    public typeConstraint(i?: number): TypeConstraintContext[] | TypeConstraintContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeConstraintContext);
        }

        return this.getRuleContext(i, TypeConstraintContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeConstraints;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeConstraints) {
             listener.enterTypeConstraints(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeConstraints) {
             listener.exitTypeConstraints(this);
        }
    }
}


export class TypeConstraintContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public simpleIdentifier(): SimpleIdentifierContext {
        return this.getRuleContext(0, SimpleIdentifierContext)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(KotlinParser.COLON, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public annotations(): AnnotationsContext[];
    public annotations(i: number): AnnotationsContext | null;
    public annotations(i?: number): AnnotationsContext[] | AnnotationsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationsContext);
        }

        return this.getRuleContext(i, AnnotationsContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeConstraint;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeConstraint) {
             listener.enterTypeConstraint(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeConstraint) {
             listener.exitTypeConstraint(this);
        }
    }
}


export class BlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LCURL(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LCURL, 0)!;
    }
    public statements(): StatementsContext {
        return this.getRuleContext(0, StatementsContext)!;
    }
    public RCURL(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RCURL, 0)!;
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_block;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
}


export class StatementsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public anysemi(): AnysemiContext[];
    public anysemi(i: number): AnysemiContext | null;
    public anysemi(i?: number): AnysemiContext[] | AnysemiContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnysemiContext);
        }

        return this.getRuleContext(i, AnysemiContext);
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_statements;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterStatements) {
             listener.enterStatements(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitStatements) {
             listener.exitStatements(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public declaration(): DeclarationContext | null {
        return this.getRuleContext(0, DeclarationContext);
    }
    public blockLevelExpression(): BlockLevelExpressionContext | null {
        return this.getRuleContext(0, BlockLevelExpressionContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_statement;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
}


export class BlockLevelExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public annotations(): AnnotationsContext[];
    public annotations(i: number): AnnotationsContext | null;
    public annotations(i?: number): AnnotationsContext[] | AnnotationsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationsContext);
        }

        return this.getRuleContext(i, AnnotationsContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_blockLevelExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterBlockLevelExpression) {
             listener.enterBlockLevelExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitBlockLevelExpression) {
             listener.exitBlockLevelExpression(this);
        }
    }
}


export class DeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classDeclaration(): ClassDeclarationContext | null {
        return this.getRuleContext(0, ClassDeclarationContext);
    }
    public functionDeclaration(): FunctionDeclarationContext | null {
        return this.getRuleContext(0, FunctionDeclarationContext);
    }
    public propertyDeclaration(): PropertyDeclarationContext | null {
        return this.getRuleContext(0, PropertyDeclarationContext);
    }
    public typeAlias(): TypeAliasContext | null {
        return this.getRuleContext(0, TypeAliasContext);
    }
    public labelDefinition(): LabelDefinitionContext[];
    public labelDefinition(i: number): LabelDefinitionContext | null;
    public labelDefinition(i?: number): LabelDefinitionContext[] | LabelDefinitionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(LabelDefinitionContext);
        }

        return this.getRuleContext(i, LabelDefinitionContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_declaration;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterDeclaration) {
             listener.enterDeclaration(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitDeclaration) {
             listener.exitDeclaration(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public disjunction(): DisjunctionContext[];
    public disjunction(i: number): DisjunctionContext | null;
    public disjunction(i?: number): DisjunctionContext[] | DisjunctionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DisjunctionContext);
        }

        return this.getRuleContext(i, DisjunctionContext);
    }
    public assignmentOperator(): AssignmentOperatorContext[];
    public assignmentOperator(i: number): AssignmentOperatorContext | null;
    public assignmentOperator(i?: number): AssignmentOperatorContext[] | AssignmentOperatorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AssignmentOperatorContext);
        }

        return this.getRuleContext(i, AssignmentOperatorContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_expression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
}


export class DisjunctionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conjunction(): ConjunctionContext[];
    public conjunction(i: number): ConjunctionContext | null;
    public conjunction(i?: number): ConjunctionContext[] | ConjunctionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConjunctionContext);
        }

        return this.getRuleContext(i, ConjunctionContext);
    }
    public DISJ(): antlr.TerminalNode[];
    public DISJ(i: number): antlr.TerminalNode | null;
    public DISJ(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.DISJ);
    	} else {
    		return this.getToken(KotlinParser.DISJ, i);
    	}
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_disjunction;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterDisjunction) {
             listener.enterDisjunction(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitDisjunction) {
             listener.exitDisjunction(this);
        }
    }
}


export class ConjunctionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public equalityComparison(): EqualityComparisonContext[];
    public equalityComparison(i: number): EqualityComparisonContext | null;
    public equalityComparison(i?: number): EqualityComparisonContext[] | EqualityComparisonContext | null {
        if (i === undefined) {
            return this.getRuleContexts(EqualityComparisonContext);
        }

        return this.getRuleContext(i, EqualityComparisonContext);
    }
    public CONJ(): antlr.TerminalNode[];
    public CONJ(i: number): antlr.TerminalNode | null;
    public CONJ(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.CONJ);
    	} else {
    		return this.getToken(KotlinParser.CONJ, i);
    	}
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_conjunction;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterConjunction) {
             listener.enterConjunction(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitConjunction) {
             listener.exitConjunction(this);
        }
    }
}


export class EqualityComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public comparison(): ComparisonContext[];
    public comparison(i: number): ComparisonContext | null;
    public comparison(i?: number): ComparisonContext[] | ComparisonContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ComparisonContext);
        }

        return this.getRuleContext(i, ComparisonContext);
    }
    public equalityOperation(): EqualityOperationContext[];
    public equalityOperation(i: number): EqualityOperationContext | null;
    public equalityOperation(i?: number): EqualityOperationContext[] | EqualityOperationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(EqualityOperationContext);
        }

        return this.getRuleContext(i, EqualityOperationContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_equalityComparison;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterEqualityComparison) {
             listener.enterEqualityComparison(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitEqualityComparison) {
             listener.exitEqualityComparison(this);
        }
    }
}


export class ComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public namedInfix(): NamedInfixContext[];
    public namedInfix(i: number): NamedInfixContext | null;
    public namedInfix(i?: number): NamedInfixContext[] | NamedInfixContext | null {
        if (i === undefined) {
            return this.getRuleContexts(NamedInfixContext);
        }

        return this.getRuleContext(i, NamedInfixContext);
    }
    public comparisonOperator(): ComparisonOperatorContext | null {
        return this.getRuleContext(0, ComparisonOperatorContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_comparison;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterComparison) {
             listener.enterComparison(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitComparison) {
             listener.exitComparison(this);
        }
    }
}


export class NamedInfixContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public elvisExpression(): ElvisExpressionContext[];
    public elvisExpression(i: number): ElvisExpressionContext | null;
    public elvisExpression(i?: number): ElvisExpressionContext[] | ElvisExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ElvisExpressionContext);
        }

        return this.getRuleContext(i, ElvisExpressionContext);
    }
    public isOperator(): IsOperatorContext | null {
        return this.getRuleContext(0, IsOperatorContext);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public inOperator(): InOperatorContext[];
    public inOperator(i: number): InOperatorContext | null;
    public inOperator(i?: number): InOperatorContext[] | InOperatorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InOperatorContext);
        }

        return this.getRuleContext(i, InOperatorContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_namedInfix;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterNamedInfix) {
             listener.enterNamedInfix(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitNamedInfix) {
             listener.exitNamedInfix(this);
        }
    }
}


export class ElvisExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public infixFunctionCall(): InfixFunctionCallContext[];
    public infixFunctionCall(i: number): InfixFunctionCallContext | null;
    public infixFunctionCall(i?: number): InfixFunctionCallContext[] | InfixFunctionCallContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InfixFunctionCallContext);
        }

        return this.getRuleContext(i, InfixFunctionCallContext);
    }
    public ELVIS(): antlr.TerminalNode[];
    public ELVIS(i: number): antlr.TerminalNode | null;
    public ELVIS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.ELVIS);
    	} else {
    		return this.getToken(KotlinParser.ELVIS, i);
    	}
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_elvisExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterElvisExpression) {
             listener.enterElvisExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitElvisExpression) {
             listener.exitElvisExpression(this);
        }
    }
}


export class InfixFunctionCallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public rangeExpression(): RangeExpressionContext[];
    public rangeExpression(i: number): RangeExpressionContext | null;
    public rangeExpression(i?: number): RangeExpressionContext[] | RangeExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RangeExpressionContext);
        }

        return this.getRuleContext(i, RangeExpressionContext);
    }
    public simpleIdentifier(): SimpleIdentifierContext[];
    public simpleIdentifier(i: number): SimpleIdentifierContext | null;
    public simpleIdentifier(i?: number): SimpleIdentifierContext[] | SimpleIdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SimpleIdentifierContext);
        }

        return this.getRuleContext(i, SimpleIdentifierContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_infixFunctionCall;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterInfixFunctionCall) {
             listener.enterInfixFunctionCall(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitInfixFunctionCall) {
             listener.exitInfixFunctionCall(this);
        }
    }
}


export class RangeExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public additiveExpression(): AdditiveExpressionContext[];
    public additiveExpression(i: number): AdditiveExpressionContext | null;
    public additiveExpression(i?: number): AdditiveExpressionContext[] | AdditiveExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AdditiveExpressionContext);
        }

        return this.getRuleContext(i, AdditiveExpressionContext);
    }
    public RANGE(): antlr.TerminalNode[];
    public RANGE(i: number): antlr.TerminalNode | null;
    public RANGE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.RANGE);
    	} else {
    		return this.getToken(KotlinParser.RANGE, i);
    	}
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_rangeExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterRangeExpression) {
             listener.enterRangeExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitRangeExpression) {
             listener.exitRangeExpression(this);
        }
    }
}


export class AdditiveExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public multiplicativeExpression(): MultiplicativeExpressionContext[];
    public multiplicativeExpression(i: number): MultiplicativeExpressionContext | null;
    public multiplicativeExpression(i?: number): MultiplicativeExpressionContext[] | MultiplicativeExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MultiplicativeExpressionContext);
        }

        return this.getRuleContext(i, MultiplicativeExpressionContext);
    }
    public additiveOperator(): AdditiveOperatorContext[];
    public additiveOperator(i: number): AdditiveOperatorContext | null;
    public additiveOperator(i?: number): AdditiveOperatorContext[] | AdditiveOperatorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AdditiveOperatorContext);
        }

        return this.getRuleContext(i, AdditiveOperatorContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_additiveExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterAdditiveExpression) {
             listener.enterAdditiveExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitAdditiveExpression) {
             listener.exitAdditiveExpression(this);
        }
    }
}


export class MultiplicativeExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeRHS(): TypeRHSContext[];
    public typeRHS(i: number): TypeRHSContext | null;
    public typeRHS(i?: number): TypeRHSContext[] | TypeRHSContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeRHSContext);
        }

        return this.getRuleContext(i, TypeRHSContext);
    }
    public multiplicativeOperation(): MultiplicativeOperationContext[];
    public multiplicativeOperation(i: number): MultiplicativeOperationContext | null;
    public multiplicativeOperation(i?: number): MultiplicativeOperationContext[] | MultiplicativeOperationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MultiplicativeOperationContext);
        }

        return this.getRuleContext(i, MultiplicativeOperationContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_multiplicativeExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterMultiplicativeExpression) {
             listener.enterMultiplicativeExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitMultiplicativeExpression) {
             listener.exitMultiplicativeExpression(this);
        }
    }
}


export class TypeRHSContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public prefixUnaryExpression(): PrefixUnaryExpressionContext[];
    public prefixUnaryExpression(i: number): PrefixUnaryExpressionContext | null;
    public prefixUnaryExpression(i?: number): PrefixUnaryExpressionContext[] | PrefixUnaryExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PrefixUnaryExpressionContext);
        }

        return this.getRuleContext(i, PrefixUnaryExpressionContext);
    }
    public typeOperation(): TypeOperationContext[];
    public typeOperation(i: number): TypeOperationContext | null;
    public typeOperation(i?: number): TypeOperationContext[] | TypeOperationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeOperationContext);
        }

        return this.getRuleContext(i, TypeOperationContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeRHS;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeRHS) {
             listener.enterTypeRHS(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeRHS) {
             listener.exitTypeRHS(this);
        }
    }
}


export class PrefixUnaryExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public postfixUnaryExpression(): PostfixUnaryExpressionContext {
        return this.getRuleContext(0, PostfixUnaryExpressionContext)!;
    }
    public prefixUnaryOperation(): PrefixUnaryOperationContext[];
    public prefixUnaryOperation(i: number): PrefixUnaryOperationContext | null;
    public prefixUnaryOperation(i?: number): PrefixUnaryOperationContext[] | PrefixUnaryOperationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PrefixUnaryOperationContext);
        }

        return this.getRuleContext(i, PrefixUnaryOperationContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_prefixUnaryExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterPrefixUnaryExpression) {
             listener.enterPrefixUnaryExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitPrefixUnaryExpression) {
             listener.exitPrefixUnaryExpression(this);
        }
    }
}


export class PostfixUnaryExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public atomicExpression(): AtomicExpressionContext | null {
        return this.getRuleContext(0, AtomicExpressionContext);
    }
    public callableReference(): CallableReferenceContext | null {
        return this.getRuleContext(0, CallableReferenceContext);
    }
    public postfixUnaryOperation(): PostfixUnaryOperationContext[];
    public postfixUnaryOperation(i: number): PostfixUnaryOperationContext | null;
    public postfixUnaryOperation(i?: number): PostfixUnaryOperationContext[] | PostfixUnaryOperationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PostfixUnaryOperationContext);
        }

        return this.getRuleContext(i, PostfixUnaryOperationContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_postfixUnaryExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterPostfixUnaryExpression) {
             listener.enterPostfixUnaryExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitPostfixUnaryExpression) {
             listener.exitPostfixUnaryExpression(this);
        }
    }
}


export class AtomicExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public parenthesizedExpression(): ParenthesizedExpressionContext | null {
        return this.getRuleContext(0, ParenthesizedExpressionContext);
    }
    public literalConstant(): LiteralConstantContext | null {
        return this.getRuleContext(0, LiteralConstantContext);
    }
    public functionLiteral(): FunctionLiteralContext | null {
        return this.getRuleContext(0, FunctionLiteralContext);
    }
    public thisExpression(): ThisExpressionContext | null {
        return this.getRuleContext(0, ThisExpressionContext);
    }
    public superExpression(): SuperExpressionContext | null {
        return this.getRuleContext(0, SuperExpressionContext);
    }
    public conditionalExpression(): ConditionalExpressionContext | null {
        return this.getRuleContext(0, ConditionalExpressionContext);
    }
    public tryExpression(): TryExpressionContext | null {
        return this.getRuleContext(0, TryExpressionContext);
    }
    public objectLiteral(): ObjectLiteralContext | null {
        return this.getRuleContext(0, ObjectLiteralContext);
    }
    public jumpExpression(): JumpExpressionContext | null {
        return this.getRuleContext(0, JumpExpressionContext);
    }
    public loopExpression(): LoopExpressionContext | null {
        return this.getRuleContext(0, LoopExpressionContext);
    }
    public collectionLiteral(): CollectionLiteralContext | null {
        return this.getRuleContext(0, CollectionLiteralContext);
    }
    public simpleIdentifier(): SimpleIdentifierContext | null {
        return this.getRuleContext(0, SimpleIdentifierContext);
    }
    public VAL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.VAL, 0);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_atomicExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterAtomicExpression) {
             listener.enterAtomicExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitAtomicExpression) {
             listener.exitAtomicExpression(this);
        }
    }
}


export class ParenthesizedExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_parenthesizedExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterParenthesizedExpression) {
             listener.enterParenthesizedExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitParenthesizedExpression) {
             listener.exitParenthesizedExpression(this);
        }
    }
}


export class CallSuffixContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public valueArguments(): ValueArgumentsContext | null {
        return this.getRuleContext(0, ValueArgumentsContext);
    }
    public annotatedLambda(): AnnotatedLambdaContext[];
    public annotatedLambda(i: number): AnnotatedLambdaContext | null;
    public annotatedLambda(i?: number): AnnotatedLambdaContext[] | AnnotatedLambdaContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotatedLambdaContext);
        }

        return this.getRuleContext(i, AnnotatedLambdaContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_callSuffix;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterCallSuffix) {
             listener.enterCallSuffix(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitCallSuffix) {
             listener.exitCallSuffix(this);
        }
    }
}


export class AnnotatedLambdaContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public functionLiteral(): FunctionLiteralContext {
        return this.getRuleContext(0, FunctionLiteralContext)!;
    }
    public unescapedAnnotation(): UnescapedAnnotationContext[];
    public unescapedAnnotation(i: number): UnescapedAnnotationContext | null;
    public unescapedAnnotation(i?: number): UnescapedAnnotationContext[] | UnescapedAnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UnescapedAnnotationContext);
        }

        return this.getRuleContext(i, UnescapedAnnotationContext);
    }
    public LabelDefinition(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LabelDefinition, 0);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_annotatedLambda;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterAnnotatedLambda) {
             listener.enterAnnotatedLambda(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitAnnotatedLambda) {
             listener.exitAnnotatedLambda(this);
        }
    }
}


export class ArrayAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LSQUARE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LSQUARE, 0)!;
    }
    public RSQUARE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RSQUARE, 0)!;
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
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_arrayAccess;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterArrayAccess) {
             listener.enterArrayAccess(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitArrayAccess) {
             listener.exitArrayAccess(this);
        }
    }
}


export class ValueArgumentsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public valueArgument(): ValueArgumentContext[];
    public valueArgument(i: number): ValueArgumentContext | null;
    public valueArgument(i?: number): ValueArgumentContext[] | ValueArgumentContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ValueArgumentContext);
        }

        return this.getRuleContext(i, ValueArgumentContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_valueArguments;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterValueArguments) {
             listener.enterValueArguments(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitValueArguments) {
             listener.exitValueArguments(this);
        }
    }
}


export class TypeArgumentsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LANGLE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LANGLE, 0)!;
    }
    public typeProjection(): TypeProjectionContext[];
    public typeProjection(i: number): TypeProjectionContext | null;
    public typeProjection(i?: number): TypeProjectionContext[] | TypeProjectionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeProjectionContext);
        }

        return this.getRuleContext(i, TypeProjectionContext);
    }
    public RANGLE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RANGLE, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public QUEST(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.QUEST, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeArguments;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeArguments) {
             listener.enterTypeArguments(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeArguments) {
             listener.exitTypeArguments(this);
        }
    }
}


export class TypeProjectionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public typeProjectionModifierList(): TypeProjectionModifierListContext | null {
        return this.getRuleContext(0, TypeProjectionModifierListContext);
    }
    public MULT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.MULT, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeProjection;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeProjection) {
             listener.enterTypeProjection(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeProjection) {
             listener.exitTypeProjection(this);
        }
    }
}


export class TypeProjectionModifierListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public varianceAnnotation(): VarianceAnnotationContext[];
    public varianceAnnotation(i: number): VarianceAnnotationContext | null;
    public varianceAnnotation(i?: number): VarianceAnnotationContext[] | VarianceAnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VarianceAnnotationContext);
        }

        return this.getRuleContext(i, VarianceAnnotationContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeProjectionModifierList;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeProjectionModifierList) {
             listener.enterTypeProjectionModifierList(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeProjectionModifierList) {
             listener.exitTypeProjectionModifierList(this);
        }
    }
}


export class ValueArgumentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public simpleIdentifier(): SimpleIdentifierContext | null {
        return this.getRuleContext(0, SimpleIdentifierContext);
    }
    public ASSIGNMENT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ASSIGNMENT, 0);
    }
    public MULT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.MULT, 0);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_valueArgument;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterValueArgument) {
             listener.enterValueArgument(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitValueArgument) {
             listener.exitValueArgument(this);
        }
    }
}


export class LiteralConstantContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BooleanLiteral(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.BooleanLiteral, 0);
    }
    public IntegerLiteral(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.IntegerLiteral, 0);
    }
    public stringLiteral(): StringLiteralContext | null {
        return this.getRuleContext(0, StringLiteralContext);
    }
    public HexLiteral(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.HexLiteral, 0);
    }
    public BinLiteral(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.BinLiteral, 0);
    }
    public CharacterLiteral(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.CharacterLiteral, 0);
    }
    public RealLiteral(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.RealLiteral, 0);
    }
    public NullLiteral(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.NullLiteral, 0);
    }
    public LongLiteral(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LongLiteral, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_literalConstant;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterLiteralConstant) {
             listener.enterLiteralConstant(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitLiteralConstant) {
             listener.exitLiteralConstant(this);
        }
    }
}


export class StringLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public lineStringLiteral(): LineStringLiteralContext | null {
        return this.getRuleContext(0, LineStringLiteralContext);
    }
    public multiLineStringLiteral(): MultiLineStringLiteralContext | null {
        return this.getRuleContext(0, MultiLineStringLiteralContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_stringLiteral;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterStringLiteral) {
             listener.enterStringLiteral(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitStringLiteral) {
             listener.exitStringLiteral(this);
        }
    }
}


export class LineStringLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public QUOTE_OPEN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.QUOTE_OPEN, 0)!;
    }
    public QUOTE_CLOSE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.QUOTE_CLOSE, 0)!;
    }
    public lineStringContent(): LineStringContentContext[];
    public lineStringContent(i: number): LineStringContentContext | null;
    public lineStringContent(i?: number): LineStringContentContext[] | LineStringContentContext | null {
        if (i === undefined) {
            return this.getRuleContexts(LineStringContentContext);
        }

        return this.getRuleContext(i, LineStringContentContext);
    }
    public lineStringExpression(): LineStringExpressionContext[];
    public lineStringExpression(i: number): LineStringExpressionContext | null;
    public lineStringExpression(i?: number): LineStringExpressionContext[] | LineStringExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(LineStringExpressionContext);
        }

        return this.getRuleContext(i, LineStringExpressionContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_lineStringLiteral;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterLineStringLiteral) {
             listener.enterLineStringLiteral(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitLineStringLiteral) {
             listener.exitLineStringLiteral(this);
        }
    }
}


export class MultiLineStringLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TRIPLE_QUOTE_OPEN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.TRIPLE_QUOTE_OPEN, 0)!;
    }
    public TRIPLE_QUOTE_CLOSE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.TRIPLE_QUOTE_CLOSE, 0)!;
    }
    public multiLineStringContent(): MultiLineStringContentContext[];
    public multiLineStringContent(i: number): MultiLineStringContentContext | null;
    public multiLineStringContent(i?: number): MultiLineStringContentContext[] | MultiLineStringContentContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MultiLineStringContentContext);
        }

        return this.getRuleContext(i, MultiLineStringContentContext);
    }
    public multiLineStringExpression(): MultiLineStringExpressionContext[];
    public multiLineStringExpression(i: number): MultiLineStringExpressionContext | null;
    public multiLineStringExpression(i?: number): MultiLineStringExpressionContext[] | MultiLineStringExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MultiLineStringExpressionContext);
        }

        return this.getRuleContext(i, MultiLineStringExpressionContext);
    }
    public lineStringLiteral(): LineStringLiteralContext[];
    public lineStringLiteral(i: number): LineStringLiteralContext | null;
    public lineStringLiteral(i?: number): LineStringLiteralContext[] | LineStringLiteralContext | null {
        if (i === undefined) {
            return this.getRuleContexts(LineStringLiteralContext);
        }

        return this.getRuleContext(i, LineStringLiteralContext);
    }
    public MultiLineStringQuote(): antlr.TerminalNode[];
    public MultiLineStringQuote(i: number): antlr.TerminalNode | null;
    public MultiLineStringQuote(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.MultiLineStringQuote);
    	} else {
    		return this.getToken(KotlinParser.MultiLineStringQuote, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_multiLineStringLiteral;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterMultiLineStringLiteral) {
             listener.enterMultiLineStringLiteral(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitMultiLineStringLiteral) {
             listener.exitMultiLineStringLiteral(this);
        }
    }
}


export class LineStringContentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LineStrText(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LineStrText, 0);
    }
    public LineStrEscapedChar(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LineStrEscapedChar, 0);
    }
    public LineStrRef(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LineStrRef, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_lineStringContent;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterLineStringContent) {
             listener.enterLineStringContent(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitLineStringContent) {
             listener.exitLineStringContent(this);
        }
    }
}


export class LineStringExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LineStrExprStart(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LineStrExprStart, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RCURL(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RCURL, 0)!;
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_lineStringExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterLineStringExpression) {
             listener.enterLineStringExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitLineStringExpression) {
             listener.exitLineStringExpression(this);
        }
    }
}


export class MultiLineStringContentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MultiLineStrText(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.MultiLineStrText, 0);
    }
    public MultiLineStrEscapedChar(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.MultiLineStrEscapedChar, 0);
    }
    public MultiLineStrRef(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.MultiLineStrRef, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_multiLineStringContent;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterMultiLineStringContent) {
             listener.enterMultiLineStringContent(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitMultiLineStringContent) {
             listener.exitMultiLineStringContent(this);
        }
    }
}


export class MultiLineStringExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MultiLineStrExprStart(): antlr.TerminalNode {
        return this.getToken(KotlinParser.MultiLineStrExprStart, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RCURL(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RCURL, 0)!;
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_multiLineStringExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterMultiLineStringExpression) {
             listener.enterMultiLineStringExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitMultiLineStringExpression) {
             listener.exitMultiLineStringExpression(this);
        }
    }
}


export class FunctionLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LCURL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LCURL, 0);
    }
    public statements(): StatementsContext | null {
        return this.getRuleContext(0, StatementsContext);
    }
    public RCURL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.RCURL, 0);
    }
    public lambdaParameters(): LambdaParametersContext | null {
        return this.getRuleContext(0, LambdaParametersContext);
    }
    public ARROW(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ARROW, 0);
    }
    public annotations(): AnnotationsContext[];
    public annotations(i: number): AnnotationsContext | null;
    public annotations(i?: number): AnnotationsContext[] | AnnotationsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationsContext);
        }

        return this.getRuleContext(i, AnnotationsContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_functionLiteral;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFunctionLiteral) {
             listener.enterFunctionLiteral(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFunctionLiteral) {
             listener.exitFunctionLiteral(this);
        }
    }
}


export class LambdaParametersContext extends antlr.ParserRuleContext {
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
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_lambdaParameters;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterLambdaParameters) {
             listener.enterLambdaParameters(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitLambdaParameters) {
             listener.exitLambdaParameters(this);
        }
    }
}


export class LambdaParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public variableDeclaration(): VariableDeclarationContext | null {
        return this.getRuleContext(0, VariableDeclarationContext);
    }
    public multiVariableDeclaration(): MultiVariableDeclarationContext | null {
        return this.getRuleContext(0, MultiVariableDeclarationContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_lambdaParameter;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterLambdaParameter) {
             listener.enterLambdaParameter(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitLambdaParameter) {
             listener.exitLambdaParameter(this);
        }
    }
}


export class ObjectLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(KotlinParser.OBJECT, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public delegationSpecifiers(): DelegationSpecifiersContext | null {
        return this.getRuleContext(0, DelegationSpecifiersContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public classBody(): ClassBodyContext | null {
        return this.getRuleContext(0, ClassBodyContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_objectLiteral;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterObjectLiteral) {
             listener.enterObjectLiteral(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitObjectLiteral) {
             listener.exitObjectLiteral(this);
        }
    }
}


export class CollectionLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LSQUARE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LSQUARE, 0)!;
    }
    public RSQUARE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RSQUARE, 0)!;
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
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_collectionLiteral;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterCollectionLiteral) {
             listener.enterCollectionLiteral(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitCollectionLiteral) {
             listener.exitCollectionLiteral(this);
        }
    }
}


export class ThisExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public THIS(): antlr.TerminalNode {
        return this.getToken(KotlinParser.THIS, 0)!;
    }
    public LabelReference(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LabelReference, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_thisExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterThisExpression) {
             listener.enterThisExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitThisExpression) {
             listener.exitThisExpression(this);
        }
    }
}


export class SuperExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SUPER(): antlr.TerminalNode {
        return this.getToken(KotlinParser.SUPER, 0)!;
    }
    public LANGLE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LANGLE, 0);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public RANGLE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.RANGLE, 0);
    }
    public LabelReference(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LabelReference, 0);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_superExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterSuperExpression) {
             listener.enterSuperExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitSuperExpression) {
             listener.exitSuperExpression(this);
        }
    }
}


export class ConditionalExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ifExpression(): IfExpressionContext | null {
        return this.getRuleContext(0, IfExpressionContext);
    }
    public whenExpression(): WhenExpressionContext | null {
        return this.getRuleContext(0, WhenExpressionContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_conditionalExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterConditionalExpression) {
             listener.enterConditionalExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitConditionalExpression) {
             listener.exitConditionalExpression(this);
        }
    }
}


export class IfExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(KotlinParser.IF, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public controlStructureBody(): ControlStructureBodyContext[];
    public controlStructureBody(i: number): ControlStructureBodyContext | null;
    public controlStructureBody(i?: number): ControlStructureBodyContext[] | ControlStructureBodyContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ControlStructureBodyContext);
        }

        return this.getRuleContext(i, ControlStructureBodyContext);
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SEMICOLON, 0);
    }
    public ELSE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ELSE, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_ifExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterIfExpression) {
             listener.enterIfExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitIfExpression) {
             listener.exitIfExpression(this);
        }
    }
}


export class ControlStructureBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_controlStructureBody;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterControlStructureBody) {
             listener.enterControlStructureBody(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitControlStructureBody) {
             listener.exitControlStructureBody(this);
        }
    }
}


export class WhenExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WHEN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.WHEN, 0)!;
    }
    public LCURL(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LCURL, 0)!;
    }
    public RCURL(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RCURL, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LPAREN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.RPAREN, 0);
    }
    public whenEntry(): WhenEntryContext[];
    public whenEntry(i: number): WhenEntryContext | null;
    public whenEntry(i?: number): WhenEntryContext[] | WhenEntryContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WhenEntryContext);
        }

        return this.getRuleContext(i, WhenEntryContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_whenExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterWhenExpression) {
             listener.enterWhenExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitWhenExpression) {
             listener.exitWhenExpression(this);
        }
    }
}


export class WhenEntryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public whenCondition(): WhenConditionContext[];
    public whenCondition(i: number): WhenConditionContext | null;
    public whenCondition(i?: number): WhenConditionContext[] | WhenConditionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WhenConditionContext);
        }

        return this.getRuleContext(i, WhenConditionContext);
    }
    public ARROW(): antlr.TerminalNode {
        return this.getToken(KotlinParser.ARROW, 0)!;
    }
    public controlStructureBody(): ControlStructureBodyContext {
        return this.getRuleContext(0, ControlStructureBodyContext)!;
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public semi(): SemiContext | null {
        return this.getRuleContext(0, SemiContext);
    }
    public ELSE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ELSE, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_whenEntry;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterWhenEntry) {
             listener.enterWhenEntry(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitWhenEntry) {
             listener.exitWhenEntry(this);
        }
    }
}


export class WhenConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public rangeTest(): RangeTestContext | null {
        return this.getRuleContext(0, RangeTestContext);
    }
    public typeTest(): TypeTestContext | null {
        return this.getRuleContext(0, TypeTestContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_whenCondition;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterWhenCondition) {
             listener.enterWhenCondition(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitWhenCondition) {
             listener.exitWhenCondition(this);
        }
    }
}


export class RangeTestContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public inOperator(): InOperatorContext {
        return this.getRuleContext(0, InOperatorContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_rangeTest;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterRangeTest) {
             listener.enterRangeTest(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitRangeTest) {
             listener.exitRangeTest(this);
        }
    }
}


export class TypeTestContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public isOperator(): IsOperatorContext {
        return this.getRuleContext(0, IsOperatorContext)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeTest;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeTest) {
             listener.enterTypeTest(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeTest) {
             listener.exitTypeTest(this);
        }
    }
}


export class TryExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TRY(): antlr.TerminalNode {
        return this.getToken(KotlinParser.TRY, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public catchBlock(): CatchBlockContext[];
    public catchBlock(i: number): CatchBlockContext | null;
    public catchBlock(i?: number): CatchBlockContext[] | CatchBlockContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CatchBlockContext);
        }

        return this.getRuleContext(i, CatchBlockContext);
    }
    public finallyBlock(): FinallyBlockContext | null {
        return this.getRuleContext(0, FinallyBlockContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_tryExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTryExpression) {
             listener.enterTryExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTryExpression) {
             listener.exitTryExpression(this);
        }
    }
}


export class CatchBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CATCH(): antlr.TerminalNode {
        return this.getToken(KotlinParser.CATCH, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public simpleIdentifier(): SimpleIdentifierContext {
        return this.getRuleContext(0, SimpleIdentifierContext)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(KotlinParser.COLON, 0)!;
    }
    public userType(): UserTypeContext {
        return this.getRuleContext(0, UserTypeContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public annotations(): AnnotationsContext[];
    public annotations(i: number): AnnotationsContext | null;
    public annotations(i?: number): AnnotationsContext[] | AnnotationsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationsContext);
        }

        return this.getRuleContext(i, AnnotationsContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_catchBlock;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterCatchBlock) {
             listener.enterCatchBlock(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitCatchBlock) {
             listener.exitCatchBlock(this);
        }
    }
}


export class FinallyBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FINALLY(): antlr.TerminalNode {
        return this.getToken(KotlinParser.FINALLY, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_finallyBlock;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFinallyBlock) {
             listener.enterFinallyBlock(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFinallyBlock) {
             listener.exitFinallyBlock(this);
        }
    }
}


export class LoopExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public forExpression(): ForExpressionContext | null {
        return this.getRuleContext(0, ForExpressionContext);
    }
    public whileExpression(): WhileExpressionContext | null {
        return this.getRuleContext(0, WhileExpressionContext);
    }
    public doWhileExpression(): DoWhileExpressionContext | null {
        return this.getRuleContext(0, DoWhileExpressionContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_loopExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterLoopExpression) {
             listener.enterLoopExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitLoopExpression) {
             listener.exitLoopExpression(this);
        }
    }
}


export class ForExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(KotlinParser.FOR, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.IN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public variableDeclaration(): VariableDeclarationContext | null {
        return this.getRuleContext(0, VariableDeclarationContext);
    }
    public multiVariableDeclaration(): MultiVariableDeclarationContext | null {
        return this.getRuleContext(0, MultiVariableDeclarationContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public annotations(): AnnotationsContext[];
    public annotations(i: number): AnnotationsContext | null;
    public annotations(i?: number): AnnotationsContext[] | AnnotationsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationsContext);
        }

        return this.getRuleContext(i, AnnotationsContext);
    }
    public controlStructureBody(): ControlStructureBodyContext | null {
        return this.getRuleContext(0, ControlStructureBodyContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_forExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterForExpression) {
             listener.enterForExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitForExpression) {
             listener.exitForExpression(this);
        }
    }
}


export class WhileExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.WHILE, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public controlStructureBody(): ControlStructureBodyContext | null {
        return this.getRuleContext(0, ControlStructureBodyContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_whileExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterWhileExpression) {
             listener.enterWhileExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitWhileExpression) {
             listener.exitWhileExpression(this);
        }
    }
}


export class DoWhileExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DO(): antlr.TerminalNode {
        return this.getToken(KotlinParser.DO, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.WHILE, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public controlStructureBody(): ControlStructureBodyContext | null {
        return this.getRuleContext(0, ControlStructureBodyContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_doWhileExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterDoWhileExpression) {
             listener.enterDoWhileExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitDoWhileExpression) {
             listener.exitDoWhileExpression(this);
        }
    }
}


export class JumpExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public THROW(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.THROW, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public RETURN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.RETURN, 0);
    }
    public RETURN_AT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.RETURN_AT, 0);
    }
    public CONTINUE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.CONTINUE, 0);
    }
    public CONTINUE_AT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.CONTINUE_AT, 0);
    }
    public BREAK(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.BREAK, 0);
    }
    public BREAK_AT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.BREAK_AT, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_jumpExpression;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterJumpExpression) {
             listener.enterJumpExpression(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitJumpExpression) {
             listener.exitJumpExpression(this);
        }
    }
}


export class CallableReferenceContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COLONCOLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLONCOLON, 0);
    }
    public Q_COLONCOLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.Q_COLONCOLON, 0);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.CLASS, 0);
    }
    public userType(): UserTypeContext | null {
        return this.getRuleContext(0, UserTypeContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public QUEST(): antlr.TerminalNode[];
    public QUEST(i: number): antlr.TerminalNode | null;
    public QUEST(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.QUEST);
    	} else {
    		return this.getToken(KotlinParser.QUEST, i);
    	}
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.THIS, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_callableReference;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterCallableReference) {
             listener.enterCallableReference(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitCallableReference) {
             listener.exitCallableReference(this);
        }
    }
}


export class AssignmentOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ASSIGNMENT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ASSIGNMENT, 0);
    }
    public ADD_ASSIGNMENT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ADD_ASSIGNMENT, 0);
    }
    public SUB_ASSIGNMENT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SUB_ASSIGNMENT, 0);
    }
    public MULT_ASSIGNMENT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.MULT_ASSIGNMENT, 0);
    }
    public DIV_ASSIGNMENT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DIV_ASSIGNMENT, 0);
    }
    public MOD_ASSIGNMENT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.MOD_ASSIGNMENT, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_assignmentOperator;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterAssignmentOperator) {
             listener.enterAssignmentOperator(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitAssignmentOperator) {
             listener.exitAssignmentOperator(this);
        }
    }
}


export class EqualityOperationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EXCL_EQ(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.EXCL_EQ, 0);
    }
    public EXCL_EQEQ(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.EXCL_EQEQ, 0);
    }
    public EQEQ(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.EQEQ, 0);
    }
    public EQEQEQ(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.EQEQEQ, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_equalityOperation;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterEqualityOperation) {
             listener.enterEqualityOperation(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitEqualityOperation) {
             listener.exitEqualityOperation(this);
        }
    }
}


export class ComparisonOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LANGLE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LANGLE, 0);
    }
    public RANGLE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.RANGLE, 0);
    }
    public LE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LE, 0);
    }
    public GE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.GE, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_comparisonOperator;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterComparisonOperator) {
             listener.enterComparisonOperator(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitComparisonOperator) {
             listener.exitComparisonOperator(this);
        }
    }
}


export class InOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.IN, 0);
    }
    public NOT_IN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.NOT_IN, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_inOperator;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterInOperator) {
             listener.enterInOperator(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitInOperator) {
             listener.exitInOperator(this);
        }
    }
}


export class IsOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IS(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.IS, 0);
    }
    public NOT_IS(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.NOT_IS, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_isOperator;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterIsOperator) {
             listener.enterIsOperator(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitIsOperator) {
             listener.exitIsOperator(this);
        }
    }
}


export class AdditiveOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ADD(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ADD, 0);
    }
    public SUB(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SUB, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_additiveOperator;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterAdditiveOperator) {
             listener.enterAdditiveOperator(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitAdditiveOperator) {
             listener.exitAdditiveOperator(this);
        }
    }
}


export class MultiplicativeOperationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MULT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.MULT, 0);
    }
    public DIV(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DIV, 0);
    }
    public MOD(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.MOD, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_multiplicativeOperation;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterMultiplicativeOperation) {
             listener.enterMultiplicativeOperation(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitMultiplicativeOperation) {
             listener.exitMultiplicativeOperation(this);
        }
    }
}


export class TypeOperationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AS(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.AS, 0);
    }
    public AS_SAFE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.AS_SAFE, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeOperation;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeOperation) {
             listener.enterTypeOperation(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeOperation) {
             listener.exitTypeOperation(this);
        }
    }
}


export class PrefixUnaryOperationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INCR(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.INCR, 0);
    }
    public DECR(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DECR, 0);
    }
    public ADD(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ADD, 0);
    }
    public SUB(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SUB, 0);
    }
    public EXCL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.EXCL, 0);
    }
    public annotations(): AnnotationsContext | null {
        return this.getRuleContext(0, AnnotationsContext);
    }
    public labelDefinition(): LabelDefinitionContext | null {
        return this.getRuleContext(0, LabelDefinitionContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_prefixUnaryOperation;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterPrefixUnaryOperation) {
             listener.enterPrefixUnaryOperation(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitPrefixUnaryOperation) {
             listener.exitPrefixUnaryOperation(this);
        }
    }
}


export class PostfixUnaryOperationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INCR(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.INCR, 0);
    }
    public DECR(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DECR, 0);
    }
    public EXCL(): antlr.TerminalNode[];
    public EXCL(i: number): antlr.TerminalNode | null;
    public EXCL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.EXCL);
    	} else {
    		return this.getToken(KotlinParser.EXCL, i);
    	}
    }
    public callSuffix(): CallSuffixContext | null {
        return this.getRuleContext(0, CallSuffixContext);
    }
    public arrayAccess(): ArrayAccessContext | null {
        return this.getRuleContext(0, ArrayAccessContext);
    }
    public memberAccessOperator(): MemberAccessOperatorContext | null {
        return this.getRuleContext(0, MemberAccessOperatorContext);
    }
    public postfixUnaryExpression(): PostfixUnaryExpressionContext | null {
        return this.getRuleContext(0, PostfixUnaryExpressionContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_postfixUnaryOperation;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterPostfixUnaryOperation) {
             listener.enterPostfixUnaryOperation(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitPostfixUnaryOperation) {
             listener.exitPostfixUnaryOperation(this);
        }
    }
}


export class MemberAccessOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(KotlinParser.DOT, 0)!;
    }
    public QUEST(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.QUEST, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_memberAccessOperator;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterMemberAccessOperator) {
             listener.enterMemberAccessOperator(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitMemberAccessOperator) {
             listener.exitMemberAccessOperator(this);
        }
    }
}


export class ModifierListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotations(): AnnotationsContext[];
    public annotations(i: number): AnnotationsContext | null;
    public annotations(i?: number): AnnotationsContext[] | AnnotationsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationsContext);
        }

        return this.getRuleContext(i, AnnotationsContext);
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_modifierList;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterModifierList) {
             listener.enterModifierList(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitModifierList) {
             listener.exitModifierList(this);
        }
    }
}


export class FunctionModifierListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotations(): AnnotationsContext[];
    public annotations(i: number): AnnotationsContext | null;
    public annotations(i?: number): AnnotationsContext[] | AnnotationsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AnnotationsContext);
        }

        return this.getRuleContext(i, AnnotationsContext);
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public contextModifier(): ContextModifierContext[];
    public contextModifier(i: number): ContextModifierContext | null;
    public contextModifier(i?: number): ContextModifierContext[] | ContextModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ContextModifierContext);
        }

        return this.getRuleContext(i, ContextModifierContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_functionModifierList;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFunctionModifierList) {
             listener.enterFunctionModifierList(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFunctionModifierList) {
             listener.exitFunctionModifierList(this);
        }
    }
}


export class ContextParametersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RPAREN, 0)!;
    }
    public parameter(): ParameterContext[];
    public parameter(i: number): ParameterContext | null;
    public parameter(i?: number): ParameterContext[] | ParameterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParameterContext);
        }

        return this.getRuleContext(i, ParameterContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.COMMA);
    	} else {
    		return this.getToken(KotlinParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_contextParameters;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterContextParameters) {
             listener.enterContextParameters(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitContextParameters) {
             listener.exitContextParameters(this);
        }
    }
}


export class ContextModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CONTEXT(): antlr.TerminalNode {
        return this.getToken(KotlinParser.CONTEXT, 0)!;
    }
    public contextParameters(): ContextParametersContext {
        return this.getRuleContext(0, ContextParametersContext)!;
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_contextModifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterContextModifier) {
             listener.enterContextModifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitContextModifier) {
             listener.exitContextModifier(this);
        }
    }
}


export class ModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classModifier(): ClassModifierContext | null {
        return this.getRuleContext(0, ClassModifierContext);
    }
    public memberModifier(): MemberModifierContext | null {
        return this.getRuleContext(0, MemberModifierContext);
    }
    public visibilityModifier(): VisibilityModifierContext | null {
        return this.getRuleContext(0, VisibilityModifierContext);
    }
    public varianceAnnotation(): VarianceAnnotationContext | null {
        return this.getRuleContext(0, VarianceAnnotationContext);
    }
    public functionModifier(): FunctionModifierContext | null {
        return this.getRuleContext(0, FunctionModifierContext);
    }
    public propertyModifier(): PropertyModifierContext | null {
        return this.getRuleContext(0, PropertyModifierContext);
    }
    public inheritanceModifier(): InheritanceModifierContext | null {
        return this.getRuleContext(0, InheritanceModifierContext);
    }
    public parameterModifier(): ParameterModifierContext | null {
        return this.getRuleContext(0, ParameterModifierContext);
    }
    public typeParameterModifier(): TypeParameterModifierContext | null {
        return this.getRuleContext(0, TypeParameterModifierContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_modifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterModifier) {
             listener.enterModifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitModifier) {
             listener.exitModifier(this);
        }
    }
}


export class ClassModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ENUM(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ENUM, 0);
    }
    public SEALED(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SEALED, 0);
    }
    public ANNOTATION(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ANNOTATION, 0);
    }
    public DATA(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DATA, 0);
    }
    public INNER(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.INNER, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_classModifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterClassModifier) {
             listener.enterClassModifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitClassModifier) {
             listener.exitClassModifier(this);
        }
    }
}


export class MemberModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OVERRIDE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.OVERRIDE, 0);
    }
    public LATEINIT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LATEINIT, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_memberModifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterMemberModifier) {
             listener.enterMemberModifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitMemberModifier) {
             listener.exitMemberModifier(this);
        }
    }
}


export class VisibilityModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.PUBLIC, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.PRIVATE, 0);
    }
    public INTERNAL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.INTERNAL, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.PROTECTED, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_visibilityModifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterVisibilityModifier) {
             listener.enterVisibilityModifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitVisibilityModifier) {
             listener.exitVisibilityModifier(this);
        }
    }
}


export class VarianceAnnotationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.IN, 0);
    }
    public OUT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.OUT, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_varianceAnnotation;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterVarianceAnnotation) {
             listener.enterVarianceAnnotation(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitVarianceAnnotation) {
             listener.exitVarianceAnnotation(this);
        }
    }
}


export class FunctionModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TAILREC(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.TAILREC, 0);
    }
    public OPERATOR(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.OPERATOR, 0);
    }
    public INFIX(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.INFIX, 0);
    }
    public INLINE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.INLINE, 0);
    }
    public EXTERNAL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.EXTERNAL, 0);
    }
    public SUSPEND(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SUSPEND, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_functionModifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterFunctionModifier) {
             listener.enterFunctionModifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitFunctionModifier) {
             listener.exitFunctionModifier(this);
        }
    }
}


export class PropertyModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(KotlinParser.CONST, 0)!;
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_propertyModifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterPropertyModifier) {
             listener.enterPropertyModifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitPropertyModifier) {
             listener.exitPropertyModifier(this);
        }
    }
}


export class InheritanceModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ABSTRACT, 0);
    }
    public FINAL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.FINAL, 0);
    }
    public OPEN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.OPEN, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_inheritanceModifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterInheritanceModifier) {
             listener.enterInheritanceModifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitInheritanceModifier) {
             listener.exitInheritanceModifier(this);
        }
    }
}


export class ParameterModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VARARG(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.VARARG, 0);
    }
    public NOINLINE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.NOINLINE, 0);
    }
    public CROSSINLINE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.CROSSINLINE, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_parameterModifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterParameterModifier) {
             listener.enterParameterModifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitParameterModifier) {
             listener.exitParameterModifier(this);
        }
    }
}


export class TypeParameterModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public REIFIED(): antlr.TerminalNode {
        return this.getToken(KotlinParser.REIFIED, 0)!;
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_typeParameterModifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterTypeParameterModifier) {
             listener.enterTypeParameterModifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitTypeParameterModifier) {
             listener.exitTypeParameterModifier(this);
        }
    }
}


export class LabelDefinitionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LabelDefinition(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LabelDefinition, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_labelDefinition;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterLabelDefinition) {
             listener.enterLabelDefinition(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitLabelDefinition) {
             listener.exitLabelDefinition(this);
        }
    }
}


export class AnnotationsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotation(): AnnotationContext | null {
        return this.getRuleContext(0, AnnotationContext);
    }
    public annotationList(): AnnotationListContext | null {
        return this.getRuleContext(0, AnnotationListContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_annotations;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterAnnotations) {
             listener.enterAnnotations(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitAnnotations) {
             listener.exitAnnotations(this);
        }
    }
}


export class AnnotationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotationUseSiteTarget(): AnnotationUseSiteTargetContext | null {
        return this.getRuleContext(0, AnnotationUseSiteTargetContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public unescapedAnnotation(): UnescapedAnnotationContext | null {
        return this.getRuleContext(0, UnescapedAnnotationContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public LabelReference(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LabelReference, 0);
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.DOT);
    	} else {
    		return this.getToken(KotlinParser.DOT, i);
    	}
    }
    public simpleIdentifier(): SimpleIdentifierContext[];
    public simpleIdentifier(i: number): SimpleIdentifierContext | null;
    public simpleIdentifier(i?: number): SimpleIdentifierContext[] | SimpleIdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SimpleIdentifierContext);
        }

        return this.getRuleContext(i, SimpleIdentifierContext);
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public valueArguments(): ValueArgumentsContext | null {
        return this.getRuleContext(0, ValueArgumentsContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_annotation;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterAnnotation) {
             listener.enterAnnotation(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitAnnotation) {
             listener.exitAnnotation(this);
        }
    }
}


export class AnnotationListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public annotationUseSiteTarget(): AnnotationUseSiteTargetContext | null {
        return this.getRuleContext(0, AnnotationUseSiteTargetContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COLON, 0);
    }
    public LSQUARE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.LSQUARE, 0)!;
    }
    public RSQUARE(): antlr.TerminalNode {
        return this.getToken(KotlinParser.RSQUARE, 0)!;
    }
    public unescapedAnnotation(): UnescapedAnnotationContext[];
    public unescapedAnnotation(i: number): UnescapedAnnotationContext | null;
    public unescapedAnnotation(i?: number): UnescapedAnnotationContext[] | UnescapedAnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UnescapedAnnotationContext);
        }

        return this.getRuleContext(i, UnescapedAnnotationContext);
    }
    public AT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.AT, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_annotationList;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterAnnotationList) {
             listener.enterAnnotationList(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitAnnotationList) {
             listener.exitAnnotationList(this);
        }
    }
}


export class AnnotationUseSiteTargetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FIELD_SITE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.FIELD_SITE, 0);
    }
    public FILE_SITE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.FILE_SITE, 0);
    }
    public PROPERTY_SITE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.PROPERTY_SITE, 0);
    }
    public GET_SITE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.GET_SITE, 0);
    }
    public SET_SITE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SET_SITE, 0);
    }
    public RECEIVER_SITE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.RECEIVER_SITE, 0);
    }
    public PARAM_SITE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.PARAM_SITE, 0);
    }
    public SETPARAM_SITE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SETPARAM_SITE, 0);
    }
    public DELEGATE_SITE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DELEGATE_SITE, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_annotationUseSiteTarget;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterAnnotationUseSiteTarget) {
             listener.enterAnnotationUseSiteTarget(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitAnnotationUseSiteTarget) {
             listener.exitAnnotationUseSiteTarget(this);
        }
    }
}


export class UnescapedAnnotationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public typeArguments(): TypeArgumentsContext | null {
        return this.getRuleContext(0, TypeArgumentsContext);
    }
    public valueArguments(): ValueArgumentsContext | null {
        return this.getRuleContext(0, ValueArgumentsContext);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_unescapedAnnotation;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterUnescapedAnnotation) {
             listener.enterUnescapedAnnotation(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitUnescapedAnnotation) {
             listener.exitUnescapedAnnotation(this);
        }
    }
}


export class IdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public simpleIdentifier(): SimpleIdentifierContext[];
    public simpleIdentifier(i: number): SimpleIdentifierContext | null;
    public simpleIdentifier(i?: number): SimpleIdentifierContext[] | SimpleIdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SimpleIdentifierContext);
        }

        return this.getRuleContext(i, SimpleIdentifierContext);
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.DOT);
    	} else {
    		return this.getToken(KotlinParser.DOT, i);
    	}
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_identifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterIdentifier) {
             listener.enterIdentifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitIdentifier) {
             listener.exitIdentifier(this);
        }
    }
}


export class SimpleIdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.Identifier, 0);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ABSTRACT, 0);
    }
    public ANNOTATION(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ANNOTATION, 0);
    }
    public BY(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.BY, 0);
    }
    public CATCH(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.CATCH, 0);
    }
    public CONTEXT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.CONTEXT, 0);
    }
    public COMPANION(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.COMPANION, 0);
    }
    public CONSTRUCTOR(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.CONSTRUCTOR, 0);
    }
    public CROSSINLINE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.CROSSINLINE, 0);
    }
    public DATA(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DATA, 0);
    }
    public DYNAMIC(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.DYNAMIC, 0);
    }
    public ENUM(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.ENUM, 0);
    }
    public EXTERNAL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.EXTERNAL, 0);
    }
    public FIELD(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.FIELD, 0);
    }
    public FINAL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.FINAL, 0);
    }
    public FINALLY(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.FINALLY, 0);
    }
    public GETTER(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.GETTER, 0);
    }
    public IMPORT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.IMPORT, 0);
    }
    public INFIX(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.INFIX, 0);
    }
    public INIT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.INIT, 0);
    }
    public INLINE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.INLINE, 0);
    }
    public INNER(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.INNER, 0);
    }
    public INTERNAL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.INTERNAL, 0);
    }
    public LATEINIT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.LATEINIT, 0);
    }
    public NOINLINE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.NOINLINE, 0);
    }
    public OPEN(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.OPEN, 0);
    }
    public OPERATOR(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.OPERATOR, 0);
    }
    public OUT(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.OUT, 0);
    }
    public OVERRIDE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.OVERRIDE, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.PRIVATE, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.PROTECTED, 0);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.PUBLIC, 0);
    }
    public REIFIED(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.REIFIED, 0);
    }
    public SEALED(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SEALED, 0);
    }
    public TAILREC(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.TAILREC, 0);
    }
    public SETTER(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SETTER, 0);
    }
    public VARARG(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.VARARG, 0);
    }
    public WHERE(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.WHERE, 0);
    }
    public CONST(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.CONST, 0);
    }
    public SUSPEND(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SUSPEND, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_simpleIdentifier;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterSimpleIdentifier) {
             listener.enterSimpleIdentifier(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitSimpleIdentifier) {
             listener.exitSimpleIdentifier(this);
        }
    }
}


export class SemiContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(KotlinParser.NL);
    	} else {
    		return this.getToken(KotlinParser.NL, i);
    	}
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SEMICOLON, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_semi;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterSemi) {
             listener.enterSemi(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitSemi) {
             listener.exitSemi(this);
        }
    }
}


export class AnysemiContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NL(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.NL, 0);
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(KotlinParser.SEMICOLON, 0);
    }
    public override get ruleIndex(): number {
        return KotlinParser.RULE_anysemi;
    }
    public override enterRule(listener: KotlinParserListener): void {
        if(listener.enterAnysemi) {
             listener.enterAnysemi(this);
        }
    }
    public override exitRule(listener: KotlinParserListener): void {
        if(listener.exitAnysemi) {
             listener.exitAnysemi(this);
        }
    }
}
