export const CodeEditorLanguage_CONSTANTS = [
    'json',
    'typescript', 'javascript',
    'html',
    'css',
    'java',
    'kotlin',
    'sql',
] as const;

export type CodeEditorLanguage = typeof CodeEditorLanguage_CONSTANTS[number]

// @ts-ignore
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// @ts-ignore
import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// @ts-ignore
import CSSWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// @ts-ignore
import HTMLWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
// @ts-ignore
import TSWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

export const getWorker = (language: CodeEditorLanguage | string | undefined) => {
    switch (language) {
        case "typescript":
        case "javascript":
            return new TSWorker()
        case "html":
            return new HTMLWorker()
        case "css":
            return new CSSWorker()
        case "json":
            return new JSONWorker()
        default:
            return new EditorWorker()
    }
}
