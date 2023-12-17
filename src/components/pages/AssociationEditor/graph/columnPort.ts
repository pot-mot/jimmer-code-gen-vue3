import {GenTableColumnsView_TargetOf_columns} from "@/api/__generated/model/static/GenTableColumnsView.ts";
import {COLUMN_PORT_GROUP} from "@/components/business/model/constant.ts";

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
