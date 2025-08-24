/**
 * 全局导入 Monaca Editor Worker
 */
import {getWorker} from "@/components/code/CodeEditorLanguages.ts";

export const useCodeEditor = () => {
    // @ts-ignore: worker 导入方式可以参考vite官网 https://cn.vitejs.dev/guide/features.html#web-workers
    self.MonacoEnvironment = { // 提供一个定义worker路径的全局变量
        getWorker(_: any, label: string) {
            return getWorker(label); // 基础功能文件， 提供了所有语言通用功能 无论使用什么语言，monaco都会去加载他。
        }
    }
}
