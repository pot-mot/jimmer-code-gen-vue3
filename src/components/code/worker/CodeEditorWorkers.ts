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

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import CSSWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import HTMLWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import TSWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

export const getWorker = (language: CodeEditorLanguage | string | undefined): Worker => {
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

/**
 * 全局导入 Monaca Editor Worker
 */
export const useCodeEditorWorker = () => {
    self.MonacoEnvironment = { // 提供一个定义worker路径的全局变量
        getWorker(_workerId: string, label: string) {
            return getWorker(label)
        }
    }
}
