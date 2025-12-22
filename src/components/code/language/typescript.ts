import {languages} from "monaco-editor";
import {typeDeclares} from "@/type/__generated/typeDeclare";
import {scriptTypeDeclares} from "@/type/__generated/scriptTypeDeclare";

const typeDeclareFiles = new Map<string, string>()

const registerTypeDeclareFile = (fileName: string, content: string) => {
    if (typeDeclareFiles.has(fileName)) {
        throw new Error(`File [${fileName}] already registered`)
    }
    typeDeclareFiles.set(fileName, content)
    languages.typescript.typescriptDefaults.addExtraLib(content, fileName)
}

export const getTypeDeclareFiles = (): DeepReadonly<Map<string, string>> => {
    return typeDeclareFiles
}

export const registerTypeDeclareForMonacoEditor = () => {
    languages.typescript.typescriptDefaults.setEagerModelSync(true);
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
