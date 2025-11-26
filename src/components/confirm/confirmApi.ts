import {createApp} from "vue";
import Confirm from "@/components/confirm/Confirm.vue";
import type {ConfirmProps, ConfirmOptions} from "@/components/confirm/ConfirmType.ts";
import {translate} from "@/store/i18nStore.ts";

export const sendConfirm = (
    options: ConfirmOptions,
): Promise<void> => {
    return new Promise<void>((resolve) => {
        // 合并配置项
        const props: ConfirmProps = {
            title: options.title,
            content: options.content,
            confirmText: options.confirmText ?? translate("confirm"),
            cancelText: options.cancelText ?? translate("cancel"),
            onConfirm: async () => {
                await options.onConfirm?.()
                closeInstance()
                resolve()
            },
            onCancel: async () => {
                await options.onCancel?.()
                closeInstance()
                resolve()
            },
            onClose: async () => {
                await options.onClose?.()
                closeInstance()
                resolve()
            }
        }

        // 创建容器元素
        const el = document.createElement("div");

        // 创建应用实例
        const app = createApp(Confirm, props)

        // 挂载组件
        const newInstance = app.mount(el)
        document.body.appendChild(el)

        // 关闭并清理实例的函数
        const closeInstance = () => {
            if (newInstance !== null) {
                app.unmount()
                el.remove()
            }
        }
    })
}
