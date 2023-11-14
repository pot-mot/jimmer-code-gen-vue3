export interface DragResizeProps {
    x?: number
    y?: number
    initW?: number
    minW?: number
    minH?: number
    maxW?: number
    maxH?: number
    to?: string
    disableTeleport?: boolean
    limitByParent?: boolean
    canResize?: boolean
    canDrag?: boolean
    // 此配置项用于主动使用 syncDialogHeight 时自适应高度
    fitContent?: boolean
}