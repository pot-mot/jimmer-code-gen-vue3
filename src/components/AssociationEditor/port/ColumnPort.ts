import {KeyValue} from "@antv/x6";
import {COLUMN_HEIGHT, COLUMN_PORT_GROUP} from "../constant.ts";
import {GenTableColumnsView_TargetOf_columns} from "../../../api/__generated/model/static/GenTableColumnsView.ts";

export const ColumnPort = (portsPositionArgs: KeyValue) => {
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