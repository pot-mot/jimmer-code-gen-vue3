export interface ModelValueProps<T> {
    modelValue: T
}

export interface DialogInitPositionProps {
    initX?: number
    initY?: number
}

export interface DialogInitSizeProps {
    initW?: number
    initH?: number
}

export interface DragResizeDialogProps extends ModelValueProps<boolean>, DialogInitPositionProps, DialogInitSizeProps {
    minW?: number
    minH?: number
    maxW?: number
    maxH?: number
    disableX?: boolean
    disableY?: boolean
    disableW?: boolean
    disableH?: boolean
    to?: HTMLElement | string
    limitByParent?: boolean
    canResize?: boolean
    canDrag?: boolean
    // 此配置项用于主动使用 syncDialogHeight 时自适应高度
    fitContent?: boolean
}