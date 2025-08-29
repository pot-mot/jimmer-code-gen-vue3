import {editor} from "monaco-editor";
type IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

export const defaultOptions: IStandaloneEditorConstructionOptions = {
    automaticLayout: true, // 自适应布局 默认true
    renderLineHighlight: 'all', // 行亮方式 默认all
    selectOnLineNumbers: true, // 显示行号 默认true
    minimap: {
        enabled: false,
    },
    readOnly: false, // 只读
    fontSize: 16, // 字体大小
    scrollBeyondLastLine: true, // 代码后面的空白
    overviewRulerBorder: false, // 不要滚动条的边框
    tabSize: 4,
}