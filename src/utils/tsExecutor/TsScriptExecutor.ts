import ts, {type SourceFile} from 'typescript';
import {createDefaultMapFromCDN, createSystem, createVirtualCompilerHost} from "@typescript/vfs";
import {editor, MarkerSeverity} from "monaco-editor";
import {scriptTypeDeclares, type ScriptTypeMap, type ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";
import message from "@/components/message/Message.vue";
import {translate} from "@/store/i18nStore.ts";
import {getTypeDeclareFiles} from "@/components/code/language/typescript.ts";

type IMarkerData = editor.IMarkerData

export const dangerousText = Object.freeze([
    "@ts-ignore",
    "@ts-nocheck",
])

export const dangerousTypeTokens = Object.freeze([
    'any',
    'unknown',
    'never',
]);

export const dangerousTypeTokensSet = Object.freeze(new Set(dangerousTypeTokens));

export const forbiddenGlobal = Object.freeze([
    'import',
    'export',
    'require',
    'alert',
    'prompt',
    'confirm',
    'eval',
    'Function',
    'Promise',
    'URL',
    'encodeURIComponent',
    'decodeURIComponent',
    'URLSearchParams',
    'window',
    'document',
    'globalThis',
    'fetch',
    'XMLHttpRequest',
    'WebSocket',
    'Storage',
    'localStorage',
    'sessionStorage',
    'indexedDB',
    'location',
    'history',
    'navigator',
    'Worker',
    'debugger',
])

export const forbiddenGlobalSet = Object.freeze(new Set(forbiddenGlobal))

// 创建安全的全局环境
const safeGlobalEnv = Object.freeze({
    Math,
    Date,
    String,
    Number,
    Boolean,
    Array,
    Object,
    Map,
    WeakMap,
    Set,
    WeakSet,
    RegExp,
    JSON,
    Error,
    parseInt,
    parseFloat,
    isNaN,
    NaN,
    isFinite,
    Infinity,
    console,
    Reflect,
    Proxy,
    DataView,
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    BigInt,
    BigInt64Array,
    BigUint64Array,
    TextEncoder,
    TextDecoder,
    atob,
    btoa,
})

// 使用 Proxy 拦截所有属性访问
const proxiedEnv = Object.freeze(new Proxy({}, {
    has: () => true, // 让 with 语句认为所有属性都存在
    get: (_, prop) => {
        // 如果是禁止的属性，返回 null
        if (forbiddenGlobalSet.has(String(prop))) {
            return null
        }
        // 否则从安全环境中获取
        return (safeGlobalEnv as any)[prop];
    }
}))

// 创建编译器选项
const compilerOptions = Object.freeze({
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    strict: true,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    baseUrl: "./",
})

type TsProgram = {
    updateFile: (sourceFile: SourceFile) => boolean
    deleteFile: (sourceFile: SourceFile) => boolean
    compilerHost: ts.CompilerHost
    program: ts.Program
}
let tsProgramCache: TsProgram | null = null

let tsProgramInitPromise: Promise<TsProgram> | null = null

const scriptCodeFileName = "[[__SCRIPT_CODE_FILE_NAME__]].ts"

const getTsProgram = async (): Promise<TsProgram> => {
    const fsMap = await createDefaultMapFromCDN(
        compilerOptions,
        ts.version,
        true,
        ts,
    );

    for (const [fileName, content] of getTypeDeclareFiles()) {
        fsMap.set(fileName, content)
    }
    fsMap.set(scriptCodeFileName, "")

    const system = createSystem(fsMap);
    const {
        compilerHost,
        updateFile,
        deleteFile,
    } = createVirtualCompilerHost(system, compilerOptions, ts);

    const program = ts.createProgram({
        rootNames: [...fsMap.keys()],
        options: compilerOptions,
        host: compilerHost,
    })

    return {
        updateFile,
        deleteFile,
        compilerHost,
        program,
    }
}

const getProgramCache = (): TsProgram | Promise<TsProgram> => {
    if (tsProgramCache !== null) {
        return tsProgramCache
    }

    if (tsProgramInitPromise !== null) {
        return tsProgramInitPromise
    }

    tsProgramInitPromise = getTsProgram()
    tsProgramInitPromise
        .then(res => {
            tsProgramCache = res
            tsProgramInitPromise = null
        })
        .catch(err => {
            console.error(err)
            tsProgramInitPromise = null
        })
    return tsProgramInitPromise
}

const getNewProgramAndSourceFile = async (code: string) => {
    const {program, compilerHost, updateFile} = await getProgramCache()
    const sourceFile = ts.createSourceFile(scriptCodeFileName, code, compilerOptions.target)
    updateFile(sourceFile)
    return {
        program: ts.createProgram({
            rootNames: program.getRootFileNames(),
            options: compilerOptions,
            host: compilerHost,
            oldProgram: program,
        }),
        sourceFile
    }
}

export type TsScriptValidatedCompileResult = {
    valid: true
    compiledCode: string
} | {
    valid: false
    error?: Error | any
    errorMessages: string[]
    markers?: IMarkerData[]
}

export type TsScript<Name extends ScriptTypeName> = {
    readonly code: string,
    readonly execute: (...args: Parameters<ScriptTypeMap[Name]>) => ReturnType<ScriptTypeMap[Name]>
}

export type CreateTsScriptResult<Name extends ScriptTypeName> =
    {
        valid: true
        script: TsScript<Name>
    } |
    (TsScriptValidatedCompileResult & { valid: false })

export type TsScriptExecuteResult<Name extends ScriptTypeName> = {
    success: true
    result: ReturnType<ScriptTypeMap[Name]>
} | {
    success: false
    state: 'compileError'
    compileResult: (TsScriptValidatedCompileResult & { valid: false })
} | {
    success: false
    state: 'executeError'
    error: Error | any
}

export class TsScriptExecutor<Name extends ScriptTypeName> {
    readonly scriptTypeName: Name

    constructor(
        scriptTypeName: Name
    ) {
        this.scriptTypeName = scriptTypeName
    }

    async validateThenCompile(
        code: string
    ): Promise<TsScriptValidatedCompileResult> {
        const scriptTypeName = this.scriptTypeName

        try {
            if (!code) {
                return {
                    valid: false,
                    errorMessages: [translate({key: 'not_blank_warning', args: [translate('code')]})],
                }
            }

            // 确保代码是字符串且有内容
            const trimmedCode = code.trim()
            if (!trimmedCode) {
                return {
                    valid: false,
                    errorMessages: [translate({key: 'not_blank_warning', args: [translate('code')]})],
                };
            }

            const {program, sourceFile} = await getNewProgramAndSourceFile(code)

            let compiledCode: string | undefined
            const emitResult = program.emit(sourceFile, (_fileName, text) => {
                compiledCode = text
            })
            if (!compiledCode) {
                return {
                    valid: false,
                    errorMessages: [translate('compile_fail')],
                }
            }

            // 获取诊断信息（包括语法、语义和声明错误）
            const diagnostics = [
                ...emitResult.diagnostics,
                ...program.getSyntacticDiagnostics(sourceFile),
                ...program.getSemanticDiagnostics(sourceFile),
                ...program.getDeclarationDiagnostics(sourceFile),
            ]

            const markers: IMarkerData[] = []
            const errorMessages: string[] = []

            if (diagnostics && diagnostics.length > 0) {
                const diagnosticMarkers = diagnostics
                    .filter(diagnostic => {
                        return (
                            diagnostic.category === ts.DiagnosticCategory.Error ||
                            diagnostic.category === ts.DiagnosticCategory.Warning
                        );
                    })
                    .map(diagnostic => {
                        if (diagnostic.file && diagnostic.start) {
                            const {line, character} = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                            const endPosition = diagnostic.start + (diagnostic.length || 0);
                            const {
                                line: endLine,
                                character: endCharacter
                            } = diagnostic.file.getLineAndCharacterOfPosition(endPosition);

                            return {
                                startLineNumber: line + 1,
                                startColumn: character + 1,
                                endLineNumber: endLine + 1,
                                endColumn: endCharacter + 1,
                                message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
                                severity: diagnostic.category === ts.DiagnosticCategory.Error ?
                                    MarkerSeverity.Error : MarkerSeverity.Warning,
                            };
                        }
                        return {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 1,
                            endColumn: 1,
                            message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
                            severity: diagnostic.category === ts.DiagnosticCategory.Error ?
                                MarkerSeverity.Error : MarkerSeverity.Warning,
                        }
                    })

                markers.push(...diagnosticMarkers)
                errorMessages.push(...diagnosticMarkers.map(it => {
                    return `(${it.startLineNumber}, ${it.startColumn}) ${it.message}`
                }))
            }

            const createMarker = (
                node: ts.Node,
                message: string,
                severity: MarkerSeverity = MarkerSeverity.Error
            ): IMarkerData => {
                const start = sourceFile.getLineAndCharacterOfPosition(node.getStart())
                const end = sourceFile.getLineAndCharacterOfPosition(node.getEnd())
                return {
                    startLineNumber: start.line + 1,
                    startColumn: start.character + 1,
                    endLineNumber: end.line + 1,
                    endColumn: end.character + 1,
                    message: message,
                    severity: severity,
                }
            }

            const dangerousTextMarkers: IMarkerData[] = []
            const fullText = sourceFile.getFullText()
            for (const comment of dangerousText) {
                let position = 0;
                while ((position = fullText.indexOf(comment, position)) !== -1) {
                    // 获取匹配位置对应的行列号
                    const {line, character} = sourceFile.getLineAndCharacterOfPosition(position)

                    // 创建标记，提示该注释被禁用使用
                    const marker: IMarkerData = {
                        startLineNumber: line + 1,
                        startColumn: character + 1,
                        endLineNumber: line + 1,
                        endColumn: character + 1 + comment.length,
                        message: translate({
                            key: 'target_is_forbidden',
                            args: [comment]
                        }),
                        severity: MarkerSeverity.Error
                    }

                    dangerousTextMarkers.push(marker)

                    // 移动到下一个位置，避免无限循环
                    position += comment.length
                }
            }
            markers.push(...dangerousTextMarkers)

            const forbiddenGlobalMarkers: IMarkerData[] = []
            const checkNodeForbidden = (node: ts.Node) => {
                // 检查标识符是否为禁止的全局变量
                if (ts.isIdentifier(node)) {
                    const identifierText = node.text;
                    if (forbiddenGlobalSet.has(identifierText)) {
                        const marker = createMarker(node, translate({
                            key: 'target_is_forbidden',
                            args: [identifierText]
                        }))
                        forbiddenGlobalMarkers.push(marker)
                    }
                }
                // 检查类型断言 (as any, as unknown 等)
                else if (ts.isAsExpression(node)) {
                    const typeNode = node.type;
                    const typeName = typeNode.getText(sourceFile);
                    if (dangerousTypeTokensSet.has(typeName)) {
                        const marker = createMarker(node, translate({
                            key: 'target_is_forbidden',
                            args: [`as ${typeName}`]
                        }));
                        forbiddenGlobalMarkers.push(marker);
                    }
                }
                // 检查非空断言操作符
                else if (ts.isNonNullExpression(node)) {
                    const marker = createMarker(node, translate({
                        key: 'target_is_forbidden',
                        args: ['non-null assertion (!)']
                    }));
                    forbiddenGlobalMarkers.push(marker);
                }

                ts.forEachChild(node, checkNodeForbidden);
            };
            checkNodeForbidden(sourceFile)

            markers.push(...forbiddenGlobalMarkers)

            // 验证脚本类型声明
            const typeChecker = program.getTypeChecker()

            const scriptTypeDeclareFile = program.getSourceFile(scriptTypeDeclares[scriptTypeName].fileName)
            if (!scriptTypeDeclareFile) {
                errorMessages.push(translate({key: 'script_declare_type_not_found', args: [scriptTypeName]}))
                return {
                    valid: false,
                    errorMessages,
                    markers,
                }
            }

            if (scriptTypeDeclareFile.statements.length !== 1 || !scriptTypeDeclareFile.statements[0]) {
                errorMessages.push(translate('script_can_contains_only_one_arrow_function_and_type_declares'))
                return {
                    valid: false,
                    errorMessages,
                    markers,
                }
            }

            if (!ts.isTypeAliasDeclaration(scriptTypeDeclareFile.statements[0])) {
                errorMessages.push(translate('script_can_contains_only_one_arrow_function_and_type_declares'))
                return {
                    valid: false,
                    errorMessages,
                    markers,
                }
            }

            const scriptTypeDeclare = scriptTypeDeclareFile.statements[0]
            const scriptType = typeChecker.getTypeAtLocation(scriptTypeDeclare)
            const scriptTypeSignatures = scriptType.getCallSignatures()

            if (scriptTypeSignatures.length !== 1 || scriptTypeSignatures[0] === undefined) {
                errorMessages.push(translate('script_can_contains_only_one_arrow_function_and_type_declares'))
                return {
                    valid: false,
                    errorMessages,
                    markers,
                }
            }

            const scriptTypeSignature = scriptTypeSignatures[0] // 获取第一个签名


            // 解析执行脚本源文件
            const statements = sourceFile.statements;

            // 查找箭头函数表达式语句
            let arrowFunctionStatement: ts.ExpressionStatement | null = null

            const stateMessage = translate('script_can_contains_only_one_arrow_function_and_type_declares')
            for (const statement of statements) {
                // 检查是否为表达式语句（可能包含箭头函数）
                if (ts.isExpressionStatement(statement)) {
                    // 检查表达式是否为箭头函数
                    if (ts.isArrowFunction(statement.expression)) {
                        if (arrowFunctionStatement) {
                            errorMessages.push(stateMessage)
                            markers.push(createMarker(statement, stateMessage))
                            break
                        }
                        arrowFunctionStatement = statement
                    } else {
                        errorMessages.push(stateMessage)
                        markers.push(createMarker(statement, stateMessage))
                        break
                    }
                }
                // 检查是否为类型声明语句或是仅类型import
                else if (
                    ts.isTypeAliasDeclaration(statement) ||
                    ts.isInterfaceDeclaration(statement) ||
                    ts.isEnumDeclaration(statement) ||
                    ts.isImportDeclaration(statement)
                ) {
                }

                // 其他类型的语句不被允许
                else {
                    errorMessages.push()
                    markers.push(createMarker(statement, stateMessage))
                    break
                }
            }

            // 必须有且仅有一个箭头函数
            if (!arrowFunctionStatement) {
                markers.push({
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1,
                    message: translate('script_can_contains_only_one_arrow_function_and_type_declares'),
                    severity: MarkerSeverity.Error,
                })
                errorMessages.push(translate('script_can_contains_only_one_arrow_function_and_type_declares'))

                return {
                    valid: false,
                    markers,
                    errorMessages,
                }
            }

            const arrowFunction = arrowFunctionStatement.expression as ts.ArrowFunction;

            // 获取声明参数信息
            const declareParameters = scriptTypeSignature.getParameters().map(param => {
                const paramName = param.getName()
                const paramType = typeChecker.getTypeOfSymbolAtLocation(param, scriptTypeDeclare)
                let paramTypeName = typeChecker.typeToString(paramType)

                const paramDeclarations = param.getDeclarations()
                if (paramDeclarations && paramDeclarations.length === 1) {
                    const declaration = paramDeclarations[0]
                    if (
                        declaration && "type" in declaration && declaration.type && typeof declaration.type === "object" &&
                        "getFullText" in declaration.type && typeof declaration.type.getFullText === "function"
                    ) {
                        paramTypeName = declaration.type.getFullText()
                    }
                }

                // 检查参数是否可选
                const isOptional = paramType.getFlags() & ts.TypeFlags.Union ?
                    (paramType as ts.UnionType).types.some(t => t.getFlags() & ts.TypeFlags.Undefined) :
                    false

                return {
                    name: paramName,
                    type: paramType,
                    typeName: paramTypeName,
                    isOptional: isOptional,
                }
            })

            const actualParameters = arrowFunction.parameters

            // 检查参数数量是否匹配
            if (actualParameters.length !== declareParameters.length) {
                const paramTypesLiteral = declareParameters.map(param => param.typeName)
                const message = translate({
                    key: 'parameter_count_mismatch',
                    args: [declareParameters.length, paramTypesLiteral.join(", "), actualParameters.length]
                })
                markers.push(createMarker(arrowFunction.parameters[0] ?? arrowFunction, message))
                errorMessages.push(message)
            }

            // 检查每个参数类型
            for (let i = 0; i < actualParameters.length; i++) {
                const declareParam = declareParameters[i]
                const actualParam = actualParameters[i]

                // 显示可选
                const isExplicitlyOptional = actualParam?.questionToken !== undefined;

                // 如果联合类型中包含 undefined, 则隐式可选
                const paramName = actualParam?.name.getText() ?? declareParam?.name ?? `param$i`
                const actualParamTypeLiteral = actualParam?.type?.getFullText(sourceFile).trim()

                if (!declareParam || !actualParam) {
                    markers.push(createMarker(
                        arrowFunction.parameters[i] ?? arrowFunction,
                        translate({
                            key: "parameter_type_mismatch",
                            args: [
                                paramName,
                                declareParam?.typeName ?? "unknown",
                                actualParamTypeLiteral ?? "unknown"
                            ]
                        })
                    ))
                    continue
                }

                const actualParamType = actualParam.type ? typeChecker.getTypeAtLocation(actualParam.type) : undefined;
                const isTypeOptional = actualParamType && actualParamType.getFlags() & ts.TypeFlags.Union
                    ? (actualParamType as ts.UnionType).types.some(t => t.getFlags() & ts.TypeFlags.Undefined)
                    : false;

                const actualParamIsOptional = isExplicitlyOptional || isTypeOptional;

                if (actualParamIsOptional !== declareParam.isOptional) {
                    if (declareParam.isOptional) {
                        const hasDefaultValue = actualParam.initializer !== undefined
                        if (!hasDefaultValue) {
                            markers.push(createMarker(actualParam, translate({
                                key: "parameter_type_need_default_or_optional",
                                args: [paramName]
                            })))
                        }
                    } else {
                        markers.push(createMarker(actualParam, translate({
                            key: "parameter_type_cannot_optional",
                            args: [paramName]
                        })))
                    }
                }

                // 检查参数是否有类型注解
                if (!actualParam.type) {
                    markers.push(createMarker(actualParam, translate({
                        key: "parameter_must_specify_type",
                        args: [paramName]
                    })))
                } else {
                    // 获取实际参数类型
                    const actualParamType = typeChecker.getTypeAtLocation(actualParam.type)

                    // 检查参数类型是否匹配
                    if (!typeChecker.isTypeAssignableTo(declareParam.type, actualParamType)) {
                        markers.push(createMarker(actualParam,
                            translate({
                                key: "parameter_type_mismatch",
                                args: [
                                    paramName,
                                    declareParam.typeName,
                                    actualParamTypeLiteral ?? "unknown"
                                ]
                            })
                        ))
                    }
                }
            }

            // 获取声明返回值类型
            const scriptReturnType = scriptTypeSignature.getReturnType()
            const scriptReturnTypeName = typeChecker.typeToString(scriptReturnType)

            const arrowTypeSignature = typeChecker.getSignatureFromDeclaration(arrowFunction)
            if (!arrowTypeSignature) {
                markers.push(createMarker(arrowFunction, translate('arrow_function_cannot_get_signature')))
            } else {
                const actualReturnType = typeChecker.getReturnTypeOfSignature(arrowTypeSignature)
                if (!typeChecker.isTypeAssignableTo(actualReturnType, scriptReturnType)) {
                    const actualReturnTypeName = typeChecker.typeToString(actualReturnType)
                    markers.push(createMarker(arrowFunction.type ?? arrowFunction, translate({
                        key: "return_type_mismatch",
                        args: [scriptReturnTypeName, actualReturnTypeName]
                    })))
                }
            }


            if (markers.length > 0 || message.length > 0) {
                return {
                    valid: false,
                    markers,
                    errorMessages,
                }
            }

            return {
                valid: true,
                compiledCode,
            }
        } catch (error) {
            return {
                valid: false,
                error,
                errorMessages: [error instanceof Error ? error.message : `${error}`]
            }
        }
    }

    executeJsFunction(code: string, params: Parameters<ScriptTypeMap[Name]>): ReturnType<ScriptTypeMap[Name]> {
        let trimCode = code.trim()
        if (!trimCode) {
            throw new Error("code is empty");
        }

        if (trimCode.endsWith(";")) {
            trimCode = trimCode.slice(0, -1)
        }

        const cleanCode = trimCode
            .replace(/\s*"use strict"\s*;?/g, '')
            .replace(/\s*export\s*{\s*};?/, '');

        // 构造函数体
        const functionBody = `
with(arguments[0]) {
    const userFunction = ${cleanCode};
    const userFunctionType = typeof userFunction;
    if (userFunctionType === 'function') {
        return userFunction;
    } else {
        throw new Error(\`content is not a function, real type is \${userFunctionType}\`);
    }
}`;

        // 创建非严格模式的函数
        const factoryFunction = new Function(functionBody);

        // 获取用户函数
        const userFunction = factoryFunction(proxiedEnv);

        // 执行用户函数
        return userFunction.call(Object.create(null), ...params);
    }

    async executeTsArrowFunctionScript(
        templateFn: string,
        params: Parameters<ScriptTypeMap[Name]>,
    ): Promise<TsScriptExecuteResult<Name>> {
        const compileResult = await this.validateThenCompile(templateFn)
        if (!compileResult.valid) {
            return {
                success: false,
                state: 'compileError',
                compileResult
            }
        }
        try {
            const result = this.executeJsFunction(compileResult.compiledCode, params)
            return {
                success: true,
                result
            }
        } catch (e) {
            return {
                success: false,
                state: 'executeError',
                error: e
            }
        }
    }
}

export const createTsScript = async <Name extends ScriptTypeName>(
    scriptTypeName: Name,
    code: string,
    executor: TsScriptExecutor<Name> = new TsScriptExecutor(scriptTypeName)
): Promise<CreateTsScriptResult<Name>> => {
    const result = await executor.validateThenCompile(code)
    if (!result.valid) {
        return result
    } else {
        return {
            valid: true,
            script: {
                code,
                execute: (...params: Parameters<ScriptTypeMap[Name]>) => {
                    return executor.executeJsFunction(result.compiledCode, params)
                }
            }
        }
    }
}
