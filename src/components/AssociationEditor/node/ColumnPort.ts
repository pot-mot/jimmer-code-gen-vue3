import {KeyValue} from "@antv/x6";
import {
    COLUMN_HEIGHT, COLUMN_INIT_WIDTH,
    COLUMN_PORT,
    COLUMN_PORT_GROUP,
    COLUMN_PORT_SELECTOR
} from "../../../utils/graphEditor/constant.ts";
import {GenTableColumnsView_TargetOf_columns} from "../../../api/__generated/model/static/GenTableColumnsView.ts";

export const columnPortGroup = {
    position: COLUMN_PORT,
    markup: [
        {
            tagName: 'rect',
            selector: COLUMN_PORT_SELECTOR,
        }
    ],
    attrs: {
        COLUMN_PORT_SELECTOR: {
            magnet: true,
            fill: "rgba(0,0,0,0)",
            height: COLUMN_HEIGHT,
            width: COLUMN_INIT_WIDTH
        }
    }
}

export const columnPortPosition = (portsPositionArgs: KeyValue) => {
    return portsPositionArgs.map((_: any, index: number) => {
        return {
            position: {
                x: 0,
                y: (index + 1) * COLUMN_HEIGHT + 3,
            },
            angle: 0,
        }
    })
}

export const columnIdToPortId = (id: number) => {
    return `column-${id}`
}

export const portIdToColumnId = (id: string) => {
    return parseInt(id.replace('column-', ''))
}

export const columnToPort = (column: GenTableColumnsView_TargetOf_columns) => {
    return {
        id: columnIdToPortId(column.id),
        group: COLUMN_PORT_GROUP,
    }
}