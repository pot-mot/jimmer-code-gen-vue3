import {ElMessage} from 'element-plus'
import {useDebugStore} from "@/store/debug/debugStore.ts";
import {MainLocaleKeyParam} from "@/i18n";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

/**
 * 向用户发送消息
 * @param message 消息体
 * @param type 消息类型
 * @param data 额外数据，例如报错
 */
export const sendMessage = (message: string, type: "info" | "success" | "warning" | "error" = "info", data?: any) => {
    ElMessage({
        type,
        message,
        showClose: true,
    })

    if (type === "success") {
        if (data) console.log(message, data)
    } else if (type === "info") {
        if (data) console.log(message, data)
    } else if (type === "warning") {
        console.warn(message)
        if (data) console.warn(data)
    } else if (type === "error") {
        console.error(new Error(message))
        if (data) console.error(data)
    }

    const debugStore = useDebugStore()
    debugStore.log('MESSAGE', message, data)
}

export const sendI18nMessage = (
    keyParam: MainLocaleKeyParam,
    type: "info" | "success" | "warning" | "error" = "info",
    data?: any,
) => {
    const i18nStore = useI18nStore()
    sendMessage(i18nStore.translate(keyParam), type, data)
}

