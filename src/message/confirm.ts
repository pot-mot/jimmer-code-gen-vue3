import {ElMessageBoxOptions} from "element-plus/es/components/message-box/src/message-box.type";
import {ElMessageBox} from "element-plus";
import {markRaw} from "vue";
import {Delete, Warning} from "@element-plus/icons-vue";

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

export const confirm = (
    message: string = "",
    callback: () => void,
    opts?: ElMessageBoxOptions,
) => {
    ElMessageBox.confirm(
        `${message}`,
        {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            icon: markRaw(Warning),
            type: "info",
            ...opts
        }
    ).then(() => {
        callback()
    }).catch(() => {
    })
}
