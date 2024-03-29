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

export interface DragDialogProps extends
    ModelValueProps<boolean>,
    DialogInitPositionProps,
    DialogInitSizeProps,
    DialogTeleportProps,
    DialogSizeRangeProps,
    DialogDisableProps
{
    limitByParent?: boolean
    modal?: boolean
    canResize?: boolean
    canDrag?: boolean
    // 此配置项用于主动使用 syncDialogHeight 时自适应高度
    fitContent?: boolean
}
