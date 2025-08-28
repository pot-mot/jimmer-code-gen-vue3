import {languages} from 'monaco-editor';

export const initTsTemplateEditor = () => {
    languages.typescript.typescriptDefaults.setCompilerOptions({
        target: languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
    })
}

