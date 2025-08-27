import {languages, editor} from 'monaco-editor';

languages.typescript.typescriptDefaults.setCompilerOptions({
    target: languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
})

// languages.typescript.typescriptDefaults.addExtraLib(`interface EntityArgs {
//     name: string
//     comment: string
//     extendsNames: string[]
//     properties: {
//         name: string
//         type: string
//         columnName: string
//         comment: string
//         keyGroups: string[] | undefined
//     }[]
// }`, "entity-type.ts");

export const configureSecureMonacoEditor = (
    editor: editor.IStandaloneCodeEditor,
) => {

}
