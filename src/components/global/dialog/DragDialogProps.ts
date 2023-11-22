export interface DragResizeProps {
    modelValue: boolean

    initX?: number
    initY?: number
    initW?: number
    initH?: number
    minW?: number
    minH?: number
    maxW?: number
    maxH?: number
    to?: HTMLElement | string
    disableX?: boolean
    disableY?: boolean
    disableW?: boolean
    disableH?: boolean
    limitByParent?: boolean
    canResize?: boolean
    canDrag?: boolean
    // 此配置项用于主动使用 syncDialogHeight 时自适应高度
    fitContent?: boolean
}