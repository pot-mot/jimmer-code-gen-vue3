import ts, {type SourceFile} from 'typescript';
import {createDefaultMapFromCDN, createSystem, createVirtualCompilerHost} from "@typescript/vfs";
import {editor, languages, MarkerSeverity} from "monaco-editor";
import {typeDeclares} from "@/type/__generated/typeDeclare";
import {scriptTypeDeclares, type ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";
import message from "@/components/message/Message.vue";

type IMarkerData = editor.IMarkerData

const typeDeclareFiles = new Map<string, string>()

export const registerTypeDeclareFile = (fileName: string, content: string) => {
    if (typeDeclareFiles.has(fileName)) {
        throw new Error(`File [${fileName}] already registered`)
    }
    typeDeclareFiles.set(fileName, content)
    languages.typescript.typescriptDefaults.addExtraLib(content, fileName)
}

export const initMonacoTsScriptEditor = () => {
    languages.typescript.typescriptDefaults.setCompilerOptions({
        target: languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
    })
    languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
        noSuggestionDiagnostics: true,
    })
    for (const {fileName, content} of Object.values(typeDeclares)) {
        registerTypeDeclareFile(fileName, content)
    }
    for (const {fileName, content} of Object.values(scriptTypeDeclares)) {
        registerTypeDeclareFile(fileName, content)
    }
}

export const forbiddenGlobal = Object.freeze([
    'import',
    'export',
    'require',
    'alert',
    'prompt',
    'confirm',
    'eval',
    'Function',
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

export const forbiddenGlobalMap = Object.freeze(new Set(forbiddenGlobal))

// 创建安全的全局环境
const safeGlobalEnv = Object.freeze({
    Math,
    Date,
    String,
    Number,
    Boolean,
    Array,
    Object,
    RegExp,
    JSON,
    Error,
    encodeURIComponent,
    decodeURIComponent,
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
    console,
})

// 使用 Proxy 拦截所有属性访问
const proxiedEnv = Object.freeze(new Proxy({}, {
    has: () => true, // 让 with 语句认为所有属性都存在
    get: (_, prop) => {
        // 如果是禁止的属性，返回 null
        if (forbiddenGlobalMap.has(String(prop))) {
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

type TsProgramCache = {
    updateFile: (sourceFile: SourceFile) => boolean
    deleteFile: (sourceFile: SourceFile) => boolean
    compilerHost: ts.CompilerHost
    program: ts.Program
}
let tsProgramCache: TsProgramCache | null = null

let tsProgramInitPromise: Promise<TsProgramCache> | null = null

const scriptCodeFileName = "[[__SCRIPT_CODE_FILE_NAME__]].ts"
const getProgramCache = async () => {
    if (tsProgramCache) {
        return tsProgramCache
    }

    if (tsProgramInitPromise) {
        return tsProgramInitPromise
    }

    tsProgramInitPromise = (async () => {
        try {
            const fsMap = await createDefaultMapFromCDN(
                compilerOptions,
                ts.version,
                true,
                ts,
            );

            for (const [fileName, content] of typeDeclareFiles) {
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

            tsProgramCache = {
                updateFile,
                deleteFile,
                compilerHost,
                program,
            }

            return tsProgramCache
        } finally {
            tsProgramInitPromise = null
        }
    })()

    return tsProgramInitPromise
}

export type TsScriptFunction = {
    (...args: any[]): any,
    scriptTypeName: ScriptTypeName,
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

export type TsScriptExecuteResult<Fn extends TsScriptFunction> = {
    success: true
    result: ReturnType<Fn>
} | {
    success: false
    state: 'compileError'
    compileResult: (TsScriptValidatedCompileResult & { valid: false })
} | {
    success: false
    state: 'executeError'
    error: Error | any
}

export class TsScriptExecutor<
    Fn extends TsScriptFunction
> {
    readonly scriptTypeName: Fn['scriptTypeName']

    constructor(
        scriptTypeName: Fn['scriptTypeName']
    ) {
        this.scriptTypeName = scriptTypeName
    }

    async validateThenCompile(
        code: string
    ): Promise<TsScriptValidatedCompileResult> {
        const scriptTypeName = this.scriptTypeName

        try {
            // 添加参数验证
            if (!code) {
                return {
                    valid: false,
                    errorMessages: ['代码不能为空'],
                }
            }

            if (typeof code !== 'string') {
                return {
                    valid: false,
                    errorMessages: ['代码必须是字符串类型'],
                };
            }

            // 确保代码是字符串且有内容
            const trimmedCode = code.trim()
            if (!trimmedCode) {
                return {
                    valid: false,
                    errorMessages: ['代码不能为空字符串'],
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
                    errorMessages: ['编译错误，无编译结果'],
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

            const forbiddenGlobalMarkers: IMarkerData[] = []
            const visitNode = (node: ts.Node) => {
                // 检查标识符是否为禁止的全局变量
                if (ts.isIdentifier(node)) {
                    const identifierText = node.text;
                    if (forbiddenGlobalMap.has(identifierText)) {
                        const marker = createMarker(node, `\`${identifierText}\` is forbidden`)
                        forbiddenGlobalMarkers.push(marker)
                    }
                }

                ts.forEachChild(node, visitNode);
            };

            visitNode(sourceFile)

            markers.push(...forbiddenGlobalMarkers)

            // 验证脚本类型声明
            const typeChecker = program.getTypeChecker()

            const scriptTypeDeclareFile = program.getSourceFile(scriptTypeDeclares[scriptTypeName].fileName)
            if (!scriptTypeDeclareFile) {
                errorMessages.push('找不到脚本类型声明文件')
                return {
                    valid: false,
                    errorMessages,
                    markers,
                }
            }

            if (scriptTypeDeclareFile.statements.length !== 1) {
                errorMessages.push('脚本类型声明文件只能包含一个语句')
                return {
                    valid: false,
                    errorMessages,
                    markers,
                }
            }

            if (!ts.isTypeAliasDeclaration(scriptTypeDeclareFile.statements[0])) {
                errorMessages.push('脚本类型声明文件只能包含一个类型声明语句')
                return {
                    valid: false,
                    errorMessages,
                    markers,
                }
            }

            const scriptTypeDeclare = scriptTypeDeclareFile.statements[0]
            const scriptType = typeChecker.getTypeAtLocation(scriptTypeDeclare)
            const scriptTypeSignatures = scriptType.getCallSignatures()

            if (scriptTypeSignatures.length !== 1) {
                errorMessages.push('类型声明必须包含唯一一个函数签名')
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

            const stateMessage = '代码只能包含一个箭头函数表达式和类型声明语句（type、interface、enum）'
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
                    message: '代码必须包含一个箭头函数表达式',
                    severity: MarkerSeverity.Error,
                })
                errorMessages.push('代码必须包含一个箭头函数表达式')

                return {
                    valid: false,
                    markers,
                    errorMessages,
                }
            }

            const arrowFunction = arrowFunctionStatement.expression as ts.ArrowFunction;
            const arrowFunctionType = typeChecker.getTypeAtLocation(arrowFunction)

            // 若是类型完全匹配，则无需再进行详细的类型提示
            if (typeChecker.isTypeAssignableTo(arrowFunctionType, scriptType)) {
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
            }

            // 获取声明参数信息
            const declareParameters = scriptTypeSignature.getParameters().map(param => {
                const paramName = param.getName()
                const paramType = typeChecker.getTypeOfSymbolAtLocation(param, scriptTypeDeclare)
                const paramTypeName = typeChecker.typeToString(paramType)

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
                const message = `参数数量不匹配，期望 ${declareParameters.length} 个参数 (${paramTypesLiteral.join(", ")})，实际 ${actualParameters.length} 个`
                markers.push(createMarker(arrowFunction.parameters[0] ?? arrowFunction, message))
                errorMessages.push(message)
            }

            // 检查每个参数类型
            for (let i = 0; i < actualParameters.length; i++) {
                const declareParam = declareParameters[i]
                const actualParam = actualParameters[i]
                const paramName = actualParam.name.getText()

                // 显示可选
                const isExplicitlyOptional = actualParam.questionToken !== undefined;

                // 如果联合类型中包含 undefined, 则隐式可选
                const actualParamType = actualParam.type ? typeChecker.getTypeAtLocation(actualParam.type) : undefined;
                const isTypeOptional = actualParamType && actualParamType.getFlags() & ts.TypeFlags.Union
                    ? (actualParamType as ts.UnionType).types.some(t => t.getFlags() & ts.TypeFlags.Undefined)
                    : false;

                const actualParamIsOptional = isExplicitlyOptional || isTypeOptional;

                if (actualParamIsOptional !== declareParam.isOptional) {
                    if (declareParam.isOptional) {
                        const hasDefaultValue = actualParam.initializer !== undefined
                        if (!hasDefaultValue) {
                            markers.push(createMarker(actualParam, `参数 ${paramName} 应当可选或具有默认值`))
                        }
                    } else {
                        markers.push(createMarker(actualParam, `参数 ${paramName} 不可选`))
                    }
                }

                // 检查参数是否有类型注解
                if (!actualParam.type) {
                    markers.push(createMarker(actualParam, `参数 ${paramName} 必须显式声明类型`))
                } else {
                    // 获取实际参数类型
                    const actualParamType = typeChecker.getTypeAtLocation(actualParam.type)

                    // 检查参数类型是否匹配
                    if (!typeChecker.isTypeAssignableTo(actualParamType, declareParam.type)) {
                        markers.push(createMarker(actualParam, `参数 ${paramName} 的类型不匹配，期望 ${declareParam.typeName}，实际 ${actualParamType}`))
                    }
                }
            }

            // 获取声明返回值类型
            const scriptReturnType = scriptTypeSignature.getReturnType()
            const scriptReturnTypeName = typeChecker.typeToString(scriptReturnType)

            const arrowTypeSignature = typeChecker.getSignatureFromDeclaration(arrowFunction)
            if (!arrowTypeSignature) {
                markers.push(createMarker(arrowFunction, '箭头函数无法获取签名'))
            } else {
                const actualReturnType = typeChecker.getReturnTypeOfSignature(arrowTypeSignature)
                if (!typeChecker.isTypeAssignableTo(actualReturnType, scriptReturnType)) {
                    const actualReturnTypeName = typeChecker.typeToString(actualReturnType)
                    markers.push(createMarker(arrowFunction.type ?? arrowFunction, `箭头函数的返回类型必须是 ${scriptReturnTypeName}, 目前返回类型: ${actualReturnTypeName}`))
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

    executeJsFunction(code: string, params: Parameters<Fn>): ReturnType<Fn> {
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
        params: Parameters<Fn>,
    ): Promise<TsScriptExecuteResult<Fn>> {
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
