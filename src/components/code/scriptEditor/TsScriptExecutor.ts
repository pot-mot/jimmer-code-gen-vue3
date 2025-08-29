import ts from 'typescript';
import {createDefaultMapFromCDN, createSystem, createVirtualCompilerHost} from "@typescript/vfs";
import {editor, languages, MarkerSeverity} from "monaco-editor";
import registerTypeDeclare from "@/type/__generated/typeDeclare";
import message from "@/components/message/Message.vue";

type IMarkerData = editor.IMarkerData

const typeDeclareFiles = new Map<string, string>()

export const registerTypeDeclareFile = (fileName: string, content: string) => {
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
    registerTypeDeclare()
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
const compilerOptions: ts.CompilerOptions = Object.freeze({
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    strict: true,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    baseUrl: "./",
})

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
    error: (TsScriptValidatedCompileResult & { valid: false })['error']
} | {
    success: false
    state: 'executeError'
    error: Error | any
}

export type TsScriptFunction = {
    (...args: any[]): any,
    returnTypeLiteral: string,
    paramTypesLiteral: string[],
}

export class TsScriptExecutor<
    Fn extends TsScriptFunction = {
        (): string,
        returnTypeLiteral: 'string',
        paramTypesLiteral: [],
    }
> {
    readonly returnTypeLiteral: Fn['returnTypeLiteral']
    readonly paramTypesLiteral: Fn['paramTypesLiteral']

    constructor(
        returnTypeLiteral: Fn['returnTypeLiteral'],
        paramTypesLiteral: Fn['paramTypesLiteral'],
    ) {
        this.returnTypeLiteral = returnTypeLiteral
        this.paramTypesLiteral = paramTypesLiteral
    }

    async validateThenCompile(
        code: string
    ): Promise<TsScriptValidatedCompileResult> {
        const returnTypeLiteral = this.returnTypeLiteral
        const paramTypesLiteral = this.paramTypesLiteral

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

            const fsMap = await createDefaultMapFromCDN(
                compilerOptions,
                ts.version,
                true,
                ts,
            )

            const codeFileName = 'index.ts'
            fsMap.set(codeFileName, trimmedCode)
            for (const [fileName, content] of typeDeclareFiles) {
                fsMap.set(fileName, content)
            }

            const system = createSystem(fsMap)
            const host = createVirtualCompilerHost(system, compilerOptions, ts)

            // 创建编译程序
            const program = ts.createProgram({
                rootNames: [...fsMap.keys()],
                options: compilerOptions,
                host: host.compilerHost,
            })

            const sourceFile = program.getSourceFile(codeFileName)
            if (!sourceFile) {
                return {
                    valid: false,
                    errorMessages: ['找不到源文件'],
                }
            }

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

            // 验证代码是否仅包含一个箭头函数和可选的类型声明
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

            // 校验参数
            const params = arrowFunction.parameters;

            // 检查参数数量是否匹配
            if (params.length !== paramTypesLiteral.length) {
                const message = `参数数量不匹配，期望 ${paramTypesLiteral.length} 个参数 (${paramTypesLiteral.join(", ")})，实际 ${params.length} 个`
                markers.push(createMarker(arrowFunction, message))
                errorMessages.push(message)
            }

            // 检查每个参数的名称和类型
            for (let i = 0; i < params.length; i++) {
                const param = params[i]
                const paramName = param.name.getText()

                const isOptional = param.questionToken !== undefined
                if (isOptional) {
                    markers.push(createMarker(param, `参数 ${paramName} 必须不可选`))
                }

                const hasDefaultValue = param.initializer !== undefined
                if (hasDefaultValue) {
                    markers.push(createMarker(param, `参数 ${paramName} 必须没有默认值`))
                }

                // 检查参数是否有类型注解
                if (!param.type) {
                    markers.push(createMarker(param, `参数 ${paramName} 必须显式声明类型`))
                } else {
                    // 获取实际参数类型
                    const actualParamType = param.type.getText()
                    const expectedParamType = paramTypesLiteral[i]

                    // 检查参数类型是否匹配
                    if (actualParamType !== expectedParamType) {
                        markers.push(createMarker(param, `参数 ${paramName} 的类型不匹配，期望 ${expectedParamType}，实际 ${actualParamType}`))
                    }
                }
            }

            if (returnTypeLiteral === 'string') {
                if (arrowFunction.type) {
                    if (arrowFunction.type.kind !== ts.SyntaxKind.StringKeyword) {
                        markers.push(createMarker(arrowFunction.type, '箭头函数的返回类型必须是 string'))
                    }
                } else {
                    const typeChecker = program.getTypeChecker()
                    const signature = typeChecker.getSignatureFromDeclaration(arrowFunction)
                    if (!signature) {
                        markers.push(createMarker(arrowFunction, '箭头函数无法获取签名'))
                    } else {
                        const returnType = typeChecker.getReturnTypeOfSignature(signature)
                        if (!typeChecker.isTypeAssignableTo(returnType, typeChecker.getStringType())) {
                            const returnTypeString = typeChecker.typeToString(returnType)
                            markers.push(createMarker(arrowFunction, `箭头函数的返回类型必须是 string, 目前返回类型: ${returnTypeString}`))
                        }
                    }
                }
            } else if (returnTypeLiteral === 'number') {
                if (arrowFunction.type) {
                    if (arrowFunction.type.kind !== ts.SyntaxKind.NumberKeyword) {
                        markers.push(createMarker(arrowFunction.type, '箭头函数的返回类型必须是 number'))
                    }
                } else {
                    const typeChecker = program.getTypeChecker()
                    const signature = typeChecker.getSignatureFromDeclaration(arrowFunction)
                    if (!signature) {
                        markers.push(createMarker(arrowFunction, '箭头函数无法获取签名'))
                    } else {
                        const returnType = typeChecker.getReturnTypeOfSignature(signature)
                        if (!typeChecker.isTypeAssignableTo(returnType, typeChecker.getNumberType())) {
                            const returnTypeString = typeChecker.typeToString(returnType)
                            markers.push(createMarker(arrowFunction, `箭头函数的返回类型必须是 number, 目前返回类型: ${returnTypeString}`))
                        }
                    }
                }
            } else if (returnTypeLiteral === 'boolean') {
                if (arrowFunction.type) {
                    if (arrowFunction.type.kind !== ts.SyntaxKind.BooleanKeyword) {
                        markers.push(createMarker(arrowFunction.type, '箭头函数的返回类型必须是 boolean'))
                    }
                } else {
                    const typeChecker = program.getTypeChecker()
                    const signature = typeChecker.getSignatureFromDeclaration(arrowFunction)
                    if (!signature) {
                        markers.push(createMarker(arrowFunction, '箭头函数无法获取签名'))
                    } else {
                        const returnType = typeChecker.getReturnTypeOfSignature(signature)
                        if (!typeChecker.isTypeAssignableTo(returnType, typeChecker.getBooleanType())) {
                            const returnTypeString = typeChecker.typeToString(returnType)
                            markers.push(createMarker(arrowFunction, `箭头函数的返回类型必须是 boolean, 目前返回类型: ${returnTypeString}`))
                        }
                    }
                }
            } else if (returnTypeLiteral !== 'void') {
                const typeChecker = program.getTypeChecker()
                const signature = typeChecker.getSignatureFromDeclaration(arrowFunction)
                if (!signature) {
                    markers.push(createMarker(arrowFunction, '箭头函数无法获取签名'))
                } else {
                    const returnType = typeChecker.getReturnTypeOfSignature(signature)
                    const returnTypeString = typeChecker.typeToString(returnType)
                    if (returnTypeString !== returnTypeLiteral) {
                        markers.push(createMarker(arrowFunction, `箭头函数的返回类型必须是 ${returnTypeLiteral}, 目前返回类型: ${returnTypeString}`))
                    }
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
        try {
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
        } catch (error) {
            throw new Error(`JS 执行错误: ${error instanceof Error ? error.message : `${error}`}`)
        }
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
                error: compileResult.error
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
