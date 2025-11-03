import {createApp} from "vue";
import Confirm from "@/components/confirm/Confirm.vue";
import type {ConfirmProps, ConfirmInput} from "@/components/confirm/ConfirmType.ts";
import {translate} from "@/store/i18nStore.ts";

export const sendConfirm = (
    input: ConfirmInput,
) => {
    // 合并配置项
    const props: ConfirmProps = {
        title: input.title,
        content: input.content,
        confirmText: translate("submit"),
        cancelText: translate("cancel"),
        onConfirm: async () => {
            await input.onConfirm?.()
            closeInstance()
        },
        onCancel: async () => {
            await input.onCancel?.()
            closeInstance()
        },
        onClose: async () => {
            await input.onClose?.()
            closeInstance()
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
}
