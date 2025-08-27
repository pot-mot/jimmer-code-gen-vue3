import ts, {transpileModule} from 'typescript';
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
    async validateThenCompile(code: string): Promise<ValidationResult> {
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
                module: ts.ModuleKind.CommonJS,
                strict: true,
                esModuleInterop: true,
                forceConsistentCasingInFileNames: true
            }

            const codeFileName = 'index.ts'

            const fsMap = await createDefaultMapFromCDN(
                compilerOptions,
                ts.version,
                true,
                ts,
            )
            fsMap.set(codeFileName, trimmedCode)

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
                            const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
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

            // 验证代码是否仅是一个箭头函数
            const statements = sourceFile.statements;

            // 检查是否只有一个语句
            if (statements.length !== 1) {
                return {
                    valid: false,
                    error: '代码必须仅包含一个箭头函数表达式'
                };
            }

            const firstStatement = statements[0];

            // 检查是否为表达式语句
            if (!ts.isExpressionStatement(firstStatement)) {
                return {
                    valid: false,
                    error: '代码必须是一个箭头函数表达式'
                };
            }

            // 检查表达式是否为箭头函数
            const expression = firstStatement.expression;
            if (!ts.isArrowFunction(expression)) {
                return {
                    valid: false,
                    error: '代码必须是一个箭头函数'
                };
            }

            // 检查箭头函数的返回类型是否为 string
            const arrowFunction = expression as ts.ArrowFunction;
            if (arrowFunction.type) {
                // 如果有显式类型注解，检查是否为 string 类型
                if (arrowFunction.type.kind !== ts.SyntaxKind.StringKeyword) {
                    return {
                        valid: false,
                        error: '箭头函数的返回类型必须是 string'
                    };
                }
            } else {
                return {
                    valid: false,
                    error: '箭头函数的返回类型必须显示标注为 string'
                };
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

        const cleanCode = trimCode.replace(/\s*"use strict"\s*;\s*/g, '')

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

    async executeTemplateFunction(templateFn: string): Promise<string> {
        const result = await this.validateThenCompile(templateFn);
        if (!result.valid) {
            throw new Error(result.error)
        }
        return this.executeJsFunction(result.compiledCode);
    }
}
