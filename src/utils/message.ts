import {ElMessage, ElMessageBox} from 'element-plus'
import {Delete} from "@element-plus/icons-vue";
import {ElMessageBoxOptions} from "element-plus/es/components/message-box/src/message-box.type";
import {markRaw} from "vue";
import {DEBUG_LOG__MESSAGE} from "@/config/debug.ts";
import {debugLog} from "@/utils/debugLog.ts";

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

    const obj = {
        message,
        data
    }

    if (type == "success") {
        if (data) console.log(obj)
    } else if (type == "info") {
        if (data) console.log(obj)
    } else if (type == "warning") {
        if (data) console.warn(obj)
    } else if (type == "error") {
        console.error(new Error(message))
        if (data) console.error(obj)
    }

    if (DEBUG_LOG__MESSAGE) {
        debugLog(`[${type}] ` + message, obj)
    }
}

export const deleteConfirm = (
    deleteTarget: string,
    callback: () => void,
    message: string = "",
    opts?: ElMessageBoxOptions,
) => {
    ElMessageBox.confirm(
        `确定要删除 ${deleteTarget} 吗？\n${message}`,
        {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            icon: markRaw(Delete),
            type: "error",
            ...opts
        }
    ).then(() => {
        callback()
    }).catch(() => {
    })
}
