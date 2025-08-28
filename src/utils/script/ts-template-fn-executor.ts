import ts from 'typescript';
import {createDefaultMapFromCDN, createSystem, createVirtualCompilerHost} from "@typescript/vfs";

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
    'localStorage',
    'sessionStorage',
    'indexedDB',
    'location',
    'history',
    'navigator',
    'Worker',
    'debugger'
])

export const forbiddenWordMap = Object.freeze(new Set(forbiddenGlobal))

type ValidationResult = {
    valid: true
    compiledCode: string
} | {
    valid: false
    error?: string
}

export class TsTemplateFnExecutor {
    async validateThenCompile(
        code: string,
        functionParamTypes?: string[],
        paramTypeFiles?: Map<string, string>,
    ): Promise<ValidationResult> {
        try {
            // 添加参数验证
            if (!code) {
                return {
                    valid: false,
                    error: '代码不能为空'
                };
            }

            if (typeof code !== 'string') {
                return {
                    valid: false,
                    error: '代码必须是字符串类型'
                };
            }

            // 确保代码是字符串且有内容
            const trimmedCode = code.trim()
            if (!trimmedCode) {
                return {
                    valid: false,
                    error: '代码不能为空字符串'
                };
            }

            // 创建编译器选项
            const compilerOptions: ts.CompilerOptions = {
                target: ts.ScriptTarget.ES2020,
                module: ts.ModuleKind.ESNext,
                strict: true,
                esModuleInterop: true,
                forceConsistentCasingInFileNames: true,
                baseUrl: "./",
            }

            const fsMap = await createDefaultMapFromCDN(
                compilerOptions,
                ts.version,
                true,
                ts,
            )

            const codeFileName = 'index.ts'
            fsMap.set(codeFileName, trimmedCode)
            for (const [fileName, content] of paramTypeFiles ?? []) {
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
                    error: '找不到源文件'
                }
            }
            for (const [fileName, _] of paramTypeFiles ?? []) {
                const typeFile = program.getSourceFile(fileName)
                if (!typeFile) {
                    return {
                        valid: false,
                        error: '找不到参数类型文件'
                    }
                }
            }

            let compiledCode: string | undefined
            const result = program.emit(sourceFile, (_fileName, text) => {
                compiledCode = text
            })
            if (!compiledCode) {
                return {
                    valid: false,
                    error: '编译错误，无编译结果'
                }
            }

            // 获取诊断信息（包括语法、语义和声明错误）
            const diagnostics = [
                ...result.diagnostics,
                ...program.getSyntacticDiagnostics(sourceFile),
                ...program.getSemanticDiagnostics(sourceFile),
                ...program.getDeclarationDiagnostics(sourceFile)
            ]

            if (diagnostics && diagnostics.length > 0) {
                console.error(diagnostics)
                const errors = diagnostics
                    .filter(diagnostic => {
                        return (
                            diagnostic.category === ts.DiagnosticCategory.Error ||
                            diagnostic.category === ts.DiagnosticCategory.Warning
                        );
                    })
                    .map(diagnostic => {
                        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                        if (diagnostic.file && diagnostic.start) {
                            const {line, character} = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                            return `(${line + 1},${character + 1}): ${message}`;
                        }
                        return message;
                    });

                if (errors.length > 0) {
                    return {
                        valid: false,
                        error: errors.join('\n')
                    };
                }
            }

            // 验证代码是否仅包含一个箭头函数和可选的类型声明
            const statements = sourceFile.statements;


            // 查找箭头函数表达式语句
            let arrowFunctionStatement: ts.ExpressionStatement | null = null

            for (const statement of statements) {
                // 检查是否为表达式语句（可能包含箭头函数）
                if (ts.isExpressionStatement(statement)) {
                    // 检查表达式是否为箭头函数
                    if (ts.isArrowFunction(statement.expression)) {
                        if (arrowFunctionStatement) {
                            return {
                                valid: false,
                                error: '代码只能包含一个箭头函数表达式'
                            };
                        }
                        arrowFunctionStatement = statement;
                    } else {
                        return {
                            valid: false,
                            error: '代码只能包含一个箭头函数表达式'
                        };
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
                    return {
                        valid: false,
                        error: '代码只能包含一个箭头函数表达式和类型声明语句（type、interface、enum）'
                    };
                }
            }

            // 必须有且仅有一个箭头函数
            if (!arrowFunctionStatement) {
                return {
                    valid: false,
                    error: '代码必须包含一个箭头函数表达式'
                };
            }

            // 检查箭头函数的返回类型是否为 string
            const arrowFunction = arrowFunctionStatement.expression as ts.ArrowFunction;

            // 如果提供了参数校验信息，则校验参数
            if (paramTypeFiles && functionParamTypes) {
                // 校验参数
                const params = arrowFunction.parameters;

                // 检查参数数量是否匹配
                if (params.length !== functionParamTypes.length) {
                    return {
                        valid: false,
                        error: `参数数量不匹配，期望 ${functionParamTypes.length} 个参数 (${functionParamTypes.join(", ")})，实际 ${params.length} 个`
                    };
                }

                // 检查每个参数的名称和类型
                for (let i = 0; i < params.length; i++) {
                    const param = params[i]
                    const paramName = param.name.getText();

                    // 检查参数是否有类型注解
                    if (!param.type) {
                        return {
                            valid: false,
                            error: `参数 ${paramName} 必须显式声明类型`
                        };
                    }

                    // 获取实际参数类型
                    const actualParamType = param.type.getText();
                    const expectedParamType = functionParamTypes[i]

                    // 检查参数类型是否匹配
                    if (actualParamType !== expectedParamType) {
                        return {
                            valid: false,
                            error: `参数 ${paramName} 的类型不匹配，期望 ${expectedParamType}，实际 ${actualParamType}`
                        };
                    }
                }
            }

            // 检查返回值是否为 string 类型
            if (arrowFunction.type) {
                // 如果有显式类型注解，检查是否为 string 类型
                if (arrowFunction.type.kind !== ts.SyntaxKind.StringKeyword) {
                    return {
                        valid: false,
                        error: '箭头函数的返回类型必须是 string'
                    };
                }
            } else {
                const typeChecker = program.getTypeChecker()
                const signature = typeChecker.getSignatureFromDeclaration(arrowFunction)
                if (!signature) {
                    return {
                        valid: false,
                        error: '箭头函数的返回类型必须显示标注为 string'
                    };
                }

                const returnType = typeChecker.getReturnTypeOfSignature(signature)
                if (!typeChecker.isTypeAssignableTo(returnType, typeChecker.getStringType())) {
                    const returnTypeString = typeChecker.typeToString(returnType)
                    return {
                        valid: false,
                        error: `箭头函数的返回类型必须是 string, 目前返回类型: ${returnTypeString}`
                    };
                }
            }

            return {
                valid: true,
                compiledCode
            }
        } catch (error) {
            console.error(error)
            return {
                valid: false,
                error: error instanceof Error ? error.message : `${error}`
            };
        }
    }

    executeJsFunction(code: string): any {
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

        try {
            // 创建安全的全局环境
            const safeGlobalEnv = {
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
            }

            // 使用 Proxy 拦截所有属性访问
            const proxiedEnv = new Proxy({}, {
                has: () => true, // 让 with 语句认为所有属性都存在
                get: (target, prop) => {
                    // 如果是禁止的属性，返回 null
                    if (forbiddenWordMap.has(String(prop))) {
                        return null
                    }
                    // 否则从安全环境中获取
                    return (safeGlobalEnv as any)[prop];
                }
            });

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
            return userFunction.call(Object.create(null));
        } catch (error) {
            throw new Error(`JS 执行错误: ${error instanceof Error ? error.message : `${error}`}`)
        }
    }

    async executeTemplateFunction(
        templateFn: string,
        functionParamTypes?: string[],
        paramTypeFiles?: Map<string, string>,
    ): Promise<string> {
        const result = await this.validateThenCompile(
            templateFn,
            functionParamTypes,
            paramTypeFiles
        );
        if (!result.valid) {
            throw new Error(result.error)
        }
        return this.executeJsFunction(result.compiledCode);
    }
}
