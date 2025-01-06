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

export interface DragDialogProps extends DialogInitProps,
    DialogTeleportProps,
    DialogSizeRangeProps,
    DialogDisableProps {
    limitByParent?: boolean
    modal?: boolean
    canResize?: boolean
    canDrag?: boolean
    canFullScreen?: boolean
    canExitFullScreen?: boolean
    initFullScreen?: boolean
    // 此配置项将在调用 syncDialogHeight 时自适应高度
    fitContent?: boolean
}
