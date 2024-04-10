export interface ModelValueProps<T> {
    modelValue: T
}

export interface DialogInitProps {
    initX?: number
    initY?: number
    initW?: number
    initH?: number
}

export interface DialogSizeRangeProps {
    minW?: number
    minH?: number
    maxW?: number
    maxH?: number
}

export interface DialogTeleportProps {
    to?: HTMLElement | string
}

export interface DialogDisableProps {
    disabledX?: boolean
    disabledY?: boolean
    disabledW?: boolean
    disabledH?: boolean
}

export interface DragDialogProps extends ModelValueProps<boolean>,
    DialogInitProps,
    DialogTeleportProps,
    DialogSizeRangeProps,
    DialogDisableProps {
    limitByParent?: boolean
    modal?: boolean
    canResize?: boolean
    canDrag?: boolean
    canFullScreen?: boolean
    initFullScreen?: boolean
    // 此配置项用于主动使用 syncDialogHeight 时自适应高度
    fitContent?: boolean
}
