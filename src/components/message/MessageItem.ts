import type { VNode, DefineComponent } from 'vue'

export type MessageContent = string | (() => VNode) | DefineComponent

export type MessageType = "primary" | "success" | "error" | "warning" | "info"

export type MessageItem = {
    id: number,
    // 消息内容
    content: MessageContent,
    // 消息类型
    type: MessageType,
    // 移除计时器
    timeout?: number | undefined,
    // 是否可关闭
    canClose: boolean,
    // 重复次数
    repeatCount: number,
}

export type MessageOpenOptions = {
    type: MessageType,
    canClose: boolean,
    grouping: boolean,
}

export const messageOpenDefaultOptions: MessageOpenOptions = {
    type: "info",
    canClose: true,
    grouping: true,
}