import ts from "typescript";
import {createDefaultMapFromNodeModules, createSystem, createVirtualCompilerHost} from "@typescript/vfs";
import {ensureDirExists} from "./checkFileExisted";
import {FileItem, getDeclareTsFiles} from "./fileTools";

export const modelPath = "src/type/model";
export const contextPath = "src/type/context";
export const scriptPath = "src/type/script";

// 创建编译器选项
const compilerOptions = Object.freeze({
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    strict: true,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    baseUrl: "./",
    skipLibCheck: true, // 跳过库文件检查，解决 DOM 类型冲突
    skipDefaultLibCheck: true, // 跳过默认库检查
})

export const buildProjectTsProgram = (
    files: FileItem[] = [],
) => {
    ensureDirExists(modelPath)
    ensureDirExists(contextPath)
    ensureDirExists(scriptPath)

    const fsMap = createDefaultMapFromNodeModules(
        compilerOptions,
    )

    const modelTypeFiles = getDeclareTsFiles(modelPath)
    const contextTypeFiles = getDeclareTsFiles(contextPath)
    const scriptTypeFiles = getDeclareTsFiles(scriptPath)

    for (const {fileName, content} of modelTypeFiles) {
        fsMap.set(fileName, content)
    }
    for (const {fileName, content} of contextTypeFiles) {
        fsMap.set(fileName, content)
    }
    for (const {fileName, content} of scriptTypeFiles) {
        fsMap.set(fileName, content)
    }
    for (const {fileName, content} of files) {
        fsMap.set(fileName, content)
    }

    const system = createSystem(fsMap)
    const host = createVirtualCompilerHost(system, compilerOptions, ts)

    // 创建编译程序
    return {
        program: ts.createProgram({
            rootNames: [...fsMap.keys()],
            options: compilerOptions,
            host: host.compilerHost,
        }),
        modelTypeFiles,
        contextTypeFiles,
        scriptTypeFiles,
    }
}
