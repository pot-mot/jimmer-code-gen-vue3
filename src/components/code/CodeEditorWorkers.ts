/**
 * 全局导入 Monaca Editor Worker
 */
import {getWorker} from "@/components/code/CodeEditorLanguages.ts";

export const useCodeEditor = () => {
    self.MonacoEnvironment = { // 提供一个定义worker路径的全局变量
        getWorker(_workerId: string, label: string) {
            return getWorker(label)
        }
    }
}
