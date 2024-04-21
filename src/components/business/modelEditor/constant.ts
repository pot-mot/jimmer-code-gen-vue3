import {AssociationType} from "@/api/__generated/model/enums";

export const DEFAULT_ZOOM_RANGE = {
    minScale: 0.03125,
    maxScale: 4,
}


export const DEFAULT_ASSOCIATION_TYPE: AssociationType = "MANY_TO_ONE"

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

export const LINE_WIDTH = 1


export const FAKE_ASSOCIATION_LINE_DASHARRAY = 10

export const COMMON_COLOR = 'var(--common-color)'

// ASSOCIATION_TYPE 常量
export const ASSOCIATION_TYPE_BUTTON = "ASSOCIATION_TYPE_BUTTON"

// EDGE_SELECT 常量
export const EDGE_SELECT_FLAG = "EDGE_SELECT_FLAG"
