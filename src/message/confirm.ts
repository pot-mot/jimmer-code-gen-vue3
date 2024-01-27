import {ElMessageBoxOptions} from "element-plus/es/components/message-box/src/message-box.type";
import {ElMessageBox} from "element-plus";
import {markRaw} from "vue";
import {Delete} from "@element-plus/icons-vue";

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
