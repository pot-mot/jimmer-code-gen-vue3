export type ConfirmProps = {
    title: string,
    content: string,
    confirmText: string,
    cancelText: string,
    onConfirm: () => void | Promise<void>,
    onCancel: () => void | Promise<void>,
    onClose: () => void | Promise<void>,
}

export type ConfirmInput = {
    title: string,
    content: string,
    confirmText?: string,
    cancelText?: string,
    onConfirm?: () => void | Promise<void>,
    onCancel?: () => void | Promise<void>,
    onClose?: () => void | Promise<void>,
}
