import {ElMessageBoxOptions} from "element-plus/es/components/message-box/src/message-box.type";
import {ElMessageBox} from "element-plus";
import {markRaw} from "vue";
import {Delete, Warning} from "@element-plus/icons-vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

export const deleteConfirm = (
    deleteTarget: string,
    callback: () => void,
    enable: boolean = true,
    opts?: ElMessageBoxOptions,
) => {
    const i18nStore = useI18nStore()

    if (enable) {
        ElMessageBox.confirm(
            i18nStore.translate({key: "CONFIRM_delete", args:[deleteTarget]}),
            {
                confirmButtonText: i18nStore.translate("CONFIRM_button_confirm"),
                cancelButtonText: i18nStore.translate("CONFIRM_button_cancel"),
                icon: markRaw(Delete),
                type: "error",
                ...opts
            }
        ).then(() => {
            callback()
        }).catch(() => {
        })
    } else {
        callback()
    }
}

export const confirm = (
    message: string = "",
    callback: () => void,
    opts?: ElMessageBoxOptions,
) => {
    const i18nStore = useI18nStore()

    ElMessageBox.confirm(
        `${message}`,
        {
            confirmButtonText: i18nStore.translate("CONFIRM_button_confirm"),
            cancelButtonText: i18nStore.translate("CONFIRM_button_cancel"),
            icon: markRaw(Warning),
            type: "info",
            ...opts
        }
    ).then(() => {
        callback()
    }).catch(() => {
    })
}
