import {languages} from 'monaco-editor';

export const initTsTemplateEditor = () => {
    languages.typescript.typescriptDefaults.setCompilerOptions({
        target: languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
    })

    for (const [fileName, content] of new Map([['MyType.d.ts', 'type MyType = {name: string, type: string}']])) {
        languages.typescript.typescriptDefaults.addExtraLib(content, fileName)
    }
}

