import {AssociationType} from "@/api/__generated/model/enums";

export const DEFAULT_ZOOM_RANGE = {
    minScale: 0.03125,
    maxScale: 4,
}


export const DEFAULT_ASSOCIATION_TYPE: AssociationType = "MANY_TO_ONE"
export const DEFAULT_ASSOCIATION_FAKE: boolean = false

// shape 常量
export const TABLE_NODE = "TABLE_NODE"
export const ASSOCIATION_EDGE = "ASSOCIATION_EDGE"

// 选择器常量
export const COLUMN_PORT_SELECTOR = "COLUMN_PORT_SELECTOR"
export const COLUMN_PORT_GROUP = "COLUMN_PORT_GROUP"
export const COLUMN_PORT = "COLUMN_PORT"


// 样式常量
export const COLUMN_HEIGHT = 30
export const COLUMN_INIT_WIDTH = 200

export const ASSOCIATION_LINE_WIDTH = 1
export const HIGHLIGHT_ASSOCIATION_LINE_WIDTH = 3


export const FAKE_ASSOCIATION_LINE_DASHARRAY = 10

export const HIGHLIGHT_COLOR = 'var(--highlight-color)'
export const COMMON_COLOR = 'var(--common-color)'

// ASSOCIATION_TYPE 常量
export const SWITCH_ASSOCIATION_TYPE_FLAG = "SWITCH_ASSOCIATION_TYPE_FLAG"
export const ASSOCIATION_LABEL_TEXT_SELECTOR = "ASSOCIATION_LABEL_TEXT_SELECTOR"

// ASSOCIATION_FAKE 常量
export const SWITCH_ASSOCIATION_FAKE_FLAG = "SWITCH_ASSOCIATION_FAKE_FLAG"
